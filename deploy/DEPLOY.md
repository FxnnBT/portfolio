# Uitrollen naar de Pi

De site draait als systemd-service op **poort 5200**, op `192.168.1.240`
(gebruiker `pi`, map `/srv/portfolio`). Naast fynnworks, die op 3500 draait.

## Een update uitrollen

Drie commando's, vanuit de projectmap op je laptop.

```bash
# 1. Broncode overzetten. Geen rsync: Git Bash op Windows heeft dat niet.
tar czf - \
  --exclude=./node_modules --exclude=./.next --exclude=./.git \
  --exclude=./out --exclude=./tsconfig.tsbuildinfo . \
| ssh pi@192.168.1.240 'tar xzf - -C /srv/portfolio'

# 2. Dependencies bijwerken (alleen nodig als package.json wijzigde) en bouwen.
ssh pi@192.168.1.240 'cd /srv/portfolio && npm ci && npm run build'

# 3. Herstarten.
ssh pi@192.168.1.240 'sudo systemctl restart portfolio'
```

Stap 2 duurt ongeveer 20 seconden; `npm ci` een paar minuten als er
dependencies wijzigden.

## Controleren dat het werkt

```bash
ssh pi@192.168.1.240 '
  systemctl is-active portfolio
  for p in / /nl /en /nl/werk/fynnworks /nl/bestaat-niet; do
    printf "%-22s %s\n" "$p" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5200$p)"
  done'
```

Verwacht: `active`, dan `307 200 200 200 404`. De 307 is `/` → `/nl`.

En vanaf je laptop, want dat test ook of hij écht op het netwerk luistert en
niet alleen op localhost:

```bash
curl -sI http://192.168.1.240:5200/nl | head -1
```

## Waarom bouwen op de Pi en niet hier

`node_modules` bevat binaries die per platform verschillen: Tailwind v4
gebruikt `lightningcss` en Next gebruikt SWC, allebei native. De
Windows-x64-versies uit jouw `node_modules` draaien niet op de aarch64-Pi.
Daarom gaat alleen de broncode over en draait `npm ci` daar.

Om dezelfde reden gaat `.next` ook niet mee: die build hoort bij de
node_modules waarmee hij gemaakt is.

## Als er iets misgaat

```bash
# Wat zegt de service?
ssh pi@192.168.1.240 'systemctl status portfolio --no-pager -n 20'

# Meelezen terwijl je herstart
ssh pi@192.168.1.240 'journalctl -u portfolio -f'

# Draait er iets anders op 5200?
ssh pi@192.168.1.240 'ss -tlnp | grep 5200'
```

**Build faalt op de Pi maar niet hier.** Bijna altijd een bestand dat niet is
meegekomen of een dependency die lokaal wel en daar niet geïnstalleerd is.
Vergelijk: `ssh pi@192.168.1.240 'ls -la /srv/portfolio'`.

**Service herstart in een lus.** `Restart=always` blijft het proberen, dus een
kapotte build geeft een eindeloze herstart in plaats van een duidelijke fout.
Kijk in `journalctl -u portfolio -n 50` naar de echte reden en zet hem zo nodig
even stil met `sudo systemctl stop portfolio`.

**Terug naar de vorige versie.** Er is geen automatische rollback. Zet de vorige
commit terug (`git checkout <commit>`) en doorloop stap 1 t/m 3 opnieuw. Dat is
sneller dan een backup-schema onderhouden voor een site die in 20 seconden
bouwt.

## De eerste keer (staat al gedaan)

```bash
sudo install -d -o pi -g pi /srv/portfolio
sudo cp /srv/portfolio/deploy/portfolio.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio
```

`enable` zorgt dat hij na een reboot terugkomt; `Restart=always` in de unit dat
hij na een crash terugkomt. Beide zijn getest.

## Wat er nog niet is

De site luistert op `*:5200`, dus op alle interfaces van de Pi. Binnen het LAN
is dat prima. Zodra hij van buitenaf bereikbaar moet zijn, hoort daar iets voor
te staan dat HTTPS afhandelt — Caddy draait al op de Pi en doet dat al voor
fynnworks:

```
# in /etc/caddy/Caddyfile, naast het fynnworks-blok
jouw.domein.nl {
	reverse_proxy localhost:5200
}
```

Daarna `sudo caddy validate --config /etc/caddy/Caddyfile` en
`sudo systemctl reload caddy`. Zet dan ook `url` in `lib/site.ts` op datzelfde
domein, anders wijzen de canonical-URL's en de sitemap naar een adres dat niet
bestaat.
