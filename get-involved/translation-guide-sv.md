# Global Governance Frameworks - översättarkit

Välkommen till Global Governance Frameworks översättningsprogram! Den här guiden hjälper dig att bidra till att göra dessa kritiska styrningsramverk tillgängliga på ditt språk.

## 🌍 Varför översättning är viktigt

Global Governance Frameworks behandlar mänsklighetens mest brådskande utmaningar - från klimatförändringar till digital styrning till fredsbyggande. Genom att översätta dessa ramverk hjälper du samhällen världen över att få tillgång till verktyg för positiv förändring på sitt modersmål.

## 📋 Checklista för att komma igång

- [ ] Granska hela denna guide
- [ ] Konfigurera GitHub-åtkomst
- [ ] Välj ditt/dina ramverk att översätta
- [ ] Gå med i översättningsgemenskapen
- [ ] Ladda ner nödvändiga verktyg

## 🔧 Teknisk installation

### 1. GitHub repository-åtkomst

**Repository URL:** https://github.com/GlobalGovernanceFramework/governance-framework-site

#### Installera Git (välj ditt operativsystem)

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
# Konfigurera din identitet (krävs för commits)
git config --global user.name "Ditt namn"
git config --global user.email "din.email@example.com"
```

#### Forka och klona repository

**Steg 1: Forka på GitHub**
1. Gå till https://github.com/GlobalGovernanceFramework/governance-framework-site
2. Klicka på "Fork"-knappen i det övre högra hörnet
3. Detta skapar en kopia i ditt GitHub-konto

**Steg 2: Klona din fork**
```bash
# Ersätt 'dittanvändarnamn' med ditt faktiska GitHub-användarnamn
git clone https://github.com/dittanvändarnamn/governance-framework-site.git

# Navigera in i projektet
cd governance-framework-site

# Lägg till det ursprungliga repository som upstream (för att få uppdateringar)
git remote add upstream https://github.com/GlobalGovernanceFramework/governance-framework-site.git
```

**Steg 3: Skapa din översättningsgren**
```bash
# Skapa och växla till en ny gren för din översättning
git checkout -b translate-[ramverk-namn]-[språkkod]

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
        ├── peace/           # Fred & konfliktlösning
        ├── mental-health/   # Mental hälsa
        ├── education/       # Utbildning
        ├── technology/      # Teknologi
        └── [andra-ramverk]/
