# SMS Voting Template: Digital Commons Framework

**Estimated Reading Time**: 5 minutes

**Purpose**: This template provides a standardized system for conducting secure, accessible voting via SMS text messages within *Digital Commons Framework* Local Citizen Nodes. It enables inclusive participation in node governance, especially for communities with limited internet connectivity or technical resources. By combining simple text message formats with verification protocols, it ensures legitimate voting while maintaining transparency. The template is adaptable to diverse contexts, from rural villages to urban neighborhoods, requiring only basic mobile phones. It aligns with the Core Principles of direct participation and radical transparency, supporting equitable governance regardless of technical capacity.

## Overview
SMS Voting enables community members to participate in node governance using any mobile phone with text messaging capability. This system is particularly valuable for:

- **Low-connectivity environments** without reliable internet access
- **Geographically dispersed communities** where physical attendance is challenging
- **Inclusion of members** with limited mobility or time constraints
- **Rapid response decisions** requiring quick community input

The template provides standardized message formats, verification protocols, and management procedures to ensure votes are:
- **Authentic**: Only legitimate community members can participate
- **Verifiable**: Results can be validated independently
- **Transparent**: Process is documented and open to scrutiny
- **Accessible**: Participation requires minimal technical skill

When properly implemented, SMS Voting systems can achieve:
- **70-90% participation rates** compared to 30-40% for in-person-only voting
- **95%+ verification accuracy** with proper protocols
- **24-48 hour decision timeframes** for urgent matters

---

## System Requirements

### Essential Components
- **Basic Mobile Phones**: Feature phones with SMS capability (smartphones not required)
- **Field-Test Logbook**: For recording votes and verification (paper or digital)
- **Node Facilitator and Verification Team**: 2-3 people to manage the process
- **Node ID**: Issued upon registration with the framework

### Optional Enhancements
- **Dedicated SIM Card**: For receiving votes at a central number
- **SMS Management Tool**: Software for organizing incoming messages (e.g., Frontline SMS, Twilio)
- **Automated Response System**: For confirmation messages
- **Spreadsheet Program**: For vote tallying and analysis

### Cost Considerations
- **Minimal Setup**: $0-$50 (using existing phones and manual processing)
- **Standard Setup**: $50-$150 (dedicated SIM, basic management tools)
- **Enhanced Setup**: $150-$300 (automated systems, multiple channels)

**Example**: Senegal's node began with a single feature phone ($20) and paper logbook ($5), later adding an SMS management tool ($50) as volume increased.

---

## SMS Vote Format
The standard SMS Vote Format balances security with simplicity, enabling verification while remaining easy to remember:

### Basic Format
```
VOTE [NODE-ID] [PROPOSAL-ID] [CHOICE]
```

### Components
- **VOTE**: Standard command indicating a voting message
- **NODE-ID**: Your node's unique identifier (e.g., SN-027)
- **PROPOSAL-ID**: Specific identifier for the proposal being voted on (e.g., P-2026-05)
- **CHOICE**: Vote selection (typically YES, NO, or ABSTAIN)

### Verification Elements (Optional)
For enhanced security, additional verification elements can be added:
```
VOTE [NODE-ID] [PROPOSAL-ID] [CHOICE] [MEMBER-ID] [VERIFICATION-CODE]
```

- **MEMBER-ID**: Individual's identifier within the node
- **VERIFICATION-CODE**: One-time or rotating code provided to legitimate voters

### Examples
- Basic: `VOTE SN-027 P-2026-05 YES`
- Enhanced: `VOTE SN-027 P-2026-05 YES M-042 VC-7391`

**Localization**: Translate the VOTE command and choices into local languages as needed. For example, Rwanda's node uses "KURA" instead of "VOTE" and "YEGO/OYA" instead of "YES/NO".

---

## Verification Protocol
Ensure vote legitimacy through a layered verification process:

### Registration Phase
1. **Create Voter Registry**: Maintain a list of approved community members with phone numbers
2. **Assign Member IDs**: Provide unique identifiers to each voter (optional)
3. **Determine Verification Method**:
   - **Community Validation**: Witnesses verify voter identity
   - **Verification Codes**: Distribute unique codes before voting
   - **Knowledge-Based**: Personal information only the member would know
   - **Hybrid Approach**: Combination of methods for enhanced security

