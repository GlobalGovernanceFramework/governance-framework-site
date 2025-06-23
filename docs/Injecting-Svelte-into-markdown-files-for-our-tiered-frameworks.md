Björn:
Would you recommend against having both all framework links on the implementation page as well as the individual tier-pages? It creates more places to update. We also have the framework side nav as well. So for each framework, a lot of places to update when something changes or a new framework is added. However, this shouldn't be too often, eventually 

Gemini:
You have pinpointed the single biggest risk in a content-heavy project like this: **manual content duplication.**

Your concern is 100% valid. Manually maintaining these lists of links in three or more different places is unsustainable and will inevitably lead to broken links and inconsistent information as the project evolves.

However, your instinct that these lists are useful for the user is also correct. A main index page, filtered tier pages, and a sidebar all serve valuable navigational purposes.

The solution is not to remove the user-friendly navigation, but to change *how* those lists are generated. You need to establish a **"Single Source of Truth"** for your framework data.

-----

### **The "Single Source of Truth" Principle**

Instead of hardcoding the links in multiple Svelte components, you should define the list of all your frameworks and their properties (title, URL, tier, status) in **one single, central location**.

Your existing `src/lib/stores/frameworkNav.js` file is the perfect place for this.

All other parts of your website—the main implementation page, the individual tier pages, and the sidebar—will then **dynamically generate** their lists by reading from this single source.

### **How to Implement This**

#### **Step 1: Enhance Your "Single Source of Truth"**

Make your `frameworkNav.js` the definitive master list. Ensure each framework object has all the data you need to display it anywhere, including its tier.

**Markdown Snippet: Enhanced `frameworkNav.js`**

```javascript
// src/lib/stores/frameworkNav.js
// This becomes the master list of all framework metadata.

export const allFrameworks = [
  // Tier 0
  { slug: 'treaty-for-our-only-home', titleKey: '...', tier: 0, status: 'ready', version: 'v1.0' },
  // Tier 1
  { slug: 'climate-and-energy', titleKey: '...', tier: 1, status: 'review' },
  { slug: 'peace-and-conflict-resolution', titleKey: '...', tier: 1, status: 'review' },
  // ...and so on for every single framework
];

// Your store can be derived from this master list
export const frameworkNav = writable(buildNavStructure(allFrameworks));

function buildNavStructure(frameworks) {
  // Logic to group frameworks by tier for your navigation component...
  // This function would generate the nested structure you currently have manually.
}
```

#### **Step 2: Dynamically Generate Your Pages**

Now, your Svelte pages will become much simpler. Instead of containing hardcoded lists, they will import the master list and filter it.

**Example: `/implementation/tier-1/+page.svelte`**
This page no longer needs a manually curated list. It just needs to do this:

```svelte
<script>
  import { allFrameworks } from '$lib/stores/frameworkNav.js';

  // Filter the master list to get only Tier 1 frameworks
  const tier1Frameworks = allFrameworks.filter(f => f.tier === 1);
</script>

<h1>Tier 1: Urgent Global Stability & Justice</h1>
<p>This tier includes the most urgent domains...</p>

<ul>
  {#each tier1Frameworks as framework}
    <li>
      <a href="/frameworks/{framework.slug}">
        {t(framework.titleKey)} <span>({framework.status})</span>
      </a>
    </li>
  {/each}
</ul>
```

### **The Benefits of This Approach**

  * **Update Once, See Everywhere:** When you add a new framework or change the status of an existing one, you only have to **edit the `frameworkNav.js` file**. The change will automatically appear on the main implementation page, the correct tier page, and in the sidebar.
  * **Eliminates Errors:** It becomes impossible to have an outdated link in one place but not another.
  * **Keeps Your Good UX:** You don't have to sacrifice your helpful navigation pages. You just make them smarter and easier to maintain.

**Conclusion:**

You are right to be wary of the maintenance cost. The solution is to centralize your data. **Do not remove the helpful pages.** Instead, refactor them to pull their link lists dynamically from a single source of truth (`frameworkNav.js`). This gives you the best of both worlds: a great user experience and a sustainable developer experience.

Björn:
The only issue is that these pages are markdown pages, how do I suddenly introduce the generation of of the tier lists into them? I know that embedding svelte components into markdown however is possible, is that a way to do it 

Gemini:
Yes, you have hit on the perfect solution. You are absolutely right.

The technology you're describing is often called **MDX** (Markdown with embedded components), and in the Svelte ecosystem, the standard tool for this is **`mdsvex`**.

This is the recommended way to solve the problem because it gives you the best of both worlds:

  * You can write the descriptive content for your Tier pages in simple, easy-to-edit **Markdown**.
  * You can inject a powerful, dynamic **Svelte component** that generates the list of frameworks automatically from your "Single Source of Truth."

-----

### **How to Implement This Solution**

Here is a practical, step-by-step guide to making this work.

#### **Step 1: Set up `mdsvex` (If you haven't already)**

First, your SvelteKit project needs to be configured to process markdown files as if they were Svelte components. If you haven't done this, the official `mdsvex` documentation has an excellent guide for integrating with SvelteKit.

#### **Step 2: Create the Reusable List Component**

You will create one single, smart Svelte component whose only job is to display a list of frameworks for a specific tier.

