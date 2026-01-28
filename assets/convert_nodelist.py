#!/usr/bin/env python3
"""
Convert nodelist.py (RTF format) to nodelist.json

This script extracts the plain text Python dictionary from the RTF file
and converts it to a flat JSON structure for use in the node search extension.
"""

import re
import json
import os

def strip_rtf(rtf_content):
    """Remove RTF formatting codes and extract plain text."""
    # First, let's find the actual Python content
    # Look for the comfy_nodes = { pattern
    match = re.search(r'comfy_nodes\s*=\s*\\?\{', rtf_content, re.DOTALL)
    if not match:
        print("Could not find comfy_nodes dictionary!")
        return ""

    # Start from the dictionary opening
    start_pos = match.start()
    text = rtf_content[start_pos:]

    # Remove RTF control words (\word or \word123)
    text = re.sub(r'\\[a-z]+\d*\s?', '', text)
    # Remove RTF special characters
    text = re.sub(r'\\[^a-z"]', '', text)
    # Clean up
    text = text.replace('\\n', '\n')
    text = text.replace('\\"', '"')
    text = text.replace('\\\\', '\\')

    return text

def parse_node_data(text):
    """Parse the Python dictionary structure from the text."""
    nodes = []

    # Pattern to find all nodes: "NodeName": ("path", "description")
    # We'll extract category by looking backwards from each node
    node_pattern = r'"([^"]+)":\s*\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\)'

    # Find all nodes first
    all_nodes = list(re.finditer(node_pattern, text))

    # Now find categories - they appear as "category": followed by whitespace and then nodes
    # Pattern: "string": followed by more spaces (not followed by parentheses immediately)
    category_pattern = r'"([^"]+)":\s{2,}'  # 2 or more spaces after colon indicates category

    categories_found = list(re.finditer(category_pattern, text))

    # Assign each node to the most recent category before it
    for node_match in all_nodes:
        node_name = node_match.group(1)
        node_path = node_match.group(2)
        node_desc = node_match.group(3)

        # Find the category this node belongs to (last category before this node)
        current_category = "other"
        node_pos = node_match.start()

        for cat_match in categories_found:
            if cat_match.start() < node_pos:
                current_category = cat_match.group(1)
            else:
                break  # Gone past this node

        nodes.append({
            "name": node_name,
            "category": current_category,
            "path": node_path,
            "description": node_desc
        })

    return nodes

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(script_dir, 'nodelist.py')
    output_file = os.path.join(script_dir, 'nodelist.json')

    print(f"Reading {input_file}...")

    # Read the RTF file
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
        rtf_content = f.read()

    print("Stripping RTF formatting...")
    plain_text = strip_rtf(rtf_content)

    # Debug: save the stripped text
    with open(os.path.join(script_dir, 'nodelist_debug.txt'), 'w') as f:
        f.write(plain_text[:5000])  # First 5000 chars
    print(f"Debug: Saved first 5000 chars to nodelist_debug.txt")

    print("Parsing node data...")
    nodes = parse_node_data(plain_text)

    print(f"Found {len(nodes)} nodes across multiple categories")

    # Create output structure
    output = {
        "nodes": nodes
    }

    # Write to JSON file
    print(f"Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"✓ Successfully converted {len(nodes)} nodes to JSON!")

    # Print some statistics
    categories = set(n['category'] for n in nodes)
    print(f"\nCategories found ({len(categories)}): {', '.join(sorted(categories))}")

    # Show a few examples
    print("\nExample nodes:")
    for node in nodes[:5]:
        print(f"  - {node['name']} ({node['category']}): {node['description'][:60]}...")

if __name__ == '__main__':
    main()
