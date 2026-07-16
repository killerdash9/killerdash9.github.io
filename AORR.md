# AORR State Machine

## 1. Target and Completion Criteria

**Target**
- Build a static professional website with a clean Windows XP-inspired design.
- Support desktop, tablet, and mobile layouts.
- Provide a `Games` menu.
- Include a Tetris game controlled by keyboard and touch.
- Prepare the site for GitHub Pages deployment.

**Completion criteria**
- All core pages and sections render correctly on desktop, tablet, and mobile.
- The `Games` menu opens the Tetris entry point without breaking profile content.
- Tetris is playable with keyboard and touch input.
- No console errors remain in normal use.
- The site is ready for GitHub Pages deployment and deployment is approved when required.

## 2. Act: Codex Minimal Changes

Codex only makes the smallest change needed to fix the verified failure.

- Change one cause at a time.
- Change only the files tied to the current failure class.
- Keep edits local to the smallest responsible section or function.
- Prefer preserving existing structure over refactoring.
- If the failure is unclear, mark it `[사람 확인 필요]` and stop before widening the edit.

## 3. Observe: Claude Verification

Claude Code CLI Sonnet is the verifier by default.

**Claude runs these checks**
- Open the site in a browser context.
- Verify layout at desktop, tablet, and mobile widths.
- Verify `Games` menu behavior.
- Verify Tetris keyboard and touch controls.
- Verify there are no visible console errors during the tested flow.

**Claude collects**
- Pass/fail for each check.
- Exact failing screen, control, or interaction.
- Failure class from the list below.
- File or area most likely responsible.

**If Claude CLI is unavailable**
- Record `CODEX_FALLBACK`.
- Codex performs both minimal fix and verification.
- If confidence is still low, transition to `HITL_REQUIRED`.

## 4. Reason: Failure Classification

Use one primary failure class per retry.

- `HTML`: broken structure, missing sections, invalid markup, wrong element placement.
- `CSS`: layout, spacing, typography, responsiveness, visual polish, theme issues.
- `JAVASCRIPT`: menu logic, state management, event wiring, game flow, routing.
- `GAME`: Tetris rules, movement, collision, scoring, pause, reset, touch controls.
- `CONTENT`: profile copy, labels, [사람 확인 필요] handling, incorrect public info.
- `TEST`: verifier setup, test harness, checklist mismatch, false pass or false fail.
- `ENVIRONMENT`: local runtime, browser launch, missing tools, file access, OS mismatch.
- `GITHUB`: repo access, branch state, Pages config, auth, remote sync.
- `DEPLOYMENT`: build-free publish failure, Pages availability, published output mismatch.
- `UNKNOWN`: failure cannot be isolated yet.

## 5. Repeat: Minimal Fix Then Same Verify Again

Retry loop rules:

- One retry handles one failure class only.
- One retry touches only the files linked to that class.
- Re-run the same Claude verification after each minimal fix.
- If the same failure class repeats twice without progress, escalate to `HITL_REQUIRED`.
- If a fix changes unrelated behavior, revert the extra change and retry with a narrower edit.

## 6. Stop and HITL Conditions

**Stop when**
- Claude verification passes for the current loop and no new failure class appears.
- The site is functionally complete for the current scope.

**HITL required when**
- Claude CLI cannot run and Codex cannot verify with enough confidence.
- The failure class is `GITHUB` or `DEPLOYMENT` and needs credentialed or irreversible action.
- The same failure class repeats twice after minimal retries.
- Content or product direction is unclear and needs human confirmation.

## 7. Development Loop Table

