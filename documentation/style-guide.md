# **GGF Writing & Style Guide v1.0**

## Introduction
This guide is the single source of truth for the tone, style, and formatting of all documents within the Global Governance Frameworks (GGF) ecosystem. Its purpose is to ensure our work is clear, consistent, professional, and accessible to a global audience. Adhering to this guide will help us build a coherent and trustworthy body of knowledge.

## Document Structure

### 1. Framework Organization

- **Framework Index**: Each framework must include an `index.md` file providing an overview, section links, and navigation guidance
- **Section Files**: Individual sections stored as separate markdown files following consistent naming patterns
- **Tools Directory**: Implementation tools stored in a `/tools/` subdirectory
- **Seed Kit**: Core implementation resources grouped in a `/seed-kit/` subdirectory

**The Layered Access Model**
To serve diverse audiences, foundational frameworks (like `MOS` and `AUBI`) should adopt a layered structure:

-   **Layer 1: One-Page Essence:** A shareable, public-facing summary for quick understanding.
-   **Layer 2: Core Framework:** The main document for policymakers and implementers, outlining principles, architecture, and implementation.
-   **Layer 3: Implementation Appendices:** Detailed technical specifications, crisis playbooks, case studies, and toolkits.
-   **Layer 4: Philosophical Treatise:** The deep "why" behind the framework, exploring its ethical and spiritual foundations.

### 2. Section Hierarchy and Numbering

Every framework must follow a consistent section hierarchy:

1. **Preamble/Introduction**: Vision, purpose, and context
2. **Core Principles**: Foundational values and frameworks
3. **Structural Components**: Key systems and mechanisms
4. **Implementation Approaches**: Practical deployment strategies
5. **Metrics and Evaluation**: Assessment frameworks
6. **Supporting Sections**: Specific to framework needs
7. **Appendices**: Supplementary details

Sections and subsections are not numbered to facilitate later additions and avoid cumbersome updating when inserting new sections into a sequence of sections. While major sections are not numbered, sequential steps within an implementation guide should be numbered (1., 2., 3.) for clarity.

### 3. Standard Section Components

Every section should include these elements:

```markdown
---
title: Section Title
section: section-id
---

# Section Title

**In this section:**
- [Subsection One](#subsection-one)
- [Subsection Two](#subsection-two)
- [Subsection Three](#subsection-three)

**Estimated Reading Time**: X minutes

Brief introduction paragraph that summarizes the section's purpose and content.

## <a id="subsection-one"></a>Subsection One

Content goes here...
```

### 3. Case Studies and Examples

Format all case studies consistently:

```markdown
**Case Study [Type]**: [Title]

[Region/Organization], [Year Range] implemented [approach] addressing [challenge]. Key outcomes included [measurable results]. This example demonstrates [principle/lesson relevant to framework].

**Example [Type]**: In Rwanda's post-genocide MHPSS initiatives, community-based sociotherapy facilitated collective healing for over 120,000 participants, processing 1.9 million cases while improving mental health and conflict management capacities.
```

Where [Type] should be:
- **(Real)** for documented, evidence-based implementations with verified outcomes
- **(Fictive)** for illustrative examples that demonstrate potential applications but haven't been implemented

All case studies should clearly indicate their type, with both real and fictive examples serving distinct purposes:
- **Real case studies** provide empirical evidence of successful implementation and should include specific metrics, time periods, and documented outcomes
- **Fictive case studies** illustrate potential applications in hypothetical scenarios and should be plausible, internally consistent, and clearly aligned with framework principles

The framework should strive to include both types, with real examples demonstrating proven approaches and fictive examples showcasing potential applications in contexts where implementation is still emerging.


### 4. Cross-References

Use consistent cross-reference formats:

```markdown
<!-- Within same framework -->
[Core Principles](/frameworks/docs/implementation/digital#core-principles)

<!-- To other frameworks -->
[Climate & Energy Governance](/frameworks/docs/implementation/energy)

<!-- To tools -->
[Conflict Analysis Framework](/frameworks/tools/peace/conflict-analysis-framework-en.pdf)
```

### 5. URL Path Structure and Naming

URLs are a critical part of framework accessibility, navigation, and long-term stability. Follow these guidelines for consistent and effective path structures.

#### Path Naming Principles

- **Clarity over Brevity**: Use descriptive paths that clearly indicate content.
  - **Preferred**: `/frameworks/climate-and-energy`
  - **Avoid**: `/frameworks/energy`

- **Kebab-case Format**: Use hyphens to separate words in all URL paths and filenames.
  - **Correct**: `climate-and-energy.md`
  - **Avoid**: `climateAndEnergy.md` or `climate_and_energy.md`

