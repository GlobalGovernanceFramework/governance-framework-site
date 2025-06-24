// pdf-generator.js
// Generates PDFs for all frameworks: full frameworks, tools and quick-start guides
// Installation: npm install puppeteer marked

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

// Parse command line arguments
const args = process.argv.slice(2);
const targetCategory = args[0]; // Get category from command line argument
console.log(`Target category: ${targetCategory || 'all'}`);

// If no arguments provided, show usage information
if (args.length === 0) {
  console.log(`
Usage: node tools-pdf-generator.js [category]

Available categories:
- education
- food-systems
- energy
- peace
- economic
- digital
- ethics
- justice
- spiritual
- financial-systems
- governance
- environmental-stewardship
- biodiversity
- planetary-health
- consciousness
- aging
- animal-welfare
- water
- indigenous
- mental-health
- treaty-for-our-only-home
- get-involved
- frameworks-foundation

Example: node tools-pdf-generator.js economic
  `);
  // Uncomment the line below if you want to exit when no category is provided
  // process.exit(0);
}

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const languages = ['en', 'sv', 'es', 'fr'];
const outputDirs = {
  'education': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'education'),
  'food-systems': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'food-systems'),
  'energy': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'energy'),
  'peace': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'peace'),
  'economic': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'economic'),
  'digital': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'digital'),
  'ethics': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'ethics'),
  'justice': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'justice'),
  'spiritual': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'spiritual'),
  'financial-systems': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'financial-systems'),
  'environmental-stewardship': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'environmental-stewardship'),
  'governance': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'governance'),
  'biodiversity': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'biodiversity'),
  'planetary-health': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'planetary-health'),
  'mental-health': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'mental-health'),
  'consciousness': path.join(__dirname, '..', 'static', 'frameworks', 'tools', 'consciousness'),
  'youth': path.join(__dirname, '..', 'static', 'frameworks','tools', 'youth'),
  'aging': path.join(__dirname, '..', 'static', 'frameworks','tools', 'aging'),
  'animal-welfare': path.join(__dirname, '..', 'static', 'frameworks','tools', 'animal-welfare'),
  'water': path.join(__dirname, '..', 'static', 'frameworks','tools', 'water'),
  'indigenous': path.join(__dirname, '..', 'static', 'frameworks','tools', 'indigenous'),
  'treaty-for-our-only-home': path.join(__dirname, '..', 'static', 'frameworks','tools', 'treaty-for-our-only-home'),
  'get-involved': path.join(__dirname, '..', 'static', 'get-involved'),
  'frameworks-foundation': path.join(__dirname, '..', 'static', 'downloads')
};

// Validate category if provided
if (targetCategory && !Object.keys(outputDirs).includes(targetCategory)) {
  console.error(`Error: Invalid category '${targetCategory}'`);
  console.error(`Valid categories are: ${Object.keys(outputDirs).join(', ')}`);
  process.exit(1);
}

