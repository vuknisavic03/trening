# Režim

PWA za praćenje treninga i ishrane. Jedan korisnik, bez naloga, bez servera, radi offline.
Svi podaci žive u `localStorage` na telefonu.

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Vite ispisuje adresu, obično `http://localhost:5173/rezim/`. Zbog `base: '/rezim/'` putanja
mora da sadrži `/rezim/`.

Ostale komande:

```bash
npm run typecheck   # tsc bez emitovanja
npm run build       # tsc -b + vite build, izlaz u dist/
npm run preview     # servira dist/ lokalno
```

## Deploy na GitHub Pages

1. Napravi repozitorijum sa imenom `rezim` (ime mora da se poklapa sa `base` u `vite.config.ts`).
2. Push na `main`.
3. `.github/workflows/deploy.yml` builduje projekat i pušta `dist/` na granu `gh-pages`.
4. U Settings -> Pages izaberi Source: Deploy from a branch, granu `gh-pages`, folder `/ (root)`.
5. Aplikacija je na `https://<korisnik>.github.io/rezim/`.

Ako repozitorijum nazoveš drugačije, promeni `base` u `vite.config.ts` i `start_url` i `scope`
u manifestu unutar istog fajla, kao i putanje ikonica u `index.html`.

## Dodavanje na iPhone home screen

Otvori link u Safari-ju, Share -> Add to Home Screen. Posle prvog otvaranja Workbox precache-uje
sve, pa aplikacija radi i bez interneta. Jedina mrežna stvar u runtime-u je YouTube embed.

## Gde se menjaju podaci

Sve je u `src/data/`, tipizirano, bez magičnih brojeva u komponentama:

| Fajl | Šta sadrži |
|---|---|
| `exercises.ts` | biblioteka vežbi: ime, mišićna grupa, tempo, koraci izvođenja, česte greške, YouTube search query |
| `programs.ts` | programi (Upper/Lower i sopstvena težina), dani treninga, raspored po danima nedelje |
| `meals.ts` | četiri obroka sa namirnicama, kalorijama i proteinom, plus panel Pravila |
| `goals.ts` | polazno stanje, ciljevi, tempo, polja InBody merenja, prvo merenje |
| `theme.ts` | boje, dimenzije prstena, trajanje toast-a, boje kalendara, ciljevi kardija i koraka |

Dodavanje vežbe: dodaj id u union `ExerciseId` u `src/types.ts`, unos u `EXERCISES`
u `src/data/exercises.ts`, i ubaci id u listu vežbi odgovarajućeg dana u `src/data/programs.ts`.
TypeScript prijavi ako nešto od toga zaboraviš.

## Podaci

Jedan Zustand store sa `persist` middleware-om, ključ `rezim-v1`:

```ts
days      Record<"2026-08-19", { meals, cardio, steps, kcal, strength }>
sessions  Record<"u1:rdl", { date, sets: { w, r }[] }[]>
drafts    Record<"2026-08-19:u1:rdl", { w, r }[]>   // nesačuvan unos
body      { date, kg?, waist? }[]
inbody    { date, kg, bf, smm, trunkFat, vfa, whr }[]
videos    Record<ExerciseId, string>                 // YouTube ID
settings  { program, kcalTarget }
```

Store je verzionisan (`version` + `migrate`), pa izmene šeme ne brišu postojeće podatke.
Ako `localStorage` baci grešku, `src/store/storage.ts` prelazi na memoriju: aplikacija radi
normalno, samo se podaci gube po zatvaranju.

Izvoz i uvoz JSON-a su na ekranu Napredak, dole. Izvoz je i backup pre promene telefona.

## Struktura

```
src/
  data/         konstante i sadržaj
  store/        Zustand store, selektori, storage fallback, toast
  hooks/        tajmer odmora, datum dana, reduced motion
  lib/          datumi, YouTube parser
  components/
    ui/         Card, Sheet, Toast, TabBar, Segmented, NumField, Ring, Button
    today/      traka dana, izbor treninga
    nutrition/  kartica obroka
    training/   tajmer odmora, blok vežbe
    library/    bottom sheet vežbe
    progress/   grafikon, ciljevi, telo, InBody, kalendar, izvoz
  screens/      Danas, Ishrana, Trening, Vežbe, Napredak
```

Ekran Vežbe se otvara dugmetom u zaglavlju ekrana Trening, ili tapom na video ikonicu
kod bilo koje vežbe.
