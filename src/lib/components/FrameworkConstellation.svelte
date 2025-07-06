<!-- src/lib/components/FrameworkConstellation.svelte -->
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { base } from '$app/paths';
  import { t } from '$lib/i18n';
  import { allFrameworks, getFrameworksByTier, getFrameworkBySlug } from '$lib/stores/frameworkNav.js';

  // Props
  export let hoveredFramework = null;
  export let activeFramework = null;
  export let isMobile = false;

  let windowWidth = 1200;
  
  // Constellation animation
  const pulseScale = tweened(1, { duration: 2000, easing: cubicOut });
  
  onMount(() => {
    windowWidth = window.innerWidth;
    
    const handleResize = () => {
      windowWidth = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);
    
    // Start the pulse animation for Treaty node
    const pulse = () => {
      pulseScale.set(1.15).then(() => {
        pulseScale.set(1).then(() => {
          setTimeout(pulse, 3000);
        });
      });
    };
    pulse();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // Dynamic tier configuration based on screen size - using i18n
  function getTierConfig(width) {
    const isCompact = width < 900;
    const isMedium = width >= 900 && width < 1200;
    
    // Use the short titles from framework.json
    const tier0Title = $t('framework.tier.0.title') || 'Tier 0: Global Institutional Reform';
    const tier1Title = $t('framework.tier.1.title') || 'Tier 1: Urgent Global Stability & Justice';
    const tier2Title = $t('framework.tier.2.title') || 'Tier 2: Systems for Long-Term Thriving';
    const tier3Title = $t('framework.tier.3.title') || 'Tier 3: Equity, Culture & Future Generations';
    const tier4Title = $t('framework.tier.4.title') || 'Tier 4: Visionary & Meta Governance';
    
    if (isCompact) {
      return {
        0: { color: '#fbbf24', title: tier0Title, radius: 0, description: $t('framework.tier.0.description') || 'Core treaty and institutional frameworks' },
        1: { color: '#60a5fa', title: tier1Title, radius: 18, description: $t('framework.tier.1.description') || 'Critical areas requiring immediate action' },
        2: { color: '#34d399', title: tier2Title, radius: 28, description: $t('framework.tier.2.description') || 'Foundational systems for sustainable thriving' },
        3: { color: '#a78bfa', title: tier3Title, radius: 36, description: $t('framework.tier.3.description') || 'Inclusion and future generations' },
        4: { color: '#f472b6', title: tier4Title, radius: 42, description: $t('framework.tier.4.description') || 'Forward-looking and meta-governance' }
      };
    } else if (isMedium) {
      return {
        0: { color: '#fbbf24', title: tier0Title, radius: 0, description: $t('framework.tier.0.description') || 'Core treaty and institutional frameworks' },
        1: { color: '#60a5fa', title: tier1Title, radius: 22, description: $t('framework.tier.1.description') || 'Critical areas requiring immediate action' },
        2: { color: '#34d399', title: tier2Title, radius: 34, description: $t('framework.tier.2.description') || 'Foundational systems for sustainable thriving' },
        3: { color: '#a78bfa', title: tier3Title, radius: 44, description: $t('framework.tier.3.description') || 'Inclusion and future generations' },
        4: { color: '#f472b6', title: tier4Title, radius: 52, description: $t('framework.tier.4.description') || 'Forward-looking and meta-governance' }
      };
    } else {
      return {
        0: { color: '#fbbf24', title: tier0Title, radius: 0, description: $t('framework.tier.0.description') || 'Core treaty and institutional frameworks' },
        1: { color: '#60a5fa', title: tier1Title, radius: 25, description: $t('framework.tier.1.description') || 'Critical areas requiring immediate action' },
        2: { color: '#34d399', title: tier2Title, radius: 38, description: $t('framework.tier.2.description') || 'Foundational systems for sustainable thriving' },
        3: { color: '#a78bfa', title: tier3Title, radius: 48, description: $t('framework.tier.3.description') || 'Inclusion and future generations' },
        4: { color: '#f472b6', title: tier4Title, radius: 56, description: $t('framework.tier.4.description') || 'Forward-looking and meta-governance' }
      };
    }
  }

  // Create constellation nodes with asymmetric elliptical positioning
  function createConstellationNodes() {
    const nodes = [];
    const currentTierConfig = getTierConfig(windowWidth);
    
    // Central Treaty node (Tier 0)
    const treaty = getFrameworkBySlug('treaty-for-our-only-home');
    if (treaty) {
      nodes.push({
        ...treaty,
        x: 50,
        y: 50,
        size: 6, // Increased size for Treaty node to accommodate emoji
        description: getFrameworkDescription('treatyforouronlyhome'),
        tagline: getFrameworkTagline('treatyforouronlyhome'),
        tier: 0
      });
    }

    // Generate positions along elliptical paths with asymmetric distributions
    function generateAsymmetricElliptical(tierNum, leftCount, rightCount) {
      const positions = [];
      const radius = currentTierConfig[tierNum].radius;
      const centerX = 50;
      const centerY = 50;
      const ellipseRatioY = 0.95;
      
      // Left side positions
      for (let i = 0; i < leftCount; i++) {
        const angleStart = Math.PI / 2;
        const angleEnd = 3 * Math.PI / 2;
        const angleRange = angleEnd - angleStart;
        const angle = angleStart + (angleRange / (leftCount + 1)) * (i + 1);
        
        const jitter = (Math.random() - 0.5) * 0.08;
        const finalAngle = angle + jitter;
        const radiusVariation = 1 + (Math.random() - 0.5) * 0.04;
        const finalRadius = radius * radiusVariation;
        
        const x = centerX + finalRadius * Math.cos(finalAngle);
        const y = centerY + finalRadius * ellipseRatioY * Math.sin(finalAngle);
        positions.push({ x, y });
      }
      
      // Right side positions
      for (let i = 0; i < rightCount; i++) {
        const angleStart = -Math.PI / 2;
        const angleEnd = Math.PI / 2;
        const angleRange = angleEnd - angleStart;
        const angle = angleStart + (angleRange / (rightCount + 1)) * (i + 1);
        
        const jitter = (Math.random() - 0.5) * 0.08;
        const finalAngle = angle + jitter;
        const radiusVariation = 1 + (Math.random() - 0.5) * 0.04;
        const finalRadius = radius * radiusVariation;
        
        const x = centerX + finalRadius * Math.cos(finalAngle);
        const y = centerY + finalRadius * ellipseRatioY * Math.sin(finalAngle);
        positions.push({ x, y });
      }
      
      return positions;
    }

    // Asymmetric positioning configuration
    const asymmetricPositions = {
      1: (() => {
        const positions = [];
        const radius = currentTierConfig[1].radius + 3;
        const centerX = 50;
        const centerY = 50;
        const angleStep = (2 * Math.PI) / 14;
        
        for (let i = 0; i < 14; i++) {
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          positions.push({ x, y });
        }
        return positions;
      })(),
      2: generateAsymmetricElliptical(2, 7, 6),
      3: generateAsymmetricElliptical(3, 4, 5),
      4: generateAsymmetricElliptical(4, 3, 2)
    };

    // Position frameworks using asymmetric elliptical layout
    [1, 2, 3, 4].forEach(tier => {
      const tierFrameworks = getFrameworksByTier(tier);
      const positions = asymmetricPositions[tier];
      // Increased node sizes to accommodate emojis
      const nodeSize = tier === 1 ? 4.5 : tier === 2 ? 3.2 : tier === 3 ? 2.6 : 2.2;
      
      tierFrameworks.forEach((framework, index) => {
        if (index < positions.length) {
          const cleanSlug = framework.slug.replace(/-/g, '');
          nodes.push({
            ...framework,
            x: positions[index].x,
            y: positions[index].y,
            size: nodeSize,
            description: getFrameworkDescription(cleanSlug),
            tagline: getFrameworkTagline(cleanSlug),
            tier: tier
          });
        }
      });
    });

    return nodes;
  }

  // Get custom descriptions and taglines for frameworks
  function getFrameworkDescription(slug) {
    const translationKey = `home.constellation.descriptions.${slug.replace(/-/g, '')}`;
    const description = $t(translationKey);
    return description || "Framework for global governance and coordination";
  }

  function getFrameworkTagline(slug) {
    const translationKey = `home.constellation.taglines.${slug.replace(/-/g, '')}`;
    const tagline = $t(translationKey);
    return tagline !== translationKey ? tagline : null; // Return null if no tagline exists
  }

  // Define connections between frameworks
  function getConnections() {
    return [
      ['treaty-for-our-only-home', 'climate-and-energy-governance'],
      ['treaty-for-our-only-home', 'economic-integration'],
      ['treaty-for-our-only-home', 'peace-and-conflict-resolution'],
      ['treaty-for-our-only-home', 'gaian-trade-framework'],
      ['gaian-trade-framework', 'economic-integration'],
      ['aurora-accord', 'technology-governance'],
      ['planetary-health', 'climate-and-energy-governance'],
      ['financial-systems', 'economic-integration']
    ];
  }

  $: currentTierConfig = getTierConfig(windowWidth);
  $: frameworkNodes = createConstellationNodes();
  $: connections = getConnections();

  // Event handlers (dispatch events to parent)
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleNodeClick(framework) {
    dispatch('nodeClick', framework);
  }

  function handleNodeHover(framework) {
    dispatch('nodeHover', framework);
  }

  function handleNodeLeave() {
    dispatch('nodeLeave');
  }

  function handleBackgroundClick() {
    dispatch('backgroundClick');
  }

  // Get framework title with smart truncation and fallback
  function getDisplayTitle(framework) {
    let title;
    
    // Try to get the translated title first
    try {
      title = $t(framework.titleKey);
      // If translation returns the key itself, it means translation failed
      if (title === framework.titleKey) {
        throw new Error('Translation not found');
      }
    } catch (error) {
      // Fallback: Create a readable title from the slug
      title = framework.slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Smart truncation for display
    const words = title.split(' ');
    if (words.length <= 3) return title;
    if (words.length === 4) return words.slice(0, 3).join(' ');
    return words.slice(0, 3).join(' ') + '...';
  }
</script>

<div class="constellation-container">
  <!-- Background area for mobile tap-to-deselect -->
  <div class="constellation-background" on:click={handleBackgroundClick}></div>
  
  <svg viewBox="-10 -10 120 120" class="constellation-svg">
    <!-- Define filters for better text rendering -->
    <defs>
      <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feMorphology operator="dilate" radius="0.5"/>
        <feFlood flood-color="#000000" flood-opacity="0.8"/>
        <feComposite in="SourceGraphic"/>
      </filter>
      <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Tier rings -->
    {#each Object.entries(currentTierConfig) as [tier, config]}
      {#if config.radius > 0}
        {@const actualRadius = tier === '1' ? config.radius + 3 : config.radius}
        {@const ellipseRatio = tier === '1' ? 1.0 : 0.95}
        <ellipse 
          cx="50" 
          cy="50" 
          rx={actualRadius} 
          ry={actualRadius * ellipseRatio}
          fill="none" 
          stroke={config.color} 
          stroke-width="0.3" 
          stroke-dasharray="5,3" 
          opacity="0.25"
          class="tier-ring tier-ring-{tier}"
        />
      {/if}
    {/each}
    
    <!-- Connection Lines -->
    {#each connections as [from, to]}
      {@const fromNode = frameworkNodes.find(n => n.slug === from)}
      {@const toNode = frameworkNodes.find(n => n.slug === to)}
      {#if fromNode && toNode}
        <line
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke={hoveredFramework === from || hoveredFramework === to ? '#fbbf24' : 'rgba(255,255,255,0.12)'}
          stroke-width={hoveredFramework === from || hoveredFramework === to ? '0.8' : '0.15'}
          opacity={hoveredFramework === from || hoveredFramework === to ? '1' : '0.3'}
          style="pointer-events: none;"
        />
      {/if}
    {/each}

    <!-- Framework Nodes -->
    {#each frameworkNodes as framework}
      {@const isActive = hoveredFramework === framework.slug || activeFramework === framework.slug}
      {@const isPulsing = framework.slug === 'treaty-for-our-only-home'}
      {@const tierColor = currentTierConfig[framework.tier].color}
      
      <g class="framework-node" class:active-node={activeFramework === framework.slug}>
        <!-- Invisible larger circle for better hover detection -->
        <circle
          cx={framework.x}
          cy={framework.y}
          r={framework.size + 2}
          fill="transparent"
          style="cursor: pointer;"
          on:click={() => handleNodeClick(framework)}
          on:mouseenter={() => handleNodeHover(framework)}
          on:mouseleave={handleNodeLeave}
          role="button"
          tabindex="-1"
          aria-label={getDisplayTitle(framework)}
          class="hover-circle"
        />
        
        <!-- Visible Node Circle -->
        <circle
          cx={framework.x}
          cy={framework.y}
          r={framework.size}
          fill={tierColor}
          stroke={isActive ? '#fbbf24' : 'white'}
          stroke-width={isActive ? '0.8' : '0.4'}
          class="node-circle"
          class:pulsing={isPulsing}
          class:highlighted={isActive}
          style="pointer-events: none;"
        />
        
        <!-- Framework Emoji -->
        <text
          x={framework.x}
          y={framework.y}
          text-anchor="middle"
          dominant-baseline="central"
          font-size={framework.tier === 0 ? '4' : framework.tier === 1 ? '3.5' : framework.tier === 2 ? '3.0' : framework.tier === 3 ? '2.5' : '2.0'}
          style="pointer-events: none; user-select: none;"
          class="framework-emoji"
        >
          {framework.emoji}
        </text>
      </g>
    {/each}

    <!-- Framework Title Text Layer (rendered on top) -->
    {#each frameworkNodes as framework}
      {@const isActive = hoveredFramework === framework.slug || activeFramework === framework.slug}
      {#if isActive}
        <!-- Background stroke for contrast -->
        <text
          x={framework.x}
          y={framework.y - framework.size - 4}
          text-anchor="middle"
          font-size="2.2"
          font-weight="bold"
          fill="black"
          stroke="black"
          stroke-width="1.2"
          style="pointer-events: none;"
        >
          {framework.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </text>
        <!-- Foreground text -->
        <text
          x={framework.x}
          y={framework.y - framework.size - 4}
          text-anchor="middle"
          font-size="2.2"
          font-weight="bold"
          fill="#ffffff"
          style="pointer-events: none;"
        >
          {framework.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </text>
      {/if}
    {/each}
  </svg>
</div>

<style>
  .constellation-container {
    position: relative;
    flex: 1;
    min-width: 600px;
  }

  .constellation-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: auto;
  }

  .constellation-svg {
    width: 100%;
    height: 500px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 2;
    max-width: 100%;
    overflow: visible;
    /* Isolate stacking context to prevent filter bleeding */
    isolation: isolate;
  }

  .framework-emoji {
    font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .framework-node {
    transition: all 0.3s ease;
  }

  .hover-circle {
    outline: none !important;
  }

  .hover-circle:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .node-circle {
    transition: stroke 0.2s ease, stroke-width 0.2s ease, r 0.2s ease;
    transform-box: fill-box;
    /* Remove filter transition to prevent artifacts */
  }

  .node-circle.highlighted {
    /* Use transform scale instead of filter for better performance */
    transform: scale(1.1);
    stroke: #fbbf24;
    stroke-width: 0.8;
  }

  .node-circle.pulsing {
    /* Simplified pulse animation using transform only */
    animation: simplePulse 4s ease-in-out infinite;
  }

  .framework-title-text {
    animation: titleFadeIn 0.3s ease-out;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    pointer-events: none;
    z-index: 100;
    dominant-baseline: text-before-edge;
    text-anchor: middle;
  }

  /* Remove any gradients that might be causing issues */
  .constellation-svg * {
    background: none !important;
    background-image: none !important;
  }

  @keyframes titleFadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Simplified pulse animation without filters */
  @keyframes simplePulse {
    0%, 100% { 
      transform: scale(1);
      stroke-width: 0.4;
    }
    50% { 
      transform: scale(1.15);
      stroke-width: 0.6;
    }
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .constellation-container {
      min-width: 500px;
    }
    
    .framework-title-text {
      font-size: 2.2;
    }
  }

  @media (max-width: 900px) {
    .constellation-container {
      min-width: 100%;
    }
    
    .constellation-svg {
      height: 400px;
    }
    
    .framework-title-text {
      font-size: 2.0;
    }
  }

  @media (max-width: 640px) {
    .constellation-svg {
      height: 300px;
    }
    
    .framework-node {
      transform: translateZ(0);
    }
    
    .framework-title-text {
      font-size: 1.8;
    }
  }

  /* Focus styles for accessibility - Remove yellow boxes */
  .hover-circle:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.5) !important;
    border-radius: 50%;
  }

  .framework-node:focus-within {
    outline: none;
  }

  /* Remove all default focus styling */
  .framework-node circle:focus,
  .hover-circle:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  /* Custom focus ring for accessibility */
  .framework-node:focus-within .node-circle {
    stroke: #fbbf24;
    stroke-width: 1.2;
    transform: scale(1.1);
  }

  /* Improved text rendering for better visibility */
  .framework-title-text {
    dominant-baseline: text-before-edge;
    text-anchor: middle;
  }
</style>