// Define tools to process
const tools = [
  // Regenerative Educational Systems Framework
  // Full framework combined PDF
  {
    name: 'eductional-systems',
    category: 'education',
    fileNames: {
      en: 'Educational-Systems',
      sv: 'Educational-Systems'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Education Framework - Page ',
      sv: 'Utbildningsramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      '01-preamble',
      '02-vision-principles',
      '03-structural-components',
      '04-implementation-strategies',
      '05-monitoring-evaluation',
      '06-sdg-alignment',
      '07-visual-multimedia',
      '08-case-models',
      '09-future-potential',
      '10-appendices',
    ]
  },
  // Guides
  {
    name: 'quick-start',
    category: 'education',
    fileNames: {
      en: 'education-framework-lite',
      sv: 'education-framework-lite-swedish'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education')
    },
    pageFooter: {
      en: 'Education Framework Lite Guide - Page ',
      sv: 'Utbildningsramverk Lite Guide - Sida '
    }
  },
  // Tools
  {
    name: 'pilot-readiness-self-assessment-tool',
    category: 'education',
    fileNames: {
      en: 'pilot-readiness-self-assessment-tool-en',
      sv: 'pilot-readiness-self-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Pilot Readiness Self-Assessment Tool - Page ',
      sv: 'Självbedömningsverktyg för pilotberedskap - Sida '
    }
  },
  {
    name: 'youth-council-charter',
    category: 'education',
    fileNames: {
      en: 'youth-council-charter-en',
      sv: 'youth-council-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Youth Council Charter Template - Page ',
      sv: 'Mall för ungdomsrådsstadga - Sida '
    }
  },
  {
    name: 'regenerative-project-guide',
    category: 'education',
    fileNames: {
      en: 'regenerative-project-guide-en',
      sv: 'regenerative-project-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Regenerative Project Guide - Page ',
      sv: 'Guide för regenerativa projekt - Sida '
    }
  },
  {
    name: 'curriculum-mapping-template',
    category: 'education',
    fileNames: {
      en: 'curriculum-mapping-template-en',
      sv: 'curriculum-mapping-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Curriculum Mapping Template - Page ',
      sv: 'Mall för läroplansanpassning - Sida '
    }
  },
  {
    name: 'mne-rubric-template',
    category: 'education',
    fileNames: {
      en: 'mne-rubric-template-en',
      sv: 'mne-rubric-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'M&E Rubric Template - Page ',
      sv: 'M&E-bedömningsmatris mall - Sida '
    }
  },
  {
    name: 'advocacy-playbook',
    category: 'education',
    fileNames: {
      en: 'advocacy-playbook-en',
      sv: 'advocacy-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Advocacy Playbook - Page ',
      sv: 'Opinionsbildningshandbok - Sida '
    }
  },
  {
    name: 'bureaucratic-navigation-toolkit',
    category: 'education',
    fileNames: {
      en: 'bureaucratic-navigation-toolkit-en',
      sv: 'bureaucratic-navigation-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Bureaucratic Navigation Toolkit - Page ',
      sv: 'Verktygslåda för byråkratisk navigation - Sida '
    }
  },
  {
    name: 'cost-benefit-analysis-model',
    category: 'education',
    fileNames: {
      en: 'cost-benefit-analysis-model-en',
      sv: 'cost-benefit-analysis-model-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Cost-Benefit Analysis Model - Page ',
      sv: 'Kostnad-nytta-analysmodell - Sida '
    }
  },
  {
    name: 'financial-pathway-assessment',
    category: 'education',
    fileNames: {
      en: 'financial-pathway-assessment-en',
      sv: 'financial-pathway-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'appendix-tools')
    },
    pageFooter: {
      en: 'Financial Pathway Assessment Tool - Page ',
      sv: 'Verktyg för bedömning av ekonomisk utveckling - Sida '
    }
  },
  {
    name: 'equity-training-inclusion-checklist',
    category: 'education',
    fileNames: {
      en: 'equity-training-inclusion-checklist-en',
      sv: 'equity-training-inclusion-checklist-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Equity Training Inclusion Checklist - Page ',
      sv: 'Checklista för inkludering av jämlikhetsutbildning - Sida '
    }
  },
  {
    name: 'getting-started-guide',
    category: 'education',
    fileNames: {
      en: 'getting-started-guide-en',
      sv: 'getting-started-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Getting Started Guide - Page ',
      sv: 'Kom-igång guide - Sida '
    }
  },
  {
    name: 'spiral-dynamics-intro-educators',
    category: 'education',
    fileNames: {
      en: 'spiral-dynamics-intro-educators-en',
      sv: 'spiral-dynamics-intro-educators-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Spiral Dynamics Intro for Educators - Page ',
      sv: 'Spiral Dynamics intro för utbildare - Sida '
    }
  },
  {
    name: 'systems-thinking-module',
    category: 'education',
    fileNames: {
      en: 'systems-thinking-module-en',
      sv: 'systems-thinking-module-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'education', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'education', 'seed-kit')
    },
    pageFooter: {
      en: 'Systems Thinking Module - Page ',
      sv: 'Systemtänkande modul - Sida '
    }
  },
  {
    name: 'advocacy-playbook',
    category: 'food-systems',
    fileNames: {
      en: 'advocacy-playbook-en',
      sv: 'advocacy-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Advocacy Playbook - Page ',
      sv: 'Handbok för påverkansarbete - Sida '
    }
  },
  {
    name: 'cost-benefit-analysis-model',
    category: 'food-systems',
    fileNames: {
      en: 'cost-benefit-analysis-model-en',
      sv: 'cost-benefit-analysis-model-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Cost-Benefit Analysis Model - Page ',
      sv: 'Modell för kostnads-/nyttobedömning - Sida '
    }
  },
  {
    name: 'monitoring-evaluation-rubric',
    category: 'food-systems',
    fileNames: {
      en: 'monitoring-evaluation-rubric-en',
      sv: 'monitoring-evaluation-rubric-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Monitoring & Evaluation Rubric Template - Page ',
      sv: 'Mall för uppföljnings- och utvärderingsmatris - Sida '
    }
  },
  {
    name: 'pilot-readiness-self-assessment-tool',
    category: 'food-systems',
    fileNames: {
      en: 'pilot-readiness-self-assessment-tool-en',
      sv: 'pilot-readiness-self-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Pilot Readiness Self-Assessment Tool - Page ',
      sv: 'Verktyg för självskattning av pilotberedskap - Sida '
    }
  },
  {
    name: 'policy-harmonization-toolkit',
    category: 'food-systems',
    fileNames: {
      en: 'policy-harmonization-toolkit-en',
      sv: 'policy-harmonization-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Policy Harmonization Toolkit - Page ',
      sv: 'Verktygslåda för policysamordning - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-charter',
    category: 'food-systems',
    fileNames: {
      en: 'stakeholder-engagement-charter-en',
      sv: 'stakeholder-engagement-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Charter Template - Page ',
      sv: 'Mall för Intressentengagemangsstadga - Sida '
    }
  },
  {
    name: 'tek-integration-template',
    category: 'food-systems',
    fileNames: {
      en: 'tek-integration-template-en',
      sv: 'tek-integration-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'TEK Integration Template - Page ',
      sv: 'Mall för integration av traditionell ekologisk kunskap (TEK) - Sida '
    }
  },
  {
    name: 'seed-kit-getting-started-guide',
    category: 'food-systems',
    fileNames: {
      en: 'seed-kit-getting-started-guide-en',
      sv: 'seed-kit-getting-started-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Getting Started Guide for the Seed Kit - Page ',
      sv: 'Startguide för Fröpaketet - Sida '
    }
  },
  {
    name: 'regenerative-farming-guide',
    category: 'food-systems',
    fileNames: {
      en: 'regenerative-farming-guide-en',
      sv: 'regenerative-farming-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems', 'appendix-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems', 'appendix-tools')
    },
    pageFooter: {
      en: 'Regenerative Farming Guide - Page ',
      sv: 'Guide till regenerativt jordbruk - Sida '
    }
  },
  {
    name: 'quick-guide',
    category: 'food-systems',
    fileNames: {
      en: 'quick-guide-en',
      sv: 'quick-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems')
    },
    pageFooter: {
      en: 'Food Systems & Agriculture Framework - Lite Guide - Page ',
      sv: 'Mat- och Jordbrukssystem: Enkel Guide - Sida '
    }
  },
  {
    name: 'quick-guide-medium',
    category: 'food-systems',
    fileNames: {
      en: 'quick-guide-medium-en',
      sv: 'quick-guide-medium-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems')
    },
    pageFooter: {
      en: 'Food and Agriculture Framework – Lite Guide - Page ',
      sv: 'Mat- och Jordbrukssystem – Enkel Guide - Sida '
    }
  },
  {
    name: 'quick-guide-youth',
    category: 'food-systems',
    fileNames: {
      en: 'quick-guide-medium-youth-en',
      sv: 'quick-guide-medium-youth-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'food-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'food-systems')
    },
    pageFooter: {
      en: 'Food Systems Lite Guide - Page ',
      sv: 'Matsystem: Enkel Guide - Sida '
    }
  },
  {
    name: 'climate-energy-action-guide',
    category: 'energy',
    fileNames: {
      en: 'climate-energy-action-guide-en',
      sv: 'climate-energy-action-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy')
    },
    pageFooter: {
      en: 'Climate Action Guide - Page ',
      sv: 'Klimataktionsguide - Sida '
    }
  },
  {
    name: 'climate-energy-stakeholder-guide',
    category: 'energy',
    fileNames: {
      en: 'climate-energy-stakeholder-guide-en',
      sv: 'climate-energy-stakeholder-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy')
    },
    pageFooter: {
      en: 'Stakeholder Implementation Guide for the Climate & Energy Governance Framework - Page ',
      sv: 'Implementeringsguide för intressenter inom ramen för klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'climate-energy-technical-guide',
    category: 'energy',
    fileNames: {
      en: 'climate-energy-technical-guide-en',
      sv: 'climate-energy-technical-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers and Officials: Climate & Energy Governance Framework - Page ',
      sv: 'Teknisk guide för beslutsfattare och tjänstemän: Ramverk för klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'adaptation-planning-framework',
    category: 'energy',
    fileNames: {
      en: 'adaptation-planning-framework-en',
      sv: 'adaptation-planning-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Adaptation Planning Framework - Page ',
      sv: 'Ramverk för anpassningsplanering - Sida '
    }
  },
  {
    name: 'carbon-pricing-guide',
    category: 'energy',
    fileNames: {
      en: 'carbon-pricing-guide-en',
      sv: 'carbon-pricing-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Carbon Pricing Implementation Guide - Page ',
      sv: 'Implementeringsguide för koldioxidprissättning - Sida '
    }
  },
  {
    name: 'energy-transition-roadmap',
    category: 'energy',
    fileNames: {
      en: 'energy-transition-roadmap-en',
      sv: 'energy-transition-roadmap-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Energy Transition Roadmap Template - Page ',
      sv: 'Mall för färdplan för energiomställning - Sida '
    }
  },
  {
    name: 'finance-access-navigator',
    category: 'energy',
    fileNames: {
      en: 'finance-access-navigator-en',
      sv: 'finance-access-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Finance Access Navigator - Page ',
      sv: 'Klimatfinansieringsåtkomstnavigator - Sida '
    }
  },
  {
    name: 'governance-communication-toolkit',
    category: 'energy',
    fileNames: {
      en: 'governance-communication-toolkit-en',
      sv: 'governance-communication-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Governance Communication Toolkit - Page ',
      sv: 'Verktygslåda för styrningskommunikation - Sida '
    }
  },
  {
    name: 'governance-coordination-guide',
    category: 'energy',
    fileNames: {
      en: 'governance-coordination-guide-en',
      sv: 'governance-coordination-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Multi-level Governance Coordination Guide - Page ',
      sv: 'Guide för samordning av flernivåstyrning - Sida '
    }
  },
  {
    name: 'governance-readiness-assessment',
    category: 'energy',
    fileNames: {
      en: 'governance-readiness-assessment-en',
      sv: 'governance-readiness-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Governance Readiness Assessment Tool - Page ',
      sv: 'Verktyg för bedömning av styrningsberedskap - Sida '
    }
  },
  {
    name: 'innovation-acceleration-kit',
    category: 'energy',
    fileNames: {
      en: 'innovation-acceleration-kit-en',
      sv: 'innovation-acceleration-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Innovation Acceleration Kit - Page ',
      sv: 'Accelerationspaket för klimatinnovation - Sida '
    }
  },
  {
    name: 'institutional-reform-guide',
    category: 'energy',
    fileNames: {
      en: 'institutional-reform-guide-en',
      sv: 'institutional-reform-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Institutional Reform Guide - Page ',
      sv: 'Guide till klimatinstitutionell reform - Sida '
    }
  },
  {
    name: 'just-transition-planning-template',
    category: 'energy',
    fileNames: {
      en: 'just-transition-planning-template-en',
      sv: 'just-transition-planning-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Just Transition Planning Template - Page ',
      sv: 'Mall för planering av en rättvis övergång - Sida '
    }
  },
  {
    name: 'nature-based-solutions-tool',
    category: 'energy',
    fileNames: {
      en: 'nature-based-solutions-tool-en',
      sv: 'nature-based-solutions-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Nature-based Solutions Assessment Tool - Page ',
      sv: 'Utvärderingsverktyg för naturbaserade lösningar - Sida '
    }
  },
  {
    name: 'policy-brief-templates',
    category: 'energy',
    fileNames: {
      en: 'policy-brief-templates-en',
      sv: 'policy-brief-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate Policy Brief Templates - Page ',
      sv: 'Mallar för klimatpolicyöversikter - Sida '
    }
  },
  {
    name: 'policy-integration-matrix',
    category: 'energy',
    fileNames: {
      en: 'policy-integration-matrix-en',
      sv: 'policy-integration-matrix-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Climate-Energy Policy Integration Matrix - Page ',
      sv: 'Integrationsmatris för klimat- och energipolitik - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-protocol',
    category: 'energy',
    fileNames: {
      en: 'stakeholder-engagement-protocol-en',
      sv: 'stakeholder-engagement-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'tools')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Protocol - Page ',
      sv: 'Protokoll för intressentengagemang - Sida '
    }
  },
  {
    name: 'background-context-document',
    category: 'energy',
    fileNames: {
      en: 'background-context-document-en',
      sv: 'background-context-document-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Background/Context Document: Climate & Energy Governance Implementation Framework - Page ',
      sv: 'Bakgrunds-/kontextdokument: Ramverk för implementering av klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'case-studies-or-examples',
    category: 'energy',
    fileNames: {
      en: 'case-studies-or-examples-en',
      sv: 'case-studies-or-examples-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Case Studies or Examples: Climate & Energy Governance Implementation Framework - Page ',
      sv: 'Fallstudier eller exempel: Ramverk för implementering av klimat- och energistyrning - Sida '
    }
  },
  {
    name: 'evaluation-or-monitoring-framework',
    category: 'energy',
    fileNames: {
      en: 'evaluation-or-monitoring-framework-en',
      sv: 'evaluation-or-monitoring-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Evaluation or Monitoring Framework - Page ',
      sv: 'Utvärderings- eller övervakningsramverk - Sida '
    }
  },
  {
    name: 'getting-started-guide',
    category: 'energy',
    fileNames: {
      en: 'getting-started-guide-en',
      sv: 'getting-started-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Climate Governance Seed Kit Getting Started Guide - Page ',
      sv: 'Guide för att komma igång med klimatstyrningsfröpaket - Sida '
    }
  },
  {
    name: 'regional-hub-connection-guide',
    category: 'energy',
    fileNames: {
      en: 'regional-hub-connection-guide-en',
      sv: 'regional-hub-connection-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy', 'seed-kit')
    },
    pageFooter: {
      en: 'Regional Hub Connection Guide - Page ',
      sv: 'Guide för regionala knutpunkter - Sida '
    }
  },
  // Full Climate & Energy Framework
  {
    name: 'climate-energy-framework',
    category: 'energy',
    fileNames: {
      en: 'Climate-Energy-Governance',
      sv: 'Climate-Energy-Governance'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'energy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'energy')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Climate & Energy Governance Framework - Page ',
      sv: 'Ramverk för klimat- och energistyrning - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      '01-introduction',
      '02-guiding-principles',
      '03-governance-structure',
      '04-core-pillars',
      '05-policy-mechanisms',
      '06-stakeholder-engagement',
      '07-financing-the-framework',
      '08-implementation-roadmap',
      '09-metrics-for-success',
      '10-challenges-and-solutions',
      '11-implementation-tools',
      '12-conclusion',
      'appendix-a',
      'appendix-b'
    ]
  },

  {
    name: 'technical-guide-policymakers',
    category: 'peace',
    fileNames: {
      en: 'technical-guide-policymakers-en',
      sv: 'technical-guide-policymakers-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers and Mediators - Page ',
      sv: 'Teknisk guide för beslutsfattare och medlare - Sida '
    }
  },
  {
    name: 'community-peace-guide',
    category: 'peace',
    fileNames: {
      en: 'community-peace-guide-en',
      sv: 'community-peace-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Community Peace Implementation Guide - Page ',
      sv: 'Guide till implementering av fred i samhället - Sida '
    }
  },
  {
    name: 'youth-peace-action-guide',
    category: 'peace',
    fileNames: {
      en: 'youth-peace-action-guide-en',
      sv: 'youth-peace-action-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Youth Peace Action Guide - Page ',
      sv: 'Ungdomsfredsguide - Sida '
    }
  },
  // Full Peace & Conflict Resolution Framework
  {
    name: 'peace-framework',
    category: 'peace',
    fileNames: {
      en: 'Peace-Conflict-Resolution',
      sv: 'Peace-Conflict-Resolution'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Peace & Conflict Resolution Framework - Page ',
      sv: 'Ramverk för fred & konfliktlösning - Sida '
    },
    // Special config for full framework
    sections: [
      'preamble',
      'core-principles',
      'local-implementation',
      'indigenous-integration',
      'regional-implementation',
      'global-implementation',
      'digital-infrastructure',
      'ai-ethics',
      'emerging-technologies',
      'non-state-actors',
      'military-transformation',
      'whistleblower-protection',
      'structural-prevention',
      'climate-resource',
      'transitional-justice',
      'mental-health',
      'developmental-value-systems',
      'educational-cultural-infrastructure',
      'peace-financing',
      'peace-business-integration',
      'media-information',
      'context-specific-roadmaps',
      'implementation-timeline',
      'implementation-challenges',
      'visualizations',
      'measuring-success',
      'cross-domain-integration',
      'conclusion',
      'index',
      'quick-guide',
      'technical-guide-policymakers',
      'community-peace-guide',
      'youth-peace-action-guide',
      'digital-peace-ethics-guide'
    ]
  },
  {
    name: 'ethics-framework-standard',
    category: 'ethics',
    fileNames: {
      en: 'Global-Ethics-Rights',
      sv: 'Global-Ethics-Rights'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'standard'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'standard')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Rights of Beings Standard - Page ',
      sv: 'Rättigheter för Varelser Standard - Sida '
    },
    // Full framework combined sections in proper order
    sections: [
      '0-preamble',
      '1-introduction',
      '2-foundational-values',
      '2.3-global-ethical-traditions',
      '2.5-rights-of-beings',
      '2.6-scientific-foundations',
      '3-commitments',
      '3.1-traditional-rights',
      '3.2-emerging-rights',
      '3.2.1-ai-consciousness',
      '3.2.1a-assessment-hub-network',
      '3.2.1b-scientific-standards',
      '3.2.2-ambiguous-entities',
      '3.2.3-measurement-standards',
      '3.2.4-recognition-pathways',
      '3.2.5-non-western-recognition',
      '3.3-conflict-resolution',
      '3.3.1-moon-wish-test',
      '4-governance-mechanisms',
      '4.1-transparency',
      '4.2-inclusive-decision-making',
      '4.3-conflict-resolution',
      '4.4-guardianship-councils',
      '4.4.1-enforcement-mechanisms',
      '4.4.2-non-compliance-strategy',
      '4.5-funding-model',
      '4.5.1-hub-sustainability',
      '4.5.2-resource-optimization',
      '4.6-governance-accountability',
      '4.7-entity-conflict-resolution',
      '4.8-interoperability',
      '4.9-decision-making',
      '4.10-coordination-mechanisms',
      '5-implementation',
      '5.1-quick-wins',
      '5.1.1-cost-analysis',
      '5.2-phased-rollout',
      '5.2.1-space-ethics',
      '5.3-education-accessibility',
      '5.3.1-resource-constraint',
      '5.3.2-cultural-accessibility',
      '5.3.3-knowledge-integration',
      '5.4-global-cooperation',
      '5.5-monitoring',
      '5.6-public-engagement',
      '5.7-stakeholder-strategy',
      '5.7.1-consensus-building',
      '5.7.2-resistant-stakeholder',
      '5.8-resistance-handling',
      '5.8.1-opposition-response',
      '5.8.2-learning-system',
      '5.9-benchmarks-metrics',
      '5.10-scenario-planning',
      '5.11-accessibility-matrix',
      '6-appendices',
      '6.1-emerging-rights-toolkit',
      '6.2-case-studies',
      '6.3-ethical-forecasting',
      '6.3.1-speculative-paradigm',
      '6.3.2-validation-protocols',
      '6.4-reporting-portal',
      '6.5-plain-language',
      '6.6-edge-case-protocols',
      '6.7-philosophy-of-rights',
      '6.8-spiral-aware-primer',
      '6.9-impact-assessment',
      '6.10-pioneer-pilots',
      '6.11-crisis-ethics',
      '6.12-technical-protocols'
    ]
  },
  {
    name: 'digital-peace-ethics-guide',
    category: 'peace',
    fileNames: {
      en: 'digital-peace-ethics-guide-en',
      sv: 'digital-peace-ethics-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace')
    },
    pageFooter: {
      en: 'Digital Peace Ethics Guide - Page ',
      sv: 'Digital fredsetisk guide - Sida '
    }
  },
  {
    name: 'conflict-analysis-framework',
    category: 'peace',
    fileNames: {
      en: 'conflict-analysis-framework-en',
      sv: 'conflict-analysis-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Conflict Analysis Framework - Page ',
      sv: 'Ramverk för konfliktanalys - Sida '
    }
  },
  {
    name: 'peace-committee-charter',
    category: 'peace',
    fileNames: {
      en: 'peace-committee-charter-en',
      sv: 'peace-committee-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Local Peace Committee Charter Template - Page ',
      sv: 'Mall för stadgar för lokal fredskommitté - Sida '
    }
  },
  {
    name: 'multi-track-dialogue-protocol',
    category: 'peace',
    fileNames: {
      en: 'multi-track-dialogue-protocol-en',
      sv: 'multi-track-dialogue-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Multi-Track Dialogue Protocol - Page ',
      sv: 'Protokoll för flerspårig dialog - Sida '
    }
  },
  {
    name: 'early-warning-design-guide',
    category: 'peace',
    fileNames: {
      en: 'early-warning-design-guide-en',
      sv: 'early-warning-design-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Early Warning System Design Guide - Page ',
      sv: 'Guide för design av tidiga varningssystem - Sida '
    }
  },
  {
    name: 'peace-tech-ethics-assessment',
    category: 'peace',
    fileNames: {
      en: 'peace-tech-ethics-assessment-en',
      sv: 'peace-tech-ethics-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace-Technology Ethics Assessment - Page ',
      sv: 'Etisk bedömning av fredsteknologi - Sida '
    }
  },
  {
    name: 'value-system-mapping-template',
    category: 'peace',
    fileNames: {
      en: 'value-system-mapping-template-en',
      sv: 'value-system-mapping-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Value System Mapping Template - Page ',
      sv: 'Mall för värdesystemkartläggning - Sida '
    }
  },
  // Context-Specific Implementation Guides
  {
    name: 'urban-conflict-toolkit',
    category: 'peace',
    fileNames: {
      en: 'urban-conflict-toolkit-en',
      sv: 'urban-conflict-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Urban Conflict Mediation Toolkit - Page ',
      sv: 'Verktyg för medling av urbana konflikter - Sida '
    }
  },
  {
    name: 'resource-conflict-guide',
    category: 'peace',
    fileNames: {
      en: 'resource-conflict-guide-en',
      sv: 'resource-conflict-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Resource Conflict Transformation Guide - Page ',
      sv: 'Guide för omvandling av resurskonflikter - Sida '
    }
  },
  {
    name: 'reconciliation-framework',
    category: 'peace',
    fileNames: {
      en: 'reconciliation-framework-en',
      sv: 'reconciliation-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Post-Conflict Reconciliation Framework - Page ',
      sv: 'Ramverk för försoning efter konflikt - Sida '
    }
  },
  {
    name: 'business-peace-guide',
    category: 'peace',
    fileNames: {
      en: 'business-peace-guide-en',
      sv: 'business-peace-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Private Sector Peace Engagement Guide - Page ',
      sv: 'Guide för privat sektors fredsengagemang - Sida '
    }
  },
  {
    name: 'protection-transition-manual',
    category: 'peace',
    fileNames: {
      en: 'protection-transition-manual-en',
      sv: 'protection-transition-manual-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Military-Civilian Protection Transition Manual - Page ',
      sv: 'Manual för militär-civil skyddsövergång - Sida '
    }
  },

  // Advocacy & Scaling Tools
  {
    name: 'peace-advocacy-toolkit',
    category: 'peace',
    fileNames: {
      en: 'peace-advocacy-toolkit-en',
      sv: 'peace-advocacy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Advocacy Campaign Toolkit - Page ',
      sv: 'Verktygslåda för fredsförespråkande kampanjer - Sida '
    }
  },
  {
    name: 'peace-financing-navigator',
    category: 'peace',
    fileNames: {
      en: 'peace-financing-navigator-en',
      sv: 'peace-financing-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Financing Navigator - Page ',
      sv: 'Navigator för fredsfinansiering - Sida '
    }
  },
  {
    name: 'institutional-integration-guide',
    category: 'peace',
    fileNames: {
      en: 'institutional-integration-guide-en',
      sv: 'institutional-integration-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Institutional Peace Integration Guide - Page ',
      sv: 'Guide för institutionell fredsintegration - Sida '
    }
  },
  {
    name: 'media-peace-messaging-guide',
    category: 'peace',
    fileNames: {
      en: 'media-peace-messaging-guide-en',
      sv: 'media-peace-messaging-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Media Peace Messaging Guide - Page ',
      sv: 'Guide för mediefredsbudskap - Sida '
    }
  },

  // Low-Resource Funding Implementation Tools
  {
    name: 'community-peace-fund-guide',
    category: 'peace',
    fileNames: {
      en: 'community-peace-fund-guide-en',
      sv: 'community-peace-fund-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Community Peace Fund Establishment Guide - Page ',
      sv: 'Guide för upprättande av lokala fredsfonder - Sida '
    }
  },
  {
    name: 'peace-micro-grant-template',
    category: 'peace',
    fileNames: {
      en: 'peace-micro-grant-template-en',
      sv: 'peace-micro-grant-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Micro-Grant Template - Page ',
      sv: 'Mall för fredsmikrobidrag - Sida '
    }
  },
  {
    name: 'resource-mapping-tool',
    category: 'peace',
    fileNames: {
      en: 'resource-mapping-tool-en',
      sv: 'resource-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Resource Mapping Tool - Page ',
      sv: 'Verktyg för resurskartläggning - Sida '
    }
  },
  {
    name: 'hybrid-funding-agreement',
    category: 'peace',
    fileNames: {
      en: 'hybrid-funding-agreement-en',
      sv: 'hybrid-funding-agreement-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Hybrid Funding Agreement Template - Page ',
      sv: 'Mall för hybridfinansieringsavtal - Sida '
    }
  },
  {
    name: 'peace-fund-sustainability-calculator',
    category: 'peace',
    fileNames: {
      en: 'peace-fund-sustainability-calculator-en',
      sv: 'peace-fund-sustainability-calculator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Fund Sustainability Calculator - Page ',
      sv: 'Hållbarhetskalkylator för fredsfonder - Sida '
    }
  },

  // Traditional Peace Tools
  {
    name: 'islamic-mediation-protocol',
    category: 'peace',
    fileNames: {
      en: 'islamic-mediation-protocol-en',
      sv: 'islamic-mediation-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Islamic-Informed Mediation Protocol - Page ',
      sv: 'Islamiskt informerat medlingsprotokoll - Sida '
    }
  },
  {
    name: 'confucian-dialogue-template',
    category: 'peace',
    fileNames: {
      en: 'confucian-dialogue-template-en',
      sv: 'confucian-dialogue-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Confucian Harmony-Based Dialogue Template - Page ',
      sv: 'Mall för konfuciansk harmonibaserad dialog - Sida '
    }
  },
  {
    name: 'trauma-informed-toolkit',
    category: 'peace',
    fileNames: {
      en: 'trauma-informed-toolkit-en',
      sv: 'trauma-informed-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Trauma-Informed Facilitation Toolkit - Page ',
      sv: 'Traumabaserad faciliteringsverktyg - Sida '
    }
  },
  {
    name: 'cross-cultural-integration-guide',
    category: 'peace',
    fileNames: {
      en: 'cross-cultural-integration-guide-en',
      sv: 'cross-cultural-integration-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Cross-Cultural Peace Tradition Integration Guide - Page ',
      sv: 'Guide för integrering av tvärkulturella fredstraditioner - Sida '
    }
  },
  {
    name: 'causal-loop-template',
    category: 'peace',
    fileNames: {
      en: 'causal-loop-template-en',
      sv: 'causal-loop-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Causal Loop Diagramming Template - Page ',
      sv: 'Mall för kausal loopdiagram - Sida '
    }
  },
  {
    name: 'systemic-stakeholder-mapping',
    category: 'peace',
    fileNames: {
      en: 'systemic-stakeholder-mapping-en',
      sv: 'systemic-stakeholder-mapping-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Systemic Stakeholder Mapping - Page ',
      sv: 'Systemisk intressentkartläggning - Sida '
    }
  },
  {
    name: 'system-boundary-guide',
    category: 'peace',
    fileNames: {
      en: 'system-boundary-guide-en',
      sv: 'system-boundary-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'System Boundary Definition Guide - Page ',
      sv: 'Guide för definition av systemgränser - Sida '
    }
  },
  {
    name: 'stock-flow-analysis',
    category: 'peace',
    fileNames: {
      en: 'stock-flow-analysis-en',
      sv: 'stock-flow-analysis-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Stock and Flow Analysis Framework for Peace & Conflict Resolution - Page ',
      sv: 'Analysramverk för lager och flöden inom freds- och konfliktarbete - Sida '
    }
  },
  {
    name: 'conflict-iceberg-template',
    category: 'peace',
    fileNames: {
      en: 'conflict-iceberg-template-en',
      sv: 'conflict-iceberg-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Conflict Iceberg Model Template - Page ',
      sv: 'Mall för konfliktisbergsmodell - Sida '
    }
  },
  {
    name: 'conflict-archetype-guide',
    category: 'peace',
    fileNames: {
      en: 'conflict-archetype-guide-en',
      sv: 'conflict-archetype-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Conflict System Archetype Guide - Page ',
      sv: 'Guide till arketyper för konfliktsystem - Sida '
    }
  },
  {
    name: 'leverage-point-matrix',
    category: 'peace',
    fileNames: {
      en: 'leverage-point-matrix-en',
      sv: 'leverage-point-matrix-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Leverage Point Identification Matrix - Page ',
      sv: 'Matris för identifiering av hävstångspunkter - Sida '
    }
  },
  {
    name: 'systems-scenario-planning',
    category: 'peace',
    fileNames: {
      en: 'systems-scenario-planning-en',
      sv: 'systems-scenario-planning-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Systems-Based Scenario Planning - Page ',
      sv: 'Systembaserad scenarioplanering - Sida '
    }
  },
  {
    name: 'systemic-outcomes-harvesting',
    category: 'peace',
    fileNames: {
      en: 'systemic-outcomes-harvesting-en',
      sv: 'systemic-outcomes-harvesting-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Systemic Outcomes Harvesting - Page ',
      sv: 'Systemisk utfallsuppsamling - Sida '
    }
  },
  {
    name: 'community-systems-mapping',
    category: 'peace',
    fileNames: {
      en: 'community-systems-mapping-en',
      sv: 'community-systems-mapping-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Community Systems Mapping Guide - Page ',
      sv: 'Guide för kartläggning av samhällssystem - Sida '
    }
  },
  {
    name: 'organizational-systems-analysis',
    category: 'peace',
    fileNames: {
      en: 'organizational-systems-analysis-en',
      sv: 'organizational-systems-analysis-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Organizational Systems Analysis Framework - Page ',
      sv: 'Ramverk för organisatorisk systemanalys - Sida '
    }
  },
  {
    name: 'policy-systems-assessment',
    category: 'peace',
    fileNames: {
      en: 'policy-systems-assessment-en',
      sv: 'policy-systems-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'peace', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'peace', 'tools')
    },
    pageFooter: {
      en: 'Peace Policy Systems Assessment Framework - Page ',
      sv: 'Ramverk för bedömning av fredspolitiska system - Sida '
    }
  },
  // Lite Guides
  {
    name: 'technical-guide',
    category: 'economic',
    fileNames: {
      en: 'technical-guide-en',
      sv: 'technical-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers - Page ',
      sv: 'Teknisk guide för beslutsfattare - Sida '
    }
  },
  {
    name: 'community-guide',
    category: 'economic',
    fileNames: {
      en: 'community-guide-en',
      sv: 'community-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Community Economic Implementation Guide - Page ',
      sv: 'Samhällsguide för ekonomisk implementering - Sida '
    }
  },
  {
    name: 'youth-guide',
    category: 'economic',
    fileNames: {
      en: 'youth-guide-en',
      sv: 'youth-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Youth Economic Action Guide - Page ',
      sv: 'Ekonomisk handlingsguide för ungdomar - Sida '
    }
  },
  {
    name: 'digital-ethics',
    category: 'economic',
    fileNames: {
      en: 'digital-ethics-en',
      sv: 'digital-ethics-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Digital Economic Ethics Guide - Page ',
      sv: 'Digital ekonomietikguide - Sida '
    }
  },
  {
    name: 'indigenous-guide',
    category: 'economic',
    fileNames: {
      en: 'indigenous-guide-en',
      sv: 'indigenous-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic')
    },
    pageFooter: {
      en: 'Indigenous Economic Stewardship Guide - Page ',
      sv: 'Urfolks ekonomiska förvaltningsguide - Sida '
    }
  },

  // Core Governance Tools
  {
    name: 'economic-analysis-framework',
    category: 'economic',
    fileNames: {
      en: 'economic-analysis-framework-en',
      sv: 'economic-analysis-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Analysis Framework - Page ',
      sv: 'Ramverk för ekonomisk analys - Sida '
    }
  },
  {
    name: 'currency-design-template',
    category: 'economic',
    fileNames: {
      en: 'currency-design-template-en',
      sv: 'currency-design-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Community Currency Design Template - Page ',
      sv: 'Mall för design av lokalvaluta - Sida '
    }
  },
  {
    name: 'participatory-budgeting-protocol',
    category: 'economic',
    fileNames: {
      en: 'participatory-budgeting-protocol-en',
      sv: 'participatory-budgeting-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Participatory Budgeting Protocol - Page ',
      sv: 'Protokoll för deltagarbudgetering - Sida '
    }
  },
  {
    name: 'ethical-trade-zone-charter',
    category: 'economic',
    fileNames: {
      en: 'ethical-trade-zone-charter-en',
      sv: 'ethical-trade-zone-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Ethical Trade Zone Charter - Page ',
      sv: 'Stadga för etisk handelszon - Sida '
    }
  },
  {
    name: 'aubi-implementation-guide',
    category: 'economic',
    fileNames: {
      en: 'aubi-implementation-guide-en',
      sv: 'aubi-implementation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'AUBI Implementation Guide - Page ',
      sv: 'Implementeringsguide för AUBI - Sida '
    }
  },
  {
    name: 'commons-management-toolkit',
    category: 'economic',
    fileNames: {
      en: 'commons-management-toolkit-en',
      sv: 'commons-management-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Commons Management Toolkit - Page ',
      sv: 'Verktygslåda för allmänningsförvaltning - Sida '
    }
  },

  // Context-Specific Implementation Guides
  {
    name: 'urban-economic-toolkit',
    category: 'economic',
    fileNames: {
      en: 'urban-economic-toolkit-en',
      sv: 'urban-economic-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Urban Economic Integration Toolkit - Page ',
      sv: 'Verktygslåda för urban ekonomisk integration - Sida '
    }
  },
  {
    name: 'rural-cooperative-guide',
    category: 'economic',
    fileNames: {
      en: 'rural-cooperative-guide-en',
      sv: 'rural-cooperative-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Rural Cooperative Development Guide - Page ',
      sv: 'Utvecklingsguide för landsbygdskooperativ - Sida '
    }
  },
  {
    name: 'bioregional-protocol',
    category: 'economic',
    fileNames: {
      en: 'bioregional-protocol-en',
      sv: 'bioregional-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Bioregional Resource Sharing Protocol - Page ',
      sv: 'Protokoll för bioregional resursdelning - Sida '
    }
  },
  {
    name: 'global-commons-framework',
    category: 'economic',
    fileNames: {
      en: 'global-commons-framework-en',
      sv: 'global-commons-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Global Commons Governance Framework - Page ',
      sv: 'Ramverk för global allmänningsstyrning - Sida '
    }
  },

  // Advocacy & Scaling Tools
  {
    name: 'economic-advocacy-toolkit',
    category: 'economic',
    fileNames: {
      en: 'economic-advocacy-toolkit-en',
      sv: 'economic-advocacy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Advocacy Campaign Toolkit - Page ',
      sv: 'Verktygslåda för ekonomisk påverkanskampanj - Sida '
    }
  },
  {
    name: 'economic-financing-navigator',
    category: 'economic',
    fileNames: {
      en: 'economic-financing-navigator-en',
      sv: 'economic-financing-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Financing Navigator - Page ',
      sv: 'Navigator för ekonomisk finansiering - Sida '
    }
  },
  {
    name: 'institutional-integration-guide',
    category: 'economic',
    fileNames: {
      en: 'institutional-integration-guide-en',
      sv: 'institutional-integration-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Institutional Economic Integration Guide - Page ',
      sv: 'Guide för institutionell ekonomisk integration - Sida '
    }
  },
  {
    name: 'ppp-template',
    category: 'economic',
    fileNames: {
      en: 'ppp-template-en',
      sv: 'ppp-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Public-Private Partnership Template - Page ',
      sv: 'Mall för offentlig-privat partnerskap - Sida '
    }
  },

  // Low-Resource Funding Tools
  {
    name: 'community-economic-fund-guide',
    category: 'economic',
    fileNames: {
      en: 'community-economic-fund-guide-en',
      sv: 'community-economic-fund-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Community Economic Fund Guide - Page ',
      sv: 'Guide för samhällsekonomisk fond - Sida '
    }
  },
  {
    name: 'economic-micro-grant-template',
    category: 'economic',
    fileNames: {
      en: 'economic-micro-grant-template-en',
      sv: 'economic-micro-grant-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Economic Micro-Grant Template - Page ',
      sv: 'Mall för ekonomiskt mikrobidrag - Sida '
    }
  },
  {
    name: 'resource-mapping-tool',
    category: 'economic',
    fileNames: {
      en: 'resource-mapping-tool-en',
      sv: 'resource-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Resource Mapping Tool - Page ',
      sv: 'Verktyg för resurskartläggning - Sida '
    }
  },

  // Digital Tools
  {
    name: 'currency-simulator-app',
    category: 'economic',
    fileNames: {
      en: 'currency-simulator-app-en',
      sv: 'currency-simulator-app-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Currency Simulator App - Page ',
      sv: 'Valutasimulatorapp - Sida '
    }
  },
  {
    name: 'nested-economic-health-dashboard',
    category: 'economic',
    fileNames: {
      en: 'nested-economic-health-dashboard-en',
      sv: 'nested-economic-health-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Nested Economic Health Index Dashboard - Page ',
      sv: 'Dashboard för nästlat ekonomiskt hälsoindex - Sida '
    }
  },
  {
    name: 'ai-chatbot-for-tool-navigation',
    category: 'economic',
    fileNames: {
      en: 'ai-chatbot-for-tool-navigation-en',
      sv: 'ai-chatbot-for-tool-navigation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'AI Chatbot for Tool Navigation - Page ',
      sv: 'AI-chatbot för verktygsnavigering - Sida '
    }
  },
  {
    name: 'real-time-collaboration-platform',
    category: 'economic',
    fileNames: {
      en: 'real-time-collaboration-platform-en',
      sv: 'real-time-collaboration-platform-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Real-Time Collaboration Platform - Page ',
      sv: 'Realtidssamarbetsplattform - Sida '
    }
  },
  {
    name: 'sample-audit-report-template',
    category: 'economic',
    fileNames: {
      en: 'sample-audit-report-template-en',
      sv: 'sample-audit-report-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'economic', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'economic', 'tools')
    },
    pageFooter: {
      en: 'Sample Audit Report Template - Page ',
      sv: 'Exempel på mall för revisionsrapport - Sida '
    }
  },
  // Digital Commons Framework - Main Guides
  {
    name: 'quick-start-guide',
    category: 'digital',
    fileNames: {
      en: 'quick-start-guide-en',
      sv: 'quick-start-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Quick-Start Guide: Digital Commons Framework - Page ',
      sv: 'Snabbstartsguide: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'technical-guide',
    category: 'digital',
    fileNames: {
      en: 'technical-guide-en',
      sv: 'technical-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Technical Guide for Policymakers: Digital Commons Framework - Page ',
      sv: 'Teknisk guide för beslutsfattare: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'community-guide',
    category: 'digital',
    fileNames: {
      en: 'community-guide-en',
      sv: 'community-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Community Implementation Guide: Digital Commons Framework - Page ',
      sv: 'Samhällsguide för implementering: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'youth-guide',
    category: 'digital',
    fileNames: {
      en: 'youth-guide-en',
      sv: 'youth-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Youth Engagement Guide: Digital Commons Framework - Page ',
      sv: 'Engagemangsguide för ungdomar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'digital-ethics-guide',
    category: 'digital',
    fileNames: {
      en: 'digital-ethics-guide-en',
      sv: 'digital-ethics-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Digital Ethics Guide: Digital Commons Framework - Page ',
      sv: 'Digital etikguide: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'indigenous-guide',
    category: 'digital',
    fileNames: {
      en: 'indigenous-guide-en',
      sv: 'indigenous-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Indigenous Data Stewardship Guide: Digital Commons Framework - Page ',
      sv: 'Förvaltningsguide för urfolksdata: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Core Governance Tools
  {
    name: 'node-setup-guide',
    category: 'digital',
    fileNames: {
      en: 'node-setup-guide-en',
      sv: 'node-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Node Setup Guide: Digital Commons Framework - Page ',
      sv: 'Guide för nodinställning: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'governance-toolkit',
    category: 'digital',
    fileNames: {
      en: 'governance-toolkit-en',
      sv: 'governance-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Governance Toolkit: Digital Commons Framework - Page ',
      sv: 'Verktygslåda för styrning: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'sms-voting-template',
    category: 'digital',
    fileNames: {
      en: 'sms-voting-template-en',
      sv: 'sms-voting-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'SMS Voting Template: Digital Commons Framework - Page ',
      sv: 'SMS röstmall: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'data-sovereignty-protocol',
    category: 'digital',
    fileNames: {
      en: 'data-sovereignty-protocol-en',
      sv: 'data-sovereignty-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Data Sovereignty Protocol: Digital Commons Framework - Page ',
      sv: 'Datsuveränitetsprotokoll: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'ethical-ai-audit-checklist',
    category: 'digital',
    fileNames: {
      en: 'ethical-ai-audit-checklist-en',
      sv: 'ethical-ai-audit-checklist-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Ethical AI Audit Checklist: Digital Commons Framework - Page ',
      sv: 'Etisk AI-granskningschecklista: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'glossary',
    category: 'digital',
    fileNames: {
      en: 'glossary-en',
      sv: 'glossary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Commons Glossary: Digital Commons Framework - Page ',
      sv: 'Allmänningsordlista: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'failure-analysis-report-template',
    category: 'digital',
    fileNames: {
      en: 'failure-analysis-report-template-en',
      sv: 'failure-analysis-report-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Failure Analysis Report Template: Digital Commons Framework - Page ',
      sv: 'Mall för felhändelsanalys: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'impact-assessment-template',
    category: 'digital',
    fileNames: {
      en: 'impact-assessment-template-en',
      sv: 'impact-assessment-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'core-governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'core-governance')
    },
    pageFooter: {
      en: 'Impact Assessment Template: Digital Commons Framework - Page ',
      sv: 'Mall för konsekvensanalys: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Context-Specific Implementation Guides
  {
    name: 'commons-in-practice-documentation',
    category: 'digital',
    fileNames: {
      en: 'commons-in-practice-documentation-en',
      sv: 'commons-in-practice-documentation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Digital Commons in Practice Documentation - Page ',
      sv: 'Dokumentation om digitala allmänna villkor i praktiken - Sida '
    }
  },
  {
    name: 'rural-digital-commons-toolkit',
    category: 'digital',
    fileNames: {
      en: 'rural-digital-commons-toolkit-en',
      sv: 'rural-digital-commons-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Rural Digital Commons Toolkit: Digital Commons Framework - Page ',
      sv: 'Verktygslåda för landsortens digitala allmänningar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'urban-digital-commons-guide',
    category: 'digital',
    fileNames: {
      en: 'urban-digital-commons-guide-en',
      sv: 'urban-digital-commons-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Urban Digital Commons Guide: Digital Commons Framework - Page ',
      sv: 'Guide för urbana digitala allmänningar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'disaster-resilient-commons-protocol',
    category: 'digital',
    fileNames: {
      en: 'disaster-resilient-commons-protocol-en',
      sv: 'disaster-resilient-commons-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Disaster-Resilient Commons Protocol: Digital Commons Framework - Page ',
      sv: 'Katastrofmotståndskraftigt allmänningsprotokoll: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'global-commons-governance-framework',
    category: 'digital',
    fileNames: {
      en: 'global-commons-governance-framework-en',
      sv: 'global-commons-governance-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'context-specific'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'context-specific')
    },
    pageFooter: {
      en: 'Global Commons Governance Framework: Digital Commons Framework - Page ',
      sv: 'Globalt styrsystem för allmänningar: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Advocacy & Scaling Tools
  {
    name: 'digital-commons-advocacy-toolkit',
    category: 'digital',
    fileNames: {
      en: 'digital-commons-advocacy-toolkit-en',
      sv: 'digital-commons-advocacy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'advocacy-and-scaling'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'advocacy-and-scaling')
    },
    pageFooter: {
      en: 'Digital Commons Advocacy Toolkit: Digital Commons Framework - Page ',
      sv: 'Verktygslåda för förespråkande av digitala allmänningar: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'funding-navigator',
    category: 'digital',
    fileNames: {
      en: 'funding-navigator-en',
      sv: 'funding-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'advocacy-and-scaling'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'advocacy-and-scaling')
    },
    pageFooter: {
      en: 'Funding Navigator: Digital Commons Framework - Page ',
      sv: 'Finansieringsnavigator: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'ppp-template',
    category: 'digital',
    fileNames: {
      en: 'ppp-template-en',
      sv: 'ppp-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'advocacy-and-scaling'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'advocacy-and-scaling')
    },
    pageFooter: {
      en: 'Public-Private Partnership Template: Digital Commons Framework - Page ',
      sv: 'Mall för offentlig-privat partnerskap: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Low-Resource Tools
  {
    name: 'community-funding-guide',
    category: 'digital',
    fileNames: {
      en: 'community-funding-guide-en',
      sv: 'community-funding-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'low-resource'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'low-resource')
    },
    pageFooter: {
      en: 'Community Funding Guide: Digital Commons Framework - Page ',
      sv: 'Guide för samhällsfinansiering: Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'resource-mapping-tool',
    category: 'digital',
    fileNames: {
      en: 'resource-mapping-tool-en',
      sv: 'resource-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'low-resource'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'low-resource')
    },
    pageFooter: {
      en: 'Resource Mapping Tool: Digital Commons Framework - Page ',
      sv: 'Verktyg för resurskartering: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Audit Tools
  {
    name: 'audit-report-template',
    category: 'digital',
    fileNames: {
      en: 'audit-report-template-en',
      sv: 'audit-report-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'audit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'audit')
    },
    pageFooter: {
      en: 'Audit Report Template: Digital Commons Framework - Page ',
      sv: 'Mall för granskningsrapport: Digital Commons-ramverket - Sida '
    }
  },

  // Digital Commons Framework - Appendices (for the seed kit)
  {
    name: 'appendix-b-visual-companion-toolkit',
    category: 'digital',
    fileNames: {
      en: 'visual-companion-toolkit-en',
      sv: 'visual-companion-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix B: Visual Companion Toolkit - Digital Commons Framework - Page ',
      sv: 'Bilaga B: Visuellt Följeslagarverktyg - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-c-corporate-participation-playbook',
    category: 'digital',
    fileNames: {
      en: 'corporate-participation-playbook-en',
      sv: 'corporate-participation-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix C: Corporate Participation Playbook - Digital Commons Framework - Page ',
      sv: 'Bilaga C: Spelbok för Företagsdeltagande - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-d-digital-ethics-charter',
    category: 'digital',
    fileNames: {
      en: 'digital-ethics-charter-en',
      sv: 'digital-ethics-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix D: Digital Ethics Charter - Digital Commons Framework - Page ',
      sv: 'Bilaga D: Digital Etikstadga - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-e-commons-glossary',
    category: 'digital',
    fileNames: {
      en: 'commons-glossary-en',
      sv: 'commons-glossary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix E: Commons Glossary - Digital Commons Framework - Page ',
      sv: 'Bilaga E: Commons-ordlista - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-f-minimal-viable-node-quickstart',
    category: 'digital',
    fileNames: {
      en: 'minimal-viable-node-quickstart-en',
      sv: 'minimal-viable-node-quickstart-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix F: Minimal-Viable Node Quickstart - Digital Commons Framework - Page ',
      sv: 'Bilaga F: Minimal-Genomförbar Nodsnabbstart - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-g-field-test-logbook-template',
    category: 'digital',
    fileNames: {
      en: 'field-test-logbook-template-en',
      sv: 'field-test-logbook-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix G: Field-Test Logbook Template - Digital Commons Framework - Page ',
      sv: 'Bilaga G: Mall för Fälttestloggbok - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-i-diplomatic-mini-deck',
    category: 'digital',
    fileNames: {
      en: 'diplomatic-mini-deck-en',
      sv: 'diplomatic-mini-deck-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix I: Diplomatic Mini Deck - Digital Commons Framework - Page ',
      sv: 'Bilaga I: Diplomatiskt Mini-Däck - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-j-historical-commons-context',
    category: 'digital',
    fileNames: {
      en: 'historical-commons-context-en',
      sv: 'historical-commons-context-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix J: Historical Commons Context - Digital Commons Framework - Page ',
      sv: 'Bilaga J: Historisk Allmänningskontext - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'appendix-k-impact-assessment-framework',
    category: 'digital',
    fileNames: {
      en: 'impact-assessment-framework-en',
      sv: 'impact-assessment-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital')
    },
    pageFooter: {
      en: 'Appendix K: Impact Assessment Framework - Digital Commons Framework - Page ',
      sv: 'Bilaga K: Ramverk för Konsekvensanalys - Digital Commons-ramverket - Sida '
    }
  },
  {
    name: 'how-to-use-the-digital-commons-seed-kit',
    category: 'digital',
    fileNames: {
      en: 'how-to-use-the-digital-commons-seed-kit-en',
      sv: 'how-to-use-the-digital-commons-seed-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'How to Use the Digital Commons Seed Kit - Page ',
      sv: 'Så här använder du Digital Commons Seed Kit - Sida '
    }
  },

  // Digital Commons Framework - Digital Tools
  {
    name: 'governance-simulator-app',
    category: 'digital',
    fileNames: {
      en: 'governance-simulator-app-en',
      sv: 'governance-simulator-app-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'Governance Simulator App Documentation - Page ',
      sv: 'Dokumentation för appen Governance Simulator - Sida '
    }
  },
  {
    name: 'ai-chatbot',
    category: 'digital',
    fileNames: {
      en: 'ai-chatbot-en',
      sv: 'ai-chatbot-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'AI Chatbot for Tool Navigation Documentation - Page ',
      sv: 'Dokumentation för verktygsnavigerings-AI-chatbot - Sida '
    }
  },
  {
    name: 'collaboration-platform',
    category: 'digital',
    fileNames: {
      en: 'collaboration-platform-en',
      sv: 'collaboration-platform-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'Real-Time Collaboration Platform Documentation - Page ',
      sv: 'Dokumentation för plattform för samarbete i realtid - Sida '
    }
  },
  {
    name: 'health-dashboard',
    category: 'digital',
    fileNames: {
      en: 'health-dashboard-en',
      sv: 'health-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'digital', 'tools', 'digital-tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'digital', 'tools', 'digital-tools')
    },
    pageFooter: {
      en: 'Digital Commons Health Dashboard Documentation - Page ',
      sv: 'Dokumentation av Digital Commons Health Dashboard - Sida '
    }
  },
  {
    name: 'youth-guide',
    category: 'ethics',
    fileNames: {
      en: 'youth-guide-en',
      sv: 'youth-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Youth & Community Action Guide: Rights of All Beings - Page ',
      sv: 'Handledning för ungdomar och samhällsaktiviteter: Alla varelsers rättigheter - Sida '
    }
  },
  {
    name: 'business-guide',
    category: 'ethics',
    fileNames: {
      en: 'business-guide-en',
      sv: 'business-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Business Leaders: Implementation Guide - Page ',
      sv: 'Varelsers rättigheter för företagsledare: Implementeringsguide - Sida '
    }
  },
  {
    name: 'community-guide',
    category: 'ethics',
    fileNames: {
      en: 'community-guide-en',
      sv: 'community-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Communities - Page ',
      sv: 'Varelsers rättigheter för samhällen och gemenskaper - Sida '
    }
  },
  {
    name: 'crisis-guide',
    category: 'ethics',
    fileNames: {
      en: 'crisis-guide-en',
      sv: 'crisis-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings in Crisis Situations: Emergency Implementation Guide - Page ',
      sv: 'Rättigheter för varelser i krissituationer: Guide till implementering av nödsituationer - Sida '
    }
  },
  {
    name: 'educators-guide',
    category: 'ethics',
    fileNames: {
      en: 'educators-guide-en',
      sv: 'educators-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Educators: Implementation Guide - Page ',
      sv: 'Varelsers rättigheter för lärare: Implementeringsguide - Sida '
    }
  },
  {
    name: 'indigenous-communities-guide',
    category: 'ethics',
    fileNames: {
      en: 'indigenous-communities-guide-en',
      sv: 'indigenous-communities-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Indigenous Communities - Page ',
      sv: 'Rättigheter för varelser för ursprungsbefolkningar - Sida '
    }
  },
  {
    name: 'policy-guide',
    category: 'ethics',
    fileNames: {
      en: 'policy-guide-en',
      sv: 'policy-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Policymakers - Page ',
      sv: 'Varelsers rättigheter för beslutsfattare - Sida '
    }
  },
  {
    name: 'religious-communities-guide',
    category: 'ethics',
    fileNames: {
      en: 'religious-communities-guide-en',
      sv: 'religious-communities-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics')
    },
    pageFooter: {
      en: 'Rights of Beings for Religious Communities - Page ',
      sv: 'Varelsers rättigheter för religiösa samfund - Sida '
    }
  },
  {
    name: 'crisis-ethics-field-guide',
    category: 'ethics',
    fileNames: {
      en: 'crisis-ethics-field-guide-en',
      sv: 'crisis-ethics-field-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Crisis Ethics Field Guide - Page ',
      sv: 'Fältguide för krisetik - Sida '
    }
  },
  {
    name: 'rights-assessment-methodology',
    category: 'ethics',
    fileNames: {
      en: 'rights-assessment-methodology-en',
      sv: 'rights-assessment-methodology-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Rights Assessment Methodology Handbook - Page ',
      sv: 'Handbok för metodik för rättighetsbedömning - Sida '
    }
  },
  {
    name: 'rights-recognition-starter-kit',
    category: 'ethics',
    fileNames: {
      en: 'rights-recognition-starter-kit-en',
      sv: 'rights-recognition-starter-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Rights Recognition Starter Kit - Page ',
      sv: 'Startpaket för erkännande av rättigheter - Sida '
    }
  },
  {
    name: 'spiral-aware-implementation-guide',
    category: 'ethics',
    fileNames: {
      en: 'spiral-aware-implementation-guide-en',
      sv: 'spiral-aware-implementation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'core-guides'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'core-guides')
    },
    pageFooter: {
      en: 'Spiral-Aware Implementation Guide - Page ',
      sv: 'Spiralmedveten implementeringsguide - Sida '
    }
  },
  {
    name: 'conflict-resolution-guide',
    category: 'ethics',
    fileNames: {
      en: 'conflict-resolution-guide-en',
      sv: 'conflict-resolution-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Conflict Resolution Protocol Guide - Page ',
      sv: 'Guide till protokoll för konfliktlösning - Sida '
    }
  },
  {
    name: 'consciousness-assessment-toolkit',
    category: 'ethics',
    fileNames: {
      en: 'consciousness-assessment-toolkit-en',
      sv: 'consciousness-assessment-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Consciousness Assessment Toolkit - Page ',
      sv: 'Verktygslåda för medvetandebedömning - Sida '
    }
  },
  {
    name: 'guardianship-handbook',
    category: 'ethics',
    fileNames: {
      en: 'guardianship-handbook-en',
      sv: 'guardianship-handbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Guardianship Council Handbook - Page ',
      sv: 'Handbok för förmynderskapsrådet - Sida '
    }
  },
  {
    name: 'indigenous-knowledge-protocol',
    category: 'ethics',
    fileNames: {
      en: 'indigenous-knowledge-protocol-en',
      sv: 'indigenous-knowledge-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Indigenous Knowledge Integration Protocol - Page ',
      sv: 'Protokoll för integration av ursprungsbefolkningens kunskap - Sida '
    }
  },
  {
    name: 'pioneer-pilots-manual',
    category: 'ethics',
    fileNames: {
      en: 'pioneer-pilots-manual-en',
      sv: 'pioneer-pilots-manual-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Pioneer Pilots Implementation Manual - Page ',
      sv: 'Implementeringsmanual för Pioneer Pilots - Sida '
    }
  },
  {
    name: 'resistance-management-playbook',
    category: 'ethics',
    fileNames: {
      en: 'resistance-management-playbook-en',
      sv: 'resistance-management-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Resistance Management Playbook - Page ',
      sv: 'Handbok för hantering av motstånd - Sida '
    }
  },
  {
    name: 'edge-case-handbook',
    category: 'ethics',
    fileNames: {
      en: 'edge-case-handbook-en',
      sv: 'edge-case-handbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'ethics', 'tools', 'specialized-resources'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'ethics', 'tools', 'specialized-resources')
    },
    pageFooter: {
      en: 'Edge Case Handbook - Page ',
      sv: 'Handbok för gränsfall - Sida '
    }
  },
  // Justice Framework
  {
    name: 'justice-framework-lite-guide',
    category: 'justice',
    fileNames: {
      en: 'justice-framework-lite-guide-en',
      sv: 'justice-framework-lite-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice')
    },
    pageFooter: {
      en: 'Justice Systems Framework Lite Guide - Page ',
      sv: 'Förenklad guide för rättssystemets ramverk - Sida '
    }
  },
  {
    name: 'justice-lite-guide-community',
    category: 'justice',
    fileNames: {
      en: 'justice-lite-guide-community-en',
      sv: 'justice-lite-guide-community-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice')
    },
    pageFooter: {
      en: 'Justice Systems Framework Lite Guide (Community) - Page ',
      sv: 'Förenklad guide för rättssystemets ramverk (Samhälle) - Sida '
    }
  },
  {
    name: 'youth-justice-guide',
    category: 'justice',
    fileNames: {
      en: 'youth-justice-guide-en',
      sv: 'youth-justice-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice')
    },
    pageFooter: {
      en: 'Justice Systems Framework Lite Guide (Youth) - Page ',
      sv: 'Förenklad guide för rättssystemets ramverk (Ungdom) - Sida '
    }
  },

  // Core Tools
  {
    name: 'pilot-readiness-self-assessment-tool',
    category: 'justice',
    fileNames: {
      en: 'pilot-readiness-self-assessment-tool-en',
      sv: 'pilot-readiness-self-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Pilot Readiness Self-Assessment Tool - Page ',
      sv: 'Självbedömningsverktyg för pilotberedskap - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-charter',
    category: 'justice',
    fileNames: {
      en: 'stakeholder-engagement-charter-en',
      sv: 'stakeholder-engagement-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Charter - Page ',
      sv: 'Charta för intressentengagemang - Sida '
    }
  },
  {
    name: 'restorative-justice-guide',
    category: 'justice',
    fileNames: {
      en: 'restorative-justice-guide-en',
      sv: 'restorative-justice-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Restorative Justice Guide - Page ',
      sv: 'Guide för reparativ rättvisa - Sida '
    }
  },
  {
    name: 'indigenous-justice-integration-template',
    category: 'justice',
    fileNames: {
      en: 'indigenous-justice-integration-template-en',
      sv: 'indigenous-justice-integration-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Indigenous Justice Integration Template - Page ',
      sv: 'Mall för integrering av ursprungsfolks rättvisesystem - Sida '
    }
  },
  {
    name: 'monitoring-evaluation-rubric',
    category: 'justice',
    fileNames: {
      en: 'monitoring-evaluation-rubric-en',
      sv: 'monitoring-evaluation-rubric-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'core')
    },
    pageFooter: {
      en: 'Monitoring & Evaluation Rubric - Page ',
      sv: 'Bedömningsmatris för övervakning och utvärdering - Sida '
    }
  },

  // Advocacy Tools
  {
    name: 'advocacy-playbook',
    category: 'justice',
    fileNames: {
      en: 'advocacy-playbook-en',
      sv: 'advocacy-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Advocacy Playbook - Page ',
      sv: 'Handbok för påverkansarbete - Sida '
    }
  },
  {
    name: 'policy-harmonization-toolkit',
    category: 'justice',
    fileNames: {
      en: 'policy-harmonization-toolkit-en',
      sv: 'policy-harmonization-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Policy Harmonization Toolkit - Page ',
      sv: 'Verktygslåda för policyharmonisering - Sida '
    }
  },
  {
    name: 'executive-summary',
    category: 'justice',
    fileNames: {
      en: 'executive-summary-en',
      sv: 'executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Executive Summary - Page ',
      sv: 'Sammanfattning för beslutsfattare - Sida '
    }
  },
  {
    name: 'policy-brief',
    category: 'justice',
    fileNames: {
      en: 'policy-brief-en',
      sv: 'policy-brief-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Policy Brief - Page ',
      sv: 'Policydokument - Sida '
    }
  },
  {
    name: 'cost-benefit-analysis-model',
    category: 'justice',
    fileNames: {
      en: 'cost-benefit-analysis-model-en',
      sv: 'cost-benefit-analysis-model-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Cost-Benefit Analysis Model - Page ',
      sv: 'Modell för kostnads-nyttoanalys - Sida '
    }
  },

  // Simulation Tools
  {
    name: 'stakeholder-simulation-guide',
    category: 'justice',
    fileNames: {
      en: 'stakeholder-simulation-guide-en',
      sv: 'stakeholder-simulation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'justice', 'tools', 'simulation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'justice', 'tools', 'simulation')
    },
    pageFooter: {
      en: 'Stakeholder Simulation Guide - Page ',
      sv: 'Guide för intressentsimulering - Sida '
    }
  },
  // Spiritual & Religious Dialogue Framework
  // 1. Main guides
  {
    name: 'executive-brief',
    category: 'spiritual',
    fileNames: {
      en: 'executive-brief-en',
      sv: 'executive-brief-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Executive Brief - Page ',
      sv: 'Sammanfattning för Beslutsfattare - Sida '
    }
  },
  {
    name: 'policy-guide',
    category: 'spiritual',
    fileNames: {
      en: 'policy-guide-en',
      sv: 'policy-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Policy Guide - Page ',
      sv: 'Policyguide - Sida '
    }
  },
  {
    name: 'youth-and-broad-audiences-guide',
    category: 'spiritual',
    fileNames: {
      en: 'youth-and-broad-audiences-guide-en',
      sv: 'youth-and-broad-audiences-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Youth & Broad Audiences Guide - Page ',
      sv: 'Guide för Ungdomar & Bred Publik - Sida '
    }
  },

  // 2. Implementation tools
  {
    name: 'adaptive-facilitation-tools',
    category: 'spiritual',
    fileNames: {
      en: 'adaptive-facilitation-tools-en',
      sv: 'adaptive-facilitation-tools-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Adaptive Facilitation Tools - Page ',
      sv: 'Adaptiva Faciliteringsverktyg - Sida '
    }
  },
  {
    name: 'digital-feedback-dashboard',
    category: 'spiritual',
    fileNames: {
      en: 'digital-feedback-dashboard-en',
      sv: 'digital-feedback-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual')
    },
    pageFooter: {
      en: 'Digital Feedback Dashboard - Page ',
      sv: 'Digital Feedback Dashboard - Sida '
    }
  },

  // 3. Core Tools
  {
    name: 'dialogue-facilitation-scripts',
    category: 'spiritual',
    fileNames: {
      en: 'dialogue-facilitation-scripts-en',
      sv: 'dialogue-facilitation-scripts-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Dialogue Facilitation Scripts - Page ',
      sv: 'Dialogfaciliteringsskript - Sida '
    }
  },
  {
    name: 'digital-access-inclusion-audit',
    category: 'spiritual',
    fileNames: {
      en: 'digital-access-inclusion-audit-en',
      sv: 'digital-access-inclusion-audit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Digital Access & Inclusion Audit - Page ',
      sv: 'Digital Tillgång & Inkludering Granskning - Sida '
    }
  },
  {
    name: 'truth-reconciliation-toolkit',
    category: 'spiritual',
    fileNames: {
      en: 'truth-reconciliation-toolkit-en',
      sv: 'truth-reconciliation-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Truth & Reconciliation Toolkit - Page ',
      sv: 'Sannings & Försoningsverktygslåda - Sida '
    }
  },
  {
    name: 'wisdom-documentation-templates',
    category: 'spiritual',
    fileNames: {
      en: 'wisdom-documentation-templates-en',
      sv: 'wisdom-documentation-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'core')
    },
    pageFooter: {
      en: 'Wisdom Documentation Templates - Page ',
      sv: 'Visdomsdokumentationsmallar - Sida '
    }
  },

  // 4. Implementation Tools
  {
    name: 'adaptive-learning-protocol',
    category: 'spiritual',
    fileNames: {
      en: 'adaptive-learning-protocol-en',
      sv: 'adaptive-learning-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'implementation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'implementation')
    },
    pageFooter: {
      en: 'Adaptive Learning Protocol - Page ',
      sv: 'Adaptivt Inlärningsprotokoll - Sida '
    }
  },
  {
    name: 'impact-assessment-guide',
    category: 'spiritual',
    fileNames: {
      en: 'impact-assessment-guide-en',
      sv: 'impact-assessment-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'implementation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'implementation')
    },
    pageFooter: {
      en: 'Impact Assessment Guide - Page ',
      sv: 'Guide för Effektbedömning - Sida '
    }
  },
  {
    name: 'representation-metrics-dashboard',
    category: 'spiritual',
    fileNames: {
      en: 'representation-metrics-dashboard-en',
      sv: 'representation-metrics-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'implementation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'implementation')
    },
    pageFooter: {
      en: 'Representation Metrics Dashboard - Page ',
      sv: 'Dashboard för Representationsmått - Sida '
    }
  },

  // 5. Policy Tools
  {
    name: 'cross-tradition-values-mapping-tool',
    category: 'spiritual',
    fileNames: {
      en: 'cross-tradition-values-mapping-tool-en',
      sv: 'cross-tradition-values-mapping-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Cross-Tradition Values Mapping Tool - Page ',
      sv: 'Traditionsövergripande Värdemappningsverktyg - Sida '
    }
  },
  {
    name: 'ethics-charter-template',
    category: 'spiritual',
    fileNames: {
      en: 'ethics-charter-template-en',
      sv: 'ethics-charter-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Ethics Charter Template - Page ',
      sv: 'Mall för Etiskt Stadga - Sida '
    }
  },
  {
    name: 'policy-development-guide',
    category: 'spiritual',
    fileNames: {
      en: 'policy-development-guide-en',
      sv: 'policy-development-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Policy Development Guide - Page ',
      sv: 'Guide för Policyutveckling - Sida '
    }
  },
  {
    name: 'policy-translation-guide',
    category: 'spiritual',
    fileNames: {
      en: 'policy-translation-guide-en',
      sv: 'policy-translation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Policy Translation Guide - Page ',
      sv: 'Guide för Policyöversättning - Sida '
    }
  },
  {
    name: 'wisdom-repository-starter-kit',
    category: 'spiritual',
    fileNames: {
      en: 'wisdom-repository-starter-kit-en',
      sv: 'wisdom-repository-starter-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'policy')
    },
    pageFooter: {
      en: 'Wisdom Repository Starter Kit - Page ',
      sv: 'Startkit för Visdomsförvar - Sida '
    }
  },

  // 6. Seed Kit Tools
  {
    name: 'conflict-de-escalation-protocols',
    category: 'spiritual',
    fileNames: {
      en: 'conflict-de-escalation-protocols-en',
      sv: 'conflict-de-escalation-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Conflict De-escalation Protocols - Page ',
      sv: 'Protokoll för Konfliktdeeskalering - Sida '
    }
  },
  {
    name: 'cultural-appropriation-prevention',
    category: 'spiritual',
    fileNames: {
      en: 'cultural-appropriation-prevention-en',
      sv: 'cultural-appropriation-prevention-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Cultural Appropriation Prevention - Page ',
      sv: 'Förebyggande av Kulturell Appropriering - Sida '
    }
  },
  {
    name: 'dialogue-facilitation-guide',
    category: 'spiritual',
    fileNames: {
      en: 'dialogue-facilitation-guide-en',
      sv: 'dialogue-facilitation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Dialogue Facilitation Guide - Page ',
      sv: 'Guide för Dialogfacilitering - Sida '
    }
  },
  {
    name: 'local-partnership-templates',
    category: 'spiritual',
    fileNames: {
      en: 'local-partnership-templates-en',
      sv: 'local-partnership-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Local Partnership Templates - Page ',
      sv: 'Mallar för Lokala Partnerskap - Sida '
    }
  },
  {
    name: 'regional-customization-framework',
    category: 'spiritual',
    fileNames: {
      en: 'regional-customization-framework-en',
      sv: 'regional-customization-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Regional Customization Framework - Page ',
      sv: 'Ramverk för Regional Anpassning - Sida '
    }
  },
  {
    name: 'representation-assessment-tool',
    category: 'spiritual',
    fileNames: {
      en: 'representation-assessment-tool-en',
      sv: 'representation-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Representation Assessment Tool - Page ',
      sv: 'Verktyg för Representationsbedömning - Sida '
    }
  },
  {
    name: 'sacred-space-setup-guide',
    category: 'spiritual',
    fileNames: {
      en: 'sacred-space-setup-guide-en',
      sv: 'sacred-space-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Sacred Space Setup Guide - Page ',
      sv: 'Guide för Uppsättning av Heliga Rum - Sida '
    }
  },
  {
    name: 'tradition-protocol-cards',
    category: 'spiritual',
    fileNames: {
      en: 'tradition-protocol-cards-en',
      sv: 'tradition-protocol-cards-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Tradition-Specific Protocol Cards - Page ',
      sv: 'Tradtiionsspecifika Protokollkort - Sida '
    }
  },

  // Full framework combined PDF
  {
    name: 'spiritual-dialogue-framework',
    category: 'spiritual',
    fileNames: {
      en: 'Spiritual-Dialogue',
      sv: 'Spiritual-Dialogue'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Religious & Spiritual Dialogue Framework - Page ',
      sv: 'Religiös & Spirituell Dialog Ramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'introduction',
      'core-principles',
      'objectives',
      'governance-structure',
      'implementation-mechanisms',
      'key-activities',
      'funding-and-resources',
      'challenges-and-mitigation-strategies',
      'timeline',
      'conclusion',
      'appendix-a',
      'appendix-b',
      'appendix-c',
      'appendix-d',
      'appendix-e',
      'appendix-f',
      'appendix-g',
      'appendix-h'
    ]
  },

  // Sacred Seed Kit combined PDF 
  {
    name: 'sacred-seed-kit',
    category: 'spiritual',
    fileNames: {
      en: 'sacred-seed-kit-en',
      sv: 'sacred-seed-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'spiritual', 'tools', 'seed-kit'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'spiritual', 'tools', 'seed-kit')
    },
    pageFooter: {
      en: 'Sacred Seed Kit - Page ',
      sv: 'Heligt Startkit - Sida '
    },
    // Special config to combine all seed kit files
    combinedFiles: [
      'dialogue-facilitation-guide',
      'representation-assessment-tool',
      'cultural-appropriation-prevention',
      'conflict-de-escalation-protocols',
      'local-partnership-templates',
      'regional-customization-framework',
      'sacred-space-setup-guide',
      'tradition-protocol-cards'
    ]
  },

  // Financial Systems

  // Quick Guides
  {
    name: 'quick-guide',
    category: 'financial-systems',
    fileNames: {
      en: 'quick-guide-en',
      sv: 'quick-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems')
    },
    pageFooter: {
      en: 'Quick Guide - Page ',
      sv: 'Snabbguide - Sida '
    }
  },
  {
    name: 'quick-guide-medium',
    category: 'financial-systems',
    fileNames: {
      en: 'quick-guide-medium-en',
      sv: 'quick-guide-medium-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems')
    },
    pageFooter: {
      en: 'Community Guide - Page ',
      sv: 'Samhällsguide - Sida '
    }
  },
  {
    name: 'quick-guide-youth',
    category: 'financial-systems',
    fileNames: {
      en: 'quick-guide-youth-en',
      sv: 'quick-guide-youth-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems')
    },
    pageFooter: {
      en: 'Youth Guide - Page ',
      sv: 'Ungdomsguide - Sida '
    }
  },

  // Implementation Tools
  {
    name: 'hearts-toolkit',
    category: 'financial-systems',
    fileNames: {
      en: 'hearts-toolkit-en',
      sv: 'hearts-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Hearts Implementation Toolkit - Page ',
      sv: 'Hearts Implementeringsverktyg - Sida '
    }
  },
  {
    name: 'transition-guide',
    category: 'financial-systems',
    fileNames: {
      en: 'transition-guide-en',
      sv: 'transition-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Transition Guide - Page ',
      sv: 'Övergångsguide - Sida '
    }
  },
  {
    name: 'validator-training',
    category: 'financial-systems',
    fileNames: {
      en: 'validator-training-en',
      sv: 'validator-training-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Validator Training Manual - Page ',
      sv: 'Validatorträningsmanual - Sida '
    }
  },
  {
    name: 'love-ledger-guide',
    category: 'financial-systems',
    fileNames: {
      en: 'love-ledger-guide-en',
      sv: 'love-ledger-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Love Ledger User Guide - Page ',
      sv: 'Love Ledger Användarguide - Sida '
    }
  },
  {
    name: 'hearts-technical-spec',
    category: 'financial-systems',
    fileNames: {
      en: 'hearts-technical-spec-en',
      sv: 'hearts-technical-spec-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Hearts Technical Specification - Page ',
      sv: 'Hearts Teknisk Specifikation - Sida '
    }
  },
  {
    name: 'translation-layer',
    category: 'financial-systems',
    fileNames: {
      en: 'translation-layer-en',
      sv: 'translation-layer-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Inter-Currency Translation Layer - Page ',
      sv: 'Inter-Valuta Översättningslager - Sida '
    }
  },
  {
    name: 'proof-of-care',
    category: 'financial-systems',
    fileNames: {
      en: 'proof-of-care-en',
      sv: 'proof-of-care-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems', 'tools')
    },
    pageFooter: {
      en: 'Proof of Care Protocol - Page ',
      sv: 'Proof of Care Protokoll - Sida '
    }
  },
  // Full framework combined PDF
  {
    name: 'financial-systems-framework',
    category: 'financial-systems',
    fileNames: {
      en: 'Financial-Systems-Framework',
      sv: 'Finansiella-Systems-Ramverk'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'financial-systems'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'financial-systems')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Financial Systems Framework - Page ',
      sv: 'Finansiella Systems Ramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'introduction',
      'core-principles',
      'structural-components',
      'implementation-approaches',
      'metrics-evaluation',
      'supporting-sections',
      'appendices'
    ]
  },

  // General Governance
  // Core Tools
  {
    name: 'decidetogether-platform-guide',
    category: 'governance',
    fileNames: {
      en: 'decidetogether-platform-guide-en',
      sv: 'decidetogether-platform-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'governance','tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'governance', 'tools', 'core')
    },
    pageFooter: {
      en: 'DecideTogether Platform Guide - Page ',
      sv: 'Guide till DecideTogether-plattformen - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-charter',
    category: 'governance',
    fileNames: {
      en: 'stakeholder-engagement-charter-en',
      sv: 'stakeholder-engagement-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'governance','tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'governance', 'tools', 'core')
    },
    pageFooter: {
      en: 'Stakeholder Engagement Charter Template - Page ',
      sv: 'Mall för stadga för intressentengagemang - Sida '
    }
  },
  {
    name: 'community-well-being-index',
    category: 'governance',
    fileNames: {
      en: 'community-well-being-index-en',
      sv: 'community-well-being-index-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'governance','tools', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'governance', 'tools', 'monitoring')
    },
    pageFooter: {
      en: 'Community Well-Being Index - Page ',
      sv: 'Index för samhällets välbefinnande - Sida '
    }
  },

  // Environmental Stewardship Framework
  // Core Tools
  {
    name: 'dynamic-rights-spectrum-guide',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'dynamic-rights-spectrum-guide-en',
      sv: 'dynamic-rights-spectrum-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'environmental-stewardship', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'core')
    },
    pageFooter: {
      en: 'Dynamic Rights Spectrum Guide - Page ',
      sv: 'Guide för dynamiskt rättighetsspektrum - Sida '
    }
  },
  {
    name: 'reparations-protocol',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'reparations-protocol-en',
      sv: 'reparations-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'environmental-stewardship', 'tools', 'governance'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'governance')
    },
    pageFooter: {
      en: 'Reparations Protocol - Page ',
      sv: 'Reparationsprotokoll - Sida '
    }
  },
  {
    name: 'ecosystem-health-indicators',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'ecosystem-health-indicators-en',
      sv: 'ecosystem-health-indicators-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'environmental-stewardship', 'tools', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'monitoring')
    },
    pageFooter: {
      en: 'Ecosystem Health Indicators - Page ',
      sv: 'Indikatorer för ekosystemhälsa - Sida '
    }
  },
  {
    name: 'nexus-impact-assessment-tool',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'nexus-impact-assessment-tool-en',
      sv: 'nexus-impact-assessment-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'environmental-stewardship', 'tools', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'environmental-stewardship', 'tools', 'monitoring')
    },
    pageFooter: {
      en: 'Nexus Impact Assessment Tool - Page ',
      sv: 'Nexus konsekvensbedömningsverktyg - Sida '
    }
  },
  // Guides
  {
    name: 'one-page-essence',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'one-page-essence-en',
      sv: 'one-page-essence-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'environmental-stewardship'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'environmental-stewardship')
    },
    pageFooter: {
      en: 'Environmental Stewardship Framework - One Page Essence - Page ',
      sv: 'Ramverk för miljöförvaltning - Essens på en sida - Sida '
    }
  },
  {
    name: 'first-100-days-playbook',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'first-100-days-playbook-en',
      sv: 'first-100-days-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'environmental-stewardship'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'environmental-stewardship')
    },
    pageFooter: {
      en: 'First 100 Days Playbook - Page ',
      sv: 'Handbok för de första 100 dagarna - Sida '
    }
  },
  // Full framework
  {
    name: 'environmental-stewardship-framework',
    category: 'environmental-stewardship',
    fileNames: {
      en: 'Environmental-Stewardship-Framework',
      sv: 'Environmental-Stewardship-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'environmental-stewardship'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'environmental-stewardship')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Environmental Stewardship Framework for Multi-Level Governance - Page ',
      sv: 'Miljöförvaltningsramverk för Flernivåstyrning - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'introduction',
      'guiding-principles',
      'governance-structure',
      'core-pillars',
      'policy-mechanisms',
      'stakeholder-engagement',
      'financing-mechanisms',
      'implementation-roadmap',
      'metrics-for-success',
      'visualizations',
      'challenges-and-solutions',
      'implementation-tools',
      'reparations-protocol',
      'conclusion',
      'appendices'
    ]
  },
  // Biodiversity Framework Tools & Guides Snippets for PDF Generator and Markdown Copy Tool

  // Main Implementation Guides
  {
    name: 'technical-guide-policymakers',
    category: 'biodiversity',
    fileNames: {
      en: 'technical-guide-policymakers-en',
      sv: 'technical-guide-policymakers-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Technical Guide for Policymakers - Page ',
      sv: 'Ramverk för biologisk mångfald - Teknisk guide för beslutsfattare - Sida '
    }
  },

  {
    name: 'community-implementation-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'community-implementation-guide-en',
      sv: 'community-implementation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Community Implementation Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Samhällsguide för implementering - Sida '
    }
  },

  {
    name: 'youth-engagement-leadership-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'youth-engagement-leadership-guide-en',
      sv: 'youth-engagement-leadership-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Youth Engagement & Leadership Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Ungdomsengagemang & ledarskapsguide - Sida '
    }
  },

  {
    name: 'corporate-transition-redemption-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'corporate-transition-redemption-guide-en',
      sv: 'corporate-transition-redemption-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Corporate Transition & Redemption Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Företagsövergång & återlösningsguide - Sida '
    }
  },

  {
    name: 'indigenous-data-sovereignty-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'indigenous-data-sovereignty-guide-en',
      sv: 'indigenous-data-sovereignty-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Indigenous Data Sovereignty Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Urfolks datasuveränitetsguide - Sida '
    }
  },

  // Core Tools
  {
    name: 'fpic-2-protocols-template',
    category: 'biodiversity',
    fileNames: {
      en: 'fpic-2-protocols-template-en',
      sv: 'fpic-2-protocols-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'core')
    },
    pageFooter: {
      en: 'Biodiversity Framework - FPIC 2.0 Protocols Template - Page ',
      sv: 'Ramverk för biologisk mångfald - FPIC 2.0 protokollmall - Sida '
    }
  },

  {
    name: 'rights-escalation-ladder-framework',
    category: 'biodiversity',
    fileNames: {
      en: 'rights-escalation-ladder-framework-en',
      sv: 'rights-escalation-ladder-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'core')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Rights Escalation Ladder Framework - Page ',
      sv: 'Ramverk för biologisk mångfald - Rättighetsupptrappningsstege ramverk - Sida '
    }
  },

  {
    name: 'youth-leadership-pipeline-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'youth-leadership-pipeline-guide-en',
      sv: 'youth-leadership-pipeline-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'core')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Youth Leadership Pipeline Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Guide för ungdomsledarskap - Sida '
    }
  },

  {
    name: 'future-beings-council-setup',
    category: 'biodiversity',
    fileNames: {
      en: 'future-beings-council-setup-en',
      sv: 'future-beings-council-setup-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'core')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Future Beings Council Setup - Page ',
      sv: 'Ramverk för biologisk mångfald - Framtida varelsers råd uppsättning - Sida '
    }
  },

  {
    name: 'corporate-transition-support-toolkit',
    category: 'biodiversity',
    fileNames: {
      en: 'corporate-transition-support-toolkit-en',
      sv: 'corporate-transition-support-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'core')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Corporate Transition Support Toolkit - Page ',
      sv: 'Ramverk för biologisk mångfald - Verktygskit för företagsövergångsstöd - Sida '
    }
  },

  {
    name: 'crisis-response-protocols',
    category: 'biodiversity',
    fileNames: {
      en: 'crisis-response-protocols-en',
      sv: 'crisis-response-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'core')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Crisis Response Protocols - Page ',
      sv: 'Ramverk för biologisk mångfald - Krisberedskapsprotokoll - Sida '
    }
  },

  {
    name: 'regional-adaptation-guidelines',
    category: 'biodiversity',
    fileNames: {
      en: 'regional-adaptation-guidelines-en',
      sv: 'regional-adaptation-guidelines-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'core')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Regional Adaptation Guidelines - Page ',
      sv: 'Ramverk för biologisk mångfald - Riktlinjer för regional anpassning - Sida '
    }
  },

  // Economic Tools
  {
    name: 'hybrid-ubes-implementation-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'hybrid-ubes-implementation-guide-en',
      sv: 'hybrid-ubes-implementation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'economic')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Hybrid UBES Implementation Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Hybrid UBES implementeringsguide - Sida '
    }
  },

  {
    name: 'impact-bonds-financing',
    category: 'biodiversity',
    fileNames: {
      en: 'impact-bonds-financing-en',
      sv: 'impact-bonds-financing-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'economic')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Biodiversity Impact Bonds & Financing - Page ',
      sv: 'Ramverk för biologisk mångfald - Biodiversitetspåverkningsobligationer & finansiering - Sida '
    }
  },

  {
    name: 'economic-resilience-corporate',
    category: 'biodiversity',
    fileNames: {
      en: 'economic-resilience-corporate-en',
      sv: 'economic-resilience-corporate-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'economic')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Economic Resilience & Corporate Transition Toolkit - Page ',
      sv: 'Ramverk för biologisk mångfald - Ekonomisk motståndskraft & företagsövergångsverktyg - Sida '
    }
  },

  // Cultural Mobilization Tools
  {
    name: 'bio-arts-toolkit',
    category: 'biodiversity',
    fileNames: {
      en: 'bio-arts-toolkit-en',
      sv: 'bio-arts-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'cultural'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'cultural')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Bio-Arts Residencies Toolkit - Page ',
      sv: 'Ramverk för biologisk mångfald - Bio-konstresidensers verktygskit - Sida '
    }
  },

  {
    name: 'restoration-calendar-template',
    category: 'biodiversity',
    fileNames: {
      en: 'restoration-calendar-template-en',
      sv: 'restoration-calendar-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'cultural'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'cultural')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Global Restoration Calendar Template - Page ',
      sv: 'Ramverk för biologisk mångfald - Global restaureringskalender mall - Sida '
    }
  },

  {
    name: 'bio-influencer-campaign',
    category: 'biodiversity',
    fileNames: {
      en: 'bio-influencer-campaign-en',
      sv: 'bio-influencer-campaign-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'cultural'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'cultural')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Bio-Influencer Training & Campaign Kit - Page ',
      sv: 'Ramverk för biologisk mångfald - Bio-influencer träning & kampanjkit - Sida '
    }
  },

  // Technology & Monitoring Tools
  {
    name: 'blockchain-setup-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'blockchain-setup-guide-en',
      sv: 'blockchain-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Biodiversity Blockchain Setup Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Biodiversitetsblockkedja uppsättningsguide - Sida '
    }
  },

  {
    name: 'trust-dashboard-evaluation',
    category: 'biodiversity',
    fileNames: {
      en: 'trust-dashboard-evaluation-en',
      sv: 'trust-dashboard-evaluation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Public Trust Dashboard & Evaluation Template - Page ',
      sv: 'Ramverk för biologisk mångfald - Offentlig förtroendedashboard & utvärderingsmall - Sida '
    }
  },

  {
    name: 'cyber-guardianship-complete',
    category: 'biodiversity',
    fileNames: {
      en: 'cyber-guardianship-complete-en',
      sv: 'cyber-guardianship-complete-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Cyber-Physical Guardianship Protocols - Page ',
      sv: 'Ramverk för biologisk mångfald - Cyber-fysiska vårdnadsprotokoll - Sida '
    }
  },

  // Digital Platform Tools
  {
    name: 'governance-simulator',
    category: 'biodiversity',
    fileNames: {
      en: 'governance-simulator-en',
      sv: 'governance-simulator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'digital')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Biodiversity Governance Simulator - Page ',
      sv: 'Ramverk för biologisk mångfald - Biodiversitetsstyrningssimulator - Sida '
    }
  },

  {
    name: 'health-dashboard',
    category: 'biodiversity',
    fileNames: {
      en: 'health-dashboard-en',
      sv: 'health-dashboard-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'digital')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Global Biodiversity Health Dashboard - Page ',
      sv: 'Ramverk för biologisk mångfald - Global biodiversitetshälsodashboard - Sida '
    }
  },

  {
    name: 'collaboration-platform',
    category: 'biodiversity',
    fileNames: {
      en: 'collaboration-platform-en',
      sv: 'collaboration-platform-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'digital')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Real-Time Collaboration Platform - Page ',
      sv: 'Ramverk för biologisk mångfald - Realtids samarbetsplattform - Sida '
    }
  },

  // Regional Implementation Tools
  {
    name: 'amazon-basin-complete',
    category: 'biodiversity',
    fileNames: {
      en: 'amazon-basin-complete-en',
      sv: 'amazon-basin-complete-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'regional'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'regional')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Amazon Basin Implementation Toolkit - Page ',
      sv: 'Ramverk för biologisk mångfald - Amazonbäckenet implementeringsverktyg - Sida '
    }
  },

  {
    name: 'arctic-sovereignty-complete',
    category: 'biodiversity',
    fileNames: {
      en: 'arctic-sovereignty-complete-en',
      sv: 'arctic-sovereignty-complete-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'regional'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'regional')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Arctic Indigenous Sovereignty Toolkit - Page ',
      sv: 'Ramverk för biologisk mångfald - Arktisk ursprungssuveränitetsverktyg - Sida '
    }
  },

  {
    name: 'urban-biodiversity-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'urban-biodiversity-guide-en',
      sv: 'urban-biodiversity-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'regional'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'regional')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Urban Biodiversity Integration Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Urbans biodiversitetsintegrationsguide - Sida '
    }
  },

  // Advocacy & Scaling Tools
  {
    name: 'advocacy-toolkit',
    category: 'biodiversity',
    fileNames: {
      en: 'advocacy-toolkit-en',
      sv: 'advocacy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Biodiversity Advocacy Campaign Toolkit - Page ',
      sv: 'Ramverk för biologisk mångfald - Biodiversitetspåverkanskampanj verktygskit - Sida '
    }
  },

  {
    name: 'funding-navigator',
    category: 'biodiversity',
    fileNames: {
      en: 'funding-navigator-en',
      sv: 'funding-navigator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Funding Navigator for Biodiversity Projects - Page ',
      sv: 'Ramverk för biologisk mångfald - Finansieringsnavigator för biodiversitetsprojekt - Sida '
    }
  },

  {
    name: 'diplomatic-playbook',
    category: 'biodiversity',
    fileNames: {
      en: 'diplomatic-playbook-en',
      sv: 'diplomatic-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Diplomatic Engagement Playbook - Page ',
      sv: 'Ramverk för biologisk mångfald - Diplomatisk engagemangshandbok - Sida '
    }
  },

  {
    name: 'coalition-building-guide',
    category: 'biodiversity',
    fileNames: {
      en: 'coalition-building-guide-en',
      sv: 'coalition-building-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'advocacy')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Coalition Building Strategy Guide - Page ',
      sv: 'Ramverk för biologisk mångfald - Koalitionsbyggnadsstrategi guide - Sida '
    }
  },

  // Assessment & Evaluation Tools
  {
    name: 'pilot-audit-learning',
    category: 'biodiversity',
    fileNames: {
      en: 'pilot-audit-learning-en',
      sv: 'pilot-audit-learning-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'assessment'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'assessment')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Pilot Program Audit & Learning Template - Page ',
      sv: 'Ramverk för biologisk mångfald - Pilotprogram revision & lärandemall - Sida '
    }
  },

  {
    name: 'cultural-democratic-assessment',
    category: 'biodiversity',
    fileNames: {
      en: 'cultural-democratic-assessment-en',
      sv: 'cultural-democratic-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity', 'tools', 'assessment'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity', 'tools', 'assessment')
    },
    pageFooter: {
      en: 'Biodiversity Framework - Cultural Impact & Democratic Assessment Tool - Page ',
      sv: 'Ramverk för biologisk mångfald - Kulturell påverkan & demokratisk bedömningsverktyg - Sida '
    }
  },
  // Full Biodiversity Framework
  {
    name: 'biodiversity-framework',
    category: 'biodiversity',
    fileNames: {
      en: 'Biodiversity-Framework',
      sv: 'Biodiversity-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'biodiversity'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'biodiversity')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Global Governance Biodiversity Implementation Framework - Page ',
      sv: 'Global Styrning Biodiversitet Implementering Ramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'philosophical-preamble',
      'introduction-vision',
      'guiding-principles',
      'core-pillars',
      'governance-structure',
      'policy-mechanisms',
      'stakeholder-engagement',
      'financing-mechanisms',
      'implementation-roadmap',
      'metrics-success',
      'visualizations',
      'challenges-solutions',
      'implementation-tools',
      'reparations-protocol',
      'conclusion-call-to-action',
      'appendix-a-synergy-esfmlg',
      'appendix-b-glossary',
      'appendix-c-tool-library',
      'appendix-d-moral-edge-cases',
      'appendix-e-political-economy',
      'appendix-f-feasibility-studies',
      'appendix-g-pilot-blueprints',
      'appendix-h-scenario-planning',
      'appendix-i-cooperation-protocols',
      'appendix-j-creative-outputs'
    ]
  },

  // Planetary Health Framework

  // Main framework files
  {
    name: 'planetary-health-accord-lite',
    category: 'planetary-health',
    fileNames: {
      en: 'planetary-health-accord-lite-en',
      sv: 'planetary-health-accord-lite-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Planetary Health Accord Lite - Page ',
      sv: 'Planetariskt hälsoramverk - Planetariskt hälsoavtal Lite - Sida '
    }
  },

  {
    name: 'childrens-health-rights-comic',
    category: 'planetary-health',
    fileNames: {
      en: 'childrens-health-rights-comic-en',
      sv: 'childrens-health-rights-comic-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Children\'s Health Rights Comic - Page ',
      sv: 'Planetariskt hälsoramverk - Barns hälsorättigheter serietidning - Sida '
    }
  },

  {
    name: 'health-worker-charter',
    category: 'planetary-health',
    fileNames: {
      en: 'health-worker-charter-en',
      sv: 'health-worker-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Health Worker Charter - Page ',
      sv: 'Planetariskt hälsoramverk - Stadga för hälso- och sjukvårdspersonal - Sida '
    }
  },

  {
    name: 'executive-summary',
    category: 'planetary-health',
    fileNames: {
      en: 'executive-summary-en',
      sv: 'executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Executive Summary - Page ',
      sv: 'Planetariskt hälsoramverk - Sammanfattning - Sida '
    }
  },

  {
    name: 'health-sanctuary-guides',
    category: 'planetary-health',
    fileNames: {
      en: 'health-sanctuary-guides-en',
      sv: 'health-sanctuary-guides-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Health Sanctuary Implementation Guides - Page ',
      sv: 'Planetariskt hälsoramverk - Implementeringsguider för Health Sanctuary - Sida '
    }
  },

  // Core governance tools
  {
    name: 'global-health-equity-council-setup',
    category: 'planetary-health',
    fileNames: {
      en: 'global-health-equity-council-setup-en',
      sv: 'global-health-equity-council-setup-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'core')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Global Health Equity Council Setup - Page ',
      sv: 'Planetariskt hälsoramverk - Global hälsorättvisa råd setup - Sida '
    }
  },

  {
    name: 'regional-health-hub-implementation',
    category: 'planetary-health',
    fileNames: {
      en: 'regional-health-hub-implementation-en',
      sv: 'regional-health-hub-implementation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'core')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Regional Health Hub Implementation - Page ',
      sv: 'Planetariskt hälsoramverk - Regional hälsohubb implementering - Sida '
    }
  },

  {
    name: 'conflict-resolution-protocols',
    category: 'planetary-health',
    fileNames: {
      en: 'conflict-resolution-protocols-en',
      sv: 'conflict-resolution-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'core')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Conflict Resolution Protocols - Page ',
      sv: 'Planetariskt hälsoramverk - Konfliktlösning protokoll - Sida '
    }
  },

  {
    name: 'youth-advisory-board-framework',
    category: 'planetary-health',
    fileNames: {
      en: 'youth-advisory-board-framework-en',
      sv: 'youth-advisory-board-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'core')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Youth Advisory Board Framework - Page ',
      sv: 'Planetariskt hälsoramverk - Ungdomsrådgivande styrelse ramverk - Sida '
    }
  },

  {
    name: 'policy-integration-toolkit',
    category: 'planetary-health',
    fileNames: {
      en: 'policy-integration-toolkit-en',
      sv: 'policy-integration-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'core')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Policy Integration Toolkit - Page ',
      sv: 'Planetariskt hälsoramverk - Verktygslåda för policyintegrering - Sida '
    }
  },

  // Technology tools
  {
    name: 'ai-bias-audit-framework',
    category: 'planetary-health',
    fileNames: {
      en: 'ai-bias-audit-framework-en',
      sv: 'ai-bias-audit-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Planetary Health Framework - AI Bias Audit Framework - Page ',
      sv: 'Planetariskt hälsoramverk - AI bias granskning ramverk - Sida '
    }
  },

  {
    name: 'ai-ethics-protocols',
    category: 'planetary-health',
    fileNames: {
      en: 'ai-ethics-protocols-en',
      sv: 'ai-ethics-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Planetary Health Framework - AI Ethics Protocols - Page ',
      sv: 'Planetariskt hälsoramverk - AI-etiska protokoll - Sida '
    }
  },

  {
    name: 'ai-literacy-certifications',
    category: 'planetary-health',
    fileNames: {
      en: 'ai-literacy-certifications-en',
      sv: 'ai-literacy-certifications-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Planetary Health Framework - AI Literacy Certifications - Page ',
      sv: 'Planetariskt hälsoramverk - AI-kompetenscertifieringar - Sida '
    }
  },

  {
    name: 'blockchain-health-records-setup',
    category: 'planetary-health',
    fileNames: {
      en: 'blockchain-health-records-setup-en',
      sv: 'blockchain-health-records-setup-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Blockchain Health Records Setup - Page ',
      sv: 'Planetariskt hälsoramverk - Blockchain hälsoregister setup - Sida '
    }
  },

  {
    name: 'federated-learning-implementation',
    category: 'planetary-health',
    fileNames: {
      en: 'federated-learning-implementation-en',
      sv: 'federated-learning-implementation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Federated Learning Implementation - Page ',
      sv: 'Planetariskt hälsoramverk - Federerad inlärning implementering - Sida '
    }
  },

  {
    name: 'cybersecurity-framework-health',
    category: 'planetary-health',
    fileNames: {
      en: 'cybersecurity-framework-health-en',
      sv: 'cybersecurity-framework-health-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'technology')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Cybersecurity Framework for Health - Page ',
      sv: 'Planetariskt hälsoramverk - Cybersäkerhet ramverk för hälsa - Sida '
    }
  },

  // Community tools
  {
    name: 'community-health-legion-manual',
    category: 'planetary-health',
    fileNames: {
      en: 'community-health-legion-manual-en',
      sv: 'community-health-legion-manual-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'community'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'community')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Community Health Legion Manual - Page ',
      sv: 'Planetariskt hälsoramverk - Gemenskapshälsa legion manual - Sida '
    }
  },

  {
    name: 'cultural-competency-training',
    category: 'planetary-health',
    fileNames: {
      en: 'cultural-competency-training-en',
      sv: 'cultural-competency-training-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'community'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'community')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Cultural Competency Training - Page ',
      sv: 'Planetariskt hälsoramverk - Kulturell kompetens utbildning - Sida '
    }
  },

  {
    name: 'mental-health-integration-toolkit',
    category: 'planetary-health',
    fileNames: {
      en: 'mental-health-integration-toolkit-en',
      sv: 'mental-health-integration-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'community'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'community')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Mental Health Integration Toolkit - Page ',
      sv: 'Planetariskt hälsoramverk - Mental hälsa integration verktygslåda - Sida '
    }
  },

  {
    name: 'trauma-informed-care-protocols',
    category: 'planetary-health',
    fileNames: {
      en: 'trauma-informed-care-protocols-en',
      sv: 'trauma-informed-care-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'community'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'community')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Trauma-Informed Care Protocols - Page ',
      sv: 'Planetariskt hälsoramverk - Traumainformerad vård protokoll - Sida '
    }
  },

  // Financing tools
  {
    name: 'health-solidarity-fund-setup',
    category: 'planetary-health',
    fileNames: {
      en: 'health-solidarity-fund-setup-en',
      sv: 'health-solidarity-fund-setup-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'financing'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'financing')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Health Solidarity Fund Setup - Page ',
      sv: 'Planetariskt hälsoramverk - Hälsosolidaritet fond setup - Sida '
    }
  },

  {
    name: 'debt-for-health-swap-templates',
    category: 'planetary-health',
    fileNames: {
      en: 'debt-for-health-swap-templates-en',
      sv: 'debt-for-health-swap-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'financing'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'financing')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Debt-for-Health Swap Templates - Page ',
      sv: 'Planetariskt hälsoramverk - Skuld-för-hälsa byte mallar - Sida '
    }
  },

  {
    name: 'open-source-pharma-toolkit',
    category: 'planetary-health',
    fileNames: {
      en: 'open-source-pharma-toolkit-en',
      sv: 'open-source-pharma-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'financing'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'financing')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Open-Source Pharma Toolkit - Page ',
      sv: 'Planetariskt hälsoramverk - Öppen källkod pharma verktygslåda - Sida '
    }
  },

  {
    name: 'health-impact-bond-framework',
    category: 'planetary-health',
    fileNames: {
      en: 'health-impact-bond-framework-en',
      sv: 'health-impact-bond-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'financing'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'financing')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Health Impact Bond Framework - Page ',
      sv: 'Planetariskt hälsoramverk - Hälsoeffekt obligation ramverk - Sida '
    }
  },

  // Preparedness tools
  {
    name: 'one-health-surveillance-protocols',
    category: 'planetary-health',
    fileNames: {
      en: 'one-health-surveillance-protocols-en',
      sv: 'one-health-surveillance-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'preparedness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'preparedness')
    },
    pageFooter: {
      en: 'Planetary Health Framework - One Health Surveillance Protocols - Page ',
      sv: 'Planetariskt hälsoramverk - En hälsa övervakning protokoll - Sida '
    }
  },

  {
    name: 'pandemic-response-playbook',
    category: 'planetary-health',
    fileNames: {
      en: 'pandemic-response-playbook-en',
      sv: 'pandemic-response-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'preparedness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'preparedness')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Pandemic Response Playbook - Page ',
      sv: 'Planetariskt hälsoramverk - Pandemi respons handbok - Sida '
    }
  },

  {
    name: 'climate-health-adaptation-guide',
    category: 'planetary-health',
    fileNames: {
      en: 'climate-health-adaptation-guide-en',
      sv: 'climate-health-adaptation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'preparedness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'preparedness')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Climate-Health Adaptation Guide - Page ',
      sv: 'Planetariskt hälsoramverk - Klimat-hälsa anpassning guide - Sida '
    }
  },

  {
    name: 'mobile-clinic-deployment-kit',
    category: 'planetary-health',
    fileNames: {
      en: 'mobile-clinic-deployment-kit-en',
      sv: 'mobile-clinic-deployment-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health', 'tools', 'preparedness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health', 'tools', 'preparedness')
    },
    pageFooter: {
      en: 'Planetary Health Framework - Mobile Clinic Deployment Kit - Page ',
      sv: 'Planetariskt hälsoramverk - Mobil klinik distribution kit - Sida '
    }
  },

  // Full Planetary Health Framework
  {
    name: 'planetary-health-framework',
    category: 'planetary-health',
    fileNames: {
      en: 'Planetary-Health-Framework',
      sv: 'Planetary-Health-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'planetary-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'planetary-health')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Planetary Health Implementation Framework - Page ',
      sv: 'Planetär hälsa implementeringsramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'manifesto',
      'governance-structure',
      'technology-data-infrastructure',
      'financing-mechanisms',
      'medical-innovation-access',
      'pandemic-climate-preparedness',
      'community-centered-healthcare',
      'transparency-anti-corruption',
      'health-literacy',
      'borderless-health-rights',
      'ethical-technology-governance',
      'implementation-roadmap',
      'health-conflict-zones',
      'global-knowledge-commons',
      'visual-architecture-map',
      'cross-cutting-mechanisms',
      'spiritual-framing',
      'conclusion'
    ]
  },

  // Consciousness Framework

  // Main framework files
  {
    name: 'consciousness-accord-lite',
    category: 'consciousness',
    fileNames: {
      en: 'consciousness-accord-lite-en',
      sv: 'consciousness-accord-lite-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness')
    },
    pageFooter: {
      en: 'Consciousness Framework - Consciousness Accord Lite - Page ',
      sv: 'Medvetande Ramverk - Medvetande Accord Lite - Sida '
    }
  },
  {
    name: 'executive-core-overview',
    category: 'consciousness',
    fileNames: {
      en: 'executive-core-overview-en',
      sv: 'executive-core-overview-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness')
    },
    pageFooter: {
      en: 'Consciousness Framework - Executive Summary - Page ',
      sv: 'Medvetande Ramverk - Sammanfattning - Sida '
    }
  },

  // Core Governance Tools
  {
    name: 'global-wisdom-council-setup',
    category: 'consciousness',
    fileNames: {
      en: 'global-wisdom-council-setup-en',
      sv: 'global-wisdom-council-setup-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'core')
    },
    pageFooter: {
      en: 'Consciousness Framework - Global Wisdom Council Setup Guide - Page ',
      sv: 'Medvetande Ramverk - Uppsättningsguide för globalt vishetsråd - Sida '
    }
  },
  {
    name: 'regional-consciousness-hub-implementation',
    category: 'consciousness',
    fileNames: {
      en: 'regional-consciousness-hub-implementation-en',
      sv: 'regional-consciousness-hub-implementation-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'core')
    },
    pageFooter: {
      en: 'Consciousness Framework - Regional Consciousness Hub Implementation Guide - Page ',
      sv: 'Medvetande Ramverk - Implementeringsguide för regionalt medvetandecentrum - Sida '
    }
  },
  {
    name: 'policy-design-guide',
    category: 'consciousness',
    fileNames: {
      en: 'policy-design-guide-en',
      sv: 'policy-design-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'core')
    },
    pageFooter: {
      en: 'Consciousness Framework - Policy Design Guide - Page ',
      sv: 'Medvetande Ramverk - Guide för policydesign - Sida '
    }
  },
  {
    name: 'stakeholder-engagement-protocols',
    category: 'consciousness',
    fileNames: {
      en: 'stakeholder-engagement-protocols-en',
      sv: 'stakeholder-engagement-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'core')
    },
    pageFooter: {
      en: 'Consciousness Framework - Stakeholder Engagement Protocols - Page ',
      sv: 'Medvetande Ramverk - Protokoll för intressentengagemang - Sida '
    }
  },
  {
    name: 'youth-council-framework',
    category: 'consciousness',
    fileNames: {
      en: 'youth-council-framework-en',
      sv: 'youth-council-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'core')
    },
    pageFooter: {
      en: 'Consciousness Framework - Youth Council Framework - Page ',
      sv: 'Medvetande Ramverk - Ramverk för ungdomsråd - Sida '
    }
  },

  // Personal Transformation Tools
  {
    name: 'mindfulness-training-module',
    category: 'consciousness',
    fileNames: {
      en: 'mindfulness-training-module-en',
      sv: 'mindfulness-training-module-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'personal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'personal')
    },
    pageFooter: {
      en: 'Consciousness Framework - Mindfulness Training Module - Page ',
      sv: 'Medvetande Ramverk - Mindfulnessträningsmodul - Sida '
    }
  },
  {
    name: 'shadow-work-coaching-guide',
    category: 'consciousness',
    fileNames: {
      en: 'shadow-work-coaching-guide-en',
      sv: 'shadow-work-coaching-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'personal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'personal')
    },
    pageFooter: {
      en: 'Consciousness Framework - Shadow Work Coaching Guide - Page ',
      sv: 'Medvetande Ramverk - Guide för coachning i skuggarbete - Sida '
    }
  },
  {
    name: 'nonviolent-communication-toolkit',
    category: 'consciousness',
    fileNames: {
      en: 'nonviolent-communication-toolkit-en',
      sv: 'nonviolent-communication-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'personal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'personal')
    },
    pageFooter: {
      en: 'Consciousness Framework - Nonviolent Communication Toolkit - Page ',
      sv: 'Medvetande Ramverk - Verktygslåda för ickevåldsam kommunikation - Sida '
    }
  },
  {
    name: 'leadership-toolkit',
    category: 'consciousness',
    fileNames: {
      en: 'leadership-toolkit-en',
      sv: 'leadership-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'personal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'personal')
    },
    pageFooter: {
      en: 'Consciousness Framework - Leadership Toolkit - Page ',
      sv: 'Medvetande Ramverk - Verktygslåda för ledarskap - Sida '
    }
  },

  // Community Engagement Tools
  {
    name: 'community-dialogue-manual',
    category: 'consciousness',
    fileNames: {
      en: 'community-dialogue-manual-en',
      sv: 'community-dialogue-manual-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'community'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'community')
    },
    pageFooter: {
      en: 'Consciousness Framework - Community Dialogue Manual - Page ',
      sv: 'Medvetande Ramverk - Handbok för samhällsdialog - Sida '
    }
  },
  {
    name: 'cultural-sensitivity-protocols',
    category: 'consciousness',
    fileNames: {
      en: 'cultural-sensitivity-protocols-en',
      sv: 'cultural-sensitivity-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'community'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'community')
    },
    pageFooter: {
      en: 'Consciousness Framework - Cultural Sensitivity Protocols - Page ',
      sv: 'Medvetande Ramverk - Protokoll för kulturell känslighet - Sida '
    }
  },
  {
    name: 'consciousness-raising-circle-guide',
    category: 'consciousness',
    fileNames: {
      en: 'consciousness-raising-circle-guide-en',
      sv: 'consciousness-raising-circle-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'community'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'community')
    },
    pageFooter: {
      en: 'Consciousness Framework - Consciousness-Raising Circle Guide - Page ',
      sv: 'Medvetande Ramverk - Medvetandehöjande cirkelguide - Sida '
    }
  },

  // Digital Platform Tools
  {
    name: 'ai-sentiment-analysis-setup',
    category: 'consciousness',
    fileNames: {
      en: 'ai-sentiment-analysis-setup-en',
      sv: 'ai-sentiment-analysis-setup-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'digital')
    },
    pageFooter: {
      en: 'Consciousness Framework - AI Sentiment Analysis Setup Guide - Page ',
      sv: 'Medvetande Ramverk - Installationsguide för AI-sentimentanalys - Sida '
    }
  },
  {
    name: 'vr-wisdom-council-framework',
    category: 'consciousness',
    fileNames: {
      en: 'vr-wisdom-council-framework-en',
      sv: 'vr-wisdom-council-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'digital')
    },
    pageFooter: {
      en: 'Consciousness Framework - VR Wisdom Council Framework - Page ',
      sv: 'Medvetande Ramverk - VR Vishetsrådsramverk - Sida '
    }
  },
  {
    name: 'ai-bias-audit-framework',
    category: 'consciousness',
    fileNames: {
      en: 'ai-bias-audit-framework-en',
      sv: 'ai-bias-audit-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'digital')
    },
    pageFooter: {
      en: 'Consciousness Framework - AI Bias Audit Framework - Page ',
      sv: 'Medvetande Ramverk - Ramverk för granskning av AI-bias - Sida '
    }
  },
  {
    name: 'cybersecurity-framework-governance',
    category: 'consciousness',
    fileNames: {
      en: 'cybersecurity-framework-governance-en',
      sv: 'cybersecurity-framework-governance-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'digital'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'digital')
    },
    pageFooter: {
      en: 'Consciousness Framework - Cybersecurity Framework for Governance - Page ',
      sv: 'Medvetande Ramverk - Ramverk för cybersäkerhet för styrning - Sida '
    }
  },

  // Economic and Metrics Tools
  {
    name: 'conscious-budget-template',
    category: 'consciousness',
    fileNames: {
      en: 'conscious-budget-template-en',
      sv: 'conscious-budget-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'metrics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'metrics')
    },
    pageFooter: {
      en: 'Consciousness Framework - Conscious Budget Template - Page ',
      sv: 'Medvetande Ramverk - Medveten budgetmall - Sida '
    }
  },
  {
    name: 'vmeme-transition-toolkit',
    category: 'consciousness',
    fileNames: {
      en: 'vmeme-transition-toolkit-en',
      sv: 'vmeme-transition-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'metrics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'metrics')
    },
    pageFooter: {
      en: 'Consciousness Framework - vMeme Transition Toolkit - Page ',
      sv: 'Medvetande Ramverk - vMeme-övergångsverktyg - Sida '
    }
  },
  {
    name: 'leader-consciousness-index-guide',
    category: 'consciousness',
    fileNames: {
      en: 'leader-consciousness-index-guide-en',
      sv: 'leader-consciousness-index-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'metrics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'metrics')
    },
    pageFooter: {
      en: 'Consciousness Framework - Leader Consciousness Index Guide - Page ',
      sv: 'Medvetande Ramverk - Guide till index för ledarmedvetenhet - Sida '
    }
  },
  {
    name: 'intergenerational-justice-metrics-framework',
    category: 'consciousness',
    fileNames: {
      en: 'intergenerational-justice-metrics-framework-en',
      sv: 'intergenerational-justice-metrics-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'metrics'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'metrics')
    },
    pageFooter: {
      en: 'Consciousness Framework - Intergenerational Justice Metrics Framework - Page ',
      sv: 'Medvetande Ramverk - Ramverk för generationsöverskridande rättvisemetriker - Sida '
    }
  },

  // Pilots
  {
    name: 'conscious-governance-pilot-guides',
    category: 'consciousness',
    fileNames: {
      en: 'conscious-governance-pilot-guides-en',
      sv: 'conscious-governance-pilot-guides-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'pilots'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'pilots')
    },
    pageFooter: {
      en: 'Consciousness Framework - Conscious Governance Pilot Guides - Page ',
      sv: 'Medvetande Ramverk - Pilotguider för medveten styrning - Sida '
    }
  },

  // Crisis Response Tools
  {
    name: 'crisis-wisdom-team-protocols',
    category: 'consciousness',
    fileNames: {
      en: 'crisis-wisdom-team-protocols-en',
      sv: 'crisis-wisdom-team-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'crisis'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'crisis')
    },
    pageFooter: {
      en: 'Consciousness Framework - Crisis Wisdom Team Protocols - Page ',
      sv: 'Medvetande Ramverk - Protokoll för krisvisdomsteamet - Sida '
    }
  },
  {
    name: 'ethical-decision-template',
    category: 'consciousness',
    fileNames: {
      en: 'ethical-decision-template-en',
      sv: 'ethical-decision-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'crisis'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'crisis')
    },
    pageFooter: {
      en: 'Consciousness Framework - Ethical Decision Template - Page ',
      sv: 'Medvetande Ramverk - Etiskt beslutsmall - Sida '
    }
  },

  // Full Consciousness Framework
  {
    name: 'consciousness-framework',
    category: 'consciousness',
    fileNames: {
      en: 'Consciousness-Inner-Development-Framework',
      sv: 'Consciousness-Inner-Development-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Consciousness & Inner Development Implementation Framework - Page ',
      sv: 'Medvetande och inre utveckling implementeringsramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'manifesto',
      'governance-structure',
      'personal-transformation',
      'collective-consciousness',
      'systemic-integration',
      'spiral-dynamics',
      'economic-realignment',
      'community-engagement',
      'crisis-response',
      'metrics-accountability',
      'digital-platforms',
      'ethical-ai-governance',
      'cross-cultural-translation',
      'implementation-roadmap',
      'visual-architecture-map',
      'conclusion'
    ]
  },

  // Youth Leadership Hub
  {
    name: 'youth-governance-comic',
    category: 'youth',
    fileNames: {
      en: 'youth-governance-comic-en',
      sv: 'youth-governance-comic-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness')
    },
    pageFooter: {
      en: 'Youth Leadership - Comic - Page ',
      sv: 'Youth Leadership - Serie - Sida '
    }
  },
  {
    name: 'youth-community-action-guide',
    category: 'youth',
    fileNames: {
      en: 'youth-community-action-guide-en',
      sv: 'youth-community-action-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'youth'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'youth')
    },
    pageFooter: {
      en: 'Youth Leadership - Youth Community Action Guide - Page ',
      sv: 'Youth Leadership - Handledning för ungdomsaktiviteter i samhället - Sida '
    }
  },
  {
    name: 'youth-dialogue-circle-guide',
    category: 'youth',
    fileNames: {
      en: 'youth-dialogue-circle-guide-en',
      sv: 'youth-dialogue-circle-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'youth'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'youth')
    },
    pageFooter: {
      en: 'Youth Leadership - Youth Dialogue Circle Guide - Page ',
      sv: 'Youth Leadership - Guide för ungdomsdialogcirkel - Sida '
    }
  },
  {
    name: 'youth-mindfulness-guide',
    category: 'youth',
    fileNames: {
      en: 'youth-mindfulness-guide-en',
      sv: 'youth-mindfulness-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'consciousness', 'youth'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'consciousness', 'youth')
    },
    pageFooter: {
      en: 'Youth Leadership - Mindfulness for Young Leaders - Page ',
      sv: 'Youth Leadership - Mindfulness för unga ledare - Sida '
    }
  },

  // Aging Population Support Framework
  // Core Framework Documents
  {
    name: 'executive-summary',
    category: 'aging',
    fileNames: {
      en: 'executive-summary-en',
      sv: 'executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging')
    },
    pageFooter: {
      en: 'Aging Population Support Framework - Executive Summary - Page ',
      sv: 'Åldrande Befolkningsstöd Ramverk - Sammanfattning - Sida '
    }
  },

  {
    name: 'aging-framework-essentials',
    category: 'aging',
    fileNames: {
      en: 'aging-framework-essentials-en',
      sv: 'aging-framework-essentials-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging')
    },
    pageFooter: {
      en: 'Aging Population Support Framework - Essentials Guide - Page ',
      sv: 'Åldrande Befolkningsstöd Ramverk - Grundläggande Guide - Sida '
    }
  },

  // Core Implementation Tools
  {
    name: 'elder-readiness-assessment',
    category: 'aging',
    fileNames: {
      en: 'elder-readiness-assessment-en',
      sv: 'elder-readiness-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'core')
    },
    pageFooter: {
      en: 'Elder Community Readiness Assessment - Page ',
      sv: 'Äldre Samhälle Beredskapsanalys - Sida '
    }
  },

  {
    name: 'aubi-pilot-template',
    category: 'aging',
    fileNames: {
      en: 'aubi-pilot-template-en',
      sv: 'aubi-pilot-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'core')
    },
    pageFooter: {
      en: 'AUBI Pilot Design Template - Page ',
      sv: 'AUBI Pilot Design Mall - Sida '
    }
  },

  {
    name: 'elder-political-organizing-toolkit',
    category: 'aging',
    fileNames: {
      en: 'elder-political-organizing-toolkit-en',
      sv: 'elder-political-organizing-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'core')
    },
    pageFooter: {
      en: 'Elder Political Organizing Toolkit - Page ',
      sv: 'Äldre Politisk Organisering Verktygslåda - Sida '
    }
  },

  {
    name: 'technology-governance-charter',
    category: 'aging',
    fileNames: {
      en: 'technology-governance-charter-en',
      sv: 'technology-governance-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'core')
    },
    pageFooter: {
      en: 'Technology Governance Charter Template - Page ',
      sv: 'Teknikstyrning Charter Mall - Sida '
    }
  },

  {
    name: 'elder-wellbeing-index-calculator',
    category: 'aging',
    fileNames: {
      en: 'elder-wellbeing-index-calculator-en',
      sv: 'elder-wellbeing-index-calculator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'core')
    },
    pageFooter: {
      en: 'Elder Wellbeing Index Calculator - Page ',
      sv: 'Äldre Välbefinnande Index Kalkylator - Sida '
    }
  },

  {
    name: 'climate-wisdom-documentation-kit',
    category: 'aging',
    fileNames: {
      en: 'climate-wisdom-documentation-kit-en',
      sv: 'climate-wisdom-documentation-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'core')
    },
    pageFooter: {
      en: 'Climate Wisdom Documentation Kit - Page ',
      sv: 'Klimatvisdom Dokumentationskit - Sida '
    }
  },

  // Advocacy and Scaling Tools
  {
    name: 'ageism-interruption-training-guide',
    category: 'aging',
    fileNames: {
      en: 'ageism-interruption-training-guide-en',
      sv: 'ageism-interruption-training-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'advocacy')
    },
    pageFooter: {
      en: 'Ageism Interruption Training Guide - Page ',
      sv: 'Åldersdiskriminering Avbrott Träningsguide - Sida '
    }
  },

  {
    name: 'aging-rights-charter',
    category: 'aging',
    fileNames: {
      en: 'aging-rights-charter-en',
      sv: 'aging-rights-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'advocacy')
    },
    pageFooter: {
      en: 'Rights of Aging Beings Charter Template - Page ',
      sv: 'Rättigheter för Åldrande Varelser Charter Mall - Sida '
    }
  },

  {
    name: 'elder-economic-zone-toolkit',
    category: 'aging',
    fileNames: {
      en: 'elder-economic-zone-toolkit-en',
      sv: 'elder-economic-zone-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'advocacy')
    },
    pageFooter: {
      en: 'Elder Economic Zone Planning Toolkit - Page ',
      sv: 'Äldre Ekonomisk Zon Planeringsverktygslåda - Sida '
    }
  },

  {
    name: 'aubi-economic-modeling-tool',
    category: 'aging',
    fileNames: {
      en: 'aubi-economic-modeling-tool-en',
      sv: 'aubi-economic-modeling-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'advocacy')
    },
    pageFooter: {
      en: 'AUBI Economic Modeling Tool - Page ',
      sv: 'AUBI Ekonomisk Modelleringsverktyg - Sida '
    }
  },

  // Elder Agency and Innovation Tools
  {
    name: 'mutual-care-network-setup-guide',
    category: 'aging',
    fileNames: {
      en: 'mutual-care-network-setup-guide-en',
      sv: 'mutual-care-network-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'agency-and-innovation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'agency-and-innovation')
    },
    pageFooter: {
      en: 'Mutual Care Network Setup Guide - Page ',
      sv: 'Ömsesidig Vård Nätverk Inställningsguide - Sida '
    }
  },

  {
    name: 'elder-innovation-hub-playbook',
    category: 'aging',
    fileNames: {
      en: 'elder-innovation-hub-playbook-en',
      sv: 'elder-innovation-hub-playbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'agency-and-innovation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'agency-and-innovation')
    },
    pageFooter: {
      en: 'Elder Innovation Hub Playbook - Page ',
      sv: 'Äldre Innovation Hub Spelbok - Sida '
    }
  },

  {
    name: 'intergenerational-program-templates',
    category: 'aging',
    fileNames: {
      en: 'intergenerational-program-templates-en',
      sv: 'intergenerational-program-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging', 'agency-and-innovation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging', 'agency-and-innovation')
    },
    pageFooter: {
      en: 'Intergenerational Program Templates - Page ',
      sv: 'Intergenerationella Programmallar - Sida '
    }
  },

  // Full Aging Framework
  {
    name: 'aging-framework',
    category: 'aging',
    fileNames: {
      en: 'Aging-Population-Support-Framework',
      sv: 'Aging-Population-Support-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'aging'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'aging')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Aging Population Support Framework - Page ',
      sv: 'Åldrande befolkningsstödsramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'preamble',
      'economic-security',
      'meaningful-occupation',
      'healthcare-climate',
      'social-inclusion',
      'nested-governance',
      'legal-ethical',
      'implementation-roadmap',
      'monitoring-adaptive',
      'call-to-action',
      'appendices'
    ]
  },

  // Animal Welfare Framework
  // Core Framework Documents
  {
    name: 'global-guardian-framework-essentials',
    category: 'animal-welfare',
    fileNames: {
      en: 'global-guardian-framework-essentials-en',
      sv: 'global-guardian-framework-essentials-sv',
      es: 'global-guardian-framework-essentials-es',
      fr: 'global-guardian-framework-essentials-fr'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare'),
      es: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'es', 'implementation', 'animal-welfare'),
      fr: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'fr', 'implementation', 'animal-welfare')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Global Guardian Framework Essentials - Page ',
      sv: 'Djurskyddsramverk - Globalt skyddsramverk, grundprinciper - Sida ',
      es: 'Marco de Bienestar Animal - Marco de Protección Global, Principios Básicos - Página ',
      fr: 'Cadre de protection des animaux - Cadre mondial de protection, Principes fondamentaux - Page ',
    }
  },
  {
    name: 'executive-summary',
    category: 'animal-welfare',
    fileNames: {
      en: 'executive-summary-en',
      sv: 'executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Executive Summary - Page ',
      sv: 'Djurskyddsramverk - Sammanfattning - Sida '
    }
  },

  // Core Implementation Tools
  {
    name: 'community-welfare-readiness-assessment',
    category: 'animal-welfare',
    fileNames: {
      en: 'community-welfare-readiness-assessment-en',
      sv: 'community-welfare-readiness-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'core')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Community Welfare Readiness Assessment - Page ',
      sv: 'Djurskyddsramverk - Samhällsberedskap för djurvälfärd - Sida '
    }
  },

  {
    name: 'cultural-adaptation-protocol-guide',
    category: 'animal-welfare',
    fileNames: {
      en: 'cultural-adaptation-protocol-guide-en',
      sv: 'cultural-adaptation-protocol-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'core')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Cultural Adaptation Protocol Guide - Page ',
      sv: 'Djurskyddsramverk - Kulturell anpassningsprotokoll - Sida '
    }
  },

  {
    name: 'indigenous-rights-integration-kit',
    category: 'animal-welfare',
    fileNames: {
      en: 'indigenous-rights-integration-kit-en',
      sv: 'indigenous-rights-integration-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'core')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Indigenous Rights Integration Kit - Page ',
      sv: 'Djurskyddsramverk - Ursprungsbefolkningens rättighetsintegration - Sida '
    }
  },

  {
    name: 'sentience-assessment-framework',
    category: 'animal-welfare',
    fileNames: {
      en: 'sentience-assessment-framework-en',
      sv: 'sentience-assessment-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'core')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Sentience Assessment Framework - Page ',
      sv: 'Djurskyddsramverk - Ramverk för bedömning av medvetenhet - Sida '
    }
  },

  {
    name: 'welfare-compliance-audit-tool',
    category: 'animal-welfare',
    fileNames: {
      en: 'welfare-compliance-audit-tool-en',
      sv: 'welfare-compliance-audit-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'core')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Welfare Compliance Audit Tool - Page ',
      sv: 'Djurskyddsramverk - Verktyg för välfärdsrevisioner - Sida '
    }
  },

  {
    name: 'welfare-transition-planning-template',
    category: 'animal-welfare',
    fileNames: {
      en: 'welfare-transition-planning-template-en',
      sv: 'welfare-transition-planning-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'core')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Welfare Transition Planning Template - Page ',
      sv: 'Djurskyddsramverk - Mall för övergångsplanering - Sida '
    }
  },

  // Advocacy and Policy Tools
  {
    name: 'anti-speciesism-training-materials',
    category: 'animal-welfare',
    fileNames: {
      en: 'anti-speciesism-training-materials-en',
      sv: 'anti-speciesism-training-materials-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'advocacy')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Anti-Speciesism Training Materials - Page ',
      sv: 'Djurskyddsramverk - Utbildningsmaterial mot artdiskriminering - Sida '
    }
  },

  {
    name: 'economic-impact-assessment',
    category: 'animal-welfare',
    fileNames: {
      en: 'economic-impact-assessment-en',
      sv: 'economic-impact-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'advocacy')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Economic Impact Assessment - Page ',
      sv: 'Djurskyddsramverk - Ekonomisk konsekvensanalys - Sida '
    }
  },

  {
    name: 'guardian-rights-charter-template',
    category: 'animal-welfare',
    fileNames: {
      en: 'guardian-rights-charter-template-en',
      sv: 'guardian-rights-charter-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'advocacy')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Guardian Rights Charter Template - Page ',
      sv: 'Djurskyddsramverk - Mall för skyddsrättighetsstadga - Sida '
    }
  },

  {
    name: 'stakeholder-engagement-framework',
    category: 'animal-welfare',
    fileNames: {
      en: 'stakeholder-engagement-framework-en',
      sv: 'stakeholder-engagement-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'advocacy')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Stakeholder Engagement Framework - Page ',
      sv: 'Djurskyddsramverk - Ramverk för intressentengagemang - Sida '
    }
  },

  {
    name: 'welfare-policy-development-guide',
    category: 'animal-welfare',
    fileNames: {
      en: 'welfare-policy-development-guide-en',
      sv: 'welfare-policy-development-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'advocacy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'advocacy')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Welfare Policy Development Guide - Page ',
      sv: 'Djurskyddsramverk - Guide för utveckling av välfärdspolitik - Sida '
    }
  },

  // Evaluation and Monitoring Tools
  {
    name: 'community-progress-tracking-templates',
    category: 'animal-welfare',
    fileNames: {
      en: 'community-progress-tracking-templates-en',
      sv: 'community-progress-tracking-templates-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'evaluation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'evaluation')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Community Progress Tracking Templates - Page ',
      sv: 'Djurskyddsramverk - Mallar för samhällsframstegsspårning - Sida '
    }
  },

  {
    name: 'transparency-dashboard-setup-guide',
    category: 'animal-welfare',
    fileNames: {
      en: 'transparency-dashboard-setup-guide-en',
      sv: 'transparency-dashboard-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'evaluation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'evaluation')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Transparency Dashboard Setup Guide - Page ',
      sv: 'Djurskyddsramverk - Guide för transparensplattform - Sida '
    }
  },

  {
    name: 'welfare-impact-measurement-framework',
    category: 'animal-welfare',
    fileNames: {
      en: 'welfare-impact-measurement-framework-en',
      sv: 'welfare-impact-measurement-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'evaluation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'evaluation')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Welfare Impact Measurement Framework - Page ',
      sv: 'Djurskyddsramverk - Ramverk för välfärdsmätning - Sida '
    }
  },

  // Innovation and Technology Tools
  {
    name: 'alternative-protein-development-guide',
    category: 'animal-welfare',
    fileNames: {
      en: 'alternative-protein-development-guide-en',
      sv: 'alternative-protein-development-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'innovation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'innovation')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Alternative Protein Development Guide - Page ',
      sv: 'Djurskyddsramverk - Guide för alternativ proteinutveckling - Sida '
    }
  },

  {
    name: 'blockchain-certification-setup-guide',
    category: 'animal-welfare',
    fileNames: {
      en: 'blockchain-certification-setup-guide-en',
      sv: 'blockchain-certification-setup-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'innovation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'innovation')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Blockchain Certification Setup Guide - Page ',
      sv: 'Djurskyddsramverk - Guide för blockchain-certifiering - Sida '
    }
  },

  {
    name: 'citizen-science-monitoring-app',
    category: 'animal-welfare',
    fileNames: {
      en: 'citizen-science-monitoring-app-en',
      sv: 'citizen-science-monitoring-app-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'innovation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'innovation')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Citizen Science Monitoring App - Page ',
      sv: 'Djurskyddsramverk - Medborgarvetenskapsapp för övervakning - Sida '
    }
  },

  {
    name: 'welfare-technology-assessment-kit',
    category: 'animal-welfare',
    fileNames: {
      en: 'welfare-technology-assessment-kit-en',
      sv: 'welfare-technology-assessment-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'innovation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'innovation')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Welfare Technology Assessment Kit - Page ',
      sv: 'Djurskyddsramverk - Bedömningskit för välfärdsteknologi - Sida '
    }
  },

  // Transition and Economic Tools
  {
    name: 'animal-welfare-carbon-credits-guide',
    category: 'animal-welfare',
    fileNames: {
      en: 'animal-welfare-carbon-credits-guide-en',
      sv: 'animal-welfare-carbon-credits-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'transition'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'transition')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Animal Welfare Carbon Credits Guide - Page ',
      sv: 'Djurskyddsramverk - Guide för kolkrediter och djurvälfärd - Sida '
    }
  },

  {
    name: 'cooperative-development-toolkit',
    category: 'animal-welfare',
    fileNames: {
      en: 'cooperative-development-toolkit-en',
      sv: 'cooperative-development-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'transition'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'transition')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Cooperative Development Toolkit - Page ',
      sv: 'Djurskyddsramverk - Verktygslåda för kooperativ utveckling - Sida '
    }
  },

  {
    name: 'innovation-challenge-fund-kit',
    category: 'animal-welfare',
    fileNames: {
      en: 'innovation-challenge-fund-kit-en',
      sv: 'innovation-challenge-fund-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'transition'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'transition')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Innovation Challenge Fund Kit - Page ',
      sv: 'Djurskyddsramverk - Kit för innovationsutmaningsfond - Sida '
    }
  },

  {
    name: 'just-transition-planning-workbook',
    category: 'animal-welfare',
    fileNames: {
      en: 'just-transition-planning-workbook-en',
      sv: 'just-transition-planning-workbook-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare', 'transition'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare', 'transition')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Just Transition Planning Workbook - Page ',
      sv: 'Djurskyddsramverk - Arbetsbok för rättvis övergång - Sida '
    }
  },

  // Full Animal Welfare Framework
  {
    name: 'animal-welfare-framework',
    category: 'animal-welfare',
    fileNames: {
      en: 'Animal-Welfare-Framework',
      sv: 'Animal-Welfare-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'animal-welfare'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'animal-welfare')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Animal Welfare Framework - Page ',
      sv: 'Djurskyddsramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'introduction',
      'core-principles',
      'structural-components',
      'implementation-approaches',
      'metrics-evaluation',
      'cultural-justice',
      'environmental-integration',
      'appendices'
    ]
  },

  // Water & Sanitation Framework
  // Executive Materials
  {
    name: 'executive-summary',
    category: 'water',
    fileNames: {
      en: 'executive-summary-en',
      sv: 'executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Executive Summary - Page ',
      sv: 'Vatten och sanitetsramverk - Sammanfattning - Sida '
    }
  },

  {
    name: 'quick-implementation-guide',
    category: 'water',
    fileNames: {
      en: 'quick-implementation-guide-en',
      sv: 'quick-implementation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Quick Implementation Guide - Page ',
      sv: 'Vatten och sanitetsramverk - Snabb implementeringsguide - Sida '
    }
  },

  {
    name: 'youth-leadership-guide',
    category: 'water',
    fileNames: {
      en: 'youth-leadership-guide-en',
      sv: 'youth-leadership-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Youth Leadership Guide - Page ',
      sv: 'Vatten och sanitetsramverk - Ungdomsledarskapguide - Sida '
    }
  },

  // Core Governance Tools
  {
    name: 'community-water-assembly-guide',
    category: 'water',
    fileNames: {
      en: 'community-water-assembly-guide-en',
      sv: 'community-water-assembly-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'core')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Community Water Assembly Guide - Page ',
      sv: 'Vatten och sanitetsramverk - Guide för kommunala vattenförsamlingar - Sida '
    }
  },

  {
    name: 'power-analysis-toolkit',
    category: 'water',
    fileNames: {
      en: 'power-analysis-toolkit-en',
      sv: 'power-analysis-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'core')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Power Analysis Toolkit - Page ',
      sv: 'Vatten och sanitetsramverk - Maktanalysverktyg - Sida '
    }
  },

  {
    name: 'wash-constitutional-amendment-toolkit',
    category: 'water',
    fileNames: {
      en: 'wash-constitutional-amendment-toolkit-en',
      sv: 'wash-constitutional-amendment-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'core')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Constitutional Amendment Toolkit - Page ',
      sv: 'Vatten och sanitetsramverk - Grundlagsändring verktyg - Sida '
    }
  },

  {
    name: 'water-rights-legal-template',
    category: 'water',
    fileNames: {
      en: 'water-rights-legal-template-en',
      sv: 'water-rights-legal-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'core')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Water Rights Legal Template - Page ',
      sv: 'Vatten och sanitetsramverk - Vattenrättslig mall - Sida '
    }
  },

  // Financial Planning Tools
  {
    name: 'carbon-water-credit-calculator',
    category: 'water',
    fileNames: {
      en: 'carbon-water-credit-calculator-en',
      sv: 'carbon-water-credit-calculator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'financial'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'financial')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Carbon-Water Credit Calculator - Page ',
      sv: 'Vatten och sanitetsramverk - Kalkylator för kolvatten-krediter - Sida '
    }
  },

  {
    name: 'circular-finance-planning-tool',
    category: 'water',
    fileNames: {
      en: 'circular-finance-planning-tool-en',
      sv: 'circular-finance-planning-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'financial'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'financial')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Circular Finance Planning Tool - Page ',
      sv: 'Vatten och sanitetsramverk - Cirkulär finansplaneringsverktyg - Sida '
    }
  },

  {
    name: 'community-equity-model-template',
    category: 'water',
    fileNames: {
      en: 'community-equity-model-template-en',
      sv: 'community-equity-model-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'financial'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'financial')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Community Equity Model Template - Page ',
      sv: 'Vatten och sanitetsramverk - Mall för samhällelig rättvisemodell - Sida '
    }
  },

  {
    name: 'wash-sovereign-wealth-fund-model',
    category: 'water',
    fileNames: {
      en: 'wash-sovereign-wealth-fund-model-en',
      sv: 'wash-sovereign-wealth-fund-model-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'financial'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'financial')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - WASH Sovereign Wealth Fund Model - Page ',
      sv: 'Vatten och sanitetsramverk - WASH statsfondmodell - Sida '
    }
  },

  // Monitoring & Evaluation Tools
  {
    name: 'community-monitoring-toolkit',
    category: 'water',
    fileNames: {
      en: 'community-monitoring-toolkit-en',
      sv: 'community-monitoring-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'monitoring')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Community Monitoring Toolkit - Page ',
      sv: 'Vatten och sanitetsramverk - Verktyg för samhällsövervakning - Sida '
    }
  },

  {
    name: 'hydrological-justice-assessment',
    category: 'water',
    fileNames: {
      en: 'hydrological-justice-assessment-en',
      sv: 'hydrological-justice-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'monitoring')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Hydrological Justice Assessment - Page ',
      sv: 'Vatten och sanitetsramverk - Hydrologisk rättvisa bedömning - Sida '
    }
  },

  {
    name: 'performance-dashboard-template',
    category: 'water',
    fileNames: {
      en: 'performance-dashboard-template-en',
      sv: 'performance-dashboard-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'monitoring'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'monitoring')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Performance Dashboard Template - Page ',
      sv: 'Vatten och sanitetsramverk - Mall för prestationsinstrumentpanel - Sida '
    }
  },

  // Technology & Innovation Tools
  {
    name: 'ai-bias-audit-framework',
    category: 'water',
    fileNames: {
      en: 'ai-bias-audit-framework-en',
      sv: 'ai-bias-audit-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'technology')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - AI Bias Audit Framework - Page ',
      sv: 'Vatten och sanitetsramverk - AI bias granskningsramverk - Sida '
    }
  },

  {
    name: 'microgrid-planning-toolkit',
    category: 'water',
    fileNames: {
      en: 'microgrid-planning-toolkit-en',
      sv: 'microgrid-planning-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'technology')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Microgrid Planning Toolkit - Page ',
      sv: 'Vatten och sanitetsramverk - Mikronät planeringsverktyg - Sida '
    }
  },

  {
    name: 'open-source-wash-tech-library',
    category: 'water',
    fileNames: {
      en: 'open-source-wash-tech-library-en',
      sv: 'open-source-wash-tech-library-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'technology')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Open Source WASH Tech Library - Page ',
      sv: 'Vatten och sanitetsramverk - Öppen källkod WASH teknikbibliotek - Sida '
    }
  },

  {
    name: 'traditional-knowledge-protection',
    category: 'water',
    fileNames: {
      en: 'traditional-knowledge-protection-en',
      sv: 'traditional-knowledge-protection-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'technology')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Traditional Knowledge Protection - Page ',
      sv: 'Vatten och sanitetsramverk - Traditionell kunskapsskydd - Sida '
    }
  },

  // Crisis Response Tools
  {
    name: 'climate-adaptation-planning-tool',
    category: 'water',
    fileNames: {
      en: 'climate-adaptation-planning-tool-en',
      sv: 'climate-adaptation-planning-tool-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'crisis'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'crisis')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Climate Adaptation Planning Tool - Page ',
      sv: 'Vatten och sanitetsramverk - Klimatanpassning planeringsverktyg - Sida '
    }
  },

  {
    name: 'conflict-sensitive-wash-guidelines',
    category: 'water',
    fileNames: {
      en: 'conflict-sensitive-wash-guidelines-en',
      sv: 'conflict-sensitive-wash-guidelines-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'crisis'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'crisis')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Conflict-Sensitive WASH Guidelines - Page ',
      sv: 'Vatten och sanitetsramverk - Konfliktkänsliga WASH riktlinjer - Sida '
    }
  },

  {
    name: 'emergency-wash-response-protocols',
    category: 'water',
    fileNames: {
      en: 'emergency-wash-response-protocols-en',
      sv: 'emergency-wash-response-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water', 'crisis'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water', 'crisis')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Emergency WASH Response Protocols - Page ',
      sv: 'Vatten och sanitetsramverk - Nödläge WASH responsprotokoll - Sida '
    }
  },

  // Full Water and Sanitation Framework
  {
    name: 'water-framework',
    category: 'water',
    fileNames: {
      en: 'Water-&-Sanitation-Framework',
      sv: 'Water-&-Sanitation-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'water'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'water')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Water & Sanitation Framework - Page ',
      sv: 'Vatten och sanitetsramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'theory-of-change',
      'guiding-principles',
      'institutional-policy-framework',
      'financing-investment',
      'service-delivery-infrastructure',
      'monitoring-accountability',
      'climate-environmental-integration',
      'innovation-knowledge-sharing',
      'crisis-response-adaptation',
      'social-behavioral-change',
      'global-partnerships',
      'ethical-systems-framing',
      'implementation-roadmap',
      'regional-implementation-blueprints',
      'visual-accessibility-aids',
      'glossary'
    ]
  },

  // Indigenous & Traditional Knowledge Framework
  
  // Executive Materials
  {
    name: 'indigenous-framework-essentials',
    category: 'indigenous',
    fileNames: {
      en: 'indigenous-framework-essentials-en',
      sv: 'indigenous-framework-essentials-sv',
      fr: 'indigenous-framework-essentials-fr',
      es: 'indigenous-framework-essentials-es'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous'),
      fr: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'fr', 'implementation', 'indigenous'),
      es: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'es', 'implementation', 'indigenous')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Framework Essentials - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Ramverkets grunder - Sida ',
      fr: 'Cadre des connaissances autochtones et traditionnelles - Éléments essentiels du cadre - Page ',
      es: 'Marco de conocimientos indígenas y tradicionales: elementos esenciales del marco - Página '

    }
  },

  // Core Governance Tools
  {
    name: 'baz-readiness-assessment',
    category: 'indigenous',
    fileNames: {
      en: 'baz-readiness-assessment-en',
      sv: 'baz-readiness-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'core')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - BAZ Readiness Assessment - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - BAZ-beredskapsanalys - Sida '
    }
  },

  {
    name: 'earth-council-formation-guide',
    category: 'indigenous',
    fileNames: {
      en: 'earth-council-formation-guide-en',
      sv: 'earth-council-formation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'core')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Earth Council Formation Guide - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Jordrådsformationsguide - Sida '
    }
  },

  {
    name: 'indigenous-data-sovereignty-framework',
    category: 'indigenous',
    fileNames: {
      en: 'indigenous-data-sovereignty-framework-en',
      sv: 'indigenous-data-sovereignty-framework-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'core')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Data Sovereignty Framework - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Datasuveränitetsramverk - Sida '
    }
  },

  {
    name: 'municipal-indigenous-agreement',
    category: 'indigenous',
    fileNames: {
      en: 'municipal-indigenous-agreement-en',
      sv: 'municipal-indigenous-agreement-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'core')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Municipal-Indigenous Agreement - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Kommunal-ursprungsfolksavtal - Sida '
    }
  },

  {
    name: 'tek-documentation-kit',
    category: 'indigenous',
    fileNames: {
      en: 'tek-documentation-kit-en',
      sv: 'tek-documentation-kit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'core'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'core')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - TEK Documentation Kit - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - TEK-dokumentationskit - Sida '
    }
  },

  // Cultural and Leadership Tools
  {
    name: 'ceremonial-governance-integration-guide',
    category: 'indigenous',
    fileNames: {
      en: 'ceremonial-governance-integration-guide-en',
      sv: 'ceremonial-governance-integration-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'cultural-and-leadership'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'cultural-and-leadership')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Ceremonial Governance Integration - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Ceremoniell styrningsintegration - Sida '
    }
  },

  {
    name: 'cultural-integrity-replication-protocol',
    category: 'indigenous',
    fileNames: {
      en: 'cultural-integrity-replication-protocol-en',
      sv: 'cultural-integrity-replication-protocol-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'cultural-and-leadership'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'cultural-and-leadership')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Cultural Integrity Protocol - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Kulturell integritetsprotokoll - Sida '
    }
  },

  {
    name: 'indigenous-leadership-development-program',
    category: 'indigenous',
    fileNames: {
      en: 'indigenous-leadership-development-program-en',
      sv: 'indigenous-leadership-development-program-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'cultural-and-leadership'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'cultural-and-leadership')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Leadership Development Program - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Ledarutvecklingsprogram - Sida '
    }
  },

  {
    name: 'storytelling-media-strategy-toolkit',
    category: 'indigenous',
    fileNames: {
      en: 'storytelling-media-strategy-toolkit-en',
      sv: 'storytelling-media-strategy-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'cultural-and-leadership'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'cultural-and-leadership')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Storytelling & Media Strategy - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Berättande och mediestrategi - Sida '
    }
  },

  // Economic and Legal Tools
  {
    name: 'gph-index-calculator',
    category: 'indigenous',
    fileNames: {
      en: 'gph-index-calculator-en',
      sv: 'gph-index-calculator-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'economic-and-legal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'economic-and-legal')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - GPH Index Calculator - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - GPH-indexkalkylator - Sida '
    }
  },

  {
    name: 'land-rematriation-template',
    category: 'indigenous',
    fileNames: {
      en: 'land-rematriation-template-en',
      sv: 'land-rematriation-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'economic-and-legal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'economic-and-legal')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Land Rematriation Template - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Mall för jordåterlämnande - Sida '
    }
  },

  {
    name: 'legal-strategy-guide',
    category: 'indigenous',
    fileNames: {
      en: 'legal-strategy-guide-en',
      sv: 'legal-strategy-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'economic-and-legal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'economic-and-legal')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Legal Strategy Guide - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Juridisk strategiguide - Sida '
    }
  },

  {
    name: 'reparations-toolkit',
    category: 'indigenous',
    fileNames: {
      en: 'reparations-toolkit-en',
      sv: 'reparations-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'economic-and-legal'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'economic-and-legal')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Reparations Toolkit - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Skadeståndstoolkit - Sida '
    }
  },

  // Technology Tools
  {
    name: 'ai-governance-protocols',
    category: 'indigenous',
    fileNames: {
      en: 'ai-governance-protocols-en',
      sv: 'ai-governance-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'technology')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - AI Governance Protocols - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - AI-styrningsprotokoll - Sida '
    }
  },

  {
    name: 'cybersecurity-quantum-guide',
    category: 'indigenous',
    fileNames: {
      en: 'cybersecurity-quantum-guide-en',
      sv: 'cybersecurity-quantum-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous', 'technology'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous', 'technology')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Cybersecurity & Quantum Guide - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Cybersäkerhet och kvantguide - Sida '
    }
  },

  // Full Indigenous & Traditional Knowledge Framework
  {
    name: 'indigenous-framework',
    category: 'indigenous',
    fileNames: {
      en: 'Indigenous-&-Traditional-Knowledge-Framework',
      sv: 'Indigenous-&-Traditional-Knowledge-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'indigenous'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'indigenous')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Indigenous & Traditional Knowledge Framework - Page ',
      sv: 'Ramverk för ursprungsfolk och traditionell kunskap - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'preamble',
      'core-principles',
      'structural-components',
      'implementation-timeline',
      'key-mechanisms',
      'expected-outcomes',
      'interface-existing-systems',
      'pathways-broader-engagement',
      'documentation-risk-assessment',
      'system-map-visual',
      'glossary-references'
    ]
  },

  // Mental Health Framework
  // Core Guides
  {
    name: 'mental-health-framework-essentials',
    category: 'mental-health',
    fileNames: {
      en: 'mental-health-framework-essentials-en',
      sv: 'mental-health-framework-essentials-sv',
      es: 'mental-health-framework-essentials-es',
      fr: 'mental-health-framework-essentials-fr',
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health'),
      es: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'es', 'implementation', 'mental-health'),
      fr: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'fr', 'implementation', 'mental-health')
    },
    pageFooter: {
      en: 'Mental Health Framework - Guide - Page ',
      sv: 'Psykisk hälsoramverk - Guide - Sida ',
      fr: 'Cadre de santé mentale - Guide - Page ',
      es: 'Marco de Salud Mental - Guía - Página '
    }
  },

  {
    name: 'executive-summary',
    category: 'mental-health',
    fileNames: {
      en: 'executive-summary-en',
      sv: 'executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health')
    },
    pageFooter: {
      en: 'Mental Health Framework - Executive Summary - Page ',
      sv: 'Psykisk hälsoramverk - Sammanfattning - Sida '
    }
  },

  // Quick Start Implementation Tools
  {
    name: 'path-to-compliance-checklist',
    category: 'mental-health',
    fileNames: {
      en: 'path-to-compliance-checklist-en',
      sv: 'path-to-compliance-checklist-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'quick-start'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'quick-start')
    },
    pageFooter: {
      en: 'Mental Health Framework - Quick Start Tool - Page ',
      sv: 'Psykisk hälsoramverk - Snabbstartsverktyg - Sida '
    }
  },

  {
    name: 'community-task-force-guide',
    category: 'mental-health',
    fileNames: {
      en: 'community-task-force-guide-en',
      sv: 'community-task-force-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'quick-start'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'quick-start')
    },
    pageFooter: {
      en: 'Mental Health Framework - Community Guide - Page ',
      sv: 'Psykisk hälsoramverk - Gemenskapsguide - Sida '
    }
  },

  {
    name: 'cultural-adaptation-toolkit',
    category: 'mental-health',
    fileNames: {
      en: 'cultural-adaptation-toolkit-en',
      sv: 'cultural-adaptation-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'quick-start'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'quick-start')
    },
    pageFooter: {
      en: 'Mental Health Framework - Cultural Toolkit - Page ',
      sv: 'Psykisk hälsoramverk - Kulturell verktygslåda - Sida '
    }
  },

  {
    name: 'watchdog-implementation-manual',
    category: 'mental-health',
    fileNames: {
      en: 'watchdog-implementation-manual-en',
      sv: 'watchdog-implementation-manual-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'quick-start'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'quick-start')
    },
    pageFooter: {
      en: 'Mental Health Framework - Watchdog Manual - Page ',
      sv: 'Psykisk hälsoramverk - Övervakningsmanual - Sida '
    }
  },

  {
    name: 'traffic-light-assessment',
    category: 'mental-health',
    fileNames: {
      en: 'traffic-light-assessment-en',
      sv: 'traffic-light-assessment-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'quick-start'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'quick-start')
    },
    pageFooter: {
      en: 'Mental Health Framework - Assessment Tool - Page ',
      sv: 'Psykisk hälsoramverk - Bedömningsverktyg - Sida '
    }
  },

  // Governance & Policy Tools
  {
    name: 'national-commission-guide',
    category: 'mental-health',
    fileNames: {
      en: 'national-commission-guide-en',
      sv: 'national-commission-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'governance-and-policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'governance-and-policy')
    },
    pageFooter: {
      en: 'Mental Health Framework - Governance Guide - Page ',
      sv: 'Psykisk hälsoramverk - Styrningsguide - Sida '
    }
  },

  {
    name: 'rights-based-legislation-template',
    category: 'mental-health',
    fileNames: {
      en: 'rights-based-legislation-template-en',
      sv: 'rights-based-legislation-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'governance-and-policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'governance-and-policy')
    },
    pageFooter: {
      en: 'Mental Health Framework - Legal Template - Page ',
      sv: 'Psykisk hälsoramverk - Juridisk mall - Sida '
    }
  },

  {
    name: 'international-treaty-roadmap',
    category: 'mental-health',
    fileNames: {
      en: 'international-treaty-roadmap-en',
      sv: 'international-treaty-roadmap-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'governance-and-policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'governance-and-policy')
    },
    pageFooter: {
      en: 'Mental Health Framework - Treaty Guide - Page ',
      sv: 'Psykisk hälsoramverk - Fördragsguide - Sida '
    }
  },

  {
    name: 'youth-parliament-charter',
    category: 'mental-health',
    fileNames: {
      en: 'youth-parliament-charter-en',
      sv: 'youth-parliament-charter-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'governance-and-policy'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'governance-and-policy')
    },
    pageFooter: {
      en: 'Mental Health Framework - Youth Charter - Page ',
      sv: 'Psykisk hälsoramverk - Ungdomscharter - Sida '
    }
  },

  // Clinical & Service Tools
  {
    name: 'spiritual-crisis-decision-trees',
    category: 'mental-health',
    fileNames: {
      en: 'spiritual-crisis-decision-trees-en',
      sv: 'spiritual-crisis-decision-trees-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'clinical-and-service'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'clinical-and-service')
    },
    pageFooter: {
      en: 'Mental Health Framework - Clinical Tool - Page ',
      sv: 'Psykisk hälsoramverk - Kliniskt verktyg - Sida '
    }
  },

  {
    name: 'consciousness-development-guide',
    category: 'mental-health',
    fileNames: {
      en: 'consciousness-development-guide-en',
      sv: 'consciousness-development-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'clinical-and-service'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'clinical-and-service')
    },
    pageFooter: {
      en: 'Mental Health Framework - Consciousness Guide - Page ',
      sv: 'Psykisk hälsoramverk - Medvetandeguide - Sida '
    }
  },

  {
    name: 'consciousness-healing-protocols',
    category: 'mental-health',
    fileNames: {
      en: 'consciousness-healing-protocols-en',
      sv: 'consciousness-healing-protocols-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'clinical-and-service'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'clinical-and-service')
    },
    pageFooter: {
      en: 'Mental Health Framework - Healing Protocols - Page ',
      sv: 'Psykisk hälsoramverk - Helande protokoll - Sida '
    }
  },

  {
    name: 'traditional-healing-integration-guidelines',
    category: 'mental-health',
    fileNames: {
      en: 'traditional-healing-integration-guidelines-en',
      sv: 'traditional-healing-integration-guidelines-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'clinical-and-service'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'clinical-and-service')
    },
    pageFooter: {
      en: 'Mental Health Framework - Traditional Healing Guide - Page ',
      sv: 'Psykisk hälsoramverk - Traditionell helande guide - Sida '
    }
  },

  {
    name: 'psychedelic-therapy-lab-guide',
    category: 'mental-health',
    fileNames: {
      en: 'psychedelic-therapy-lab-guide-en',
      sv: 'psychedelic-therapy-lab-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'clinical-and-service'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'clinical-and-service')
    },
    pageFooter: {
      en: 'Mental Health Framework - Therapy Lab Guide - Page ',
      sv: 'Psykisk hälsoramverk - Terapilabbguide - Sida '
    }
  },

  // Financing & Economics Tools
  {
    name: 'commons-fund-blueprint',
    category: 'mental-health',
    fileNames: {
      en: 'commons-fund-blueprint-en',
      sv: 'commons-fund-blueprint-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'financing-and-economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'financing-and-economic')
    },
    pageFooter: {
      en: 'Mental Health Framework - Fund Blueprint - Page ',
      sv: 'Psykisk hälsoramverk - Fondritning - Sida '
    }
  },

  {
    name: 'right-to-rest-policy-guide',
    category: 'mental-health',
    fileNames: {
      en: 'right-to-rest-policy-guide-en',
      sv: 'right-to-rest-policy-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'financing-and-economic'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'financing-and-economic')
    },
    pageFooter: {
      en: 'Mental Health Framework - Policy Guide - Page ',
      sv: 'Psykisk hälsoramverk - Policyguide - Sida '
    }
  },

  // Monitoring & Evaluation Tools
  {
    name: 'flourishing-metrics-dashboard-spec',
    category: 'mental-health',
    fileNames: {
      en: 'flourishing-metrics-dashboard-spec-en',
      sv: 'flourishing-metrics-dashboard-spec-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'monitoring-and-evaluation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'monitoring-and-evaluation')
    },
    pageFooter: {
      en: 'Mental Health Framework - Dashboard Spec - Page ',
      sv: 'Psykisk hälsoramverk - Instrumentpanelspec - Sida '
    }
  },

  {
    name: 'community-monitoring-toolkit',
    category: 'mental-health',
    fileNames: {
      en: 'community-monitoring-toolkit-en',
      sv: 'community-monitoring-toolkit-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'monitoring-and-evaluation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'monitoring-and-evaluation')
    },
    pageFooter: {
      en: 'Mental Health Framework - Monitoring Toolkit - Page ',
      sv: 'Psykisk hälsoramverk - Övervakningsverktygslåda - Sida '
    }
  },

  {
    name: 'narrative-equity-review-guide',
    category: 'mental-health',
    fileNames: {
      en: 'narrative-equity-review-guide-en',
      sv: 'narrative-equity-review-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'monitoring-and-evaluation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'monitoring-and-evaluation')
    },
    pageFooter: {
      en: 'Mental Health Framework - Review Guide - Page ',
      sv: 'Psykisk hälsoramverk - Granskningsguide - Sida '
    }
  },

  {
    name: 'transparency-dashboard-template',
    category: 'mental-health',
    fileNames: {
      en: 'transparency-dashboard-template-en',
      sv: 'transparency-dashboard-template-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health', 'monitoring-and-evaluation'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health', 'monitoring-and-evaluation')
    },
    pageFooter: {
      en: 'Mental Health Framework - Dashboard Template - Page ',
      sv: 'Psykisk hälsoramverk - Instrumentpanelmall - Sida '
    }
  },

  // Full Mental Health Framework
  {
    name: 'mental-health-framework',
    category: 'mental-health',
    fileNames: {
      en: 'Mental-Health-Framework',
      sv: 'Mental-Health-Framework'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'mental-health'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'mental-health')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Mental Health Framework - Page ',
      sv: 'Psykisk hälsoramverk - Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'vision-principles',
      'governance-structures',
      'legal-policy',
      'financing-resources',
      'service-delivery',
      'monitoring-accountability',
      'crisis-response',
      'innovation-research',
      'cross-cutting-themes',
      'implementation-strategy',
      'political-strategy',
      'risk-management',
      'technology-implementation',
      'change-management',
      'conclusion',
    ]
  },

  // Treaty for Our Only Home
  {
    name: 'executive-summary-for-the-skeptic',
    category: 'treaty-for-our-only-home',
    fileNames: {
      en: 'treaty-for-our-only-home-executive-summary-en',
      sv: 'treaty-for-our-only-home-executive-summary-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'treaty-for-our-only-home'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'treaty-for-our-only-home')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'assets','pdf'),
      sv: path.join(__dirname, '..', 'static', 'assets','pdf')
    },
    pageFooter: {
      en: 'Treaty for Our Only Home - Executive Summary for the Skeptic - Page ',
      sv: 'Fördraget för vårt enda hem - Sammanfattning för skeptikern - Sida '
    }
  },
  {
    name: 'treaty-framework-essentials',
    category: 'treaty-for-our-only-home',
    fileNames: {
      en: 'treaty-framework-essentials-en',
      sv: 'treaty-framework-essentials-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'treaty-for-our-only-home'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'treaty-for-our-only-home')
    },
    pageFooter: {
      en: 'Treaty for Our Only Home - Framework Essentials - Page ',
      sv: 'Fördraget för vårt enda hem - Ramverket i korthet - Sida '
    }
  },
  {
    name: 'treaty-at-a-glance-reference-card',
    category: 'treaty-for-our-only-home',
    fileNames: {
      en: 'treaty-at-a-glance-reference-card-en',
      sv: 'treaty-at-a-glance-reference-card-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'treaty-for-our-only-home', 'tools'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'treaty-for-our-only-home', 'tools')
    },
    pageFooter: {
      en: 'Treaty for Our Only Home - Treaty at a Glance Reference Card - Page ',
      sv: 'Fördraget för vårt enda hem - Referenskort för fördraget i korthet - Sida '
    }
  },
  {
    name: 'treaty-for-our-only-home',
    category: 'treaty-for-our-only-home',
    fileNames: {
      en: 'Treaty-for-Our-Only-Home',
      sv: 'Treaty-for-Our-Only-Home'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en', 'implementation', 'treaty-for-our-only-home'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv', 'implementation', 'treaty-for-our-only-home')
    },
    outputDir: {
      en: path.join(__dirname, '..', 'static', 'downloads', 'en'),
      sv: path.join(__dirname, '..', 'static', 'downloads', 'sv')
    },
    pageFooter: {
      en: 'Treaty for Our Only Home - Global Institutional Reform Framework - Page ',
      sv: 'Fördraget för vårt enda hem - Globalt institutionellt reform-ramverk Sida '
    },
    // Special config for full framework
    sections: [
      'index',
      'executive-summary-for-the-skeptic',
      'introduction',
      'core-principles',
      'five-pillars',
      'implementation-strategies',
      'monitoring-evaluation',
      'conclusion',
      'faq-and-challenges',
      'glossary'
    ]
  },

  // Get involved: Guides
  {
    name: 'website-guide',
    category: 'get-involved',
    fileNames: {
      en: 'website-guide-en',
      sv: 'website-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'website', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'website', 'sv'),
    },
    pageFooter: {
      en: 'Contributing to the Global Governance Frameworks Website - Page ',
      sv: 'Guide för att bidra till Global Governance Frameworks webbsida - Sida '
    }
  },
  {
    name: 'translation-guide',
    category: 'get-involved',
    fileNames: {
      en: 'translation-guide-en',
      sv: 'translation-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'translations', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'translations', 'sv'),
    },
    pageFooter: {
      en: 'Contributing to the Global Governance Frameworks translations - Page ',
      sv: 'Bidra till Global Governance Frameworks översättningar - Sida '
    }
  },
  {
    name: 'frameworks-guide',
    category: 'get-involved',
    fileNames: {
      en: 'frameworks-guide-en',
      sv: 'frameworks-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'frameworks', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'frameworks', 'sv'),
    },
    pageFooter: {
      en: 'Contributing to the Global Governance Frameworks frameworks - Page ',
      sv: 'Bidra till Global Governance Frameworks ramverk - Sida '
    }
  },
  {
    name: 'outreach-guide',
    category: 'get-involved',
    fileNames: {
      en: 'outreach-guide-en',
      sv: 'outreach-guide-sv'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    pageFooter: {
      en: 'Contributing to the Global Governance Frameworks outreach - Page ',
      sv: 'Bidra till Global Governance Frameworks utåtriktade verksamhet - Sida '
    }
  },
  {
    name: 'project-overview',
    category: 'get-involved',
    fileNames: {
      en: 'Project_Overview',
      sv: 'Projekt_Oversikt'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    subfolders: {
      en: 'Advocacy_Kit/Message_Pack',
      sv: '/Opinionsbildningskit/Meddelandepaket',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Project Overview - Page ',
      sv: 'Global Governance Frameworks. Projektöversikt - Sida '
    }
  },
  {
    name: 'key-talking-points-and-faq',
    category: 'get-involved',
    fileNames: {
      en: 'Key_Talking_Points_and_FAQ',
      sv: 'Viktiga_Samtalsamnen_och_FAQ'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    subfolders: {
      en: 'Advocacy_Kit/Message_Pack',
      sv: '/Opinionsbildningskit/Meddelandepaket',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Project Key Talking Points & FAQ - Page ',
      sv: 'Global Governance Frameworks. Viktiga samtalsämnen och vanliga frågor - Sida '
    }
  },
  {
    name: 'key-facts-and-statistics-sheet',
    category: 'get-involved',
    fileNames: {
      en: 'Key_Facts_and_Statistics',
      sv: 'Viktiga_Fakta_och_Statistik'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    subfolders: {
      en: 'Advocacy_Kit/Message_Pack',
      sv: '/Opinionsbildningskit/Meddelandepaket',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Project Key Facts & Statistics - Page ',
      sv: 'Global Governance Frameworks. Viktiga fakta och statistik - Sida '
    }
  },
  {
    name: 'brand-guidelines',
    category: 'get-involved',
    fileNames: {
      en: 'Brand_Guidelines',
      sv: 'Riktlinjer_For_Grafisk_Profil'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    subfolders: {
      en: 'Advocacy_Kit/Media_Kit/GGF_Logo_and_Branding_Kit',
      sv: '/Opinionsbildningskit/Media-Kit/GGF_Grafisk_Profil_och_Logotyper',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Brand Guidelines - Page ',
      sv: 'Global Governance Frameworks. Grafisk profil - Sida '
    }
  },
  {
    name: 'guide-to-talking-about-ggf',
    category: 'get-involved',
    fileNames: {
      en: 'Guide_to_Talking_About_GGF',
      sv: 'Guide_for_Att_Prata_Om_GGF'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    subfolders: {
      en: 'Advocacy_Kit/Action_Pack',
      sv: '/Opinionsbildningskit/Aktionspaket',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Guide to Talking About GGF - Page ',
      sv: 'Global Governance Frameworks. Guide för att prata om GGF - Sida '
    }
  },
  {
    name: 'community-event-guide',
    category: 'get-involved',
    fileNames: {
      en: 'Community_Event_Guide',
      sv: 'Guide_for_Lokala_Evenemang'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    subfolders: {
      en: 'Advocacy_Kit/Action_Pack',
      sv: '/Opinionsbildningskit/Aktionspaket',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Community Event Guide - Page ',
      sv: 'Global Governance Frameworks. Guide för lokala evenemang - Sida '
    }
  },
  {
    name: 'content-creation-guide',
    category: 'get-involved',
    fileNames: {
      en: 'Content_Creation_Guide',
      sv: 'Guide_for_Innehallsskapande'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'get-involved', 'outreach', 'sv'),
    },
    subfolders: {
      en: 'Advocacy_Kit/Action_Pack',
      sv: '/Opinionsbildningskit/Aktionspaket',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Content Creation Guide - Page ',
      sv: 'Global Governance Frameworks. Guide för innehållsskapande - Sida '
    }
  },

  // Frameworks Foundation
  {
    name: 'case-studies',
    category: 'frameworks-foundation',
    fileNames: {
      en: 'Case-Studies',
      sv: 'Case-Studies'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv'),
    },
    subfolders: {
      en: 'en',
      sv: 'sv',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Case Studies - Page ',
      sv: 'Global Governance Frameworks Fallstudier - Sida '
    }
  },
  {
    name: 'implementation',
    category: 'frameworks-foundation',
    fileNames: {
      en: 'Implementation-Guidelines',
      sv: 'Implementation-Guidelines'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv'),
    },
    subfolders: {
      en: 'en',
      sv: 'sv',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Implementation Guidelines - Page ',
      sv: 'Global Governance Frameworks Implementeringsriktlinjer - Sida '
    }
  },
  {
    name: 'principles',
    category: 'frameworks-foundation',
    fileNames: {
      en: 'Core-Principles',
      sv: 'Core-Principles'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv'),
    },
    subfolders: {
      en: 'en',
      sv: 'sv',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Core Principles - Page ',
      sv: 'Global Governance Frameworks Grundprinciper - Sida '
    }
  },
  {
    name: 'resources',
    category: 'frameworks-foundation',
    fileNames: {
      en: 'Resources',
      sv: 'Resources'
    },
    sourceDir: {
      en: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'en'),
      sv: path.join(__dirname, '..', 'src', 'lib', 'content', 'frameworks', 'sv'),
    },
    subfolders: {
      en: 'en',
      sv: 'sv',
    },
    pageFooter: {
      en: 'Global Governance Frameworks Resources - Page ',
      sv: 'Global Governance Frameworks Resurser - Sida '
    }
  }
];

// CSS styling for the PDF
const css = `
  /* Import the Inter font from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  body {
    /* Use Inter as the primary font, with standard fallbacks */
    font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.4;
    color: #333;
    max-width: none;
    margin: 0;
    padding: 0.5cm;
  }

  /* Make headings use the bold version of Inter */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #2B4B8C;
    margin-top: 0.8em;
    margin-bottom: 0.4em;
    line-height: 1.2;
  }
  h1 {
    font-size: 14pt;
    text-align: center;
    margin-bottom: 0.6em;
    margin-top: 0.4em;
  }
  h2 {
    font-size: 13pt;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.2em;
  }
  h3 {
    font-size: 12pt;
  }
  h4 {
    font-size: 11pt;
    font-weight: bold;
  }
  p {
    margin: 0.3em 0;
    text-align: justify;
  }
  a {
    color: #2B4B8C;
    text-decoration: none;
  }
  blockquote {
    border-left: 3px solid #6B5CA5;
    padding-left: 10px;
    margin: 0.5em 0 0.5em 5px;
    color: #555;
    font-style: italic;
  }
  code {
    background-color: #f6f8fa;
    padding: 0.1em 0.3em;
    border-radius: 2px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 10pt;
  }
  pre code {
    display: block;
    padding: 0.5em;
    overflow-x: auto;
    font-size: 10pt;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.5em 0;
    font-size: 10pt;
  }
  table, th, td {
    border: 1px solid #ddd;
  }
  th, td {
    padding: 6px 8px;
    text-align: left;
  }
  th {
    background-color: #2B4B8C;
    color: white;
    font-size: 10pt;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  hr {
    border: 0;
    height: 1px;
    background: #eaecef;
    margin: 1em 0;
  }
  .emoji {
    height: 1em;
    width: auto;
    vertical-align: middle;
    margin: 0 0.02em;
  }
  ul, ol {
    padding-left: 1.2em;
    margin: 0.3em 0;
  }
  li {
    margin-bottom: 0.2em;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0.5em auto;
  }
  
  /* Compact image styling */
  .image-container {
    text-align: center;
    margin: 0.8em 0;
    page-break-inside: avoid;
  }
  
  .image-container img {
    max-width: 90%;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  
  .svg-container {
    text-align: center;
    margin: 0.8em 0;
    page-break-inside: avoid;
  }
  
  .svg-container img {
    max-width: 85%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
  /* Executive summary specific styling */
  .executive-summary {
    font-size: 11pt;
    line-height: 1.1;
  }
  
  .executive-summary h1 {
    font-size: 16pt;
    margin-bottom: 0.3em;
  }
  
  .executive-summary h2 {
    font-size: 13pt;
    margin-top: 0.5em;
    margin-bottom: 0.3em;
  }
  
  .executive-summary p {
    margin: 0.2em 0;
  }
  
  .executive-summary ul, .executive-summary ol {
    margin: 0.2em 0;
  }
  
  /* QR Code specific styling */
  img[alt*="QR"], img[src*="qr-code"] {
    max-width: 150px !important;
    height: auto;
    margin: 0.5em auto;
    border: 1px solid #ddd;
    padding: 8px;
    background: white;
  }
  
  /* Page break control */
  .page-break-before {
    page-break-before: always;
  }
  
  .page-break-avoid {
    page-break-inside: avoid;
  }

  /* Section tracking for multi-section documents */
  .section-marker {
    display: none;
    visibility: hidden;
  }
`;

// Use simpler emoji replacement approach
function replaceEmojisWithImages(text) {
  // Make sure we're dealing with a string
  if (typeof text !== 'string') {
    return text;
  }
  
  // Map of common emoji characters to their image URLs
  const emojiMap = {
    '📘': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4d8.png', // blue book
    '📖': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4d6.png', // open book
    '🌀': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f300.png', // cyclone
    '🌍': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f30d.png', // earth globe europe-africa
    '🔑': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f511.png', // key
    '🧠': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9e0.png', // brain
    '⚠️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/26a0.png', // warning
    '🔍': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f50d.png', // magnifying glass
    '📊': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4ca.png', // bar chart
    '🌱': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f331.png', // seedling
    '✨': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/2728.png', // sparkles
    '⚡': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/26a1.png', // high voltage
    '🚧': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6a7.png', // construction
    '🎭': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3ad.png', // performing arts
    '⏳': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/23f3.png', // hourglass
    '🕸️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f578.png', // spider web
    '🧭': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9ed.png', // compass
    '🔗': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f517.png', // link
    '👁️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f441.png', // eye
    '⚖️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/2696.png', // scales
    '🤖': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f916.png', // robot
    '🧑‍🤝‍🧑': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9d1-200d-1f91d-200d-1f9d1.png', // people holding hands
    '👥': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f465.png', // busts in silhouette
    '👀': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f440.png', // eyes
    '🛠️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6e0.png', // hammer and wrench
    '📥': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4e5.png', // inbox tray
    '🧩': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9e9.png', // puzzle piece
    '📚': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4da.png', // books
    '📦': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4e6.png', // package
    '📋': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4cb.png', // clipboard
    '🏗️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3d7.png', // building construction
    '📈': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4c8.png', // chart increasing
    '🧪': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9ea.png', // test tube
    '📣': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4e3.png', // megaphone
    '🛤️': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6e4.png', // railway track
  };

  // Replace each emoji with its image
  Object.keys(emojiMap).forEach(emoji => {
    text = text.replace(new RegExp(emoji, 'g'), `<img src="${emojiMap[emoji]}" alt="${emoji}" class="emoji" />`);
  });

  return text;
}

function getLogoDataUri() {
  const logoPath = path.join(__dirname, '..', 'static', 'logo-favicon.svg');
  if (fs.existsSync(logoPath)) {
    try {
      const svgContent = fs.readFileSync(logoPath, 'utf8');
      let processedSvg = svgContent;
      
      // Ensure SVG has namespace
      if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
        processedSvg = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(processedSvg)}`;
    } catch (error) {
      console.warn(`❌ Error processing logo: ${error.message}`);
      return '';
    }
  } else {
    console.warn(`⚠️ Logo file not found: ${logoPath}`);
    return '';
  }
}

function getCurrentSection(markdown, currentPosition = 0) {
  const lines = markdown.split('\n');
  let currentSection = '';
  
  // Look for the most recent h1 or h2 heading before current position
  for (let i = 0; i < lines.length && i < currentPosition; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ') || line.startsWith('## ')) {
      currentSection = line.replace(/^#+\s+/, '');
    }
  }
  
  return currentSection || 'Introduction';
}

function extractSectionTitles(markdown) {
  const sections = [];
  
  // For combined documents, split by sections and extract titles
  if (markdown.includes('---')) {
    // Split by frontmatter blocks
    const parts = markdown.split(/^---\s*$/m);
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      if (!part) continue;
      
      // Look for frontmatter pattern: content between --- blocks
      const frontmatterMatch = part.match(/^([\s\S]*?)\n*$/);
      
      if (frontmatterMatch) {
        const content = frontmatterMatch[1];
        
        // Try to extract title from frontmatter
        const titleMatch = content.match(/^title:\s*(.+)$/m);
        if (titleMatch) {
          sections.push(titleMatch[1].replace(/['"]/g, '').trim());
        } else {
          // Fallback: look for first heading in the content
          const headingMatch = content.match(/^#\s+(.+)$/m);
          if (headingMatch) {
            sections.push(headingMatch[1].trim());
          }
        }
      }
    }
  }
  
  // If no sections found via frontmatter, extract from headings
  if (sections.length === 0) {
    const headingMatches = markdown.match(/^#{1,2}\s+(.+)$/gm);
    if (headingMatches) {
      headingMatches.forEach(match => {
        const title = match.replace(/^#{1,2}\s+/, '').trim();
        sections.push(title);
      });
    }
  }
  
  console.log(`📋 Extracted ${sections.length} section titles:`, sections.slice(0, 5).map(s => `"${s}"`).join(', ') + (sections.length > 5 ? '...' : ''));
  return sections;
}

function addSectionMarkers(html, sections, isMultiSection) {
  if (!isMultiSection || sections.length === 0) return html;
  
  let currentSectionIndex = 0;
  
  // Add section markers and JavaScript to track sections
  const sectionScript = `
    <script>
      window.currentSections = ${JSON.stringify(sections)};
      window.getCurrentSection = function() {
        const headings = document.querySelectorAll('h1, h2');
        let currentSection = window.currentSections[0] || 'Introduction';
        
        // Find which section we're currently in based on visible headings
        for (let i = 0; i < headings.length; i++) {
          const heading = headings[i];
          const rect = heading.getBoundingClientRect();
          const headingText = heading.textContent.trim();
          
          // Find matching section
          const sectionIndex = window.currentSections.findIndex(section => 
            section.toLowerCase().includes(headingText.toLowerCase()) ||
            headingText.toLowerCase().includes(section.toLowerCase())
          );
          
          if (sectionIndex !== -1) {
            currentSection = window.currentSections[sectionIndex];
          }
        }
        
        return currentSection;
      };
      
      // Make section available globally for footer template
      window.currentSection = window.getCurrentSection();
    </script>
  `;
  
  // Add script before closing body tag
  return html.replace('</body>', sectionScript + '</body>');
}

// Enhanced image processing function for PDF generator
function processImageReferences(markdown, inputFileDir) {
  // Find all image references in markdown
  const imgRegex = /!\[(.*?)\]\(([^)]+)\)/g;
  let match;
  let processedMarkdown = markdown;
  
  while ((match = imgRegex.exec(markdown)) !== null) {
    const altText = match[1];
    let imgPath = match[2];
    
    // Skip if it's already a data URI or external URL
    if (imgPath.startsWith('data:') || imgPath.startsWith('http')) {
      continue;
    }
    
    // Handle different image types
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
    const isImage = imageExtensions.some(ext => imgPath.toLowerCase().endsWith(ext));
    
    if (isImage) {
      // Resolve the image path
      let resolvedPath;
      
      if (imgPath.startsWith('/')) {
        // Absolute path from project root - map to static directory
        resolvedPath = path.join(__dirname, '..', 'static', imgPath);
      } else {
        // Relative path from markdown file
        resolvedPath = path.join(inputFileDir, imgPath);
      }
      
      console.log(`Processing image reference: ${imgPath} -> ${resolvedPath}`);
      
      // Check if image file exists
      if (fs.existsSync(resolvedPath)) {
        try {
          const ext = path.extname(resolvedPath).toLowerCase();
          
          if (ext === '.svg') {
            // Handle SVG files
            const svgContent = fs.readFileSync(resolvedPath, 'utf8');
            let processedSvg = svgContent;
            
            // Ensure SVG has namespace
            if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
              processedSvg = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            
            const svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(processedSvg)}`;
            
            // Replace with embedded SVG
            processedMarkdown = processedMarkdown.replace(
              match[0],
              `<div class="svg-container"><img src="${svgDataUri}" alt="${altText}" /></div>`
            );
            
          } else {
            // Handle raster images (PNG, JPG, etc.)
            const imageBuffer = fs.readFileSync(resolvedPath);
            const mimeType = getMimeType(ext);
            const base64Data = imageBuffer.toString('base64');
            const dataUri = `data:${mimeType};base64,${base64Data}`;
            
            // Replace with data URI
            processedMarkdown = processedMarkdown.replace(
              match[0],
              `<div class="image-container"><img src="${dataUri}" alt="${altText}" style="max-width: 100%; height: auto;" /></div>`
            );
          }
          
          console.log(`✅ Embedded image: ${path.basename(resolvedPath)}`);
          
        } catch (error) {
          console.warn(`❌ Error processing image ${resolvedPath}: ${error.message}`);
          // Keep original reference if processing fails
        }
      } else {
        console.warn(`⚠️ Image file not found: ${resolvedPath}`);
        // Keep original reference if file doesn't exist
      }
    }
  }
  
  return processedMarkdown;
}

