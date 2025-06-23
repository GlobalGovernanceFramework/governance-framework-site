<!-- src/routes/frameworks/visuals/digital/data-flow-simulator/components/Connection.svelte -->
<script>
  export let connection;
  
  // Draw a curved path between nodes
  $: path = createPath(connection);
  
  function createPath(conn) {
    const dx = conn.target.x - conn.source.x;
    const dy = conn.target.y - conn.source.y;
    const dr = Math.sqrt(dx * dx + dy * dy);
    
    // If bandwidth is high, make the line thicker
    const strokeWidth = conn.bandwidth ? 1 + Math.min(3, conn.bandwidth / 30) : 1.5;
    
    return {
      d: `M${conn.source.x},${conn.source.y} A${dr},${dr} 0 0,1 ${conn.target.x},${conn.target.y}`,
      strokeWidth
    };
  }
  
  // Determine connection type styling
  $: strokeColor = getConnectionColor(connection.type);
  $: strokeDasharray = connection.type === 'backup' ? '5,5' : 'none';
  
  function getConnectionColor(type) {
    switch(type) {
      case 'main': return '#6d28d9';
      case 'backup': return '#a78bfa';
      case 'regional': return '#8b5cf6';
      case 'global': return '#4a1d96';
      default: return '#c4b5fd';
    }
  }
</script>

<path
  d={path.d}
  fill="none"
  stroke={strokeColor}
  stroke-width={path.strokeWidth}
  stroke-dasharray={strokeDasharray}
  opacity="0.7"
/>

<!-- Sovereignty checkpoints if applicable -->
{#if connection.sovereigntyCheck}
  <circle
    cx={connection.source.x + (connection.target.x - connection.source.x) * 0.5}
    cy={connection.source.y + (connection.target.y - connection.source.y) * 0.5}
    r="5"
    fill="#10b981"
    stroke="#ffffff"
    stroke-width="1"
  />
{/if}

<style>
  path {
    transition: stroke-width 0.3s ease, opacity 0.3s ease;
  }
  
  path:hover {
    opacity: 1;
  }
</style>
