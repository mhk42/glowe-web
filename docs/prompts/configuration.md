# Configuration Prompts 🔧

**Purpose:** Copy-paste prompts for configuring quality tools (ESLint, Prettier,
Stylelint, Husky)

**When to use:** Setting up a new project or adding quality gates

---

## 📋 Quick Reference

| Prompt                                                     | Use Case              | Tool         |
| ---------------------------------------------------------- | --------------------- | ------------ |
| [Configure ESLint](#prompt-1-configure-eslint)             | JavaScript linting    | ESLint       |
| [Configure Prettier](#prompt-2-configure-prettier)         | Code formatting       | Prettier     |
| [Configure Stylelint](#prompt-3-configure-stylelint)       | CSS linting           | Stylelint    |
| [Configure Markdownlint](#prompt-4-configure-markdownlint) | Markdown linting      | Markdownlint |
| [Configure Husky](#prompt-5-configure-husky)               | Git hooks             | Husky        |
| [Configure lint-staged](#prompt-6-configure-lint-staged)   | Staged file linting   | lint-staged  |
| [Configure jscpd](#prompt-7-configure-jscpd)               | Duplication detection | jscpd        |

---

## Prompt 1: Configure ESLint

**Use when:** Setting up JavaScript linting

### 📋 Copy This Prompt:

```
I need to configure ESLint for a modern JavaScript project. Please:

1. Create .eslintrc.json with:
   - Browser and Node.js environment
   - ES2021 syntax support
   - Recommended rules enabled
   - Prettier compatibility (no conflicts)
   - Allow console.log (warning, not error)
   - Warn on unused variables

2. Create .eslintignore to ignore:
   - node_modules/
   - _site/
   - dist/
   - .eleventy.js (configuration file)

3. Add npm script "lint:js" that checks src/**/*.js files

Example configuration structure:
{
  "env": { "browser": true, "es2021": true, "node": true },
  "extends": ["eslint:recommended", "prettier"],
  "rules": { "no-console": "warn", "no-unused-vars": "warn" }
}

Make sure it doesn't conflict with Prettier formatting rules.
```

---

## Prompt 2: Configure Prettier

**Use when:** Setting up code formatting

### 📋 Copy This Prompt:

```
I need to configure Prettier for consistent code formatting. Please:

1. Create .prettierrc with these settings:
   - Use semicolons
   - Double quotes (not single)
   - 2 spaces for indentation
   - 80 character line width
   - Trailing commas where valid in ES5

2. Create .prettierignore to ignore:
   - node_modules/
   - _site/
   - package-lock.json
   - *.min.js
   - *.min.css

3. Add npm scripts:
   - "lint:format": Check formatting (don't modify files)
   - "format": Auto-format all files (modify in place)

Format these file types: .js, .css, .md, .json, .html

Example configuration:
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

---

## Prompt 3: Configure Stylelint

**Use when:** Setting up CSS linting

### 📋 Copy This Prompt:

```
I need to configure Stylelint for CSS quality checks. Please:

1. Create .stylelintrc.json with:
   - Extend "stylelint-config-standard"
   - Prettier compatibility
   - Block duplicate selectors (no-duplicate-selectors: true)
   - Block duplicate properties (except consecutive overrides)

2. Add npm script "lint:css" that checks src/**/*.css files with auto-fix

3. Install these packages:
   - stylelint
   - stylelint-config-standard
   - stylelint-prettier

Example configuration:
{
  "extends": ["stylelint-config-standard", "stylelint-prettier/recommended"],
  "rules": {
    "no-duplicate-selectors": true,
    "declaration-block-no-duplicate-properties": [true, {
      "ignore": ["consecutive-duplicates-with-different-values"]
    }]
  }
}

This should catch CSS duplication automatically.
```

---

## Prompt 4: Configure Markdownlint

**Use when:** Setting up Markdown linting

### 📋 Copy This Prompt:

```
I need to configure Markdownlint for documentation quality. Please:

1. Create .markdownlint.json with:
   - Enable most rules
   - Allow inline HTML (we use it for styling)
   - Allow long lines (we have code examples)
   - Consistent list marker style
   - No duplicate headings allowed

2. Create .markdownlintignore to ignore:
   - node_modules/
   - _site/
   - CHANGELOG.md (if using Keep a Changelog format)

3. Add npm script "lint:md" that checks all .md files with auto-fix

Example configuration:
{
  "default": true,
  "MD013": false,
  "MD033": false,
  "MD041": false
}

Make sure it works with our lesson and reference documentation.
```

---

## Prompt 5: Configure Husky

**Use when:** Setting up Git hooks

### 📋 Copy This Prompt:

```
I need to configure Husky for Git hooks. Please:

1. Install husky as dev dependency

2. Initialize Husky in the project:
   - Create .husky/ directory
   - Add pre-commit hook
   - Make hook executable

3. Pre-commit hook should:
   - Run lint-staged (check only staged files)
   - Run duplication check (jscpd on src/)
   - Block commit if any check fails

4. Add npm script "prepare": "husky install" (runs after npm install)

Hook script structure:
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run lint:duplication

Ensure the hook blocks commits when checks fail (exit code 1).
```

---

## Prompt 6: Configure lint-staged

**Use when:** Configuring staged file linting

### 📋 Copy This Prompt:

```
I need to configure lint-staged to check only staged files. Please:

Add lint-staged configuration to package.json that:

1. For JavaScript files (*.js):
   - Run ESLint with --fix
   - Run Prettier --write
   - Re-stage fixed files

2. For CSS files (*.css):
   - Run Stylelint with --fix
   - Run Prettier --write
   - Re-stage fixed files

3. For Markdown files (*.md):
   - Run Markdownlint with --fix
   - Run Prettier --write
   - Re-stage fixed files

Example configuration structure:
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix", "prettier --write"],
    "*.md": ["markdownlint --fix", "prettier --write"]
  }
}

This should only check files being committed, not the entire project.
```

---

## Prompt 7: Configure jscpd

**Use when:** Setting up duplication detection

### 📋 Copy This Prompt:

```
I need to configure jscpd for code duplication detection. Please:

1. Create .jscpd.json with:
   - 10% duplication threshold (fail if exceeded)
   - Minimum 5 lines to be considered duplicate
   - Minimum 50 tokens to be considered duplicate
   - Check JavaScript, CSS, and HTML files
   - Exit with code 1 if threshold exceeded

2. Ignore these directories:
   - node_modules/
   - _site/
   - dist/
   - .git/
   - *.min.js
   - *.min.css
   - package-lock.json

3. Add npm script "lint:duplication" that runs jscpd on src/ directory

4. Update .gitignore to exclude .jscpd-report/

Example configuration:
{
  "threshold": 10,
  "reporters": ["html", "console"],
  "ignore": ["node_modules/**", "_site/**", "*.min.js"],
  "absolute": true,
  "gitignore": true,
  "exitCode": 1,
  "minLines": 5,
  "minTokens": 50
}

This should automatically fail builds when duplication exceeds 10%.
```

---

## 🔄 Complete Setup Prompt

**Use when:** Setting up ALL quality tools at once

### 📋 Copy This Prompt:

```
I need to set up a complete quality gate system for a modern web project using Eleventy. Please configure:

1. ESLint (JavaScript linting)
   - Browser + Node.js + ES2021
   - Prettier compatible
   - Console warnings allowed

2. Prettier (Code formatting)
   - Semicolons, double quotes, 2 spaces
   - Format JS, CSS, MD, JSON, HTML

3. Stylelint (CSS linting)
   - Standard config
   - Block duplicate selectors and properties
   - Prettier compatible

4. Markdownlint (Documentation)
   - Standard rules
   - Allow HTML and long lines

5. jscpd (Duplication detection)
   - 10% threshold
   - Check JS, CSS, HTML
   - Fail builds if exceeded

6. Husky + lint-staged (Pre-commit hooks)
   - Check only staged files
   - Auto-fix when possible
   - Run duplication check
   - Block bad commits

7. npm scripts:
   - lint:js, lint:css, lint:md, lint:format, lint:duplication
   - lint (runs all checks)
   - format (auto-format all files)
   - test (runs lint + build)

Project structure:
- Source: src/
- Build output: _site/
- Site generator: Eleventy

DRY is critical—duplication detection must be enforced!
```

---

## 🧪 Testing Configuration

After applying configuration prompts, verify with:

```bash
# Install dependencies
npm install

# Test each tool
npm run lint:js
npm run lint:css
npm run lint:md
npm run lint:format
npm run lint:duplication

# Test all together
npm run lint

# Test pre-commit hook
git add .
git commit -m "test: verify hooks work"
# Should run checks automatically

# Test formatting
npm run format
# Should format all files
```

---

## 🚨 Common Configuration Issues

### Issue: "extends 'prettier' not found"

**Fix:**

```bash
npm install --save-dev eslint-config-prettier
```

---

### Issue: "stylelint-config-standard not found"

**Fix:**

```bash
npm install --save-dev stylelint stylelint-config-standard
```

---

### Issue: "Husky hooks not executing"

**Fix:**

```bash
# Reinstall and make executable
npx husky install
chmod +x .husky/pre-commit
```

---

### Issue: "jscpd not found"

**Fix:**

```bash
npm install --save-dev jscpd
```

---

## 💡 Pro Tips

### Tip 1: Test Each Tool Separately

Configure one tool at a time, test it, then move to the next.

### Tip 2: Start with Defaults

Use recommended configs first, customize later only if needed.

### Tip 3: Check Compatibility

Ensure ESLint, Prettier, and Stylelint don't conflict:

- ESLint: `extends: ["prettier"]`
- Stylelint: `extends: ["stylelint-prettier/recommended"]`

### Tip 4: Document Custom Rules

If you add custom rules, document WHY in comments:

```json
{
  "rules": {
    "no-console": "warn" // Allow console in development
  }
}
```

---

## 📊 Configuration Checklist

Before considering configuration complete:

- [ ] All config files created
- [ ] All dependencies installed
- [ ] All npm scripts defined
- [ ] All tools run without errors
- [ ] Pre-commit hooks work
- [ ] Duplication detection enforced
- [ ] Formatting auto-fixes work
- [ ] Ignore files configured
- [ ] No tool conflicts exist
- [ ] Documentation updated

---

## 🔗 Quick Links

- [🏠 Back to Course Index](../../README.md)
- [📚 Lesson 6: ESLint & Prettier](../lessons/06-eslint-prettier.md)
- [📚 Lesson 7: Pre-commit Hooks](../lessons/07-pre-commit-hooks.md)
- [📖 Duplication Detection Guide](../reference/duplication-detection.md)

---

**Use these prompts to quickly set up professional-grade quality gates!** 🔧✨
