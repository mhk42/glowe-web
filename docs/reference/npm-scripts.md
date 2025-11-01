# npm Scripts Cheatsheet 📋

Quick reference for all available commands in this project.

---

## 🚀 Development Commands

### `npm start`

**What it does:** Starts the Eleventy development server with live reload

**When to use:** Daily development work

**Output:**

```bash
[11ty] Writing _site/index.html from ./src/index.md
[11ty] Wrote 15 files in 0.50 seconds
[11ty] Watching…
[11ty] Server at http://localhost:8080/
```

**Browser:** Open <http://localhost:8080>

**Stop server:** Press `Ctrl+C`

---

### `npm run build`

**What it does:** Builds the production-ready site

**When to use:**

- Before deploying manually
- To test production build locally
- In CI/CD pipeline

**Output directory:** `_site/`

**Command equivalent:** `eleventy`

**Example:**

```bash
npm run build
# Creates _site/ folder with all generated HTML/CSS/JS
```

---

## 🔍 Quality Check Commands

### `npm test`

**What it does:** Runs ALL quality checks (ESLint + Stylelint + Markdownlint +
Duplication Check)

**When to use:**

- Before committing
- To verify your entire codebase
- As a comprehensive check

**Command equivalent:**

```bash
npm run lint:js && npm run lint:css && npm run lint:md && npm run lint:duplication
```

**Expected output (success):**

```bash
✓ All JavaScript files pass ESLint
✓ All CSS files pass Stylelint
✓ All Markdown files pass markdownlint
✓ No code duplication detected (0%)
```

---

### `npm run lint:js`

**What it does:** Checks JavaScript files for code quality issues

**Files checked:** All `.js` files in the project

**Command equivalent:** `eslint .`

**Common errors:**

```bash
❌ 'variable' is assigned a value but never used (no-unused-vars)
❌ Unexpected console statement (no-console)
❌ 'const' was used before it was defined (no-use-before-define)
```

**Fix automatically:**

```bash
npm run lint:js -- --fix
```

---

### `npm run lint:css`

**What it does:** Checks CSS files for quality and consistency

**Files checked:** All `.css` files in `src/styles/`

**Command equivalent:** `stylelint "src/styles/**/*.css"`

**Common errors:**

```bash
❌ Expected empty line before comment (comment-empty-line-before)
❌ Unexpected duplicate selector (no-duplicate-selectors)
❌ Expected color to be in hex format (color-named)
```

**Fix automatically:**

```bash
npm run lint:css -- --fix
```

---

### `npm run lint:md`

**What it does:** Checks Markdown files for formatting consistency

**Files checked:** All `.md` files

**Command equivalent:** `markdownlint "**/*.md" --ignore node_modules`

**Common errors:**

```bash
❌ MD022: Headings should be surrounded by blank lines
❌ MD040: Fenced code blocks should have a language specified
❌ MD034: Bare URL used (should use angle brackets)
```

**Fix automatically:**

```bash
npm run lint:md -- --fix
```

---

### `npm run lint:duplication` 🆕

**What it does:** Detects code duplication across JavaScript, CSS, and HTML

**Tool used:** jscpd (Copy-Paste Detector)

**Threshold:** Fails if >10% of code is duplicated

**Command equivalent:** `jscpd src/`

**Output:**

```bash
✅ Found 0 clones. Duplication: 0.0%
# OR
❌ Found 2 clones. Duplication: 12.5% (threshold: 10%)
```

**View detailed report:**

```bash
npm run lint:duplication
open .jscpd-report/html/index.html
```

**When to use:**

- Before committing (runs in pre-commit hook)
- After refactoring
- To audit codebase health

**Learn more:** [Duplication Detection Guide](duplication-detection.md)

---

## 🎨 Formatting Commands

### `npm run format`

**What it does:** Auto-formats ALL files with Prettier

**Files affected:**

- JavaScript (`.js`)
- CSS (`.css`)
- Markdown (`.md`)
- JSON (`.json`)
- YAML (`.yml`, `.yaml`)

**Command equivalent:** `prettier --write "./**/*.{js,css,md,json,yml,yaml}"`

**When to use:**

- After writing a lot of code
- To fix formatting issues
- Before committing (though pre-commit does this automatically)

**Example:**

```bash
npm run format
# ✔ Formatted 47 files
```

---

## 🧪 Testing Commands

### `npm run test:watch`

**What it does:** Runs linters in watch mode (re-runs on file changes)

**When to use:** During active development to get instant feedback

**Note:** This project uses editor integration instead, but you can add this:

```json
"test:watch": "chokidar '**/*.{js,css,md}' -c 'npm test'"
```

---

## 🚀 Deployment Commands

### Automatic Deployment

**Trigger:** Push to `main` branch

**What happens:**

1. GitHub Actions runs `npm install`
2. Runs `npm test` (quality checks)
3. Runs `npm run build`
4. Runs Lighthouse CI
5. Deploys to GitHub Pages

**No manual command needed!**

---

### Manual Deployment

If you need to deploy manually:

```bash
# 1. Build the site
npm run build

# 2. Commit and push
git add .
git commit -m "Deploy update"
git push

# 3. Wait for GitHub Actions to deploy
```

---

## 🪝 Git Hook Commands

### Pre-commit Hook

**Automatically runs:** When you `git commit`

**What it checks:**

- Lints staged JavaScript files
- Lints staged CSS files
- Lints staged Markdown files
- Formats all staged files

**Command equivalent:** `lint-staged`

**Example workflow:**

