# Global Governance Frameworks - Translator's Kit

Welcome to the Global Governance Frameworks Translation Program! This guide will help you contribute to making these critical governance frameworks accessible in your language.

## 🌍 Why Translation Matters

The Global Governance Frameworks addresses humanity's most pressing challenges - from climate change to digital governance to peace-building. By translating these frameworks, you're helping communities worldwide access tools for positive change in their native language.

## 📋 Getting Started Checklist

- [ ] Review this entire guide
- [ ] Set up GitHub access
- [ ] Choose your framework(s) to translate
- [ ] Join the translation community
- [ ] Download necessary tools

## 🔧 Technical Setup

### 1. GitHub Repository Access

**Repository URL:** https://github.com/GlobalGovernanceFrameworks/website

#### Install Git (Choose your operating system)

**Windows:**
1. Download Git from https://git-scm.com/download/win
2. Run the installer with default settings
3. Open "Git Bash" from the Start menu

**macOS:**
```bash
# Option 1: Install via Homebrew (recommended)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git

# Option 2: Install Xcode Command Line Tools
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

#### Set Up Git
```bash
# Configure your identity (required for commits)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### Fork and Clone the Repository

**Step 1: Fork on GitHub**
1. Go to https://github.com/GlobalGovernanceFrameworks/website
2. Click the "Fork" button in the top-right corner
3. This creates a copy in your GitHub account

**Step 2: Clone Your Fork**
```bash
# Replace 'yourusername' with your actual GitHub username
git clone https://github.com/yourusername/governance-frameworks-site.git

# Navigate into the project
cd governance-frameworks-site

# Add the original repository as upstream (for getting updates)
git remote add upstream https://github.com/GlobalGovernanceFrameworks/website
```

**Step 3: Create Your Translation Branch**
```bash
# Create and switch to a new branch for your translation
git checkout -b translate-[framework-name]-[language-code]

# Example: 
git checkout -b translate-peace-es
```

### 2. Understanding the File Structure

The frameworks are organized as follows:

```
/src/lib/content/frameworks/
├── en/               # English (source language)
├── sv/               # Swedish 
├── es/               # Spanish
├── fr/               # French
└── [your-language]/  # Your target language
    └── implementation/
        ├── peace-and-conflict-resolution/           # Peace & Conflict Resolution
        ├── mental-health-governance/                # Mental Health Governance
        ├── educational-systems/                     # Educational Systems
        ├── technology-governance/                   # Technology Governance
        └── [other-frameworks]/
```

## 📝 What to Translate

### Priority 1: Framework Content Files

**Location:** `/src/lib/content/frameworks/[language]/implementation/[framework-name]/`

**File Types:**
- `*.md` files - Main framework content (Markdown format)
- Individual section files (e.g., `core-principles.md`, `implementation-timeline.md`)

**Example Framework Folders:**
- `peace-and-conflict-resolution/` - Peace & Conflict Resolution Framework
- `mental-health-governance/` - Mental Health Framework  
- `educational-systems/` - Education Framework
- `technology-governance/` - Technology Governance Framework
- `environmental-stewardship/` - Environmental Stewardship Framework

### Priority 2: User Interface Text

**Location:** `/src/lib/i18n/[language-code].json`

**Contains:**
- Navigation menus
- Button labels
- Form text
- General website interface elements

### Priority 3: Visual Assets

**Location:** `/static/images/frameworks/`

**File Naming Convention:**
- `framework-diagram-en.svg` (English)
- `framework-diagram-sv.svg` (Swedish)
- `framework-diagram-[your-language-code].svg` (Your language)

*Note: SVG editing requires graphic design tools like Inkscape (free) or Adobe Illustrator*

## 🗣️ Language Codes

Use standard ISO 639-1 codes:

