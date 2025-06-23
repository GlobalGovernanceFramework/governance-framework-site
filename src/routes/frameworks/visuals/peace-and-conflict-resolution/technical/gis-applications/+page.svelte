<!-- src/routes/frameworks/visuals/peace-and-conflict-resolution/technical/gis-applications/+page.svelte -->
<script>
  import GISMapVisualization from '$lib/components/GISMapVisualization.svelte';
  import MetaTags from '$lib/components/MetaTags.svelte';
  import { onMount } from 'svelte';
  
  let activeTab = 'about';
  let selectedMapMode = 'resource-conflict';
  let selectedRegion = 'global';
  
  function setTab(tab) {
    activeTab = tab;
  }
  
  function handleModeChange(event) {
    selectedMapMode = event.detail.mode;
  }
  
  function handleRegionChange(event) {
    selectedRegion = event.detail.region;
  }
  
  // Example data for methodological notes
  const methodologicalNotes = {
    dataSources: [
      { name: 'UCDP Georeferenced Event Dataset', url: 'https://ucdp.uu.se/downloads/' },
      { name: 'ACLED Conflict Data', url: 'https://acleddata.com/' },
      { name: 'World Bank Fragility Indicators', url: 'https://www.worldbank.org/en/topic/fragilityconflictviolence' },
      { name: 'UNHCR Displacement Data', url: 'https://www.unhcr.org/refugee-statistics/' },
      { name: 'IPCC Climate Projections', url: 'https://www.ipcc.ch/data/' }
    ],
    limitations: [
      'Geographic representation is simplified for visualization purposes',
      'Projections contain inherent uncertainty, particularly for longer timeframes',
      'Data quality varies by region, with more reliable data from areas with stronger monitoring systems',
      'Conflict dynamics are complex and may not follow projected patterns despite risk indicators'
    ]
  };
  
  // Documentation sections
  const documentation = {
    resourceConflict: {
      title: 'Resource Conflict Hotspot Mapping',
      description: 'This visualization overlays resource scarcity data with conflict incidence to identify high-risk zones where resource competition is likely to drive violence.',
      methodology: 'Hotspots are identified through composite analysis of historical conflict data, resource availability metrics, demographic pressures, and institutional capacity indicators. Machine learning algorithms detect patterns in multi-variable datasets to predict escalation likelihood.',
      applications: 'Policymakers can use this data to prioritize preventive diplomacy, resource governance reforms, and targeted development assistance in high-risk regions before violence erupts.'
    },
    peaceInfrastructure: {
      title: 'Peace Infrastructure Distribution',
      description: 'This mapping shows the global distribution of peace infrastructure - the formal and informal institutions, networks, and mechanisms that support conflict prevention and resolution.',
      methodology: 'Peace infrastructure components are categorized by scale (local, regional, international) and type (mediation, dialogue, early warning, etc.). Gap analysis identifies regions with insufficient coverage relative to conflict risk.',
      applications: 'The visualization enables more strategic deployment of peace resources and highlights critical gaps requiring investment to build comprehensive conflict prevention coverage.'
    },
    crossBorder: {
      title: 'Cross-Border Dynamics Visualization',
      description: 'This visualization maps population movements across boundaries in conflict regions, showing how displacement, migration, and border policies interact with conflict patterns.',
      methodology: 'Flow arrows represent predominant movement directions based on displacement data from UNHCR and IOM. Border characteristics are coded based on policy analysis, physical barriers, and crossing difficulty.',
      applications: 'Understanding cross-border dynamics helps design more effective regional peace strategies and humanitarian responses that address the interconnected nature of neighboring conflicts.'
    },
    climateMigration: {
      title: 'Climate-Migration-Conflict Projection Maps',
      description: 'These forward-looking maps project how climate change impacts may drive population movements and subsequent conflict risks over the coming decades.',
      methodology: 'Projections combine climate models (temperature, precipitation, sea level) with socioeconomic vulnerability indicators and existing conflict risk factors to identify likely displacement corridors and receiving areas.',
      applications: 'This information supports long-term adaptation planning, conflict-sensitive climate policy, and proactive governance reforms in regions facing dual climate-conflict challenges.'
    }
  };
</script>

<MetaTags 
  title="Geographic Information System Applications | Global Governance Framework"
  description="Interactive GIS visualizations mapping resource conflicts, peace infrastructure, cross-border dynamics, and climate-migration-conflict projections."
  keywords="GIS, conflict mapping, peace infrastructure, cross-border dynamics, climate security, conflict resolution"
/>

