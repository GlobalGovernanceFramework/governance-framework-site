<!-- src/lib/components/SectionNotice.svelte -->
<script>
  import { t } from '$lib/i18n';
  
  // Props for customization
  export let type = 'info'; // 'info', 'warning', 'success', 'error'
  export let title = '';
  export let dismissible = false;
  export let customContent = false;
  
  // Internal state
  let visible = true;
  
  function dismiss() {
    visible = false;
  }
  
  // Determine styling based on type
  $: typeStyles = {
    info: {
      container: 'border-l-4 border-blue-400 bg-blue-50',
      icon: 'text-blue-600',
      title: 'text-blue-800',
      text: 'text-blue-700'
    },
    warning: {
      container: 'border-l-4 border-yellow-400 bg-yellow-50',
      icon: 'text-yellow-600',
      title: 'text-yellow-800',
      text: 'text-yellow-700'
    },
    success: {
      container: 'border-l-4 border-green-400 bg-green-50',
      icon: 'text-green-600',
      title: 'text-green-800',
      text: 'text-green-700'
    },
    error: {
      container: 'border-l-4 border-red-400 bg-red-50',
      icon: 'text-red-600',
      title: 'text-red-800',
      text: 'text-red-700'
    }
  }[type];
  
  // Icon selection based on type
  $: iconPath = {
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z',
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
  }[type];
</script>

{#if visible}
  <div class="section-notice {typeStyles.container}" role="alert">
    <div class="notice-header">
      <div class="icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" class="notice-icon {typeStyles.icon}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPath} />
        </svg>
      </div>
      
      <div class="content-container">
        {#if title || !customContent}
          <p class="notice-title {typeStyles.title}">
            {title || $t('common.notices.section.defaultTitle') || $t('notices.section.defaultTitle') || 'Section Notice'}
          </p>
        {/if}
        
        <div class="notice-content {typeStyles.text}">
          {#if customContent}
            <slot />
          {:else}
            <p>{$t('common.notices.section.frameworks.text') || $t('notices.section.frameworks.text') || 'Note from the Founder: This section is currently undergoing a significant revision to improve clarity and consistency. The core ideas are present, but we are actively working on refining the content. Your feedback during this stage is invaluable.'}</p>
          {/if}
        </div>
      </div>
      
      {#if dismissible}
        <button 
          on:click={dismiss}
          class="dismiss-button {typeStyles.text}"
          aria-label={$t('common.notices.section.dismiss') || $t('notices.section.dismiss') || 'Dismiss'}
          title={$t('common.notices.section.dismiss') || $t('notices.section.dismiss') || 'Dismiss'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .section-notice {
    padding: 1rem 1.25rem;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .notice-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    position: relative;
  }

  .icon-container {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .notice-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .content-container {
    flex: 1;
    min-width: 0;
  }

  .notice-title {
    font-weight: 600;
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  .notice-content {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .notice-content :global(p) {
    margin: 0 0 0.75rem 0;
  }

  .notice-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .notice-content :global(a) {
    color: inherit;
    text-decoration: underline;
    font-weight: 500;
  }

  .notice-content :global(a:hover) {
    text-decoration: none;
  }

  .dismiss-button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    opacity: 0.7;
  }

  .dismiss-button:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }

  .dismiss-button:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    opacity: 1;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .section-notice {
      padding: 0.875rem 1rem;
      margin: 1rem 0;
    }

    .notice-header {
      gap: 0.625rem;
    }

    .notice-title {
      font-size: 0.9375rem;
    }

    .notice-content {
      font-size: 0.8125rem;
    }
  }

  /* Enhanced accessibility */
  @media (prefers-reduced-motion: reduce) {
    .dismiss-button {
      transition: none;
    }
  }
</style>
