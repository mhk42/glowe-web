# Lesson 7: Pre-commit Hooks 🪝

⏱️ **Time:** Reading: 6 min | Practice: 5 min | Total: ~11 min 📚 **Level:**
Beginner 🎯 **Goal:** Automatically check code quality before every Git commit

---

## 🚀 TL;DR

**Pre-commit hooks** run quality checks automatically when you commit. If checks
fail, the commit is blocked. This prevents bad code from entering your
repository!

---

## 🤔 What Are Pre-commit Hooks?

### The Problem Without Hooks:

```bash
# You forget to run tests
git add .
git commit -m "add feature"
git push

# ❌ Bad code is now in GitHub!
# ❌ CI/CD fails
# ❌ Team wastes time fixing it
```

---

### The Solution With Hooks:

```bash
# You commit
git add .
git commit -m "add feature"

# 🪝 Hook runs automatically:
# ✓ ESLint checks JavaScript
# ✓ Stylelint checks CSS
# ✓ Markdownlint checks docs
# ✓ Prettier checks formatting
# ✓ jscpd checks duplication

# If any fail → Commit blocked! ❌
# If all pass → Commit allowed! ✅
```

**Result:** Only clean code gets committed!

---

## 🛠️ Tools We Use

### 1. Husky (Git Hook Manager)

**What it does:** Creates Git hooks that run scripts

**Install location:** `.husky/` directory

**Our hooks:**

- `pre-commit` - Runs before commit
- `pre-push` - Runs before push (optional)

---

### 2. lint-staged (Smart Checker)

**What it does:** Only checks files you changed (not entire project)

**Why?** Faster! Only lint the files you modified.

**Configuration:** In `package.json`

```json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix", "prettier --write"],
    "*.md": ["markdownlint --fix", "prettier --write"]
  }
}
```

---

## 📁 Configuration Files

### .husky/pre-commit

**Location:** `.husky/pre-commit`

**What it does:** Runs before every commit

**Contents:**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run lint-staged
npx lint-staged

# Check for duplication
npm run lint:duplication
```

**How it works:**

1. You run `git commit`
2. Git triggers `.husky/pre-commit`
3. Script runs `lint-staged` (checks changed files)
4. Script runs duplication check
5. If any fail → commit blocked ❌
6. If all pass → commit continues ✅

---

### package.json (lint-staged config)

**Location:** `package.json`

**Configuration:**

```json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write", "git add"],
    "*.css": ["stylelint --fix", "prettier --write", "git add"],
    "*.md": ["markdownlint --fix", "prettier --write", "git add"]
  }
}
```

**What happens for each file type:**

1. **JavaScript (`.js`):**
   - Run ESLint with auto-fix
   - Format with Prettier
   - Stage fixed files

2. **CSS (`.css`):**
   - Run Stylelint with auto-fix
   - Format with Prettier
   - Stage fixed files

3. **Markdown (`.md`):**
   - Run Markdownlint with auto-fix
   - Format with Prettier
   - Stage fixed files

---

## 🏃 How Pre-commit Works

### Successful Commit (All Checks Pass)

```bash
git add src/js/main.js
git commit -m "add feature"

# Hook runs:
✓ Checking JavaScript files...
✓ ESLint passed
✓ Prettier passed
✓ Checking for duplication...
✓ Duplication check passed (0.0%)

[main abc1234] add feature
 1 file changed, 5 insertions(+)
```

**✅ Commit succeeded!**

---

### Failed Commit (Checks Fail)

```bash
git add src/js/main.js
git commit -m "add feature"

# Hook runs:
✓ Checking JavaScript files...
✗ ESLint found errors:

src/js/main.js
  5:10  error  'x' is not defined  no-undef

✗ Pre-commit checks failed!
✗ Commit blocked
```

**❌ Commit blocked! Fix errors and try again.**

---

## 🔧 Testing Pre-commit Hooks

### Test 1: Commit Clean Code

```bash
# Create clean file
echo 'console.log("Hello");' > src/js/test.js

# Stage and commit
git add src/js/test.js
git commit -m "test: add clean code"

# Expected: ✅ Commit succeeds
```

---

### Test 2: Commit Bad Code

```bash
# Create file with error
echo 'const x = 1' > src/js/bad.js  # Missing semicolon

