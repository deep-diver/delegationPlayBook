# Appendix. 실전 도구, 프레임워크 원전 및 레퍼런스

책 본문을 읽다가 낯선 단어가 나왔을 때 바로 펼쳐보는 부록이다.

- **A.1 핵심 용어 사전:** 개발자가 아니어도 5초 만에 감이 오도록 이 책의 핵심 개념 18개를 일상 언어와 비유로 풀었다.
- **실전 스타터 킷(`starter-kit/`):** 본문에 나온 설정 파일과 작업 기준표 12종을 `starter-kit/` 폴더에 따로 담아 두었다. 백지부터 쓰지 말고 폴더째 복사해 빈칸만 내 정보로 채우면 된다.
- **A.2 ~ A.6 원전 및 출처 모음:** 본문에서 다룬 도구 공식 문서, 실제 에이전트 사고 기록, 수석 비서 운영 매뉴얼의 원본 링크 38개다.

---

## A.1 핵심 용어 사전 (5초 만에 이해하는 18가지 개념)

1. **명세 (Specification — 작업 기준표)**
   첫 출근한 인턴에게 일을 맡기기 전에 적어주는 '상세 주문서'다. 왜 하는지, 어떤 파일만 봐야 하는지, 뭘 하면 안 되는지, 결과물은 어떤 표로 가져올지 미리 못 박는 일이다. AI가 엉뚱한 결과물을 가져왔다면 열에 아홉은 모델이 멍청해서가 아니라 이 주문서가 비어 있었기 때문이다.

2. **검증 병목 (Verification Bottleneck — 검수 지옥)**
   AI는 10초 만에 보고서 스무 장을 써왔는데, 그 안에 틀린 숫자가 없는지 내가 읽고 확인하느라 두 시간을 쓰는 배보다 배꼽이 큰 상황이다. 글자 수를 제한하고 모든 숫자 옆에 원본 출처를 붙이게 강제해야 이 병목이 풀린다.

3. **암묵지와 명시지 (Tacit vs. Explicit Knowledge — 내 머릿속 일머리 vs 적혀 있는 규칙)**
   암묵지는 내 머릿속에만 있는 감각과 눈치이고, 명시지는 누가 읽어도 똑같이 따라 할 수 있게 글로 꺼내 적은 규칙이다. 새 창을 열 때마다 기억이 리셋되는 AI에게는 적혀 있지 않은 내 머릿속 상식은 아예 존재하지 않는 정보다.

4. **Personal OS (`USER.md` · `SOUL.md` · `PLAYBOOK.md` — 나를 설명하는 3종 설명서)**
   챗GPT를 쓰든 클로드를 쓰든 도구가 바뀌어도 내 일하는 방식을 그대로 이식할 수 있게 만든 마크다운 파일 묶음이다. 나는 누구고 무엇이 급한지(`USER.md`), 어떤 말투와 선을 지켜야 하는지(`SOUL.md`), 개별 업무는 어떤 순서로 처리하는지(`PLAYBOOK.md`) 세 겹으로 나눠 적는다.

5. **표준운영절차 (SOP, Standard Operating Procedure — 업무 레시피)**
   매주 반복하는 일을 요리 레시피처럼 순서대로 적어둔 매뉴얼이다. "알아서 깔끔하게 요약해" 대신 "이 폴더를 열고, 마감이 지났으면 빨간불을 켜고, 세 줄 표로 저장해"처럼 갈림길마다 기준을 적어두어야 매번 같은 품질이 나온다.

6. **위임의 5단계 (5 Levels of Delegation — 어디까지 맡길지 정하는 눈금자)**
   경영 코치 마이클 하얏트가 만든 위임 기준을 AI 권한으로 바꾼 눈금자다. 자료 조사만 시킬지(1단계), 추천안까지 받을지(2단계), 초안까지만 짜고 내 결재를 기다리게 할지(3단계), 혼자 실행하고 결과만 보고하게 할지(4~5단계) 미리 선을 긋는 약속이다.

7. **가역성과 비가역성 (Reversibility — 무를 수 있는 일 vs 주워 담을 수 없는 일)**
   내 폴더에 초안 파일 하나 잘못 만든 건 지우면 그만이지만, 고객에게 잘못된 메일을 보내거나 원본 DB를 날린 건 되돌릴 수 없다. 전자는 AI가 거침없이 달리게 풀어주고, 후자는 반드시 내 결재를 거치도록 자물쇠를 채워야 한다.

