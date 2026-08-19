import type { Exercise, ExerciseId } from '../types'

export const EXERCISES: Record<ExerciseId, Exercise> = {
  'db-bench': {
    id: 'db-bench',
    name: 'Bench sa bučicama',
    group: 'Grudi',
    tempo: '2 s spuštanje, kratka pauza dole, 1 s izbačaj',
    steps: [
      'Sedi na klupu sa bučicama na butinama, pa se zavali unazad i istim pokretom prebaci bučice u start iznad grudi.',
      'Lopatice skupi i spusti nadole, stopala čvrsto na podu, blagi luk u donjim leđima.',
      'Spuštaj do nivoa grudi tako da laktovi budu pod oko 45 stepeni od tela, ne rašireni u slovo T.',
      'Izbaci nagore i pusti da se bučice približe bez dodira, laktove ne zaključavaj.',
    ],
    mistakes: [
      'Laktovi rašireni pod 90 stepeni od tela, sila prelazi na prednji deo ramena.',
      'Zadnjica se odvaja od klupe da bi se dovršilo poslednje ponavljanje.',
    ],
    query: 'dumbbell bench press proper form',
  },
  'one-arm-row': {
    id: 'one-arm-row',
    name: 'Veslanje jednom rukom',
    group: 'Leđa, širina',
    tempo: '1 s vuča, 1 s stisak, 2 s spuštanje',
    steps: [
      'Koleno i istoimena ruka na klupi, druga noga na podu, trup paralelan sa podom.',
      'Bučica visi ispod ramena, ruka opružena, rame ne pada nadole u ležištu.',
      'Vuci lakat uz telo prema kuku, ne prema ramenu, dok bučica ne dođe do rebara.',
      'Spusti kontrolisano do pune dužine ruke bez okretanja trupa.',
    ],
    mistakes: [
      'Rotiranje trupa da bi se digla veća težina, posao preuzimaju kukovi.',
      'Vučenje laktom u stranu, vežba postaje rad za zadnje rame.',
    ],
    query: 'one arm dumbbell row proper form',
  },
  'smith-incline': {
    id: 'smith-incline',
    name: 'Kosi bench na Smith mašini',
    group: 'Grudi, gornji deo',
    tempo: '2 s spuštanje, 1 s izbačaj',
    steps: [
      'Klupu postavi na 30 stepeni, ne više, iznad toga posao preuzimaju ramena.',
      'Legni tako da šipka pri spuštanju pada na gornji deo grudi, ne na vrat.',
      'Otkoči šipku, spusti do lakog kontakta sa grudima, laktovi blago uvučeni ka telu.',
      'Izbaci nagore po fiksnoj putanji, lopatice ostaju skupljene celo vreme.',
    ],
    mistakes: [
      'Klupa iznad 45 stepeni, grudi prestaju da budu glavni mišić u pokretu.',
      'Odbijanje šipke od grudi, gubi se napetost i raste rizik za rame.',
    ],
    query: 'smith machine incline bench press form',
  },
  'cable-lat-raise': {
    id: 'cable-lat-raise',
    name: 'Bočno podizanje na kablu',
    group: 'Rameni, srednji deo',
    tempo: '1 s gore, 1 s stisak, 2 s spuštanje',
    steps: [
      'Kabl na najnižoj poziciji, stani bočno i hvataj rukom koja je dalja od mašine.',
      'Blago se nakloni od stuba, ruka u startu prelazi ispred tela.',
      'Podiži ruku u stranu do nivoa ramena, mali prst malo više od velikog.',
      'Vrati kontrolisano do početne pozicije, ne puštaj da težina padne.',
    ],
    mistakes: [
      'Zamah telom i podizanje na prste, teret nikad ne dođe do bočnog dela ramena.',
      'Podizanje iznad nivoa ramena, pokret preuzima trapezijus.',
    ],
    query: 'cable lateral raise proper form',
  },
  'db-curl': {
    id: 'db-curl',
    name: 'Biceps sa bučicama',
    group: 'Biceps',
    tempo: '1 s gore, 3 s spuštanje',
    steps: [
      'Stani uspravno, bučice uz telo, laktovi malo ispred rebara.',
      'Savij lakat i drži ga na mestu, kreće se samo podlaktica.',
      'Na vrhu blago rotiraj mali prst ka gore i zadrži pola sekunde.',
      'Spuštaj sporo do pune dužine ruke, biceps ostaje pod napetošću.',
    ],
    mistakes: [
      'Zabacivanje trupa unazad i pomeranje laktova napred, rade leđa i prednje rame.',
      'Zaustavljanje na pola spuštanja, biceps nikad ne radi u punom opsegu.',
    ],
    query: 'dumbbell biceps curl proper form',
  },
  'oh-triceps': {
    id: 'oh-triceps',
    name: 'Triceps preko glave',
    group: 'Triceps, duga glava',
    tempo: '2 s spuštanje, 1 s opružanje',
    steps: [
      'Sedi sa uspravnim naslonom ili stani, teret podigni iznad glave.',
      'Laktovi uz uši, usmeren nagore, ne šire od ramena.',
      'Spuštaj teret za glavu do momenta kada osetiš pun rasteg tricepsa.',
      'Opruži lakat do kraja bez pomeranja nadlaktice.',
    ],
    mistakes: [
      'Laktovi se šire u stranu, opterećenje beži na ramena.',
      'Rebra i donja leđa idu napred u luk umesto da trup ostane čvrst.',
    ],
    query: 'overhead triceps extension proper form',
  },
  'leg-press': {
    id: 'leg-press',
    name: 'Leg press',
    group: 'Kvadriceps i zadnjica',
    tempo: '2 s spuštanje, 1 s izbačaj',
    steps: [
      'Stopala na sredini platforme, u širini kukova, prsti blago izvučeni van.',
      'Spuštaj dok kolena ne dođu blizu grudi, ali stani pre nego što zadnjica krene da se odvaja od naslona.',
      'Guraj kroz celo stopalo, ne samo kroz prste, kolena idu u liniji sa stopalima.',
      'Ne zaključavaj kolena na vrhu, stani par stepeni pre pune ekstenzije.',
    ],
    mistakes: [
      'Karlica se podvija u dubini i donja leđa se odvajaju od naslona.',
      'Kolena se skupljaju ka unutra pri izbačaju.',
    ],
    query: 'leg press proper form',
  },
  rdl: {
    id: 'rdl',
    name: 'RDL, rumunsko mrtvo dizanje',
    group: 'Zadnja loža i zadnjica',
    tempo: '3 s spuštanje, 1 s podizanje',
    steps: [
      'Stopala u širini kukova, šipka uz butine, kolena samo blago savijena i tako ostaju do kraja serije.',
      'Izvuci kukove nazad, leđa drži ravna i zaključana, grudi otvorene.',
      'Spuštaj šipku uz noge do momenta kada zadnja loža stane, obično oko sredine cevanice.',
      'Vrati se guranjem kukova napred, bez zabacivanja trupa unazad na vrhu.',
    ],
    mistakes: [
      'Zaobljena donja leđa, to je glavni izvor povrede u ovoj vežbi, ako leđa krenu da se grbe prekini seriju odmah.',
      'Čučanj umesto zgloba u kuku, kolena se previše savijaju i vežba prelazi na kvadriceps.',
    ],
    query: 'romanian deadlift proper form',
  },
  'ham-curl': {
    id: 'ham-curl',
    name: 'Seated hamstring curl',
    group: 'Zadnja loža',
    tempo: '1 s vuča, 3 s vraćanje',
    steps: [
      'Podesi naslon tako da koleno bude poravnato sa osom rotacije mašine.',
      'Jastuk preko butina zategni da se kukovi ne odvajaju od sedišta.',
      'Vuci pete pod sebe do pune fleksije i zadrži pola sekunde.',
      'Vrati sporo do skoro pune ekstenzije, bez udaranja tega o stack.',
    ],
    mistakes: [
      'Kukovi se podižu iz sedišta da bi se povukla veća težina.',
      'Prebrzo vraćanje, a negativna faza u ovoj vežbi nosi najviše.',
    ],
    query: 'seated leg curl proper form',
  },
  'leg-ext': {
    id: 'leg-ext',
    name: 'Leg extension',
    group: 'Kvadriceps',
    tempo: '1 s gore, 1 s stisak, 3 s spuštanje',
    steps: [
      'Osa mašine u liniji sa kolenom, jastuk na donjem delu cevanice, ne na stopalu.',
      'Uhvati ručke i pritisni zadnjicu u sedište.',
      'Opruži kolena do kraja i zadrži jednu sekundu na vrhu.',
      'Spuštaj kontrolisano i stani pre nego što teg dodirne stack.',
    ],
    mistakes: [
      'Zamah trupom i podizanje zadnjice, opterećenje beži iz kvadricepsa.',
      'Prekratak opseg, radi se samo gornja trećina pokreta.',
    ],
    query: 'leg extension machine proper form',
  },
  adductor: {
    id: 'adductor',
    name: 'Adduktori na mašini',
    group: 'Unutrašnja strana butine',
    tempo: '1 s skupljanje, 2 s otvaranje',
    steps: [
      'Sedi do kraja unazad, leđa oslonjena, jastuci na unutrašnjoj strani butina.',
      'Namesti početni raspon do lakog rastega, ne do bola.',
      'Skupljaj kolena kontrolisano do dodira jastuka i zadrži pola sekunde.',
      'Otvaraj sporo i zaustavi pokret pre krajnje pozicije da napetost ostane.',
    ],
    mistakes: [
      'Naglo puštanje unazad, unutrašnja strana butine se rasteže pod teretom bez kontrole.',
      'Guranje rukama po jastucima da se pomogne pokretu.',
    ],
    query: 'hip adductor machine proper form',
  },
  'calf-raise': {
    id: 'calf-raise',
    name: 'Podizanje na prste',
    group: 'Listovi',
    tempo: '1 s gore, 1 s stisak, 3 s spuštanje',
    steps: [
      'Prednji deo stopala na platformi, pete slobodne u vazduhu.',
      'Spusti pete što niže ideš bez bola i zadrži jednu sekundu u rastegu.',
      'Podigni se na prste do maksimuma i stisni list na vrhu.',
      'Kolena drži skoro opružena i stabilna, bez poskakivanja.',
    ],
    mistakes: [
      'Odbijanje na dole i gore, elastičnost tetive radi umesto lista.',
      'Kratak opseg, samo gornji deo pokreta.',
    ],
    query: 'standing calf raise proper form',
  },
  'one-arm-chest-press': {
    id: 'one-arm-chest-press',
    name: 'Chest press jednom rukom',
    group: 'Grudi',
    tempo: '2 s vraćanje, 1 s guranje',
    steps: [
      'Sedi u mašinu, ručka u nivou sredine grudi, druga ruka drži sedište.',
      'Rame potisni nazad i nadole i ne dozvoli da ide napred.',
      'Guraj jednom rukom napred, na kraju blago rotiraj ka centru grudi.',
      'Vrati kontrolisano do rastega, trup ostaje uspravan bez rotiranja.',
    ],
    mistakes: [
      'Trup se rotira i naginje ka strani koja radi, sila dolazi iz kukova.',
      'Rame se izbacuje napred u završnici, opterećenje ide na zglob ramena.',
    ],
    query: 'single arm chest press machine form',
  },
  'lat-pulldown': {
    id: 'lat-pulldown',
    name: 'Lat pulldown',
    group: 'Leđa, širina',
    tempo: '1 s vuča, 3 s puštanje',
    steps: [
      'Hvat malo širi od ramena, kolena fiksirana pod jastucima.',
      'Grudi napred, trup zavaljen nazad do oko 15 stepeni i tu ostaje.',
      'Vuci laktove nadole i nazad, šipka ide do gornjeg dela grudi.',
      'Pusti sporo do pune dužine ruku i dozvoli lopaticama da se dignu na vrhu.',
    ],
    mistakes: [
      'Zavaljivanje trupa nazad u toku vuče, vežba prelazi u veslanje.',
      'Vuča rukama, laktovi se ne pokreću i biceps preuzima posao.',
    ],
    query: 'lat pulldown proper form',
  },
  't-bar-row': {
    id: 't-bar-row',
    name: 'T-bar veslanje',
    group: 'Leđa, srednji deo',
    tempo: '1 s vuča, 1 s stisak, 2 s spuštanje',
    steps: [
      'Stani nad šipkom, trup nagnut na oko 45 stepeni, kolena blago savijena.',
      'Leđa ravna i zaključana pre prvog ponavljanja, pogled napred i naniže.',
      'Vuci šipku ka donjem delu rebara, laktove drži uz telo.',
      'Spuštaj kontrolisano do pune dužine ruku bez zaobljavanja leđa.',
    ],
    mistakes: [
      'Podizanje trupa u toku vuče, seriju završavaju leđni ekstenzori.',
      'Zaobljena donja leđa već u početnoj poziciji.',
    ],
    query: 't bar row proper form',
  },
  'carter-ext': {
    id: 'carter-ext',
    name: 'Carter extension',
    group: 'Triceps, duga glava',
    tempo: '2 s vraćanje, 1 s opružanje, 1 s stisak',
    steps: [
      'Kabl iz visoke pozicije, uzmi uže i okreni se od mašine, ruke iznad glave.',
      'Nakloni trup napred, laktovi visoko i fiksirani uz uši.',
      'Opruži laktove napred i nagore, na kraju razdvoji uže i stisni triceps.',
      'Vrati sporo do punog rastega, nadlaktice se ne pomeraju.',
    ],
    mistakes: [
      'Laktovi padaju nadole i napred, pokret prelazi u pullover.',
      'Rad iz kukova i trupa umesto samo iz lakta.',
    ],
    query: 'carter extension triceps cable form',
  },
  'preacher-curl': {
    id: 'preacher-curl',
    name: 'Preacher curl',
    group: 'Biceps',
    tempo: '1 s gore, 3 s spuštanje',
    steps: [
      'Pazuh nasloni na vrh jastuka, nadlaktica celom dužinom leži na podlozi.',
      'Ruke opružene ali ne zaključane, hvat u širini ramena.',
      'Savij do vrha bez odvajanja lakta od jastuka.',
      'Spuštaj sporo do skoro pune ekstenzije i tu zaustavi pokret.',
    ],
    mistakes: [
      'Odbijanje sa dna, start iz opružene ruke zamahom, to je najbrži način da se povredi tetiva bicepsa.',
      'Podizanje laktova sa jastuka u završnici pokreta.',
    ],
    query: 'preacher curl proper form',
  },
  pullup: {
    id: 'pullup',
    name: 'Zgib',
    group: 'Leđa i biceps',
    tempo: '1 s vuča, 2 s spuštanje',
    steps: [
      'Hvat malo širi od ramena, dlanovi od sebe, visi u punoj dužini ruku.',
      'Aktiviraj lopatice pre vuče, ramena spusti od ušiju.',
      'Vuci laktove ka rebrima dok brada ne prođe iznad šipke.',
      'Spuštaj kontrolisano do pune dužine ruku, bez zaletanja u sledeće ponavljanje.',
    ],
    mistakes: [
      'Zamah nogama i kukovima, telo se baca gore umesto da leđa vuku.',
      'Polovičan opseg, brada ne prelazi šipku ili se ruke ne opruže dole.',
    ],
    query: 'pull up proper form',
  },
  pushup: {
    id: 'pushup',
    name: 'Sklek',
    group: 'Grudi, triceps, rameni',
    tempo: '2 s spuštanje, 1 s guranje',
    steps: [
      'Ruke malo šire od ramena, dlanovi u nivou grudi, ne u nivou ramena.',
      'Telo u pravoj liniji, stisni zadnjicu i trbuh pre prvog ponavljanja.',
      'Spuštaj dok grudi ne dođu na par centimetara od poda, laktovi pod 45 stepeni.',
      'Guraj do pune ekstenzije laktova bez podizanja kukova.',
    ],
    mistakes: [
      'Kukovi vise i donja leđa se uvijaju u luk.',
      'Glava i vrat idu prvi ka podu, a grudi ostaju visoko.',
    ],
    query: 'push up proper form',
  },
  dip: {
    id: 'dip',
    name: 'Propadanje',
    group: 'Grudi i triceps',
    tempo: '2 s spuštanje, 1 s guranje',
    steps: [
      'Podigni se na ručke sa opruženim rukama, ramena spusti od ušiju.',
      'Blago nagni trup napred ako ciljaš grudi, ostani uspravan za triceps.',
      'Spuštaj do ugla od 90 stepeni u laktu i ne dublje.',
      'Guraj nagore do skoro punog opruženja, bez zaključavanja laktova.',
    ],
    mistakes: [
      'Spuštanje ispod 90 stepeni u laktu, prednja kapsula ramena preuzima celu težinu.',
      'Ramena se podižu ka ušima na dnu i lopatice gube kontrolu.',
    ],
    query: 'dips proper form chest triceps',
  },
  squat: {
    id: 'squat',
    name: 'Čučanj',
    group: 'Kvadriceps i zadnjica',
    tempo: '2 s spuštanje, 1 s ustajanje',
    steps: [
      'Stopala u širini ramena, prsti blago izvučeni van, težina po celom stopalu.',
      'Spuštaj kukove nazad i naniže, grudi ostaju otvorene.',
      'Idi dok butine ne prođu paralelu, ako mobilnost dozvoljava.',
      'Ustaj kroz pete i sredinu stopala, kolena idu u liniji sa prstima.',
    ],
    mistakes: [
      'Pete se odvajaju od poda i težina beži na prste.',
      'Karlica se podvija na dnu i donja leđa se zaobljavaju.',
    ],
    query: 'bodyweight squat proper form',
  },
  crunch: {
    id: 'crunch',
    name: 'Trbušnjaci',
    group: 'Trbuh',
    tempo: '1 s gore, 1 s stisak, 2 s spuštanje',
    steps: [
      'Legni, kolena savijena, donja leđa prilepljena za pod.',
      'Ruke sa strane glave bez povlačenja vrata.',
      'Uvij rebra ka karlici i podigni lopatice sa poda, izdahni na vrhu.',
      'Spuštaj sporo i zadrži napetost, ne odmaraj potpuno između ponavljanja.',
    ],
    mistakes: [
      'Vučenje glave rukama, vrat radi umesto trbuha.',
      'Podizanje celog trupa iz kuka, trbušni mišići se samo izometrijski skupljaju.',
    ],
    query: 'crunch abs proper form',
  },
}

export const YOUTUBE_SEARCH = 'https://www.youtube.com/results?search_query='

export function searchUrl(id: ExerciseId): string {
  return YOUTUBE_SEARCH + encodeURIComponent(EXERCISES[id].query)
}
