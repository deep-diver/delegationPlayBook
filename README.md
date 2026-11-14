# 평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북

**직접 해버리는 습관을 버리고 명세(Specification)와 검증(Verification)으로 일하는 개인 시스템 설계서**

![THE AI AGENT DELEGATION PLAYBOOK](./book/assets/og_card.png)

> **“일의 실행(Execution)은 위임하되, 기준의 설계(Specification)와 검증의 책임(Verification)은 절대 위임하지 마라.”**

- **라이브 인터랙티브 웹북 (Digital Book Web Edition):** **[https://deep-diver.github.io/delegationPlayBook/](https://deep-diver.github.io/delegationPlayBook/)**
- **실전 스타터 킷 원클릭 다운로드 (.zip):** **[starter-kit.zip](https://deep-diver.github.io/delegationPlayBook/starter-kit.zip)**
- **단일 합본 원문 다운로드 (.md):** **[full_book.md](https://deep-diver.github.io/delegationPlayBook/full_book.md)**

---

## 도서 소개

숙련된 실무자(IC, Individual Contributor)가 AI 에이전트 도입에 실패하는 원인은 모델 성능 부족이 아니다. 머릿속 암묵지를 생략한 채 한 줄 지시를 던지고, 안전장치 없이 권한을 열었다가 검증 병목과 운영 사고를 겪기 때문이다.

이 플레이북은 수십 년간 검증된 고전 인간 비서(EA) 운영 원전(Michael Hyatt 위임 5단계, Matt Mochary `Draft-Don't-Send`, Athena 비동기 SOP 피드백 루프)을 현대 AI 에이전트 엔지니어링(`USER.md`·`SOUL.md`·`PLAYBOOK.md` 3계층 문서 스택, 물리적 권한 차단 설정 및 `PreToolUse` 훅, 30초 검증 포맷)으로 재설계한 실무 매뉴얼이다.

- **비개발 실무자 트랙 (기획 · 마케팅 · 리서치 · 운영 · 창업자):** 터미널 설치 없이 Claude Projects / Cowork, ChatGPT, Notion AI 환경에 개인 OS 3계층과 초안 전용(Draft-Only) 파이프라인을 이식하는 절차를 다룬다.
- **개발 · 엔지니어 트랙 (소프트웨어 엔지니어 · 데이터 분석가 · 테크 리드):** Claude Code, Codex CLI, OpenClaw, MCP 환경에서 `CLAUDE.md`·`AGENTS.md` 단일 진실 공급원, `.claude/settings.json` 차단 규칙, `block_irreversible.py` 훅을 구축하는 방법을 다룬다.

---

## 전체 원고 목차 (`book/`)

모든 원고는 [`book/`](./book/) 디렉토리에 순수 마크다운으로 수록되어 있으며, 웹북에서 최적화된 타이포그래피와 전문 검색으로 읽을 수 있다.

| 구분 | 원고 파일 (`book/`) | 웹북 바로가기 | 핵심 산출물 |
| :--- | :--- | :--- | :--- |
| **서문** | [`book/README.md`](./book/README.md) | [서문 읽기](https://deep-diver.github.io/delegationPlayBook/preface) | 직군별 독서 트랙, 5단계 적용 로드맵, 착수 전 자가 점검표 |
| **Chapter 1** | [`book/01_mental_model.md`](./book/01_mental_model.md) | [Ch 1 읽기](https://deep-diver.github.io/delegationPlayBook/01_mental_model) | `MINIMAL_SPEC_PROMPT`, 위임 ROI 공식, `task_audit_sheet.md`, 위임 금지 4대 영역 |
| **Chapter 2** | [`book/02_personal_os.md`](./book/02_personal_os.md) | [Ch 2 읽기](https://deep-diver.github.io/delegationPlayBook/02_personal_os) | 암묵지 추출 프로토콜, `USER.md` · `SOUL.md` · `PLAYBOOK.md` · `AGENTS.md` 전문 |
| **Chapter 3** | [`book/03_delegation_gates.md`](./book/03_delegation_gates.md) | [Ch 3 읽기](https://deep-diver.github.io/delegationPlayBook/03_delegation_gates) | 위임 5단계 권한 매핑, `DELEGATION_BRIEF_TEMPLATE.md`, `settings.json`, 차단 훅 |
| **Chapter 4** | [`book/04_setup_and_cases.md`](./book/04_setup_and_cases.md) | [Ch 4 읽기](https://deep-diver.github.io/delegationPlayBook/04_setup_and_cases) | 샌드박스 초기화, 읽기 전용 MCP 설정, 인박스·캘린더·리서치·코드 등 10대 실무 SOP |
| **Chapter 5** | [`book/05_calibration_loop.md`](./book/05_calibration_loop.md) | [Ch 5 읽기](https://deep-diver.github.io/delegationPlayBook/05_calibration_loop) | 10초 실패 원인 진단 트리, 패치 메타 프롬프트, 주간 15분 감사 시트 |
| **Chapter 6** | [`book/06_quickstart_cheatsheet.md`](./book/06_quickstart_cheatsheet.md) | [Ch 6 읽기](https://deep-diver.github.io/delegationPlayBook/06_quickstart_cheatsheet) | 월요일 오전 30분 세팅 런북, 원페이지 의사결정 치트시트, 실전 도입 FAQ 7문 7답 |
| **Appendix** | [`book/appendix_references.md`](./book/appendix_references.md) | [부록 읽기](https://deep-diver.github.io/delegationPlayBook/appendix_references) | 18개 핵심 용어 사전(Glossary) 및 검증된 1차 출처 레퍼런스 38선 |
| **통합본** | [`book/full_book.md`](./book/full_book.md) | [단일 합본 통독](https://deep-diver.github.io/delegationPlayBook/full_book) | 서문 + Ch 1~6 + 부록 무손실 단일 문서 통합본 (2,710라인) |

---

## 실전 스타터 킷 사용법 (`starter-kit/`)

[`starter-kit/`](./starter-kit/) 폴더에는 본문에서 설계한 핵심 온보딩 문서와 안전 게이트 스크립트 12개 파일이 즉시 복제 가능한 형태로 패키징되어 있다. 상세 세팅 순서는 [`starter-kit/README.md`](./starter-kit/README.md)를 참고한다.

### 1. 로컬 CLI / 코드·문서 에이전트 워크스페이스 세팅 (3분)

```bash
# 1) 전용 격리 작업 디렉토리 생성 및 스타터 킷 복사
mkdir -p ~/agent-workspace
cp -R starter-kit/. ~/agent-workspace/

# 2) PreToolUse 비가역 명령 차단 훅 실행 권한 확인
chmod +x ~/agent-workspace/.claude/hooks/block_irreversible.py

# 3) USER.md, SOUL.md 내 대괄호([ ]) 항목을 본인 업무 맥락으로 기입 후 에이전트 실행
```

### 2. 상용 UI 에이전트 세팅 (Claude Projects / ChatGPT / Notion AI)

1. 에이전트 프로젝트 지침(Custom Instructions / Project Knowledge)에 [`starter-kit/USER.md`](./starter-kit/USER.md)와 [`starter-kit/SOUL.md`](./starter-kit/SOUL.md)를 업로드하고 대괄호(`[ ]`) 항목을 채운다.
2. 반복 위임할 업무 1건을 [`starter-kit/task_audit_sheet.md`](./starter-kit/task_audit_sheet.md)로 선정한 뒤 [`starter-kit/PLAYBOOK.md`](./starter-kit/PLAYBOOK.md) 및 [`starter-kit/DELEGATION_BRIEF_TEMPLATE.md`](./starter-kit/DELEGATION_BRIEF_TEMPLATE.md) 규격으로 지시한다.
3. 외부 전송(`Send`)·원본 삭제 권한을 비활성화하고 초안 생성(Draft-Only) 모드로 운용하며, 매주 금요일 [`starter-kit/WEEKLY_AGENT_AUDIT.md`](./starter-kit/WEEKLY_AGENT_AUDIT.md)로 규칙 파일을 패치한다.

---

## 저장소 디렉토리 구조 및 로컬 웹북 빌드

```text
delegationPlayBook/
├── book/                  # 전자책 원본 마크다운 원고 (서문, Ch 1~6, 부록, 합본) 및 도식 에셋 10종
├── starter-kit/           # 즉시 복제용 Personal OS 템플릿 및 하드 권한 게이트 스크립트 12종
├── scripts/               # 원본 무손실 동기화 및 starter-kit.zip 패키징 빌드 스크립트
├── site/                  # VitePress 디지털 북 테마, 한국어 검색 설정 및 커스텀 컴포넌트
└── .github/workflows/     # GitHub Pages 자동 빌드·배포 워크플로우 (deploy.yml)
```

로컬에서 웹북을 실행하거나 정적 빌드를 검증하려면 Node.js 22+ 환경에서 아래 명령을 실행한다.

```bash
npm ci
npm run dev     # 로컬 개발 서버 실행 (http://localhost:5173/delegationPlayBook/)
npm run build   # 엄격 모드(--strict) 에셋·링크 검증 및 정적 사이트 빌드 (site/.vitepress/dist)
```
