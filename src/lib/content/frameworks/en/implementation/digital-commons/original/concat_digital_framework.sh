#!/bin/bash

# Output file name
output_file="../digital.md"

# Files in the correct order according to index.md
files=(
  "preamble.md"
  "introduction.md"
  "core-principles.md"
  "governance-structure.md"
  "key-components.md"
  "implementation-roadmap.md"
  "funding-mechanisms.md"
  "addressing-challenges.md"
  "operational-toolkits.md"
  "commons-in-practice-snapshot.md"
  "user-archetypes.md"
  "legal-interoperability.md"
  "metrics-for-success.md"
  "case-studies.md"
  "long-term-evolution-scenarios.md"
  "call-to-action.md"
  "appendix-a-pilot-onboarding.md"
  "appendix-b-visual-companion-toolkit.md"
  "appendix-c-corporate-participation-playbook.md"
  "appendix-d-digital-ethics-charter.md"
  "appendix-e-commons-glossary.md"
  "appendix-f-minimal-viable-node-quickstart.md"
  "appendix-g-field-test-logbook-template.md"
  "appendix-h-faq-for-tech-skeptical-leaders.md"
  "appendix-i-diplomatic-mini-deck.md"
  "appendix-j-historical-commons-context.md"
  "appendix-k-impact-assessment-framework.md"
  "epilogue.md"
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

echo "✅ Peace framework concatenated into: $output_file"

