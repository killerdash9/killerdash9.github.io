# Project Settings

- GitHub Pages 주소: `https://killerdash9.github.io`
- GitHub 저장소: `https://github.com/killerdash9/killerdash9.github.io.git`
- GitHub 토큰 파일명: `github_token.txt`
- 프로필 참고 자료: `cv.jpeg`
- 웹사이트 디자인 참고: `Windows XP (Clean XP style)`
- 게임 추가 기능: `Tetris`

## Goal

- 정적 HTML, CSS, JavaScript만으로 Clean XP 스타일의 반응형 개인 프로페셔널 웹사이트를 완성한다.

## Scope / Out of Scope

- Scope: 프로필 소개, `Games` 메뉴, Tetris, 데스크톱·태블릿·모바일 반응형, GitHub Pages 배포 준비.
- Out of Scope: 백엔드, 외부 서비스, 프레임워크, 불필요한 재작성, 확인되지 않은 개인 정보 생성.

## Execution

- Mode: `CODEX_FALLBACK`
- Claude model: `Sonnet 5`
- Current commit: `91d31ab`
- Last normal commit·URL: `2a54d5a` / `https://killerdash9.github.io`
- Git status: `main...origin/main [ahead 1]`, untracked `cv.jpeg`, `github_token.txt`
- Rollback criteria: revert only the last next-piece preview / hold-save change in `index.html`, `game.js`, `script.js`, and `styles.css` if it breaks rendering or controls.
- Last test: `PASS (node tests/*.test.js, node --check, local HTTP 200, browser 375px/768px/1440px, game UI controls)`

## Current State

- 상태: `DEPLOY_APPROVAL_REQUIRED`
- 완료 루프: `7`
- 다음 루프: `8`
- Retry: `0`
- fingerprint: `next-hold-browser-200`
- blocker: `none`
- 마지막 정상 commit·URL: `2a54d5a / https://killerdash9.github.io`

## Acceptance

- 프로필 정보가 정확하고 간결하게 보인다.
- `Games` 메뉴가 동작한다.
- Tetris가 키보드와 터치로 조작된다.
- 데스크톱, 태블릿, 모바일에서 레이아웃이 유지된다.
- GitHub Pages에 올릴 수 있는 정적 산출물이다.

## Guardrails

- 확인되지 않은 개인 정보 생성 금지.
- 기존 콘텐츠 임의 삭제 금지.
- 테스트 삭제·완화 금지.
- 대규모 재작성 금지.
- 백엔드·외부 서비스·프레임워크 임의 추가 금지.
- 토큰 출력·로그·코드·문서·Git 저장 금지.

## Retry / HITL

- Retry는 원인 하나와 최소 파일만 수정한다.
- 동일 fingerprint가 반복되면 중지한다.
- Claude 사용 불가 시 `CODEX_FALLBACK`으로 전환한다.
- 배포나 인증처럼 되돌리기 어려운 작업은 `HITL_REQUIRED`로 올린다.

## Recent Loops

| Loop | 상태 | 실행 모드·모델 | 변경 파일 | 테스트 결과 | Retry | 다음 작업 |
|---|---|---|---|---|---|---|
| 7 | `PASSED` | `CODEX_FALLBACK` / `Sonnet 5` | `index.html`, `game.js`, `script.js`, `styles.css`, `tests/tetris-preview.test.js`, `tests/tetris-hold.test.js`, `MEMORY.md`, `AORR_LOG.md` | `PASS` | `0` | `DEPLOY_APPROVAL_REQUIRED` |
| 6 | `PASSED` | `CODEX_FALLBACK` / `Sonnet 5` | `game.js`, `script.js`, `MEMORY.md` | `PASS` | `0` | `DEPLOY_APPROVAL_REQUIRED` |
| 5 | `PASSED` | `CODEX_FALLBACK` / `Sonnet 5` | `index.html`, `styles.css`, `script.js`, `game.js`, `tests/*.js` | `PASS` | `0` | `DEPLOY_APPROVAL_REQUIRED` |
