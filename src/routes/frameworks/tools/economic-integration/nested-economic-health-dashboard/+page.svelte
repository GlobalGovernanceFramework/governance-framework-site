<!-- src/routes/frameworks/tools/economic/nested-economic-health-dashboard/+page.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Nested Economic Health Index Dashboard - Economic Integration Framework</title>
  <meta name="description" content="Real-time metrics for monitoring economic framework implementation outcomes." />
</svelte:head>

<section class="hero">
  <div class="container">
    <h1>Nested Economic Health Index Dashboard</h1>
    <p class="subtitle">Real-time metrics for monitoring economic framework implementation outcomes</p>
  </div>
</section>

<section class="main-content">
  <div class="container">
    <div class="development-status">
      <div class="status-icon">🚧</div>
      <h2>Under Development</h2>
      <p>This dashboard has not yet begun development. We're planning to create an interactive metrics platform that displays economic health indicators across multiple scales, from local to global.</p>
    </div>

    <div class="planned-features">
      <h3>Planned Features</h3>
      <ul>
        <li>Multi-scale economic indicators from community to global levels</li>
        <li>Real-time data visualization of framework implementation progress</li>
        <li>Customizable dashboard views for different stakeholders</li>
        <li>Integration with local economic data sources</li>
        <li>Resource allocation and distribution metrics</li>
        <li>Sustainability and equity indicators</li>
      </ul>
    </div>

    <div class="contribution-callout">
      <h3>Contribute to Development</h3>
      <p>We welcome assistance from data scientists, developers, economists, and UI/UX designers interested in building tools for economic monitoring and visualization.</p>
      <p>This project is part of the Global Governance Framework open-source initiative. To contribute or learn more:</p>
      <div class="button-group">
        <a href="https://github.com/GlobalGovernanceFramework/governance-framework-site" class="github-button" target="_blank" rel="noopener noreferrer">
          <span class="icon">💻</span> Visit Our GitHub Repository
        </a>
        <a href="{base}/contact" class="contact-button">
          <span class="icon">✉️</span> Contact the Development Team
        </a>
      </div>
    </div>

    <div class="back-link">
      <a href="{base}/frameworks/tools/economic-integration">
        <span class="back-icon">←</span> Back to Economic Integration Tools
      </a>
    </div>
  </div>
</section>

<style>
  .hero {
    background: linear-gradient(to bottom right, #006666, #48BF91);
    color: white;
    padding: 3rem 0;
    text-align: center;
  }

  .hero h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.25rem;
    max-width: 32rem;
    margin: 0 auto;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .main-content {
    padding: 3rem 0;
  }

  .development-status {
    background-color: #eef9f9;
    padding: 2rem;
    border-radius: 0.75rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .status-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    color: #088F8F;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: #088F8F;
    font-size: 1.4rem;
    margin: 2rem 0 1rem 0;
  }

  p {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .planned-features {
    margin-bottom: 2rem;
  }

  .planned-features ul {
    list-style-type: none;
    padding: 0;
  }

  .planned-features li {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 1rem;
    color: #4b5563;
  }

  .planned-features li::before {
    content: "♻️";
    position: absolute;
    left: 0;
    color: #088F8F;
  }

  .contribution-callout {
    background-color: #f0f9f6;
    padding: 2rem;
    border-radius: 0.75rem;
    border-left: 4px solid #088F8F;
    margin-bottom: 2rem;
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .github-button, .contact-button {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.2s;
  }

  .github-button {
    background-color: #24292e;
    color: white;
  }

  .contact-button {
    background-color: #088F8F;
    color: white;
  }

  .github-button:hover, .contact-button:hover {
    transform: translateY(-2px);
  }

  .icon {
    margin-right: 0.5rem;
  }

  .back-link {
    margin-top: 3rem;
  }

  .back-link a {
    display: inline-flex;
    align-items: center;
    color: #088F8F;
    font-weight: 500;
    text-decoration: none;
  }

  .back-icon {
    margin-right: 0.5rem;
  }

  @media (max-width: 640px) {
    .button-group {
      flex-direction: column;
    }
    
    .github-button, .contact-button {
      width: 100%;
      justify-content: center;
    }
  }
</style>