- **Unified Hierarchical Structure**: All detailed frameworks should follow a single, consistent path structure to simplify navigation and maintenance.
  - **Primary Structure**: `/frameworks/[framework-name]`

#### Implementation Recommendations

- **Redirect Strategy**: Because GitHub Pages does not support server-side 301 redirects, a client-side redirect file must be placed at the old URL path for any changed links. This file should contain both a meta refresh tag for users and a canonical link tag for search engines.

- **URL Stability**: Once a new URL is published under this convention, it should be considered permanent to prevent broken links.

- **File Naming**: The source markdown file should have the same kebab-case name as the final URL slug (e.g., the page at `/frameworks/climate-and-energy` should come from a file named `climate-and-energy.md`).

### 6. Contact Information and Resource References

**Development Status Transparency:**
All framework tools and documentation must accurately represent the current development status of resources and contact information. Use clear status indicators and avoid creating false expectations about non-existent services.

**Current Infrastructure Reference:**
- **Primary Contact**: globalgovernanceframeworks@gmail.com
- **Primary Website**: globalgovernanceframework.org
- **Development Status**: Include clear disclaimers about what is currently available vs. in development

**Status Indicator System:**
Use consistent status indicators throughout all documentation:
- **✅ Currently Available**: Services, tools, or resources that exist and can be accessed
- **🚧 In Development**: Planned services, tools, or resources not yet available
- **Contact for Information**: Services available on request or case-by-case basis

**Contact Information Format:**

```markdown
**Current Status Note:** The Global Guardian Framework is in active development. 
Currently available:
- ✅ Framework documentation and [specific tools available]
- ✅ General support via globalgovernanceframeworks@gmail.com
- 🚧 [Specific services] (in development)
- 🚧 [Regional networks/specialized programs] (in development)

**Contact Information:**
- **Primary Contact:** globalgovernanceframeworks@gmail.com
- **Website:** globalgovernanceframework.org
- **Subject Lines for Specific Support:**
  - "Subject A" - for [specific type of support]
  - "Subject B" - for [specific type of support]
```

**Resource Reference Guidelines:**

**For Non-Existent Resources:**
- Use placeholder format: `[Service name - in development]`
- Provide contact instructions: `[Contact globalgovernanceframeworks@gmail.com with subject "Service Request"]`
- Avoid specific URLs for unregistered domains

**For Future Resources:**
- Maintain organizational structure for easy updating
- Use descriptive placeholders that indicate future functionality
- Include contact information for current alternatives

**Regional and Specialized Support:**
- Route all specialized requests through main contact with clear subject lines
- Indicate when regional coordinators or specialized services are in development
- Provide timeline expectations where appropriate

**Funding and Program References:**
- Mark formal funding programs as "in development" unless actually available
- Provide contact information for current funding opportunity inquiries
- Include realistic timelines for program development where known

**Document Update Protocol:**
- Update contact information sections first when new infrastructure becomes available
- Maintain consistency across all tools and documents
- Test all contact methods and links before publication
- Include version dates and next review schedules for contact information sections

**Example Implementations:**
See Community Welfare Readiness Assessment, Welfare Transition Planning Template, and Cultural Adaptation Protocol Guide for consistent implementation examples.

## Content Formatting

### 1. Headings

* Use Markdown hashtags (`#`) for headings.
* The main document title is `H1` (`#`). Use H1 (`#`) only once per file
* Major sections are `H2` (`##`).
* Sub-sections are `H3` (`###`) and `H4` (`####`).
* Deep Nesting: Use H5 (`#####`) for deeply nested content
* Use title case for headings (e.g., "The Guiding Compass: Love, Meaning, and Connection Index"), but adapt for language (for example Swedish only capitalizes the first word of the sentences in titles and headers).
* ID Anchors: Add `<a id="anchor-name"></a>` before headings for cross-references

### 2. Text Formatting

### **2.2 Emphasis: Bold and Italics**

We use emphasis sparingly for maximum impact.

- **Bold Text (`**text**`):**
    - **The "First Mention" Rule:** A key defined term (e.g., `Hearts`, `Love Ledger`, `Social Resilience Council`) should only be bolded the **first time it is introduced** in a major section. Subsequent mentions should be normal text.
    - **Headings:** The primary subject of a heading should be bold if it's not already clear from the title case.
    - **Rhetorical Impact:** Use bold for short, powerful, standalone philosophical statements or calls to action.
    - **Avoid:** Do not bold every instance of a framework's name or a core concept in the body text.