### Vote Receipt Phase
1. **Record Incoming Messages**: Log all vote SMS messages with timestamp
2. **Initial Validation**: Check format compliance and proposal existence
3. **Sender Verification**:
   - Match phone number against voter registry
   - Verify any included codes or identifiers
4. **Confirmation**: Send receipt message if possible (e.g., "Vote received")

### Counting Phase
1. **Verification Check**: Review validation status of each vote
2. **Duplication Check**: Ensure only one vote per member (use last valid vote if multiple)
3. **Witness Oversight**: Have 2+ community members observe the counting
4. **Documentation**: Record results in Field-Test Logbook with verification signatures

### Announcement Phase
1. **Publish Results**: Share outcome via community channels
2. **Provide Verification Access**: Allow inspection of anonymized voting records
3. **Issue Resolution**: Address any disputes through established protocol

**Example**: Bangladesh's node distributes paper verification codes at monthly meetings, which members must include in their SMS votes. Two community elders oversee vote counting and sign the logbook to certify results.

---

## Implementation Process
Follow these steps to establish SMS Voting in your node:

### Planning (1-2 weeks)
1. **Select Configuration**: Choose basic or enhanced format based on needs
2. **Prepare Infrastructure**: Assign phone(s) for vote collection
3. **Create Documentation Tools**: Set up logbook sections for vote tracking
4. **Draft Verification Protocol**: Design approach appropriate to community

### Community Preparation (1 week)
1. **Conduct Training Session**: Teach format and process to all members
2. **Distribute Reference Cards**: Provide simple instructions in local languages
3. **Perform Test Vote**: Run a practice round on a non-binding question
4. **Gather Feedback**: Refine process based on community input

### First Official Vote (1 day)
1. **Announce Proposal**: Share details and voting period (typically 24-72 hours)
2. **Distribute Verification Elements**: If using codes, provide to eligible voters
3. **Send Reminders**: Halfway through voting period
4. **Process Results**: Follow verification and counting protocols
5. **Announce Outcome**: Share results within 24 hours of closing

### Ongoing Management
1. **Review After 3 Votes**: Assess process effectiveness, make adjustments
2. **Document Lessons**: Record challenges and solutions in Field-Test Logbook
3. **Update Protocols**: Refine verification as needed based on experience
4. **Scale System**: Gradually enhance capabilities as needs evolve

**Example**: Kenya's agricultural node began with basic SMS voting for 30 members, expanding to verification codes after experiencing duplicate votes, and eventually implementing an SMS management tool as membership grew to 150.

---

## Vote Management
Efficiently organize voting events and data:

### Pre-Vote Organization
1. **Proposal Formatting**:
   - Create clear, concise proposal descriptions (max 160 characters for SMS sharing)
   - Assign unique PROPOSAL-ID using standardized format:
     - P-YYYY-MM-## (year, month, sequential number)
   - Example: P-2026-05-01 (first proposal of May 2026)

2. **Voter Notification**:
   - Send announcement SMS with:
     - Proposal summary
     - Voting timeframe
     - Exact format to use
   - Example: "VOTE OPEN: Allocate $500 for solar mesh network. Reply: VOTE SN-027 P-2026-05-01 YES/NO. Open until May 12, 8pm."

3. **Verification Preparation**:
   - Update voter registry if needed
   - Generate and distribute any verification codes
   - Assign vote counting team (2+ members)

### Active Vote Period
1. **Vote Collection**:
   - Monitor incoming messages
   - Log in Field-Test Logbook immediately
   - Send confirmations if system allows

2. **Progress Tracking**:
   - Monitor participation rate
   - Send reminders if below quorum expectations
   - Address format errors promptly

3. **Transparency Measures**:
   - Post participation updates (e.g., "45 of 100 members have voted")
   - Maintain open process for questions

