<!-- Example: Using SectionNotice in frameworks page -->
<!-- In src/routes/frameworks/+page.svelte -->

<script>
  import SectionNotice from '$lib/components/SectionNotice.svelte';
  // ... other imports
</script>

<svelte:head>
  <title>Frameworks</title>
</svelte:head>

<!-- Add this at the top of your page content -->
<SectionNotice type="warning" />

<!-- Or with custom content -->
<SectionNotice type="info" title="Custom Title" customContent={true} dismissible={true}>
  <p>Your custom content here with <a href="/link">links</a> and formatting.</p>
  <p>Multiple paragraphs are supported.</p>
</SectionNotice>

<!-- Rest of your frameworks page content -->

<!-- Example 3: Different SectionNotice types -->

<!-- Info notice (default) -->
<SectionNotice />

<!-- Warning notice -->
<SectionNotice type="warning" />

<!-- Success notice -->
<SectionNotice type="success" title="Success!" customContent={true}>
  <p>This section has been successfully updated!</p>
</SectionNotice>

<!-- Error notice -->
<SectionNotice type="error" dismissible={true} customContent={true}>
  <p>There was an issue loading some content. Please try refreshing the page.</p>
</SectionNotice>

<!-- Dismissible notice with custom title -->
<SectionNotice 
  type="info" 
  title="Development Update" 
  dismissible={true} 
  customContent={true}
>
  <p>We've recently updated this section with new features. <a href="/changelog">View changelog</a> for details.</p>
</SectionNotice>

You can add a custom message to the SectionNotice component in several ways. Here is our current approach:

## **Custom Content with Translation Keys (Recommended)**

First, add your custom translation keys to your `common.json` files:

**English (`/src/lib/i18n/en/common.json`):**
```json
{
  "notices": {
    "section": {
      "frameworks": {
        "text": "Note from the Founder: This section is currently undergoing a significant revision..."
      },
      "aubi": {
        "text": "This framework is under active development with tools being released in phases throughout 2025-2026. Current Phase 1 tools are available now, with Phase 2 tools scheduled for Q4 2025."
      },
      "biodiversity": {
        "text": "This comprehensive framework represents Version 2.0 and continues to evolve based on pilot program feedback and community input."
      }
    }
  }
}
```

**Swedish (`/src/lib/i18n/sv/common.json`):**
```json
{
  "notices": {
    "section": {
      "frameworks": {
        "text": "Meddelande från grundaren: Denna sektion genomgår för närvarande en betydande revidering..."
      },
      "aubi": {
        "text": "Detta ramverk är under aktiv utveckling med verktyg som släpps i faser under 2025-2026. Nuvarande Fas 1-verktyg är tillgängliga nu, med Fas 2-verktyg planerade för Q4 2025."
      },
      "biodiversity": {
        "text": "Detta omfattande ramverk representerar Version 2.0 och fortsätter att utvecklas baserat på pilotprogramfeedback och gemenskapsinput."
      }
    }
  }
}
```

Then use it in your page with a custom `noticeKey` prop:

```svelte
<script>
  import SectionNotice from '$lib/components/SectionNotice.svelte';
</script>

<!-- For AUBI framework -->
<SectionNotice 
  type="info" 
  customContent={true} 
  dismissible={true}
>
  <p>{$t('common.notices.section.aubi.text')}</p>
</SectionNotice>

<!-- For Biodiversity framework -->
<SectionNotice 
  type="warning" 
  customContent={true}
>
  <p>{$t('common.notices.section.biodiversity.text')}</p>
</SectionNotice>
```


