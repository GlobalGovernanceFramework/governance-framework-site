To be used in src/routes/frameworks/indigenous-governance-and-traditional-knowledge/+page.svelte when moving from status 'Review' (internal) to 'Community Review' (external):

<SectionNotice type="info" title="A Note on Our Process:" customContent={true} dismissible={true}>
  <p>The Indigenous & Traditional Knowledge Governance Framework is listed as "Community Review Draft" to honor its core principle of Indigenous-led governance. While the architectural blueprint (Version 1.0) is comprehensively detailed and ready for engagement, we recognize that no framework centered on Indigenous sovereignty can be considered truly "ready" for implementation without the deep partnership and consent of the communities who would lead it. This V1.0 serves as a well-researched starting point for dialogue, co-creation, and ultimately, ratification by Indigenous peoples. We are now in a phase of active listening and relationship-building to ensure its evolution is guided by the wisdom-keepers it is designed to empower.</p>
</SectionNotice>

Set the status in src/lib/data/schema/cluster.ethical-os.ts
