# Centralized Menu System

This directory now uses a centralized menu system that allows you to maintain the menu bar in a single location.

## How It Works

1. **Menu Definition**: The menu structure is defined in `menu.js` in a single place
2. **Dynamic Injection**: Each HTML page includes `menu.js` which injects the menu HTML into a placeholder element
3. **Active State Detection**: The system automatically detects the current page and highlights the appropriate menu item

## Files Modified

- All HTML files (`*.html`) have been updated to:
  - Remove the hardcoded `<header class="site-header">...</header>` section
  - Add `<div id="menu-placeholder"></div>` in its place
  - Include `<script src="menu.js"></script>` right after the placeholder

## Files Created

- `menu.js` - The centralized menu module containing:
  - Menu configuration (links, logo, alert pill)
  - Page detection logic
  - Active state management
  - Menu HTML generation
  - DOM insertion

- `apply_centralized_menu.py` - The script used to update all HTML files

## Backup Files

Backup copies of all original HTML files were created with `.bak` extension:
- `alerts.html.bak`
- `assembly-guide.html.bak`
- etc.

You can delete these backup files once you've verified the new menu system works correctly.

## Making Menu Changes

To update the menu across all pages:

1. Edit `menu.js` and modify the `menuConfig` object:
   ```javascript
   const menuConfig = {
     logo: {
       href: 'index.html',
       svg: '<svg>...</svg>',
       text: 'KURINDA'
     },
     navItems: [
       { href: 'project.html', text: 'Project' },
       { href: 'community.html', text: 'Community' },
       // Add, remove, or modify menu items here
       { href: 'alerts.html', text: 'Alerts' },
       { href: 'team.html', text: 'Team' },
       { href: 'updates.html', text: 'Updates' },
       { href: 'https://github.com/ds2713/ProjectKurinda_PCB', text: 'GitHub' }
     ],
     alertPill: '<span class="alert-pill"><span class="dot"></span> Current alert: low</span>'
   };
   ```

2. Save the file - changes will automatically propagate to all pages

3. Test in a browser to ensure everything works

## Active State Logic

The menu automatically detects which page is active based on:
- Exact filename match (e.g., `team.html` highlights "Team")
- Sub-page detection (e.g., `assembly-guide.html` highlights "Community")

The active state mappings are defined in the `isActiveItem()` function in `menu.js`.

## Browser Compatibility

This system works in all modern browsers. The menu is inserted via JavaScript, so:
- It works when files are opened directly (file:// protocol)
- It works on web servers (http:// or https://)
- No server-side processing required

## Reverting Changes

If you need to revert to the original menu system:
1. Delete all `.html` files
2. Rename all `.html.bak` files to remove the `.bak` extension
3. Delete `menu.js` (optional)
