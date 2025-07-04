<!-- src/routes/frameworks/global-citizenship/full-framework/+page.svelte -->
<!-- src/routes/frameworks/global-citizenship/full-framework/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { t, locale } from '$lib/i18n';
  import { base } from '$app/paths';
  import FrameworkSidebar from '$lib/components/FrameworkSidebar.svelte';
  import InfoBox from '$lib/components/InfoBox.svelte';
  
  export let data;
  
  // For handling the table of contents and navigation
  let sections = [];
  let activeSection = '';
  let contentElement;
  
  // Add a flag to handle hydration properly
  let isMounted = false;
  
  // Observer for determining which section is in view
  let observer;
  
  // Function to download the PDF
  function downloadPdf() {
    const langPath = $locale === 'sv' ? 'sv' : 'en';
    const downloadUrl = `${base}/downloads/${langPath}/Global-Citizenship.pdf`;
    window.open(downloadUrl, '_blank');
  }
  
  onMount(() => {
    // Set mounted flag to prevent hydration issues
    isMounted = true;
    
    // Wait for content to be rendered
    setTimeout(() => {
      if (!contentElement) return;
      
      // Find all section headings
      const sectionHeadings = contentElement.querySelectorAll('h2');
      sections = Array.from(sectionHeadings).map(heading => {
        // Add IDs to headings that don't have them
        if (!heading.id) {
          heading.id = heading.textContent
            .toLowerCase()
            .replace(/[^\w]+/g, '-');
        }
        
        return {
          id: heading.id,
          title: heading.textContent
        };
      });
      
      // Set up intersection observer for detecting active section
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        });
      }, { rootMargin: '-100px 0px -80% 0px' });
      
      // Observe all section headings
      sectionHeadings.forEach(heading => observer.observe(heading));
    }, 500);
    
    return () => {
      // Clean up observer when component unmounts
      if (observer) {
        observer.disconnect();
      }
    };
  });
  
  // Smooth scroll to section function
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<div class="documentation-container">
  <FrameworkSidebar />
  
  <div class="content">
    <!-- Framework title and introduction -->
    <div class="framework-header">
      <h1>{$locale === 'sv' ? 'Ramverk för Globalt Medborgarskap' : 'Global Citizenship Practice Framework'}</h1>
      
      <InfoBox 
        title={$locale === 'sv' ? 'Fullständigt ramverk' : 'Complete Framework'} 
        color="#2B4B8C"
        background="#f0f4f9"
        borderTop="#DAA520">
        <p>{$locale === 'sv' 
          ? 'Detta är den fullständiga versionen av ramverket för globalt medborgarskap, som ger en djupgående guide för att förstå och utöva global medborgarskap på alla nivåer.' 
          : 'This is the complete version of the Global Citizenship Framework, providing an in-depth guide to understanding and practicing global citizenship at all levels.'}</p>
      </InfoBox>
      
      <!-- Download options and back link -->
      <div class="action-links">
        <a href="{base}/frameworks/global-citizenship" class="secondary-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {$locale === 'sv' ? 'Tillbaka till översikt' : 'Back to Overview'}
        </a>
        <button class="primary-link" on:click={downloadPdf}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          {$locale === 'sv' ? 'Ladda ner PDF-version' : 'Download PDF Version'}
        </button>
      </div>
    </div>
    
    <!-- Table of contents sidebar (fixed position on desktop) -->
    <div class="toc-container">
      <div class="toc">
        <h3>{$locale === 'sv' ? 'Innehållsförteckning' : 'Table of Contents'}</h3>
        <ul>
          {#each sections as section}
            <li class={activeSection === section.id ? 'active' : ''}>
              <a href="#{section.id}" on:click|preventDefault={() => scrollToSection(section.id)}>
                {section.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    
    <!-- Main framework content -->
    <div class="framework-content" bind:this={contentElement}>
      <!-- Swedish translation notice is now removed -->
      
      <!-- Conditionally render based on mount status to prevent hydration errors -->
      {#if isMounted}
        <svelte:component this={data.component} />
      {:else}
        <div class="loading-placeholder">
          {$locale === 'sv' ? 'Laddar innehåll...' : 'Loading content...'}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    position: relative;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }
  }

  .loading-placeholder {
    padding: 2rem;
    color: #6b7280;
    font-style: italic;
    text-align: center;
  }
  
  .content {
    min-width: 0;
    position: relative;
  }
  
  .framework-header {
    margin-bottom: 2rem;
  }
  
  .framework-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-bottom: 1.5rem;
  }
  
  .action-links {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }
  
  .primary-link, .secondary-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .primary-link {
    background-color: #2B4B8C;
    color: white;
  }
  
  .primary-link:hover {
    background-color: #1d3a6a;
    transform: translateY(-2px);
  }
  
  .secondary-link {
    background-color: white;
    color: #2B4B8C;
    border: 2px solid #2B4B8C;
  }
  
  .secondary-link:hover {
    background-color: #f0f4f9;
    transform: translateY(-2px);
  }
  
  /* Table of Contents */
  .toc-container {
    display: none;
  }
  
  @media (min-width: 992px) {
    .toc-container {
      display: block;
      width: 220px;
      position: absolute;
      right: -250px;
      top: 2rem;
    }
    
    .toc {
      position: relative; /* Changed from sticky to relative */
      max-height: none; /* Remove height restriction */
      padding: 1rem;
      background-color: #f9fafb;
      border-radius: 0.5rem;
      border-left: 3px solid #DAA520;
      overflow-y: visible; /* Allow natural overflow */
    }
    
    .toc h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2B4B8C;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .toc ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .toc li {
      margin-bottom: 0.5rem;
    }
    
    .toc a {
      display: block;
      padding: 0.5rem;
      color: #4b5563;
      text-decoration: none;
      border-radius: 0.25rem;
      transition: all 0.2s;
      font-size: 0.9rem;
    }
    
    .toc a:hover {
      background-color: #f3f4f6;
      color: #2B4B8C;
    }
    
    .toc li.active a {
      background-color: #e9f2e9;
      color: #2B4B8C;
      font-weight: 600;
      border-left: 2px solid #2B4B8C;
      padding-left: 0.75rem;
    }
  }
  
  /* Framework Content */
  .framework-content {
    line-height: 1.7;
    color: #4b5563;
  }
  
  .framework-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2B4B8C;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    padding-top: 1rem;
    border-top: 2px solid #e5e7eb;
    scroll-margin-top: 2rem;
  }
  
  .framework-content h2:first-child {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }
  
  .framework-content h3 {
    font-size: 1.35rem;
    font-weight: 600;
    color: #2D5F2D;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .framework-content h4 {
    font-size: 1.15rem;
    font-weight: 600;
    color: #654321;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .framework-content p {
    margin-bottom: 1.25rem;
  }
  
  .framework-content ul, .framework-content ol {
    margin-bottom: 1.5rem;
    padding-left: 1.75rem;
  }
  
  .framework-content li {
    margin-bottom: 0.5rem;
  }
  
  .framework-content ul li {
    list-style-type: none;
    position: relative;
  }
  
  .framework-content ul li::before {
    content: "✦";
    position: absolute;
    left: -1.5rem;
    color: #DAA520;
    font-size: 0.9rem;
  }
  
  .framework-content ul ul li::before {
    content: "✧";
    color: #6B5CA5;
  }
  
  .framework-content a {
    color: #B8860B;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  
  .framework-content a:hover {
    color: #2B4B8C;
  }
  
  .framework-content blockquote {
    background-color: #f3f6f9;
    border-left: 4px solid #6B5CA5;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }
  
  .framework-content blockquote p:last-child {
    margin-bottom: 0;
  }
  
  .framework-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  
  .framework-content th, .framework-content td {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
  }
  
  .framework-content th {
    background-color: #f9fafb;
    font-weight: 600;
    text-align: left;
  }
  
  .framework-content tr:nth-child(even) {
    background-color: #f9fafb;
  }
  
  .translation-notice {
    background-color: #e9f2e9;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    border-left: 4px solid #2D5F2D;
  }
  
  .author-credit {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 2px solid #e5e7eb;
    font-style: italic;
    color: #6b7280;
  }

  .documentation-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      grid-template-columns: 1fr;
    }
  }
  
  .sidebar {
    border-right: 1px solid #2D5F2D; /* Earthy green border */
    padding-right: 1.5rem;
    position: relative; /* Ensure the sidebar scrolls with the page */
    top: auto; /* Reset any top positioning */
    height: auto; /* Allow natural height */
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar li {
    margin-bottom: 0.75rem;
  }
  
  .sidebar a {
    display: block;
    padding: 0.5rem 0;
    color: #4b5563;
    text-decoration: none;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    transition: all 0.2s;
  }
  
  .sidebar a:hover {
    color: #DAA520; /* Gold on hover */
    border-left-color: #DAA520;
  }
  
  .sidebar a.active {
    color: #DAA520; /* Gold for active */
    border-left-color: #DAA520;
    font-weight: 600;
  }
  
  .content {
    min-width: 0;
  }
  
  /* Additional styles for markdown content */
  .content :global(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2B4B8C; /* Cosmic blue for h1 */
  }
  
  .content :global(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #2B4B8C; /* Cosmic blue for h2 */
  }
  
  .content :global(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #2B4B8C; /* Cosmic blue for h3 */
  }

  /* Styling for h4 headers (#### in Markdown) */
  :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #2B4B8C; /* Cosmic blue color, matching your theme */
  }

  /* Styling for the inset box (blockquote) */
  :global(blockquote) {
    background-color: #f3f6f9;
    border-left: 4px solid #6B5CA5; /* Cosmic purple color */
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
  }

  :global(blockquote > p:first-child strong) {
    font-size: 1.1rem;
    color: #2B4B8C; /* Cosmic blue for the header */
    display: block;
    margin-bottom: 0.75rem;
  }

  :global(blockquote ul) {
    margin-left: 1.5rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  :global(blockquote li) {
    margin-bottom: 0.5rem;
  }

  :global(blockquote p:last-child) {
    margin-top: 0.75rem;
    font-style: italic;
  }

  :global(blockquote a) {
    color: #DAA520; /* Gold color for links */
    text-decoration: underline;
    font-weight: 500;
  }

  :global(blockquote a:hover) {
    color: #B8860B; /* Darker gold on hover */
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4b5563;
  }
  
  /* Add to your existing <style> section */
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem; /* Slightly increased for better indentation */
    color: #4b5563; /* Matches paragraph text color */
  }

  .content :global(ul) {
    list-style-type: none; /* Remove default bullets */
  }

  .content :global(ul li) {
    position: relative;
    margin-bottom: 0.75rem; /* Slightly more spacing between items */
    padding-left: 1rem;
  }

  .content :global(ul li::before) {
    content: "✦"; /* Cosmic star symbol for bullets */
    position: absolute;
    left: 0;
    color: #DAA520; /* Gold color for bullet points */
    font-size: 0.9rem;
  }

  .content :global(ol) {
    list-style-type: decimal; /* Ensure ordered lists use numbers */
  }

  .content :global(ol li) {
    margin-bottom: 0.75rem; /* Consistent spacing with ul */
    padding-left: 0.5rem;
  }

  .content :global(ol li::marker) {
    color: #2B4B8C; /* Cosmic blue for numbers */
    font-weight: 600;
  }

  /* Nested lists */
  .content :global(ul ul), .content :global(ol ul) {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .content :global(ul ul li::before) {
    content: "✧"; /* Smaller star for nested items */
    color: #6B5CA5; /* Cosmic purple for nested bullets */
  }

  /* Hover effect for interactivity */
  .content :global(li:hover) {
    color: #2B4B8C; /* Cosmic blue on hover */
  }
  
  .content :global(li) {
    margin-bottom: 0.5rem;
  }

  /* Table styles for markdown content with cosmic theme */
  :global(.content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 0.375rem;
    overflow: hidden;
  }

  :global(.content thead) {
    background: linear-gradient(to right, #2B4B8C, #4B5CA5);
  }

  :global(.content th) {
    padding: 0.75rem 1rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;
    border: none;
    border-bottom: 2px solid #6B5CA5;
  }

  :global(.content td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-left: none;
    border-right: none;
    vertical-align: top;
  }

  :global(.content tr:nth-child(odd)) {
    background-color: #f8f9fc;
  }

  :global(.content tr:nth-child(even)) {
    background-color: #ffffff;
  }

  :global(.content tr:hover) {
    background-color: #f7f1e3; /* Light gold background on hover */
  }

  :global(.content tbody tr:last-child td) {
    border-bottom: none;
  }

  /* Table caption or footer */
  :global(.content table caption),
  :global(.content table tfoot) {
    background-color: #e9f2e9; /* Light earthy green */
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #2D5F2D;
    text-align: left;
    border-top: 1px solid #2D5F2D;
  }

  /* Highlight important cells */
  :global(.content td.highlight) {
    color: #B8860B; /* Gold text */
    font-weight: 600;
  }

  /* For responsive tables on small screens */
  @media (max-width: 640px) {
    :global(.content table) {
      display: block;
      overflow-x: auto;
    }
    
    :global(.content th),
    :global(.content td) {
      white-space: nowrap;
    }
  }
</style>