# Stage and commit
git add src/js/bad.js
git commit -m "test: add bad code"

# Expected: ❌ Commit blocked
# Hook auto-fixes it, re-stage:
git add src/js/bad.js
git commit -m "test: add bad code"

# Expected: ✅ Commit succeeds (fixed)
```

---

### Test 3: Commit Duplicate Code

```bash
# Create file with duplicate CSS
cat > src/css/duplicate.css << 'EOF'
.button { color: red; }
.button { color: blue; }  /* Duplicate selector! */
EOF

# Stage and commit
git add src/css/duplicate.css
git commit -m "test: add duplicate"

# Expected: ❌ Commit blocked (duplication detected)
```

---

## 🚨 Common Issues & Fixes

### Issue: "Husky not installed"

**Symptoms:**

```bash
git commit -m "test"
# Nothing happens, no checks run
```

**Fix:**

```bash
# Reinstall Husky
npm install
npx husky install

# Verify
ls -la .husky/
# Should see: pre-commit, _/
```

---

### Issue: "Hook not executable"

**Symptoms:**

```bash
git commit -m "test"
# Error: Permission denied
```

**Fix:**

```bash
# Make hook executable
chmod +x .husky/pre-commit

# Verify
ls -la .husky/pre-commit
# Should show: -rwxr-xr-x (x = executable)
```

---

### Issue: "lint-staged not found"

**Symptoms:**

```bash
git commit -m "test"
# Error: npx: command not found: lint-staged
```

**Fix:**

```bash
# Install dependencies
npm install --save-dev lint-staged

# Verify
npm list lint-staged
# Should show: lint-staged@x.x.x
```

---

### Issue: "Auto-fix creates unstaged changes"

**Symptoms:**

```bash
git commit -m "test"
# ✓ Files fixed
# ❌ But commit still fails: "changes not staged"
```

**Fix:**

```bash
# Stage auto-fixed files
git add .

# Commit again
git commit -m "test"

# ✅ Succeeds!
```

**Why:** Auto-fix modifies files, you must re-stage them

---

### Issue: "Want to skip hooks (emergency)"

**Symptoms:** Need to commit urgently, checks are failing

**Fix (Use Sparingly!):**

```bash
# Skip all hooks
git commit --no-verify -m "emergency fix"

# ⚠️ WARNING: Only use in emergencies!
# ⚠️ Bad code will enter repository!
# ⚠️ CI/CD will catch it and fail!
```

---

## 💡 Pro Tips

### Tip 1: Let Auto-fix Do the Work

Don't manually fix formatting! Let the hooks do it:

```bash
# Write code (don't worry about formatting)
# Commit
git commit -m "add feature"

# Hooks auto-fix → Re-stage → Commit again
git add .
git commit -m "add feature"

# ✅ Done!
```

---

### Tip 2: Commit Often (Small Chunks)

**Good (Small commits):**

```bash
git commit -m "add button styling"
git commit -m "add button click handler"
git commit -m "add button tests"
```

**Advantages:**

- Faster hook execution (fewer files)
- Easier to fix if blocked
- Better commit history

**Bad (Giant commits):**

```bash
# Changed 50 files
git commit -m "add entire feature"
# Takes forever to check
# Hard to fix if blocked
```

---

### Tip 3: Check Before Committing

Run checks manually first:

```bash
# Check what you changed
npm run lint
npm test

# If passing, commit
git add .
git commit -m "add feature"

# ✅ Hooks will pass quickly
```

---

### Tip 4: Understand What Gets Checked

**Only staged files** are checked:

```bash
# Modified 3 files
git add file1.js          # ✓ Will be checked
# file2.js not staged     # ✗ Won't be checked
# file3.css not staged    # ✗ Won't be checked

