<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/Node.svelte -->
<script>
  export let node;
  export let isSelected = false;
  
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  
  function handleClick() {
    dispatch('click');
  }
  
  // Node type styling
  $: nodeColor = getNodeColor(node.type);
  $: nodeSize = getNodeSize(node.type);
  $: ringColor = isSelected ? '#4a1d96' : 'transparent';
  
  function getNodeColor(type) {
    switch(type) {
      case 'local': return '#8b5cf6';
      case 'regional': return '#6d28d9';
      case 'global': return '#4a1d96';
      case 'device': return '#a78bfa';
      default: return '#c4b5fd';
    }
  }
  
  function getNodeSize(type) {
    switch(type) {
      case 'local': return 20;
      case 'regional': return 25;
      case 'global': return 30;
      case 'device': return 15;
      default: return 18;
    }
  }
</script>

<g 
  class="node-container"
  transform={`translate(${node.x}, ${node.y})`}
  on:click={handleClick}
  role="button"
  tabindex="0"
>
  <!-- This group will handle the hover effect -->
  <g class="node" class:selected={isSelected}>
    <!-- Selection ring -->
    {#if isSelected}
      <circle
        r={nodeSize + 4}
        fill="transparent"
        stroke={ringColor}
        stroke-width="2"
        stroke-dasharray="4,2"
        in:scale={{duration: 200, start: 0.8}}
      />
    {/if}
    
    <!-- Main node circle -->
    <circle
      r={nodeSize}
      fill={nodeColor}
      stroke="#ffffff"
      stroke-width="2"
    />
    
    <!-- Node label -->
    <text
      text-anchor="middle"
      dy="0.3em"
      fill="#ffffff"
      font-size="10"
      font-weight="bold"
    >{node.label}</text>
    
    <!-- Data sovereignty indicator if applicable -->
    {#if node.dataSovereignty}
      <circle
        r="5"
        cx={nodeSize - 5}
        cy={-nodeSize + 5}
        fill="#10b981"
        stroke="#ffffff"
        stroke-width="1"
      />
    {/if}
  </g>
</g>

<style>
  .node-container {
    cursor: pointer;
  }
  
  .node {
    transition: transform 0.2s ease;
    /* Important: This ensures the transform origin is at the center of the node */
    transform-origin: center;
  }
  
  .node:hover {
    transform: scale(1.005); /* Subtle scale effect */
  }
  
  .node.selected {
    filter: drop-shadow(0 0 5px rgba(109, 40, 217, 0.5));
  }
  
  text {
    pointer-events: none;
    user-select: none;
  }
</style>
