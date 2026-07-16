# Clean XP Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive personal portfolio site with a clean Windows XP-inspired visual language, profile sections, and a `Games` area centered on Tetris.

**Architecture:** Use a small static site with a single shared HTML shell, one stylesheet for the XP visual system, and one JavaScript file for navigation and game state. Keep profile content in semantic sections so the site reads clearly on desktop and mobile, while the `Games` area remains isolated from the profile layout.

**Tech Stack:** Plain HTML, CSS, and JavaScript only; no framework, no build step.

## Global Constraints

- 정적 HTML, CSS, JavaScript만 사용한다.
- `cv.jpeg`에서 확인된 정보와 사용자가 확정한 프로필 카피만 노출한다.
- 확인되지 않은 내용은 `[사람 확인 필요]`로 유지한다.
- 공개 연락처는 `jyeon.noh@samsung.com`만 사용한다.
- 디자인 방향은 `Windows XP (Clean XP style)`이다.
- 게임 영역은 `Games` 메뉴를 통해 접근한다.

---

### Task 1: Site skeleton and content slots

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `app.js`

**Interfaces:**
- Consumes: profile copy from `STEP1_ANALYSIS.md`
- Produces: semantic page sections, top navigation, and content placeholders for profile and games

- [ ] **Step 1: Write the failing test**

Create a simple manual check list in the plan itself: the page must contain `Start`, `Profile`, `Experience`, `Skills`, and `Games` navigation labels, plus visible profile text for the confirmed intro lines.

- [ ] **Step 2: Run test to verify it fails**

Open the empty page and confirm the labels are missing.

- [ ] **Step 3: Write minimal implementation**

Add the static HTML structure with the required sections and placeholder text for unknown profile items.

- [ ] **Step 4: Run test to verify it passes**

Reload the page and confirm the navigation labels and profile slots are visible.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css app.js
git commit -m "feat: add portfolio shell"
```

### Task 2: Clean XP visual system

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: semantic structure from Task 1
- Produces: XP-inspired window chrome, taskbar, beveled controls, and responsive spacing

- [ ] **Step 1: Write the failing test**

Visually check that the page still looks flat and unstyled before the XP rules are added.

- [ ] **Step 2: Run test to verify it fails**

Confirm the page has no XP chrome, no beveled buttons, and no taskbar styling yet.

- [ ] **Step 3: Write minimal implementation**

Add the Clean XP palette, gradients, borders, and classic UI spacing without overdecorating the layout.

- [ ] **Step 4: Run test to verify it passes**

Check desktop and mobile sizes to ensure the layout remains readable and balanced.

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "feat: add clean xp styling"
```

### Task 3: Games shell and Tetris entry point

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `Games` nav from Task 1 and XP chrome from Task 2
- Produces: game panel switcher, Tetris placeholder, and menu state handling

- [ ] **Step 1: Write the failing test**

Clicking `Games` should not yet switch any visible game panel.

- [ ] **Step 2: Run test to verify it fails**

Confirm the game area is static before the menu logic is added.

- [ ] **Step 3: Write minimal implementation**

Wire the `Games` menu to reveal a Tetris entry panel and a clean placeholder state.

- [ ] **Step 4: Run test to verify it passes**

Confirm the `Games` area opens and the panel title changes correctly.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css app.js
git commit -m "feat: add games shell"
```

### Task 4: Content polish and responsive pass

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: layout and theme from earlier tasks
- Produces: final copy refinement, spacing cleanup, and mobile-friendly layout fixes

- [ ] **Step 1: Write the failing test**

At narrow viewport widths, profile cards should wrap cleanly without horizontal scrolling.

- [ ] **Step 2: Run test to verify it fails**

Shrink the browser and confirm any overflow or cramped sections.

- [ ] **Step 3: Write minimal implementation**

Tune spacing, font sizes, and card widths for mobile and tablet screens.

- [ ] **Step 4: Run test to verify it passes**

Verify the site reads well on desktop and small screens.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "feat: polish responsive layout"
```

## Self-Review

- Coverage: the plan covers page shell, XP styling, `Games` entry point, and responsive polish.
- Placeholder scan: no `TBD` or `TODO` markers remain.
- Type consistency: all tasks refer to the same `index.html`, `styles.css`, and `app.js` files.
