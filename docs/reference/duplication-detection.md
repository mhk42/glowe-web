# Duplication Detection Quality Gate 🛡️

⏱️ **Time:** 3 minutes 🎯 **Goal:** Understand how automated duplication
detection prevents code bloat

---

## 🚀 TL;DR

This project uses **jscpd** (Copy-Paste Detector) and **Stylelint rules** to
automatically detect and prevent code duplication in JavaScript, CSS, and HTML.

---

## 🔍 What Gets Checked?

### 1. CSS Duplication (Stylelint)

**Rules enforced:**

```json
{
  "no-duplicate-selectors": true,
  "declaration-block-no-duplicate-properties": true
}
```

**What it catches:**

```css
/* ❌ BLOCKED: Duplicate selector */
.button {
  padding: 12px;
}

.button {
  margin: 10px;
}

/* ❌ BLOCKED: Duplicate property */
.card {
  color: red;
  color: blue; /* Duplicate!
}
```

**How to fix:**

```css
/* ✅ PASSES: Merge selectors */
.button {
  padding: 12px;
  margin: 10px;
}

/* ✅ PASSES: Single property */
.card {
  color: blue;
}
```

---

### 2. Code Duplication (jscpd)

**Configuration (`.jscpd.json`):**

```json
{
  "threshold": 10,
  "minLines": 5,
  "minTokens": 50,
  "exitCode": 1
}
```

**What it means:**

- **threshold: 10** - Fail if >10% of code is duplicated
- **minLines: 5** - Flag duplicates of 5+ lines
- **minTokens: 50** - Flag duplicates of 50+ tokens
- **exitCode: 1** - Block commits if duplication found

**What it catches:**

```javascript
// ❌ BLOCKED: Duplicate function (5+ lines)
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function checkEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

**How to fix:**

```javascript
// ✅ PASSES: Single function, reused
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Reuse it everywhere
const isValid = validateEmail(userEmail);
```

---

## 🪝 When Duplication Checks Run

### Layer 1: Pre-commit Hook

```bash
git commit -m "Add feature"
↓
Husky runs lint-staged
↓
Stylelint checks CSS duplicates (fast)
↓
❌ BLOCKED if duplicates found
```

**Time:** < 2 seconds

### Layer 2: npm test

```bash
npm test
↓
Runs all linters including:
- npm run lint:duplication (jscpd)
↓
❌ FAILS if >10% duplication
```

**Time:** 5-10 seconds

### Layer 3: GitHub Actions (CI/CD)

```bash
git push
↓
GitHub Actions runs quality-checks job
↓
Runs npm run lint:duplication
↓
❌ Blocks merge if duplication detected
```

**Time:** 1-2 minutes

---

## 📊 Checking Duplication Locally

### Quick Check:

```bash
npm run lint:duplication
```

**Output (if duplicates found):**

```
Found duplicates: 2 clones
  - src/js/main.js:10-15 <-> src/js/utils.js:5-10 (6 lines)
  - src/styles/main.css:50-55 <-> src/styles/components.css:20-25 (6 lines)

