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
      '설명할 시간에 내가 직접 해치우는 편이 빠르다는 달콤한 습관은 어떻게 유능한 실무자를 영원한 병목에 가두는가.',
    themes: ['유능한 실무자의 역설', '도구보다 오래가는 구조', '설계자의 시선'],
    link: '/preface',
  },
  {
    code: 'CHAPTER 01',
    part: '제1부 · 기준과 권한',
    title: '1장. 실행자에서 설계자로 — 위임의 첫 번째 멘탈 모델',
    question:
      '직접 손을 움직이지 않고도 결과물의 품질을 온전히 장악하려면 일의 앞단과 뒷단 어디를 붙잡아야 하는가.',
    themes: ['기준·실행·검증 삼분법', '검토 병목의 역전', '넘기지 말아야 할 네 가지 성역'],
    link: '/01_mental_model',
  },
  {
    code: 'CHAPTER 02',
    part: '제1부 · 기준과 권한',
    title: '2장. 머릿속 일머리의 구조화 — 암묵지를 세 겹의 맥락으로 꺼내는 법',
    question:
      '수년간 손끝에 배어 말로 설명하기조차 답답했던 나만의 판단 기준을 어떤 순서와 층위로 펼쳐 놓아야 하는가.',
    themes: ['배경과 우선순위', '원칙과 금지선', '절차와 합격선', '주의력 희석 방지'],
    link: '/02_context_architecture',
  },
  {
    code: 'CHAPTER 03',
    part: '제1부 · 기준과 권한',
    title: '3장. 권한의 사다리와 비가역성의 관문 — 안전하게 고삐를 푸는 설계',
    question:
      '왜 말로 타이르는 당부는 결정적인 순간에 무력해지며, 되돌릴 수 없는 사고를 막으려면 어디에 물리적 잠금장치를 걸어야 하는가.',
    themes: ['권한의 5단계 사다리', '가역성이라는 잣대', '초안 격리실', '구조적 관문'],
    link: '/03_authority_and_gates',
  },
  {
    code: 'CHAPTER 04',
    part: '제2부 · 경계와 진화',
    title: '4장. 작업장의 경계와 위임 토폴로지 — 대리인이 일하는 공간과 흐름 설계',
    question:
      '내 본체 금고를 안전하게 지키면서도 여러 대리인이 정중한 무한 루프에 빠지지 않고 일하게 만드는 작업장 구조는 무엇인가.',
    themes: ['작업 공간 격리', '읽기·초안·실행 분리', '종료 조건과 차단기', '검증 친화적 출력'],
    link: '/04_isolation_and_topology',
  },
  {
    code: 'CHAPTER 05',
    part: '제2부 · 경계와 진화',
    title: '5장. 일상의 실무를 재설계하는 열 가지 위임 아키텍처 패턴',
    question:
      '수신함 정리부터 일정 방어, 근거 조사, 정량 계산, 긴 기획서 집필까지 매일 반복되는 열 가지 지식 노동을 어떻게 재설계할 것인가.',
    themes: ['초안함 감금', '침묵의 보고 원칙', '추론과 연산의 분리', '이단계 폭포수 승인'],
    link: '/05_ten_delegation_patterns',
  },
  {
    code: 'CHAPTER 06',
    part: '제2부 · 경계와 진화',
    title: '6장. 잔소리 대신 설계도를 고쳐라 — 실패를 복리로 바꾸는 교정 아키텍처',
    question:
      '어제의 실수를 내일 다시 반복하지 않게 만들려면 대화창의 휘발성 지적을 어떻게 영구적인 시스템 자산으로 전환해야 하는가.',
    themes: ['실패의 네 가지 뿌리', '문서 위생과 뺄셈', '신뢰의 복리 곡선'],
    link: '/06_calibration_loop',
  },
  {
    code: 'APPENDIX',
    part: '부록',
    title: '부록. 위임 아키텍처 핵심 개념 사전 & 사상적 원류',
    question:
      '도구와 유행이 바뀌어도 흔들리지 않는 열여섯 가지 핵심 개념과, 이 책의 뼈대를 이룬 경영·시스템 사상의 고전들은 무엇인가.',
    themes: ['핵심 개념 16선', '시스템 사고의 원류', '고전 경영 원전'],
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
            <span class="eyebrow-edition">DIGITAL MONOGRAPH</span>
          </div>

          <h1 class="hero-title">
            평생 비서를 부려본 적 없는<br />
            실무자를 위한<br />
            <span class="hero-title-accent">AI 에이전트 위임 플레이북</span>
          </h1>

          <div class="hero-accent-bar" aria-hidden="true"></div>

          <p class="hero-subtitle">
            혼자 다 해치우던 습관을 내려놓고, 기준을 설계하고 결과만 검증하는 사람으로 건너가는 위임의 아키텍처
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
                alt="평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북 표지"
                loading="eager"
              />
            </div>
            <div class="cover-caption">
              <span>SPECIFY · DELEGATE · VERIFY</span>
              <span>서문 · 전 6장 · 부록 완역 수록</span>
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
            <div class="track-badge">PILLAR 01 · 기준의 설계</div>
            <h3>암묵지를 눈에 보이는 설계도로</h3>
            <p>
              대리인의 실패는 지능의 부족이 아니라 맥락의 공백에서 시작된다. 내 머릿속에만 있던 우선순위와 금지선, 합격의 기준을 세 겹의 문서로 꺼내 적는 법을 다룬다.
            </p>
          </div>

          <div class="track-card">
            <div class="track-badge track-badge-slate">PILLAR 02 · 격리된 자율성</div>
            <h3>말로 하는 당부 대신 물리적 관문으로</h3>
            <p>
              되돌릴 수 있는 일에는 넓은 작업대를 내어주고, 한 번 실행하면 주워 담을 수 없는 일 앞에는 초안 격리실과 구조적 잠금장치를 세우는 권한 설계 원리를 밝힌다.
            </p>
          </div>

          <div class="track-card">
            <div class="track-badge">PILLAR 03 · 검증과 복리 교정</div>
            <h3>휘발되는 잔소리를 영구적 시스템으로</h3>
            <p>
              생성 속도가 빨라질수록 인간의 검토 속도가 유일한 병목이 된다. 30초 만에 진위를 가리는 출력 구조와 실패를 자산으로 바꾸는 교정 루프를 제시한다.
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
          <h2>도구는 매달 바뀌어도 위임의 뼈대는 변하지 않는다</h2>
          <p>
            유행하는 기능 사용법이나 수명이 짧은 명령어 모음은 담지 않았다. 십 년 뒤 어떤 대리인과 일하더라도 흔들리지 않을 여섯 개의 기둥과 열 가지 실무 패턴만 남겼다.
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
            <h3>직접 해버리는 습관을 내려놓는 순간, 비로소 내 시간의 천장이 열린다.</h3>
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
