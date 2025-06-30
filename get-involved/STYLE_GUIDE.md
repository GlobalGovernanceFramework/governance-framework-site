# Global Governance Framework Documentation Style Guide

## Purpose and Scope

This style guide establishes consistent standards for all Global Governance Framework documentation. It aims to:

- Ensure coherent presentation across all frameworks
- Improve readability and accessibility
- Facilitate multilingual translation
- Support efficient content development and maintenance
- Enable users to navigate seamlessly between frameworks

These guidelines apply to all new content creation and should be gradually implemented when updating existing documentation.

## Document Structure

### 1. Framework Organization

- **Framework Index**: Each framework must include an `index.md` file providing an overview, section links, and navigation guidance
- **Section Files**: Individual sections stored as separate markdown files following consistent naming patterns
- **Tools Directory**: Implementation tools stored in a `/tools/` subdirectory
- **Seed Kit**: Core implementation resources grouped in a `/seed-kit/` subdirectory

### 2. Section Hierarchy and Numbering

Every framework must follow a consistent section hierarchy:

1. **Preamble/Introduction**: Vision, purpose, and context
2. **Core Principles**: Foundational values and frameworks
3. **Structural Components**: Key systems and mechanisms
4. **Implementation Approaches**: Practical deployment strategies
5. **Metrics and Evaluation**: Assessment frameworks
6. **Supporting Sections**: Specific to framework needs
7. **Appendices**: Supplementary details

Numbering should follow these patterns:
- **Major sections**: Use sequential numbers (e.g., `01-introduction.md`, `02-core-principles.md`)
- **Subsections**: For document organization, use decimal notation (e.g., 2.1, 2.2)

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

- **Section Titles**: Use H1 (`#`) only once per file
- **Subsections**: Use H2 (`##`) as the primary division
- **Deep Nesting**: Use H3-H5 (`###`, `####`, `#####`) for nested content
- **Heading Style**: Use title case for all headings
- **ID Anchors**: Add `<a id="anchor-name"></a>` before headings for cross-references

### 2. Text Formatting

- **Emphasis**: Use bold (`**text**`) for definitions, key points, and important terms
- **Italics**: Use italics (`*text*`) for foreign terms or mild emphasis
- **Lists**: Use unordered lists for collections without sequence; ordered lists for sequential steps
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

## Terminology and Language

### 1. Voice and Tone

- **Voice**: Authoritative yet accessible; balancing technical precision with clarity
- **Tone**: Hopeful and action-oriented, emphasizing possibility while acknowledging challenges
- **Perspective**: Use third person for frameworks ("The framework provides...") and second person for guidance ("You can implement...")

### 2. Common Terms

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

- Define all acronyms on first use in each document: "Adaptive Universal Basic Income (AUBI)"
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

# Framework Development & Positioning Guidelines
## Addition to Global Governance Framework Documentation Style Guide

### Framework Authority & Development Positioning

All Global Governance Framework documentation must accurately represent the development methodology and authority level while maintaining appropriate confidence in the substantive research and analysis contained within each framework.

#### Development Methodology Description

**Standard Language for Framework Development**:
Use consistent language across all frameworks to describe the development approach:

```markdown
**Framework Development**: This [framework/guide/toolkit] is part of the Global Governance Framework initiative, developed through iterative refinement using multiple AI systems (Claude, ChatGPT, DeepSeek, Grok, and Gemini) to achieve comprehensive research synthesis and maximize diversity of analytical perspectives.

**Research Foundation**: The framework integrates evidence-based practices, international best practices, and established [domain-specific] principles while [specific focus area, e.g., "honoring diverse cultural approaches" or "prioritizing community sovereignty"].
```

#### Authority Level Positioning

**Appropriate Confidence Level**:
- **Acknowledge Individual Development**: Be transparent that frameworks are developed by an individual researcher
- **Emphasize Research Rigor**: Highlight the iterative AI refinement process and evidence integration
- **Maintain Intellectual Humility**: Include appropriate caveats about local adaptation needs
- **Assert Substantive Value**: Present frameworks as serious contributions based on comprehensive analysis

**Avoid**:
- Overly institutional language that implies organizational authority not yet established
- Excessive disclaimers that undermine the substantial research foundation
- Claims of operational programs or services not yet available
- False modesty that diminishes legitimate research contributions

#### Context-Specific Applications

**For Framework Overviews and Major Documents**:
```markdown
**Development Note**: This framework represents comprehensive research synthesis developed through iterative refinement using multiple AI systems, integrating evidence-based practices with [domain-specific approaches]. While developed by an individual researcher, the framework draws from established [relevant field] principles and international best practices.

**Implementation Guidance**: The framework provides research-based guidance for [specific application]. Local implementation should involve consultation with [relevant stakeholders] familiar with specific contexts and requirements.
```