git commit -m "update"
# Only file1.js is linted!
```

---

## 🎮 Quick Practice Activity (2 minutes)

### Challenge: Trigger Hook Failures

**1. Test missing semicolon:**

```bash
echo 'const x = 1' > src/js/hook-test.js
git add src/js/hook-test.js
git commit -m "test: bad syntax"
# ❌ Should block or auto-fix
```

**2. Test duplicate CSS:**

```bash
cat > src/css/hook-test.css << 'EOF'
.test { color: red; }
.test { color: blue; }
EOF
git add src/css/hook-test.css
git commit -m "test: duplicate"
# ❌ Should block
```

**3. Clean up:**

```bash
git reset HEAD~1  # Undo last commit
rm src/js/hook-test.js src/css/hook-test.css
```

---

## 🔍 Verifying Hook Setup

### Check Husky Installation:

```bash
# List hooks
ls -la .husky/

# Expected output:
# drwxr-xr-x  _/
# -rwxr-xr-x  pre-commit
```

---

### Check lint-staged Config:

```bash
# View configuration
cat package.json | grep -A 10 "lint-staged"

# Expected output:
# "lint-staged": {
#   "*.js": ["eslint --fix", "prettier --write"],
#   "*.css": ["stylelint --fix", "prettier --write"],
#   "*.md": ["markdownlint --fix", "prettier --write"]
# }
```

---

### Test Hook Manually:

```bash
# Run pre-commit hook directly
.husky/pre-commit

# Expected output:
# ✓ Running lint-staged...
# ✓ Checking for duplication...
# ✓ All checks passed
```

---

## 📊 Pre-commit Hooks Checklist

Before moving to the next lesson, verify:

- [ ] Understand what pre-commit hooks do
- [ ] Know hooks run automatically on commit
- [ ] Understand lint-staged only checks changed files
- [ ] Can test hooks by committing code
- [ ] Know how to fix blocked commits
- [ ] Understand auto-fix re-stages files
- [ ] Know `--no-verify` skips hooks (emergency only)
- [ ] Installed and configured Husky
- [ ] Installed and configured lint-staged
- [ ] Hooks successfully block bad commits

**All checked?** Ready for Lesson 8! 🎉

---

## 🆘 Need Help?

### 🤖 AI Assistance (Copy-Paste Prompts)

Stuck? Use these ready-made prompts with AI assistants:

- **[Configuration Prompts](../prompts/configuration.md)** - Setup
  Husky/lint-staged
- **[Debugging Prompts](../prompts/debugging.md)** - Fix Git/hook errors
- **[Building Pages Prompts](../prompts/building-pages.md)** - Write DRY code
  that passes hooks

### 📖 Documentation

- [Husky Docs](https://typicode.github.io/husky/)
- [lint-staged Docs](https://github.com/okonet/lint-staged)
- [Git Hooks Guide](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

---

## 📚 Key Takeaways

### ✅ DO:

- Let hooks run on every commit
- Re-stage auto-fixed files
- Commit small chunks frequently
- Run `npm run lint` before committing
- Fix errors when hooks block commits
- Trust the automation

### ❌ DON'T:

- Use `--no-verify` regularly
- Commit giant changesets
- Manually fix formatting (let hooks do it)
- Disable hooks permanently
- Ignore hook failures

---

## 🎯 What You've Learned

**Pre-commit hooks are your safety net!**

- Block bad code automatically ✅
- Auto-fix simple issues 🔧
- Only check changed files ⚡
- Save time in code review 🕐
- Prevent CI/CD failures 🚀

---

## 📊 Progress Tracker

You've completed:

- [x] ~~Lesson 1: What Is This Project?~~
- [x] ~~Lesson 2: Why Quality Gates?~~
- [x] ~~Lesson 3: Prompt Engineering Basics~~
- [x] ~~Lesson 4: Setup Your Environment~~
- [x] ~~Lesson 5: Build with Eleventy~~
- [x] ~~Lesson 6: ESLint & Prettier~~
- [x] ~~Lesson 7: Pre-commit Hooks~~
- [ ] Lesson 8: GitHub Actions
- [ ] Lessons 9-10...

---

## 🚀 Next Steps

Now let's set up automated checks in the cloud with GitHub Actions!

### [👉 Continue to Lesson 8: GitHub Actions](08-github-actions.md)

---

## 🔗 Quick Links

- [🏠 Back to Course Index](../../README.md)
- [📝 Configuration Prompts](../prompts/configuration.md)
- [📚 NPM Scripts Reference](../reference/npm-scripts.md)

---

**Your commits are now automatically protected!** 🪝✨
