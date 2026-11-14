# AI Agent Delegation Starter Kit

책을 덮자마자 내 컴퓨터에서 3분 만에 AI 비서 작업실을 세팅할 수 있도록 묶어둔 스타터 킷이다.
빈 화면을 켜고 첫 줄을 고민할 필요 없다. 이 폴더를 통째로 복사한 뒤 대괄호(`[ ]`)로 비워둔 칸만 내 이야기로 바꾸면 바로 돌아간다.

---

## 1. 안에 무엇이 들어 있나

| 파일 이름 | 한 줄 역할 | 누가 쓰나 |
| :--- | :--- | :--- |
| `USER.md` | **내 소개서:** 내가 하는 일, 이번 분기 가장 급한 목표, 미팅 잡지 말아야 할 집중 시간대를 적는다. | 모든 직군 |
| `SOUL.md` | **AI 행동 수칙:** 미사여구 빼고 세 줄부터 보고하기, 모르면 솔직히 모른다고 하기, 절대 넘지 말 선을 못 박는다. | 모든 직군 |
| `PLAYBOOK.md` | **업무 레시피:** 이메일 분류와 주간 보고서처럼 반복되는 일을 단계별 순서도로 적어둔 매뉴얼이다. | 모든 직군 |
| `DELEGATION_BRIEF_TEMPLATE.md` | **일일 주문서 양식:** 새로운 일을 시킬 때 빈칸만 채워 던지는 5줄짜리 작업 지시 틀이다. | 모든 직군 |
| `task_audit_sheet.md` | **업무 선별 채점표:** 내 할 일 10개 중 무엇부터 AI에게 넘기면 본전을 뽑는지 계산하는 표다. | 모든 직군 |
| `WEEKLY_AGENT_AUDIT.md` | **금요일 15분 점검표:** 한 주 동안 AI가 낸 실수 딱 1건을 골라 매뉴얼에 반영하는 주간 체크리스트다. | 모든 직군 |
| `AGENTS.md` | **작업실 구역 안내판:** 어디는 읽기만 해야 하고(`raw/`), 어디에 초안을 저장해야 하는지(`drafts/`) 정해준다. | CLI · 에디터 사용자 |
| `CLAUDE.md` | **Claude Code 스위치:** Claude Code를 켰을 때 위 설명서들을 한 번에 자동으로 읽게 연결해 준다. | Claude Code 사용자 |
| `.claude/settings.json` | **물리적 자물쇠:** 시작할 때 읽기 전용 계획 모드로 켜고, 비밀 파일 열람과 강제 삭제 권한을 뺏는다. | Claude Code 사용자 |
| `.claude/hooks/block_irreversible.py` | **문 앞 보안 검색대:** 전체 삭제나 무단 전송 같은 위험 명령어를 실행 직전에 자동으로 막아선다. | Claude Code 사용자 |
| `.mcp.json.example` | **안전 어댑터 예시:** 원본 폴더는 읽기 전용으로, 초안 폴더만 쓰기 허용으로 나눠 연결하는 설정본이다. | MCP 연동 사용자 |

---

## 2. 3분 만에 시작하는 순서

### 방법 A. 비개발 직군 (기획 · 마케팅 · 리서치 · 운영 · 창업자)
터미널이나 검은 화면을 열 필요 없다. 평소 쓰는 Claude Desktop(Cowork), ChatGPT, Notion AI 화면에서 바로 시작한다.

1. 내 문서 폴더 안에 `agent-workspace`라는 새 폴더를 하나 만들고 이 스타터 킷 파일들을 복사해 넣는다.
2. `task_audit_sheet.md`를 열어 이번 주 나를 가장 귀찮게 한 반복 업무 하나만 고른다.
3. 메모장이나 노션으로 `USER.md`와 `SOUL.md`를 열어 `[ ]` 칸에 내 직무와 일정을 채운다.
4. 평소 쓰는 AI 서비스의 '프로젝트 지침(Custom Instructions)' 칸에 `USER.md`와 `SOUL.md` 내용을 붙여넣는다. 이제 일을 시킬 때마다 `PLAYBOOK.md`의 레시피나 `DELEGATION_BRIEF_TEMPLATE.md`의 5줄 주문서를 함께 복사해 던지면 된다.

### 방법 B. 개발자 및 터미널 도구 사용자 (Claude Code · Codex CLI · Cursor · OpenClaw)
터미널에 아래 세 단락을 복사해 붙여넣으면 격리된 작업실과 안전 자물쇠 세팅이 한 번에 끝난다.

```bash
# 1. AI 전용 작업실 폴더 만들기 및 스타터 킷 복사
mkdir -p ~/agent-workspace/{inbox,raw,drafts,processed,scripts,logs}
cp -R ./starter-kit/. ~/agent-workspace/

# 2. 위험 명령 자동 차단 스크립트 켜기 및 이상 유무 확인
chmod +x ~/agent-workspace/.claude/hooks/block_irreversible.py
python3 -m py_compile ~/agent-workspace/.claude/hooks/block_irreversible.py

# 3. (선택) 외부 도구(MCP) 연결 시 예시 파일을 복사해 내 폴더 경로 적기
cp ~/agent-workspace/.mcp.json.example ~/agent-workspace/.mcp.json
```

---

## 3. 첫날부터 지켜야 할 안전 수칙 세 가지

1. **원본은 `raw/` 금고에 넣는다:** 원본 엑셀, 계약서, 고객 데이터는 무조건 `raw/` 폴더에 넣고 AI가 직접 덮어쓰지 못하게 둔다.
2. **발송 버튼은 내가 누른다:** AI가 쓴 모든 결과물은 `drafts/` 폴더나 이메일 임시보관함까지만 채우게 하고, 마지막 전송은 내 눈으로 훑은 뒤 직접 누른다.
3. **요금 상한선부터 건다:** 자동화를 돌려놓고 퇴근하기 전에 AI 서비스 결제 설정창에 들어가 이번 달 최대 사용 금액 한도부터 걸어둔다.
