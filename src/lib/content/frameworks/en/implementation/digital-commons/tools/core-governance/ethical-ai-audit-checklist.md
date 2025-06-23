# Ethical AI Audit Checklist: Digital Commons Framework

**Estimated Reading Time**: 10 minutes

**Purpose**: This checklist enables communities to systematically evaluate Artificial Intelligence systems within the *Digital Commons Framework*, ensuring they uphold ethical standards, community values, and human rights. Designed for use by Local Citizen Nodes and the AI Governance Board, it provides structured assessment criteria requiring minimal technical expertise, with adaptations for varying resource contexts. Based on global AI ethics principles and aligned with Core Principles like transparency and resource justice, it helps communities identify bias, privacy risks, and environmental impacts while ensuring AI systems serve rather than harm community interests. Regular audits using this checklist promote continual improvement and accountability across the framework's Ethical AI Models component.

---

## Table of Contents
- [Overview](#overview)
- [How to Use This Checklist](#how-to-use-this-checklist)
- [Section 1: Bias and Fairness Assessment](#section-1-bias-and-fairness-assessment)
- [Section 2: Transparency and Explainability](#section-2-transparency-and-explainability)
- [Section 3: Privacy and Data Governance](#section-3-privacy-and-data-governance)
- [Section 4: Safety and Security](#section-4-safety-and-security)
- [Section 5: Environmental and Social Impact](#section-5-environmental-and-social-impact)
- [Section 6: Accountability Mechanisms](#section-6-accountability-mechanisms)
- [Audit Process Guide](#audit-process-guide)
- [Adaptation for Different Contexts](#adaptation-for-different-contexts)
- [Case Examples](#case-examples)
- [Resources](#resources)

---

## Overview
The Ethical AI Audit Checklist provides a structured framework for evaluating AI systems within the Digital Commons Framework, ensuring they align with community values, ethical principles, and human rights. This tool addresses a critical need as AI systems increasingly affect decision-making, resource allocation, and information access.

**Key Benefits**:
- **Comprehensive Assessment**: Evaluates all aspects of AI ethics without requiring deep technical expertise
- **Accessibility**: Usable by communities with varying levels of resources and technical knowledge
- **Adaptability**: Customizable to different cultural contexts and specific applications
- **Actionable Results**: Produces clear findings that guide improvements or governance decisions

The checklist supports the framework's commitment to:
- **Ethical AI Models**: 95% compliance with ethical standards by 2030
- **Transparency**: Complete auditability of AI systems by 2032
- **Equity**: Fair outcomes across all demographic groups by 2035
- **Community Control**: Local governance of AI applications affecting communities

Regular audits using this checklist help prevent harmful outcomes like bias, privacy violations, and exploitation while ensuring AI systems serve rather than harm community interests.

---

## How to Use This Checklist
This checklist can be applied to any AI system used within the Digital Commons Framework, from simple automated decision tools to complex machine learning models.

### When to Conduct an Audit
- **Initial Deployment**: Before implementing any new AI system
- **Regular Review**: At least annually for all AI systems
- **Significant Updates**: Whenever systems are substantially modified
- **Reported Concerns**: When community members identify potential issues
- **Changed Context**: When societal, cultural, or technological conditions evolve

### Audit Team Composition
For balanced assessment, include (minimum 3 people):
- **Technical Representative**: Person with understanding of the AI system
- **Community Representative**: Person representing affected community
- **Governance Representative**: Person familiar with ethical principles and policies
- **Optional**: Additional representatives from marginalized groups or specific stakeholders

### Materials Needed
- **Basic**: This checklist, audit documentation form, Field-Test Logbook
- **Standard**: Above plus system documentation, test datasets
- **Advanced**: Above plus monitoring tools, technical analysis software

### Time Required
- **Simple AI System**: 2-3 hours
- **Moderate Complexity**: 1 day
- **Complex System**: 2-3 days
- **High-Risk Application**: 3-5 days with extended testing

### Documentation
- Record all findings in the AI Audit Report Template
- Include specific evidence for each assessment
- Note areas needing improvement and recommended actions
- Document all audit team members and their roles
- Store report in Field-Test Logbook and share with Regional Hub

**Example**: Singapore's education node conducts quarterly audits of its learning recommendation AI, with a five-person team including a teacher, student, technical expert, parent, and node facilitator, completing the process in one day.

---

## Section 1: Bias and Fairness Assessment
Evaluate whether the AI system produces equitable outcomes across different groups and contexts.

### 1.1 Training Data Representation
- □ **Data includes diverse representation** across relevant demographic characteristics (e.g., gender, ethnicity, age, disability status)
- □ **Historical biases in data have been identified and addressed**
- □ **Data collection methods were inclusive** and did not systematically exclude groups
- □ **Community input was incorporated** into data selection and preparation

**Evaluation Methods**:
- Review documentation of data sources and composition
- Interview data collection team about inclusion strategies
- Analyze demographic distribution of training data if accessible
- Consult community representatives from diverse groups

**Example Question**: "Does the agricultural AI include data from both large commercial farms and small subsistence farmers?"

### 1.2 Outcome Testing
- □ **System produces similar accuracy rates** across different demographic groups
- □ **Benefits and harms are distributed equitably** among users and affected communities
- □ **System has been tested with diverse scenarios** relevant to community context
- □ **Edge cases and minorities receive appropriate consideration**

**Evaluation Methods**:
- Run test cases representing different community groups
- Compare outcomes across demographic categories
- Analyze system performance in unusual or edge cases
- Solicit feedback from traditionally marginalized groups

**Example Question**: "Does the health recommendation system perform equally well for both common and rare conditions affecting our community?"

### 1.3 Algorithmic Fairness
- □ **Clear fairness metrics have been defined** and are regularly measured
- □ **System addresses potential proxy discrimination** (where seemingly neutral factors correlate with protected attributes)
- □ **Multiple fairness definitions were considered** (e.g., equal opportunity, demographic parity)
- □ **Trade-offs between different fairness criteria** were evaluated with community input

**Evaluation Methods**:
- Review fairness metrics and monitoring reports
- Discuss fairness definitions used with technical team
- Examine how proxy variables are handled
- Verify community involvement in fairness decisions

**Example Question**: "When making loan recommendations, does the system avoid using factors that indirectly correlate with protected characteristics?"

### 1.4 Cultural Appropriateness
- □ **System respects cultural norms and values** of the community
- □ **Local knowledge and perspectives informed design** and implementation
- □ **System avoids cultural appropriation** or exploitation
- □ **Cultural context is preserved** in data and outputs

**Evaluation Methods**:
- Consult cultural knowledge holders within community
- Review system outputs for cultural sensitivity
- Check if cultural protocols were followed during development
- Verify attribution of cultural knowledge where appropriate

**Example Question**: "Does the AI appropriately handle cultural knowledge about medicinal plants with proper attribution and respect for Indigenous protocols?"

**Bias and Fairness Rating**:
- **Strong**: Meets all criteria with documented evidence
- **Adequate**: Meets most criteria with minor improvements needed
- **Needs Improvement**: Significant gaps requiring immediate attention
- **Unacceptable**: Major fairness concerns making system unsuitable for use

---

## Section 2: Transparency and Explainability
Assess whether the AI system is understandable and open to scrutiny by the community.

### 2.1 Documentation Transparency
- □ **System purpose and capabilities are clearly documented** in accessible language
- □ **Limitations and potential risks are explicitly stated**
- □ **Technical documentation is available** for appropriate review
- □ **Development process is documented**, including key decisions and trade-offs

**Evaluation Methods**:
- Review all available system documentation
- Check for plain language explanations
- Verify documentation of limitations and risks
- Assess completeness of technical information

**Example Question**: "Is there clear documentation about what the mobility prediction system can and cannot do, written in language community members can understand?"

### 2.2 Explainability of Decisions
- □ **System can explain its outputs** in understandable terms
- □ **Key factors influencing decisions are identifiable**
- □ **Complex outcomes include supporting evidence**
- □ **Explanations are accessible** to people with different levels of technical knowledge

**Evaluation Methods**:
- Test system with sample cases and review explanations
- Have non-technical users evaluate explanation clarity
- Check if influential factors are identified in outputs
- Verify explanations are consistent with system behavior

**Example Question**: "When the agricultural AI recommends a specific planting time, does it explain which factors (rainfall patterns, soil conditions, etc.) influenced this recommendation?"

### 2.3 Algorithmic Transparency
- □ **General approach and methodology are publicly disclosed**
- □ **Level of human oversight and intervention is clearly defined**
- □ **Key performance metrics are regularly reported**
- □ **Decision boundaries and confidence levels are available** when appropriate

**Evaluation Methods**:
- Review algorithm documentation and descriptions
- Check for disclosure of human-in-the-loop processes
- Verify public reporting of performance metrics
- Assess if uncertainty is appropriately communicated

**Example Question**: "Does the health risk assessment system clearly communicate when its predictions have low confidence and require human medical review?"

### 2.4 Community Accessibility
- □ **Information is available in local languages**
- □ **Non-technical summaries exist** for general community understanding
- □ **Multiple formats are available** (e.g., written, visual, oral) for diverse accessibility needs
- □ **Community members can meaningfully engage** with system information

**Evaluation Methods**:
- Check availability of materials in relevant languages
- Review accessibility of information formats
- Test non-technical summaries with community members
- Assess engagement mechanisms for inclusivity

**Example Question**: "Is information about the water management AI available in pictorial formats for community members who prefer visual learning?"

**Transparency Rating**:
- **Strong**: Comprehensive transparency with multiple accessibility provisions
- **Adequate**: Basic transparency with some accessibility considerations
- **Needs Improvement**: Insufficient transparency requiring specific enhancements
- **Unacceptable**: Opaque system with minimal explanation or accessibility

---

## Section 3: Privacy and Data Governance
Evaluate how the AI system protects data privacy and respects community sovereignty.

### 3.1 Data Minimization
- □ **Only necessary data is collected** for the system's legitimate purpose
- □ **Data retention periods are clearly defined** and enforced
- □ **Data collection is proportionate** to the stated purpose
- □ **Options exist for limited data sharing** or anonymous use

**Evaluation Methods**:
- Review data collection specifications
- Check retention policies and implementation
- Assess necessity of each data element
- Verify options for minimal data participation

**Example Question**: "Does the transportation planning AI collect only location data necessary for its function, or does it gather excessive personal information?"

### 3.2 Consent and Control
- □ **Clear consent mechanisms exist** for all data subjects
- □ **Consent is informed, specific, and revocable**
- □ **Community-level consent is obtained** when appropriate
- □ **Data subjects can access, correct, and delete their data**

**Evaluation Methods**:
- Review consent processes and documentation
- Test data subject access mechanisms
- Verify community consultation process
- Check if consent withdrawal is straightforward

**Example Question**: "Can farmers easily revoke access to their field data if they choose to withdraw from the agricultural analytics program?"

### 3.3 Data Security
- □ **Appropriate technical safeguards** protect against unauthorized access
- □ **Access controls limit data use** to authorized purposes
- □ **Security measures are proportionate** to data sensitivity
- □ **Data breach response plan exists** and is tested

**Evaluation Methods**:
- Review security documentation and measures
- Check access control implementation
- Assess security relative to sensitivity
- Verify existence of breach response protocols

**Example Question**: "Are proper encryption and access controls in place to protect sensitive health information in the community health monitoring system?"

### 3.4 Data Sovereignty Alignment
- □ **System complies with Data Sovereignty Protocol** (see separate document)
- □ **Community maintains governance authority** over data and its uses
- □ **Cultural and contextual data protocols are respected**
- □ **Benefits from data use flow back to data source communities**

**Evaluation Methods**:
- Check compliance with Data Sovereignty Protocol
- Verify community governance mechanisms
- Review benefit-sharing arrangements
- Assess respect for cultural data protocols

**Example Question**: "Does the knowledge preservation AI respect Indigenous ownership of cultural stories while making them accessible in appropriate contexts?"

**Privacy Rating**:
- **Strong**: Comprehensive privacy protections with community sovereignty
- **Adequate**: Basic protections with minor improvements needed
- **Needs Improvement**: Significant privacy concerns requiring remediation
- **Unacceptable**: Fundamental privacy violations making system unsuitable

---

## Section 4: Safety and Security
Assess whether the AI system operates reliably and safely within its intended context.

### 4.1 Reliability and Robustness
- □ **System performs consistently** across different conditions and inputs
- □ **Edge cases and unusual inputs are handled appropriately**
- □ **System degrades gracefully** when operating outside optimal conditions
- □ **Appropriate fallback mechanisms exist** for system failures

**Evaluation Methods**:
- Test system with boundary and edge cases
- Review performance across varying conditions
- Check failure mode behaviors
- Assess fallback procedures and backup options

**Example Question**: "Does the water management system continue to function reliably during power fluctuations or connectivity issues?"

### 4.2 Safety Mechanisms
- □ **Potential harms have been systematically identified**
- □ **Preventative controls exist** for identified risks
- □ **Human oversight is implemented** for high-risk decisions
- □ **Emergency shutdown capability exists** when appropriate

**Evaluation Methods**:
- Review risk assessment documentation
- Check implementation of preventative controls
- Verify human oversight procedures
- Test emergency intervention capabilities

**Example Question**: "Does the medical diagnosis assistant have a clear process for human doctor review before recommending treatments?"

### 4.3 Security Against Misuse
- □ **System is protected against adversarial attacks** or manipulation
- □ **Safeguards prevent unauthorized modifications**
- □ **System resists attempts to repurpose it** for harmful uses
- □ **Regular security testing occurs**

**Evaluation Methods**:
- Review security testing documentation
- Check access controls on system modifications
- Assess resistance to manipulation
- Verify regular security audits

**Example Question**: "Is the facial recognition system protected against spoofing attempts using photos or deepfakes?"

### 4.4 Long-term Stability
- □ **Maintenance responsibilities are clearly defined**
- □ **Regular updates and monitoring are scheduled**
- □ **Dependencies are sustainable** for the system's lifecycle
- □ **Contingency plans exist** for developer discontinuation or support changes

**Evaluation Methods**:
- Review maintenance documentation and schedules
- Check dependency management plans
- Verify update procedures and responsibilities
- Assess contingency planning

**Example Question**: "If the original developers of the crop prediction AI become unavailable, is there a plan for continued maintenance and updates?"

**Safety Rating**:
- **Strong**: Comprehensive safety measures with ongoing verification
- **Adequate**: Basic safety provisions with minor enhancements needed
- **Needs Improvement**: Significant safety concerns requiring remediation
- **Unacceptable**: Critical safety issues making system unsuitable for use

---

## Section 5: Environmental and Social Impact
Evaluate broader implications of the AI system for community well-being and environmental sustainability.

### 5.1 Environmental Sustainability
- □ **Energy efficiency has been considered** in system design
- □ **Computing resources are proportionate** to the purpose
- □ **Environmental footprint is measured and minimized**
- □ **System supports rather than hinders** community environmental goals

**Evaluation Methods**:
- Review energy consumption estimates
- Assess computing resource efficiency
- Check environmental impact documentation
- Verify alignment with community environmental priorities

**Example Question**: "Is the computing power used by the weather prediction system appropriate to its purpose, or is it unnecessarily resource-intensive?"

### 5.2 Economic Equity
- □ **System creates economic opportunities** accessible to diverse community members
- □ **Benefits are distributed equitably**, not concentrating advantage
- □ **System doesn't exacerbate existing economic disparities**
- □ **Value generated flows back** to source communities

**Evaluation Methods**:
- Analyze who benefits economically from the system
- Check for benefit distribution mechanisms
- Review impact on different economic groups
- Assess value return to communities

**Example Question**: "Does the marketplace recommendation AI create opportunities for small local producers or primarily benefit large external businesses?"

### 5.3 Social Cohesion
- □ **System respects and reinforces community social structures**
- □ **Design process included diverse community voices**
- □ **System avoids creating or deepening social divisions**
- □ **Cultural context and sensitivities are respected**

**Evaluation Methods**:
- Consult diverse community members about social impacts
- Review system for divisive elements or effects
- Check design process for inclusive participation
- Assess cultural appropriateness of system interactions

**Example Question**: "Does the community resource allocation AI respect traditional decision-making structures while improving efficiency?"

### 5.4 Human Autonomy and Dignity
- □ **System enhances rather than replaces human judgment**
- □ **People can challenge and override system recommendations**
- □ **System respects human autonomy** and decision-making authority
- □ **Implementation preserves human dignity** and agency

**Evaluation Methods**:
- Assess balance between automation and human control
- Check override mechanisms and accessibility
- Review how system presents recommendations
- Consult users about their sense of agency with the system

**Example Question**: "Does the child development assessment tool present itself as advisory to parents rather than authoritative or judgmental?"

**Impact Rating**:
- **Strong**: Positive environmental and social impacts with evidence
- **Adequate**: Neutral to positive impacts with minor concerns
- **Needs Improvement**: Negative impacts requiring specific remediation
- **Unacceptable**: Severe negative impacts making system unsuitable

---

## Section 6: Accountability Mechanisms
Assess systems for ongoing responsibility, redress, and improvement.

### 6.1 Responsibility Attribution
- □ **Clear lines of responsibility exist** for system outcomes
- □ **Contact points are accessible** for questions or concerns
- □ **Chain of accountability is documented** from development to deployment
- □ **Community oversight role is well-defined**

**Evaluation Methods**:
- Review responsibility documentation
- Check accessibility of contact information
- Verify completeness of accountability chain
- Assess community oversight mechanisms

**Example Question**: "Is there a clear point of contact for community members to raise concerns about the water management AI's decisions?"

### 6.2 Grievance Mechanisms
- □ **Accessible process exists** for reporting problems
- □ **Response timelines are defined** and reasonable
- □ **Appeals process is available** for contested decisions
- □ **Remediation options exist** for negative impacts

**Evaluation Methods**:
- Test problem reporting process
- Review response time commitments
- Check appeals process documentation
- Verify available remediation approaches

**Example Question**: "If a farmer believes the crop recommendation system provided harmful advice, is there a clear process to report this and receive compensation if appropriate?"

### 6.3 Continuous Monitoring
- □ **Ongoing performance monitoring** tracks key metrics
- □ **Feedback collection is active** and inclusive
- □ **Regular review schedule exists** and is followed
- □ **Monitoring results inform improvements**

**Evaluation Methods**:
- Review monitoring systems and processes
- Check feedback collection mechanisms
- Verify adherence to review schedule
- Assess how monitoring influences updates

**Example Question**: "Is there a system to track whether the education recommendation AI maintains consistent performance across demographic groups over time?"

### 6.4 Improvement Processes
- □ **Clear process exists for implementing improvements**
- □ **Community input influences system updates**
- □ **Lessons learned are documented** and applied
- □ **Version control tracks changes** and their rationale

**Evaluation Methods**:
- Review improvement implementation process
- Check mechanisms for community input
- Verify documentation of lessons learned
- Assess version control and change tracking

**Example Question**: "When community members identify bias in the housing recommendation system, is there a documented process for addressing this in the next update?"

**Accountability Rating**:
- **Strong**: Comprehensive accountability with community oversight
- **Adequate**: Basic accountability with some community involvement
- **Needs Improvement**: Insufficient accountability requiring enhancement
- **Unacceptable**: Lack of essential accountability mechanisms

---

## Audit Process Guide
Step-by-step instructions for conducting an effective AI ethics audit:

### Preparation Phase (1-2 days)
1. **Form Audit Team**:
   - Identify representatives (technical, community, governance)
   - Ensure diversity of perspectives and expertise
   - Assign specific roles (leader, documenter, community liaison)

2. **Gather Materials**:
   - Collect system documentation and previous audits
   - Prepare test cases relevant to community context
   - Review relevant policies and standards
   - Setup documentation templates

3. **Stakeholder Identification**:
   - Map all groups affected by the AI system
   - Identify representatives for consultation
   - Schedule interviews or feedback sessions
   - Prepare consultation questions

### Assessment Phase (1-3 days)
1. **Documentation Review**:
   - Analyze system documentation and policies
   - Review training data information if available
   - Check previous audit results and actions taken
   - Identify gaps requiring further investigation

2. **Testing and Verification**:
   - Run test cases representing diverse scenarios
   - Verify system behaviors against documentation
   - Check for unexpected outcomes or edge cases
   - Document all test results systematically

3. **Stakeholder Consultation**:
   - Conduct planned interviews and feedback sessions
   - Gather input from diverse community members
   - Document concerns and positive feedback
   - Cross-check stakeholder experiences with testing results

4. **Checklist Completion**:
   - Systematically address each checklist item
   - Document evidence for each assessment
   - Note areas requiring further investigation
   - Assign preliminary ratings for each section

### Analysis and Reporting (1 day)
1. **Findings Consolidation**:
   - Compile all evidence and assessments
   - Identify patterns and systemic issues
   - Prioritize concerns based on impact and urgency
   - Develop concrete recommendations

2. **Report Creation**:
   - Complete AI Audit Report Template
   - Include specific evidence for all findings
   - Detail recommended actions with timelines
   - Document limitations of the audit process

3. **Community Validation**:
   - Present draft findings to key stakeholders
   - Gather feedback on accuracy and completeness
   - Address any missing perspectives
   - Finalize report with community input

### Follow-Up Phase (Ongoing)
1. **Action Planning**:
   - Develop specific implementation plan for recommendations
   - Assign responsibilities for each action
   - Set timelines and success metrics
   - Schedule progress reviews

2. **Documentation and Sharing**:
   - Record audit in Field-Test Logbook
   - Share findings with Regional Hub
   - Make results available to community in accessible formats
   - Contribute lessons learned to Knowledge Commons

3. **Implementation Monitoring**:
   - Track progress on recommended actions
   - Conduct spot-checks for ongoing compliance
   - Document improvements and remaining challenges
   - Prepare for next scheduled audit

**Example**: Brazil's agricultural node conducted a three-day audit of their crop recommendation AI, involving two farmers, one technician, and one governance representative. They interviewed 12 system users, tested with 20 diverse farming scenarios, documented findings in their Field-Test Logbook, and implemented six improvements based on recommendations.

---

## Adaptation for Different Contexts
Guidance for customizing the audit process to different community needs and resources:

### Resource-Level Adaptations
1. **Low-Resource Implementation (Path A)**:
   - Focus on community discussion rather than technical testing
   - Use simplified checklist with most critical questions
   - Rely on observation and user experience rather than documentation
   - Example: Bangladesh conducted audits through facilitated community discussions with pictorial guides

2. **Basic Digital Implementation (Path B)**:
   - Combine simple technical assessment with community feedback
   - Use spreadsheets or basic forms for documentation
   - Focus testing on most commonly used features
   - Example: Kenya used a modified checklist with SMS-based user surveys

3. **Standard Implementation (Path C)**:
   - Follow the standard process with balanced technical and social assessment
   - Implement structured documentation and testing
   - Include multiple stakeholder perspectives
   - Example: Brazil conducted full audits with balanced technical and community input

4. **Advanced Implementation (Path D)**:
   - Add sophisticated testing tools and methodologies
   - Implement continuous monitoring between formal audits
   - Use comparative benchmarking against similar systems
   - Example: Singapore supplemented standard process with automated bias testing

### Application-Specific Adaptations
1. **Health AI Systems**:
   - Emphasize privacy, safety, and medical accuracy
   - Include health workers in audit team
   - Consider health equity implications
   - Example: Senegal added specific medical accuracy metrics to their health diagnostics audit

2. **Agricultural AI Systems**:
   - Focus on accessibility for farmers with varying literacy
   - Test with diverse agricultural contexts
   - Assess environmental impact specifically
   - Example: Kenya developed specialized agricultural fairness test cases

3. **Educational AI Systems**:
   - Emphasize developmental appropriateness
   - Include educators and learners in audit team
   - Consider diverse learning needs and styles
   - Example: Mexico added child development specialists to their education AI audit team

4. **Infrastructure AI Systems**:
   - Prioritize safety, reliability, and accessibility
   - Test fault tolerance extensively
   - Assess long-term maintenance needs
   - Example: India added infrastructure resilience tests for their urban planning AI

### Cultural Adaptations
1. **Indigenous Contexts**:
   - Integrate traditional knowledge systems and protocols
   - Ensure elder participation in evaluation
   - Assess cultural preservation implications
   - Example: Canada modified audit process to include talking circles led by Indigenous elders

2. **Collective Decision Cultures**:
   - Adapt for consensus-based rather than individual-focused assessment
   - Consider family and community-level impacts
   - Align with traditional governance structures
   - Example: Rwanda integrated village council review into audit process

3. **High-Hierarchy Contexts**:
   - Balance authority structures with inclusive participation
   - Create appropriate engagement for different social positions
   - Consider power dynamics in system impacts
   - Example: Bangladesh created role-appropriate engagement for different community members

**Customization Process**:
1. Begin with community discussion about local values and priorities
2. Select the most relevant sections and questions for your context
3. Add context-specific questions addressing local concerns
4. Adapt language and examples to be culturally appropriate
5. Document your customized approach for future reference

---

## Case Examples
Real-world examples of ethical AI audits from different contexts:

### Agricultural AI Audit (Kenya)
- **System**: Crop recommendation AI for small-scale farmers
- **Approach**: 
  - Mixed-method audit with farmer testimonials and field testing
  - Created pictorial evaluation tools for low-literacy contexts
  - Tested recommendations across different farm sizes and conditions
  - Used SMS surveys to gather broad community input
- **Key Findings**:
  - Bias toward commercially viable crops over traditional varieties
  - Insufficient explanation of recommendations in local languages
  - Strong privacy protections and data sovereignty
  - Uneven performance during extreme weather conditions
- **Outcomes**:
  - Added traditional crop varieties to training data
  - Implemented voice explanations in three local languages
  - Created offline backup mode for connectivity disruptions
  - System improvements increased adoption by 40%

### Health Diagnostics Audit (Senegal)
- **System**: AI-assisted health diagnosis tool for rural clinics
- **Approach**:
  - Community health workers led evaluation
  - Patient feedback collected via voice recordings
  - Created specialized test cases for local health conditions
  - Conducted privacy and security deep dive
- **Key Findings**:
  - Imbalanced performance across age groups
  - Strong privacy protections but limited explanation
  - Excessive data collection beyond diagnostic needs
  - Limited accommodation for traditional medicine integration
- **Outcomes**:
  - Retrained system with age-balanced data
  - Implemented tiered data collection with consent options
  - Added integration points for traditional health practices
  - Reduced misdiagnosis rates by 30%

### Educational Recommendation Audit (Singapore)
- **System**: Learning path recommendation AI for students
- **Approach**:
  - Comprehensive audit with technical and pedagogical experts
  - Student and parent focus groups for feedback
  - Advanced bias testing across demographic factors
  - Privacy evaluation with data protection specialists
- **Key Findings**:
  - Subtle gender bias in STEM subject recommendations
  - High transparency but complex for younger students
  - Strong safety and security measures
  - Limited adaptation for diverse learning styles
- **Outcomes**:
  - Debiased recommendation algorithm with ongoing monitoring
  - Created age-appropriate explanation interfaces
  - Implemented learning style preference options
  - System became model for regional educational AI standards

### Cultural Knowledge Preservation Audit (Canada)
- **System**: Indigenous knowledge archiving and sharing AI
- **Approach**:
  - Elder-led evaluation integrating traditional protocols
  - Youth council provided intergenerational perspective
  - Cultural appropriateness assessed through storytelling circles
  - Technical review by Indigenous IT specialists
- **Key Findings**:
  - Strong community governance and data sovereignty
  - Knowledge classification needed cultural refinement
  - Access controls aligned with traditional protocols
  - Environmental impact concerns with server energy use
- **Outcomes**:
  - Implemented cultural metadata framework
  - Created ceremonial access protocols for sacred knowledge
  - Shifted to solar-powered local servers
  - System became model for Indigenous data governance

---

**Resources for Implementation**:

Available at globalgovernanceframework.org/tools/digital/ai

- Complete AI Audit Toolkit
- Field Test Case Library
- Simplified Pictorial Guides
- AI Audit Report Template
- Cultural Adaptation Guide

---

**Call to Action**: Ethical AI requires ongoing vigilance and community oversight. Begin by assessing AI systems currently used in your community using this checklist, prioritizing those with the greatest potential impact. Document your findings in your Field-Test Logbook and share insights with your Regional Hub to strengthen ethical AI across the Digital Commons. Download the complete AI Audit Toolkit at globalgovernanceframework.org/tools/digital/ai.
