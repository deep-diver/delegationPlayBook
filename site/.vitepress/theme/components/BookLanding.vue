<script setup lang="ts">
import { withBase } from 'vitepress';

interface ChapterCard {
  code: string;
  part: string;
  title: string;
  summary: string;
  artifacts: string[];
  link: string;
}

const chapters: ChapterCard[] = [
  {
    code: 'PREFACE',
    part: 'Front Matter',
    title: '서문: 왜 유능한 실무자(IC)일수록 에이전트 위임에 실패하는가',
    summary:
      '내가 직접 하는 게 빠르다는 함정의 구조적 원인을 해부하고, 고전 인간 비서(EA) 운영 3대 원전을 AI 엔지니어링 규칙으로 재해석합니다.',
    artifacts: ['독자 트랙 가이드', '5단계 적용 로드맵', '자가 점검표'],
    link: '/preface',
  },
  {
    code: 'CHAPTER 01',
    part: 'Part I · 설계 원리',
    title: '멘탈 모델의 전환 — 실무자(IC)에서 시스템 아키텍트로',
    summary:
      '단일 스레드 직접 실행에서 명세·실행·검증 3단 분리 구조로 전환하고, 인간 비서와 다른 AI 에이전트의 4대 물리적 특성과 절대 위임 금지 영역(Red Lines)을 정의합니다.',
    artifacts: ['MINIMAL_SPEC_PROMPT', '위임 ROI 공식', 'task_audit_sheet.md'],
    link: '/01_mental_model',
  },
  {
    code: 'CHAPTER 02',
    part: 'Part I · 개인 OS',
    title: '나를 문서화하기 (Personal OS)',
    summary:
      '머릿속 암묵지를 3단계 프로토콜로 추출하여 상용 UI 에이전트와 CLI 런타임 모두에서 작동하는 3계층 개인 운영체제 문서 스택을 구축합니다.',
    artifacts: ['USER.md', 'SOUL.md', 'PLAYBOOK.md', 'CLAUDE.md / AGENTS.md'],
    link: '/02_personal_os',
  },
  {
    code: 'CHAPTER 03',
    part: 'Part I · 안전 통제',
    title: '위임의 기술과 물리적 승인 게이트 설계',
    summary:
      '마이클 하얏트 위임 5단계를 물리적 도구 권한으로 번역하고, Draft-Don\'t-Send 원칙과 하드웨어급 차단 훅으로 오발송·삭제·인젝션 사고를 원천 봉쇄합니다.',
    artifacts: ['5요소 위임 명세서', 'settings.json', 'block_irreversible.py'],
    link: '/03_delegation_gates',
  },
  {
    code: 'CHAPTER 04',
    part: 'Part II · 실전 파이프라인',
    title: '실전 환경 구축 및 업무 위임 시나리오 10선',
    summary:
      '로컬·게이트웨이형과 상용 UI 에이전트 환경을 세팅하고 이메일 트리아지, 캘린더 방어, 리서치, 문서 초안, 코드 리팩토링 등 10대 핵심 SOP를 이식합니다.',
    artifacts: ['SOP-01 ~ SOP-10', '.mcp.json.example', '30초 검수 기준'],
    link: '/04_setup_and_cases',
  },
  {
    code: 'CHAPTER 05',
    part: 'Part II · 복리 진화',
    title: '교정과 진화 (Calibration Loop)',
    summary:
      '채팅창 잔소리를 멈추고 10초 실패 진단 트리로 원본 규칙 파일을 패치하여, 시간이 지날수록 위임 정확도가 복리로 쌓이는 주간 감사 루프를 완성합니다.',
    artifacts: ['10초 진단 트리', 'CALIBRATION_PATCH', 'WEEKLY_AGENT_AUDIT.md'],
    link: '/05_calibration_loop',
  },
  {
    code: 'CHAPTER 06',
    part: 'Part II · 즉시 실행',
    title: '실전 부트스트랩 — 월요일 오전 30분 세팅 & 원페이지 치트시트',
    summary:
      '비개발 직군과 개발 직군 각각의 월요일 오전 30분 타임라인 구축 가이드, 책상 앞 원페이지 의사결정 치트시트, 실전 도입 FAQ 7문 7답을 제공합니다.',
    artifacts: ['30분 부트스트랩', '원페이지 치트시트', '실전 FAQ 7문 7답'],
    link: '/06_quickstart_cheatsheet',
  },
  {
    code: 'APPENDIX & KIT',
    part: 'Back Matter',
    title: '핵심 용어 사전, 검증된 1차 출처 레퍼런스 & Starter Kit',
    summary:
      '18개 필수 엔지니어링·위임 용어 사전, 전수 검증된 공식 문서·포스트모템·EA 원전 출처 목록과 1분 만에 복제 가능한 12종 스타터 킷을 수록합니다.',
    artifacts: ['18개 핵심 용어사전', '검증 출처 아카이브', 'starter-kit.zip'],
    link: '/appendix_references',
  },
];
</script>

