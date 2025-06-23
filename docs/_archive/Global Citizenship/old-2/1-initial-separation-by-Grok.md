# Global Citizenship Framework: Page Architecture & Technical Notes

## 🧩 Page Architecture (Draft 1)

| Section                            | Purpose                                                  | Suggested Components                                                                                      | Interactivity Ideas                                                               |
| ---------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Hero Section**                   | Inspire instantly with identity, purpose, and invitation | Large poetic headline, rotating quote, visual background (Earth animation, abstract globe, cosmic spiral) | Parallax scroll, glow/motion on scroll, “I am a global citizen” click affirmation |
| **What is Global Citizenship?**    | Define the concept in both serious and fun terms         | Dual column: poetic definition + infographic list                                                         | Toggle: poetic vs. practical view                                                 |
| **10 Core Values**                 | Present the ethical foundation                           | Card grid (1 per value), emoji icon, expandable                                                           | Flip cards / hover or click expands each with examples                            |
| **Levels of Practice (1–5)**       | Showcase the developmental path                          | Visual progression (timeline, spiral, mountain, tree)                                                     | Interactive slider or stage selector with animated content reveal                 |
| **Digital Stewardship Highlight**  | Introduce new concept                                    | Animated checklist or ritual card                                                                         | Toggle: “What I can let go of today” prompt                                       |
| **Daily Micro-Practices**          | Make it actionable & habitual                            | Ritual cards / checkboxes / scrollable prompt bar                                                         | Save favorite practices to localstorage                                           |
| **Your Story + Community Gallery** | Personalization, connection, real-world relevance        | Story form, avatar upload, story carousel or map view                                                     | “Add your story” form with moderation                                             |
| **Learning & Resources**           | Link to guides, longform docs, deeper learning           | Resource cards / toolkits / Markdown previews                                                             | Filterable by audience (teacher, youth, etc.)                                     |
| **Interactive Assessment**         | Self-awareness + gamified insight                        | Quiz / slider / multi-choice to calculate level                                                           | Shareable results, “what’s next for me” callout                                   |
| **The Global Ripple Effect**       | Show impact across scales                                | Animated ripple/circle graphic                                                                            | User interaction triggers “ripple”                                                |
| **Join the Movement**              | Invitation to action                                     | Discord, story submission, toolkit download, newsletter                                                   | Pulse button or magical "Join Us" UI                                              |

## 🛠️ Technical Implementation Notes

* **SvelteKit routing** for modular page sections or subroutes
* **Markdown** for values, practices, rituals, and glossary (easy content updates)
* **LocalStorage** for saved rituals, story drafts, assessment scores
* **SVG or Canvas animations** for ripple/movement/globe
* **Translation-ready** (start with English/Swedish via JSON)
* **Accessibility focus**: tabbing, alt text, readable contrast

## 🌀 Optional Names for the New Experience

* **The Global Citizenship Journey**
* **Awaken the Citizen Within**
* **We Are One: Live It**
* **The Ripple Begins With You**
* **From Local to Planetary**