**Markdown Snippet: `/src/lib/components/FrameworkTierList.svelte`**

```svelte
<script>
  import { t } from '$lib/i18n'; // Your i18n store
  import { allFrameworks } from '$lib/stores/frameworkNav.js'; // The master list

  // This component accepts a 'tier' number as a property
  export let tier;

  // Filter the master list to get only the frameworks for the specified tier
  const frameworksInTier = allFrameworks.filter(f => f.tier === tier);
</script>

<div class="tier-framework-list">
  <ul>
    {#each frameworksInTier as framework}
      <li>
        <a href="/frameworks/{framework.slug}">
          {t(framework.titleKey)}
        </a>
        {#if framework.status}
          <span class="status {framework.status}">({framework.status})</span>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  /* Add some basic styling for the list */
  .tier-framework-list ul {
    list-style: none;
    padding: 0;
  }
  .tier-framework-list li {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  .status {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    opacity: 0.7;
  }
</style>
```

#### **Step 3: Use the Component in Your Markdown Pages**

Now, your markdown page for each Tier becomes incredibly simple. You write your introduction as normal markdown, and then you just "call" your new component.

**Markdown Snippet: Example of `/src/routes/implementation/tier-1/+page.md`**

```markdown
---
title: "Tier 1: Urgent Global Stability & Justice"
---

## Tier 1: Urgent Global Stability & Justice

This tier includes the most urgent domains of global governance—areas where failure to act can lead to irreversible harm, large-scale human suffering, or systemic collapse. These frameworks focus on core needs like peace, healthcare, justice, food security, and climate action.

<script>
  import FrameworkTierList from '$lib/components/FrameworkTierList.svelte';
</script>

<FrameworkTierList tier={1} />

```

### **The New, Simplified Workflow**

Now, your workflow is incredibly efficient:

1.  To add a new framework to Tier 1, you simply add its data to the master `allFrameworks` array in `frameworkNav.js`.
2.  The `FrameworkTierList` component automatically finds the new framework and adds it to the list.
3.  The Tier 1 page, because it uses the component, displays the updated list instantly.

You never have to manually edit the list on the page itself. This is the correct, scalable, and modern way to handle this.

Björn:
What about translations of the framework names, do we still keep them in the i18n json files, or include them directly in the frameworkNav? 

Gemini:
That's a great question about how to best manage your internationalization (i18n) data.

My strong recommendation is to **keep the translations in your i18n JSON files** and continue using the `titleKey` approach you already have in your `frameworkNav.js` file.

Your current approach is already following the established best practice for managing translations in modern web applications, and you should definitely stick with it.

-----

### **Why Keeping Translations in i18n Files is Better**

While putting the translated strings directly into `frameworkNav.js` might seem simpler at first, it creates several long-term problems. The JSON file approach is superior for three main reasons:

1.  **Separation of Concerns (Clean Code):**

      * Your `frameworkNav.js` file should define the **structure and metadata** of your navigation (which items exist, their slugs, their tier, their status).
      * Your i18n JSON files (`en.json`, `sv.json`, etc.) should define the **presentational content** (the translated text).
      * This separation makes your codebase much cleaner and easier to reason about. The structure is in one place, the text is in another.

2.  **Translator-Friendly Workflow (Easy Collaboration):**

      * This is the most critical advantage. When you want to add a new language or update existing translations, you can simply hand the `en.json` file to a translator and ask for the corresponding `es.json` or `fr.json` file.
      * They don't need to touch your application's JavaScript code, which prevents them from accidentally breaking the site's structure or logic. This workflow is safe, standard, and highly scalable.

3.  **Efficiency:**

      * A good i18n library will only load the language file that the user currently needs. If you put all language strings into your JavaScript file, the user's browser has to download the text for *every single language* at once, which is less efficient.

### **The Recommended Data Flow (Your Current Method)**

Here is how the data flow works with your current, correct setup:

**1. The "Single Source of Truth" defines the structure with a key:**
(`/src/lib/stores/frameworkNav.js`)

```javascript
export const allFrameworks = [
  { slug: 'climate-and-energy', titleKey: 'framework.docs.nav.implementationClimateEnergy', tier: 1, status: 'review' },
  // ... and so on
];
```

**2. The i18n files provide the translated content:**
(`/src/locales/en.json`)

```json
{
  "framework": {
    "docs": {
      "nav": {
        "implementationClimateEnergy": "Climate & Energy Governance"
      }
    }
  }
}
```

(`/src/locales/sv.json`)

```json
{
  "framework": {
    "docs": {
      "nav": {
        "implementationClimateEnergy": "Klimat- och energistyrning"
      }
    }
  }
}
```

**3. Your Svelte component renders the correct text using the `t()` function:**
(`FrameworkTierList.svelte`)

```svelte
<script>
  import { t } from '$lib/i18n';
  import { allFrameworks } from '$lib/stores/frameworkNav.js';
  // ...
</script>

<ul>
  {#each frameworks as framework}
    <li>
      <a href="/frameworks/{framework.slug}">
        {t(framework.titleKey)} </a>
    </li>
  {/each}
</ul>
```

**Conclusion:** You are already on the right track. Continue to use your i18n JSON files for all user-facing text, including framework titles. It is the most robust, professional, and scalable way to build a multilingual site.