- **Italic Text (`*text*`):**
    - **Subtle Emphasis:** Use for adding light emphasis to a specific word within a sentence.
    - **Direct Quotes:** Use for short, direct quotes within a paragraph.
    - **Foreign Words:** Use for non-English words that are part of the GGF lexicon (e.g., *stadgar*, *mahasamadhi*).

- **Lists**:
  - Use bullet points (`-`) for lists where the order is not critical.
  - Use numbered lists (`1.`) for step-by-step instructions or when sequence is important.

- **Blockquotes**: Use for case examples, quotes, and highlighted insights

Example:
```markdown
**Implementation Timeline** represents the scheduled progression of activities. *Teoria nodi* (node theory) informs this approach.

Key activities include:
- Stakeholder mapping
- Resource assessment
- Governance establishment

Follow these steps in order:
1. Form the core team
2. Conduct baseline assessment
3. Deploy initial mechanisms
```

### **2.3 Citations & Source Attribution**

Our citation system is designed for **author-level traceability**, not for public-facing academic-style references. Its primary purpose is to maintain a clear, verifiable audit trail during the Human-AI collaborative drafting process, allowing us to see the exact source for any given piece of information.

To keep the final text clean and readable for the public, all source citations **MUST** be placed within **HTML comment blocks**. This makes them visible in the source Markdown file but invisible on the rendered website.

**Correct Format:**
Use the format: \`\`

**Public-Facing Cross-References:**

When you want to create a visible link for the *reader* to another document, do not use the citation format. Instead, use a standard Markdown link as defined in the `Document Structure > 4. Cross-References` section.

  * **Example:**
    > The AUBI system is built on the principles of the [Moral Operating System](https://www.google.com/search?q=/frameworks/moral-operating-system).

## **Rationale:** This method perfectly balances our needs. It preserves a perfect, line-by-line audit trail for us as developers and editors working with the source files, while providing a clean, professional, and uncluttered reading experience for the public.

### 3. Case Studies and Examples

Format all case studies consistently:

```markdown
**Case Study**: [Title]

[Region/Organization], [Year Range] implemented [approach] addressing [challenge]. Key outcomes included [measurable results]. This example demonstrates [principle/lesson relevant to framework].

**Example**: In Rwanda's post-genocide MHPSS initiatives, community-based sociotherapy facilitated collective healing for over 120,000 participants, processing 1.9 million cases while improving mental health and conflict management capacities.
```

### 4. Implementation Guidance

Structure implementation sections consistently:

```markdown
### Step X: [Action Title] ([Timeframe])
- **Action**: Implement [specific approach] to achieve [outcome].
  - [Bullet points with specific tasks/substeps]
  - [Additional implementation details]
- **Tool**: **[Tool Name]** for [purpose].
- **Metric**: [Target]% [achievement] by [date], tracked via [method].
- **Actors**: [Responsible stakeholders].
```

### 5. Risk and Mitigation Tables

Use consistent table format for risks:

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk description] | Low/Medium/High | Low/Medium/High | [Specific mitigation strategies] |

## Visual Elements

### 1. Diagrams

- **File Format**: SVG preferred for web; PNG as fallback
- **Naming Convention**: `[framework]-[concept]-[diagram-type].svg`
- **Color Palette**: Use the established color scheme (primary: #3A6EA5, #6DAA3F, #C43B3B, #F5A623)
- **Alt Text**: All diagrams must include descriptive alt text

### 2. Tables

Format tables with header row emphasis:

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Content  | Content  | Content  |
```

### 3. User Interface Elements

- **Buttons**: Reference using bold with descriptive text, e.g., **Submit Form button**
- **Fields**: Reference using italics, e.g., *Email Address field*
- **Menu Paths**: Use > to indicate navigation, e.g., Settings > Preferences > Notifications

### 1. Voice and Tone

Our voice should always be:

* **Visionary yet Grounded:** We balance profound, long-term vision with practical, actionable steps.
* **Accessible yet Rigorous:** We use clear, simple language to explain complex ideas without sacrificing intellectual depth.
* **Hopeful but Realistic:** We acknowledge the scale of the world's challenges while maintaining a core belief in humanity's potential to solve them.
* **Collaborative and Inclusive:** We use "we" and "our" to reflect the collaborative nature of the project.

It should always reflect our core philosophy. Key themes to weave into our writing include:

