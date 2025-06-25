<!-- src/lib/components/LocaleLink.svelte -->
<script>
  import { base } from '$app/paths';
  import { locale } from '$lib/i18n';
  import { page } from '$app/stores';

  export let href;
  export let class_ = '';
  
  // Get current locale from URL or store
  $: currentLocale = $page.url.searchParams.get('lang') || $locale || 'en';
  
  // Create locale-aware URL
  $: localeHref = (() => {
    const url = new URL(href, 'http://localhost'); // dummy base for parsing
    url.searchParams.set('lang', currentLocale);
    return `${base}${url.pathname}${url.search}`;
  })();
</script>

<a href={localeHref} class={class_}>
  <slot />
</a>
