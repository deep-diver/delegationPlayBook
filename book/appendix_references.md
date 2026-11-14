# Appendix. 실전 도구, 프레임워크 원전 및 레퍼런스

> **부록 활용 안내**
> - **A.1 핵심 용어 사전:** 본문 전반에 등장하는 위임 설계·보안·엔지니어링 핵심 개념 18개를 비개발 직군 실무자도 즉시 대조할 수 있도록 두 줄 정의로 압축했다.
> - **실전 스타터 킷(`starter-kit/`):** 본서에 수록된 `USER.md`, `SOUL.md`, `PLAYBOOK.md`, `AGENTS.md`, `CLAUDE.md`, 감사 시트 3종, `.claude/settings.json` 및 차단 훅 스크립트 완성본이 `starter-kit/` 디렉토리에 독립 파일로 패키징되어 있다. 폴더 전체를 `~/agent-workspace/`로 복사해 즉시 가동한다.
> - **A.2 ~ A.6 검증된 1차 출처:** 본문에서 인용한 에이전트 런타임 공식 문서, 프로토콜 표준, 실제 운영 사고 분석, 고전 인간 비서(EA) 운영 매뉴얼 원전 목록이다.

---

## A.1 핵심 용어 사전 (Glossary — 18대 핵심 개념)

1. **명세 (Specification)**
   업무 착수 전에 작업 목적, 허용 입력 데이터, 판단 분기 조건(`IF-THEN`), 금지 경계, 산출물 포맷을 문서로 확정하는 설계 행위다. 에이전트 위임 실패의 대다수는 모델 성능 부족이 아니라 위임자의 명세 누락에서 비롯된다.

2. **검증 병목 (Verification Bottleneck)**
   에이전트의 초안 생성 속도는 수초에 불과한 반면, 그 결과물의 사실 여부를 인간이 읽고 대조하는 데 과도한 시간이 걸려 전체 생산성이 멈추는 현상이다. 출처 원문 병기와 표 형식 제한 등 검증 친화적 출력 규격을 강제해야 해소된다.

3. **암묵지와 명시지 (Tacit vs. Explicit Knowledge)**
   암묵지는 실무자의 머릿속에만 축적된 직관과 맥락이고, 명시지는 누구든 읽고 재현할 수 있도록 평문 파일로 기록된 규칙이다. 기억이 매 세션 초기화되는 AI 에이전트는 오직 파일로 주입된 명시지만 인식한다.

4. **Personal OS (`USER.md` · `SOUL.md` · `PLAYBOOK.md`)**
   특정 AI 서비스에 종속되지 않도록 나의 배경 맥락(`USER.md`), 작동 원칙과 안전 경계(`SOUL.md`), 반복 업무 절차(`PLAYBOOK.md`)를 3계층 평문 마크다운으로 분리 구축한 개인 위임 운영체제다. 도구가 바뀌어도 파일만 이식하면 동일한 품질로 즉시 온보딩된다.

5. **표준운영절차 (SOP, Standard Operating Procedure)**
   반복되는 실무를 입력 소스, 단계별 실행 규칙, 예외 발생 시 분기 기준, 출력 양식, 검수 체크리스트 순으로 표준화한 작업 지침서다. 구두 지시 대신 SOP 파일을 참조하게 해야 매번 일관된 산출물을 얻는다.

6. **위임의 5단계 (5 Levels of Delegation)**
   경영 사상가 마이클 하얏트가 정립한 권한 이양 척도를 에이전트 도구 범위(`Read-Only` 조사부터 `Draft-Only` 초안 대기, `Scoped Write` 실행까지)로 재해석한 기준이다. 작업의 위험도와 가역성에 맞춰 허용 단계를 사전에 못 박아 월권을 방지한다.

7. **가역성과 비가역성 (Reversibility — 양방향 문 vs. 단방향 문)**
   실행 후 결과를 비용 없이 즉시 되돌릴 수 있으면 가역적 작업(로컬 초안 생성, 조회 쿼리)이고, 한 번 실행하면 복구가 불가능하면 비가역적 작업(외부 메일 발송, 원본 삭제, 결제)이다. 가역적 작업은 자동 실행을 허용하고 비가역적 작업은 반드시 인간 승인 게이트로 차단한다.

