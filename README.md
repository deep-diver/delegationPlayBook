# AI 에이전트 위임 플레이북

**평생 비서를 부려본 적 없는 실무자를 위한 시스템 설계서 — 기준을 설계하고 결과만 검증하는 AI 에이전트 위임 아키텍처**

![AI 에이전트 위임 플레이북 — 평생 비서를 부려본 적 없는 실무자를 위한 시스템 설계서](./book/assets/og_card.png)

> **“일의 실행은 위임하되, 기준의 설계와 검증의 책임은 절대 위임하지 마라.”**

- **디지털 단행본 바로 읽기:** **[https://deep-diver.github.io/delegationPlayBook/](https://deep-diver.github.io/delegationPlayBook/)**
- **전 권 단일 합본 페이지:** **[https://deep-diver.github.io/delegationPlayBook/full_book](https://deep-diver.github.io/delegationPlayBook/full_book)**

---

## 책 소개

유리창 안에서 질문에 답만 해주던 대화형 인공지능 시대를 지나, 목표를 받아 스스로 계획을 세우고 파일과 브라우저, 외부 도구를 연속 호출하며 현실의 업무 환경을 직접 바꾸는 **AI 에이전트**의 시대가 열렸다. 그러나 정작 일 잘하는 실무자일수록 에이전트 위임 앞에서 가장 먼저 좌절한다. 설명할 시간에 내가 직접 해치우는 편이 빠르다는 오랜 습관이 발목을 잡고, 아무런 기준 문서나 안전 관문 없이 에이전트에게 권한을 넘겼다가 환각과 도구 호출 폭주, 대외 오발송이나 원본 데이터 훼손 같은 운영 사고를 겪기 때문이다.

AI 에이전트는 행간을 눈치껏 헤아리는 인간 후배가 아니다. 무상태 세션과 유한한 컨텍스트 윈도우, 확률적 토큰 예측, 그리고 시스템 지침과 외부 유입 데이터를 스스로 구분하지 못하는 구조적 특성 위에서 작동하는 기계다. 따라서 필요한 것은 한 줄짜리 프롬프트 요령이 아니라 에이전트가 안전하고 정교하게 움직일 수밖에 없도록 설계된 시스템 구조다.

이 책은 매달 바뀌는 특정 서비스의 화면 조작법이나 수명이 짧은 명령어 모음을 다루지 않는다. 오랜 세월 검증된 수석 비서 운영 원칙과 시스템·보안 엔지니어링의 본질을 결합해, **모델과 세대가 바뀌어도 흔들리지 않는 AI 에이전트 위임 아키텍처**를 6개의 장과 10가지 실무 패턴으로 풀어낸 단행본이다.

---

## 전체 목차

| 장 | 제목 | 웹북 바로가기 | 핵심 주제 |
| :--- | :--- | :--- | :--- |
| **서문** | 왜 일 잘하는 실무자일수록 위임에 실패하는가 | [서문 읽기](https://deep-diver.github.io/delegationPlayBook/preface) | 대화형 모델에서 AI 에이전트로의 전환과 위임 아키텍처의 필연성 |
| **1장** | 실행자에서 설계자로 — 위임의 첫 번째 멘탈 모델 | [1장 읽기](https://deep-diver.github.io/delegationPlayBook/01_mental_model) | 기준·실행·검증 삼분법, 사람 비서와 AI 에이전트의 4가지 구조적 차이, 4대 성역 |
| **2장** | 머릿속 일머리의 구조화 — 암묵지를 세 겹의 맥락으로 꺼내는 법 | [2장 읽기](https://deep-diver.github.io/delegationPlayBook/02_context_architecture) | 컨텍스트 윈도우와 주의력 희석 방지, 원칙·배경·절차의 3계층 온디맨드 설계 |
| **3장** | 권한의 사다리와 비가역성의 관문 — 안전하게 고삐를 푸는 설계 | [3장 읽기](https://deep-diver.github.io/delegationPlayBook/03_authority_and_gates) | 도구 호출 5단계 권한 사다리, 간접 프롬프트 인젝션과 결정론적 하드 게이트 |
| **4장** | 실행 환경의 경계와 위임 토폴로지 — AI 에이전트가 일하는 공간과 흐름 설계 | [4장 읽기](https://deep-diver.github.io/delegationPlayBook/04_isolation_and_topology) | 실행 샌드박스 격리, 읽기·초안·실행 삼중 분리, 토큰 폭주 서킷 브레이커와 검증 병목 해소 |
| **5장** | 일상의 실무를 재설계하는 열 가지 AI 에이전트 위임 패턴 | [5장 읽기](https://deep-diver.github.io/delegationPlayBook/05_ten_delegation_patterns) | 수신함 초안 격리, 일정 방어, 원천 출처 검증, 침묵 원칙, 추론·연산 분리, 2단계 폭포수 승인 등 |
| **6장** | 프롬프트 잔소리 대신 시스템을 고쳐라 — 실패를 복리로 바꾸는 교정 아키텍처 | [6장 읽기](https://deep-diver.github.io/delegationPlayBook/06_calibration_loop) | 오작동의 4대 구조적 뿌리 진단, 시스템 지침 패치와 규칙 가지치기, 신뢰의 복리 곡선 |
| **부록** | AI 에이전트 위임 아키텍처 핵심 개념 사전 & 사상적 원류 | [부록 읽기](https://deep-diver.github.io/delegationPlayBook/appendix_references) | AI 에이전트 위임 핵심 개념 16선 해설과 경영·시스템·보안 사상의 원전 |
| **합본** | 전 권 통독 합본 | [전 권 통독](https://deep-diver.github.io/delegationPlayBook/full_book) | 서문부터 부록까지 한 페이지에 담은 무손실 단일 에디션 |