-   **Right Relationship:** The central concept of interconnected, regenerative systems.
-   **Flourishing:** Our goal is not just sustainability or survival, but the flourishing of all life.
-   **Indigenous-Guided:** We explicitly state that our work is guided by and defers to Indigenous wisdom and sovereignty.
-   **Human-AI Collaboration:** We are open about our development process, positioning it as a strength that ensures rigor and multi-perspective analysis.

### 2. Common Terms

Always use the full, official name on first mention in a document (e.g., "the **Treaty for Our Only Home**"). Subsequent mentions can use a shortened, un-bolded version (e.g., "the Treaty").

Standardize these key terms across all frameworks:

| Term | Definition | Usage Notes |
|------|------------|-------------|
| Framework | The complete governance system for a domain | Capitalize when referring to specific frameworks |
| Implementation | The process of deploying framework components | Use "implementation" not "execution" |
| Governance | The systems for decision-making and accountability | Distinguish from "government" |
| Stakeholder | Any entity affected by or influencing the framework | Be specific about stakeholder types when possible |
| Node | A local implementation unit | Consistent across all frameworks |
| Hub | A regional coordination entity | Consistent across all frameworks |
| Council | A governing body at any level | Specify level (Local, Regional, Global) |

### 3. Abbreviations and Acronyms

- When introducing an acronym, write out the full term first, followed by the acronym in parentheses. For example: "Love, Meaning, and Connection Index (LMCI)." You can then use "LMCI" for subsequent mentions.
- Create glossary sections in framework indexes for reference
- Minimize acronym usage in user-facing documentation

### 4. Inclusive Language

- Use gender-neutral terms (e.g., "humanity" not "mankind")
- Represent diverse examples from various regions and cultures
- Avoid culturally specific metaphors that may not translate well
- Use person-first language for disabilities when appropriate

## Technical Standards

### 1. Markdown Usage

- Use dashes for unordered lists, not asterisks
- Add blank lines before and after lists and code blocks
- Use triple backticks for code blocks with language specification
- Use HTML sparingly, primarily for anchors and complex tables

### 2. File Naming

- Use kebab-case for all file names: `implementation-roadmap.md`
- Include clear descriptors in file names
- For language variants, add language code: `quick-guide-en.md`

### 3. Front Matter

Include consistent front matter:

```markdown
---
title: Full Title of Section
section: section-id
revision: Version X.X (YYYY-MM-DD)
---
```

### 4. Links and References

- Use relative paths for internal links
- Use absolute URLs for external references
- Create permanent link anchors for all major sections
- Include file extensions in links

## Multilingual Support

### 1. Translation Workflow

- Keep sentences concise to facilitate accurate translation
- Maintain original English document as the source of truth
- Update all language versions when source content changes
- Add language code to filename: `index-fr.md`

### 2. Non-Translatable Elements

- Maintain code examples in original form
- Preserve proper names unless official translations exist
- Keep standard technical terms consistent
- Maintain formatting elements across translations

### 3. Cultural Adaptation

- Replace culture-specific examples with relevant local examples
- Adapt metaphors to maintain meaning across cultures
- Adjust reading level to equivalent complexity in target language
- Consider regional variations within languages (e.g., Latin American Spanish vs. European Spanish)

## Tools and Resources Documentation

### 1. Tool Description Format

```markdown
## Tool Name

**Purpose**: Brief description of what the tool does

**Format**: [PDF/Interactive/Template/App]

**Primary Users**: [Stakeholder types]

**When to Use**: Guidance on appropriate use cases

**Key Features**:
- Feature one
- Feature two

**Integration**: How this tool connects with other framework components

**Access**: [Link to tool]
```

### 2. Usage Examples

Include concrete examples showing how to use tools:

```markdown
**Example Usage**: A community in Bangladesh used the Resource Mapping Tool to identify local assets before establishing their Digital Commons Node, resulting in 40% higher participation rates.
```

## Specific Framework Elements

Each framework may have unique elements, but should adapt them to these general guidelines while maintaining framework-specific terminology where necessary.

## Implementation and Maintenance

This style guide will be:
- Referenced during content creation and review
- Updated annually based on user feedback
- Applied gradually to existing content
- Enforced for all new content

## Appendix: Quick Reference

### Document Structure Checklist
- [ ] Appropriate title and front matter
- [ ] Table of contents
- [ ] Estimated reading time
- [ ] Introduction paragraph
- [ ] Consistent heading structure
- [ ] Cross-references to related content
- [ ] Conclusion or summary

### Formatting Checklist
- [ ] Headings use correct hierarchy
- [ ] Lists formatted consistently
- [ ] Tables have header rows
- [ ] Code blocks specify language
- [ ] Images include alt text
- [ ] Links use proper format
- [ ] Case studies follow template


