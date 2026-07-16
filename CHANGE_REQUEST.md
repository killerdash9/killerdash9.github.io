# Change Request

Source materials checked: `MEMORY.md`, deployed site `https://killerdash9.github.io`, current code, git state, `AORR.md`, and the last normal deploy commit/URL (`d9c0fac` / `https://killerdash9.github.io`).

| ID | 원문 | 분류 | 현재/기대 동작 | 대상 파일 | 의존성 | 완료 기준 | Claude 검증 | 회귀 테스트 | 위험도 | HITL |
|---|---|---|---|---|---|---|---|---|---|---|
| CR-1 | `Show me the next coming block in tetris` | GAME | 현재: 게임판에는 활성 블록과 ghost preview만 보이고 다음에 올 블록은 화면에 표시되지 않는다. 기대: 다음에 올 Tetris 블록을 별도 미리보기 영역으로 보여준다. | `index.html`, `script.js`, `styles.css`, `game.js` | 현재 `nextPiece` 상태, 게임 패널 레이아웃, 캔버스/패널 렌더 경로 | 다음 블록 미리보기가 현재/회전 상태와 구분되어 보이고, 게임 진행에 따라 갱신되며, 기존 조작과 점수/게임오버 흐름을 바꾸지 않는다. | 변경 전: deployed site와 로컬에서 next preview가 없는 현재 상태 확인. 변경 후: 375px, 768px, 1440px에서 next preview가 보이고, 새 게임/다음 조각 전환 시 갱신되는지, console error가 없는지 확인. | 기존 Tetris 상태/엔진 테스트, 로컬 HTTP 200, 브라우저 폭 확인, 키보드·터치 조작 회귀 확인. | 중간 | 아니오 |
| CR-2 | `a save block by pressing shift` | GAME | 현재: Shift 키에는 저장/보관 기능이 없다. 기대: Shift를 누르면 현재 블록을 hold/save 하고, 저장된 블록이 있으면 교체되며, 중복 저장 방지와 상태 갱신이 유지된다. | `game.js`, `script.js`, `index.html`, `styles.css` | CR-1의 다음 블록 상태, hold 슬롯 UI, 키보드 입력 처리, 중복 저장 방지 로직 | Shift 입력으로 hold 슬롯이 동작하고, 현재/저장 블록이 올바르게 교체되며, 같은 턴의 반복 저장이 막히고, 기존 점수/충돌/게임오버 동작이 유지된다. | 변경 전: deployed site와 로컬에서 hold/save 기능이 없는 현재 상태 확인. 변경 후: Shift 입력 시 hold/swap 동작이 보이고, hold 슬롯이 갱신되며, 반복 저장이 차단되고, console error가 없는지 확인. | CR-1의 next preview 검증, 기존 Tetris 상태/엔진 테스트, 로컬 HTTP 200, 브라우저 폭 확인, 키보드·터치 조작 회귀 확인. | 높음 | 아니오 |

모호성 / 중복 / 충돌:
- `next coming block`의 표시는 별도 패널, 작은 캔버스, 카드형 UI 중 어떤 형식인지 `[사람 확인 필요]`.
- `a save block by pressing shift`는 일반적인 hold/swap 의미로 해석했지만, 저장 후 교체 규칙과 한 턴 1회 제한은 `[사람 확인 필요]`.
- 두 요청은 모두 `GAME`에 속하지만, `CR-1`의 next preview가 `CR-2`의 hold UI 레이아웃 선택에 영향을 줄 수 있어 의존 순서를 유지한다.
