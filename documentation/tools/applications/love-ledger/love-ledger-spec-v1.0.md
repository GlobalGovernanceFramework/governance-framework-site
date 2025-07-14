# Technical Specification: Love Ledger & Community Consent App (v1.0)

**Document Status:** Draft v1.0
**Date:** July 14, 2025
**Author:** GGF Catalyst - Frameworks Lab
**Purpose:** This document provides the detailed technical and functional specifications for the GGF's first pilot application. It is intended for project stakeholders and the future development team.

---

### **1. Introduction & Vision**

#### **1.1. Project Goal**

The "Love Ledger & Community Consent" application is the first Minimum Viable Product (MVP) of the Global Governance Frameworks' technical infrastructure. Its purpose is twofold:

1.  **To be the engine for the GGF Catalyst's internal `Hearts`-based economy:** It will allow founding members to log contributions and validate the "Proof of Care" protocol, making our own organizational structure a living prototype of the systems we advocate for.
2.  **To provide a tangible tool for community partners:** It will offer a practical, secure, and culturally sensitive way to implement **Free, Prior, and Informed Consent (FPIC 2.0)**, a cornerstone of the Indigenous Governance Framework.

This application is the first step in translating the GGF's core economic and ethical logic into a functional, real-world tool.

#### **1.2. Target Users**

The application will be designed for the following user roles:

* **Community Member:** Any individual participating in a community (or the GGF Catalyst itself) who wishes to log contributions or participate in consent decisions.
* **Community Weaver (Validator):** A trusted, trained facilitator responsible for validating contributions ("Proof of Care") and guiding consent processes.
* **Project Facilitator:** An individual (internal or external) who initiates a proposal that requires community consent.
* **BAZ/Community Admin:** An administrator for a specific Bioregional Autonomous Zone (BAZ) or community, responsible for managing members and local settings.
* **GGF Super Admin:** The GGF Catalyst team, responsible for overall system administration and managing the `Heart-to-Fiat` conversion bridge.

#### **1.3. Core Concepts**

* **Love Ledger:** A decentralized, transparent log of valuable contributions that are often invisible in the traditional economy (e.g., care work, ecological stewardship, knowledge sharing).
* **Hearts (`♥`):** The internal unit of account for recognizing contributions logged on the Love Ledger.
* **Proof of Care:** The protocol for validating contributions. In this MVP, it will be based on peer attestation and validation by a designated Community Weaver.
* **FPIC 2.0 (Community Consent):** A process for seeking consent from a community for a proposed action, which respects the community's right to grant, withhold, or place conditions on their consent, including the right to veto.

---

### **2. Functional Requirements (User Stories)**

#### **2.1. User & Community Management**

* **As a BAZ Admin, I want to** invite new members to our community hub via email or a secure link, **so that** we can grow our local network.
* **As a new Community Member, I want to** create a simple profile with my name and role, **so that** others in my community can identify me.
* **As a BAZ Admin, I want to** assign the "Community Weaver" role to trusted members, **so that** they can validate contributions.

#### **2.2. Love Ledger: Logging Contributions (Proof of Care)**

* **As a Community Member, I want to** log a contribution I made, including a description, the approximate time spent, and the type of contribution (e.g., "Care Work," "Knowledge Sharing," "Ecological Stewardship"), **so that** my work is recognized.
* **As a Community Member, I want to** be able to log contributions via text, voice note, or by uploading a photo, **so that** the system is accessible regardless of my literacy or context.
* **As a Community Member, I want to** see a list of my pending and validated contributions, **so that** I can track my activity.

#### **2.3. Love Ledger: Validation Workflow**

* **As a Community Weaver, I want to** see a queue of pending contributions from my community members, **so that** I can review them for validation.
* **As a Community Weaver, I want to** approve or reject a contribution with a brief comment, **so that** I can maintain the integrity of our Love Ledger.
* **As a Community Member, I want to** receive a notification when my contribution has been validated or if it was rejected with a reason, **so that** I have clear feedback.
* **As a GGF Super Admin, I want to** see an aggregated report of all validated `Hearts` for a given period, **so that** I can calculate the `Heart-to-Fiat` conversion rate for compensation.

#### **2.4. Community Consent (FPIC 2.0)**

* **As a Project Facilitator, I want to** create a new "Consent Proposal," including a title, a detailed description, supporting documents (or links), and a clear question for the community, **so that** I can formally request their consent for a project.
* **As a Project Facilitator, I want to** define the specific community group whose consent is required, **so that** the request is directed to the appropriate people.
* **As a Community Member, I want to** receive a notification when a new consent proposal requires my attention, **so that** I can participate in the decision.
* **As a Community Member, I want to** view a consent proposal and cast my response, which can be: "Consent," "Do Not Consent (Veto)," or "Consent with Conditions," **so that** my voice is heard.
* **As a Community Member, I want to** be able to add a comment (text or voice) to explain my decision, **so that** I can provide context.
* **As a Project Facilitator, I want to** see a real-time, anonymized dashboard of the consent results, including the number of responses and any conditions added, **so that** I can understand the community's decision.

