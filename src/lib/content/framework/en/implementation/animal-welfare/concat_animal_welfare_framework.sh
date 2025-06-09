#!/bin/bash

# Output file name
output_file="../animal-welfare.md"

# Files in the correct order according to index.md
files=(
  "index.md"
  "01-introduction.md"
  "02-core-principles.md"
  "03-structural-components.md"
  "04-implementation-approaches.md"
  "05-metrics-evaluation.md"
  "06-cultural-justice.md"
  "07-environmental-integration.md"
  "08-appendices.md"
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