### Post-Vote Processing
1. **Vote Tallying**:
   - Count verified votes by choice category
   - Document totals with observer signatures
   - Calculate percentages and quorum verification

2. **Results Communication**:
   - Send results SMS to all members
   - Post physical notice in community space
   - Update digital records if applicable

3. **Archiving**:
   - Securely store voting records
   - Document in Field-Test Logbook
   - Report to Regional Hub if required

**Example**: Brazil's node manages monthly policy votes for 75 members, sending proposal SMS three days before voting opens, collecting votes over 48 hours, and announcing results via group SMS and community radio.

---

## Security Considerations
Ensure vote integrity through appropriate security measures:

### Common Vulnerabilities
1. **Duplicate Voting**: Sending multiple votes from same person
   - **Mitigation**: Log phone numbers, use verification codes, accept only last valid vote

2. **Impersonation**: Unauthorized use of another's phone
   - **Mitigation**: Knowledge-based verification, one-time codes, community witnesses

3. **Message Interception**: Monitoring of SMS messages
   - **Mitigation**: Simple code systems, minimal sensitive data in messages

4. **Technical Failures**: Network issues, message loss
   - **Mitigation**: Extended voting periods, multiple contact options, confirmation messages

### Security Levels
1. **Basic** (suitable for low-risk decisions, trusted communities):
   - Phone number matching against registry
   - Community validation of results
   - Documented vote counting process

2. **Standard** (suitable for most node governance):
   - Verification codes distributed in-person
   - Witness oversight of counting
   - Confirmation messages for receipt

3. **Enhanced** (suitable for high-stakes decisions):
   - Multi-factor verification (code + knowledge-based question)
   - Multiple channel options (SMS + paper fallback)
   - Independent verification team

### Privacy Considerations
1. **Vote Confidentiality**:
   - Separate identity verification from vote choices in records
   - Limit access to raw voting data
   - Use ID codes rather than names in public documentation

2. **Data Protection**:
   - Secure storage of phone numbers and verification data
   - Clear data retention policies
   - Compliance with local privacy regulations

**Example**: Senegal's node uses numbered paper cards distributed at monthly meetings, which contain a unique verification code members must include in their SMS vote, with results verified by three community members from different family groups.

---

## Troubleshooting
Solutions for common challenges with SMS voting:

### Format Errors
1. **Problem**: Members send incorrectly formatted messages
   - **Solution**: Provide format templates via SMS before voting, create simple reference cards
   - **Prevention**: Send example messages, offer practice sessions

2. **Problem**: Confusion about proposal identifiers
   - **Solution**: Use consistent, simple ID format, include short description in notifications
   - **Prevention**: Post proposal details in public spaces with correct ID prominently displayed

### Technical Issues
1. **Problem**: Network outages during voting period
   - **Solution**: Extend voting period, provide alternate submission method
   - **Prevention**: Schedule longer voting windows, have backup phone on different network

2. **Problem**: Messages not received by collection phone
   - **Solution**: Monitor confirmation rates, provide alternate number if needed
   - **Prevention**: Test system before critical votes, maintain multiple receiving devices

### Verification Challenges
1. **Problem**: Lost or forgotten verification codes
   - **Solution**: Supervised in-person verification as backup
   - **Prevention**: Simple, memorable code system, multiple distribution methods

2. **Problem**: Disputed vote legitimacy
   - **Solution**: Apply established conflict resolution protocol
   - **Prevention**: Clear verification procedures, transparent counting with witnesses

### Participation Barriers
1. **Problem**: Low SMS literacy among some members
   - **Solution**: Buddy system pairing with tech-comfortable members
   - **Prevention**: Simplified formats, pictorial guides, practice sessions

2. **Problem**: Cost concerns about sending SMS
   - **Solution**: Cover costs through node budget, use free SMS platforms if available
   - **Prevention**: Negotiate bulk SMS rates, minimize required messages

**Example**: Rwanda addressed format confusion by creating laminated voting cards with fill-in-the-blank templates in three languages, reducing errors from 30% to 5% in their first three votes.

---

## Adaptation Guide
Customize the SMS Voting system for your community context:

