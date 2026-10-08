# Portfolio — Fynn Tervoort

Persoonlijke site en schoolportfolio. Next.js 16 (App Router) + Tailwind v4,
Nederlands en Engels. Draait als één systemd-service **op poort 5200**.

## Lokaal draaien

```bash
npm install
npm run dev     # http://localhost:5200 → /nl
npm test        # controleert de inhoud (zie hieronder)
```

## Wat waar staat

| Pad | Inhoud |
|---|---|
| `lib/site.ts` | Je naam, domein, e-mail, GitHub, LinkedIn, school. **Begin hier.** |
| `content/projects.ts` | Alle projecten, inclusief opdracht, aanpak en reflectie |
| `content/dictionaries.ts` | Alle overige teksten, NL en EN naast elkaar, plus de marquee-lijst |
| `app/actions.ts`, `lib/contact.ts` | Het contactformulier: versturen via SMTP, en de controles ervoor |
| `app/globals.css` | Kleuren, typografie, pill-knoppen, alle design-tokens |
| `deploy/portfolio.service` | systemd-unit voor de Pi, poort 5200 |
| `public/work/` | Screenshots, `<slug>.jpg`, max ~1600px breed |
| `public/cv/` | De cv-pdf's, geprint vanaf `/nl/cv` en `/en/cv` |

## Het cv

De teksten staan onder `cv` in `content/dictionaries.ts`. De pdf's zijn een
afdruk van de cv-pagina, dus na een wijziging opnieuw printen (Git Bash, met
`npm run build && npm start` aan):

```bash
for l in nl en; do
  "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new     --no-pdf-header-footer --print-to-pdf="public/cv/fynn-tervoort-cv-$l.pdf"     "http://localhost:5200/$l/cv"
done
```

## Nog invullen

Zoek op `TODO` — die staan er bewust zichtbaar in in plaats van stilletjes leeg:

- `lib/site.ts` — je geboortedatum, het publieke domein (`url`), en of het
  opleidingsniveau klopt. E-mail, GitHub en LinkedIn staan er al in.
- `content/projects.ts` — de stack van **marcelhensema** en **beldiamsterdam**
  staat op `TODO`: vul in wat je er echt voor gebruikt hebt. Het blok met slug `schoolopdracht` is verder een lege structuur; vul
  de teksten in, zet een screenshot in `public/work/` en verwijs ernaar met
  `image`.
- `deploy/portfolio.service` — `User=` en `WorkingDirectory=` als je een ander
  pad of account gebruikt dan `pi` en `/srv/portfolio`.

## Het ontwerp

Licht, met volvlak zwarte banden ertussen. De opbouw van de homepage is bewust
wit → zwart → wit → zwart → wit → zwart: elke sectie zet zich af tegen de
vorige. Zonder die afwisseling wordt het één lange kolom en voelt de pagina
leeg, hoeveel er ook op staat.

- **Koppen staan op gewicht 400, niet vet.** De schaal doet het werk. Zwaar
  erbovenop maakt ze schreeuwerig in plaats van groot. De negatieve tracking
  (`letter-spacing: -0.04em`) hoort daarbij.
- **Elke kop heeft één cursief accent.** Dat staat in de dictionary als `lead` +
  `accent`, want in het Engels valt de klemtoon vaak op een ander woord dan in
  het Nederlands.
- **Twee lettertypen.** Inter voor alles wat je leest, Anonymous Pro (monospace)
  alleen voor bijschriften, nummers en labels.
- **Knoppen zijn pillen**, zwart op wit en omgekeerd op de zwarte banden. Die
  omkering zit in `.band .pill-solid` in `globals.css`, niet in de componenten.

## Een project toevoegen

Eén blok in `content/projects.ts`. Alleen `slug`, `kind`, `year`, `title`,
`summary` en `stack` zijn verplicht. Vul je daarnaast `brief`, `process` of
`learned` in, dan krijgt het project automatisch een eigen pagina op
`/nl/werk/<slug>` — anders blijft het bij de kaart op de homepage. Zo staat er
nooit een lege detailpagina.

`featured: true` op precies één project: dat krijgt de brede kaart bovenaan.
Heeft dat project een `image`, dan splitst de kaart in tekst naast beeld; zonder
screenshot blijft hij één kolom, zodat er geen halve kaart leeg staat.

Elke tekst bestaat in beide talen. Vergeet je er één, dan slaat `npm test`
alarm.

## Testen

```bash
npm test
```

Dit controleert de inhoud, niet de opmaak: dat de Nederlandse en Engelse
dictionary exact dezelfde keys hebben, dat er geen dubbele of onbruikbare slugs
zijn, dat elk tweetalig veld in beide talen gevuld is, dat de navigatie tussen
projecten rondloopt zonder naar zichzelf te wijzen, en dat de leeftijd pas op de
verjaardag optelt. Half vertaalde content is de fout die je bij een tweetalige
site echt maakt, en die zie je zelf nooit.

## Uitrollen naar de Pi

De site draait als systemd-service op poort 5200, op `pi@192.168.1.240` in
`/srv/portfolio`. Wat daarvoor zit — reverse proxy, domein, HTTPS — staat daar
los van.

```bash
tar czf - \
  --exclude=./node_modules --exclude=./.next --exclude=./.git \
  --exclude=./out --exclude=./tsconfig.tsbuildinfo . \
| ssh pi@192.168.1.240 'tar xzf - -C /srv/portfolio'

ssh pi@192.168.1.240 'cd /srv/portfolio && npm ci && npm run build'
ssh pi@192.168.1.240 'sudo systemctl restart portfolio'
```

Geen `rsync`: Git Bash op Windows heeft dat niet. En bouwen gebeurt op de Pi,
want `node_modules` bevat native binaries (lightningcss, SWC) die per platform
verschillen.

Volledige runbook, inclusief controles en wat te doen als het misgaat:
**[deploy/DEPLOY.md](deploy/DEPLOY.md)**.

## Het contactformulier

Een server action (`app/actions.ts`) die mailt via de Hostnet-mailbox van
fynnworks, met nodemailer. De SMTP-gegevens komen uit omgevingsvariabelen: lokaal
uit `.env.local` (zie `.env.example`), op de Pi uit `/etc/portfolio.env` — hoe
die erop komt staat in [deploy/DEPLOY.md](deploy/DEPLOY.md).

Tegen spam: een onzichtbaar veld dat alleen bots invullen, en maximaal vijf
berichten per uur per IP. Het formulier werkt ook zonder JavaScript.

Daarom draait de site als Node-proces en niet als map met HTML-bestanden: een
formulier heeft een server nodig. Het is dezelfde opzet als fynnworks.
