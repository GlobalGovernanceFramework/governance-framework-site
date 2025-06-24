# Changelog

All notable changes to the Global Governance Framework website will be documented in this file.

## [0.4.0] - 2025-06-25

### Project Refinement & Strategy
This release marks the beginning of a major project-wide audit and strategic refinement phase. The focus has shifted from rapid feature addition to improving the quality, consistency, and ethical alignment of all existing content and frameworks.

### Added
- Implemented a site-wide notification system to inform users of the project's active development status.
- Created standardized issue templates on GitHub for bug reports and ethical reviews.
- Established a `CONTRIBUTING.md` file centered on a GitHub-first workflow.

### Improved
- Began a comprehensive audit of all frameworks to address consistency, over-promising, and cross-framework alignment. This is a major ongoing effort.
- Initiated a formal ethical review of the "Veto Trade" proposal to ensure it aligns with core principles.
- Contribution Workflow: Refined the project's contribution model to be GitHub-first. As part of this strategic shift, the public Discord has been made private, and all public links are being removed to create a focused workspace.

---

## [0.3.0] - 2025-05-16

### Project Milestone
- **Framework Completion**: 8 out of ~26 planned frameworks now complete (approximately 30% complete)
- **Framework Evolution**: Progressed from simple markdown files to sophisticated modular frameworks with integrated visual tools
- **Component Maturity**: Latest frameworks now include SVG visualizations, HTML tools, and Svelte components

### Added
- Added Ethics & Rights of Beings modular layered framework
- Added emojis to downloads page for visual consistency
- Added Digital Commons framework with comprehensive visualizations
- Added comprehensive framework visualizations for Peace & Conflict Resolution
- Added Food Systems & Agriculture framework
- Added Education Systems implementation framework
- Added Global Citizenship framework with 4-page overview
- Added AI Futures page
- Added visualization components to Meta-Governance framework
- Added Global Ethics & Rights of Beings framework with diagrams
- Added "Why This Exists" section to home page

### Improved
- Significantly enhanced Peace framework with visualizations and systems tools
- Revised Climate & Energy Framework into a modular version with seed-kit and tools
- Revised Economic framework pages and guides
- Enhanced Meta-Governance framework with lite guide
- Improved Framework introduction menus to reflect current state of website
- Enhanced navigation and framework sidebar components

### Fixed
- Fixed print mode issue in disaster page
- Fixed wrong link in main page
- Fixed wrong translation key in nav
- Fixed styling issues in Religious and Spiritual framework
- Fixed formatting of index in Technology framework

### Translations
- Added complete Swedish translation of Climate & Energy implementation framework
- Finalized Swedish translation of technology framework
- Added several partial translations for other frameworks

### Future Plans
- Continue developing remaining frameworks (16-18 more planned)
- Explore audio content for frameworks
- Consider video content (dependent on storage constraints)
- Further enhance modular architecture of frameworks

## [0.2.3] - 2025-03-28

### Added
- Added status indicators to framework implementation documents
- Added CONTRIBUTING.md with specific guidance on using different AI tools
- Added glossary with 24 initial terms (planned to expand to 200-300)
- Added downloads page with PDFs of all framework documents
- Added Religious & Spiritual framework implementation

### Improved
- Further emphasized Claude's role as main recommended workhorse in CONTRIBUTING.md
- Improved styling for markdown lists in implementations
- Enhanced Peace implementation framework through recommendations by Grok

### Fixed
- Fixed visibility of documents in nav bar
- Added missing translation tags to documents in nav bar

## [0.2.2] - 2025-03-27

### Added
- Expanded planned framework implementation documents and arranged them into 4 tiers
- Inquired ChatGPT, Grok and DeepSeek about the top 10 frameworks matching their strengths
- Added Methods & Tools implementation framework document
- Added downloads for Integrated Meta-Governance and Implementing Methods & Tools

### Technical
- Improved prerendering of main routes
- Fixed base path handling and redirect issues
- Disabled service worker temporarily to resolve issues

## [0.2.1] - 2025-03-25

### Added
- Added detailed domain-specific implementations:
  - Economic Integration
  - Environmental Stewardship
  - Technology framework (partly translated to Swedish)
  - Climate & Energy framework (English only)
- Added list of planned domain-specific implementations to docs
- Added placeholder files for planned domain-specific implementations
- Added routes for planned domain-specific implementations
- Added fourteenth principle of shared/common values
- Added thirteenth principle of Resilience and Anti-Fragility
- Added section on navigating tensions between principles
- Added PWA capability to enable adding website as app to home screen

### Improved
- Replaced default Svelte logo with Global Governance Framework logo
- Updated About page with AI collaboration details
- Revised website color scheme to warmer colors
- Added diagram and examples of applications to framework principles
- Added header dropdown for easy access to framework documents

### Fixed
- Fixed central circle size in Global Governance Framework logo SVG
- Fixed framework implementation sub-navigation
- Fixed rendering issues for markdown content
- Fixed translation loading issues

## [0.2.0] - 2025-03-24

### Added
- Enhanced "About" page with new "Collaborative Development" section highlighting AI tools used
- Expanded Framework documentation with Core Principles and Implementation Guidelines
- Added Case Studies section with real-world governance examples
- Created Resources section with books, tools, and implementation guides
- Added Privacy Policy and Terms of Use pages with full translation support
- Implemented Contact form with Formspree integration
- Added nice logo
- Added CNAME files for globalgovernanceframework.org

### Improved
- Enhanced navigation with multi-level menu for Framework documentation
- Created FrameworkSidebar component for better document navigation
- Improved mobile responsiveness across all pages
- Enhanced visual design with consistent color scheme and styling
- Added logo throughout the site for stronger brand identity

### Technical
- Set up GitHub Pages deployment workflow
- Configured proper base paths for routing
- Implemented hash-based navigation to resolve routing issues

### Fixed
- Resolved translation loading issues on page transitions
- Fixed base path handling for GitHub Pages deployment
- Corrected styling inconsistencies in mobile view

## [0.1.0] - 2025-03-22

### Added
- Initial project setup with SvelteKit and Tailwind CSS
- Internationalization system supporting English and Swedish
- Home page with introductory content about meta-governance
- About page describing the project's vision and principles
- Framework page with preliminary content
- Contact page with form integration (Formspree)
- Mobile-responsive design with navigation
- Basic styling with Tailwind (CDN temporary solution)
- Logo and branding elements

### Technical
- Set up GitHub repository (GlobalGovernanceFramework)
- Created basic project structure with SvelteKit
- Implemented custom i18n solution
- Added error handling and fallback styling