<template>
  <div class="book-landing">
    <!-- Hero Section -->
    <section class="landing-hero">
      <div class="landing-hero-inner">
        <div class="hero-copy">
          <div class="hero-eyebrow">
            <span class="eyebrow-tag">SYSTEMS ARCHITECTURE MONOGRAPH · NO. 01</span>
            <span class="eyebrow-sep">/</span>
            <span class="eyebrow-edition">WEB EDITION</span>
          </div>

          <h1 class="hero-title">
            평생 비서를 부려본 적 없는<br />
            실무자를 위한<br />
            <span class="hero-title-accent">AI 에이전트 위임 플레이북</span>
          </h1>

          <div class="hero-accent-bar" aria-hidden="true"></div>

          <p class="hero-subtitle">
            직접 해버리는 습관을 버리고 명세(Specification)와 검증(Verification)으로 일하는 개인 시스템 설계서
          </p>

          <blockquote class="hero-credo">
            <span class="credo-label">CORE PRINCIPLE // SPECIFY → DELEGATE → VERIFY</span>
            <p>
              “일의 실행(Execution)은 위임하되, 기준의 설계(Specification)와 검증의 책임(Verification)은 절대 위임하지 마라.”
            </p>
          </blockquote>

          <div class="hero-actions">
            <a class="btn-book btn-primary" :href="withBase('/preface')">
              <span>서문부터 읽기</span>
              <span class="btn-arrow" aria-hidden="true">→</span>
            </a>

            <a
              class="btn-book btn-secondary"
              :href="withBase('/starter-kit.zip')"
              download="delegation-playbook-starter-kit.zip"
            >
              <span>Starter Kit (.zip) 다운로드</span>
            </a>

            <a class="btn-book btn-outline" :href="withBase('/full_book')">
              <span>단일 합본 읽기</span>
            </a>
          </div>

          <div class="hero-meta-links">
            <a :href="withBase('/starter-kit')">Starter Kit 수록 파일 웹에서 미리보기</a>
            <span aria-hidden="true">·</span>
            <a
              :href="withBase('/full_book.md')"
              download="delegation-playbook-full_book.md"
            >
              원문 합본 마크다운(full_book.md) 다운로드
            </a>
          </div>
        </div>

        <div class="hero-cover-col">
          <a class="cover-showcase" :href="withBase('/preface')" aria-label="서문부터 읽기">
            <div class="cover-frame">
              <img
                :src="withBase('/assets/cover.png')"
                alt="평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북 도서 표지"
                loading="eager"
              />
            </div>
            <div class="cover-caption">
              <span>SPECIFY · DELEGATE · VERIFY</span>
              <span>전 6장 + 부록 + 실전 스타터 킷</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Reader Track Strip -->
    <section class="landing-tracks">
      <div class="landing-container">
        <div class="tracks-grid">
          <div class="track-card">
            <div class="track-badge">TRACK A · 비개발 실무자 트랙</div>
            <h3>기획자 · 마케터 · 리서처 · 운영 · 1인 창업가</h3>
            <p>
              터미널 설치 없이 Claude Projects, Cowork, ChatGPT, Notion AI 설정창에
              <code>USER.md</code>·<code>SOUL.md</code>·<code>PLAYBOOK.md</code> 3계층 규칙과 초안 전용(Draft-Only) 워크플로우를 즉시 이식합니다.
            </p>
            <a class="track-link" :href="withBase('/06_quickstart_cheatsheet')">
              월요일 30분 UI 트랙 부트스트랩 바로가기 →
            </a>
          </div>

          <div class="track-card">
            <div class="track-badge track-badge-slate">TRACK B · 개발 · 엔지니어 트랙</div>
            <h3>소프트웨어 엔지니어 · 데이터 분석가 · 테크 리드</h3>
            <p>
              Claude Code, Codex CLI, OpenClaw, MCP 환경에서 <code>CLAUDE.md</code>·<code>AGENTS.md</code> 단일 진실 공급원과
              <code>settings.json</code>·<code>PreToolUse</code> 물리적 차단 훅을 구축합니다.
            </p>
            <a class="track-link" :href="withBase('/03_delegation_gates')">
              하드 권한 게이트 & 훅 아키텍처 바로가기 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter Grid Section -->
    <section class="landing-chapters">
      <div class="landing-container">
        <div class="section-header">
          <span class="section-eyebrow">COMPLETE ARCHITECTURE &amp; SYLLABUS</span>
          <h2>전체 챕터 구성 및 핵심 산출물</h2>
          <p>
            미사여구와 추상적 미래 예측을 배제한 실무 엔지니어링 매뉴얼입니다. 각 장의 템플릿과 설정 코드는 즉시 복사해 현업에 투입할 수 있습니다.
          </p>
        </div>

        <div class="chapters-grid">
          <a
            v-for="ch in chapters"
            :key="ch.code"
            class="chapter-card"
            :href="withBase(ch.link)"
          >
            <div class="chapter-card-top">
              <span class="chapter-code">{{ ch.code }}</span>
              <span class="chapter-part">{{ ch.part }}</span>
            </div>
            <h3 class="chapter-title">{{ ch.title }}</h3>
            <p class="chapter-summary">{{ ch.summary }}</p>
            <div class="chapter-artifacts">
              <span v-for="art in ch.artifacts" :key="art" class="artifact-pill">
                {{ art }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Bottom Resource Bar -->
    <section class="landing-footer-cta">
      <div class="landing-container">
        <div class="footer-cta-box">
          <div>
            <span class="section-eyebrow">READY-TO-CLONE WORKSPACE</span>
            <h3>빈 화면에서 시작하지 마십시오. 검증된 12종 스타터 킷으로 3분 안에 세팅하십시오.</h3>
            <p>
              <code>USER.md</code>, <code>SOUL.md</code>, <code>PLAYBOOK.md</code>, <code>CLAUDE.md</code>,
              <code>.claude/settings.json</code>, <code>block_irreversible.py</code>가 모두 포함되어 있습니다.
            </p>
          </div>
          <div class="footer-cta-buttons">
            <a
              class="btn-book btn-primary"
              :href="withBase('/starter-kit.zip')"
              download="delegation-playbook-starter-kit.zip"
            >
              Starter Kit (.zip) 다운로드
            </a>
            <a class="btn-book btn-outline" :href="withBase('/starter-kit')">
              구성 파일 열람하기
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