| Language | Code | Example Folder |
|----------|------|----------------|
| Spanish | es | `/frameworks/es/` |
| French | fr | `/frameworks/fr/` |
| German | de | `/frameworks/de/` |
| Portuguese | pt | `/frameworks/pt/` |
| Arabic | ar | `/frameworks/ar/` |
| Chinese (Simplified) | zh | `/frameworks/zh/` |
| Hindi | hi | `/frameworks/hi/` |
| Japanese | ja | `/frameworks/ja/` |
| Russian | ru | `/frameworks/ru/` |

## 📖 Translation Guidelines

### 1. Key Principles

**Accuracy First:** Maintain the precise meaning of technical and policy concepts
**Cultural Adaptation:** Adapt examples and references to your local context when appropriate
**Consistency:** Use the same translation for recurring terms throughout
**Accessibility:** Write in clear, accessible language for your target audience

### 2. Tone and Style

- **Formal but accessible** - These are serious policy documents that should be understandable
- **Active voice preferred** - "Governments should implement..." not "Implementation should be done by governments..."
- **Gender-neutral language** - Use inclusive language appropriate to your language's conventions
- **Professional terminology** - Maintain technical accuracy while ensuring readability

### 3. Handling Technical Terms

**Do NOT translate:**
- Proper nouns (United Nations, IPCC, etc.)
- Established technical acronyms (AI, GDP, CO2, etc.)
- Framework names (keep "Global Governance Frameworks")

**DO translate but maintain consistency:**
- Policy concepts (governance, sustainability, resilience)
- Implementation terms (assessment, monitoring, evaluation)
- Social concepts (community engagement, stakeholder participation)

## 🔑 Key Terms Glossary

| English Term | Definition | Translation Notes |
|--------------|------------|-------------------|
| **Polycrisis** | Multiple, interconnected crises occurring simultaneously | New term - may need explanation in your language |
| **Ecocide Law** | Legal framework criminalizing severe environmental destruction | Legal term - research equivalent in your jurisdiction |
| **Digital Governance** | Frameworks for governing digital technologies and spaces | Emerging field - may need contextual explanation |
| **Stakeholder Engagement** | Process of involving affected parties in decision-making | Common in policy - find established equivalent |
| **Implementation Timeline** | Scheduled phases for putting framework into practice | Standard project management term |
| **Cross-Domain Integration** | Coordination across different policy areas | Technical term - maintain precision |
| **Trauma-Informed Approaches** | Methods that recognize and respond to trauma impacts | Clinical/social term - use established translation |
| **Value Systems** | Core beliefs and principles guiding behavior | Philosophical concept - cultural adaptation may be needed |

## 📋 Translation Workflow

### Step 1: Choose Your Framework
1. Review available frameworks at: [website-url]/frameworks
2. Check existing translations in `/src/lib/content/frameworks/`
3. Select untranslated framework or sections needing updates

### Step 2: Set Up Your Workspace
1. Create language folder: `/frameworks/[your-language-code]/implementation/[framework-name]/`
2. Copy English source files as templates
3. Create tracking document for your progress

### Step 3: Translation Process
1. **First Pass:** Translate content, focusing on meaning over perfection
2. **Review Pass:** Check terminology consistency and flow
3. **Cultural Pass:** Adapt examples and references for local context
4. **Final Pass:** Proofread for grammar, spelling, and formatting

### Step 4: Quality Assurance
1. **Self-review** against source material
2. **Peer review** with other native speakers
3. **Subject matter expert review** (if available)
4. **Community feedback** via translation forums

### Step 5: Submission

**Save Your Work:**
```bash
# Add your translated files
git add .

# Commit with descriptive message
git commit -m "Add Spanish translation for Peace Framework core sections"

# Push to your fork
git push origin translate-peace-es
```

**Create Pull Request:**
1. Go to your fork on GitHub
2. Click "Compare & pull request" button
3. Add clear title: "Spanish Translation: Peace Framework [sections]"
4. Describe what you've translated and any notes for reviewers
5. Submit the pull request

**Respond to Feedback:**
- Check GitHub notifications for review comments
- Make requested changes and push updates
- Celebrate your contribution! 🎉

## 👥 Translation Community

### Communication Channels

