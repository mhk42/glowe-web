# File Structure Guide 📁

Understanding what each file does in this project.

---

## 🚀 TL;DR

This guide explains every file and folder in the project, so you know what to
edit and what not to touch.

---

## 📊 Project Tree

```
117_site/
├── .github/              # GitHub-specific configuration
│   └── workflows/
│       └── ci-cd.yml     # GitHub Actions automation
├── .husky/               # Git hooks
│   └── pre-commit        # Pre-commit quality checks
├── docs/                 # Documentation
│   ├── lessons/          # Tutorial lessons
│   ├── prompts/          # Copy-paste prompts
│   └── reference/        # Quick reference guides
├── node_modules/         # Dependencies (auto-generated, don't edit)
├── src/                  # Source files (YOU EDIT THESE)
│   ├── _data/            # Global data files
│   │   └── site.js       # Site metadata
│   ├── _layouts/         # HTML templates
│   │   └── base.njk      # Base layout
│   ├── js/               # JavaScript files
│   │   └── main.js       # Main JS entry point
│   ├── styles/           # CSS files
│   │   └── main.css      # Main stylesheet
│   └── index.md          # Home page content
├── _site/                # Built site (auto-generated, don't edit)
├── .eleventy.js          # Eleventy configuration
├── .eslintrc.json        # JavaScript linting rules
├── .gitignore            # Files to exclude from Git
├── .lintstagedrc.json    # Pre-commit lint configuration
├── .markdownlint.json    # Markdown linting rules
├── .prettierignore       # Files Prettier should ignore
├── .prettierrc           # Prettier formatting rules
├── .stylelintrc.json     # CSS linting rules
├── lighthouserc.json     # Lighthouse CI configuration
├── package.json          # Project metadata & scripts
├── package-lock.json     # Dependency lock file (auto-generated)
├── README.md             # Project documentation
└── robots.txt            # Search engine instructions
```

---

## 📝 Files You'll Edit Often

### `src/` Directory

**The heart of your project.** All your content and assets live here.

#### `src/index.md`

- **What:** Home page content
- **Format:** Markdown
- **Template:** Uses `base.njk` layout
- **Edit when:** Changing home page text/structure

**Example:**

```markdown
---
layout: base.njk
title: Home
---

# Welcome to My Site

This is the home page content.
```

#### `src/_layouts/base.njk`

- **What:** Master HTML template
- **Format:** Nunjucks (templating language)
- **Used by:** All pages (unless they specify different layout)
- **Edit when:** Changing site-wide structure (header, footer, navigation)

**Key parts:**

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Meta tags, CSS links -->
  </head>
  <body>
    <header>
      <!-- Navigation -->
    </header>
    <main>
      {{ content | safe }}
      <!-- Page content goes here -->
    </main>
    <footer>
      <!-- Footer -->
    </footer>
  </body>
</html>
```

#### `src/_data/site.js`

- **What:** Global site metadata
- **Format:** JavaScript (exports object)
- **Used by:** All templates (accessed as `{{ site.title }}`)
- **Edit when:** Changing site title, author, description, URL

**Example:**

```javascript
module.exports = {
  title: 'My Awesome Site',
  description: 'A site about web development',
  author: 'Jane Doe',
  url: 'https://janedoe.github.io/my-site',
};
```

#### `src/styles/main.css`

- **What:** Main stylesheet
- **Format:** CSS
- **Linked from:** `base.njk` layout
- **Edit when:** Changing visual design

**Gets checked by:** Stylelint

#### `src/js/main.js`

- **What:** Main JavaScript file
- **Format:** JavaScript (ES6+)
- **Linked from:** `base.njk` layout
- **Edit when:** Adding interactivity

**Gets checked by:** ESLint

---

## ⚙️ Configuration Files

These configure how your tools work. Edit carefully!

### `.eleventy.js`

**Purpose:** Configure Eleventy static site generator

**Key settings:**

```javascript
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: 'src', // Source files
      output: '_site', // Built site
    },
    pathPrefix: '/your-repo-name/', // Important for GitHub Pages!
  };
};
```

**Edit when:**

- Changing input/output directories
- Adding plugins
- Configuring filters or shortcodes
- Deploying to GitHub Pages (update pathPrefix)

---

### `.eslintrc.json`

**Purpose:** Configure JavaScript linting rules

**Key settings:**

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

**Edit when:**

- Adjusting code quality standards
- Enabling/disabling specific rules
- Adding custom rules

**Documentation:** <https://eslint.org/docs/rules/>

---

### `.prettierrc`

**Purpose:** Configure code formatting

**Example:**

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**Edit when:** Changing formatting preferences (tabs vs spaces, quote style,
etc.)

**Documentation:** <https://prettier.io/docs/en/options.html>

---

### `.stylelintrc.json`

**Purpose:** Configure CSS linting

**Example:**

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-hex-length": "short",
    "selector-class-pattern": "^[a-z][a-z0-9-]*$"
  }
}
```