**For Implementation Tools and Practical Guides**:
```markdown
**Framework Foundation**: This [tool/guide] is part of the [Framework Name], developed through iterative research synthesis and AI-assisted analysis to integrate best practices with [specific focus].

**Local Adaptation**: While grounded in research and established practices, implementation should involve consultation with [relevant local experts] familiar with specific cultural, legal, and contextual requirements.
```

**For Conceptual or Theoretical Sections**:
```markdown
**Research Approach**: This analysis represents comprehensive research synthesis developed through iterative refinement across multiple AI systems to maximize analytical diversity and evidence integration.

**Theoretical Framework**: While conceptual, this framework draws from established [relevant field] research and international best practices in [specific area].
```

#### Stakeholder Engagement Language

**When Describing Consultation Needs**:
- Use "should involve consultation with" rather than "requires validation by"
- Specify relevant stakeholder types (e.g., "mental health professionals," "community leaders," "traditional healers")
- Emphasize collaboration rather than subordination to external authority
- Maintain framework integrity while acknowledging local expertise needs

**When Describing Implementation Support**:
- Be honest about current capacity and availability
- Use development status indicators (✅ Currently Available, 🚧 In Development)
- Provide clear contact information and realistic response expectations
- Avoid promising services or support not yet operational

#### Research Citation and Evidence Base

**When Referencing Research**:
- Distinguish between real case studies (documented implementations) and conceptual examples (illustrative scenarios)
- Use **(Real)** and **(Conceptual)** indicators for case studies
- Cite specific research when available while acknowledging synthesis nature of framework development
- Present evidence integration as strength rather than limitation

**Research Synthesis Language**:
```markdown
This framework integrates research findings from [specific sources when available] with analysis across multiple domains to provide comprehensive guidance for [specific application]. The iterative development process across multiple AI systems ensures diverse analytical perspectives and comprehensive evidence consideration.
```

#### Quality and Rigor Indicators

**Emphasize Analytical Rigor**:
- Highlight the iterative refinement process as quality assurance
- Note the multi-AI approach as ensuring diverse perspectives
- Emphasize evidence integration and synthesis methodology
- Present comprehensive scope as analytical strength

**Acknowledge Limitations Appropriately**:
- Note individual development while emphasizing research foundation
- Include local adaptation needs without undermining framework value
- Acknowledge evolving nature of frameworks while maintaining current utility
- Balance humility with confidence in substantive contributions

#### Consistency Across Frameworks

**Maintain Parallel Structure**:
- Use similar positioning language across all frameworks
- Adapt stakeholder consultation language to domain-specific needs
- Maintain consistent tone and authority level across documents
- Ensure development status transparency across all materials

**Domain-Specific Adaptations**:
- **Mental Health**: Emphasize lived experience integration and cultural competency needs
- **Environmental**: Highlight indigenous knowledge and local ecological expertise
- **Economic**: Note policy and implementation complexity requiring local adaptation
- **Technology**: Emphasize community sovereignty and digital rights considerations

#### Version Control and Updates

**Framework Evolution Language**:
```markdown
**Living Document Status**: This framework is designed for continuous improvement based on implementation experience and emerging research. Current version represents comprehensive analysis as of [date] with regular updates planned based on feedback and new developments.
```

**Update Protocols**:
- Include version numbers and dates for major updates
- Maintain changelog for significant modifications
- Preserve core positioning language across versions
- Update development status indicators as capacity grows

### Implementation Checklist

When creating new framework documents, ensure:

- [ ] Appropriate development methodology description included
- [ ] Authority level accurately represented (neither overstated nor understated)
- [ ] Local adaptation needs specified without undermining framework value
- [ ] Current capacity honestly represented with development status indicators
- [ ] Research foundation emphasized while acknowledging individual development
- [ ] Domain-specific stakeholder consultation needs clearly specified
- [ ] Contact information realistic and currently available
- [ ] Consistent tone and positioning with other framework documents

### Examples of Effective Positioning

**Strong Positioning (Recommended)**:
> "This framework represents comprehensive research synthesis developed through iterative refinement using multiple AI systems, integrating evidence-based practices with community-led approaches. While developed by an individual researcher, the framework draws from established mental health principles and international best practices."

**Weak Positioning (Avoid)**:
> "This is just a theoretical framework developed by one person and should not be taken seriously without extensive professional validation."

**Overstated Positioning (Avoid)**:
> "This framework represents the definitive approach to global mental health governance, developed by our comprehensive research team with extensive operational experience."

**Balanced Positioning (Recommended)**:
> "The framework provides research-based guidance for community mental health transformation. Local implementation should involve consultation with mental health professionals, community leaders, and traditional healers familiar with specific cultural and legal contexts."

This positioning approach maintains intellectual honesty while asserting the legitimate value of comprehensive research synthesis and multi-perspective analytical development.

**IMPORTANT**: Save the framework positioning for the end where it provides helpful context without interrupting the main content flow to avoid reader fatigue.