### Language Adaptations
1. **Command Localization**:
   - Translate "VOTE" into local language
   - Use culturally relevant terms for choices
   - Example: Mexico uses "VOTAR SI/NO" instead of "VOTE YES/NO"

2. **Message Simplification**:
   - For low-literacy contexts, use numerical codes instead of text
   - Create pictorial guides connecting numbers to choices
   - Example: Bangladesh uses "1" for Yes, "2" for No, "3" for Abstain

### Technical Adaptations
1. **Low Connectivity Areas**:
   - Extend voting periods to 72+ hours
   - Designate community signal spots for sending votes
   - Implement message relay system through travelers

2. **Phone Sharing Contexts**:
   - Implement knowledge-based verification questions
   - Use community witness system for validation
   - Create scheduling system for shared device access

### Cultural Adaptations
1. **Consensus-Based Communities**:
   - Modify for consensus measurement rather than binary choices
   - Include options like "Support with concerns" or "Need discussion"
   - Integrate with traditional decision processes

2. **Hierarchical Communities**:
   - Develop appropriate engagement with traditional leaders
   - Consider weighted verification protocols reflecting established structure
   - Balance innovation with respect for cultural norms

### Scale Adaptations
1. **Small Nodes (10-50 members)**:
   - Manual processing sufficient
   - Simple verification through community recognition
   - Direct confirmation possible

2. **Medium Nodes (50-200 members)**:
   - Basic SMS management tools recommended
   - Structured verification system necessary
   - Group confirmations efficient

3. **Large Nodes (200+ members)**:
   - Automated systems highly recommended
   - Multi-layered verification essential
   - Representative oversight teams needed

**Example**: Canada's Indigenous node integrated SMS voting with traditional talking circles, using the technology for initial input gathering, followed by elder-led consensus discussions on proposals that showed significant division in the SMS phase.

---

## Example Implementation
Real-world implementation in a Senegalese rural community:

### Community Context
- **Location**: Coastal fishing village, Senegal
- **Population**: 300 people, 120 adults
- **Connectivity**: Limited mobile coverage, no broadband
- **Literacy**: 60% text literacy rate
- **Resources**: 85 basic phones, 15 smartphones, solar charging station

### System Design
- **Format**: Basic SMS with verification codes
  - `VOTE SN-027 P-ID YES/NO VC-####`
  - Commands translated to Wolof
- **Verification**: Paper cards with codes distributed at weekly market
- **Management**: Dedicated phone with manual logging
- **Cost**: Initial setup $45 (phone, logbook, printing)

### Implementation Process
1. **Preparation**:
   - Node facilitator created pictorial guides
   - Three training sessions at different times
   - Practice vote on meeting day preference

2. **First Vote**:
   - Proposal: Allocate fishing data access rights
   - 72-hour voting period
   - Daily announcements via community radio
   - 84 votes received (70% participation)

3. **Refinement**:
   - Added confirmation messages after first vote
   - Created buddy system for non-literate members
   - Simplified ID format based on feedback

### Results and Impact
- **Participation**: Increased from 30% (in-person only) to 70% (SMS voting)
- **Inclusivity**: Fishing crews at sea could participate for first time
- **Efficiency**: Decision time reduced from weeks to days
- **Transparency**: Results available to all, disputed votes decreased by 80%

### Lessons Learned
- Simple pictorial guides dramatically reduced format errors
- Verification code distribution needed multiple channels
- Network reliability required extended voting periods
- Community-specific term adaptation improved understanding

**Current Status**: System has processed 24 votes over 8 months with 75% average participation, scaled to include automated confirmations, and been adapted by four neighboring villages.

---

**Templates for Download**:

At globalgovernanceframework.org/tools/digital/vote

- SMS Voting Reference Card (printable)
- Vote Registry Template
- Results Documentation Form
- Verification Code Generator
- Pictorial Guides (adaptable)

---

**Call to Action**: SMS Voting enables inclusive governance even in low-connectivity environments. Start with the basic format, adapt to your community's needs, and evolve the system as your node grows. Download the complete SMS Voting Kit at globalgovernanceframework.org/tools/sms-voting.
