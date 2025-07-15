# Global Governance Frameworks Website

This repository contains the source code for the Global Governance Frameworks website, a platform dedicated to developing and sharing frameworks for governance interoperability and meta-governance structures.

## Project Vision

The Global Governance Frameworks project is an open and evolving repository of ideas. Some of these explorations might offer patterns for addressing planetary challenges. Others might simply spark new thinking or serve as compost for entirely different solutions. Both outcomes are valuable.

Our goal is not to prescribe what the world needs, but to offer a mycelial network of possibilities—ideas that can take root in your work, adapt to your context, or inspire something completely unexpected. Think of this as a library to borrow from, spores to plant in different soil, and a conversation to join—freely and without obligation.

The ideas within this repository often explore three interconnected themes:

* ⚖️ **The Hardware (The Treaty for Our Only Home):** Explorations in legal and institutional patterns for effective collective action.
* 🪶 **The Heart (Indigenous & Traditional Knowledge):** An ethical and philosophical compass for ensuring solutions are just and regenerative.
* 🌐 **The Nervous System (Integrated Meta-Governance):** Inspirations for adaptive coordination and collaboration between diverse systems.

You are free to adopt, adapt, ignore, or use any part of this work as inspiration for something entirely different. The world has enough comprehensive solutions—what it needs is more freedom to experiment, more ways for good work to connect, and more permission to start small and see what grows.

## What Are the Frameworks?

The "frameworks" are a collection of thought experiments, patterns, and proposals. Think of them not as a rigid, interconnected system to be implemented, but as a library of starting points. You are free to adopt, adapt, or discard any part of them. They are offered as inspiration for tackling challenges related to social, economic, and ecological well-being.

Some of the concepts explored in this repository include:

* The **Moral Operating System (MOS)**, a thought experiment for defining the rights of all beings.
* The **Adaptive Universal Basic Income (AUBI)** framework, a conceptual engine for security and purpose.
* The **Financial Systems Framework**, which explores new value currencies like `Hearts` and `Leaves` to reward care and ecological stewardship.

Exploring these documents is the best way to find ideas that might be useful for your own work.

## Technologies

- **Frontend**: SvelteKit, Tailwind CSS
- **Internationalization**: Custom i18n implementation
- **Form Handling**: Formspree
- **Deployment**: GitHub pages for now. [TBD]

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:GlobalGovernanceFrameworks/governance-framework-site.git
cd governance-frameworks-site
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

The repository is organized into several key directories. Here is a high-level overview:

- **/src/**: The main SvelteKit application source code.
  - **/src/routes/**: Defines all pages and URL structures for the website. This is where you'll find the Svelte files for each page.
  - **/src/lib/content/**: Contains the core Markdown content for all the frameworks. This is the primary location for editing framework text.
  - **/src/lib/components/**: Contains reusable Svelte components used across the site (e.g., Header, custom cards, visualizations).
  - **/src/lib/stores/**: Svelte stores for managing global state, such as the navigation structure (`frameworkNav.js`).
  - **/src/lib/i18n/**: Holds the JSON files for internationalization and translation.
- **/static/**: Contains static assets like images (logo.svg), PDFs, and other files that don't need processing.
- **/documentation/**: Houses internal project documentation, including the `style-guide.md`, strategic plans, and archives. This content is for contributors and is not part of the live website.
- **/source-materials/**: Frameworks outlines from the iterative creation process.
- **/CONTRIBUTING.md**: Guidelines for how to contribute to the project.


## Contributing

We welcome contributions of all kinds, from code and content to translations and community outreach!

### Code Contributions

If you'd like to contribute to the website code, please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

### Frameworks, Translations, and Outreach

Our project thrives on diverse forms of contribution. For detailed guidelines on how to get involved in specific areas, please see our guides:

- **Frameworks:** To contribute to the framework documents, see the [Frameworks Contribution Guide](/src/lib/content/get-involved/frameworks/en/frameworks-guide.md).
- **Translations:** To help translate the frameworks and website, see the [Translation Guide](/src/lib/content/get-involved/translations/en/translation-guide).
- **Outreach:** To help with community building and outreach, see the [Outreach Guide](/src/lib/content/get-involved/outreach/en/outreach-guide.md).

### Community Discussion

For general questions or to contact the team, please email us at [globalgovernanceframeworks@gmail.com](mailto:globalgovernanceframeworks@gmail.com). We maintain a private Discord server for active, ongoing contributors to facilitate closer collaboration.

## License

This project utilizes a dual-license model to best serve our open-source goals:

- **All source code** for the website is licensed under the [MIT License](LICENSE.md).
- **All written content and frameworks** (e.g., `.md` files) are licensed under the [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](LICENSE.md).

Please see the [LICENSE.md](LICENSE.md) file for the full text of both licenses.

## Contact

Email: globalgovernanceframeworks@gmail.com
GitHub: https://github.com/GlobalGovernanceFrameworks