**Edit when:** Adjusting CSS code quality standards

**Documentation:** <https://stylelint.io/user-guide/rules/>

---

### `.lintstagedrc.json`

**Purpose:** Configure what linters run on staged files in pre-commit hook

**Example:**

```json
{
  "*.js": ["eslint --fix", "prettier --write"],
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.md": ["markdownlint --fix", "prettier --write"]
}
```

**Edit when:**

- Adding new file types to lint
- Changing which linters run
- Adding new pre-commit checks

---

### `package.json`

**Purpose:** Project metadata, dependencies, and npm scripts

**Key sections:**

```json
{
  "name": "117-site",
  "version": "1.0.0",
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy",
    "test": "npm run lint"
  },
  "dependencies": {
    "@11ty/eleventy": "^2.0.1"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

**Edit when:**

- Adding new npm scripts
- Installing new packages
- Updating project metadata

**DON'T manually edit:** `dependencies` versions (use `npm install` instead)

---

## 🤖 GitHub Automation Files

### `.github/workflows/ci-cd.yml`

**Purpose:** GitHub Actions workflow for automated testing and deployment

**Workflow stages:**

1. **quality-checks:** Run all linters
2. **build:** Build the Eleventy site
3. **lighthouse:** Run performance tests
4. **deploy:** Deploy to GitHub Pages

**Edit when:**

- Adding new quality checks
- Changing Node.js version
- Modifying deployment process

**Triggers on:** Push to `main` branch

---

## 🪝 Git Hook Files

### `.husky/pre-commit`

**Purpose:** Run checks before every git commit

**Current behavior:**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**Edit when:**

- Adding pre-commit tasks
- Skipping pre-commit for specific cases

**Skip temporarily:** `git commit --no-verify`

---

## 🔒 Ignore Files

### `.gitignore`

**Purpose:** Tell Git which files to ignore

**Common entries:**

```
node_modules/    # Dependencies
_site/           # Built files
.env             # Environment variables
.DS_Store        # macOS files
```

**Edit when:** Adding new files/folders that shouldn't be in version control

---

### `.prettierignore`

**Purpose:** Tell Prettier which files not to format

**Example:**

```
node_modules/
_site/
package-lock.json
```

**Edit when:** Excluding specific files from formatting

---

## 📦 Auto-Generated Files (Don't Edit!)

### `_site/`

- **What:** Built website (generated by Eleventy)
- **When created:** Running `npm run build` or `npm start`
- **Why ignore:** Will be regenerated on every build
- **Deploy from:** GitHub Actions deploys this folder

### `node_modules/`

- **What:** Installed npm packages
- **When created:** Running `npm install`
- **Size:** Can be 100MB+
- **Why ignore:** Can be recreated anytime with `npm install`

### `package-lock.json`

- **What:** Exact versions of all dependencies
- **When created:** Running `npm install`
- **Why keep:** Ensures consistent installs across environments
- **Edit:** Never manually (npm updates it automatically)

---

## 📚 Documentation Files

### `README.md`

- **What:** Project landing page and course index
- **Audience:** Students, developers using this project
- **Format:** Markdown with badges and links
- **Edit when:** Adding sections, updating links, fixing typos

### `docs/lessons/`

- **What:** Step-by-step tutorial lessons
- **Format:** Markdown files (01-what-is-this.md, etc.)
- **Naming:** Numbered for sequence
- **Edit when:** Improving lessons, adding examples

### `docs/prompts/`

- **What:** Copy-paste prompts for AI assistants
- **Format:** Markdown with code blocks
- **Categories:** Setup, configuration, building, debugging
- **Edit when:** Adding new prompts, improving existing ones

### `docs/reference/`

- **What:** Quick reference guides
- **Examples:** npm scripts, file structure, AI guide
- **Format:** Markdown with tables and code
- **Edit when:** Adding commands, updating docs

---

## 🎯 Common File Operations

### Adding a New Page

1. Create `src/new-page.md`
2. Add frontmatter:

```markdown
---
layout: base.njk
title: New Page
---

