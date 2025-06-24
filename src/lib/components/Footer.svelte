<!-- src/lib/components/Footer.svelte -->
<script>
  import { t } from '$lib/i18n';
  import { base } from '$app/paths';
  import { browser } from '$app/environment';
  
  const currentYear = new Date().getFullYear();
</script>

<style>
  footer {
    background: linear-gradient(to bottom right, #2B4B8C, #6B5CA5);
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
    color: #DAA520;
  }

  p {
    font-size: 0.875rem;
    color: #ffffff;
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
    color: #ffffff;
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: #DAA520;
  }

  .flex {
    display: flex;
    gap: 1rem;
  }

  .space-x-4 {
    gap: 1rem;
  }

  .border-t {
    border-top: 1px solid #2D5F2D;
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
        <h3>Global Governance Frameworks</h3>
        <p>
          Developing interoperable systems and operating models for global governance that respect local autonomy.
        </p>
      </div>
      
      <div>
        <h3>Navigation</h3>
        <ul>
          <li><a href="{base}/">{browser ? ($t('common.header.home') || 'Home') : 'Home'}</a></li>
          <li><a href="{base}/about">{browser ? ($t('common.header.about') || 'About') : 'About'}</a></li>
          <li><a href="{base}/frameworks">{browser ? ($t('common.header.framework') || 'Framework') : 'Framework'}</a></li>
          <li><a href="{base}/frameworks/docs/glossary">{browser ? ($t('common.footer.glossary') || 'Glossary') : 'Glossary'}</a></li>
          <li><a href="{base}/downloads">{browser ? ($t('common.header.downloads') || 'Downloads') : 'Downloads'}</a></li>
          <li><a href="{base}/contact">{browser ? ($t('common.header.contact') || 'Contact') : 'Contact'}</a></li>
          <li><a href="{base}/get-involved/founding">{browser ? ($t('common.footer.founding') || 'Founding') : 'Founding'}</a></li>
        </ul>
      </div>
      
      <div>
        <h3>Legal</h3>
        <ul>
          <li><a href="{base}/privacy">{browser ? ($t('common.footer.privacy') || 'Privacy Policy') : 'Privacy Policy'}</a></li>
          <li><a href="{base}/terms">{browser ? ($t('common.footer.terms') || 'Terms of Service') : 'Terms of Service'}</a></li>
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
          
          <a href="https://discord.gg/Zx4hMJf4JU" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.210 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
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
          {browser ? ($t('common.footer.copyright') || `© ${currentYear} Global Governance Framework. All rights reserved.`) : `© ${currentYear} Global Governance Framework. All rights reserved.`}
        </p>
      </div>
      
      <div class="flex items-center space-x-2">
        <img src="{base}/logo.svg" alt="Global Governance Frameworks" class="h-6 w-6" />
        <span class="text-sm">Building frameworks for ethical global governance</span>
      </div>
    </div>
  </div>
</footer>
