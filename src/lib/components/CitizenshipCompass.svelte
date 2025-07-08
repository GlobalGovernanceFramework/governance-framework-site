<!-- src/lib/components/CitizenshipCompass.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { onMount } from 'svelte';
  import CompassInfoPanel from '$lib/components/CompassInfoPanel.svelte';
  import { generateRecommendations } from '$lib/data/compassData.js';
  
  export let quizResults = null;
  
  let selectedElement = null;
  let userProgress = {};
  let compassWrapper;
  let infoPanelElement;
  
  // Core values data with positions
  const coreValues = [
    { id: "life", position: { cx: 400, cy: 80 } },
    { id: "compassion", position: { cx: 530, cy: 120 } },
    { id: "justice", position: { cx: 650, cy: 230 } },
    { id: "truth", position: { cx: 620, cy: 370 } },
    { id: "freedom", position: { cx: 500, cy: 500 } },
    { id: "earth", position: { cx: 300, cy: 500 } },
    { id: "peace", position: { cx: 180, cy: 370 } },
    { id: "integrity", position: { cx: 150, cy: 230 } },
    { id: "gratitude", position: { cx: 270, cy: 120 } },
    { id: "wisdom", position: { cx: 400, cy: 520 } }
  ];
  
  // Development levels with positions
  const developmentLevels = [
    { id: "awareness", position: { cx: 400, cy: 180 }, radius: 120 },
    { id: "understanding", position: { cx: 570, cy: 248 }, radius: 190 },
    { id: "empathy", position: { cx: 530, cy: 430 }, radius: 260 },
    { id: "participation", position: { cx: 270, cy: 430 }, radius: 260 },
    { id: "leadership", position: { cx: 230, cy: 248 }, radius: 190 }
  ];
  
  $: recommendedFrameworks = generateRecommendations(quizResults);
  
  onMount(() => {
    const savedProgress = localStorage.getItem('citizenshipProgress');
    if (savedProgress) {
      userProgress = JSON.parse(savedProgress);
    }

    const handleClickOutside = (event) => {
      if (selectedElement && infoPanelElement && !infoPanelElement.contains(event.target)) {
        // Check if the click was on an interactive SVG element
        const clickedElement = event.target;
        const isInteractiveElement = clickedElement.classList.contains('clickable-element') || 
                                   clickedElement.closest('.clickable-element');
        
        // Only close if it's not an interactive element
        if (!isInteractiveElement) {
          selectedElement = null;
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function saveProgress(newProgress) {
    userProgress = newProgress;
    localStorage.setItem('citizenshipProgress', JSON.stringify(newProgress));
  }
  
  function handleElementClick(elementId, type) {
    selectedElement = { id: elementId, type };
    
    if (type === 'practice') {
      const newProgress = { ...userProgress };
      newProgress[elementId] = !newProgress[elementId];
      saveProgress(newProgress);
    }
  }

  // Function to determine panel position
  function getPanelPosition(elementId, type) {
    // Define right-side elements that should trigger left panel
    const rightSideElements = {
      values: ['compassion', 'justice', 'truth'], // Right-side values
      practices: ['understanding', 'empathy'] // Right-side practices
    };
    
    if (type === 'value' && rightSideElements.values.includes(elementId)) {
      return 'left';
    }
    
    if (type === 'practice' && rightSideElements.practices.includes(elementId)) {
      return 'left';
    }
    
    return 'right'; // Default to right side
  }

  // Calculate panel position based on selected element
  $: panelPosition = selectedElement ? getPanelPosition(selectedElement.id, selectedElement.type) : 'right';
    
  function closeInfoPanel() {
    selectedElement = null;
  }
  
  // Get recommended framework paths based on quiz results (for visual connections)
  function getRecommendedPaths() {
    if (!recommendedFrameworks || recommendedFrameworks.length === 0) return [];
    return recommendedFrameworks.slice(0, 3);
  }
</script>

<div class="compass-container">
  <!-- SVG Compass -->
  <div class="compass-wrapper" bind:this={compassWrapper}>
    <svg
      viewBox="0 0 800 600"
      class="citizenship-compass"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Background -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EBF4FF" />
          <stop offset="100%" stop-color="#E0F2FE" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="valueGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <!-- Background rectangle -->
      <rect 
        width="800" 
        height="600" 
        fill="url(#bgGradient)" 
        rx="15" 
        ry="15"
        class="background-clickable"
      />
      
      <!-- Orbital paths with dynamic highlighting -->
      {#each [120, 190, 260, 330] as radius, index}
        <circle
          cx="400"
          cy="300"
          r={radius}
          fill="none"
          stroke={getRecommendedPaths().length > index ? "#3B82F6" : "#E5E7EB"}
          stroke-width="3"
          stroke-dasharray="5 5"
          opacity="0.6"
          class="orbital-path"
        />
      {/each}
      
      <!-- Framework connection lines (when quiz completed) -->
      {#if quizResults}
        {#each getRecommendedPaths() as framework, index}
          <line
            x1="400"
            y1="300"
            x2={400 + Math.cos(index * Math.PI * 2 / 3) * (200 + index * 40)}
            y2={300 + Math.sin(index * Math.PI * 2 / 3) * (200 + index * 40)}
            stroke="#DAA520"
            stroke-width="2"
            stroke-dasharray="3 3"
            opacity="0.7"
            class="framework-connection"
          />
        {/each}
      {/if}
      
      <!-- Center circle: Shared Values -->
      <g filter="url(#glow)" class="center-values">
        <circle
          cx="400"
          cy="300"
          r="70"
          fill="#2B4B8C"
          class="clickable-element center-circle"
          on:click={() => handleElementClick('shared-values', 'center')}
        />
        <text
          x="400"
          y="290"
          text-anchor="middle"
          class="center-text-main"
        >
          {$t('findYourPlace.compass.center.title')}
        </text>
        <text
          x="400"
          y="310"
          text-anchor="middle"
          class="center-text-sub"
        >
          {$t('findYourPlace.compass.center.subtitle')}
        </text>
      </g>
      
      <!-- Development Levels -->
      {#each developmentLevels as level}
        <g class="development-level">
          <circle
            cx={level.position.cx}
            cy={level.position.cy}
            r="35"
            fill={userProgress[level.id] ? "#10B981" : "#6B7280"}
            class="clickable-element practice-circle"
            on:click={() => handleElementClick(level.id, 'practice')}
          />
          <text
            x={level.position.cx}
            y={level.position.cy - 5}
            text-anchor="middle"
            class="practice-text"
          >
            {$t(`findYourPlace.compass.levels.${level.id}.line1`)}
          </text>
          <text
            x={level.position.cx}
            y={level.position.cy + 10}
            text-anchor="middle"
            class="practice-text"
          >
            {$t(`findYourPlace.compass.levels.${level.id}.line2`)}
          </text>
          {#if userProgress[level.id]}
            <circle
              cx={level.position.cx}
              cy={level.position.cy}
              r="45"
              fill="none"
              stroke="#10B981"
              stroke-width="3"
              class="completion-ring"
            />
          {/if}
        </g>
      {/each}
      
      <!-- Core Values -->
      {#each coreValues as value}
        <g class="core-value" filter="url(#valueGlow)">
          <circle
            cx={value.position.cx}
            cy={value.position.cy}
            r="12"
            fill="#DAA520"
            class="clickable-element value-circle"
            on:click={() => handleElementClick(value.id, 'value')}
          />
          <!-- Value emoji icon -->
          <text
            x={value.position.cx}
            y={value.position.cy + 4}
            text-anchor="middle"
            class="value-emoji"
          >
            {$t(`findYourPlace.compass.valueDetails.${value.id}.icon`)}
          </text>
          <!-- Value title text -->
          <text
            x={value.position.cx}
            y={value.position.cy - 20}
            text-anchor="middle"
            class="value-text"
          >
            {$t(`findYourPlace.compass.valueDetails.${value.id}.title`)}
          </text>
        </g>
      {/each}
      
      <!-- Title -->
      <text
        x="400"
        y="40"
        text-anchor="middle"
        class="compass-title"
      >
        {$t('findYourPlace.compass.title')}
      </text>
    </svg>
    
    <!-- Info Panel Component -->
    <CompassInfoPanel 
      {selectedElement} 
      {userProgress} 
      {closeInfoPanel}
      position={panelPosition}
      bind:panelElement={infoPanelElement}
    />
  </div>
  
  <!-- Compass Legend -->
  <div class="compass-legend">
    <h3>{$t('findYourPlace.compass.legend.title')}</h3>
    <div class="legend-items">
      <div class="legend-item">
        <div class="legend-color center-color"></div>
        <span>{$t('findYourPlace.compass.legend.values')}</span>
      </div>
      <div class="legend-item">
        <div class="legend-color practice-color"></div>
        <span>{$t('findYourPlace.compass.legend.practices')}</span>
      </div>
      <div class="legend-item">
        <div class="legend-color value-color"></div>
        <span>{$t('findYourPlace.compass.legend.coreValues')}</span>
      </div>
      <div class="legend-item">
        <div class="legend-color completed-color"></div>
        <span>{$t('findYourPlace.compass.legend.completed')}</span>
      </div>
    </div>
  </div>
</div>

<style>
  .background-clickable {
    cursor: default;
  }

  .background-clickable:hover {
    cursor: default;
  }

  .compass-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .compass-wrapper {
    position: relative;
    width: 100%;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .citizenship-compass {
    width: 100%;
    height: auto;
    min-height: 600px;
    display: block;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
  }
  
  /* Interactive elements */
  .clickable-element {
    cursor: pointer;
    transition: all 0.2s ease;
    transform-origin: center center;
    transform-box: fill-box;
  }
  
  .center-circle:hover {
    fill: #1E40AF;
    transform: scale(1.02);
  }
  
  .practice-circle:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
  
  .value-circle:hover {
    transform: scale(1.1);
    fill: #B8860B;
  }
  
  /* Text styles */
  .center-text-main {
    fill: white;
    font-weight: bold;
    font-size: 16px;
    pointer-events: none;
  }
  
  .center-text-sub {
    fill: white;
    font-size: 12px;
    pointer-events: none;
  }
  
  .practice-text {
    fill: white;
    font-weight: bold;
    font-size: 11px;
    pointer-events: none;
  }
  
  .value-text {
    fill: #2B4B8C;
    font-weight: bold;
    font-size: 10px;
    pointer-events: none;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  }
  
  .value-emoji {
    fill: white;
    font-size: 12px;
    pointer-events: none;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  .compass-title {
    fill: #2B4B8C;
    font-weight: bold;
    font-size: 20px;
    pointer-events: none;
  }
  
  /* Animation effects */
  .orbital-path {
    transition: stroke 0.5s ease;
  }
  
  .framework-connection {
    animation: pulse 2s infinite;
  }
  
  .completion-ring {
    animation: glow 1.5s ease-in-out infinite alternate;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  @keyframes glow {
    from { stroke-width: 3; opacity: 0.8; }
    to { stroke-width: 5; opacity: 1; }
  }
  
  /* Compass Legend */
  .compass-legend {
    margin-top: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .compass-legend h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 1rem;
    margin-top: 0;
  }
  
  .legend-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .center-color {
    background-color: #2B4B8C;
  }
  
  .practice-color {
    background-color: #6B7280;
  }
  
  .value-color {
    background-color: #DAA520;
  }
  
  .completed-color {
    background-color: #10B981;
  }
  
  .legend-item span {
    color: #4B5563;
    font-weight: 500;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .compass-title {
      font-size: 16px;
    }
    
    .center-text-main {
      font-size: 14px;
    }
    
    .value-text {
      font-size: 9px;
    }
    
    .value-emoji {
      font-size: 10px;
    }
    
    .legend-items {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .citizenship-compass {
      min-height: 400px;
    }
    
    .legend-items {
      grid-template-columns: 1fr;
    }
    
    .compass-legend {
      padding: 1rem;
    }
  }
</style>
