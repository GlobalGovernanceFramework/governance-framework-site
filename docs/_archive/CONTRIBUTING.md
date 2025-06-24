# Contributing to the Global Governance Framework

Thank you for your interest in contributing to the Global Governance Framework project! This document provides general guidelines for contribution. For detailed guidance on specific types of contributions, please refer to our specialized guides.

## 📋 Contribution pathways

We welcome different types of contributions, each with its own specialized guide:

### Content and framework development
- **[Translation Contribution Guide](/translations)**: Help make frameworks accessible in multiple languages
- **[Framework Development Guide](/get-involved/frameworks)**: Create new governance frameworks and tools
- **[Community & Outreach Guide](/get-involved/outreach)**: Spread our vision and build advocacy networks

### Technical development
- **[Website Development Guide](/get-involved/website)**: Contribute to the SvelteKit codebase and infrastructure

Each guide includes detailed workflows, quality standards, tools, and community coordination specific to that contribution type.

## 🚀 Quick start for all contributors

### General contribution process

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Create a Feature Branch**: Use a descriptive branch name, e.g., `git checkout -b feature/add-new-component`.
3. **Choose Your Guide**: Review the appropriate specialized guide above for detailed instructions.
4. **Make Changes**: Follow the specific workflows and standards outlined in your chosen guide.
5. **Test Locally**: Run `npm run dev` to test your changes in the development environment.
6. **Commit Changes**: Write clear, concise commit messages, e.g., `git commit -m 'Add support for new language in i18n'`.
7. **Push to Your Fork**: Push your branch to your fork, e.g., `git push origin feature/add-new-component`.
8. **Submit a Pull Request**: Open a PR against the main repository, describing your changes and their purpose.

### Project structure overview

```
src/
├── lib/
│   ├── components/          # Reusable Svelte components
│   ├── content/            # Markdown content files
│   │   ├── frameworks/     # Framework documentation
│   │   └── get-involved/   # Contribution guides
│   ├── i18n/              # Internationalization
│   └── utils/             # Utility functions
├── routes/                # SvelteKit pages
└── static/               # Static assets
```

## 🤖 Using AI tools in contributions

AI can be a powerful ally in developing and refining the Global Governance Framework. Below are recommendations for using specific AI tools, based on their observed strengths.

### Claude
- **Strength**: Reliable and precise for translations, especially for technical content, and serves as an excellent main workhorse for development tasks.
- **Recommended Use**: Leverage Claude for updating or expanding internationalization files, framework content development, and website code. The professional version's project feature makes it ideal for maintaining comprehensive context across all frameworks and content.
- **Best Practice**: Use Claude's project feature to maintain up-to-date knowledge of all frameworks, website content, and related materials. Cross-check translations with native speakers where possible. Iterate using reviews from DeepSeek, ChatGPT, and Grok, then implement suggestions with Claude.

### DeepSeek
- **Strength**: Highly creative at reviewing governance frameworks and suggesting complementary ideas, tools, and enhancements.
- **Recommended Use**: Use DeepSeek to brainstorm additional features, patterns, or interoperability mechanisms. Excellent for proposing new tools or frameworks that integrate with the project's vision.
- **Best Practice**: Document all DeepSeek responses in the `/docs` folder for future reference, even if not immediately implemented.

### ChatGPT
- **Strength**: Versatile and good at providing complementary translations or rephrasing content for clarity.
- **Recommended Use**: Use ChatGPT to refine language in documentation, UI text, or as a secondary tool for translations. Also useful for generating draft content for blog posts or framework descriptions.
- **Best Practice**: Pair outputs with Claude for technical accuracy or human review for tone and style.

### Grok (xAI)
- **Strength**: Excels at analyzing and summarizing complex information from diverse sources.
- **Recommended Use**: Use Grok to research governance models, distill insights from academic papers, or summarize project-related content to inform framework development.
- **Best Practice**: When using Grok for research, cite original sources and store summaries in `/docs/research/`.