---

### **3. Non-Functional Requirements**

* **3.1. Security & Data Sovereignty:**
    * All user data must be encrypted at rest and in transit.
    * The architecture must respect Indigenous Data Sovereignty. For pilots with Indigenous communities, data must be stored in a way that is legally and technically controlled by that community.
    * The system should be designed with post-quantum cryptographic principles in mind for future-proofing.
* **3.2. Accessibility & Localization:**
    * The interface must be simple, intuitive, and accessible to users with varying levels of digital literacy.
    * The system must support low-tech pathways (e.g., a Community Weaver can log a paper-based or oral contribution on behalf of a member).
    * All text must be internationalized for easy translation. The initial pilot will be in English and Swedish.
* **3.3. Performance:**
    * The system must be responsive, even in low-bandwidth environments.
    * The initial pilot will be for a small user base (<100 people), but the architecture should be designed to scale.

---

### **4. Data & Architecture**

#### **4.1. Data Models (Simplified Schema)**

```json
// User
{
  "userId": "uuid",
  "name": "string",
  "email": "string",
  "communityId": "uuid",
  "roles": ["CommunityMember", "CommunityWeaver", "BAZAdmin"]
}

// ContributionLog
{
  "logId": "uuid",
  "userId": "uuid",
  "communityId": "uuid",
  "description": "string",
  "contributionType": "CareWork | KnowledgeSharing | EcologicalStewardship",
  "mediaUrl": "url_to_voice_note_or_photo",
  "status": "Pending | Validated | Rejected",
  "createdAt": "timestamp",
  "validatedAt": "timestamp",
  "validatorId": "uuid",
  "heartsAwarded": "number"
}

// ConsentProposal
{
  "proposalId": "uuid",
  "facilitatorId": "uuid",
  "title": "string",
  "description": "string",
  "question": "string",
  "status": "Open | Closed",
  "createdAt": "timestamp",
  "targetCommunityId": "uuid"
}

// ConsentResponse
{
  "responseId": "uuid",
  "proposalId": "uuid",
  "userId": "uuid",
  "response": "Consent | Veto | ConsentWithConditions",
  "conditions": "string",
  "comment": "string",
  "createdAt": "timestamp"
}
```

#### **4.2. High-Level Architecture**

  * **Front-End:** A responsive web application (and potentially a lightweight mobile app) built with a modern JavaScript framework (e.g., React, Svelte, or Vue).
  * **Back-End:** A secure RESTful API built with a robust framework (e.g., Node.js/Express, Python/Django).
  * **Database:** For the initial pilot, a standard relational database (e.g., PostgreSQL) is sufficient. The design should allow for future migration of the `ContributionLog` and `ConsentResponse` tables to a distributed ledger technology (like Hyperledger Fabric).
  * **Authentication:** A secure authentication provider (e.g., using OAuth 2.0).

-----

### **5. UI/UX Wireframes (Conceptual)**

  * **Dashboard:** A simple landing page showing the user's total `Hearts`, a list of their recent contributions, and any pending consent proposals that require their attention. A prominent "Log New Contribution" button.
  * **Log Contribution Form:** A simple form with fields for "Description," "Type," and options to record a voice note or upload a picture.
  * **Validation Queue (for Weavers):** A list of cards, each representing a pending contribution. Each card shows the member's name, description, and any media. Buttons for "Approve" and "Reject."
  * **Consent Proposal View:** A clean view displaying the proposal's title, full description, and the clear question being asked. Below are three distinct buttons: "I Consent," "I Do Not Consent," and "I Consent with Conditions" (which reveals a text box).

-----

### **6. Phased Rollout Plan**

1.  **Phase 1 - Internal Pilot (The GGF Catalyst):**
      * Focus exclusively on the **Love Ledger** functionality.
      * Onboard the founding GGF Catalyst members.
      * Use a simple spreadsheet or this app's MVP to log and validate contributions to calculate the first `Heart-to-Fiat` compensations.
      * **Goal:** Prove the internal economic model works.
2.  **Phase 2 - First Partner Pilot (e.g., a BAZ or trusted community):**
      * Introduce the **Community Consent** module.
      * Work with a pilot partner to use the app for a real-world consent decision.
      * Gather extensive feedback on usability, cultural appropriateness, and functionality.
      * **Goal:** Prove the tool's real-world utility and gather feedback for iteration.
3.  **Phase 3 - Open Source Release:**
      * Refine the application based on feedback from Phase 2.
      * Publish the code under an open-source license (MIT/Apache 2.0).
      * Create documentation to help other communities deploy their own instances.
      * **Goal:** Make the GGF's tools a global public good.

