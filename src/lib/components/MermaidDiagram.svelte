<!-- MermaidDiagram.svelte -->
<script>
  import { onMount } from 'svelte';
  import mermaid from 'mermaid';
  
  export let diagram = '';
  export let id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
  
  let element;
  
  onMount(async () => {
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        // Use your tier colors here
        primaryColor: '#60a5fa',
        primaryTextColor: '#000',
        primaryBorderColor: '#2563eb'
      }
    });
    
    const { svg } = await mermaid.render(id, diagram);
    element.innerHTML = svg;
  });
</script>

<div bind:this={element} class="mermaid-container">
  <!-- Mermaid will render here -->
</div>

<style>
  .mermaid-container {
    width: 100%;
    overflow-x: auto;
  }
</style>
