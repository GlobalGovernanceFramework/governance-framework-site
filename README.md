# Global Governance Frameworks Website

This repository contains the source code for the Global Governance Frameworks website, a platform dedicated to developing and sharing frameworks for governance interoperability and meta-governance structures.

## Project Vision

The Global Governance Frameworks project aims to create tools, patterns, and frameworks that enable different governance systems to interoperate, share lessons, and evolve together. Rather than proposing a single governance solution, we're building infrastructure that allows many models to coexist, communicate, and collaborate.

## Technologies

- **Frontend**: SvelteKit, Tailwind CSS
- **Internationalization**: Custom i18n implementation
- **Form Handling**: Formspree
- **Deployment**: [TBD]

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:GlobalGovernanceFramework/governance-framework-site.git
cd governance-framework-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev -- --open
```

### Internationalization

The website supports multiple languages through a custom i18n implementation. Translation files are stored in `src/lib/i18n/[language-code]/`.

To add or modify translations:
1. Find the appropriate JSON file in the language directory
2. Update or add new translation keys
3. Ensure all languages have the same translation keys

### Tailwind CSS Setup

If you encounter issues with Tailwind CSS, follow these steps to fix:

```bash
# Uninstall current Tailwind packages
npm uninstall tailwindcss postcss autoprefixer @tailwindcss/typography @tailwindcss/forms

# Install fresh versions
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography @tailwindcss/forms

# Initialize Tailwind with the proper configuration
npx tailwindcss init -p
```

Then update the `tailwind.config.js` file:

```javascript
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

## Project Structure

```
├── src/
│   ├── app.css           # Main CSS file with Tailwind directives
│   ├── app.html          # HTML template
│   ├── lib/
│   │   ├── components/   # Reusable Svelte components
│   │   ├── i18n/         # Internationalization system
│   ├── routes/           # SvelteKit pages
├── static/               # Static assets
├── CONTRIBUTING.md       # Contribution guidelines
├── README.md
├── static/
│   ├── get-involved/
│   │   ├── STYLE_GUIDE.md # Documentation of standards and best practices for framework contributions
├── svelte.config.js      # SvelteKit configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json
```


## Contributing

Contributions are welcome in any area! Please feel free to submit a Pull Request. 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Join the [Discord server](https://discord.gg/Zx4hMJf4JU) for discussions.

### Website code

For detailed guidelines on how to contribute to the website code, see the guide on the website or [in the repo](/src/lib/content/get-involved/website/en/technical-guide.md)

### Frameworks

For detailed guidelines on how to contribute to the frameworks, see the guide on the website or [in the repo](/src/lib/content/get-involved/frameworks/en/frameworks-guide.md)

### Translations

To contribute to translations, see the guide on the website or [in the repo]((/src/lib/content/get-involved/translations/en/translation-guide))

### Outreach

For detailed guidelines on how to contribute to outreach, see the guide on the website or [in the repo](/src/lib/content/get-involved/outreach/en/outreach-guide.md)


## License

This project utilizes a dual-license model to best serve our open-source goals:

- **All source code** for the website is licensed under the [MIT License](LICENSE.md).
- **All written content and frameworks** (e.g., `.md` files) are licensed under the [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](LICENSE.md).

Please see the [LICENSE.md](LICENSE.md) file for the full text of both licenses.

## Contact

Email: globalgovernanceframeworks@gmail.com
GitHub: https://github.com/GlobalGovernanceFramework
