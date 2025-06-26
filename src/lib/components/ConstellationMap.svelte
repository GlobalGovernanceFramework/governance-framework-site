<!-- src/lib/components/ConstellationMap.svelte -->
<script>
  import { onMount } from 'svelte';
  import { locale } from '$lib/i18n';

  export let width = '100%';
  export let height = '600px';

  let svg;
  let hoverInfo;
  let containerElement;

  // This will track the current locale
  $: currentLocale = $locale;

  // Translations for all nodes (English and Swedish)
  const nodeTranslations = {
    en: {
      // Core node
      core: {
        title: 'Integrated Meta-Governance',
        description: 'The overarching framework for coordinating and aligning governance systems across domains, levels, and cultures.'
      },
      
      // Guiding Principles
      polycentric: {
        title: 'Polycentric Coordination',
        description: 'Governance emerging from multiple centers of authority, interacting through mutual learning and shared standards.'
      },
      subsidiarity: {
        title: 'Subsidiarity',
        description: 'Decisions made at the most local level possible, with higher levels offering support and guidance.'
      },
      interoperability: {
        title: 'Dynamic Interoperability',
        description: 'Systems designed to interconnect and co-evolve, allowing diverse domains to plug into shared protocols.'
      },
      reflexivity: {
        title: 'Transparency & Reflexivity',
        description: 'Governance systems making assumptions and decision logic visible, with capacity for self-assessment.'
      },
      equity: {
        title: 'Equity & Inclusion',
        description: 'Safeguards preventing dominance by powerful actors and uplifting marginalized voices.'
      },
      
      // Structural Components
      councils: {
        title: 'Coordination Councils',
        description: 'Trans-domain bodies facilitating alignment across governance areas and resolving conflicts.'
      },
      'power-aware': {
        title: 'Power-Aware Design',
        description: 'Structures addressing power asymmetries through tiered consensus, resource access guarantees, and power audits.'
      },
      tiered: {
        title: 'Tiered Participation Models',
        description: 'Frameworks allowing engagement at different levels: Observer, Contributor, and Full Partner status.'
      },
      temporal: {
        title: 'Temporal Layering',
        description: 'Governance structures operating across immediate, decadal, and transgenerational timeframes.'
      },
      learning: {
        title: 'Learning Feedback Loops',
        description: 'Systems supporting pattern detection, scenario simulation, and ethical tension modeling.'
      },
      
      // Implementation Strategies
      mapping: {
        title: 'Governance Mapping',
        description: 'Visualization of implemented and planned frameworks to identify overlaps, gaps, and synergies.'
      },
      prototyping: {
        title: 'Prototyping Councils',
        description: 'Pilot implementations with synergistic domains using deliberative methods and simulation games.'
      },
      toolkit: {
        title: 'Toolkits & Entry Points',
        description: 'Plug-and-play modules and lightweight participation options for diverse stakeholders.'
      },
      adaptation: {
        title: 'Regional Adaptation',
        description: 'Customization of frameworks to diverse cultural contexts and governance traditions.'
      },
      evaluation: {
        title: 'Reflexive Evaluation',
        description: 'Performance indicators and system adaptation based on real-world feedback.'
      },
      
      // Stakeholder Engagement
      public: {
        title: 'Public Interface Systems',
        description: 'Mechanisms for citizen engagement including deliberative panels, participatory assessment, and digital commons.'
      },
      indigenous: {
        title: 'Indigenous & Community Voice',
        description: 'Frameworks ensuring meaningful participation of indigenous communities and traditional knowledge systems.'
      },
      'cross-cultural': {
        title: 'Cross-Cultural Dialogue',
        description: 'Mechanisms enabling exchange across different governance traditions and ontologies.'
      },
      policy: {
        title: 'Policy Translation',
        description: 'Processes for converting governance insights into practical policy recommendations.'
      },
      innovation: {
        title: 'Innovation Networks',
        description: 'Communities developing and testing new governance approaches and technologies.'
      }
    },
    sv: {
      // Core node
      core: {
        title: 'Integrerad Meta-Styrning',
        description: 'Det övergripande ramverket för att samordna och anpassa styrningssystem över domäner, nivåer, kulturer och tidsskalor.'
      },
      
      // Guiding Principles
      polycentric: {
        title: 'Polycentrisk Koordination',
        description: 'Styrning som uppstår från flera auktoritetscentrum, interagerar genom ömsesidigt lärande och delade standarder.'
      },
      subsidiarity: {
        title: 'Subsidiaritet',
        description: 'Beslut fattas på lägsta möjliga nivå, med högre nivåer som erbjuder stöd och vägledning.'
      },
      interoperability: {
        title: 'Dynamisk Interoperabilitet',
        description: 'System designade för att sammankopplas och samevolvera, vilket tillåter olika domäner att ansluta till delade protokoll.'
      },
      reflexivity: {
        title: 'Transparens & Reflexivitet',
        description: 'Styrningssystem som synliggör antaganden och beslutslogik, med kapacitet för självutvärdering.'
      },
      equity: {
        title: 'Rättvisa & Inkludering',
        description: 'Skyddsmekanismer som förhindrar dominans av mäktiga aktörer och lyfter marginaliserade röster.'
      },
      
      // Structural Components
      councils: {
        title: 'Koordinationsråd',
        description: 'Tvärdomäna organ som underlättar anpassning mellan styrningsområden och löser konflikter.'
      },
      'power-aware': {
        title: 'Maktmedveten Design',
        description: 'Strukturer som hanterar maktasymmetrier genom nivåbaserad konsensus, resursgarantier och maktrevisioner.'
      },
      tiered: {
        title: 'Nivåindelade Deltagandemodeller',
        description: 'Ramverk som möjliggör engagemang på olika nivåer: Observatör, Bidragsgivare och Fullständig Partner-status.'
      },
      temporal: {
        title: 'Temporala Skikt',
        description: 'Styrningsstrukturer som verkar över omedelbara, decennielånga och transgenerationella tidshorisonter.'
      },
      learning: {
        title: 'Lärande Återkopplingsmekanismer',
        description: 'System som stödjer mönsterigenkänning, scenariosimulering och etisk spänningsmodellering.'
      },
      
      // Implementation Strategies
      mapping: {
        title: 'Styrningskartläggning',
        description: 'Visualisering av implementerade och planerade ramverk för att identifiera överlappningar, luckor och synergier.'
      },
      prototyping: {
        title: 'Prototypråd',
        description: 'Pilotimplementeringar med synergistiska domäner som använder deliberativa metoder och simuleringsspel.'
      },
      toolkit: {
        title: 'Verktygslådor & Ingångspunkter',
        description: 'Plug-and-play-moduler och lättviktiga deltagandealternativ för olika intressenter.'
      },
      adaptation: {
        title: 'Regional Anpassning',
        description: 'Anpassning av ramverk till olika kulturella kontexter och styrningstraditoner.'
      },
      evaluation: {
        title: 'Reflexiv Utvärdering',
        description: 'Prestationsindikatorer och systemanpassning baserad på återkoppling från verkliga erfarenheter.'
      },
      
      // Stakeholder Engagement
      public: {
        title: 'Offentliga Gränssnittssystem',
        description: 'Mekanismer för medborgarengagemang inklusive deliberativa paneler, participatorisk utvärdering och digitala allmänningar.'
      },
      indigenous: {
        title: 'Urfolks & Lokala Röster',
        description: 'Ramverk som säkerställer meningsfull delaktighet från urfolkssamhällen och traditionella kunskapssystem.'
      },
      'cross-cultural': {
        title: 'Tvärkulturell Dialog',
        description: 'Mekanismer som möjliggör utbyte mellan olika styrningstraditoner och ontologier.'
      },
      policy: {
        title: 'Policyöversättning',
        description: 'Processer för att omvandla styrningsinsikter till praktiska policyrekommendationer.'
      },
      innovation: {
        title: 'Innovationsnätverk',
        description: 'Gemenskaper som utvecklar och testar nya styrningsmetoder och teknologier.'
      }
    }
  };

  // Define translations for the surrounding text content
  const texts = {
    en: {
      title: "Meta-Governance Constellation Map",
      intro: "This visualization maps the key components and interconnections of the Integrated Meta-Governance Framework, illustrating how different elements relate to each other in a dynamic system. The map reveals the framework's architecture as an interconnected constellation rather than a linear hierarchy.",
      legend: {
        core: "Core Meta-Governance",
        principles: "Guiding Principles",
        structures: "Structural Components",
        implementation: "Implementation Strategies",
        stakeholders: "Stakeholder Engagement"
      },
      understanding: {
        title: "Understanding the Constellation Map",
        description: "The Meta-Governance Constellation Map visualizes the framework as an integrated system with multiple interconnected elements. The central node represents the core concept of Integrated Meta-Governance, surrounded by key components organized into categories:",
        items: [
          "<strong>Guiding Principles</strong> (green) form the ethical foundation of the framework, establishing values and approaches that inform all other elements.",
          "<strong>Structural Components</strong> (purple) represent the formal mechanisms and bodies through which meta-governance operates.",
          "<strong>Implementation Strategies</strong> (pink) show how the framework is put into practice across different contexts and scales.",
          "<strong>Stakeholder Engagement</strong> (yellow) identifies key participants and their roles in the meta-governance ecosystem."
        ],
        connections: "Connections between nodes illustrate relationships and influences across the constellation. The map is designed to be explored interactively, revealing more detailed information about each component when hovered over."
      },
      insights: {
        title: "Key Insights from the Constellation",
        description: "Several patterns emerge from viewing meta-governance as a constellation:",
        items: [
          "<strong>Multiple Centers of Gravity</strong>: Rather than a single hierarchy, the framework operates through distributed nodes of influence and coordination.",
          "<strong>Cross-Cutting Connections</strong>: Elements from different categories connect directly, showing how principles inform structures, structures enable implementation, and all elements engage stakeholders.",
          "<strong>Reinforcing Feedback</strong>: Many connections are bidirectional, illustrating how elements strengthen each other through feedback and iteration.",
          "<strong>Adaptive Architecture</strong>: The constellation's networked nature demonstrates resilience, as the system can evolve without collapsing if individual elements change."
        ]
      }
    },
    sv: {
      title: "Meta-Styrningens Konstellationskarta",
      intro: "Denna visualisering kartlägger nyckelkomponenterna och sammankopplingarna i Meta-Styrningsramverket, vilket illustrerar hur olika element relaterar till varandra i ett dynamiskt system. Kartan visar ramverkets arkitektur som en sammankopplad konstellation snarare än en linjär hierarki.",
      legend: {
        core: "Kärn Meta-Styrning",
        principles: "Vägledande Principer",
        structures: "Strukturella Komponenter",
        implementation: "Implementeringsstrategier",
        stakeholders: "Intressentengagemang"
      },
      understanding: {
        title: "Att förstå Konstellationskartan",
        description: "Meta-Styrningens Konstellationskarta visualiserar ramverket som ett integrerat system med flera sammankopplade element. Den centrala noden representerar kärnkonceptet för Integrerad Meta-Styrning, omgiven av nyckelkomponenter organiserade i kategorier:",
        items: [
          "<strong>Vägledande Principer</strong> (gröna) bildar den etiska grunden för ramverket, och etablerar värderingar och förhållningssätt som informerar alla andra element.",
          "<strong>Strukturella Komponenter</strong> (lila) representerar de formella mekanismer och organ genom vilka meta-styrning opererar.",
          "<strong>Implementeringsstrategier</strong> (rosa) visar hur ramverket omsätts i praktiken över olika kontexter och skalor.",
          "<strong>Intressentengagemang</strong> (gul) identifierar nyckeldeltagare och deras roller i meta-styrningens ekosystem."
        ],
        connections: "Kopplingar mellan noder illustrerar relationer och påverkan över konstellationen. Kartan är designad för att utforskas interaktivt, med detaljerad information om varje komponent som visas när man håller muspekaren över den."
      },
      insights: {
        title: "Viktiga insikter från Konstellationen",
        description: "Flera mönster framträder när man betraktar meta-styrning som en konstellation:",
        items: [
          "<strong>Multipla Gravitationscentrum</strong>: Snarare än en enda hierarki fungerar ramverket genom distribuerade noder av inflytande och koordination.",
          "<strong>Tvärgående Kopplingar</strong>: Element från olika kategorier kopplar direkt till varandra, vilket visar hur principer informerar strukturer, strukturer möjliggör implementering, och alla element engagerar intressenter.",
          "<strong>Förstärkande Återkoppling</strong>: Många kopplingar är dubbelriktade, vilket illustrerar hur element stärker varandra genom återkoppling och iteration.",
          "<strong>Adaptiv Arkitektur</strong>: Konstellationens nätverkade natur demonstrerar motståndskraft, då systemet kan utvecklas utan att kollapsa om enskilda element förändras."
        ]
      }
    }
  };

  // Get translations for the current locale
  $: text = texts[currentLocale] || texts.en;
  $: nodeText = nodeTranslations[currentLocale] || nodeTranslations.en;

  // Define node data structure (positions and categories)
  const nodeData = [
    // Core node
    { id: 'core', x: 500, y: 300, radius: 25, category: 'core-node' },
    
    // Guiding Principles
    { id: 'polycentric', x: 350, y: 150, radius: 18, category: 'principle-node' },
    { id: 'subsidiarity', x: 250, y: 220, radius: 18, category: 'principle-node' },
    { id: 'interoperability', x: 200, y: 300, radius: 18, category: 'principle-node' },
    { id: 'reflexivity', x: 250, y: 380, radius: 18, category: 'principle-node' },
    { id: 'equity', x: 350, y: 450, radius: 18, category: 'principle-node' },
    
    // Structural Components
    { id: 'councils', x: 650, y: 150, radius: 18, category: 'structure-node' },
    { id: 'power-aware', x: 740, y: 220, radius: 18, category: 'structure-node' },
    { id: 'tiered', x: 800, y: 300, radius: 18, category: 'structure-node' },
    { id: 'temporal', x: 740, y: 380, radius: 18, category: 'structure-node' },
    { id: 'learning', x: 650, y: 450, radius: 18, category: 'structure-node' },
    
    // Implementation Strategies
    { id: 'mapping', x: 400, y: 100, radius: 15, category: 'implementation-node' },
    { id: 'prototyping', x: 600, y: 100, radius: 15, category: 'implementation-node' },
    { id: 'toolkit', x: 800, y: 150, radius: 15, category: 'implementation-node' },
    { id: 'adaptation', x: 850, y: 250, radius: 15, category: 'implementation-node' },
    { id: 'evaluation', x: 850, y: 350, radius: 15, category: 'implementation-node' },
    
    // Stakeholder Engagement
    { id: 'public', x: 600, y: 500, radius: 15, category: 'stakeholder-node' },
    { id: 'indigenous', x: 500, y: 520, radius: 15, category: 'stakeholder-node' },
    { id: 'cross-cultural', x: 400, y: 500, radius: 15, category: 'stakeholder-node' },
    { id: 'policy', x: 150, y: 450, radius: 15, category: 'stakeholder-node' },
    { id: 'innovation', x: 150, y: 150, radius: 15, category: 'stakeholder-node' }
  ];
    
  // Connection data defining relationships between nodes
  const connections = [
    // Core connections to principles
    { source: 'core', target: 'polycentric', strength: 3 },
    { source: 'core', target: 'subsidiarity', strength: 3 },
    { source: 'core', target: 'interoperability', strength: 3 },
    { source: 'core', target: 'reflexivity', strength: 3 },
    { source: 'core', target: 'equity', strength: 3 },
    
    // Core connections to structures
    { source: 'core', target: 'councils', strength: 3 },
    { source: 'core', target: 'power-aware', strength: 3 },
    { source: 'core', target: 'tiered', strength: 3 },
    { source: 'core', target: 'temporal', strength: 3 },
    { source: 'core', target: 'learning', strength: 3 },
    
    // Principles to structures
    { source: 'polycentric', target: 'councils', strength: 2 },
    { source: 'subsidiarity', target: 'tiered', strength: 2 },
    { source: 'interoperability', target: 'councils', strength: 2 },
    { source: 'reflexivity', target: 'learning', strength: 2 },
    { source: 'equity', target: 'power-aware', strength: 2 },
    
    // Principles to implementation
    { source: 'polycentric', target: 'mapping', strength: 1 },
    { source: 'subsidiarity', target: 'adaptation', strength: 1 },
    { source: 'interoperability', target: 'toolkit', strength: 1 },
    { source: 'reflexivity', target: 'evaluation', strength: 1 },
    { source: 'equity', target: 'indigenous', strength: 1 },
    
    // Structures to implementation
    { source: 'councils', target: 'prototyping', strength: 1 },
    { source: 'power-aware', target: 'adaptation', strength: 1 },
    { source: 'tiered', target: 'toolkit', strength: 1 },
    { source: 'temporal', target: 'evaluation', strength: 1 },
    { source: 'learning', target: 'evaluation', strength: 1 },
    
    // Structures to stakeholders
    { source: 'councils', target: 'policy', strength: 1 },
    { source: 'power-aware', target: 'indigenous', strength: 1 },
    { source: 'tiered', target: 'public', strength: 1 },
    { source: 'learning', target: 'innovation', strength: 1 },
    
    // Implementation to stakeholders
    { source: 'mapping', target: 'innovation', strength: 1 },
    { source: 'prototyping', target: 'public', strength: 1 },
    { source: 'adaptation', target: 'cross-cultural', strength: 1 },
    { source: 'evaluation', target: 'public', strength: 1 },
    
    // Cross connections
    { source: 'cross-cultural', target: 'indigenous', strength: 1 },
    { source: 'polycentric', target: 'tiered', strength: 1 },
    { source: 'reflexivity', target: 'evaluation', strength: 1 },
    { source: 'councils', target: 'adaptation', strength: 1 },
    { source: 'mapping', target: 'toolkit', strength: 1 },
    { source: 'power-aware', target: 'equity', strength: 1 },
    { source: 'indigenous', target: 'adaptation', strength: 1 },
    { source: 'innovation', target: 'prototyping', strength: 1 },
    { source: 'learning', target: 'reflexivity', strength: 1 },
    { source: 'policy', target: 'toolkit', strength: 1 }
  ];

  // Function to calculate smart tooltip positioning
  function calculateTooltipPosition(node, containerRect) {
    const TOOLTIP_WIDTH = 280;
    const TOOLTIP_HEIGHT = 100; // Approximate height
    const MARGIN = 30; // Increased margin to ensure separation
    
    // Calculate node position in screen coordinates relative to container
    const nodeScreenX = (node.x / 1000) * containerRect.width;
    const nodeScreenY = (node.y / 600) * containerRect.height;
    
    let tooltipX, tooltipY;
    
    // Determine horizontal position based on node location
    if (node.x < 400) {
      // Left side nodes: show tooltip to the right
      tooltipX = nodeScreenX + node.radius + MARGIN;
    } else if (node.x > 600) {
      // Right side nodes: show tooltip to the left
      tooltipX = nodeScreenX - TOOLTIP_WIDTH - node.radius - MARGIN;
    } else {
      // Center nodes: show tooltip to the right if there's space, otherwise left
      if (nodeScreenX + TOOLTIP_WIDTH + MARGIN < containerRect.width) {
        tooltipX = nodeScreenX + node.radius + MARGIN;
      } else {
        tooltipX = nodeScreenX - TOOLTIP_WIDTH - node.radius - MARGIN;
      }
    }
    
    // Vertical position: try to center on node, but keep within bounds
    tooltipY = nodeScreenY - (TOOLTIP_HEIGHT / 2);
    
    // Ensure tooltip stays within container bounds with more generous margins
    tooltipX = Math.max(10, Math.min(tooltipX, containerRect.width - TOOLTIP_WIDTH - 10));
    tooltipY = Math.max(10, Math.min(tooltipY, containerRect.height - TOOLTIP_HEIGHT - 10));
    
    return { x: tooltipX, y: tooltipY };
  }

  // Function to show tooltip
  function showTooltip(node, translation) {
    if (!hoverInfo || !containerElement) return;
    
    // Set content
    hoverInfo.innerHTML = `
      <div class="hover-title">${translation.title}</div>
      <div class="hover-description">${translation.description}</div>
    `;
    
    // Calculate position
    const containerRect = containerElement.getBoundingClientRect();
    const position = calculateTooltipPosition(node, containerRect);
    
    // Position tooltip
    hoverInfo.style.left = `${position.x}px`;
    hoverInfo.style.top = `${position.y}px`;
    hoverInfo.style.opacity = '1';
    hoverInfo.style.visibility = 'visible';
    
    console.log(`Showing tooltip for ${node.id} at ${position.x}, ${position.y}`); // Debug
  }

  // Function to hide tooltip
  function hideTooltip() {
    if (!hoverInfo) return;
    
    hoverInfo.style.opacity = '0';
    hoverInfo.style.visibility = 'hidden';
    
    console.log('Hiding tooltip'); // Debug
  }

  // Function to redraw the visualization when language changes
  $: if (svg && hoverInfo && containerElement && currentLocale) {
    drawVisualization();
  }
  
  function drawVisualization() {
    try {
      // Clear any existing content
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      
      // Setup SVG defs for filters
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
      filter.setAttribute("id", "glow");
      filter.setAttribute("x", "-50%");
      filter.setAttribute("y", "-50%");
      filter.setAttribute("width", "200%");
      filter.setAttribute("height", "200%");
      
      const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
      feGaussianBlur.setAttribute("stdDeviation", "2.5");
      feGaussianBlur.setAttribute("result", "coloredBlur");
      
      const feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
      const feMergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
      feMergeNode1.setAttribute("in", "coloredBlur");
      const feMergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
      feMergeNode2.setAttribute("in", "SourceGraphic");
      
      feMerge.appendChild(feMergeNode1);
      feMerge.appendChild(feMergeNode2);
      
      filter.appendChild(feGaussianBlur);
      filter.appendChild(feMerge);
      defs.appendChild(filter);
      svg.appendChild(defs);
      
      // Add random stars to background
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * 1000;
        const y = Math.random() * 600;
        const size = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.6 + 0.1;
        
        const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        star.setAttribute("cx", x);
        star.setAttribute("cy", y);
        star.setAttribute("r", size);
        star.setAttribute("class", "star");
        star.setAttribute("fill", "white");
        star.setAttribute("opacity", opacity);
        svg.appendChild(star);
      }
      
      // Draw connections first (so they appear behind nodes)
      connections.forEach(conn => {
        const sourceNode = nodeData.find(n => n.id === conn.source);
        const targetNode = nodeData.find(n => n.id === conn.target);
        
        if (sourceNode && targetNode) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          
          // Calculate path
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const dr = Math.sqrt(dx * dx + dy * dy);
          
          // Create path element
          path.setAttribute("d", `M${sourceNode.x},${sourceNode.y} A${dr},${dr} 0 0,1 ${targetNode.x},${targetNode.y}`);
          path.setAttribute("class", "path");
          path.setAttribute("stroke", "#ffffff");
          path.setAttribute("stroke-opacity", 0.2 + (conn.strength * 0.1));
          path.setAttribute("stroke-width", conn.strength);
          path.setAttribute("fill", "none");
          svg.appendChild(path);
        }
      });
      
      // Draw nodes with the translated text
      nodeData.forEach(node => {
        // Get the translated title and description for this node
        const translation = nodeText[node.id] || {
          title: `Missing translation for ${node.id}`, 
          description: `Missing description translation for ${node.id}`
        };
        
        const nodeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        nodeGroup.setAttribute("class", `node ${node.id === 'core' ? 'central-node' : ''}`);
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", node.radius);
        circle.setAttribute("class", node.category);
        circle.setAttribute("filter", "url(#glow)");
        
        // Explicitly set fill colors based on category
        if (node.category === 'core-node') {
          circle.setAttribute("fill", "#4a6bde");  // Cosmic blue
        } else if (node.category === 'principle-node') {
          circle.setAttribute("fill", "#52c41a");  // Green
        } else if (node.category === 'structure-node') {
          circle.setAttribute("fill", "#722ed1");  // Purple
        } else if (node.category === 'implementation-node') {
          circle.setAttribute("fill", "#eb2f96");  // Pink
        } else if (node.category === 'stakeholder-node') {
          circle.setAttribute("fill", "#faad14");  // Gold
        }
        
        // Add stroke
        circle.setAttribute("stroke", "white");
        circle.setAttribute("stroke-width", "1.5");
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", node.x);
        text.setAttribute("y", node.y + node.radius + 12);
        text.setAttribute("font-size", "11px");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-weight", "500");
        text.setAttribute("fill", "white");
        text.setAttribute("pointer-events", "none");
        
        // Use translated title, truncate if too long
        const displayTitle = translation.title.length > 20 
          ? translation.title.substring(0, 18) + '...' 
          : translation.title;
          
        text.textContent = displayTitle;
        
        nodeGroup.appendChild(circle);
        nodeGroup.appendChild(text);
        svg.appendChild(nodeGroup);
        
        // Add hover functionality with improved positioning and debugging
        nodeGroup.addEventListener('mouseenter', function(e) {
          e.stopPropagation();
          showTooltip(node, translation);
        });
        
        nodeGroup.addEventListener('mouseleave', function(e) {
          e.stopPropagation();
          hideTooltip();
        });

        // Additional safeguard - hide on click
        nodeGroup.addEventListener('click', function(e) {
          e.stopPropagation();
          hideTooltip();
        });
      });
      
    } catch (error) {
      console.error("Error initializing visualization:", error);
    }
  }

  onMount(() => {
    if (svg && hoverInfo && containerElement) {
      // Initial drawing of the visualization
      drawVisualization();
      
      // Add a global event listener to hide tooltip when mouse leaves the entire container
      containerElement.addEventListener('mouseleave', hideTooltip);
      
      // Add animation for stars twinkling
      const stars = document.querySelectorAll('.star');
      stars.forEach(star => {
        setInterval(() => {
          const newOpacity = parseFloat(star.getAttribute('opacity')) * (Math.random() * 0.5 + 0.75);
          star.setAttribute('opacity', newOpacity);
        }, Math.random() * 3000 + 2000);
      });
    }
  });
