# Glossary of Terms 📚

A comprehensive reference for all technical terms used in this course.

---

## A

### Accessibility (a11y)

**Definition:** Design practice ensuring websites are usable by people with
disabilities (screen readers, keyboard navigation, color contrast, etc.)

**Introduced in:** [Lesson 9: Lighthouse CI](../lessons/09-lighthouse-ci.md)

**Related terms:** WCAG, ARIA, Alt Text

---

### Artifact

**Definition:** A file or set of files produced during a CI/CD pipeline (e.g.,
built website, test results) that can be used by later jobs

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** CI/CD, GitHub Actions, Pipeline

---

### Auto-fix

**Definition:** Automatic correction of code issues by tools like Prettier or
ESLint (e.g., adding semicolons, fixing indentation)

**Introduced in:**
[Lesson 6: ESLint & Prettier](../lessons/06-eslint-prettier.md)

**Related terms:** ESLint, Prettier, Linting

---

## B

### Best Practices

**Definition:** Industry-standard coding conventions that improve code quality,
security, and maintainability

**Introduced in:** [Lesson 9: Lighthouse CI](../lessons/09-lighthouse-ci.md)

**Related terms:** Code Quality, Standards

---

### Branch

**Definition:** A parallel version of a repository where you can work without
affecting the main codebase

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** Git, GitHub, Version Control

---

### Build

**Definition:** The process of transforming source code (Markdown, CSS, JS) into
production-ready files (HTML, minified assets)

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Eleventy, Static Site Generator, Compilation

---

## C

### CI/CD (Continuous Integration/Continuous Deployment)

**Definition:** Automated practice of testing code on every commit (CI) and
automatically deploying passing code to production (CD)

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** GitHub Actions, Pipeline, Automation

---

### Clone

**Definition:** Creating a local copy of a GitHub repository on your computer

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** Git, Fork, Repository

---

### Commit

**Definition:** Saving a snapshot of your code changes with a descriptive
message

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** Git, Version Control, Pre-commit Hook

---

### CSS (Cascading Style Sheets)

**Definition:** Language for styling HTML (colors, layouts, fonts, spacing)

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Stylelint, HTML, DRY

---

## D

### Dependency

**Definition:** External code libraries your project needs to run (installed via
npm)

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** npm, package.json, Node.js

---

### Deployment

**Definition:** Publishing your website to a live server where others can access
it

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** GitHub Pages, CI/CD, Production

---

### DRY (Don't Repeat Yourself)

**Definition:** Programming principle that code should not be duplicated—use
functions, components, or variables to reuse logic

**Introduced in:**
[Lesson 2: Why Quality Gates?](../lessons/02-why-quality-gates.md)

**Related terms:** Duplication, Refactoring, Code Quality

---

### Duplication

**Definition:** Identical or nearly identical code appearing in multiple places
(violates DRY principle)

**Introduced in:**
[Lesson 2: Why Quality Gates?](../lessons/02-why-quality-gates.md)

**Related terms:** DRY, jscpd, Code Smell

---

## E

### Eleventy (11ty)

**Definition:** A static site generator that transforms Markdown files into HTML
websites

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Static Site Generator, Build, Markdown

---

### ESLint

**Definition:** Tool that analyzes JavaScript code to find bugs, syntax errors,
and bad practices

**Introduced in:**
[Lesson 6: ESLint & Prettier](../lessons/06-eslint-prettier.md)

**Related terms:** Linting, JavaScript, Code Quality

---

## F

### Fork

**Definition:** Creating your own copy of someone else's GitHub repository to
modify independently

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** GitHub, Clone, Repository

---

### Front Matter

**Definition:** YAML metadata at the top of Markdown files (between `---`
delimiters) that provides information like layout, title, tags

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** YAML, Eleventy, Markdown

---

## G

### Git

**Definition:** Version control system that tracks changes to files over time
(who changed what, when, and why)

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** GitHub, Commit, Branch

---

### GitHub

**Definition:** Cloud platform for hosting Git repositories, collaborating with
others, and deploying websites

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** Git, Repository, GitHub Actions

---

### GitHub Actions

**Definition:** GitHub's built-in CI/CD service that runs automated workflows on
code changes

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** CI/CD, Workflow, Pipeline

---

### GitHub Pages

**Definition:** Free hosting service from GitHub for static websites
(HTML/CSS/JS only, no server-side code)

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** Deployment, Hosting, Static Site

---

## H

### Husky

**Definition:** Tool that makes it easy to set up Git hooks (scripts that run on
Git events like commit)

**Introduced in:**
[Lesson 7: Pre-commit Hooks](../lessons/07-pre-commit-hooks.md)

**Related terms:** Pre-commit Hook, Git, lint-staged

---

## J

### JavaScript (JS)

**Definition:** Programming language that adds interactivity to web pages (click
handlers, animations, API calls)

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** ESLint, Node.js, Browser

---

### jscpd

**Definition:** Tool that detects duplicated code across multiple files

**Introduced in:**
[Lesson 2: Why Quality Gates?](../lessons/02-why-quality-gates.md)

**Related terms:** Duplication, DRY, Code Quality

---

## L

### Layout

**Definition:** Template file that wraps content (provides header, footer,
navigation) and defines page structure

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Eleventy, Nunjucks, Template

---

### Lighthouse

**Definition:** Google's automated tool for testing web quality (performance,
accessibility, SEO, best practices)

**Introduced in:** [Lesson 9: Lighthouse CI](../lessons/09-lighthouse-ci.md)

**Related terms:** Performance, Accessibility, CI/CD

---

### lint-staged

**Definition:** Tool that runs linters only on Git-staged files (faster than
linting entire project)

**Introduced in:**
[Lesson 7: Pre-commit Hooks](../lessons/07-pre-commit-hooks.md)

