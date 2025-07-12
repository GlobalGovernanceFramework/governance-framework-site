# Global Governance Frameworks - Översättarkit

Välkommen till Global Governance Frameworks översättningsprogram! Den här guiden hjälper dig att bidra till att göra dessa kritiska styrningsramverk tillgängliga på ditt språk.

## 🌍 Varför översättning spelar roll

Global Governance Frameworks adresserar mänsklighetens mest akuta utmaningar - från klimatförändringar till digital styrning till fredsbyggande. Genom att översätta dessa ramverk hjälper du samhällen världen över att få tillgång till verktyg för positiv förändring på sitt modersmål.

## 📋 Checklista för att komma igång

- [ ] Läs igenom hela denna guide
- [ ] Konfigurera GitHub-åtkomst
- [ ] Välj ditt ramverk/dina ramverk att översätta
- [ ] Gå med i översättningsgemenskapen
- [ ] Ladda ner nödvändiga verktyg

## 🔧 Teknisk installation

### 1. Åtkomst till GitHub-repositoriet

**Repositorie-URL:** https://github.com/GlobalGovernanceFrameworks/website

#### Installera Git (Välj ditt operativsystem)

**Windows:**
1. Ladda ner Git från https://git-scm.com/download/win
2. Kör installationsprogrammet med standardinställningar
3. Öppna "Git Bash" från Start-menyn

**macOS:**
```bash
# Alternativ 1: Installera via Homebrew (rekommenderas)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git

# Alternativ 2: Installera Xcode Command Line Tools
xcode-select --install
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install git
```

**Linux (CentOS/RHEL/Fedora):**
```bash
# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

#### Konfigurera Git
```bash
# Konfigurera din identitet (kravs for commits)
git config --global user.name "Ditt Namn"
git config --global user.email "din.epost@exempel.se"
```

#### Forka och klona repositoriet

**Steg 1: Forka på GitHub**
1. Gå till https://github.com/GlobalGovernanceFrameworks/website
2. Klicka på "Fork"-knappen i övre högra hörnet
3. Detta skapar en kopia på ditt GitHub-konto

**Steg 2: Klona din fork**
```bash
# Ersatt 'dittanvandarnamn' med ditt faktiska GitHub-anvandarnamn
git clone https://github.com/dittanvandarnamn/governance-frameworks-site.git

# Navigera in i projektet
cd governance-frameworks-site

# Lagg till det ursprungliga repositoriet som upstream (for att fa uppdateringar)
git remote add upstream https://github.com/GlobalGovernanceFrameworks/website
```

**Steg 3: Skapa din översättningsgren**
```bash
# Skapa och vaxla till en ny gren for din oversattning
git checkout -b translate-[ramverk-namn]-[sprakkod]

# Exempel: 
git checkout -b translate-peace-sv
```

### 2. Förstå filstrukturen

Ramverken är organiserade enligt följande:

```
/src/lib/content/frameworks/
├── en/               # Engelska (källspråk)
├── sv/               # Svenska 
├── es/               # Spanska
├── fr/               # Franska
└── [ditt-språk]/     # Ditt målspråk
    └── implementation/
        ├── peace-and-conflict-resolution/           # Fred och konfliktlösning
        ├── mental-health-governance/                # Mentalhälsostyrning
        ├── educational-systems/                     # Utbildningssystem
        ├── technology-governance/                   # Teknikstyrning
        └── [andra-ramverk]/
