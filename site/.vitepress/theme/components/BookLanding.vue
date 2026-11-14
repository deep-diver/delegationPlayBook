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
    part: '시작하기',
    title: '서문: 왜 일 잘하는 실무자일수록 AI에게 일을 못 맡길까',
    summary:
      '설명할 시간에 내가 직접 해버리는 습관이 어떻게 내 생산성의 천장이 되는지 짚어보고, 수십 년간 검증된 수석 비서 운영 원칙을 AI 작업 방식에 맞게 다시 짭니다.',
    artifacts: ['직군별 읽는 순서', '5단계 적용 로드맵', '시작 전 1분 점검표'],
    link: '/preface',
  },
  {
    code: 'CHAPTER 01',
    part: 'Part I · 관점 바꾸기',
    title: '멘탈 모델의 전환 — 직접 뛰는 실무자에서 시스템을 짜는 설계자로',
    summary:
      '혼자 다 끌어안던 일을 기준 적기·실행 맡기기·결과 확인하기 세 단계로 쪼개고, 첫 위임 대상을 고르는 기준과 절대 AI에게 넘기면 안 되는 4가지 금지선을 긋습니다.',
    artifacts: ['MINIMAL_SPEC_PROMPT', '위임 손익 계산법', 'task_audit_sheet.md'],
    link: '/01_mental_model',
  },
  {
    code: 'CHAPTER 02',
    part: 'Part I · 내 기준 문서화',
    title: '나를 문서화하기 (Personal OS)',
    summary:
      '내 머릿속에만 있던 일머리와 호불호를 평문 파일 3장으로 꺼내 적습니다. 매번 채팅창에 구구절절 설명하지 않아도 AI가 내 맥락을 알고 움직이게 만듭니다.',
    artifacts: ['USER.md', 'SOUL.md', 'PLAYBOOK.md', 'CLAUDE.md / AGENTS.md'],
    link: '/02_personal_os',
  },
  {
    code: 'CHAPTER 03',
    part: 'Part I · 안전 자물쇠',
    title: '위임의 기술과 안전 게이트 설계',
    summary:
      '말로 "절대 지우지 마"라고 당부하는 건 브레이크가 아닙니다. 발송 대신 초안만 만들게 가두고, 설정 파일과 차단 스크립트로 되돌릴 수 없는 사고를 원천 봉쇄합니다.',
    artifacts: ['5줄 지시 양식', 'settings.json', 'block_irreversible.py'],
    link: '/03_delegation_gates',
  },
  {
    code: 'CHAPTER 04',
    part: 'Part II · 실전 레시피',
    title: '실전 환경 구축 및 업무 위임 시나리오 10선',
    summary:
      '웹·앱 UI 도구와 로컬 CLI 환경을 안전하게 세팅하고, 메일 정리·일정 방어·자료 조사·문서 초안·코드 손질까지 현업에서 매일 쓰는 10가지 레시피를 바로 돌립니다.',
    artifacts: ['SOP-01 ~ SOP-10', '.mcp.json.example', '30초 검수 기준'],
    link: '/04_setup_and_cases',
  },
  {
    code: 'CHAPTER 05',
    part: 'Part II · 실수 고치기',
    title: '교정과 진화 (Calibration Loop)',
    summary:
      '채팅창에 하는 잔소리는 창을 닫으면 날아가는 포스트잇입니다. 10초 만에 실수 원인을 찾아 문서에 규칙 두 줄을 보태고, 매주 더 똑똑해지는 시스템을 만듭니다.',
    artifacts: ['10초 원인 진단 트리', '규칙 패치 프롬프트', 'WEEKLY_AGENT_AUDIT.md'],
    link: '/05_calibration_loop',
  },
  {
    code: 'CHAPTER 06',
    part: 'Part II · 당장 시작하기',
    title: '월요일 오전 30분 세팅 가이드 & 원페이지 치트시트',
    summary:
      '비개발자와 개발자 각각 월요일 출근 직후 30분 안에 첫 위임을 성공시키는 분 단위 실행표와, 모니터 옆에 붙여두는 한 장 요약표 및 막힐 때 보는 7문 7답을 담았습니다.',
    artifacts: ['30분 실행 시간표', '한 장 치트시트', '실전 FAQ 7문 7답'],
    link: '/06_quickstart_cheatsheet',
  },
  {
    code: 'APPENDIX & KIT',
    part: '부록 & 스타터 킷',
    title: '5초 만에 이해하는 핵심 용어 사전, 검증된 출처 & Starter Kit',
    summary:
      '낯선 기술 용어 18개를 일상 비유로 명쾌하게 풀어쓰고, 본문에 인용한 실제 사고 사례와 원전 출처 38건, 1분 만에 복제해 쓰는 스타터 킷 12종을 함께 묶었습니다.',
    artifacts: ['18개 쉬운 용어사전', '검증 출처 38선', 'starter-kit.zip'],
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
            <span class="eyebrow-tag">A PRACTICAL GUIDE FOR HANDS-ON DOERS</span>
            <span class="eyebrow-sep">·</span>
            <span class="eyebrow-edition">DIGITAL BOOK EDITION</span>
          </div>

          <h1 class="hero-title">
            평생 비서를 부려본 적 없는<br />
            실무자를 위한<br />
            <span class="hero-title-accent">AI 에이전트 위임 플레이북</span>
          </h1>

          <div class="hero-accent-bar" aria-hidden="true"></div>

          <p class="hero-subtitle">
            "내가 직접 하는 게 빠르다"는 함정에서 벗어나, 내 일머리를 문서로 적고 결과만 30초 만에 검수하는 실전 시스템 설계서
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
            <a :href="withBase('/starter-kit')">Starter Kit 12종 파일 웹에서 바로 보기</a>
            <span aria-hidden="true">·</span>
            <a
              :href="withBase('/full_book.md')"
              download="delegation-playbook-full_book.md"
            >
              합본 마크다운 원문(full_book.md) 내려받기
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
              코딩도, 검은 터미널 창도 필요 없습니다. 평소 쓰는 Claude, ChatGPT, Notion AI 설정창에
              <code>USER.md</code>·<code>SOUL.md</code>·<code>PLAYBOOK.md</code> 세 장을 올리고 발송 대신 초안만 쌓이는 안전한 루틴부터 시작합니다.
            </p>
            <a class="track-link" :href="withBase('/06_quickstart_cheatsheet')">
              월요일 오전 30분 UI 세팅 가이드 보기 →
            </a>
          </div>

          <div class="track-card">
            <div class="track-badge track-badge-slate">TRACK B · 개발 · 엔지니어 트랙</div>
            <h3>개발자 · 데이터 분석가 · 테크 리드</h3>
            <p>
              Claude Code, Codex CLI, OpenClaw, MCP 환경에서 <code>CLAUDE.md</code>·<code>AGENTS.md</code>로 작업 규칙을 고정하고,
              말로 타이르는 대신 <code>settings.json</code>과 <code>PreToolUse</code> 훅으로 사고를 물리적으로 잠급니다.
            </p>
            <a class="track-link" :href="withBase('/03_delegation_gates')">
              권한 잠금과 차단 훅 설계 바로 보기 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter Grid Section -->
    <section class="landing-chapters">
      <div class="landing-container">
        <div class="section-header">
          <span class="section-eyebrow">INSIDE THE PLAYBOOK</span>
          <h2>처음부터 끝까지 바로 복사해 쓰는 실전 매뉴얼</h2>
          <p>
            뜬구름 잡는 미래 예측이나 거창한 이론은 다 뺐습니다. 왜 내 위임이 매번 실패했는지 짚어내고, 오늘 당장 내 업무 폴더에 심을 수 있는 기준표와 설정 코드만 남겼습니다.
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
            <span class="section-eyebrow">START IN 3 MINUTES</span>
            <h3>백지 앞에서 막막해하지 마세요. 빈칸만 채우면 끝나는 12종 스타터 킷을 준비했습니다.</h3>
            <p>
              <code>USER.md</code>, <code>SOUL.md</code>, <code>PLAYBOOK.md</code>, <code>CLAUDE.md</code>부터
              사고 방지용 <code>.claude/settings.json</code>과 <code>block_irreversible.py</code>까지 한 폴더에 들어 있습니다.
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
              수록 파일 미리보기
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