**Discord Server:** Join our translation community at https://discord.gg/Zx4hMJf4JU
- **#translation-lab channel** (under 🤝 WORKSPACES category) for coordination, questions, and collaboration
- Real-time chat with other translators
- Voice channels for team meetings

**GitHub Discussions:** Use repository discussions for technical questions and pull request coordination

### Team Roles

**Lead Translator:** Primary person responsible for framework completion
**Reviewers:** 2-3 people who check translations for accuracy and flow
**Cultural Advisor:** Local expert who ensures cultural appropriateness
**Technical Coordinator:** Helps with GitHub and formatting issues

### Review Standards

**Two-Reviewer System:** Every translation should be reviewed by at least two other native speakers
**Subject Matter Review:** Complex technical sections should be reviewed by experts in relevant fields
**Community Input:** Draft translations should be shared for broader community feedback

## 🛠️ Tools and Resources

### Required Tools
- **Text Editor:** VS Code (recommended), Sublime Text, or any markdown editor
- **GitHub Desktop:** For easier repository management (optional)
- **Markdown Preview:** Browser extension or editor plugin

### Helpful Resources
- **DeepL/Google Translate:** For initial drafts (always review carefully)
- **Terminology Databases:** UN terminology, EU terminology, field-specific glossaries
- **Style Guides:** Government or academic style guides in your language
- **CAT Tools:** Translation memory tools for consistency (optional)

### Reference Materials
- Original framework documentation
- Related policy documents in your language
- Academic papers in relevant fields
- Government policy documents using similar terminology

## 📏 Quality Standards

### Content Accuracy
- [ ] Meaning preserved from source text
- [ ] Technical concepts correctly translated
- [ ] Cultural references appropriately adapted
- [ ] Legal and policy terms use established conventions

### Language Quality
- [ ] Grammar and spelling correct
- [ ] Consistent terminology throughout
- [ ] Appropriate register and tone
- [ ] Natural flow in target language

### Formatting Standards
- [ ] Markdown formatting preserved
- [ ] Headers and structure maintained
- [ ] Links and references updated appropriately
- [ ] Lists and tables properly formatted

## 🚀 Getting Started

### Beginner-Friendly First Projects

1. **Framework Overview Pages** - Start with high-level summaries
2. **Implementation Guides** - Practical, less technical content
3. **Glossary Sections** - Short, contained translation tasks
4. **User Interface Elements** - JSON file translations

### Advanced Projects

1. **Complete Framework Translation** - Full policy frameworks
2. **Visual Asset Creation** - SVG diagrams and infographics
3. **Cultural Adaptation Guides** - Context-specific implementation notes
4. **Review and Quality Assurance** - Help improve existing translations

## 📞 Support and Contact

### Getting Help

**Discord Support:** Join #translation-lab at https://discord.gg/Zx4hMJf4JU for:
- Real-time help from other translators
- Technical guidance
- Coordination with language teams
- General questions and community support

**Technical Issues:** Create GitHub issue with "translation" label for repository-specific problems

### Contributing Back

Your translation work helps the global community. Consider:
- Sharing your glossaries with other translators
- Mentoring new translators in your language
- Providing feedback on translation processes
- Contributing to style guides and best practices

## 🎯 Success Metrics

We measure translation impact through:
- **Completion Rate:** Percentage of framework translated
- **Quality Score:** Community and expert review ratings
- **Usage Analytics:** Downloads and page views of translated content
- **Community Growth:** New translators joining language teams

## 📅 Timeline Expectations

**Individual Section:** 1-2 weeks (5-10 pages)
**Complete Framework:** 2-3 months (50-100 pages)
**Full Review Process:** 2-4 weeks additional
**Publication:** 1 week after final approval

## 🏆 Recognition

Contributors will be acknowledged on our dedicated Contributors page, recognizing your valuable work in making global governance frameworks accessible worldwide.

*Last updated: [2025-06-29] | Version 1.0*
*For updates to this guide, check the repository's translation documentation.*