```

## 📝 Vad som ska översättas

### Prioritet 1: ramverksinnehållsfiler

**Plats:** `/src/lib/content/frameworks/[språk]/implementation/[ramverk-namn]/`

**Filtyper:**
- `*.md` filer - Huvudsakligt ramverksinnehåll (Markdown-format)
- Enskilda sektionsfiler (t.ex. `core-principles.md`, `implementation-timeline.md`)

**Exempel på ramverksmappar:**
- `peace/` - Fred & konfliktlösningsramverk
- `mental-health/` - Mental hälsa-ramverk  
- `education/` - Utbildningsramverk
- `technology/` - Teknikstyrningsramverk
- `environmental-stewardship/` - Miljöförvaltningsramverk

### Prioritet 2: användargränssnittstext

**Plats:** `/src/lib/i18n/[språkkod].json`

**Innehåller:**
- Navigationsmenyer
- Knapplabels
- Formulärtext
- Allmänna webbplatsgränssnittselement

### Prioritet 3: visuella tillgångar

**Plats:** `/static/images/frameworks/`

**Filnamnskonvention:**
- `framework-diagram-en.svg` (engelska)
- `framework-diagram-sv.svg` (svenska)
- `framework-diagram-[din-språkkod].svg` (ditt språk)

*Obs: SVG-redigering kräver grafiska designverktyg som Inkscape (gratis) eller Adobe Illustrator*

## 🗣️ Språkkoder

Använd standard ISO 639-1 koder:

| Språk | Kod | Exempel mapp |
|-------|-----|---------------|
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

### 1. Nyckelprinciper

**Noggrannhet först:** Behåll den exakta betydelsen av tekniska och policykoncept
**Kulturell anpassning:** Anpassa exempel och referenser till din lokala kontext när det är lämpligt
**Konsekvens:** Använd samma översättning för återkommande termer genomgående
**Tillgänglighet:** Skriv på ett tydligt, tillgängligt språk för din målgrupp

### 2. Ton och stil

- **Formell men tillgänglig** - Dessa är seriösa policydokument som bör vara förståeliga
- **Aktiv röst föredras** - "Regeringar bör implementera..." inte "Implementering bör göras av regeringar..."
- **Könsneutralt språk** - Använd inkluderande språk som är lämpligt för ditt språks konventioner
- **Professionell terminologi** - Behåll teknisk noggrannhet samtidigt som läsbarheten säkerställs

### 3. Hantering av tekniska termer

**Översätt INTE:**
- Egennamn (Förenta Nationerna, IPCC, etc.)
- Etablerade tekniska akronymer (AI, BNP, CO2, etc.)
- Ramverksnamn (behåll "Global Governance Frameworks")

**Översätt MEN behåll konsekvens:**
- Policykoncept (styrning, hållbarhet, motståndskraft)
- Implementeringstermer (bedömning, övervakning, utvärdering)
- Sociala koncept (samhällsengagemang, intressentdeltagande)

## 🔑 Nyckeltermer ordlista

| Engelsk term | Definition | Översättningsanteckningar |
|--------------|------------|---------------------------|
| **Polycrisis** | Flera, sammankopplade kriser som inträffar samtidigt | Ny term - kan behöva förklaring på ditt språk |
| **Ecocide Law** | Juridiskt ramverk som kriminaliserar allvarlig miljöförstöring | Juridisk term - undersök motsvarighet i din jurisdiktion |
| **Digital Governance** | Ramverk för styrning av digital teknik och rum | Framväxande område - kan behöva kontextuell förklaring |
| **Stakeholder Engagement** | Process för att involvera berörda parter i beslutsfattande | Vanligt inom policy - hitta etablerad motsvarighet |
| **Implementation Timeline** | Schemalagda faser för att omsätta ramverk i praktiken | Standard projektledningsterm |
| **Cross-Domain Integration** | Koordination över olika policyområden | Teknisk term - behåll precision |
| **Trauma-Informed Approaches** | Metoder som erkänner och svarar på traumapåverkan | Klinisk/social term - använd etablerad översättning |
| **Value Systems** | Grundläggande övertygelser och principer som styr beteende | Filosofiskt koncept - kulturell anpassning kan behövas |

## 📋 Översättningsarbetsflöde

### Steg 1: välj ditt ramverk
1. Granska tillgängliga ramverk på: [website-url]/frameworks
2. Kontrollera befintliga översättningar i `/src/lib/content/frameworks/`
3. Välj oöversatt ramverk eller sektioner som behöver uppdateringar

### Steg 2: konfigurera din arbetsyta
1. Skapa språkmapp: `/frameworks/[din-språkkod]/implementation/[ramverk-namn]/`
2. Kopiera engelska källfiler som mallar
3. Skapa spårningsdokument för dina framsteg

### Steg 3: översättningsprocess
1. **Första genomgång:** Översätt innehåll, fokusera på mening över perfektion
2. **Granskningsgenomgång:** Kontrollera terminologikonsekvens och flyt
3. **Kulturell genomgång:** Anpassa exempel och referenser för lokal kontext
4. **Slutlig genomgång:** Korrekturläs för grammatik, stavning och formatering

### Steg 4: kvalitetssäkring
1. **Självgranskning** mot källmaterial
2. **Kollegiegranskning** med andra modersmålstalare
3. **Ämnesexpertgranskning** (om tillgänglig)
4. **Gemenskapsfeedback** via översättningsforum

### Steg 5: inlämning

**Spara ditt arbete:**
```bash
# Lägg till dina översatta filer
git add .

# Commit med beskrivande meddelande
git commit -m "Lägg till svensk översättning för fredsramverkets grundsektioner"