// Helper function to get MIME type from file extension
function getMimeType(ext) {
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.ico': 'image/x-icon'
  };
  
  return mimeTypes[ext.toLowerCase()] || 'image/png';
}

// Function to detect and apply executive summary formatting
function applyExecutiveSummaryFormatting(html, toolName) {
  if (toolName.toLowerCase().includes('executive') || 
      toolName.toLowerCase().includes('summary') || 
      toolName.toLowerCase().includes('skeptic')) {
    
    // Wrap in executive summary class and apply more compact formatting
    return html.replace('<body>', '<body class="executive-summary">');
  }
  return html;
}

// Function to apply compact formatting for long documents
function applyCompactFormatting(markdown) {
  const wordCount = markdown.split(/\s+/).length;
  
  if (wordCount > 800) { // If document is long, apply more compact formatting
    return markdown
      .replace(/\n\n\n+/g, '\n\n') // Remove excessive line breaks
      .replace(/^#{1}\s+(.+)$/gm, '# $1') // Ensure single space after headers
      .replace(/^#{2}\s+(.+)$/gm, '## $1')
      .replace(/^#{3}\s+(.+)$/gm, '### $1');
  }
  
  return markdown;
}

// Process each tool in each language
async function generatePDFs() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Filter tools by category if a target category was specified
  const toolsToProcess = targetCategory 
    ? tools.filter(tool => tool.category === targetCategory)
    : tools;
  
  console.log(`Processing ${toolsToProcess.length} tools in category: ${targetCategory || 'all'}`);

  try {
    for (const tool of toolsToProcess) {
      for (const lang of languages) {
        // Check if this language is available for this tool
        if (!tool.fileNames[lang] || !tool.sourceDir[lang]) {
          console.warn(`⚠️ WARNING: Language '${lang}' not available for tool '${tool.name}' - skipping`);
          continue;
        }

        const fileName = tool.fileNames[lang];
        
        // Determine the output directory - use tool-specific outputDir if provided, otherwise use the category default
        let outputDir;
        if (tool.outputDir && tool.outputDir[lang]) {
          // Use tool-specific output directory if provided
          outputDir = tool.outputDir[lang];
          console.log(`Using custom output directory: ${outputDir}`);
        } else {
          // Use default category directory
          outputDir = outputDirs[tool.category];
        }
        
        // NEW: Add subfolder support
        if (tool.subfolders && tool.subfolders[lang]) {
          outputDir = path.join(outputDir, tool.subfolders[lang]);
          console.log(`Using subfolder: ${tool.subfolders[lang]}`);
        }
        
        // Ensure the output directory exists (including subfolders)
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
          console.log(`Created directory: ${outputDir}`);
        }
        
        const outputFile = path.join(outputDir, `${fileName}.pdf`);
        
        console.log(`\nProcessing ${lang.toUpperCase()} version of ${tool.name}:`);
        
        let markdown = '';
        
        // Check if this is a combined PDF
        if (tool.sections && Array.isArray(tool.sections)) {
          // Full framework with sections
          console.log(`📚 Generating combined PDF from ${tool.sections.length} sections...`);

          for (const section of tool.sections) {
            const sectionFile = path.join(tool.sourceDir[lang], `${section}.md`);
            if (fs.existsSync(sectionFile)) {
              let sectionContent = fs.readFileSync(sectionFile, 'utf8');
              // Remove frontmatter from each section
              sectionContent = sectionContent.replace(/^(---|\+\+\+)\s*\n([\s\S]*?)\n\s*(---|\+\+\+)\s*/m, '');
              markdown += sectionContent + '\n\n';
              console.log(`  Added section: ${section}`);
            } else {
              console.warn(`  ⚠️ Section file not found: ${sectionFile}`);
            }
          }
          
        } else if (tool.combinedFiles && Array.isArray(tool.combinedFiles)) {
          // Seed kit with multiple files
          console.log(`📚 Generating combined PDF from ${tool.combinedFiles.length} files...`);
          
          // Add a title for the combined document
          const title = tool.name === 'sacred-seed-kit' ? '# Sacred Seed Kit\n\n' : `# ${tool.name}\n\n`;
          markdown += title;
          
          for (const fileId of tool.combinedFiles) {
            // Look through all tools to find the matching ones
            const subTool = tools.find(t => t.name === fileId && t.category === tool.category);
            if (subTool) {
              if (!subTool.sourceDir[lang]) {
                console.warn(`  ⚠️ Language '${lang}' not available for component: ${fileId}`);
                continue;
              }
              const subFile = path.join(subTool.sourceDir[lang], `${fileId}.md`);
              if (fs.existsSync(subFile)) {
                let fileContent = fs.readFileSync(subFile, 'utf8');
                // Remove frontmatter from each component file
                fileContent = fileContent.replace(/^(---|\+\+\+)\s*\n([\s\S]*?)\n\s*(---|\+\+\+)\s*/m, '');
                markdown += fileContent + '\n\n---\n\n'; // Add separator between files
                console.log(`  Added file: ${fileId}`);
              } else {
                console.warn(`  ⚠️ Component file not found: ${subFile}`);
              }
            } else {
              console.warn(`  ⚠️ Component tool definition not found: ${fileId}`);
            }
          }
          
        } else {
          // Regular single file
          const inputFile = path.join(tool.sourceDir[lang], `${tool.name}.md`);
          
          if (!fs.existsSync(inputFile)) {
            console.warn(`⚠️ WARNING: Input file not found: ${inputFile}`);
            console.warn(`    Skipping ${fileName}.pdf generation\n`);
            continue;
          }
          
          console.log(`Input file: ${inputFile}`);
          markdown = fs.readFileSync(inputFile, 'utf8');
          console.log(`Read ${markdown.length} characters from source file`);
        }
        
        console.log(`Output file: ${outputFile}`);
        
        try {
          // Apply compact formatting if needed
          markdown = applyCompactFormatting(markdown);

          // Robust frontmatter removal that handles various formats
          markdown = markdown.replace(/^(---|\+\+\+)\s*\n([\s\S]*?)\n\s*(---|\+\+\+)\s*/m, '');

          // Process image references with fallback
          const sourceDir = tool.sourceDir[lang] || tool.sourceDir['en'] || '';
          markdown = processImageReferences(markdown, path.dirname(sourceDir));
          
          // Determine if this is a multi-section document
          const isMultiSection = (tool.sections && Array.isArray(tool.sections)) || 
                                (tool.combinedFiles && Array.isArray(tool.combinedFiles));
          
          // Extract section titles for multi-section documents
          const sectionTitles = isMultiSection ? extractSectionTitles(markdown) : [];

          if (isMultiSection) {
            console.log(`📚 Multi-section document detected`);
            console.log(`📋 Sections found: ${sectionTitles.length}`);
            if (sectionTitles.length > 0) {
              console.log(`📝 First section will be: "${sectionTitles[0]}"`);
            } else {
              console.log(`⚠️ No sections extracted - will show static text`);
            }
          } else {
            console.log(`📄 Single document - using simple footer`);
          }
          
          // Convert markdown with emoji replacement
          const renderer = new marked.Renderer();
          
          const originalParagraph = renderer.paragraph;
          renderer.paragraph = function(text) {
            return originalParagraph.call(this, replaceEmojisWithImages(text));
          };
          
          const originalTablecell = renderer.tablecell;
          renderer.tablecell = function(content, flags) {
            return originalTablecell.call(this, replaceEmojisWithImages(content), flags);
          };
          
          const originalHeading = renderer.heading;
          renderer.heading = function(text, level, raw, slugger) {
            return originalHeading.call(this, replaceEmojisWithImages(text), level, raw, slugger);
          };
          
          const originalListitem = renderer.listitem;
          renderer.listitem = function(text) {
            return originalListitem.call(this, replaceEmojisWithImages(text));
          };
          
          // Convert markdown to HTML with the custom renderer
          let html = marked(markdown, { renderer });
          
          // Add section markers for multi-section documents
          html = addSectionMarkers(html, sectionTitles, isMultiSection);
          
          // Create a full HTML document
          let fullHtml = `
          <!DOCTYPE html>
          <html lang="${lang}">
          <head>
            <meta charset="UTF-8">
            <title>${fileName}</title>
            <style>${css}</style>
          </head>
          <body>
            ${html}
          </body>
          </html>
          `;

          // Apply executive summary formatting if needed
          fullHtml = applyExecutiveSummaryFormatting(fullHtml, tool.name);
          
          // Save temporary HTML file (optional, for debugging)
          const tempHtmlFile = path.join(__dirname, `temp-${tool.name}-${lang}.html`);
          fs.writeFileSync(tempHtmlFile, fullHtml);
          console.log(`Created temporary HTML file: ${tempHtmlFile}`);
          
          // Create a new page for this tool/language
          const page = await browser.newPage();
          
          // Configure the page
          await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
          
          // Set content and wait until network is idle (wait for images to load)
          await page.setContent(fullHtml, { 
            waitUntil: 'networkidle0',
            timeout: 30000 // Increase timeout to 30 seconds for image loading
          });
          
          // Generate PDF
          const logoDataUri = getLogoDataUri();

          // Pre-build section list for footer
          let sectionListJS = '';
          if (isMultiSection && sectionTitles.length > 0) {
            sectionListJS = `
              const sections = ${JSON.stringify(sectionTitles)};
              const currentSection = sections[0] || 'Current Section';
            `;
          }

          await page.pdf({
            path: outputFile,
            format: 'A4',
            margin: {
              top: '2cm',
              right: '1.5cm',
              bottom: '2cm',
              left: '1.5cm'
            },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: `
              <div style="width: 100%; font-size: 8px; padding: 0 1.5cm; color: #2B4B8C; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee;">
                <div style="display: flex; align-items: center;">
                  ${logoDataUri ? `<img src="${logoDataUri}" style="height: 12px; margin-right: 8px;" />` : ''}
                  <span style="font-weight: 600;">${tool.pageFooter[lang].replace(' - Page ', '')}</span>
                </div>
                <div style="font-size: 7px; color: #666;">
                  Global Governance Frameworks
                </div>
              </div>
            `,
            footerTemplate: isMultiSection ? `
              <div style="width: 100%; font-size: 7px; padding: 0 1.5cm; color: #777; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee;">
                <script>${sectionListJS}</script>
                <span style="font-style: italic;" id="section-title">${sectionTitles.length > 0 ? sectionTitles[0] : 'Current Section'}</span>
                <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
              </div>
            ` : `
              <div style="width: 100%; font-size: 7px; padding: 0 1.5cm; color: #777; text-align: center; border-top: 1px solid #eee;">
                <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
              </div>
            `,
            preferCSSPageSize: false,
            scale: 0.95
          });
          
          // Close the page
          await page.close();
          
          console.log(`✅ PDF generated successfully: ${outputFile}`);

          // Delete the temporary HTML file
          fs.unlinkSync(tempHtmlFile);
          console.log(`🗑️ Deleted temporary HTML file: ${tempHtmlFile}`);
          
          // Also copy the markdown file to the output directory
          const markdownOutputFile = path.join(outputDir, `${fileName}.md`);
          fs.writeFileSync(markdownOutputFile, markdown);
          console.log(`✅ Markdown file copied to: ${markdownOutputFile}`);
          
        } catch (error) {
          console.error(`❌ Error processing ${fileName}:`, error.message);
          console.error(`    Skipping this file and continuing with next...\n`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error in PDF generation process:', error);
  } finally {
    // Close the browser
    await browser.close();
    console.log(`\n🎉 PDF generation complete for category: ${targetCategory || 'all'}`);
  }
}

// Run the PDF generation
generatePDFs().catch(console.error);
