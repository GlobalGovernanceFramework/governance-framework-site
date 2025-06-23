<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/DataPacket.svelte -->
<script>
  export let packet;
  export let sovereigntyMode = false;
  export let isSelected = false;
  
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  function handleClick() {
    dispatch('click');
  }
  
  // Calculate the position along the path based on progress
  $: sourceNode = packet.path.source;
  $: targetNode = packet.path.target;
  $: progress = tweened(0, {
    duration: 1000,
    easing: cubicOut
  });
  
  $: {
    progress.set(packet.progress);
  }
  
  $: x = sourceNode.x + (targetNode.x - sourceNode.x) * $progress;
  $: y = sourceNode.y + (targetNode.y - sourceNode.y) * $progress;
  
  // Determine packet styling based on data type
  $: packetColor = getPacketColor(packet.data.type);
  $: packetSize = 5 + (packet.data.size / 20);
  
  function getPacketColor(type) {
    switch(type) {
      case 'Health': return '#ef4444';
      case 'Climate': return '#10b981';
      case 'Education': return '#3b82f6';
      case 'Cultural': return '#f59e0b';
      default: return '#8b5cf6';
    }
  }
  
  // Special effect when passing sovereignty checkpoints
  $: checkpointPassed = $progress > 0.5 && packet.data.sovereignty && sovereigntyMode;
  $: verified = packet.verified || checkpointPassed;
</script>

<g 
  transform={`translate(${x}, ${y})`}
  on:click={handleClick}
  class="packet"
  class:selected={isSelected}
>
  <!-- Selection ring if selected -->
  {#if isSelected}
    <circle
      r={packetSize * 1.8}
      fill="transparent"
      stroke="#4a1d96"
      stroke-width="1.5"
      stroke-dasharray="2,2"
    />
  {/if}
  
  <!-- Data packet visualization -->
  <rect
    x={-packetSize/2}
    y={-packetSize/2}
    width={packetSize}
    height={packetSize}
    rx="2"
    fill={packetColor}
    stroke="#ffffff"
    stroke-width="1"
    class:verified={verified}
  />
  
  <!-- Sovereignty verification effect -->
  {#if verified && sovereigntyMode}
    <circle
      r={packetSize * 1.2}
      fill="transparent"
      stroke="#10b981"
      stroke-width="1"
      opacity="0.7"
    />
  {/if}
  
  <!-- Type indicator (smaller version of the icon) -->
  <text
    text-anchor="middle"
    font-size={packetSize * 0.4}
    fill="#ffffff"
    font-weight="bold"
    dy="0.35em"
  >{packet.data.type.charAt(0)}</text>
</g>

<style>
  .packet {
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .packet:hover {
    transform: scale(1.2);
  }
  
  .packet.selected {
    filter: drop-shadow(0 0 3px rgba(74, 29, 150, 0.8));
  }
  
  rect {
    transition: transform 0.2s ease;
  }
  
  .verified {
    filter: drop-shadow(0 0 3px rgba(16, 185, 129, 0.7));
  }
  
  text {
    pointer-events: none;
    user-select: none;
  }
</style>