**Related terms:** Husky, Pre-commit Hook, Linting

---

### Linting

**Definition:** Automated analysis of code to find errors, enforce style, and
identify potential bugs

**Introduced in:**
[Lesson 6: ESLint & Prettier](../lessons/06-eslint-prettier.md)

**Related terms:** ESLint, Stylelint, Code Quality

---

## M

### Markdown

**Definition:** Simple text format for writing content (headings with `#`, lists
with `-`, bold with `**`, etc.)

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Eleventy, HTML, Content

---

### Markdownlint

**Definition:** Tool that checks Markdown files for formatting consistency and
common mistakes

**Introduced in:**
[Lesson 6: ESLint & Prettier](../lessons/06-eslint-prettier.md)

**Related terms:** Linting, Markdown, Code Quality

---

## N

### Node.js

**Definition:** JavaScript runtime that lets you run JavaScript outside the
browser (needed for Eleventy, npm, etc.)

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** npm, JavaScript, Runtime

---

### npm (Node Package Manager)

**Definition:** Tool for installing JavaScript libraries and running scripts
defined in `package.json`

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** Node.js, Dependencies, Scripts

---

### Nunjucks

**Definition:** Template language used by Eleventy to create dynamic HTML
(variables with `{{ }}`, loops with `{% %}`)

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Eleventy, Template, Layout

---

## P

### package.json

**Definition:** Configuration file listing your project's dependencies, scripts,
and metadata

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** npm, Node.js, Scripts

---

### Performance

**Definition:** How fast your website loads and responds to user interactions
(measured by Lighthouse)

**Introduced in:** [Lesson 9: Lighthouse CI](../lessons/09-lighthouse-ci.md)

**Related terms:** Lighthouse, Optimization, Speed

---

### Pipeline

**Definition:** Series of automated steps (jobs) that run on code changes (test
→ build → deploy)

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** CI/CD, GitHub Actions, Workflow

---

### Pre-commit Hook

**Definition:** Script that runs automatically before a Git commit to check code
quality and block bad commits

**Introduced in:**
[Lesson 7: Pre-commit Hooks](../lessons/07-pre-commit-hooks.md)

**Related terms:** Husky, Git, lint-staged

---

### Prettier

**Definition:** Tool that automatically formats code consistently (indentation,
line length, quotes, etc.)

**Introduced in:**
[Lesson 6: ESLint & Prettier](../lessons/06-eslint-prettier.md)

**Related terms:** Formatting, Code Quality, Auto-fix

---

### Pull Request (PR)

**Definition:** Request to merge your code changes into the main branch (allows
code review and discussion)

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** GitHub, Code Review, Branch

---

## Q

### Quality Gate

**Definition:** Automated check that code must pass before being accepted
(linting, testing, duplication detection)

**Introduced in:**
[Lesson 2: Why Quality Gates?](../lessons/02-why-quality-gates.md)

**Related terms:** CI/CD, Testing, Automation

---

## R

### Repository (Repo)

**Definition:** Folder containing your project's code, history, and
configuration (stored on GitHub)

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** Git, GitHub, Clone

---

## S

### SEO (Search Engine Optimization)

**Definition:** Practices that improve your site's ranking in search results
(meta tags, structured data, performance)

**Introduced in:** [Lesson 9: Lighthouse CI](../lessons/09-lighthouse-ci.md)

**Related terms:** Lighthouse, Metadata, Google

---

### Static Site Generator (SSG)

**Definition:** Tool that builds HTML files from templates and content at build
time (no server needed at runtime)

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Eleventy, Build, JAMstack

---

### Stylelint

**Definition:** Tool that checks CSS for errors, enforces conventions, and
prevents bad practices

**Introduced in:**
[Lesson 6: ESLint & Prettier](../lessons/06-eslint-prettier.md)

**Related terms:** CSS, Linting, Code Quality

---

## T

### Template

**Definition:** Reusable file containing HTML structure with placeholders for
dynamic content

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Layout, Nunjucks, Eleventy

---

## V

### Version Control

**Definition:** System for tracking changes to files over time (who changed
what, when, why)

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** Git, Commit, History

---

### VS Code (Visual Studio Code)

**Definition:** Popular code editor with extensions for linting, formatting, and
Git integration

**Introduced in:**
[Lesson 4: Setup Your Environment](../lessons/04-setup-your-environment.md)

**Related terms:** IDE, Text Editor, Extensions

---

## W

### Workflow

**Definition:** Automated sequence of jobs defined in GitHub Actions YAML file

**Introduced in:** [Lesson 8: GitHub Actions](../lessons/08-github-actions.md)

**Related terms:** GitHub Actions, Pipeline, CI/CD

---

## Y

### YAML

**Definition:** Human-readable data format used in configuration files
(indentation-sensitive, key-value pairs)

**Introduced in:**
[Lesson 5: Build with Eleventy](../lessons/05-build-with-eleventy.md)

**Related terms:** Front Matter, Configuration, GitHub Actions

---

## 🔗 Quick Links

- [🏠 Back to Course Index](../../README.md)
- [📖 All Lessons](../lessons/)
- [🤖 AI Prompts](../prompts/)
- [📚 Reference Documentation](../reference/)

---

## 📊 Usage Tips

### How to Use This Glossary:

1. **Quick Reference** - Look up terms you don't understand
2. **Review Tool** - Read through before exams/projects
3. **Cross-Reference** - Follow "Related terms" to build connections
4. **Lesson Navigation** - Click "Introduced in" links to see full context

### Contributing:

If you find a term not defined here, please:

1. Open an issue on GitHub
2. Submit a pull request with the definition
3. Ask your instructor

---

**Last Updated:** October 27, 2025 **Terms Defined:** 50+ **Lessons Covered:**
1-10