</script>

<div class="constellation-section">
  <h2>{text.title}</h2>
  <p>{text.intro}</p>
  
  <div class="constellation-container" bind:this={containerElement} style="height: {height}; width: {width};">
    <div class="hover-info" bind:this={hoverInfo}></div>
    <svg bind:this={svg} viewBox="0 0 1000 600">
      <!-- Content will be dynamically generated by JavaScript -->
    </svg>
  </div>
  
  <div class="legend">
    <div class="legend-item">
      <div class="legend-color" style="background-color: #4a6bde;"></div>
      <div>{text.legend.core}</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #52c41a;"></div>
      <div>{text.legend.principles}</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #722ed1;"></div>
      <div>{text.legend.structures}</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #eb2f96;"></div>
      <div>{text.legend.implementation}</div>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #faad14;"></div>
      <div>{text.legend.stakeholders}</div>
    </div>
  </div>
  
  <h3>{text.understanding.title}</h3>
  <p>{text.understanding.description}</p>
  
  <ul>
    {#each text.understanding.items as item}
      <li>{@html item}</li>
    {/each}
  </ul>
  
  <p>{text.understanding.connections}</p>
  
  <h3>{text.insights.title}</h3>
  <p>{text.insights.description}</p>
  
  <ul>
    {#each text.insights.items as item}
      <li>{@html item}</li>
    {/each}
  </ul>
</div>

<style>
  .constellation-section {
    margin: 2rem 0 3rem 0;
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .constellation-container {
    position: relative;
    width: 100%;
    height: 600px;
    margin: 20px 0;
    border-radius: 10px;
    background-color: #121636;
    overflow: hidden;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  h2, h3 {
    color: #2B4B8C;
  }

  p {
    line-height: 1.6;
    color: #4b5563;
  }

  ul {
    color: #4b5563;
    line-height: 1.6;
    list-style-type: none;
    padding-left: 1.5rem;
  }

  ul li {
    position: relative;
    margin-bottom: 0.75rem;
    padding-left: 1rem;
  }

  ul li::before {
    content: "✦";
    position: absolute;
    left: 0;
    color: #DAA520;
    font-size: 0.9rem;
  }

  .core-node {
    fill: #4a6bde;
  }

  .principle-node {
    fill: #52c41a;
  }

  .structure-node {
    fill: #722ed1;
  }

  .implementation-node {
    fill: #eb2f96;
  }

  .stakeholder-node {
    fill: #faad14;
  }

  .path {
    stroke-width: 1;
    fill: none;
  }

  .legend {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-size: 14px;
  }

  .legend-color {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .hover-info {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.96);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.1);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    max-width: 280px;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .hover-title {
    font-weight: 600;
    margin-bottom: 6px;
    color: #2B4B8C;
    font-size: 15px;
    line-height: 1.3;
  }

  .hover-description {
    color: #4b5563;
    font-size: 13px;
    line-height: 1.4;
  }

  .node text {
    font-size: 11px !important;
    text-anchor: middle;
    font-weight: 500;
    fill: white;
    pointer-events: none;
  }

  .node circle {
    stroke: white;
    stroke-width: 1.5;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .node:hover circle {
    transform: scale(1.1);
    stroke-width: 2;
  }

  .central-node text {
    font-size: 13px !important;
    font-weight: bold;
  }

  .central-node circle {
    stroke-width: 2;
  }

  .star {
    fill: white;
    opacity: 0.6;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .constellation-container {
      height: 400px;
    }

    .hover-info {
      max-width: 240px;
      padding: 10px 12px;
      font-size: 13px;
    }

    .hover-title {
      font-size: 14px;
    }

    .hover-description {
      font-size: 12px;
    }

    .legend {
      flex-direction: column;
      gap: 8px;
    }
  }

  @media (max-width: 480px) {
    .constellation-container {
      height: 350px;
    }

    .hover-info {
      max-width: 200px;
      padding: 8px 10px;
      font-size: 12px;
    }

    .hover-title {
      font-size: 13px;
    }

    .hover-description {
      font-size: 11px;
    }
  }
</style>
