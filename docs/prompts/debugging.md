# Debugging Prompts 🔧

**Purpose:** Copy-paste prompts for debugging common issues with AI assistance

**When to use:** When errors occur or something isn't working as expected

---

## 📋 Quick Reference

| Prompt                                                               | Use Case           | Issue Type       |
| -------------------------------------------------------------------- | ------------------ | ---------------- |
| [Debug Build Errors](#prompt-1-debug-build-errors)                   | Site won't build   | Eleventy         |
| [Debug Linting Errors](#prompt-2-debug-linting-errors)               | Lint checks fail   | ESLint/Stylelint |
| [Debug Styling Issues](#prompt-3-debug-styling-issues)               | Styles not working | CSS              |
| [Debug JavaScript Errors](#prompt-4-debug-javascript-errors)         | JS not working     | JavaScript       |
| [Debug Duplication Detection](#prompt-5-debug-duplication-detection) | Duplication found  | jscpd            |
| [Debug Git Issues](#prompt-6-debug-git-issues)                       | Git problems       | Version control  |
| [Debug Deployment](#prompt-7-debug-deployment)                       | Site not deploying | GitHub Pages     |
| [Debug Performance](#prompt-8-debug-performance)                     | Slow loading       | Lighthouse       |

---

## Prompt 1: Debug Build Errors

**Use when:** `npm run build` fails

### 📋 Copy This Prompt:

```
I'm getting a build error in my Eleventy project. Please help me debug it.

ERROR MESSAGE:
[Paste exact error message here]

WHAT I WAS DOING:
[Describe what you were doing when error occurred]

PROJECT INFO:
- Eleventy version: [Check package.json]
- Node version: [Run: node --version]
- File I edited: [Path to file]

FILES THAT MIGHT BE RELEVANT:
[Paste content of relevant files, or tell me which files to check]

Please:
1. Explain what the error means in plain English
2. Identify the root cause
3. Provide step-by-step fix instructions
4. Show me the corrected code
5. Suggest how to prevent this in the future

Example error format:
[11ty] Problem writing Eleventy templates:
[11ty] TemplateContentRenderError: (src/about.md)
  Error: Template render error: variable 'title' is not defined
```

**Common build errors covered:**

- Layout not found
- Variable not defined
- Invalid front matter
- Template syntax errors
- Missing includes

---

## Prompt 2: Debug Linting Errors

**Use when:** ESLint, Stylelint, or Markdownlint fails

### 📋 Copy This Prompt:

```
I'm getting linting errors and need help fixing them.

LINTER:
[ESLint / Stylelint / Markdownlint]

ERROR OUTPUT:
[Paste complete error output]

COMMAND RUN:
[e.g., npm run lint:js]

FILE WITH ERROR:
[Paste relevant section of code, or full file if short]

Please:
1. Explain what each error means
2. Show the problematic code
3. Show the corrected code
4. Explain why the fix works
5. Tell me if this can be auto-fixed (--fix flag)

Example error format:
src/js/main.js
  5:10  error  'x' is not defined  no-undef
  8:3   error  'y' is assigned a value but never used  no-unused-vars

IMPORTANT: If fixing creates duplicate code, tell me how to refactor it DRY!
```

**Specific linter prompts:**

#### For ESLint:

```
ESLint error:
[Paste error]

File:
[Paste JavaScript code]

Show me:
1. What rule is violated
2. Why it's a problem
3. The fix (without creating duplicates!)
4. How to disable rule if needed (with explanation of risks)
```

#### For Stylelint:

```
Stylelint error:
[Paste error]

File:
[Paste CSS code]

Check if:
1. Similar styles already exist in style.css
2. Can be fixed by consolidating classes
3. Can be fixed by reusing existing code

Then show the DRY solution.
```

---

## Prompt 3: Debug Styling Issues

**Use when:** CSS not applying or rendering incorrectly

### 📋 Copy This Prompt:

```
My CSS styles aren't working as expected.

ISSUE:
[Describe what's wrong vs what you expect]

ELEMENT:
[Describe or paste HTML]

CURRENT CSS:
[Paste relevant CSS]

BROWSER:
[Chrome / Firefox / Safari]

STEPS TO REPRODUCE:
1. [Step 1]
2. [Step 2]
3. [Step 3]

WHAT I'VE TRIED:
- [List things you've already attempted]

Please:
1. Identify why styles aren't applying
2. Check for CSS specificity issues
3. Check for typos in class names
4. Check file paths are correct
5. Provide working CSS solution
6. IMPORTANT: Check if similar styles already exist and suggest reusing them

Common issues to check:
- Class name typo
- Selector specificity
- CSS file not linked
- Syntax error (missing semicolon, bracket)
- Conflicting styles
```

**Specific CSS debugging:**

#### Styles not applying:

```
I added this CSS but it's not working:

[Paste CSS]

To this HTML:

[Paste HTML]

The styles don't appear in browser DevTools.

Debug checklist:
- Is CSS file linked in layout?
- Is class name correct?
- Are there syntax errors?
- Is Eleventy copying CSS to _site/?
- Is browser cache cleared?
```

#### Layout issues:

```
My layout is broken:

Expected: [Describe or show image]
Actual: [Describe or show image]

CSS:
[Paste layout CSS]

HTML:
[Paste HTML structure]

Help me fix the layout and check if existing CSS can be reused instead of creating new code.
```

---

## Prompt 4: Debug JavaScript Errors

**Use when:** JavaScript not executing or throwing errors

### 📋 Copy This Prompt:

```
I'm getting JavaScript errors in the browser console.

ERROR MESSAGE:
[Paste exact error from browser console]

MY CODE:
[Paste JavaScript code]

HTML:
[Paste relevant HTML]

EXPECTED BEHAVIOR:
[Describe what should happen]

ACTUAL BEHAVIOR:
[Describe what actually happens]

BROWSER:
[Chrome / Firefox / Safari]

Please:
1. Explain the error in plain English
2. Identify the line causing the issue
3. Show the fix
4. Explain why it fixes the problem
5. CRITICAL: Check if similar functionality already exists in main.js and suggest reusing it

Common issues to check:
- Element doesn't exist when script runs
- Event listener on wrong element
- Variable undefined
- Function called before defined
- Typo in selector
```

**Specific JavaScript debugging:**

#### Element not found:

```
Error: "Cannot read property 'addEventListener' of null"

Code:
[Paste code]

This usually means element doesn't exist when script runs.

Help me:
1. Verify element exists in HTML
2. Check script loading order
3. Add proper checks (if element exists)
4. Check if we already have similar code to reuse
```

#### Function not working:

```
This function isn't doing what I expect:

[Paste function]

Expected: [Describe]
Actual: [Describe]

Debug:
1. Are parameters correct?
2. Is it being called?
3. Does similar function already exist in codebase?
4. Can we reuse existing code?
```

---

## Prompt 5: Debug Duplication Detection

**Use when:** jscpd reports code duplication

### 📋 Copy This Prompt:

```
My duplication check is failing (jscpd).

ERROR OUTPUT:
[Paste jscpd output]

DUPLICATION REPORT:
[Paste or describe what jscpd found]

FILES WITH DUPLICATION:
[List files mentioned]

Please:
1. Show me exactly what code is duplicated
2. Explain why it's considered duplicate
3. Show me how to refactor it DRY
4. Suggest if code should be:
   - Moved to a reusable function
   - Combined into one CSS class
   - Extracted to a variable/constant
   - Made into a layout component

5. Show the refactored solution
6. Verify refactored code passes duplication check

This is CRITICAL - we cannot deploy code with duplication!

Example duplication:
File 1:
.button { color: red; background: blue; }

File 2:
.link { color: red; background: blue; }

Solution: Create .primary-action class, use on both
```

**Specific duplication scenarios:**

#### CSS duplication:

```
jscpd found duplicate CSS:

Location 1: [File:line]
[Paste duplicate CSS]

Location 2: [File:line]
[Paste duplicate CSS]

Show me how to:
1. Create a single reusable class
2. Or use CSS variables for shared values
3. Or extend an existing class

The solution must reduce duplication below 10%.
```

#### JavaScript duplication:

```
jscpd found duplicate JavaScript:

Location 1: [File:line]
[Paste duplicate code]

Location 2: [File:line]
[Paste duplicate code]

Show me how to:
1. Extract to a reusable function
2. Use function parameters for differences
3. Or create a utility module

The solution must reduce duplication below 10%.
```

---

## Prompt 6: Debug Git Issues

**Use when:** Git commands fail or behave unexpectedly

### 📋 Copy This Prompt:

```
I'm having a Git problem.

COMMAND RUN:
[e.g., git push origin main]

ERROR MESSAGE:
[Paste exact error]

CURRENT STATUS:
[Paste output of: git status]

WHAT I'M TRYING TO DO:
[Describe your goal]

REMOTE INFO:
[Paste output of: git remote -v]

Please:
1. Explain what the error means
2. Show me the exact commands to fix it
3. Explain why the fix works
4. Suggest how to avoid this in the future

Common issues:
- Permission denied (wrong remote URL)
- Merge conflicts
- Changes not staged
- Divergent branches
- Authentication failed
```

**Specific Git scenarios:**

#### Push failed:

```
Error when pushing:

[Paste error]

Help me:
1. Check remote URL is correct
2. Check I have push permissions
3. Check branch exists remotely
4. Resolve the issue step-by-step
```

#### Merge conflict:

```
I have merge conflicts:

[Paste conflict markers from file]

Help me:
1. Understand what each section means
2. Decide which changes to keep
3. Resolve the conflict
4. Complete the merge
```

---

## Prompt 7: Debug Deployment

**Use when:** GitHub Actions fails or site doesn't deploy

### 📋 Copy This Prompt:

```
My GitHub Actions pipeline is failing OR my site isn't deploying.

ISSUE:
[Describe the problem]

FAILED JOB:
[e.g., quality-checks, build, lighthouse, deploy]

ERROR FROM GITHUB ACTIONS:
[Paste relevant error logs]

WORKFLOW FILE:
[Paste .github/workflows/ci-cd.yml or relevant section]

BRANCH:
[e.g., main]

GITHUB PAGES SETTINGS:
Source: [GitHub Actions]
Custom domain: [if applicable]

Please:
1. Identify which step is failing
2. Explain the root cause
3. Show me how to fix it
4. Tell me how to test the fix locally
5. Confirm the fix will pass in CI/CD

Common deployment issues:
- Lint checks failing
- Build errors
- Missing permissions
- Wrong branch
- Pages not enabled
```

**Specific deployment scenarios:**

#### Quality checks fail:

```
GitHub Actions failing at quality-checks job:

[Paste error]

This means code doesn't pass:
- ESLint
- Stylelint
- Markdownlint
- Prettier
- Duplication check

Show me:
1. Which specific check failed
2. How to reproduce locally
3. How to fix it
4. How to verify before pushing
```

#### Build fails:

```
Build job failing:

[Paste error]

This means Eleventy can't build the site.

Show me:
1. What file has the error
2. What's wrong with it
3. How to fix it
4. How to test build locally (npm run build)
```

---

## Prompt 8: Debug Performance

**Use when:** Lighthouse scores are low

### 📋 Copy This Prompt:

```
My Lighthouse performance score is low.

CURRENT SCORES:
- Performance: [score]
- Accessibility: [score]
- Best Practices: [score]
- SEO: [score]

LIGHTHOUSE REPORT URL:
[Paste if available]

MAIN ISSUES REPORTED:
[List opportunities from Lighthouse]

PAGE TESTED:
[URL or page name]

Please:
1. Prioritize issues by impact
2. Show me how to fix the top 3 issues
3. Provide specific code changes
4. Estimate score improvement for each fix
5. Verify fixes don't break existing functionality

Common optimizations:
- Compress images
- Minify CSS/JS
- Add width/height to images
- Improve color contrast
- Add meta descriptions
- Remove unused code
```

**Specific performance issues:**

#### Slow performance:

```
Performance score: [low score]

Top opportunities:
1. [Paste opportunity]
2. [Paste opportunity]
3. [Paste opportunity]

Show me:
1. How to optimize images
2. How to minimize CSS/JS
3. How to eliminate render-blocking resources
4. Specific file changes needed
```

#### Accessibility issues:

```
Accessibility score: [low score]

Failed audits:
1. [Paste failed audit]
2. [Paste failed audit]

Show me:
1. What each audit means
2. Which HTML needs fixing
3. The corrected markup
4. How to test with screen reader
```

---

## 🔄 General Debugging Prompt

**Use when:** You're stuck and not sure what's wrong

### 📋 Copy This Prompt:

```
I'm stuck debugging an issue in my Eleventy project.

WHAT I'M TRYING TO DO:
[Describe your goal]

WHAT'S HAPPENING:
[Describe the problem]

WHAT I EXPECT:
[Describe expected behavior]

ERROR MESSAGES (if any):
[Paste errors]

RELEVANT CODE:
[Paste files or snippets]

WHAT I'VE TRIED:
1. [Thing 1]
2. [Thing 2]
3. [Thing 3]

Please help me:
1. Understand what's going wrong
2. Get step-by-step debugging instructions
3. Find and fix the root cause
4. Verify the fix works
5. Learn how to prevent this in the future

Also check: Am I duplicating existing code? Should I be reusing something instead?
```

---

## 🧪 Testing Fixes

After applying any fix:

```bash
# 1. Test locally
npm run lint
npm test
npm start
# Verify in browser

# 2. Commit
git add .
git commit -m "fix: [describe what you fixed]"

# 3. Push and verify CI/CD
git push
# Check GitHub Actions

# 4. Verify deployment
# Visit live site
# Test the specific fix
```

---

## 💡 Debugging Pro Tips

### Tip 1: Read Error Messages Completely

Don't just skim! The error message usually tells you:

- What went wrong
- Where it went wrong (file and line)
- What it expected

### Tip 2: Use Browser DevTools

```bash
# Open DevTools
# Mac: Cmd+Option+I
# Windows/Linux: F12

# Check:
# - Console tab (JavaScript errors)
# - Network tab (failed requests)
# - Elements tab (CSS issues)
```

### Tip 3: Isolate the Problem

```bash
# Comment out code sections
# Test if issue persists
# Narrow down to specific line

# Example:
function broken() {
  // console.log('step 1');  // Uncomment to debug
  // console.log('step 2');  // Uncomment to debug
  // console.log('step 3');  // Uncomment to debug
}
```

### Tip 4: Check Git History

```bash
# When did it break?
git log --oneline

# What changed?
git diff HEAD~1

# Undo if needed
git reset HEAD~1
```

---

## 🚨 When to Ask for Help

Ask for help when:

- ✅ You've read the error message carefully
- ✅ You've tried the suggestions in this guide
- ✅ You've searched for the error online
- ✅ You've spent 30+ minutes debugging
- ✅ You have all relevant info ready to share

**Don't ask for help without:**

- ❌ The exact error message
- ❌ What you were doing when it broke
- ❌ What you've already tried
- ❌ Relevant code or files

---

## 📊 Debugging Checklist

Before asking for help, verify:

- [ ] Read complete error message
- [ ] Identified which tool is erroring
- [ ] Checked file paths are correct
- [ ] Verified dependencies installed
- [ ] Ran relevant lint command
- [ ] Checked browser console
- [ ] Searched error message online
- [ ] Tried suggestions from this guide
- [ ] Have all relevant info ready
- [ ] Can reproduce the issue

---

## 🔗 Quick Links

- [🏠 Back to Course Index](../../README.md)
- [📚 Lesson 10: Troubleshooting](../lessons/10-troubleshooting.md)
- [📖 NPM Scripts Reference](../reference/npm-scripts.md)
- [📖 File Structure Reference](../reference/file-structure.md)

---

**Debug with confidence using these prompts!** 🔧✨