Duplication: 12.5% (threshold: 10%)
❌ FAILED: Duplication above threshold
```

**Output (if clean):**

```
Scanning files...
Found 0 duplicates
Duplication: 0.0%
✅ PASSED: No duplication detected
```

### Detailed Report:

```bash
npm run lint:duplication
# Then open: .jscpd-report/html/index.html
```

**Report shows:**

- Exact location of duplicated code
- Side-by-side comparison
- Percentage of duplication
- List of all clone pairs

---

## 🎯 Thresholds Explained

### Current Settings:

| Metric    | Value | Meaning                                     |
| --------- | ----- | ------------------------------------------- |
| threshold | 10%   | Fail if more than 10% of code is duplicated |
| minLines  | 5     | Only flag duplicates of 5 or more lines     |
| minTokens | 50    | Only flag duplicates of 50 or more tokens   |
| exitCode  | 1     | Return error code (blocks CI/CD)            |

### Adjusting Thresholds:

**More strict (recommended for small projects):**

```json
{
  "threshold": 5,
  "minLines": 3,
  "minTokens": 30
}
```

**More lenient (for large legacy projects):**

```json
{
  "threshold": 15,
  "minLines": 10,
  "minTokens": 100
}
```

---

## 🚨 Common Duplication Patterns Caught

### 1. Duplicate CSS Classes

```css
/* ❌ jscpd BLOCKS this: */
.button-primary {
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.button-secondary {
  padding: 12px 24px; /* Duplicate! */
  border-radius: 4px; /* Duplicate! */
  font-size: 16px; /* Duplicate! */
  cursor: pointer; /* Duplicate! */
}
```

**Fix:** Use base class + modifiers

```css
/* ✅ PASSES: DRY approach */
.button {
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.button--primary {
  background: blue;
}

.button--secondary {
  background: gray;
}
```

### 2. Duplicate Validation Logic

```javascript
// ❌ jscpd BLOCKS this:
function validateUserEmail(email) {
  if (!email) return false;
  if (!email.includes('@')) return false;
  if (email.length < 5) return false;
  return true;
}

function validateContactEmail(email) {
  if (!email) return false;
  if (!email.includes('@')) return false;
  if (email.length < 5) return false;
  return true;
}
```

**Fix:** Single reusable function

```javascript
// ✅ PASSES: DRY approach
function validateEmail(email) {
  if (!email) return false;
  if (!email.includes('@')) return false;
  if (email.length < 5) return false;
  return true;
}

// Reuse everywhere
const userValid = validateEmail(userEmail);
const contactValid = validateEmail(contactEmail);
```

### 3. Duplicate HTML Structures

```html
<!-- ❌ jscpd BLOCKS this (in different files): -->
<!-- page1.html -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title 1</h3>
  </div>
  <div class="card-body">Content 1</div>
</div>

<!-- page2.html -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title 2</h3>
  </div>
  <div class="card-body">Content 2</div>
</div>
```

**Fix:** Create reusable component/include

```njk
<!-- ✅ PASSES: DRY approach -->
<!-- _includes/card.njk -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">{{ title }}</h3>
  </div>
  <div class="card-body">{{ content }}</div>
</div>

<!-- page1.njk -->
{% include "card.njk", title: "Title 1", content: "Content 1" %}

<!-- page2.njk -->
{% include "card.njk", title: "Title 2", content: "Content 2" %}
```

---

## 🛠️ Bypassing Checks (Emergency Only)

### Skip duplication check locally:

```bash
# Skip all linters (including duplication)
git commit --no-verify -m "Emergency fix"
```

### Ignore specific files:

Edit `.jscpd.json`:

```json
{
  "ignore": ["**/node_modules/**", "**/legacy-code.js"]
}
```

### Ignore specific code blocks:

```javascript
/* jscpd:ignore-start */
function legacyCode() {
  // This duplication is temporarily allowed
}
/* jscpd:ignore-end */
```

**⚠️ Warning:** Only use bypass for legitimate reasons (e.g., generated code,
temporary compatibility)

---

## 📈 Monitoring Duplication Over Time

### Check duplication percentage:

```bash
npm run lint:duplication | grep "Duplication:"
# Output: Duplication: 3.2%
```

### Track in CI/CD:

GitHub Actions logs show duplication percentage on every push.

### Set goals:

- **New projects:** Keep below 5%
- **Existing projects:** Reduce by 2% per sprint
- **Legacy projects:** Don't let it increase

---

## 🎯 Best Practices

### 1. Check Before Committing

```bash
# Always run before commit
npm test
```

### 2. Review Duplication Reports

```bash
npm run lint:duplication
open .jscpd-report/html/index.html
```

### 3. Refactor When Caught

Don't bypass - refactor to DRY:

```bash
# Found duplication?
# 1. Identify common code
# 2. Extract to shared function/class/component
# 3. Replace all instances
# 4. Verify: npm run lint:duplication
```

### 4. Educate Team

Share this guide with team members. Duplication is often unintentional.

---

## 💡 Pro Tips

### Tip 1: Use jscpd Before Large Changes

```bash
# Before refactoring
npm run lint:duplication

# After refactoring
npm run lint:duplication

# Compare duplication percentages
```

### Tip 2: Generate Reports for Code Reviews

```bash
npm run lint:duplication
# Share .jscpd-report/html/index.html with team
```

### Tip 3: Configure IDE Integration

Add to VS Code `tasks.json`:

```json
{
  "label": "Check Duplication",
  "type": "shell",
  "command": "npm run lint:duplication",
  "problemMatcher": []
}
```

---

## 🔗 Related Resources

- [📚 Avoiding Duplication Guide](../prompts/avoiding-duplication.md)
- [📝 Prompt Engineering Basics](../lessons/03-prompt-engineering-basics.md)
- [💻 npm Scripts Reference](npm-scripts.md)

---

## 📋 Quick Reference Card

```
┌──────────────────────────────────────────┐
│    DUPLICATION DETECTION QUICK REF       │
├──────────────────────────────────────────┤
│ CHECK LOCALLY:                           │
│   npm run lint:duplication               │
│                                          │
│ VIEW REPORT:                             │
│   open .jscpd-report/html/index.html     │
│                                          │
│ THRESHOLDS:                              │
│   Maximum: 10% duplication               │
│   Minimum: 5 lines or 50 tokens          │
│                                          │
│ BLOCKED BY:                              │
│   ✗ Pre-commit hook (Stylelint CSS)      │
│   ✗ npm test (jscpd all files)           │
│   ✗ GitHub Actions (CI/CD)               │
│                                          │
│ FIX APPROACH:                            │
│   1. Identify duplicate code             │
│   2. Extract to shared location          │
│   3. Replace all instances               │
│   4. Verify: npm run lint:duplication    │
└──────────────────────────────────────────┘
```

---

**Remember:** The best time to prevent duplication is BEFORE you write duplicate
code. Always check existing code first! 🎯
