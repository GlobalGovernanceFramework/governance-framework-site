<script>
  // Import the component we want to test in isolation.
  import AllFrameworksList from '$lib/components/AllFrameworksList.svelte';

  // The AllFrameworksList component requires the 't' function for i18n.
  // We'll create a simple mock function for this test page that just returns 
  // the translation key itself. This is enough for the component to render.
  const t = (key) => key;
</script>

<svelte:head>
  <title>Frameworks List - Debug Test</title>
</svelte:head>

<main>
  <h1>Isolation Test Page</h1>
  <p>
    This page contains only the <strong>AllFrameworksList</strong> component to isolate the hover issue. 
    Hover over the cards below to see if the flickering and jumping still occurs.
  </p>
  
  <div class="test-container">
    <!-- 
      We are rendering the component with its required props.
      The 't' function is the mock function we created above.
    -->
    <AllFrameworksList {t} showTierHeaders={true} addTierIds={true} />
  </div>
</main>

<style>
  /* We are using minimal, page-specific styles to avoid interference */
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    padding: 2rem;
    max-width: 1200px;
    margin: 40px auto;
    color: #333;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2B4B8C;
  }

  p {
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .test-container {
    margin-top: 2rem;
    border: 3px dashed #DAA520;
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 8px;
  }

  /* This :global() style is necessary to apply the styles from your 
    original component, which are defined with :global(), to this test page.
    This ensures the cards look and behave exactly as they do on the main page.
  */
  :global(.implementation-frameworks .tier-section) {
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
  }

  :global(.implementation-frameworks .framework-list) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 1.5rem;
    list-style: none;
    padding: 0;
    margin-left: 0;
  }

  :global(.framework-tier-list .framework-item) {
    background: transparent;
    display: flex;
    height: 100%;
    position: relative;
    transition: none;
    box-shadow: none;
    border: none;
    margin-bottom: 0;
  }

  :global(.framework-tier-list .card-content-wrapper) {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    transform: translateZ(0);
    will-change: transform, box-shadow;
  }

  :global(.framework-tier-list .framework-item:hover .card-content-wrapper) {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
  }

  :global(.framework-tier-list .framework-link) {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-decoration: none;
    color: inherit;
    padding: 1.25rem;
    height: 100%;
    position: relative;
  }

  :global(.framework-tier-list .framework-title) {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.4;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :global(.framework-tier-list .emoji-wrapper) {
    display: inline-block;
    width: 1.5em;
    text-align: center;
    flex-shrink: 0;
  }

  :global(.framework-tier-list .framework-meta) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    flex-wrap: wrap;
    padding-top: 0.75rem;
  }

  :global(.framework-tier-list .status) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  :global(.framework-tier-list .status-ready) { background-color: #dcfce7; color: #166534; }
  :global(.framework-tier-list .status-review) { background-color: #fef3c7; color: #92400e; }
  :global(.framework-tier-list .status-planned) { background-color: #e0e7ff; color: #3730a3; }
  :global(.framework-tier-list .status-coming-soon) { background-color: #f3e8ff; color: #6b21a8; }
  :global(.framework-tier-list .status-default) { background-color: #f3f4f6; color: #374151; }

  :global(.framework-tier-list .version) {
    font-size: 0.7rem;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    color: #475569;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-weight: 600;
    border: 1px solid #cbd5e1;
  }
</style>