# Page Content
```

3. Build to see it at `/new-page/`

### Adding a New Stylesheet

1. Create `src/styles/components.css`
2. Link in `src/_layouts/base.njk`:

```html
<link rel="stylesheet" href="{{ '/styles/components.css' | url }}" />
```

### Adding a New Layout

1. Create `src/_layouts/post.njk`
2. Extend base layout:

```html
{% extends "base.njk" %} {% block content %}
<article>{{ content | safe }}</article>
{% endblock %}
```

3. Use in page:

```markdown
---
layout: post.njk
---
```

---

## 🚨 Files to Be Careful With

### ⚠️ `.eleventy.js`

**Why:** Syntax errors break the entire build

**Test changes:** Run `npm start` after editing

### ⚠️ `.github/workflows/ci-cd.yml`

**Why:** Syntax errors break deployments

**Test changes:** Use YAML linter before pushing

### ⚠️ `package.json`

**Why:** Invalid JSON breaks npm commands

**Test changes:** Run `npm test` after editing

---

## 💡 Pro Tips

### Tip 1: Search Before Creating

```bash
# Find where a file is used
grep -r "filename" .

# Find all CSS files
find . -name "*.css"
```

### Tip 2: Understand Dependencies

```bash
# See dependency tree
npm list

# See why a package is installed
npm why package-name
```

### Tip 3: Check File Sizes

```bash
# See largest files
du -sh * | sort -rh | head -10
```

---

## 📋 Quick Decision Guide

```
┌────────────────────────────────────────────┐
│    WHAT FILE SHOULD I EDIT?                │
├────────────────────────────────────────────┤
│ Change page content?                       │
│ → src/[page-name].md                       │
│                                            │
│ Change site structure?                     │
│ → src/_layouts/base.njk                    │
│                                            │
│ Change site styles?                        │
│ → src/styles/main.css                      │
│                                            │
│ Change interactivity?                      │
│ → src/js/main.js                           │
│                                            │
│ Change site metadata?                      │
│ → src/_data/site.js                        │
│                                            │
│ Change linting rules?                      │
│ → .eslintrc.json (JS)                      │
│ → .stylelintrc.json (CSS)                  │
│ → .markdownlint.json (MD)                  │
│                                            │
│ Change build process?                      │
│ → .eleventy.js                             │
│                                            │
│ Change deployment?                         │
│ → .github/workflows/ci-cd.yml              │
└────────────────────────────────────────────┘
```

---

## 🔗 Related Resources

- [📚 Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)
- [📝 Building Pages Prompts](../prompts/building-pages.md)
- [💻 npm Scripts Reference](npm-scripts.md)

---

**Remember:** When in doubt, ask your AI assistant "What does [filename] do in
an Eleventy project?" 🤖