### General AI usage guidelines
- **Experimentation**: Feel free to experiment with other AI tools and share findings in PRs or issues.
- **Validation**: AI outputs are suggestions, not authoritative solutions. Always review and adapt them to fit project goals.
- **Documentation**: Note AI origins in comments or commit messages (e.g., "Generated by DeepSeek, adapted by [your-name]").

## 🔧 Framework development workflow

Our frameworks are developed using an iterative AI-assisted process that has proven effective:

### Phase 1: outline development
1. **Initial outline**: Start with Grok to draft a comprehensive framework outline
2. **Multi-AI review**: Iterate between ChatGPT, DeepSeek, and Claude with prompts like:
   "Can you review and grade our framework outline (1-100/F-A++) and suggest enhancements?"
3. **Enhancement cycles**: Use Grok to implement suggestions from other AI reviews
4. **Perfection target**: Continue until reaching 100/100 (A++) scores in reviews

### Phase 2: content creation
1. **Index file creation**: Develop framework purpose, index, and tools overview
2. **Section drafting**: Use Claude or Grok to draft detailed sections (note: Grok may skip details)
3. **Quality review**: Review drafted sections with AI models for improvements
4. **Integration**: Ensure sections work together as a coherent framework

Examples of this iterative method can be found in `/docs/Implementation Framework Reviews`.

For detailed framework development guidance, see the [Framework Development Guide](/get-involved/frameworks).

## 📝 Standards and guidelines

### Code standards
- Follow existing structure in `src/` (components in `lib/components/`, routes in `routes/`)
- Use Tailwind CSS classes consistently (note: current setup has configuration issues - see [Website Development Guide](/get-involved/website))
- Update translation keys across all languages in `src/lib/i18n/`

### Content standards
All framework documentation should follow our [STYLE_GUIDE.md](STYLE_GUIDE.md) for consistency across:
- Document structure and organization
- Content formatting and terminology
- Visual elements and diagrams
- Multilingual support

### Quality assurance
Each contribution type has specific quality standards outlined in its specialized guide:
- **Translation quality**: Accuracy, cultural sensitivity, consistency
- **Framework quality**: Practical utility, evidence basis, clarity
- **Website quality**: Code standards, accessibility, performance
- **Outreach quality**: Message consistency, audience appropriateness

## 🤝 Community and support

### Getting help
- **Discord Community**: Join https://discord.gg/Zx4hMJf4JU for real-time support
  - `#translation-lab` for translation coordination
  - `#framework-development` for framework creators
  - `#community-outreach` for advocacy and outreach
  - `#dev-design` for technical development
- **GitHub Issues**: For bug reports, feature requests, or technical questions
- **Email**: globalgovernanceframework@gmail.com for general inquiries

### Contribution recognition
We value all contributions and provide:
- Recognition in contributor sections
- Acknowledgment in release notes
- Invitations to contributor events
- Professional development support
- Priority support for contributors' own projects

## 🌱 What we need most

Current high-priority contribution areas:

1. **🎨 Tailwind CSS Configuration Fix** (technical) - Resolve configuration conflicts and modernize styling
2. **🌍 Translation Expansion** (content) - Add support for new languages
3. **📋 Framework Development** (content) - Create new governance frameworks
4. **📢 Community Outreach** (outreach) - Expand our reach and advocacy
5. **🔧 Website Features** (technical) - Add new functionality and improve user experience

## 🎯 Getting started

1. **Explore our guides**: Review the specialized contribution guides linked above
2. **Join the community**: Connect with other contributors on Discord
3. **Choose your path**: Select the contribution type that matches your interests and skills
4. **Start small**: Begin with a manageable project to get familiar with our processes
5. **Ask for help**: Don't hesitate to reach out to the community for guidance

Thank you for helping us build a collaborative, interoperable future for global governance! Your contributions make a real difference in creating tools that enable better coordination and cooperation worldwide.

---

**Ready to contribute?** Visit our [Get Involved](/get-involved) section to explore detailed guides for your area of interest.
