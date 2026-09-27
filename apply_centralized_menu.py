#!/usr/bin/env python3
"""
Apply Centralized Menu to all HTML files

This script updates all HTML files in the current directory to use a centralized
menu system. The menu is defined in menu.js and injected into each page.

Usage:
    python apply_centralized_menu.py

This will:
1. Create a backup of all HTML files (with .bak extension)
2. Replace the hardcoded header with a placeholder
3. Add the menu.js script to load the menu dynamically
"""

import re
import os
import shutil
import sys

# Ensure UTF-8 encoding for stdout on Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Configuration
BACKUP_EXTENSION = '.bak'
MENU_PLACEHOLDER = '<div id="menu-placeholder"></div>'
MENU_SCRIPT = '<script src="menu.js"></script>'

# Get all HTML files in the current directory
html_files = [f for f in os.listdir('.') 
              if f.endswith('.html') and os.path.isfile(f) and f != 'project(old).html']

print("Found {} HTML files to update".format(len(html_files)))
print()

# Pattern to match the entire header section
# This matches from <header class="site-header"> to </header>
header_pattern = re.compile(
    r'<header class="site-header">.*?</header>',
    re.DOTALL  # Allow . to match newlines
)

def process_file(filename):
    """Process a single HTML file"""
    print("Processing {}...".format(filename))
    
    # Read the file
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already updated
    if MENU_PLACEHOLDER in content:
        print("  -> Already updated, skipping")
        return True
    
    # Create backup
    backup_path = filename + BACKUP_EXTENSION
    shutil.copy2(filename, backup_path)
    print("  -> Backup created: {}".format(backup_path))
    
    # Replace the header with placeholder + script
    new_content = header_pattern.sub(
        MENU_PLACEHOLDER + '\n' + MENU_SCRIPT,
        content
    )
    
    # Write the updated content
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("  -> Updated successfully!")
    return True

# Process all files
success_count = 0
for filename in html_files:
    try:
        if process_file(filename):
            success_count += 1
    except Exception as e:
        print("  -> ERROR: {}".format(str(e)))

print()
print("=" * 60)
print("Updated {}/{} files successfully!".format(success_count, len(html_files)))
print("=" * 60)
print()
print("Next steps:")
print("1. Verify the changes by opening the HTML files in a browser")
print("2. Test that the menu works correctly and active states are set properly")
print("3. Once verified, you can delete the .bak backup files")
print()
print("Note: The menu.js file must be in the same directory as the HTML files")