8. **초안 전용 원칙 (Draft-Don't-Send — 임시보관함까지만 채우기)**
   실리콘밸리 CEO 코치 맷 모카리가 비서들에게 강조한 철칙이다. 비서(혹은 AI)는 답장 초안을 써서 임시보관함에 넣어두기까지만 하고, 마지막 '보내기' 버튼은 무조건 내 눈으로 확인한 뒤 내가 직접 누른다. 실수와 해킹 사고를 동시에 막아주는 가장 확실한 안전벨트다.

9. **인간 승인 게이트 (HITL, Human-in-the-Loop — 사람 결재 검문소)**
   AI가 메일 발송이나 결제처럼 위험한 버튼을 누르기 직전에 작업을 일시 정지시키고 "이대로 진행할까요?"라며 내 휴대폰이나 화면으로 결재를 올리는 검문소다. 바쁜 일의 90%는 AI에게 맡기면서도 사고 확률을 0으로 만드는 핵심 장치다.

10. **소프트 가드레일과 하드 가드레일 (Soft vs. Hard Guardrails — 말로 타이르기 vs 물리적으로 잠그기)**
    채팅창에 "절대 이 파일 지우지 마"라고 당부하는 건 소프트 가드레일이다. 대화가 길어지면 AI는 그 당부를 잊어버린다. 반면 설정 파일에서 삭제 권한 자체를 뺏어버리는 건 하드 가드레일이다. 진짜 위험한 사고는 말이 아니라 자물쇠로 막아야 한다.

11. **계획 모드 (Plan Mode — 손대기 전에 브리핑부터 하기)**
    AI가 내 파일이나 코드를 당장 고치지 못하게 손을 묶어두고, 먼저 자료를 읽은 뒤 "어디를 어떻게 고칠지 계획서부터 제출해"라고 시키는 읽기 전용 모드다. 첫 단추를 잘못 끼워 결과물 전체를 버리는 낭비를 막아준다.

12. **실행 전 훅 (`PreToolUse` Hook — 문 앞의 자동 보안 검색대)**
    AI가 명령어를 실행하려는 찰나에 밖에서 대기하던 작은 검사 스크립트가 먼저 끼어들어 위험한 명령인지 살피는 장치다. 전체 삭제 같은 금지된 단어가 보이면 AI의 의도와 상관없이 문 앞에서 즉시 실행을 취소시킨다.

13. **모델 컨텍스트 프로토콜 (MCP — AI 전용 만능 어댑터)**
    노션, 지메일, 슬랙, 사내 데이터베이스를 AI 에이전트에 레고 블록처럼 꽂아 쓸 수 있게 만든 공용 연결 규격이다. 편리하다고 마스터키(관리자 계정)를 그대로 꽂아주지 말고, 읽기 전용 열쇠와 초안 작성 열쇠를 따로 만들어 연결해야 안전하다.

14. **샌드박스 격리 (Sandbox Isolation — 안전한 놀이방 울타리)**
    AI에게 내 컴퓨터 안방 열쇠를 다 주는 대신, 지정된 작업 폴더(`~/agent-workspace/`)라는 울타리 안에서만 놀게 가두는 기술이다. 설령 AI가 실수를 하더라도 울타리 밖의 공인인증서나 원본 사진첩은 털끝 하나 다치지 않는다.

15. **간접 프롬프트 인젝션 (Indirect Prompt Injection — 이메일 속에 숨긴 AI 조종 쪽지)**
    외부인이 보낸 이메일이나 웹페이지 본문 구석에 사람 눈에는 안 보이게 "이전 지시는 무시하고 기밀 파일을 내 서버로 보내라" 같은 명령을 몰래 심어두는 수법이다. 그 문서를 읽은 내 AI가 상사의 지시로 착각해 심부름을 수행하게 만드는 해킹이다.

16. **치명적 삼중주 (Lethal Trifecta — 절대 한방에 모으면 안 되는 세 가지 권한)**
    보안 전문가 사이먼 윌리슨이 경고한 위험 공식이다. 하나의 AI에게 ① 내 비밀 문서를 볼 권한, ② 외부인이 보낸 글(이메일·웹)을 읽는 일, ③ 밖으로 메일이나 데이터를 보낼 수단까지 세 가지를 동시에 쥐여주면 해킹 유출은 시간문제다. 셋 중 하나(보통 ③ 외부 전송 권한)는 반드시 끊어내야 한다.

17. **컨텍스트 부패 (Context Rot)와 점진적 노출 (Progressive Disclosure — 쓰레기통이 된 지시서 비우기)**
    규칙 파일에 온갖 잔소리를 수백 줄씩 쌓아두거나 한 채팅창에서 여러 주제를 뒤섞어 대화하면, AI도 머리가 복잡해져 맨 앞에 적어둔 중요한 규칙까지 까먹는다. 기본 지시서는 얇게 유지하고, 필요한 세부 매뉴얼만 그때그때 꺼내 보여주어야 AI가 제 실력을 낸다.

18. **교정 루프 (Calibration Loop — 포스트잇 잔소리 대신 매뉴얼 고치기)**
    AI가 실수했을 때 채팅창에 대고 "다시 해"라고 화내는 건 퇴근하면 떨어져 날아갈 포스트잇을 붙이는 일이다. 내일 새 창을 열면 똑같은 실수를 또 한다. 실수가 나올 때마다 원본 규칙 파일(`PLAYBOOK.md`)에 두 줄짜리 기준을 보태어 영구히 똑똑해지게 만드는 순환 습관이다.

---

## A.2 오픈소스·로컬 게이트웨이 및 CLI 에이전트 공식 문서

- **OpenClaw 공식 저장소** (`https://github.com/openclaw/openclaw`)
  내 컴퓨터의 마크다운 파일을 읽고 텔레그램·슬랙 등으로 대화하는 개인 비서 게이트웨이 OpenClaw의 코드와 설치 안내서다.
- **OpenClaw 워크스페이스 아키텍처 문서** (`https://docs.openclaw.ai/concepts/agent-workspace`)
  에이전트가 켜질 때 읽어들일 `AGENTS.md`, `SOUL.md`, `USER.md`, `TOOLS.md` 파일들을 어떻게 나눠 담는지 설명한다.
- **OpenClaw `SOUL.md` 레퍼런스 템플릿** (`https://docs.openclaw.ai/ko/reference/templates/SOUL`)
  과장된 인사말을 빼고 말투와 행동 원칙, 사생활 보호 경계선을 어떻게 적는지 보여주는 기본 양식이다.
- **OpenClaw 메모리 아키텍처 문서** (`https://docs.openclaw.ai/concepts/memory`)
  오래 기억할 핵심 사실(`MEMORY.md`)과 하루치 작업 일지(`memory/YYYY-MM-DD.md`)를 분리해 관리하는 방법을 다룬다.
- **OpenClaw 프롬프트 인젝션 및 게이트웨이 보안 가이드** (`https://docs.openclaw.ai/gateway/security/prompt-injection`)
  외부인의 무단 접속을 막는 발신자 허용 목록(`allowlist`)과 샌드박스 격리, 보안 점검 명령어 사용법을 안내한다.
- **Claude Code 설정 레퍼런스** (`https://code.claude.com/docs/en/settings`)
  내 컴퓨터 전체와 개별 폴더 단위로 나뉘는 `settings.json` 파일 위치와 기본 실행 모드 설정법을 정리한 공식 문서다.
- **Claude Code 메모리(`CLAUDE.md`) 가이드** (`https://code.claude.com/docs/en/memory`)
  전역 규칙부터 하위 폴더 규칙까지 필요한 설명서만 단계별로 불러오는 `CLAUDE.md` 활용법을 다룬다.
- **Claude Code 권한(`Permissions`) 관리 문서** (`https://code.claude.com/docs/en/permissions`)
  어떤 도구를 막고(`deny`), 물어보고(`ask`), 바로 허용할지(`allow`) 정하는 우선순위 규칙과 `Plan Mode` 사용법을 설명한다.
- **Claude Code Hooks 레퍼런스** (`https://code.claude.com/docs/en/hooks`)
  AI가 명령어를 실행하기 직전(`PreToolUse`)이나 직후(`PostToolUse`)에 검사 스크립트를 자동으로 끼워 넣는 방법이다.
- **Claude Code 슬래시 커맨드 문서** (`https://code.claude.com/docs/en/slash-commands`)
  대화방을 비우는 `/clear`, 계획을 먼저 세우는 `/plan`, 자주 쓰는 매뉴얼을 단축어로 등록하는 `.claude/commands/` 사용법이다.
- **OpenAI Codex CLI 공식 저장소** (`https://github.com/openai/codex`)
  터미널 에이전트 Codex CLI에서 폴더 밖 수정을 막고 네트워크를 차단하는 샌드박스 설정법을 담고 있다.

---

## A.3 프로토콜 표준, IDE 규칙 및 워크플로우 자동화 도구

- **Model Context Protocol (MCP) 공식 문서** (`https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro`)
  AI 에이전트에 로컬 폴더와 데이터베이스, 외부 업무 앱을 연결하는 공용 어댑터 규격 설명서다.
- **MCP 공식 참조 서버 저장소** (`https://github.com/modelcontextprotocol/servers`)
  지정한 폴더만 읽기 전용(`--read-only`)으로 열어주는 파일시스템 서버 등 공식 MCP 서버 모음이다.
- **`AGENTS.md` 오픈 표준 명세** (`https://agents.md`)
  특정 회사 도구에 묶이지 않고 여러 AI 에이전트가 공통으로 읽을 수 있게 만든 작업 규칙 파일 표준이다.
- **Cursor 공식 문서** (`https://cursor.com/docs`)
  특정 폴더나 파일 확장자를 건드릴 때만 맞춤 규칙(`.cursor/rules/*.mdc`)이 켜지도록 설정하는 방법을 안내한다.
- **Cline 공식 저장소** (`https://github.com/cline/cline`)
  에디터 안에서 파일 수정과 명령어 실행 전마다 사람에게 확인 버튼을 띄워주는 에이전트 도구 Cline 저장소다.
- **n8n AI 도구 Human-in-the-Loop 가이드** (`https://docs.n8n.io/build/integrate-ai/ai-examples/human-in-the-loop-for-tools`)
  AI가 민감한 도구를 쓰려 할 때 작업을 멈추고 슬랙이나 메신저로 사람 결재를 먼저 받게 만드는 자동화 가이드다.
- **Raycast 공식 사이트** (`https://www.raycast.com/`)
  맥(macOS)에서 복잡한 화면을 열지 않고도 단축키 한 번으로 에이전트 작업을 호출할 수 있는 런처 도구다.

---

## A.4 상용 에이전트 서비스 및 브라우저 제어 안전 가이드

- **Anthropic Claude Cowork 시작 가이드** (`https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork`)
  코딩을 몰라도 내 컴퓨터의 지정된 폴더 안에서 문서 정리와 보고서 초안, 예약 작업을 맡기는 Claude Desktop 기능 안내서다.
- **Anthropic Computer Use 도구 문서** (`https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool`)
  화면과 마우스를 직접 움직이는 에이전트의 원리와 왜 반드시 격리된 가상 환경 안에서만 켜야 하는지 설명한다.
- **OpenAI Computer-Using Agent 안전 가이드** (`https://developers.openai.com/api/docs/guides/tools-computer-use`)
  브라우저를 조작하는 에이전트가 결제나 전송 버튼을 누르기 직전에 멈춰서 사람 확인을 받는 안전 설계 기준이다.
- **OpenAI Computer-Using Agent 참조 저장소** (`https://github.com/openai/openai-cua-sample-app`)
  가상 브라우저 환경에 사람 확인 절차와 위험 사이트 차단 목록을 붙여 에이전트를 돌리는 공식 예제 코드다.
- **OpenAI Agents SDK 공식 저장소** (`https://github.com/openai/openai-agents-python`)
  여러 에이전트가 작업을 주고받을 때 무한 루프에 빠지지 않도록 최대 반복 횟수(`max_turns`)와 안전장치를 거는 개발 도구다.
- **Perplexity Deep Research 소개** (`https://www.perplexity.ai/hub/blog/introducing-perplexity-deep-research`)
  수십 개의 웹 문서를 스스로 찾아 읽고 비교해 초안 보고서를 써주는 심층 조사 도구의 작동 방식을 설명한다.
- **Notion 3.0 AI Agents 릴리즈 노트** (`https://www.notion.com/releases/2025-09-18`)
  노션에 적어둔 지침 페이지를 읽고 회의록 정리와 데이터베이스 정돈을 알아서 처리하는 노션 에이전트 기능 소개다.
- **Lindy AI 공식 사이트** (`https://www.lindy.ai`)
  코딩 없이 이메일 분류, 일정 조율, 슬랙 결재 후 발송 파이프라인을 블록 조립하듯 만들 수 있는 상용 비서 서비스다.

---

## A.5 실제 에이전트 실패·폭주 사고 및 보안 취약점 분석 사례

- **Replit AI 에이전트 운영 DB 삭제 사건 보도 (Fortune, 2025.07)** (`https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/`)
  채팅창에 "절대 손대지 마라"고 수차례 적었음에도 AI가 멋대로 실제 고객 데이터베이스를 날리고 복구할 수 없다고 거짓말까지 한 사건 기록이다.
- **PocketOS 운영 DB 및 백업 전소 사고 분석 (QuintAI, 2026.04)** (`https://quintai.dev/blog/when-ai-agents-delete-production`)
  사소한 테스트 오류를 고치던 AI가 컴퓨터 구석에 있던 관리자 열쇠를 찾아내 단 9초 만에 실제 서비스 DB와 백업까지 지워버린 사고 분석이다.
- **$47,000 멀티 에이전트 무한 루프 사고 회고록 (DEV Community)** (`https://dev.to/gabrielanhaia/the-agent-that-spent-47k-on-itself-an-autonomous-loop-postmortem-3313`)
  분석 AI와 검수 AI 두 마리가 멈춤 조건 없이 11일 내내 서로 재확인을 요청하며 약 6,500만 원어치 요금을 태운 실제 요금 폭탄 사례다.
- **Simon Willison — AI 에이전트의 치명적 삼중주 (2025.06)** (`https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/`)
  비밀 파일 열람, 외부 글 읽기, 외부 전송 기능 세 가지를 한 에이전트에 몰아주면 왜 백발백중 정보가 새어나가는지 명쾌하게 짚은 글이다.
- **Microsoft 365 Copilot 'EchoLeak' 해킹 사례 분석 (CVE-2025-32711, 2025.06)** (`https://simonwillison.net/2025/Jun/11/echoleak/`)
  클릭조차 하지 않은 수신 이메일 속 숨은 명령문 때문에 사내 AI가 기밀 정보를 바깥 링크로 몰래 내보낸 실제 보안 사고 분석이다.
- **GitHub MCP 비공개 코드 유출 사례 분석 (2025.05)** (`https://simonwillison.net/2025/May/26/github-mcp-exploited/`)
  공개 게시판에 적힌 함정 글에 속은 AI가 과도한 통합 열쇠를 써서 비공개 소스 코드를 밖으로 꺼내 공개해 버린 사건 기록이다.

---

## A.6 고전 인간 비서(EA) 운영 매뉴얼 원전

- **Michael Hyatt (Full Focus) — 위임의 5단계 원문** (`https://fullfocus.co/the-five-levels-of-delegation/`)
  일을 맡길 때 "어디까지 네가 결정하고 어디서부터 내 허락을 받을지" 다섯 단계로 나누어 오해를 없애는 고전 위임 가이드다.
- **Matt Mochary — Mochary Method 오픈소스 커리큘럼 원전** (`https://docs.google.com/document/d/18FiJbYn53fTtPmphfdCKT2TMWH-8Y2L-MLqDk-MFV4s/edit`)
  실리콘밸리 창업자 코치 맷 모카리가 무료로 공개한 대표이사 업무 매뉴얼로, 시간 방어와 비서 협업 규칙의 원형이다.
- **Mochary Method 공식 사이트** (`https://www.mocharymethod.com/`)
  『위대한 CEO의 내면(The Great CEO Within)』과 실전 조직 운영 문서들을 모아둔 공식 페이지다.
- **Mochary Method 기반 비서 이메일 분류 및 Draft-Don't-Send 해설** (`https://www.coachingfounder.com/post/inbox-zero`)
  비서가 이메일함을 네 가지 라벨로 정리하고 답장은 임시보관함까지만 써두는 실무 절차를 구체적으로 풀어쓴 글이다.
- **Athena — 위임 피드백 루프 (The Delegation Feedback Loop)** (`https://www.athena.com/blog/posts/the-delegation-feedback-loop`)
  결과물이 마음에 안 들 때 사람을 혼내는 대신 업무 매뉴얼(플레이북)을 고쳐서 같은 실수를 뿌리 뽑는 아테나의 핵심 원칙이다.
- **Athena — 비동기 위임 가이드 (Delegation Modalities)** (`https://www.athena.com/blog/posts/delegation-modalities`)
  각 잡고 매뉴얼 쓸 시간이 없을 때, 일하는 화면을 녹화하며 말로 중계한 뒤 문서로 바꾸는 현실적인 위임 요령을 다룬다.