```

## 📝 Vad som ska översättas

### Prioritet 1: Ramverksinnehållsfiler

**Plats:** `/src/lib/content/frameworks/[språk]/implementation/[ramverk-namn]/`

**Filtyper:**
- `*.md`-filer - Huvudsakligt ramverksinnehåll (Markdown-format)
- Individuella sektionsfiler (t.ex. `core-principles.md`, `implementation-timeline.md`)

**Exempel på ramverksmappar:**
- `peace-and-conflict-resolution/` - Ramverk för fred och konfliktlösning
- `mental-health-governance/` - Mentalhälsoramverk  
- `educational-systems/` - Utbildningsramverk
- `technology-governance/` - Teknikstyrningsramverk
- `environmental-stewardship/` - Miljöförvaltningsramverk

### Prioritet 2: Användargränssnittstext

**Plats:** `/src/lib/i18n/[språkkod].json`

**Innehåller:**
- Navigeringsmenyer
- Knappetiketter
- Formulärtext
- Allmänna webbplatsgränssnittselement

### Prioritet 3: Visuella tillgångar

**Plats:** `/static/images/frameworks/`

**Filnamnskonvention:**
- `framework-diagram-en.svg` (Engelska)
- `framework-diagram-sv.svg` (Svenska)
- `framework-diagram-[din-språkkod].svg` (Ditt språk)

*Obs: SVG-redigering kräver grafiska designverktyg som Inkscape (gratis) eller Adobe Illustrator*

## 🗣️ Språkkoder

Använd standard ISO 639-1-koder:

| Språk | Kod | Exempelmapp |
|-------|-----|-------------|
| Svenska | sv | `/frameworks/sv/` |
| Spanska | es | `/frameworks/es/` |
| Franska | fr | `/frameworks/fr/` |
| Tyska | de | `/frameworks/de/` |
| Portugisiska | pt | `/frameworks/pt/` |
| Arabiska | ar | `/frameworks/ar/` |
| Kinesiska (förenklad) | zh | `/frameworks/zh/` |
| Hindi | hi | `/frameworks/hi/` |
| Japanska | ja | `/frameworks/ja/` |
| Ryska | ru | `/frameworks/ru/` |

## 📖 Översättningsriktlinjer

### 1. Huvudprinciper

**Noggrannhet först:** Behåll den exakta betydelsen av tekniska och politiska begrepp
**Kulturell anpassning:** Anpassa exempel och referenser till ditt lokala sammanhang när det är lämpligt
**Konsekvens:** Använd samma översättning för återkommande termer genomgående
**Tillgänglighet:** Skriv på klart, tillgängligt språk för din målgrupp

### 2. Ton och stil

- **Formell men tillgänglig** - Detta är seriösa policydokument som bör vara förståeliga
- **Aktiv röst föredras** - "Regeringar bör implementera..." inte "Implementering bör göras av regeringar..."
- **Könsneutralt språk** - Använd inkluderande språk som är lämpligt för ditt språks konventioner
- **Professionell terminologi** - Behåll teknisk noggrannhet samtidigt som du säkerställer läsbarhet

### 3. Hantering av tekniska termer

**Översätt INTE:**
- Egennamn (Förenta Nationerna, IPCC, etc.)
- Etablerade tekniska akronymer (AI, GDP, CO2, etc.)
- Ramverksnamn (behåll "Global Governance Frameworks")

**Översätt men behåll konsekvens:**
- Policybegrepp (styrning, hållbarhet, motståndskraft)
- Implementeringstermer (bedömning, övervakning, utvärdering)
- Sociala begrepp (samhällsengagemang, intressentdeltagande)

## 🔑 Ordlista för nyckeltermer

| Engelsk term | Definition | Översättningsanteckningar |
|--------------|------------|---------------------------|
| **Polycrisis** | Flera, sammankopplade kriser som inträffar samtidigt | Ny term - kan behöva förklaring på ditt språk |
| **Ecocide Law** | Juridiskt ramverk som kriminaliserar allvarlig miljöförstöring | Juridisk term - undersök motsvarighet i din jurisdiktion |
| **Digital Governance** | Ramverk för styrning av digital teknik och digitala rum | Framväxande område - kan behöva kontextuell förklaring |
| **Stakeholder Engagement** | Process för att involvera berörda parter i beslutsfattande | Vanligt inom policy - hitta etablerad motsvarighet |
| **Implementation Timeline** | Schemalagda faser för att sätta ramverk i praktiken | Standard projektledningsterm |
| **Cross-Domain Integration** | Koordination mellan olika policyområden | Teknisk term - behåll precision |
| **Trauma-Informed Approaches** | Metoder som erkänner och svarar på traumapåverkan | Klinisk/social term - använd etablerad översättning |
| **Value Systems** | Grundläggande övertygelser och principer som vägleder beteende | Filosofiskt begrepp - kulturell anpassning kan behövas |

## 📋 Översättningsarbetsflöde

### Steg 1: Välj ditt ramverk
1. Granska tillgängliga ramverk på: [webbplats-url]/frameworks
2. Kontrollera befintliga översättningar i `/src/lib/content/frameworks/`
3. Välj oöversatt ramverk eller sektioner som behöver uppdateringar

### Steg 2: Sätt upp din arbetsyta
1. Skapa språkmapp: `/frameworks/[din-språkkod]/implementation/[ramverk-namn]/`
2. Kopiera engelska källfiler som mallar
3. Skapa spårningsdokument för dina framsteg

### Steg 3: Översättningsprocess
1. **Första genomgången:** Översätt innehåll, fokusera på betydelse över perfektion
2. **Granskningsgenomgång:** Kontrollera terminologikonsekvens och flöde
3. **Kulturell genomgång:** Anpassa exempel och referenser för lokalt sammanhang
4. **Slutlig genomgång:** Korrekturläs för grammatik, stavning och formatering

### Steg 4: Kvalitetssäkring
1. **Självgranskning** mot källmaterial
2. **Kollegial granskning** med andra modersmålstalare
3. **Ämnesexpertgranskning** (om tillgänglig)
4. **Gemenskapsfeedback** via översättningsforum

### Steg 5: Inlämning

**Spara ditt arbete:**
```bash
# Lagg till dina oversatta filer
git add .