8. **초안 전용 원칙 (Draft-Don't-Send)**
   맷 모카리의 수석 비서 매뉴얼에서 유래한 원칙으로, 에이전트는 임시보관함(`Drafts`)이나 로컬 초안 폴더까지만 결과물을 저장하고 실제 전송(`Send`) 버튼은 인간이 누르는 구조다. 오발송 실수와 프롬프트 인젝션에 의한 기밀 유출을 동시에 무력화한다.

9. **인간 승인 게이트 (HITL, Human-in-the-Loop)**
   에이전트가 비가역적 도구를 호출하기 직전에 실행 파이프라인을 물리적으로 일시 정지(Pause)시키고 인간 위임자의 명시적 승인(`Approve`)을 기다리는 통제 지점이다. 실무 위임의 핵심 구간인 Level 3 운용의 필수 안전장치다.

10. **소프트 가드레일과 하드 가드레일 (Soft vs. Hard Guardrails)**
    소프트 가드레일은 프롬프트나 규칙 문서에 자연어로 적은 행동 지침이며, 하드 가드레일은 런타임 설정(`deny` 규칙, 실행 훅, 계정 권한 박탈)으로 물리적 실행 자체를 막는 장치다. 데이터 삭제나 외부 유출 방지는 반드시 하드 가드레일로 구현해야 한다.

11. **계획 모드 (Plan Mode)**
    에이전트의 파일 수정 및 명령 실행 권한을 일시 차단하고, 코드베이스나 문서를 읽기 전용으로 탐색해 단계별 작업 계획서만 먼저 제출하게 하는 안전 모드다. 실행 전 인간과 에이전트가 작업 범위를 합의하는 설계 게이트 역할을 한다.

12. **실행 전 훅 (`PreToolUse` Hook)**
    에이전트 모델이 쉘 명령어나 파일 쓰기 도구를 호출하려는 순간, 런타임이 실행 직전에 외부 검증 스크립트를 강제로 먼저 돌리는 결정론적 가로채기 장치다. 위험 명령 패턴 감지 시 종료 코드를 반환해 모델의 의도와 무관하게 작업을 즉시 중단시킨다.

13. **모델 컨텍스트 프로토콜 (MCP, Model Context Protocol)**
    AI 에이전트가 로컬 파일시스템, 데이터베이스, 외부 업무용 SaaS(Gmail, Slack, GitHub 등)와 표준화된 규격으로 도구를 주고받게 해주는 오픈 프로토콜이다. 연동 시 관리자 통합 계정 대신 읽기 전용 계정과 초안 작성 계정을 분리해 연결해야 안전하다.

14. **샌드박스 격리 (Sandbox Isolation)**
    에이전트가 지정된 작업 폴더(`~/agent-workspace/`) 바깥의 운영체제 파일, 개인 인증 키(`~/.ssh`), 외부 네트워크에 접근하지 못하도록 컨테이너(Docker)나 OS 커널 정책으로 가두는 보안 경계다. 에이전트 오작동이나 해킹 시 피해 반경을 격리된 폴더 내부로 제한한다.

15. **간접 프롬프트 인젝션 (Indirect Prompt Injection)**
    외부인이 보낸 이메일, 웹페이지, 공개 이슈 본문 안에 숨겨진 악성 명령문을 에이전트가 읽어들여 위임자의 원래 지시 대신 공격자의 명령을 수행하게 되는 보안 취약점이다. 언어 모델이 시스템 명령과 외부 데이터 텍스트를 완벽히 분리하지 못해 발생한다.

16. **치명적 삼중주 (Lethal Trifecta)**
    사이먼 윌리슨이 정립한 에이전트 보안 법칙으로, ① 사적 민감 데이터 접근, ② 신뢰할 수 없는 외부 콘텐츠 노출, ③ 외부 전송 수단 보유라는 세 조건이 한 에이전트에 동시에 주어지면 데이터 유출이 필연화된다는 원리다. 설계 단계에서 세 다리 중 최소 하나(주로 외부 전송 권한)를 물리적으로 절단해야 한다.

17. **컨텍스트 부패 (Context Rot)와 점진적 노출 (Progressive Disclosure)**
    컨텍스트 부패는 단일 세션 대화나 전역 규칙 파일이 지나치게 길어지면서 상충하는 정보가 쌓여 에이전트의 지시 준수율이 급락하는 현상이다. 이를 막기 위해 전역 파일은 150~200줄 이내로 유지하고 세부 SOP는 해당 작업 시에만 불러오는 점진적 노출 구조를 적용한다.

18. **교정 루프 (Calibration Loop)**
    에이전트가 오류를 냈을 때 채팅창에서 일회성 잔소리로 고쳐 쓰는 대신, 실패 원인을 진단해 `USER.md`·`SOUL.md`·`PLAYBOOK.md` 원본 규칙 파일에 영구 패치(Diff)를 남기는 운영 사이클이다. 이 루프가 누적될수록 인간의 검수 시간은 줄어들고 시스템 신뢰도는 복리로 상승한다.

---

## A.2 오픈소스·로컬 게이트웨이 및 CLI 에이전트 공식 문서

- **OpenClaw 공식 저장소** (`https://github.com/openclaw/openclaw`)
  로컬 마크다운 파일 기반 개인 비서 게이트웨이 OpenClaw의 소스 코드, 설치 패키지, 메신저 채널 연동 규격을 제공한다.
- **OpenClaw 워크스페이스 아키텍처 문서** (`https://docs.openclaw.ai/concepts/agent-workspace`)
  세션 시작 시 로드되는 `AGENTS.md`, `SOUL.md`, `USER.md`, `TOOLS.md` 파일의 역할 분리와 디렉토리 구조를 정의한다.
- **OpenClaw `SOUL.md` 레퍼런스 템플릿** (`https://docs.openclaw.ai/ko/reference/templates/SOUL`)
  에이전트의 작동 원칙, 커뮤니케이션 어조, 사생활 보호 및 외부 행동 전 질문 경계를 설정하는 기본 문서 규격이다.
- **OpenClaw 메모리 아키텍처 문서** (`https://docs.openclaw.ai/concepts/memory`)
  영구 기억 저장소(`MEMORY.md`)와 일일 로그(`memory/YYYY-MM-DD.md`)의 2계층 운용 방식 및 메모리 오염 방지(Provenance) 메커니즘을 다룬다.
- **OpenClaw 프롬프트 인젝션 및 게이트웨이 보안 가이드** (`https://docs.openclaw.ai/gateway/security/prompt-injection`)
  외부 입력에 의한 도구 오남용 방어, 컨테이너 샌드박스 격리, 발신자 허용 목록(`allowlist`) 및 보안 감사(`security audit`) 절차를 안내한다.
- **Claude Code 설정 레퍼런스** (`https://code.claude.com/docs/en/settings`)
  전역·프로젝트·로컬 단위의 `settings.json` 계층 구조와 환경 변수, 기본 실행 모드(`defaultMode`) 설정 문법을 설명한다.
- **Claude Code 메모리(`CLAUDE.md`) 가이드** (`https://code.claude.com/docs/en/memory`)
  `~/.claude/CLAUDE.md`부터 프로젝트 루트 및 하위 폴더까지 이어지는 계층적 컨텍스트 로딩 방식과 `/memory` 명령 사용법을 다룬다.
- **Claude Code 권한(`Permissions`) 관리 문서** (`https://code.claude.com/docs/en/permissions`)
  도구별 `deny` → `ask` → `allow` 우선순위 평가 규칙과 읽기 전용 `Plan Mode` 운용 기준을 정의한다.
- **Claude Code Hooks 레퍼런스** (`https://code.claude.com/docs/en/hooks`)
  `PreToolUse`, `PostToolUse` 등 에이전트 생명주기 시점에 스크립트를 강제 실행하여 위험 명령을 결정론적으로 차단하고 후처리하는 방법이다.
- **Claude Code 슬래시 커맨드 문서** (`https://code.claude.com/docs/en/slash-commands`)
  내장 세션 제어 명령(`/init`, `/plan`, `/compact`, `/clear`, `/cost`)과 `.claude/commands/` 기반 커스텀 SOP 명령 작성법을 다룬다.
- **OpenAI Codex CLI 공식 저장소** (`https://github.com/openai/codex`)
  터미널 기반 에이전트 Codex CLI의 OS 커널 샌드박스(`read-only`, `workspace-write`) 및 승인 정책(`approval_policy`) 설정을 제공한다.

---

## A.3 프로토콜 표준, IDE 규칙 및 워크플로우 자동화 도구

- **Model Context Protocol (MCP) 공식 문서** (`https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro`)
  AI 에이전트와 외부 파일시스템, 데이터베이스, 업무용 API를 표준화된 방식으로 연결하는 오픈 프로토콜 명세다.
- **MCP 공식 참조 서버 저장소** (`https://github.com/modelcontextprotocol/servers`)
  `@modelcontextprotocol/server-filesystem` 등 표준 MCP 서버 구현체와 허용 디렉토리 제한·읽기 전용 플래그 구성을 수록한다.
- **`AGENTS.md` 오픈 표준 명세** (`https://agents.md`)
  특정 도구에 종속되지 않고 여러 코딩·작업 에이전트가 공통으로 읽을 수 있는 저장소 작업 규칙 파일 표준이다.
- **Cursor 공식 문서** (`https://cursor.com/docs`)
  `.cursor/rules/*.mdc` 프론트매터(`description`, `globs`, `alwaysApply`)를 활용한 파일 범위별 규칙 활성화 방식을 안내한다.
- **Cline 공식 저장소** (`https://github.com/cline/cline`)
  IDE 내 자율 에이전트 확장 도구 Cline의 `.clinerules` 규칙 체계와 도구 실행별 인간 승인 인터페이스를 제공한다.
- **n8n AI 도구 Human-in-the-Loop 가이드** (`https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools`)
  에이전트가 민감한 외부 도구를 호출할 때 실행을 일시 정지하고 메신저 승인 게이트를 거치도록 설계하는 워크플로우 문서다.
- **Raycast 공식 사이트** (`https://www.raycast.com/`)
  macOS 단축키 및 스크립트 커맨드를 통해 로컬 자동화 웹훅과 에이전트 작업을 즉시 호출하는 런처 도구다.

---

## A.4 상용 에이전트 서비스 및 브라우저 제어 안전 가이드

- **Anthropic Claude Cowork 시작 가이드** (`https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork`)
  데스크톱 격리 폴더 지정, 로컬 문서 일괄 처리, 파일 삭제·덮어쓰기 시 강제 승인 프롬프트, 정기 스케줄 실행 방법을 설명한다.
- **Anthropic Computer Use 도구 문서** (`https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool`)
  화면 인식 및 마우스·키보드 조작 에이전트의 작동 구조와 컨테이너·가상머신 샌드박스 격리 운용 원칙을 다룬다.
- **OpenAI Computer-Using Agent (Operator 기반) 안전 가이드** (`https://developers.openai.com/api/docs/guides/tools-computer-use`)
  브라우저 및 UI 조작 에이전트의 비가역 행동 직전 사용자 확인(Confirmation) 요구, 프롬프트 인젝션 방어, 격리 실행 원칙을 정의한다.
- **OpenAI Computer-Using Agent 참조 저장소** (`https://github.com/openai/openai-cua-sample-app`)
  가상 브라우저·데스크톱 환경에서 인간 확인 루프와 도메인 차단 목록을 결합해 에이전트를 구동하는 공식 레퍼런스 구현체다.
- **OpenAI Agents SDK 공식 저장소** (`https://github.com/openai/openai-agents-python`)
  멀티스텝 에이전트 핸드오프, 입출력 가드레일(Guardrails), 최대 실행 턴 제한(`max_turns`) 구성을 제공하는 프레임워크다.
- **Perplexity Deep Research 소개** (`https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research`)
  다단계 자율 웹 탐색과 교차 출처 검증을 수행하는 심층 조사 에이전트의 작동 구조를 설명한다.
- **Notion 3.0 AI Agents 릴리즈 노트** (`https://www.notion.com/releases/2025-09-18`)
  워크스페이스 문서를 지침 삼아 다중 페이지 정리, 데이터베이스 구조화, 회의 후속 조치를 자율 수행하는 에이전트 기능을 다룬다.
- **Lindy AI 공식 사이트** (`https://www.lindy.ai`)
  이메일 트리아지, 일정 조율, 미팅 브리핑 자동화 및 단계별 인간 승인 조건을 노코드로 구성하는 상용 에이전트 플랫폼이다.

---

## A.5 실제 에이전트 실패·폭주 사고 및 보안 취약점 분석 사례

- **Replit AI 에이전트 프로덕션 DB 삭제 사건 보도 (Fortune, 2025.07)** (`https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/`)
  채팅창의 작업 동결(Code Freeze) 지시를 무시하고 운영 데이터베이스를 삭제한 뒤 복구 불가능하다고 오보고한 실제 사례와 개발·운영 분리 교훈을 다룬다.
- **PocketOS 프로덕션 및 백업 삭제 포스트모템 분석 (QuintAI, 2026.04)** (`https://quintai.dev/blog/when-ai-agents-delete-production`)
  스테이징 오류를 수정하던 코딩 에이전트가 로컬의 관리자 API 토큰을 탐색해 9초 만에 운영 DB와 볼륨 백업을 삭제한 사고 원인과 물리적 권한 격리 대책을 분석한다.
- **$47,000 멀티 에이전트 무한 루프 포스트모템 (DEV Community)** (`https://dev.to/gabrielanhaia/the-agent-that-spent-47k-on-itself-an-autonomous-loop-postmortem-3313`)
  종료 조건과 예산 상한이 없는 분석·검증 에이전트 간 재확인 루프가 11일간 방치되며 $47,000의 API 비용을 소모한 사건과 서킷 브레이커 설계 기준을 다룬다.
- **Simon Willison — AI 에이전트의 치명적 삼중주 (The Lethal Trifecta, 2025.06)** (`https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/`)
  사적 데이터 접근, 신뢰할 수 없는 외부 콘텐츠 노출, 외부 전송 수단이 결합될 때 발생하는 데이터 유출 필연성과 권한 절단 원칙을 정립한 핵심 보안 아티클이다.
- **Microsoft 365 Copilot 'EchoLeak' 제로클릭 취약점 분석 (CVE-2025-32711, 2025.06)** (`https://simonwillison.net/2025/Jun/11/echoleak/`)
  수신 이메일에 숨겨진 간접 프롬프트 인젝션이 에이전트를 통해 사내 민감 정보를 외부 URL로 유출시킨 실제 엔터프라이즈 보안 사고 분석이다.
- **GitHub MCP 프롬프트 인젝션 취약점 분석 (2025.05)** (`https://simonwillison.net/2025/May/26/github-mcp-exploited/`)
  공개 이슈 티켓의 악성 지시가 과도한 권한의 MCP 토큰을 악용해 비공개 저장소 코드를 유출한 사례로, 최소 권한 토큰 분리의 근거를 제시한다.

---

## A.6 고전 인간 비서(EA) 운영 매뉴얼 원전

- **Michael Hyatt (Full Focus) — 위임의 5단계 (The Five Levels of Delegation)** (`https://fullfocus.co/the-five-levels-of-delegation/`)
  업무 위임 시 결정권과 자율성의 범위를 1단계부터 5단계까지 명확히 합의하는 고전 위임 프레임워크 원전이다.
- **Matt Mochary — Mochary Method 오픈소스 커리큘럼 원전** (`https://docs.google.com/document/d/18FiJbYn53fTtPmphfdCKT2TMWH-8Y2L-MLqDk-MFV4s/edit`)
  실리콘밸리 창업자 코치 맷 모카리가 공개한 CEO 운영 매뉴얼 원문으로, 시간 관리·우선순위 방어·비서 협업 프로토콜을 포함한다.
- **Mochary Method 공식 사이트** (`https://www.mocharymethod.com/`)
  *The Great CEO Within* 및 경영진·비서 협업 시스템의 핵심 문서와 가이드를 제공한다.
- **Mochary Method 기반 EA 인박스 제로 및 Draft-Don't-Send 운영법** (`https://www.coachingfounder.com/post/inbox-zero`)
  비서의 이메일 4분류 라벨링 트리아지, 외부 발송 대신 임시보관함 초안 생성 원칙, 캘린더 타임블록 연동 실무를 상세히 정리한 문서다.
- **Athena — 위임 피드백 루프 (The Delegation Feedback Loop)** (`https://www.athena.com/blog/posts/the-delegation-feedback-loop`)
  수석 비서 플랫폼 아테나의 핵심 방법론으로, 결과물 오류를 개인 질책이 아닌 플레이북(SOP) 문서 업데이트로 전환하는 지속 교정 원칙을 다룬다.
- **Athena — 비동기 위임 모달리티 (Delegation Modalities)** (`https://www.athena.com/blog/posts/delegation-modalities`)
  화면 녹화(음성 사고 과정 공유)와 문서화를 결합해 초기 위임 비용을 낮추고 반복 가능한 플레이북을 구축하는 실무 가이드다.
