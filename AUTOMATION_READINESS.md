# Automation Readiness

**Current state:** `Loop 4 PASSED`, next work is `Loop 5: Tetris gameplay`.

| 루프 | 자동화 수준 | Codex 역할 | Claude Verifier | 위험도 | 권한 | Rollback | 준비 상태 | 보완점 |
|---|---|---|---|---|---|---|---|---|
| 1. Site shell and content slots | AUTO | Static HTML, semantic sections, confirmed profile copy only | Check required sections, labels, and no unconfirmed content | 낮음 | repo write only | Very easy: revert `index.html` | Ready | Add a repeatable smoke checklist |
| 2. Responsive styling | AUTO | CSS layout, spacing, mobile/tablet/desktop breakpoints | Verify 375px, 768px, 1440px layouts and no overflow | 낮음-중간 | repo write only | Easy: revert `styles.css` | Ready | Add screenshot-based width checks |
| 3. Games menu entry point | HITL | Minimal JS state for menu open/close and game entry | Verify menu behavior and UI state change | 중간 | repo write + human visual signoff | Easy: revert `script.js` | Partially ready | Add event/state tests and mobile menu checks |
| 4. Tetris gameplay | HITL | Game loop, input, collision, score, touch controls | Verify keyboard, touch, and gameplay rules | 높음 | repo write + user approval for gameplay acceptance | Medium: revert `script.js` and related assets | Not fully ready | Add deterministic game-state tests and touch fixtures |
| 5. Copy, accessibility, polish | AUTO | Small copy edits and spacing cleanup only | Verify text accuracy, contrast, and readability | 낮음 | repo write only | Easy: revert text/CSS edits | Ready | Lock profile copy source of truth |
| 6. GitHub Pages deployment | MANUAL | Prepare deployable files and release commit only | Verify local smoke test before publish | 중간-높음 | GitHub token, repo push, Pages permission | Medium: revert commit or redeploy previous commit | Not ready | Add deploy checklist, post-publish smoke test, and rollback commit path |

## Best Loop To Automate Now

`Loop 2: Responsive styling` is the best automation candidate right now because the pass/fail criteria are clear, width-based, and easy to re-run.

## Human Approval Required

- Changing or exposing personal info beyond the confirmed profile copy.
- Any gameplay acceptance decision for Tetris.
- GitHub push and GitHub Pages publish.
- Any rollback that would delete shared or remote history.

## Claude Verifier Must Check

- File existence and relative paths.
- HTML structure and internal links.
- CSS behavior at `375px`, `768px`, and `1440px`.
- JavaScript errors during navigation and game flow.
- Tetris keyboard and touch input.
- Local HTTP response and no visible console errors.

## Fallback When Claude Is Unavailable

- Use `CODEX_FALLBACK`.
- Codex runs syntax checks, local HTTP smoke tests, and targeted content checks.
- Record the fallback reason and the exact commands used in `AORR_LOG.md`.
- Treat deployment as `MANUAL` until a fresh terminal can confirm Claude access.

## Pre-Production Needs

- Tests: HTML/CSS/JS smoke checks, browser-width checks, local HTTP check, console check.
- Permissions: repo write, GitHub token for push, Pages publish permission.
- Monitoring: GitHub push status, Pages build status, post-publish page load, console errors, and 404s.

## Next Actions

1. Finish the Tetris gameplay loop with deterministic input and collision checks.
2. Add a small repeatable smoke-test script or checklist for width and HTTP verification.
3. Define a one-commit rollback path and post-deploy smoke test for GitHub Pages.