# Commita med beskrivande meddelande
git commit -m "Lagg till svensk oversattning for fredsramverkets karnsektioner"

# Pusha till din fork
git push origin translate-peace-sv
```

**Skapa Pull Request:**
1. Gå till din fork på GitHub
2. Klicka på "Compare & pull request"-knappen
3. Lägg till tydlig titel: "Svensk översättning: Fredsramverk [sektioner]"
4. Beskriv vad du har översatt och eventuella anteckningar för granskare
5. Skicka in pull requesten

**Svara på feedback:**
- Kontrollera GitHub-notifikationer för granskningskommentarer
- Gör begärda ändringar och pusha uppdateringar
- Fira ditt bidrag! 🎉

## 👥 Översättningsgemenskap

### Kommunikationskanaler

**Discord Server:** Gå med i vår översättningsgemenskap på https://discord.gg/Zx4hMJf4JU
- **#translation-lab kanal** (under 🤝 WORKSPACES-kategorin) för koordinering, frågor och samarbete
- Realtidschatt med andra översättare
- Röstkanaler för teammöten

**GitHub Discussions:** Använd repositoriediskussioner för tekniska frågor och pull request-koordinering

### Teamroller

**Huvudöversättare:** Primär person ansvarig för ramverkscomplettering
**Granskare:** 2-3 personer som kontrollerar översättningar för noggrannhet och flöde
**Kulturell rådgivare:** Lokal expert som säkerställer kulturell lämplighet
**Teknisk koordinator:** Hjälper med GitHub och formateringsfrågor

### Granskningsstandarder

**Två-granskare-system:** Varje översättning bör granskas av minst två andra modersmålstalare
**Ämnesgranskning:** Komplexa tekniska sektioner bör granskas av experter inom relevanta områden
**Gemenskapsinput:** Utkast till översättningar bör delas för bredare gemenskapsfeedback

## 🛠️ Verktyg och resurser

### Nödvändiga verktyg
- **Textredigerare:** VS Code (rekommenderas), Sublime Text, eller vilken markdown-redigerare som helst
- **GitHub Desktop:** För enklare repositoriehantering (valfritt)
- **Markdown Preview:** Webbläsartillägg eller redigerarplugin

### Hjälpsamma resurser
- **DeepL/Google Translate:** För första utkast (granska alltid noggrant)
- **Terminologidatabaser:** FN-terminologi, EU-terminologi, områdesspecifika ordlistor
- **Stilguider:** Statliga eller akademiska stilguider på ditt språk
- **CAT-verktyg:** Översättningsminnesverktyg för konsekvens (valfritt)

### Referensmaterial
- Original ramverksdokumentation
- Relaterade policydokument på ditt språk
- Akademiska artiklar inom relevanta områden
- Statliga policydokument som använder liknande terminologi

## 📏 Kvalitetsstandarder

### Innehållsnoggrannhet
- [ ] Betydelse bevarad från källtext
- [ ] Tekniska begrepp korrekt översatta
- [ ] Kulturella referenser lämpligt anpassade
- [ ] Juridiska och policytermer använder etablerade konventioner

### Språkkvalitet
- [ ] Grammatik och stavning korrekt
- [ ] Konsekvent terminologi genomgående
- [ ] Lämplig register och ton
- [ ] Naturligt flöde på målspråket

### Formateringsstandarder
- [ ] Markdown-formatering bevarad
- [ ] Rubriker och struktur bibehållen
- [ ] Länkar och referenser lämpligt uppdaterade
- [ ] Listor och tabeller korrekt formaterade

## 🚀 Komma igång

### Nybörjarvänliga första projekt

1. **Ramverksöversiktssidor** - Börja med högnivåsammanfattningar
2. **Implementeringsguider** - Praktiskt, mindre tekniskt innehåll
3. **Ordlistesektioner** - Korta, avgränsade översättningsuppgifter
4. **Användargränssnittselement** - JSON-filöversättningar

### Avancerade projekt

1. **Komplett ramverksöversättning** - Fullständiga policyramverk
2. **Skapande av visuella tillgångar** - SVG-diagram och infografik
3. **Kulturella anpassningsguider** - Kontextspecifika implementeringsanteckningar
4. **Granskning och kvalitetssäkring** - Hjälp till att förbättra befintliga översättningar

## 📞 Support och kontakt

### Få hjälp

**Discord Support:** Gå med i #translation-lab på https://discord.gg/Zx4hMJf4JU för:
- Realtidshjälp från andra översättare
- Teknisk vägledning
- Koordinering med språkteam
- Allmänna frågor och gemenskapsstöd

**Tekniska problem:** Skapa GitHub-issue med "translation"-etikett för repositoriespecifika problem

### Bidra tillbaka

Ditt översättningsarbete hjälper den globala gemenskapen. Överväg att:
- Dela dina ordlistor med andra översättare
- Mentora nya översättare på ditt språk
- Ge feedback om översättningsprocesser
- Bidra till stilguider och bästa praxis

## 🎯 Framgångsmått

Vi mäter översättningens påverkan genom:
- **Kompletteringsgrad:** Procent av ramverk översatt
- **Kvalitetspoäng:** Gemenskap- och expertgranskningsbetyg
- **Användningsanalys:** Nedladdningar och sidvisningar av översatt innehåll
- **Gemenskapstillväxt:** Nya översättare som går med i språkteam

## 📅 Tidslinjeförväntningar

**Individuell sektion:** 1-2 veckor (5-10 sidor)
**Komplett ramverk:** 2-3 månader (50-100 sidor)
**Fullständig granskningsprocess:** 2-4 veckor ytterligare
**Publicering:** 1 vecka efter slutgiltigt godkännande

## 🏆 Erkännande

Bidragsgivare kommer att erkännas på vår dedikerade bidragsgivarsida, som erkänner ditt värdefulla arbete med att göra globala styrningsramverk tillgängliga världen över.

*Senast uppdaterad: [2025-06-29] | Version 1.0*
*För uppdateringar av denna guide, kolla repositoriets översättningsdokumentation.*