<div class="container">
  <header>
    <h1>Geographic Information System (GIS) Applications</h1>
    <p class="subtitle">Spatial analysis for peace and conflict prevention</p>
  </header>

  <nav class="tabs">
    <button class:active={activeTab === 'about'} on:click={() => setTab('about')}>About</button>
    <button class:active={activeTab === 'visualization'} on:click={() => setTab('visualization')}>Interactive Map</button>
    <button class:active={activeTab === 'methodology'} on:click={() => setTab('methodology')}>Methodology</button>
    <button class:active={activeTab === 'documentation'} on:click={() => setTab('documentation')}>Documentation</button>
  </nav>

  <!-- About Tab -->
  {#if activeTab === 'about'}
    <div class="content-section">
      <div class="about-content">
        <h2>Geographic Information System Applications for Peace Governance</h2>
        
        <p>Geographic Information Systems (GIS) provide powerful tools for understanding the spatial dimensions of conflict and peace. By mapping complex data across geographic regions, these visualizations enable policymakers, researchers, and practitioners to identify patterns, predict trends, and design more effective interventions.</p>
        
        <div class="features">
          <div class="feature-card">
            <h3>Resource Conflict Hotspot Mapping</h3>
            <p>Overlay of resource scarcity and conflict incidence to identify areas where competition over water, land, minerals, or other resources drives violence.</p>
            <button on:click={() => { setTab('visualization'); selectedMapMode = 'resource-conflict'; }}>
              View Map
            </button>
          </div>
          
          <div class="feature-card">
            <h3>Peace Infrastructure Distribution</h3>
            <p>Spatial analysis of global peace capacities and gaps, showing the distribution of conflict prevention mechanisms across regions.</p>
            <button on:click={() => { setTab('visualization'); selectedMapMode = 'peace-infrastructure'; }}>
              View Map
            </button>
          </div>
          
          <div class="feature-card">
            <h3>Cross-Border Dynamics Visualization</h3>
            <p>Analysis of movement patterns across boundaries in conflict regions, including migration, displacement, and border policies.</p>
            <button on:click={() => { setTab('visualization'); selectedMapMode = 'cross-border'; }}>
              View Map
            </button>
          </div>
          
          <div class="feature-card">
            <h3>Climate-Migration-Conflict Projections</h3>
            <p>Forward-looking scenarios based on climate models, showing potential population movements and conflict risks in vulnerable regions.</p>
            <button on:click={() => { setTab('visualization'); selectedMapMode = 'climate-migration'; }}>
              View Map
            </button>
          </div>
        </div>
        
        <div class="key-benefits">
          <h3>Key Benefits of GIS for Peace Governance</h3>
          <ul>
            <li><strong>Evidence-Based Planning:</strong> Provides visual evidence to support resource allocation and intervention design</li>
            <li><strong>Early Warning:</strong> Identifies emerging hotspots before violence erupts</li>
            <li><strong>Systems Perspective:</strong> Shows interconnections between different conflict factors across regions</li>
            <li><strong>Gap Analysis:</strong> Reveals areas with insufficient peace infrastructure relative to conflict risk</li>
            <li><strong>Future Scenario Planning:</strong> Enables preparation for emerging climate-conflict challenges</li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Visualization Tab -->
  {#if activeTab === 'visualization'}
    <div class="map-container">
      <GISMapVisualization 
        mapMode={selectedMapMode} 
        initialRegion={selectedRegion}
        on:modeChange={handleModeChange}
        on:regionChange={handleRegionChange}
      />
    </div>
  {/if}
  
  <!-- Methodology Tab -->
  {#if activeTab === 'methodology'}
    <div class="content-section">
      <div class="methodology-content">
        <h2>Methodological Notes</h2>
        
        <div class="methodology-section">
          <h3>Data Sources</h3>
          <p>These visualizations draw on multiple conflict and geographic datasets:</p>
          <ul>
            {#each methodologicalNotes.dataSources as source}
              <li>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="methodology-section">
          <h3>Validation Process</h3>
          <p>All visualizations undergo expert review and ground-truth validation with practitioners from conflict-affected contexts to ensure accuracy and relevance.</p>
          <p>Statistical correlations between identified risk factors and subsequent conflict events are tested using historical data to validate predictive accuracy.</p>
        </div>
        
        <div class="methodology-section">
          <h3>Uncertainty Representation</h3>
          <p>Where data contains significant uncertainty, this is explicitly visualized through:</p>
          <ul>
            <li>Color intensity variations representing confidence levels</li>
            <li>Dotted lines for projected rather than confirmed patterns</li>
            <li>Explicit timeframes for forward-looking projections</li>
          </ul>
        </div>
        
        <div class="methodology-section">
          <h3>Limitations</h3>
          <ul>
            {#each methodologicalNotes.limitations as limitation}
              <li>{limitation}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Documentation Tab -->
  {#if activeTab === 'documentation'}
    <div class="content-section">
      <div class="documentation-content">
        <h2>Technical Documentation</h2>
        
        <div class="doc-nav">
          <button class:active={selectedMapMode === 'resource-conflict'} on:click={() => selectedMapMode = 'resource-conflict'}>
            Resource Conflict
          </button>
          <button class:active={selectedMapMode === 'peace-infrastructure'} on:click={() => selectedMapMode = 'peace-infrastructure'}>
            Peace Infrastructure
          </button>
          <button class:active={selectedMapMode === 'cross-border'} on:click={() => selectedMapMode = 'cross-border'}>
            Cross-Border Dynamics
          </button>
          <button class:active={selectedMapMode === 'climate-migration'} on:click={() => selectedMapMode = 'climate-migration'}>
            Climate-Migration
          </button>
        </div>
        
        <div class="doc-content">
          <h3>{documentation[selectedMapMode].title}</h3>
          
          <div class="doc-section">
            <h4>Description</h4>
            <p>{documentation[selectedMapMode].description}</p>
          </div>
          
          <div class="doc-section">
            <h4>Methodology</h4>
            <p>{documentation[selectedMapMode].methodology}</p>
          </div>
          
          <div class="doc-section">
            <h4>Applications</h4>
            <p>{documentation[selectedMapMode].applications}</p>
          </div>
          
          <div class="doc-section">
            <h4>API Access</h4>
            <p>Researchers and developers can access this data through the Global Governance Framework API. Documentation and access requests are available through the <a href="/api/docs">API Portal</a>.</p>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="citation-section">
    <h3>Citation</h3>
    <p class="citation">Global Governance Frameworks. (2025). Geographic Information System Applications for Peace Governance. Retrieved from https://www.globalgovernanceframeworks.org/frameworks/visuals/peace-and-conflict-resolution/technical/gis-applications/</p>
  </div>

  <footer>
    <p>© 2025 Global Governance Frameworks | <a href="https://www.globalgovernanceframeworks.org">www.globalgovernanceframeworks.org</a></p>
  </footer>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.2rem;
    margin-top: 0;
  }
  
  .tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 2rem;
  }
  
  .tabs button {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: 1rem;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .tabs button:hover {
    color: #333;
  }
  
  .tabs button.active {
    color: #2c3e50;
    border-bottom-color: #2c3e50;
  }
  
  .content-section {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  .map-container {
    height: 700px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    overflow: hidden;
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .feature-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }
  
  .feature-card h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .feature-card p {
    flex-grow: 1;
    margin-bottom: 1.25rem;
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .feature-card button {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .feature-card button:hover {
    background-color: #1e2a36;
  }
  
  .key-benefits {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  .key-benefits h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .key-benefits ul {
    margin: 0;
    padding-left: 1.25rem;
  }
  
  .key-benefits li {
    margin-bottom: 0.5rem;
    color: #4a4a4a;
  }
  
  .methodology-section {
    margin-bottom: 2rem;
  }
  
  .methodology-section h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .methodology-section p {
    color: #4a4a4a;
    line-height: 1.6;
  }
  
  .methodology-section ul {
    padding-left: 1.25rem;
  }
  
  .methodology-section li {
    margin-bottom: 0.5rem;
    color: #4a4a4a;
  }
  
  .doc-nav {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
  }
  
  .doc-nav button {
    padding: 0.5rem 1rem;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .doc-nav button:hover {
    background-color: #e9ecef;
  }
  
  .doc-nav button.active {
    background-color: #2c3e50;
    color: white;
    border-color: #2c3e50;
  }
  
  .doc-content {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  .doc-content h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
  
  .doc-section {
    margin-bottom: 1.5rem;
  }
  
  .doc-section h4 {
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
  
  .doc-section p {
    color: #4a4a4a;
    line-height: 1.6;
    margin: 0;
  }
  
  .citation-section {
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #2c3e50;
  }
  
  .citation-section h3 {
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
  
  .citation {
    font-style: italic;
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }
  
  footer {
    text-align: center;
    color: #666;
    font-size: 0.9rem;
    margin-top: 3rem;
  }
  
  footer a {
    color: #666;
    text-decoration: none;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .features {
      grid-template-columns: 1fr;
    }
    
    .tabs button {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }
  }
</style>
