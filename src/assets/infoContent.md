# Často kladené otázky

## Odkud se data berou? Jsou ověřená?

Veškerá data o aktivních případech v jednotlivých obcích jsou čerpána z [otevřené datové sady Ministerstva zdravotnictví ČR](https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19). Počty obyvatel (pro výpočet aktivních případů na 1000 obyvatel) pochází z [datové sady Českého statistického úřadu](https://www.czso.cz/csu/czso/pocet-obyvatel-v-obcich-k-112019). Data nejsou na straně webu Covid v obcích nijak upravena, vždy jsou prezentovány pouze oficiální údaje z výše uvedených zdrojů.

## Jak často jsou data aktualizována?

K aktualizaci dochází 1× denně, zpravidla v ranních hodinách. Datum a čas poslední aktualizace dat je zobrazen v patičce webu. Nejnovější údaje o nových případech jsou vždy za předchozí den.

## Kdo provozuje web Covid v obcích?

Tento web není oficiálním informačním kanálem Ministerstva zdravotnictví, nestojí za ním žádná organizace ani mediální dům. Web vytvářím a spravuji ve volném čase, v případě dotazů či připomínek mě můžete kontaktovat na e-mailu covid-obce@petrhovorka.com nebo na síti [LinkedIn](https://www.linkedin.com/in/pehovorka/). Zdrojové kódy tohoto webu lze nalézt na mém [GitHubu](https://github.com/search?q=user%3Apehovorka+covidvobcich).

## Proč vznikl tento web?

K vytvoření tohoto webu mě dovedlo to, že jsem nenašel žádný podobný nástroj, který by přehledně ukazoval vývoj koronavirové situace v jednotlivých obcích. Oficiální data byla dostupná pouze ve formě velkých datových souborů, které sice obsahovaly vše podstatné, ale nikdo je přehledně neprezentoval. Různé zpravodajské servery počty případů nákazy koronavirem v obcích znázorňovaly v mapce. Ta sice vypadá efektně, ale není příliš praktická pro každodenní použití. Navíc zobrazuje pouze stav v konkrétní den, ne historický vývoj v grafu.

## Kde naleznu více informací?

Přehledné informace o aktuálních opatřeních v souvislosti se šířením Covid-19 můžete nalézt na oficiálním Covid Portálu Ministerstva vnitra – [covid.gov.cz](http://covid.gov.cz/). Další informace jsou dostupné na webu Ministerstva zdravotnictví věnovaném koronaviru – [koronavirus.mzcr.cz](http://koronavirus.mzcr.cz).

---

# Popis dat

## Epidemiologická charakteristika obcí

### Aktivní případy

Počet osob pozitivně testovaných na původce onemocnění COVID‑19, které nebyly k danému datu dosud označeny za vyléčené ani nezemřely.

### Nové případy

Celkový počet nově diagnostikovaných osob za daný den.

### Nové případy – osoby mladší 65

Počet nově diagnostikovaných za daný den ve věkové skupině 0-64.

### Nové případy – osoby 65+

Počet nově diagnostikovaných za daný den ve věkové skupině 65+.

### Nové případy – sedmidenní průměr

Sedmidenní průměr celkového denního počtu nově diagnostikovaných osob.

## Přehled vykázaných očkování podle ORP

Množství vykázaných očkování dle bydliště očkované osoby na úrovni obce s rozšířenou působností. Více informací o správních obvodech obcí s rozšířenou působností si [lze přečíst na Wikipedii](https://cs.wikipedia.org/wiki/Obec_s_roz%C5%A1%C3%AD%C5%99enou_p%C5%AFsobnost%C3%AD).

### Vykázaná očkování dle pořadí dávky

- **Dávka** – pořadí dávky (první, druhá, první posilující, druhá posilující) danou očkovací látkou.
- **% obyvatel** – podíl vykázaných dávek očkování daným pořadím dávky na území ORP k celkovému počtu obyvatel ve správním obvodu zvolené ORP (celkový počet obyvatel ve správním obvodu ORP lze nalézt pod tabulkou)
- **Celkem dávek** – počet vykázaných dávek očkování daným pořadím dávky na území ORP za celou dobu
- **Nových dávek** – počet vykázaných dávek očkování daným pořadím dávky na území ORP za poslední den

### Rozdělení dle typu očkovací látky

V současné době se očkuje těmito vakcínami:

- **Comirnaty** – vakcína od firem Pfizer a BioNTech
- **SPIKEVAX** – vakcína od firmy Moderna
- **VAXZEVRIA** – vakcína od firmy AstraZeneca
- **COVID-19 Vaccine Janssen** – vakcína od firmy Johnson & Johnson

Více informací o jednotlivých očkovacích látkách lze nalézt na [Národním zdravotnickém informačním portálu](https://www.nzip.cz/clanek/1079-overene-informace-o-vakcinach-proti-covid-19).

### Nově vykázaná očkování dle pořadí dávky

Přehled nově vykázaných dávek očkování dle pořadí dávky v jednotlivé dny. Čára značí sedmidenní průměr všech vykázaných dávek bez ohledu na pořadí dávky.

### Vykázaná očkování dle pořadí dávky kumulativně

Kumulativní počet vykázaných dávek očkování dle pořadí dávky včetně podílu vykázaných dávek očkování daným pořadím dávky na území ORP k celkovému počtu obyvatel ve správním obvodu zvolené ORP.

---