```bash
# 1. Make changes
vi src/js/main.js

# 2. Stage changes
git add src/js/main.js

# 3. Commit (triggers pre-commit hook)
git commit -m "Add feature"

# Pre-commit hook runs:
# ✔ ESLint on src/js/main.js
# ✔ Prettier on src/js/main.js
# ✔ Commit allowed!
```

**If hook fails:**

```bash
# Fix issues automatically
npm run format
npm run lint:js -- --fix

# Try committing again
git commit -m "Add feature"
```

---

## 🔧 Utility Commands

### `npm run clean`

**What it does:** Deletes the `_site/` build directory

**When to use:**

- Before a fresh build
- If build seems cached incorrectly
- To save disk space

**Add to package.json:**

```json
"clean": "rm -rf _site"
```

**Usage:**

```bash
npm run clean
npm run build
```

---

### `npm run validate`

**What it does:** Validates HTML in the built site

**When to use:** To check for HTML errors after building

**Add to package.json:**

```json
"validate": "html-validate _site/**/*.html"
```

**Requires:** `npm install --save-dev html-validate`

---

## 📊 Command Comparison

| Command                    | Speed  | Scope              | Auto-fix | Use Case                   |
| -------------------------- | ------ | ------------------ | -------- | -------------------------- |
| `npm start`                | Fast   | Build + serve      | No       | Daily development          |
| `npm run build`            | Fast   | Build only         | No       | Production build           |
| `npm test`                 | Medium | All quality checks | No       | Comprehensive verification |
| `npm run lint:js`          | Fast   | JavaScript only    | Yes      | JS-specific checking       |
| `npm run lint:css`         | Fast   | CSS only           | Yes      | CSS-specific checking      |
| `npm run lint:md`          | Fast   | Markdown only      | Yes      | Markdown-specific checking |
| `npm run lint:duplication` | Medium | Code duplication   | No       | Detect copy-paste code     |
| `npm run format`           | Fast   | All files          | Yes      | Format everything          |

---

## 🎯 Common Workflows

### Daily Development

```bash
# 1. Start dev server
npm start

# 2. Make changes
# (save files, see live reload)

# 3. Check quality
npm test

# 4. Commit
git add .
git commit -m "Add feature"  # Pre-commit hook runs automatically
git push  # GitHub Actions deploys automatically
```

---

### Fixing Quality Issues

```bash
# 1. Run tests to see issues
npm test

# 2. Auto-fix what's possible
npm run format
npm run lint:js -- --fix
npm run lint:css -- --fix
npm run lint:md -- --fix

# 3. Verify fixes
npm test

# 4. Commit
git add .
git commit -m "Fix linting issues"
```

---

### Before Pull Request

```bash
# 1. Make sure everything is formatted
npm run format

# 2. Run all quality checks
npm test

# 3. Build successfully
npm run build

# 4. Check build output
open _site/index.html

# 5. Commit and push
git add .
git commit -m "Ready for review"
git push
```

---

## 🚨 Troubleshooting Commands

### If dev server won't start

```bash
# 1. Check for port conflicts
lsof -i :8080

# 2. Kill process using port 8080
kill -9 [PID]

# 3. Start again
npm start
```

---

### If linters fail

```bash
# 1. See detailed errors
npm run lint:js

# 2. Try auto-fixing
npm run lint:js -- --fix

# 3. If still failing, see specific rules
npm run lint:js -- --debug
```

---

### If build fails

```bash
# 1. Clean old build
rm -rf _site

# 2. Try building again
npm run build

# 3. Check for file errors
npm run lint:js
npm run lint:css
```

---

### If pre-commit hook is slow

```bash
# Check what's being linted
cat .lintstagedrc.json

# Reduce scope if needed (edit .lintstagedrc.json)
# Only lint staged files, not entire codebase
```

---

## 💡 Pro Tips

### Tip 1: Chain Commands

```bash
# Run multiple commands in sequence
npm test && npm run build && npm start
```

### Tip 2: Custom Scripts

Add your own scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "npm start",
    "lint:all": "npm test",
    "deploy:test": "npm run build && npx http-server _site"
  }
}
```

### Tip 3: Pass Arguments

```bash
# Pass extra arguments to underlying command
npm run lint:js -- --debug
npm run build -- --quiet
```

### Tip 4: Check Script Definitions

```bash
# See all available scripts
npm run
```

---

## 📋 Quick Reference Card

```
┌─────────────────────────────────────────────┐
│         NPM SCRIPTS QUICK REFERENCE         │
├─────────────────────────────────────────────┤
│ DEVELOPMENT:                                │
│   npm start          Start dev server       │
│   npm run build      Build for production   │
│                                             │
│ QUALITY CHECKS:                             │
│   npm test           Run all linters        │
│   npm run lint:js    Check JavaScript       │
│   npm run lint:css   Check CSS              │
│   npm run lint:md    Check Markdown         │
│   npm run lint:duplication  Check for dupes │
│                                             │
│ FORMATTING:                                 │
│   npm run format     Format all files       │
│                                             │
│ AUTO-FIX:                                   │
│   npm run lint:js -- --fix                  │
│   npm run lint:css -- --fix                 │
│   npm run lint:md -- --fix                  │
└─────────────────────────────────────────────┘
```

---

## 🔗 Related Resources

- [📚 Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)
- [📝 Initial Setup Prompts](../prompts/initial-setup.md)
- [🐛 Debugging Prompts](../prompts/debugging.md)
- [📖 File Structure Guide](file-structure.md)

---

**💡 Remember:** You don't need to memorize these. Bookmark this page for quick
reference! 📌
