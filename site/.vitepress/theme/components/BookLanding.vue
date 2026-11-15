<script setup lang="ts">
import { withBase } from 'vitepress';

interface ChapterCard {
  code: string;
  part: string;
  title: string;
  question: string;
  themes: string[];
  link: string;
}

const chapters: ChapterCard[] = [
  {
    code: 'PREFACE',
    part: '시작하며',
    title: '서문. 왜 일 잘하는 실무자일수록 위임에 실패하는가',
    question:
      '유리창 안에서 답만 하던 대화형 인공지능을 넘어 외부 도구를 직접 실행하는 AI 에이전트 시대에, 왜 유능한 실무자일수록 위임에 실패하고 운영 사고를 겪는가.',
    themes: ['추론과 도구 실행 루프', '유능한 실무자의 역설', '위임 아키텍처'],
    link: '/preface',
  },
  {
    code: 'CHAPTER 01',
    part: '제1부 · 컨텍스트와 권한',
    title: '1장. 실행자에서 설계자로 — 위임의 첫 번째 멘탈 모델',
    question:
      '무상태 세션과 확률적 토큰 예측 위에서 움직이는 AI 에이전트는 사람 비서와 어떻게 다르며, 결과물의 품질을 장악하려면 일의 양 끝단 어디를 붙잡아야 하는가.',
    themes: ['기준·실행·검증 삼분법', '사람과 AI 에이전트의 4대 차이', '위임 금지 4대 성역'],
    link: '/01_mental_model',
  },
  {
    code: 'CHAPTER 02',
    part: '제1부 · 컨텍스트와 권한',
    title: '2장. 머릿속 일머리의 구조화 — 암묵지를 세 겹의 맥락으로 꺼내는 법',
    question:
      '유한한 컨텍스트 윈도우 안에서 주의력 희석과 중간 맥락 망각을 피하려면, 내 머릿속 판단 기준을 어떻게 상시 지침과 온디맨드 절차로 분리해 주입해야 하는가.',
    themes: ['컨텍스트 윈도우 설계', '시스템 헌법과 배경 맥락', '온디맨드 절차 로딩', '주의력 희석 방지'],
    link: '/02_context_architecture',
  },
  {
    code: 'CHAPTER 03',
    part: '제1부 · 컨텍스트와 권한',
    title: '3장. 권한의 사다리와 비가역성의 관문 — 안전하게 고삐를 푸는 설계',
    question:
      '시스템 지침과 외부 유입 데이터를 구분하지 못하는 언어 모델 앞에서 왜 프롬프트 당부는 무력해지며, 도구 호출 길목 어디에 결정론적 하드 게이트를 세워야 하는가.',
    themes: ['도구 호출 5단계 권한 사다리', '간접 프롬프트 인젝션', '초안 스테이징 격리', '결정론적 하드 게이트'],
    link: '/03_authority_and_gates',
  },
  {
    code: 'CHAPTER 04',
    part: '제2부 · 실행 경계와 교정',
    title: '4장. 실행 환경의 경계와 위임 토폴로지 — AI 에이전트가 일하는 공간과 흐름 설계',
    question:
      '원본 데이터를 지키는 실행 샌드박스 격리와 치명적 삼중 결합 절단, 그리고 멀티 에이전트의 무한 루프 토큰 폭발과 인간의 검토 병목을 동시에 푸는 구조는 무엇인가.',
    themes: ['실행 샌드박스 격리', '치명적 삼중 결합 절단', '예산·턴 서킷 브레이커', '3단 압축 검증 출력'],
    link: '/04_isolation_and_topology',
  },
  {
    code: 'CHAPTER 05',
    part: '제2부 · 실행 경계와 교정',
    title: '5장. 일상의 실무를 재설계하는 열 가지 AI 에이전트 위임 패턴',
    question:
      '수신함 초안 격리부터 일정 방어, 원천 출처 검증, 정량 연산 도구 분리, 기획서 2단계 폭포수 승인까지 매일 반복되는 10가지 실무를 어떻게 재설계할 것인가.',
    themes: ['초안 보관함 격리', '무변화 시 침묵 원칙', '확률 추론과 결정론적 연산 분리', '2단계 폭포수 승인'],
    link: '/05_ten_delegation_patterns',
  },
  {
    code: 'CHAPTER 06',
    part: '제2부 · 실행 경계와 교정',
    title: '6장. 프롬프트 잔소리 대신 시스템을 고쳐라 — 실패를 복리로 바꾸는 교정 아키텍처',
    question:
      '세션이 닫히면 증발하는 채팅창 재지시를 멈추고, 에이전트 오작동의 4대 구조적 원인을 10초 만에 진단해 시스템 지침 자산으로 축적하는 방법은 무엇인가.',
    themes: ['4대 구조적 원인 진단', '시스템 지침 패치', '규칙 가지치기', '신뢰의 복리 곡선'],
    link: '/06_calibration_loop',
  },
  {
    code: 'APPENDIX',
    part: '부록',
    title: '부록. AI 에이전트 위임 아키텍처 핵심 개념 사전 & 사상적 원류',
    question:
      '모델 세대가 바뀌어도 흔들리지 않는 AI 에이전트 위임 아키텍처 핵심 개념 16선과, 이 책의 뼈대를 이룬 경영·시스템·보안 사상의 고전 원전들은 무엇인가.',
    themes: ['AI 에이전트 핵심 개념 16선', '프롬프트 인젝션·보안 원류', '고전 시스템·경영 원전'],
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
            <span class="eyebrow-tag">AI AGENT DELEGATION ARCHITECTURE</span>
            <span class="eyebrow-sep">·</span>
            <span class="eyebrow-edition">DIGITAL MONOGRAPH</span>
          </div>

          <h1 class="hero-title">
            평생 비서를 부려본 적 없는<br />
            실무자를 위한<br />
            <span class="hero-title-accent">AI 에이전트 위임 플레이북</span>
          </h1>

          <div class="hero-accent-bar" aria-hidden="true"></div>

          <p class="hero-subtitle">
            수명 짧은 프롬프트 요령을 넘어, 컨텍스트 윈도우와 도구 호출 관문, 교정 루프로 완성하는 AI 에이전트 시스템 설계서
          </p>

          <blockquote class="hero-credo">
            <span class="credo-label">CORE ARCHITECTURE</span>
            <p>
              “일의 실행은 위임하되, 기준의 설계와 검증의 책임은 절대 위임하지 마라.”
            </p>
          </blockquote>

          <div class="hero-actions">
            <a class="btn-book btn-primary" :href="withBase('/preface')">
              <span>서문부터 읽기</span>
              <span class="btn-arrow" aria-hidden="true">→</span>
            </a>

            <a class="btn-book btn-outline" :href="withBase('/full_book')">
              <span>전 권 한 호흡으로 통독하기</span>
            </a>
          </div>

          <div class="hero-meta-links">
            <a :href="withBase('/01_mental_model')">1장 바로 펼치기</a>
            <span aria-hidden="true">·</span>
            <a :href="withBase('/appendix_references')">핵심 개념 사전 보기</a>
            <span aria-hidden="true">·</span>
            <a
              :href="withBase('/full_book.md')"
              download="delegation-playbook.md"
            >
              합본 원문 텍스트 내려받기
            </a>
          </div>
        </div>

        <div class="hero-cover-col">
          <a class="cover-showcase" :href="withBase('/preface')" aria-label="서문부터 읽기">
            <div class="cover-frame">
              <img
                :src="withBase('/assets/cover.png')"
                alt="AI 에이전트 위임 플레이북 — 평생 비서를 부려본 적 없는 실무자를 위한 시스템 설계서 표지"
                loading="eager"
              />
            </div>
            <div class="cover-caption">
              <span>SPECIFY · DELEGATE · VERIFY</span>
              <span>서문 · 전 6장 · 부록 수록</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Three Timeless Pillars Strip -->
    <section class="landing-tracks">
      <div class="landing-container">
        <div class="pillars-grid">
          <div class="track-card">
            <div class="track-badge">PILLAR 01 · 컨텍스트 아키텍처</div>
            <h3>암묵지를 세 겹의 컨텍스트 구조로</h3>
            <p>
              AI 에이전트의 오작동은 모델 지능의 부족보다 컨텍스트 설계의 실패에서 비롯된다. 주의력 희석을 막기 위해 상시 주입할 시스템 원칙·배경 맥락과 온디맨드 작업 절차를 분리하는 법을 다룬다.
            </p>
          </div>

          <div class="track-card">
            <div class="track-badge track-badge-slate">PILLAR 02 · 도구 호출 관문과 샌드박스</div>
            <h3>프롬프트 당부 대신 결정론적 하드 게이트로</h3>
            <p>
              외부 문서에 숨은 간접 프롬프트 인젝션 앞에서는 언어적 금지선이 무력해진다. 실행 샌드박스 격리와 초안 스테이징 영역, 도구 호출 승인 관문으로 비가역적 사고를 원천 차단하는 구조를 밝힌다.
            </p>
          </div>

          <div class="track-card">
            <div class="track-badge">PILLAR 03 · 검증 압축과 교정 루프</div>
            <h3>휘발되는 세션 잔소리를 시스템 지침 자산으로</h3>
            <p>
              초고속 토큰 생성 시대에는 인간의 검토 속도가 유일한 병목이 된다. 30초 만에 급소를 판정하는 3단 압축 출력 구조와 에이전트의 실수를 시스템 지침 패치로 전환하는 교정 루프를 제시한다.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter Grid Section -->
    <section class="landing-chapters">
      <div class="landing-container">
        <div class="section-header">
          <span class="section-eyebrow">TABLE OF CONTENTS</span>
          <h2>모델은 매달 바뀌어도 AI 에이전트 위임의 아키텍처는 변하지 않는다</h2>
          <p>
            특정 서비스의 화면 조작법이나 단명하는 명령어 요령은 담지 않았다. 다음 세대의 어떤 언어 모델과 에이전트 위에서도 그대로 작동할 6개의 아키텍처 기둥과 10가지 실무 위임 패턴만 남겼다.
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
            <p class="chapter-summary">{{ ch.question }}</p>
            <div class="chapter-artifacts">
              <span v-for="theme in ch.themes" :key="theme" class="artifact-pill">
                {{ theme }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Bottom Reading CTA -->
    <section class="landing-footer-cta">
      <div class="landing-container">
        <div class="footer-cta-box">
          <div>
            <span class="section-eyebrow">BEGIN READING</span>
            <h3>직접 해치우던 습관을 내려놓는 순간, 비로소 내 시간의 천장이 열린다.</h3>
            <p>
              서문부터 차례대로 읽거나, 전 권 합본 페이지에서 종이책처럼 인쇄·소장하여 읽을 수 있다.
            </p>
          </div>
          <div class="footer-cta-buttons">
            <a class="btn-book btn-primary" :href="withBase('/preface')">
              서문 펼치기 →
            </a>
            <a class="btn-book btn-outline" :href="withBase('/full_book')">
              전 권 합본 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
