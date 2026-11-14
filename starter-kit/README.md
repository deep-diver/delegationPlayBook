# AI Agent Delegation Starter Kit

이 폴더는 『평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북』의 핵심 템플릿과 물리적 안전장치 설정을 즉시 복제해 사용할 수 있도록 구성한 실전 스타터 킷이다.

---

## 1. 파일 구성 안내

| 파일 경로 | 계층 및 역할 | 대상 사용자 |
| :--- | :--- | :--- |
| `USER.md` | **Personal OS Layer 1:** 위임자의 직무, 분기 우선순위(P0~P2), 이해관계자, 캘린더 방어 규칙 | 전 직군 공통 |
| `SOUL.md` | **Personal OS Layer 2:** 에이전트 작동 헌법, 단문 보고 포맷, 절대 금지 경계선(Red Lines) | 전 직군 공통 |
| `PLAYBOOK.md` | **Personal OS Layer 3:** 반복 업무별 표준운영절차(SOP) 및 30초 인간 검수 체크리스트 | 전 직군 공통 |
| `DELEGATION_BRIEF_TEMPLATE.md` | 신규 업무 위임 시 복붙해 채우는 5요소 명세 카드 및 최소 명세 프롬프트 | 전 직군 공통 |
| `task_audit_sheet.md` | 내 주간 업무 10개를 채점해 위임 1순위 과제를 가려내는 판별 시트 | 전 직군 공통 |
| `WEEKLY_AGENT_AUDIT.md` | 매주 금요일 15분 시스템 점검, 규칙 패치, 권한 승격·강등 기록 시트 | 전 직군 공통 |
| `AGENTS.md` | 저장소 디렉토리 권한 경계(`raw/` 읽기 전용 vs `drafts/` 쓰기 허용) 및 검증 표준 명세 | CLI · IDE 사용자 |
| `CLAUDE.md` | Claude Code 실행 시 `AGENTS.md`·`USER.md`·`SOUL.md`·`PLAYBOOK.md`를 자동 연결하는 진입점 | Claude Code 사용자 |
| `.claude/settings.json` | 읽기 전용 `Plan Mode` 기본값, `deny → ask → allow` 권한 격리, 실행 전 훅 등록 파일 | Claude Code 사용자 |
| `.claude/hooks/block_irreversible.py` | 파괴적 삭제(`rm -rf`, `DROP`) 및 무단 외부 전송(`curl POST`, 강제 푸시)을 물리 차단하는 훅 스크립트 | Claude Code 사용자 |
| `.mcp.json.example` | 읽기 전용 입력 폴더와 초안 쓰기 폴더, 읽기 전용 DB 계정을 분리한 MCP 설정 예시 | MCP 연동 사용자 |

---

## 2. 3분 초기 세팅 순서

### 트랙 A. 비개발 실무자 (Claude Desktop/Cowork, ChatGPT, Notion AI 사용 시)

1. 내 컴퓨터 문서 폴더 아래에 에이전트 전용 격리 폴더(예: `~/agent-workspace/`)를 만들고 이 `starter-kit`의 파일들을 복사한다.
2. `task_audit_sheet.md`를 열어 최근 1주일간 반복된 업무 중 총점 16점 이상인 **위임 1순위 업무 딱 1개**를 고른다.
3. `USER.md`와 `SOUL.md`를 텍스트 편집기로 열어 대괄호(`[ ]`)로 표시된 항목을 내 실제 직무·목표·일정 기준으로 수정한다.
4. 사용하는 상용 도구의 프로젝트 지침(Claude Projects 지침창, ChatGPT Custom Instructions, Notion AI 지침 페이지)에 `USER.md`와 `SOUL.md` 내용을 붙여넣고, 개별 업무 요청 시 `PLAYBOOK.md`의 해당 SOP와 `DELEGATION_BRIEF_TEMPLATE.md`를 함께 전달한다.

### 트랙 B. 로컬 CLI · 게이트웨이 사용자 (Claude Code, Codex CLI, Cursor, OpenClaw 사용 시)

터미널에서 아래 명령어를 순서대로 실행해 격리된 워크스페이스를 초기화한다.

```bash
# 1. 전용 에이전트 워크스페이스 생성 및 스타터 킷 복사
mkdir -p ~/agent-workspace/{inbox,raw,drafts,processed,scripts,logs}
cp -R ./starter-kit/. ~/agent-workspace/

# 2. 비가역 명령 차단 훅(PreToolUse) 실행 권한 부여 및 구문 확인
chmod +x ~/agent-workspace/.claude/hooks/block_irreversible.py
python3 -m py_compile ~/agent-workspace/.claude/hooks/block_irreversible.py

# 3. (선택) MCP 서버 사용 시 예시 파일을 복사해 실제 절대 경로 기입
cp ~/agent-workspace/.mcp.json.example ~/agent-workspace/.mcp.json
```

세팅 직후 반드시 지켜야 할 3대 안전 수칙은 다음과 같다.

1. **원본 격리:** 원본 CSV, 계약서, 참고 문서는 반드시 `raw/` 폴더에만 넣고 직접 수정을 금지한다.
2. **초안 한정(`Draft-Only`):** 에이전트가 생성하는 모든 결과물은 `drafts/` 폴더나 이메일 임시보관함까지만 저장하게 하고, 외부 발송은 인간이 검토 후 직접 수행한다.
3. **비용 상한 설정:** 백그라운드 자동화 가동 전 LLM API 결제 대시보드에서 월간 하드 지출 한도(Hard Spend Limit)를 먼저 설정한다.
