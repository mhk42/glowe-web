# Avoiding Code Duplication with AI 🚫

⏱️ **Time:** 5 minutes  
🎯 **Goal:** Prevent AI from creating duplicate code (especially CSS)

---

## 🚀 TL;DR

AI coding agents love to duplicate code instead of reusing what exists. This
guide teaches you how to force AI to follow DRY (Don't Repeat Yourself)
principles.

---

## ⚠️ The Duplication Problem

### What AI Does Wrong:

```css
/* Existing in main.css */
.button {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

/* AI generates THIS instead of reusing above: */
.submit-button {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
```

### Why This is Bad:

- **Bloated CSS:** 2x the file size for identical styles
- **Maintenance nightmare:** Change button style? Update 10+ places
- **Inconsistency:** Variations creep in over time
- **Performance:** Larger files = slower loading

---

## 🎯 The DRY Workflow

### Step 1: Always Check First

**Before asking AI to create anything:**

```bash
# Search for existing styles
grep -i "button" src/styles/main.css

# Search for existing JavaScript functions
grep -i "function.*validate" src/js/main.js

# Search for existing HTML patterns
grep -i "nav" src/_layouts/*.njk
```

### Step 2: Prompt AI to Check

**Template:**

```
Before creating [NEW_THING], check these files for existing code:
- [FILE_1]
- [FILE_2]

List what already exists that can be reused.
Only create new code if truly necessary.
```

### Step 3: Verify No Duplication

After AI generates code, check:

```bash
# Find duplicate CSS selectors
grep -E "^\.[a-z-]+ \{" src/styles/main.css | sort | uniq -d

# Find duplicate function names
grep -E "^function [a-zA-Z]+" src/js/main.js | sort | uniq -d
```

---

## 📝 Anti-Duplication Prompts

### For CSS Styles

#### ❌ BAD Prompt:

```
"Create a style for the submit button"
```

**Result:** New duplicate `.submit-button` class

#### ✅ GOOD Prompt:

```
I need to style a submit button.

First, check src/styles/main.css for:
- Existing .button class
- Existing button-related styles
- CSS custom properties (variables) for colors

If .button class exists:
- Show me how to reuse it: <button class="button">Submit</button>
- If submit needs unique styles, show how to ADD to existing (.button.submit)

Only create NEW class if no button styles exist at all.

Maintain DRY principles - no duplicate styles.
```

**Result:** Reuses existing `.button` class ✅

---

### For JavaScript Functions

#### ❌ BAD Prompt:

```
"Create a function to validate email"
```

**Result:** New duplicate `validateEmail()` function

#### ✅ GOOD Prompt:

```
I need to validate email addresses.

First, check src/js/main.js for:
- Existing validation functions
- Existing regex patterns
- Existing helper utilities

If email validation exists:
- Show me how to use it
- If it needs modification, UPDATE the existing function

Only create NEW function if no email validation exists.

Follow DRY principles - reuse existing code.
```

**Result:** Reuses or updates existing function ✅

---

### For HTML Components

#### ❌ BAD Prompt:

```
"Create a navigation menu"
```

**Result:** New duplicate nav structure

#### ✅ GOOD Prompt:

```
I need navigation for a new page.

First, check src/_layouts/base.njk for:
- Existing navigation structure
- Existing nav classes
- Navigation data patterns

If navigation exists:
- Show me how to add a new link to existing nav
- Do NOT create duplicate nav structure

Only create NEW nav if none exists in layouts.

Maintain consistency with existing patterns.
```

**Result:** Adds to existing nav ✅

---

## 🔍 Duplication Detection Prompts

### After AI Generates Code:

```
Review the code you just generated and check for:

1. Duplicate CSS rules (same properties as existing styles)
2. Duplicate selectors (same class names as existing code)
3. Duplicate functions (same logic as existing functions)
4. Code that could use existing utilities

If you find duplicates:
- Refactor to reuse existing code
- Show me the DRY version
```

---

## 🎨 CSS-Specific Anti-Duplication Strategies

### Strategy 1: Use Existing Classes

```html
<!-- ❌ AI creates new class -->
<button class="submit-btn">Submit</button>
<style>
  .submit-btn {
    /* duplicate styles */
  }
</style>

<!-- ✅ Reuse existing class -->
<button class="button">Submit</button>
<!-- Uses existing .button styles -->
```

### Strategy 2: Extend with Modifiers

```css
/* Existing base */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
}

/* ✅ Extend, don't duplicate */
.button--primary {
  background: #007bff;
  color: white;
}

.button--secondary {
  background: #6c757d;
  color: white;
}
```

### Strategy 3: Use CSS Variables

```css
/* Define once */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --spacing-md: 12px;
  --spacing-lg: 24px;
}

/* ✅ Reuse everywhere */
.button {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-primary);
}

.alert {
  padding: var(--spacing-md);
  border-color: var(--color-primary);
}
```

### Strategy 4: Utility Classes

```css
/* Create once */
.text-center {
  text-align: center;
}
.mb-1 {
  margin-bottom: 8px;
}
.mb-2 {
  margin-bottom: 16px;
}

/* ✅ Reuse in HTML */
<h1 class="text-center mb-2">Title</h1>
<p class="mb-1">Paragraph</p>
```

---

## 🛠️ Tools to Detect Duplication

### Manual Checks:

```bash
# Find duplicate CSS selectors
grep -E "^\.[a-z-]+ \{" src/styles/main.css | sort | uniq -d

# Find similar CSS properties
grep "padding:" src/styles/main.css

# Find duplicate colors
grep "#[0-9a-f]\{6\}" src/styles/main.css | sort | uniq -c
```

### Using Stylelint:

```json
{
  "rules": {
    "no-duplicate-selectors": true,
    "declaration-block-no-duplicate-properties": true
  }
}
```

---

## 🎯 Code Review Checklist

Before committing AI-generated code:

### CSS Duplication Check:

- [ ] No duplicate class selectors
- [ ] No duplicate property sets
- [ ] Uses existing CSS variables
- [ ] Follows existing naming conventions
- [ ] Extends existing classes instead of creating new ones

### JavaScript Duplication Check:

- [ ] No duplicate function names
- [ ] No duplicate logic
- [ ] Reuses existing utilities
- [ ] Follows existing patterns

### HTML Duplication Check:

- [ ] No duplicate component structures
- [ ] Reuses existing layouts
- [ ] Consistent class usage

---

## 📊 Example: Full DRY Workflow

### Scenario: Add a "Delete" Button

#### Step 1: Check Existing

```bash
grep -i "button" src/styles/main.css
# Found: .button class exists
```

#### Step 2: Prompt AI

```
I need a delete button that:
- Shows a red/danger style
- Has confirmation on click

I found existing .button class in src/styles/main.css.

Show me how to:
1. Reuse .button class with a modifier for danger style
2. Add click handler without duplicating existing button logic

Do NOT create duplicate .button styles.
Follow BEM naming: .button--danger
```

#### Step 3: Verify Result

```css
/* ✅ AI extends existing, doesn't duplicate */
.button--danger {
  background: #dc3545;
}
```

```html
<!-- ✅ Reuses base .button class -->
<button class="button button--danger" onclick="confirmDelete()">Delete</button>
```

---

## 🚨 Common Duplication Patterns to Watch For

### 1. Multiple Button Classes

```css
/* ❌ BAD - Duplicated base styles */
.button {
  /* ... */
}
.submit-button {
  /* ... duplicate ... */
}
.cancel-button {
  /* ... duplicate ... */
}

/* ✅ GOOD - One base, variants */
.button {
  /* base */
}
.button--submit {
  /* unique only */
}
.button--cancel {
  /* unique only */
}
```

### 2. Repeated Media Queries

```css
/* ❌ BAD - Same breakpoint repeated */
.header {
  /* ... */
}
@media (max-width: 768px) {
  .header {
    /* ... */
  }
}

.nav {
  /* ... */
}
@media (max-width: 768px) {
  .nav {
    /* ... */
  }
}

/* ✅ GOOD - Group by breakpoint */
.header {
  /* ... */
}
.nav {
  /* ... */
}

@media (max-width: 768px) {
  .header {
    /* ... */
  }
  .nav {
    /* ... */
  }
}
```

### 3. Duplicate Validation Logic

```javascript
// ❌ BAD - Duplicated logic
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ GOOD - Single function
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

## 💡 Pro Tips

### Tip 1: Establish Naming Conventions Early

Create a `CONVENTIONS.md`:

```markdown
## CSS Naming

- Base classes: `.component` (e.g., `.button`, `.card`)
- Modifiers: `.component--modifier` (e.g., `.button--primary`)
- States: `.component.is-state` (e.g., `.button.is-active`)

## Never Create:

- `.submit-button`, `.cancel-button` → Use `.button--submit`, `.button--cancel`
- `.large-text`, `.small-text` → Use utility classes `.text-lg`, `.text-sm`
```

### Tip 2: Create a Components Inventory

Keep a `COMPONENTS.md` listing reusable code:

```markdown
## Available Components

- `.button` - Base button styles (src/styles/main.css:45)
- `.card` - Card container (src/styles/main.css:120)
- `validateForm()` - Form validation (src/js/main.js:12)
```

### Tip 3: Regular Duplication Audits

```bash
# Weekly check for duplicates
npm run lint
grep -E "^\.[a-z-]+ \{" src/styles/main.css | sort | uniq -d
```

---

## 🔗 Related Resources

- [📚 Lesson 3: Prompt Engineering Basics](../lessons/03-prompt-engineering-basics.md)
- [📝 Configuration Prompts](configuration.md)
- [📖 File Structure Guide](../reference/file-structure.md)

---

## 📋 Quick Reference Card

```
┌────────────────────────────────────────┐
│   AI DUPLICATION PREVENTION FORMULA    │
├────────────────────────────────────────┤
│ 1. SEARCH existing code first         │
│ 2. PROMPT AI to check before creating │
│ 3. VERIFY no duplicates in result     │
│ 4. REFACTOR if duplicates found       │
├────────────────────────────────────────┤
│ ALWAYS CHECK:                          │
│ • src/styles/main.css (for CSS)       │
│ • src/js/main.js (for JavaScript)     │
│ • src/_layouts/ (for HTML patterns)   │
├────────────────────────────────────────┤
│ MAGIC PHRASE:                          │
│ "Before creating, check existing code │
│  and REUSE instead of duplicate"       │
└────────────────────────────────────────┘
```

---

**Remember:** Code duplication is the #1 issue with AI coding agents. Always
check first, always reuse, always verify! 🎯
