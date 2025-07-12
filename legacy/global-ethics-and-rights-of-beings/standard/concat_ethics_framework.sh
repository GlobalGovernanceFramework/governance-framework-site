#!/bin/bash

# Output file name
output_file="../../ethics.md"

# Files in the correct order according to index.md
files=(
  "0-preamble.md"
  "1-introduction.md"
  "2-foundational-values.md"
  "2.3-global-ethical-traditions.md"
  "2.5-rights-of-beings.md"
  "2.6-scientific-foundations.md"
  "3-commitments.md"
  "3.1-traditional-rights.md"
  "3.2-emerging-rights.md"
  "3.2.1-ai-consciousness.md"
  "3.2.1a-assessment-hub-network.md"
  "3.2.1b-scientific-standards.md"
  "3.2.2-ambiguous-entities.md"
  "3.2.3-measurement-standards.md"
  "3.2.4-recognition-pathways.md"
  "3.2.5-non-western-recognition.md"
  "3.3-conflict-resolution.md"
  "3.3.1-moon-wish-test.md"
  "4-governance-mechanisms.md"
  "4.1-transparency.md"
  "4.2-inclusive-decision-making.md"
  "4.3-conflict-resolution.md"
  "4.4-guardianship-councils.md"
  "4.4.1-enforcement-mechanisms.md"
  "4.4.2-non-compliance-strategy.md"
  "4.5-funding-model.md"
  "4.5.1-hub-sustainability.md"
  "4.5.2-resource-optimization.md"
  "4.6-governance-accountability.md"
  "4.7-entity-conflict-resolution.md"
  "4.8-interoperability.md"
  "4.9-decision-making.md"
  "4.10-coordination-mechanisms.md"
  "5-implementation.md"
  "5.1-quick-wins.md"
  "5.1.1-cost-analysis.md"
  "5.2-phased-rollout.md"
  "5.2.1-space-ethics.md"
  "5.3-education-accessibility.md"
  "5.3.1-resource-constraint.md"
  "5.3.2-cultural-accessibility.md"
  "5.3.3-knowledge-integration.md"
  "5.4-global-cooperation.md"
  "5.5-monitoring.md"
  "5.6-public-engagement.md"
  "5.7-stakeholder-strategy.md"
  "5.7.1-consensus-building.md"
  "5.7.2-resistant-stakeholder.md"
  "5.8-resistance-handling.md"
  "5.8.1-opposition-response.md"
  "5.8.2-learning-system.md"
  "5.9-benchmarks-metrics.md"
  "5.10-scenario-planning.md"
  "5.11-accessibility-matrix.md"
  "6-appendices.md"
  "6.1-emerging-rights-toolkit.md"
  "6.2-case-studies.md"
  "6.3-ethical-forecasting.md"
  "6.3.1-speculative-paradigm.md"
  "6.3.2-validation-protocols.md"
  "6.4-reporting-portal.md"
  "6.5-plain-language.md"
  "6.6-edge-case-protocols.md"
  "6.7-philosophy-of-rights.md"
  "6.8-spiral-aware-primer.md"
  "6.9-impact-assessment.md"
  "6.10-pioneer-pilots.md"
  "6.11-crisis-ethics.md"
  "6.12-technical-protocols.md"
)

# Remove the output file if it exists
rm -f "$output_file"

# Concatenate each file
for file in "${files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "## FILE: $file" >> "$output_file"
    cat "$file" >> "$output_file"
    echo -e "\n\n" >> "$output_file"
  else
    echo "WARNING: File not found: $file"
  fi
done

echo "✅ Ethics framework concatenated into: $output_file"