# Pusha till din fork
git push origin translate-peace-sv
```

**Skapa pull request:**
1. Gå till din fork på GitHub
2. Klicka på "Compare & pull request"-knappen
3. Lägg till tydlig titel: "Svensk översättning: fredsramverk [sektioner]"
4. Beskriv vad du har översatt och eventuella anteckningar för granskare
5. Skicka pull request

**Svara på feedback:**
- Kontrollera GitHub-notifikationer för granskningskommentarer
- Gör begärda ändringar och pusha uppdateringar
- Fira ditt bidrag! 🎉

## 👥 Översättningsgemenskap

### Kommunikationskanaler

**Discord-server:** Gå med i vår översättningsgemenskap på https://discord.gg/Zx4hMJf4JU
- **#translation-lab kanal** (under 🤝 WORKSPACES kategori) för koordination, frågor och samarbete
- Realtidschatt med andra översättare
- Röstkanaler för teammöten

**GitHub diskussioner:** Använd repository-diskussioner för tekniska frågor och pull request-koordination

### Teamroller

**Huvudöversättare:** Primär person ansvarig för ramverkets slutförande
**Granskare:** 2-3 personer som kontrollerar översättningar för noggrannhet och flyt
**Kulturell rådgivare:** Lokal expert som säkerställer kulturell lämplighet
**Teknisk koordinator:** Hjälper med GitHub och formateringsfrågor

### Granskningsstandarder

**Tvågranskarsystem:** Varje översättning bör granskas av minst två andra modersmålstalare
**Ämnesgranskning:** Komplexa tekniska sektioner bör granskas av experter inom relevanta områden
**Gemenskapsinput:** Utkast av översättningar bör delas för bredare gemenskapsfeedback

## 🛠️ Verktyg och resurser

### Nödvändiga verktyg
- **Textredigerare:** VS Code (rekommenderas), Sublime Text, eller någon markdown-redigerare
- **GitHub Desktop:** För enklare repository-hantering (valfritt)
- **Markdown-förhandsvisning:** Webbläsartillägg eller redigerarplugin

### Hjälpsamma resurser
- **DeepL/Google Translate:** För initiala utkast (granska alltid noggrant)
- **Terminologidatabaser:** FN-terminologi, EU-terminologi, områdesspecifika ordlistor
- **Stilguider:** Statliga eller akademiska stilguider på ditt språk
- **CAT-verktyg:** Översättningsminnesverktyg för konsekvens (valfritt)

### Referensmaterial
- Ursprunglig ramverksdokumentation
- Relaterade policydokument på ditt språk
- Akademiska uppsatser inom relevanta områden
- Statliga policydokument som använder liknande terminologi

## 📏 Kvalitetsstandarder

### Innehållsnoggrannhet
- [ ] Mening bevarad från källtext
- [ ] Tekniska koncept korrekt översatta
- [ ] Kulturella referenser lämpligt anpassade
- [ ] Juridiska och policytermer använder etablerade konventioner

### Språkkvalitet
- [ ] Grammatik och stavning korrekt
- [ ] Konsekvent terminologi genomgående
- [ ] Lämplig register och ton
- [ ] Naturligt flyt på målspråket

### Formateringsstandarder
- [ ] Markdown-formatering bevarad
- [ ] Rubriker och struktur bibehållen
- [ ] Länkar och referenser lämpligt uppdaterade
- [ ] Listor och tabeller korrekt formaterade

## 🚀 Komma igång

### Nybörjarvänliga första projekt

1. **Ramverksöversiktssidor** - Börja med översikter på hög nivå
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

**Discord-support:** Gå med i #translation-lab på https://discord.gg/Zx4hMJf4JU för:
- Realtidshjälp från andra översättare
- Teknisk vägledning
- Koordination med språkteam
- Allmänna frågor och gemenskapsstöd

**Tekniska problem:** Skapa GitHub-ärende med "translation"-etikett för repository-specifika problem

### Bidra tillbaka

Ditt översättningsarbete hjälper den globala gemenskapen. Överväg att:
- Dela dina ordlistor med andra översättare
- Mentora nya översättare på ditt språk
- Ge feedback på översättningsprocesser
- Bidra till stilguider och bästa praxis

## 🎯 Framgångsmått

Vi mäter översättningspåverkan genom:
- **Slutförandegrad:** Procentandel av ramverk översatt
- **Kvalitetspoäng:** Gemenskaps- och expertgranskningsbetyg
- **Användningsanalys:** Nedladdningar och sidvisningar av översatt innehåll
- **Gemenskapstillväxt:** Nya översättare som går med i språkteam

## 📅 Tidslinjeförväntningar

**Enskild sektion:** 1-2 veckor (5-10 sidor)
**Komplett ramverk:** 2-3 månader (50-100 sidor)
**Fullständig granskningsprocess:** 2-4 veckor ytterligare
**Publicering:** 1 vecka efter slutligt godkännande

## 🏆 Erkännande

Bidragsgivare kommer att erkännas på vår dedikerade bidragsgivarsida, som erkänner ditt värdefulla arbete med att göra globala styrningsramverk tillgängliga världen över.

*Senast uppdaterad: [2025-06-29] | Version 1.0*
*För uppdateringar av denna guide, kontrollera repositorys översättningsdokumentation.*
