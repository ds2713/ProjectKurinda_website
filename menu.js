/**
 * Kurinda Project - Centralized Menu Module
 * 
 * This module provides a centralized menu bar that can be included in all HTML pages.
 * To use it:
 * 1. Add <div id="menu-placeholder"></div> where you want the menu to appear
 * 2. Include this script: <script src="menu.js"></script>
 * 
 * The menu will automatically:
 * - Insert the complete header with navigation
 * - Detect the current page and highlight the active menu item
 * - Maintain the mobile toggle functionality
 */

(function() {
  'use strict';

  // Menu configuration - define all menu items here in one place
  const menuConfig = {
    logo: {
      href: 'index.html',
      svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z"/><path d="M9 4v13"/><path d="M15 7v13"/></svg>',
      text: 'KURINDA'
    },
    navItems: [
      { href: 'project.html', text: 'Project' },
      { href: 'community.html', text: 'Community' },
      { href: 'alerts.html', text: 'Alerts' },
      { href: 'team.html', text: 'Team' },
      { href: 'updates.html', text: 'Updates' },
      { href: 'https://github.com/ds2713/ProjectKurinda_PCB', text: 'GitHub' }
    ],
    alertPill: '<span class="alert-pill"><span class="dot"></span> Current alert: low</span>'
  };

  /**
   * Get the current page filename from the URL
   * Handles edge cases like index.html, trailing slashes, etc.
   */
  function getCurrentPage() {
    const path = window.location.pathname;
    // Remove leading slash and get the last part
    const parts = path.split('/').filter(Boolean);
    const filename = parts.length > 0 ? parts[parts.length - 1] : 'index.html';
    
    // If there's no extension, assume it's a directory and check for index.html
    if (!filename.includes('.')) {
      return 'index.html';
    }
    
    return filename;
  }

  /**
   * Check if a menu item should be active for the current page
   */
  function isActiveItem(itemHref, currentPage) {
    // Direct match
    if (itemHref === currentPage) {
      return true;
    }
    
    // For sub-pages like assembly-guide.html, placement-guide.html, etc.
    // They belong to "Community" so if current page contains the menu item filename (without .html)
    // or the menu item is community.html and current page is a community sub-page
    const itemName = itemHref.replace('.html', '');
    const currentName = currentPage.replace('.html', '');
    
    // Check if current page is a sub-page of this menu item
    // e.g., assembly-guide.html is a sub-page of community.html
    if (currentPage.includes(itemName) || 
        (itemName === 'community' && currentName.startsWith('assembly')) ||
        (itemName === 'community' && currentName.startsWith('placement')) ||
        (itemName === 'community' && currentName.startsWith('response')) ||
        (itemName === 'project' && currentName.startsWith('satellite')) ||
        (itemName === 'project' && currentName.startsWith('ground-sensors')) ||
        (itemName === 'project' && currentName.startsWith('machine-learning-model'))) {
      return true;
    }
    
    return false;
  }

  /**
   * Generate the complete menu HTML
   */
  function generateMenuHTML() {
    const currentPage = getCurrentPage();
    
    // Build navigation items
    const navItemsHTML = menuConfig.navItems.map(item => {
      const isActive = isActiveItem(item.href, currentPage);
      const activeClass = isActive ? 'class="active"' : '';
      return `<a href="${item.href}" ${activeClass}>${item.text}</a>`;
    }).join('\n      ');

    // Build the complete menu
    return `
<header class="site-header">
  <div class="header-inner">
    <a href="${menuConfig.logo.href}" class="logo">
      ${menuConfig.logo.svg}
      ${menuConfig.logo.text}
    </a>
    <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    <nav class="main-nav">
      ${navItemsHTML}
    </nav>
    ${menuConfig.alertPill}
  </div>
</header>
    `;
  }

  /**
   * Insert the menu into the DOM
   */
  function insertMenu() {
    const placeholder = document.getElementById('menu-placeholder');
    
    if (placeholder) {
      placeholder.innerHTML = generateMenuHTML();
    } else {
      console.error('Kurinda Menu: Could not find menu-placeholder element');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertMenu);
  } else {
    insertMenu();
  }
})();