| 루프 | 입력 | Codex Act | Claude Verify | 통과 기준 | 다음 상태 |
|---|---|---|---|---|---|
| 1 | `MEMORY.md`, `STEP1_ANALYSIS.md`, repository structure | Create the site shell, semantic sections, and content slots with only confirmed profile copy | Check that required sections exist and nothing unconfirmed is exposed | Confirmed content renders, placeholders remain for unknowns | `VERIFYING` |
| 2 | Loop 1 output | Apply Clean XP styling and responsive layout rules | Check desktop, tablet, and mobile layout at common widths | Layout is readable and visually consistent on all target sizes | `VERIFYING` |
| 3 | Loop 2 output | Wire the `Games` menu and Tetris entry point | Check that the menu opens the game area without breaking profile sections | `Games` navigation works and state changes are correct | `VERIFYING` |
| 4 | Loop 3 output | Implement Tetris keyboard and touch gameplay | Check movement, collision, scoring, reset, and touch controls | Tetris is playable on keyboard and mobile touch | `VERIFYING` |
| 5 | Loop 4 output | Polish copy, spacing, and accessibility details | Check content clarity, UI balance, and mobile readability | Copy is clean, layout is stable, and no major usability gaps remain | `VERIFYING` |
| 6 | Loop 5 output | Prepare GitHub Pages-ready output and deployment metadata | Check Pages readiness and published output consistency | Deployment is approved and the site is ready to publish | `DEPLOY_APPROVAL_REQUIRED` |

**State flow**
- `READY` -> `ACTING` when a new loop starts.
- `ACTING` -> `VERIFYING` after Codex makes the minimal change.
- `VERIFYING` -> `PASSED` when Claude passes the full verification.
- `VERIFYING` -> `RETRYING` when Claude finds one primary failure class.
- `RETRYING` -> `ACTING` after Codex performs one narrow fix.
- `PASSED` -> `READY` for the next loop.
- `PASSED` -> `DEPLOY_APPROVAL_REQUIRED` when only deployment approval remains.
- `DEPLOY_APPROVAL_REQUIRED` -> `DEPLOYED` after human approval and successful publish.
- Any state -> `BLOCKED` when progress cannot continue after repeated retries or an external blocker persists.
- Any state -> `HITL_REQUIRED` when human review is needed for uncertainty, deployment risk, or tool unavailability.

## 8. Self-Correcting TDD Loop

**Verifier-first rule**
- Claude Code CLI Sonnet is the primary verifier.
- Codex acts as the worker and does not duplicate Claude's test run when Claude is available.
- If Claude CLI cannot be used, switch to `CODEX_FALLBACK` and record why.

**Known verifier status**
- Claude Code CLI: installed, but not authenticated in this shell.
- Authentication: `CODEX_FALLBACK` used here because the CLI is not logged in.
- Active verifier model: `Sonnet 5`.
- If the active model changes later, record the exact model name here and in `MEMORY.md`.

**Execution order**
1. Claude runs the relevant pre-change test set.
2. Claude reports failure items, root-cause hints, related files, and a fingerprint.
3. Codex makes the smallest code change for one cause only.
4. Claude reruns the same test set.
5. Claude reports any new failures and a new fingerprint if the test still fails.
6. Codex makes one more minimal correction and asks Claude to verify again.
7. Claude must pass the full test set before the loop reaches `PASSED`.

**Verification scope**
- File existence and relative paths.
- HTML structure and internal links.
- CSS responsiveness.
- JavaScript errors.
- Tetris game behavior and input handling.
- Local HTTP response.
- `375px`, `768px`, and `1440px` widths.
- GitHub Pages compatibility.

**Failure record**
- Execution agent and model.
- Command.
- Exit code.
- Core error.
- Related file and line.
- Fingerprint.
- Final state.

**Retry rules**
- Up to 3 retries per error.
- Stop after the same fingerprint appears twice.
- One retry fixes one cause and the smallest possible file set.
- Do not delete or weaken tests.

**Fallback rules**
- Use `CODEX_FALLBACK` only when Claude CLI cannot be used.
- Record the fallback reason and whether fallback was used.
- If fallback cannot verify with confidence, stop at `HITL_REQUIRED`.
