<!-- src/lib/components/Footer.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  
  const currentYear = new Date().getFullYear();
</script>

<style>
  footer {
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5); /* Cosmic blue gradient */
    color: #ffffff;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    margin-top: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #DAA520; /* Gold for headings */
  }

  p {
    font-size: 0.875rem;
    color: #ffffff; /* White for readability */
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #ffffff; /* White for links */
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: #DAA520; /* Gold on hover */
  }

  .flex {
    display: flex;
    gap: 1rem;
  }

  .space-x-4 {
    gap: 1rem;
  }

  .border-t {
    border-top: 1px solid #2D5F2D; /* Earthy green border */
    padding-top: 2rem;
  }

  .justify-between {
    justify-content: space-between;
  }

  .items-center {
    align-items: center;
  }

  @media (max-width: 768px) {
    .md\:flex-row {
      flex-direction: column;
    }

    .md\:mb-0 {
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 768px) {
    .md\:flex-row {
      flex-direction: row;
    }

    .md\:mb-0 {
      margin-bottom: 0;
    }
  }

  .h-6 {
    height: 1.5rem;
  }

  .w-6 {
    width: 1.5rem;
  }
</style>

<footer>
  <div class="container">
    <div class="grid">
      <div>
        <h3>Global Governance Framework</h3>
        <p>
          Developing interoperable systems and operating models for global governance that respect local autonomy.
        </p>
      </div>
      
      <div>
        <h3>Navigation</h3>
        <ul>
          <li><a href="{base}/">{$t('common.header.home')}</a></li>
          <li><a href="{base}/about">{$t('common.header.about')}</a></li>
          <li><a href="{base}/frameworks">{$t('common.header.framework')}</a></li>
          <li><a href="{base}/frameworks/docs/glossary">{$t('common.footer.glossary')}</a></li>
          <li><a href="{base}/downloads">{$t('common.header.downloads')}</a></li>
          <li><a href="{base}/contact">{$t('common.header.contact')}</a></li>
        </ul>
      </div>
      
      <div>
        <h3>Legal</h3>
        <ul>
          <li><a href="{base}/privacy">{$t('common.footer.privacy')}</a></li>
          <li><a href="{base}/terms">{$t('common.footer.terms')}</a></li>
        </ul>
      </div>
      
      <div>
        <h3>Connect</h3>
        <div class="flex space-x-4">
          <a href="https://github.com/GlobalGovernanceFramework" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
          
          <a href="mailto:globalgovernanceframework@gmail.com" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <div class="border-t flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <p class="text-sm">
          {$t('common.footer.copyright')} {new Date().getFullYear()} | {$t('common.footer.rights')}
        </p>
      </div>
      
      <div class="flex items-center space-x-2">
        <img src="{base}/logo.svg" alt="Global Governance Framework" class="h-6 w-6" />
        <span class="text-sm">Building frameworks for ethical global governance</span>
      </div>
    </div>
  </div>
</footer>
