<!-- Enhanced src/lib/components/CompassInfoPanel.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { getConnectedFrameworks, getConnectionReason } from '$lib/data/compassData.js';
  
  export let selectedElement = null;
  export let userProgress = {};
  export let closeInfoPanel = () => {};
  export let panelElement = null;
  export let position = 'right';

  $: connectedFrameworks = selectedElement 
    ? getConnectedFrameworks(selectedElement.type, selectedElement.id)
    : [];

  function getStatusColor(status) {
    switch (status) {
      case 'ready':
        return '#10B981';
      case 'review':
        return '#F59E0B';
      case 'planned':
        return '#6B7280';
      case 'coming-soon':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  }

  function getStatusText(status) {
    switch (status) {
      case 'ready':
        return $t('findYourPlace.compass.status.ready');
      case 'review':
        return $t('findYourPlace.compass.status.inReview');
      case 'planned':
        return $t('findYourPlace.compass.status.planned');
      case 'coming-soon':
        return $t('findYourPlace.compass.status.planned');
      default:
        return '';
    }
  }
  
  // NEW: Get connection reasoning for each framework
  function getFrameworkConnectionReason(framework) {
    if (!selectedElement) return '';
    
    return getConnectionReason(
      selectedElement.type, 
      selectedElement.id, 
      framework.slug
    );
  }
</script>

{#if selectedElement}
  <div 
    class="info-panel {position === 'left' ? 'panel-left' : 'panel-right'}" 
    bind:this={panelElement} 
    on:click={(e) => e.stopPropagation()}
  >
    <button class="close-button" on:click={closeInfoPanel}>
      ✕
    </button>
    
    <div class="info-content">
      <!-- Center/Shared Values -->
      {#if selectedElement.type === 'center'}
        <h3>{$t('findYourPlace.compass.info.center.title')}</h3>
        <p>{$t('findYourPlace.compass.info.center.description')}</p>
        <div class="info-tip">
          {$t('findYourPlace.compass.info.center.tip')}
        </div>
        
      <!-- Development Level/Practice -->
      {:else if selectedElement.type === 'practice'}
        <h3>{$t(`findYourPlace.compass.levels.${selectedElement.id}.title`)}</h3>
        <p>
          {userProgress[selectedElement.id] 
            ? $t('findYourPlace.compass.info.practice.completed')
            : $t('findYourPlace.compass.info.practice.incomplete')}
        </p>
        
        {#if connectedFrameworks.length > 0}
          <div class="connected-frameworks">
            <h4>{$t('findYourPlace.compass.info.connectedFrameworks')}</h4>
            <div class="framework-list">
              {#each connectedFrameworks as framework}
                <div class="framework-item">
                  <div class="framework-header">
                    <span 
                      class="status-indicator" 
                      style="background-color: {getStatusColor(framework.status)}"
                      title={getStatusText(framework.status)}
                    ></span>
                    {#if framework.status === 'ready' || framework.status === 'review'}
                      <a href="{base}{framework.path}" class="framework-link">
                        {$t(framework.titleKey) || framework.slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </a>
                    {:else}
                      <span class="framework-name planned">
                        {$t(framework.titleKey) || framework.slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    {/if}
                  </div>
                  
                  <!-- NEW: Connection Reasoning -->
                  {#if getFrameworkConnectionReason(framework)}
                    <div class="connection-reason">
                      <strong>{$t(`findYourPlace.compass.whyConnects`)}</strong> {getFrameworkConnectionReason(framework)}
                    </div>
                  {/if}
                  
                  <p class="framework-description">
                    {$t(`home.constellation.descriptions.${framework.slug.replace(/-/g, '')}`)}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        <div class="info-tip">
          {$t('findYourPlace.compass.info.practice.tip')}
        </div>
        
      <!-- Core Values -->
      {:else if selectedElement.type === 'value'}
        <h3>{$t(`findYourPlace.compass.valueDetails.${selectedElement.id}.title`)}</h3>
        <p>{$t(`findYourPlace.compass.valueDetails.${selectedElement.id}.description`)}</p>
        
        {#if connectedFrameworks.length > 0}
          <div class="connected-frameworks">
            <h4>{$t('findYourPlace.compass.info.connectedFrameworks')}</h4>
            <div class="framework-list">
              {#each connectedFrameworks as framework}
                <div class="framework-item">
                  <div class="framework-header">
                    <span 
                      class="status-indicator" 
                      style="background-color: {getStatusColor(framework.status)}"
                      title={getStatusText(framework.status)}
                    ></span>
                    {#if framework.status === 'ready' || framework.status === 'review'}
                      <a href="{base}{framework.path}" class="framework-link">
                        {$t(framework.titleKey) || framework.slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </a>
                    {:else}
                      <span class="framework-name planned">
                        {$t(framework.titleKey) || framework.slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    {/if}
                  </div>
                  
                  <!-- NEW: Connection Reasoning -->
                  {#if getFrameworkConnectionReason(framework)}
                    <div class="connection-reason">
                      <strong>{$t(`findYourPlace.compass.whyConnects`)}</strong> {getFrameworkConnectionReason(framework)}
                    </div>
                  {/if}
                  
                  <p class="framework-description">
                    {$t(`home.constellation.descriptions.${framework.slug.replace(/-/g, '')}`)}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        <div class="info-tip">
          {$t('findYourPlace.compass.info.values.tip')}
        </div>
      {/if}
      
      <!-- Planned Framework Contact Encouragement -->
      {#if connectedFrameworks.some(fw => fw.status === 'planned' || fw.status === 'coming-soon')}
        <div class="planned-frameworks-cta">
          <p>{$t('findYourPlace.compass.info.plannedFrameworks.text')}</p>
          <div class="cta-buttons">
            <a href="{base}/get-involved/frameworks" class="contact-button">
                {$t('findYourPlace.compass.info.plannedFrameworks.button')}
            </a>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .info-panel {
    position: absolute;
    top: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 0;
    z-index: 10;
    transition: all 0.3s ease;
  }

  .panel-right {
    right: 20px;
    border-left: 4px solid #2B4B8C;
  }

  .panel-left {
    left: 20px;
    border-right: 4px solid #2B4B8C;
  }
    
  .close-button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 18px;
    color: #9CA3AF;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    transition: color 0.2s ease;
  }
  
  .close-button:hover {
    color: #374151;
  }
  
  .info-content {
    padding: 20px;
    padding-right: 40px;
  }
  
  .info-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2B4B8C;
    margin-bottom: 12px;
    margin-top: 0;
  }
  
  .info-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 12px;
    margin-top: 20px;
  }
  
  .info-content p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 16px;
    font-size: 0.95rem;
  }
  
  .info-tip {
    font-size: 0.85rem;
    color: #6B7280;
    background: #F9FAFB;
    padding: 12px;
    border-radius: 8px;
    border-left: 3px solid #DAA520;
    margin-top: 16px;
  }
  
  .connected-frameworks {
    margin-top: 20px;
  }
  
  .framework-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .framework-item {
    background: #F8FAFC;
    border-radius: 8px;
    padding: 12px;
    border: 1px solid #E5E7EB;
  }
  
  .framework-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .framework-link {
    color: #2B4B8C;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }
  
  .framework-link:hover {
    color: #DAA520;
    text-decoration: underline;
  }
  
  .framework-name {
    font-weight: 600;
    font-size: 0.9rem;
    color: #374151;
  }
  
  .framework-name.planned {
    color: #6B7280;
  }
  
  /* NEW: Connection Reasoning Styles */
  .connection-reason {
    font-size: 0.85rem;
    color: #059669;
    background: #ECFDF5;
    padding: 8px 10px;
    border-radius: 6px;
    margin: 8px 0;
    border-left: 3px solid #10B981;
    line-height: 1.4;
  }
  
  .connection-reason strong {
    color: #047857;
  }
  
  .framework-description {
    font-size: 0.85rem;
    color: #6B7280;
    line-height: 1.5;
    margin: 0;
  }
  
  .planned-frameworks-cta {
    margin-top: 20px;
    padding: 16px;
    background: linear-gradient(135deg, #FEF3C7, #FDE68A);
    border-radius: 8px;
    border: 1px solid #F59E0B;
  }
  
  .planned-frameworks-cta p {
    font-size: 0.9rem;
    color: #92400E;
    margin-bottom: 12px;
  }
  
  .cta-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .contact-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: #F59E0B;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    flex: 1;
    justify-content: center;
    min-width: 120px;
  }
  
  .contact-button:hover {
    background-color: #D97706;
    transform: translateY(-1px);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .info-panel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90vw;
      max-width: 400px;
      max-height: 80vh;
      z-index: 15;
    }
    
    .close-button {
      display: block;
      font-size: 20px;
    }
    
    .info-content {
      padding-right: 20px;
    }

    .panel-left,
    .panel-right {
      left: 50%;
      right: auto;
      border-left: 4px solid #2B4B8C;
      border-right: none;
    }
  }
</style>
