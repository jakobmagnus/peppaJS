/**
 * Theme Styles for PeppaJS Components
 * 
 * This module provides CSS generation for light, dark, and muddy themes.
 */

export function getThemeStyles(options = {}) {
  const { maxWidth = '480px' } = options;
  return `
    /* Light Theme (Default) */
    [data-theme="light"] {
      --pen-bg: #fff7fb;
      --pen-border: #ffc4d9;
      --pen-shadow: rgba(0, 0, 0, 0.08);
      --card-bg: #fff;
      --card-border: #ffc4d9;
      --text-primary: #333;
      --text-secondary: #666;
      --btn-primary-bg: #ff7aa2;
      --btn-primary-color: #fff;
      --btn-secondary-bg: #ffd1e3;
      --btn-secondary-color: #333;
      --badge-bg: #ffe69f;
      --badge-color: #333;
      --link-color: #ff7aa2;
      --link-hover: #ff5a8a;
    }

    /* Dark Theme */
    [data-theme="dark"] {
      --pen-bg: #2a2a2a;
      --pen-border: #ff7aa2;
      --pen-shadow: rgba(0, 0, 0, 0.3);
      --card-bg: #1a1a1a;
      --card-border: #ff7aa2;
      --text-primary: #e0e0e0;
      --text-secondary: #b0b0b0;
      --btn-primary-bg: #ff7aa2;
      --btn-primary-color: #fff;
      --btn-secondary-bg: #4a4a4a;
      --btn-secondary-color: #e0e0e0;
      --badge-bg: #6a5a00;
      --badge-color: #ffe69f;
      --link-color: #ff9ab8;
      --link-hover: #ffb3cc;
    }

    /* Muddy Theme */
    [data-theme="muddy"] {
      --pen-bg: #6b5540;
      --pen-border: #8b7355;
      --pen-shadow: rgba(0, 0, 0, 0.4);
      --card-bg: #4a3728;
      --card-border: #8b7355;
      --text-primary: #f5e6d3;
      --text-secondary: #d4c4b0;
      --btn-primary-bg: #8b7355;
      --btn-primary-color: #f5e6d3;
      --btn-secondary-bg: #5a4536;
      --btn-secondary-color: #f5e6d3;
      --badge-bg: #3d2f1f;
      --badge-color: #f5e6d3;
      --link-color: #d4b896;
      --link-hover: #e5c9a7;
    }

    .pen {
      max-width: ${maxWidth};
      margin: 0 auto;
      background: var(--pen-bg);
      border-radius: 16px;
      box-shadow: 0 8px 18px var(--pen-shadow);
      padding: 1.5rem;
      border: 3px solid var(--pen-border);
      font-family: system-ui, sans-serif;
      color: var(--text-primary);
    }

    .pen h1 {
      margin-top: 0;
      font-size: 1.6rem;
      color: var(--text-primary);
    }

    .pig-card {
      border-radius: 12px;
      border: 2px dashed var(--card-border);
      padding: 1rem;
      margin-bottom: 1rem;
      background: var(--card-bg);
    }

    .pig-card h2 {
      margin-top: 0;
      font-size: 1.2rem;
      color: var(--text-primary);
    }

    .pig-card p {
      color: var(--text-secondary);
    }

    .muddy-btn {
      padding: 0.5rem 0.9rem;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      transition: opacity 0.2s;
    }

    .muddy-btn:hover {
      opacity: 0.8;
    }

    .muddy-btn.primary {
      background: var(--btn-primary-bg);
      color: var(--btn-primary-color);
    }

    .muddy-btn.secondary {
      background: var(--btn-secondary-bg);
      color: var(--btn-secondary-color);
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.7rem;
      border-radius: 999px;
      background: var(--badge-bg);
      color: var(--badge-color);
      font-size: 0.75rem;
      margin-left: 0.4rem;
    }

    .mood {
      font-weight: 600;
      color: var(--text-primary);
    }

    .nav {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--card-border);
      flex-wrap: wrap;
    }

    .nav a {
      padding: 0.5rem 1rem;
      border-radius: 999px;
      text-decoration: none;
      background: var(--btn-secondary-bg);
      color: var(--btn-secondary-color);
      font-weight: 600;
      transition: all 0.2s;
    }

    .nav a:hover,
    .nav a.active {
      background: var(--btn-primary-bg);
      color: var(--btn-primary-color);
    }

    .page-content {
      border-radius: 12px;
      border: 2px dashed var(--card-border);
      padding: 1.5rem;
      background: var(--card-bg);
    }

    .page-content h2 {
      margin-top: 0;
      font-size: 1.3rem;
      color: var(--text-primary);
    }

    .page-content p {
      color: var(--text-secondary);
    }

    .page-content a {
      color: var(--link-color);
      text-decoration: underline;
    }

    .page-content a:hover {
      color: var(--link-hover);
    }
  `;
}
