import { defineConfig } from 'vitepress';

const SITE_ORIGIN = 'https://deep-diver.github.io';
const BASE_PATH = '/delegationPlayBook/';
const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;
const OG_IMAGE_URL = `${SITE_URL}assets/og_card.png`;

export default defineConfig({
  srcDir: './docs',
  srcExclude: ['public/**'],
  base: BASE_PATH,
  lang: 'ko-KR',
  title: 'AI 에이전트 위임 플레이북',
  titleTemplate: ':title — AI 에이전트 위임 플레이북',
  description:
    '혼자 다 해치우던 습관을 버리고, 내 일머리를 문서로 적어 결과만 30초 만에 검수하는 실무자용 AI 위임 플레이북.',
  cleanUrls: true,
  lastUpdated: false,

  vite: {
    build: {
      chunkSizeWarningLimit: 1500,
    },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#FAF9F6' }],
    ['meta', { name: 'author', content: 'AI Agent Delegation Playbook' }],
    ['meta', { property: 'og:site_name', content: 'AI 에이전트 위임 플레이북 (Digital Book)' }],
    ['meta', { property: 'og:type', content: 'book' }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }],
    ['meta', { property: 'og:image', content: OG_IMAGE_URL }],
    ['meta', { property: 'og:image:width', content: '1600' }],
    ['meta', { property: 'og:image:height', content: '900' }],
    [
      'meta',
      {
        property: 'og:image:alt',
        content:
          'THE AI AGENT DELEGATION PLAYBOOK — Specify, Delegate, Verify System Architecture Guide',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE_URL }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${BASE_PATH}favicon.svg`,
      },
    ],
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif+KR:wght@500;600;700&display=swap',
      },
    ],
  ],

  transformHead({ pageData }) {
    const relativeRoute = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '');
    const pageUrl = `${SITE_URL}${relativeRoute}`;
    const pageTitle = pageData.frontmatter.title
      ? `${pageData.frontmatter.title} | AI 에이전트 위임 플레이북`
      : '평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북';
    const pageDesc =
      pageData.frontmatter.description ||
      '일의 실행(Execution)은 위임하되, 기준의 설계(Specification)와 검증의 책임(Verification)은 절대 위임하지 마라.';

    return [
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
    ];
  },

  markdown: {
    math: true,
    codeCopyButtonTitle: '클립보드에 복사',
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    config(md) {
      md.core.ruler.after('inline', 'book_editorial_enhancements', (state) => {
        const tokens = state.tokens;

        for (let i = 0; i < tokens.length; i++) {
          const tok = tokens[i];

          // 1. Classify semantic blockquotes ([나쁜 지시], [좋은 지시], 핵심 요약, epigraph)
          if (tok.type === 'blockquote_open') {
            let depth = 1;
            let combinedText = '';
            for (let j = i + 1; j < tokens.length && depth > 0; j++) {
              if (tokens[j].type === 'blockquote_open') depth++;
              else if (tokens[j].type === 'blockquote_close') depth--;
              else if (depth === 1 && tokens[j].type === 'inline') {
                combinedText += tokens[j].content + '\n';
              }
            }

            const trimmed = combinedText.trim();
            if (/^\*\*\[(?:나쁜|안티패턴|Bad)/i.test(trimmed)) {
              tok.attrJoin('class', 'callout-box callout-bad');
            } else if (/^\*\*\[(?:좋은|정석|Good)/i.test(trimmed)) {
              tok.attrJoin('class', 'callout-box callout-good');
            } else if (
              /핵심 요약|이 장의 핵심|확보할.*산출물|이 장의 산출물|얻어갈|이 페이지의 활용법|활용법/.test(
                trimmed
              )
            ) {
              tok.attrJoin('class', 'callout-box callout-summary');
            } else if (/일의 실행\(Execution\)은 위임하되/.test(trimmed)) {
              tok.attrJoin('class', 'callout-epigraph');
            }
          }

          // 2. Style figure paragraphs & italic figure captions (`*그림 X-Y. ...*`)
          if (tok.type === 'paragraph_open' && i + 1 < tokens.length) {
            const inlineTok = tokens[i + 1];
            if (inlineTok.type === 'inline' && inlineTok.children) {
              const hasImage = inlineTok.children.some((c) => c.type === 'image');
              if (hasImage) {
                tok.attrJoin('class', 'book-figure-frame');
              } else if (
                /^\*(?:그림|표|Figure|Fig\.)\s*[0-9A-Za-z-]+/i.test(inlineTok.content.trim())
              ) {
                tok.attrJoin('class', 'book-figure-caption');
              }
            }
          }
        }
      });
    },
  },

  themeConfig: {
    siteTitle: 'AI 에이전트 위임 플레이북',

    nav: [
      { text: '표지', link: '/' },
      { text: '서문', link: '/preface' },
      {
        text: '챕터 목차',
        items: [
          { text: '서문 · 왜 유능한 IC일수록 실패하는가', link: '/preface' },
          { text: 'Ch 1 · 멘탈 모델의 전환', link: '/01_mental_model' },
          { text: 'Ch 2 · 나를 문서화하기 (Personal OS)', link: '/02_personal_os' },
          { text: 'Ch 3 · 위임의 기술과 게이트 설계', link: '/03_delegation_gates' },
          { text: 'Ch 4 · 환경 구축 및 시나리오 10선', link: '/04_setup_and_cases' },
          { text: 'Ch 5 · 교정과 진화 (Calibration)', link: '/05_calibration_loop' },
          { text: 'Ch 6 · 월요일 30분 세팅 & 치트시트', link: '/06_quickstart_cheatsheet' },
          { text: 'Appendix · 핵심 용어 사전 & 레퍼런스', link: '/appendix_references' },
        ],
      },
      { text: 'Starter Kit', link: '/starter-kit' },
      { text: '단일 합본', link: '/full_book' },
    ],

    sidebar: [
      {
        text: '시작하기 · Front Matter',
        items: [
          { text: '표지 (Book Cover)', link: '/' },
          { text: '서문 및 읽는 법', link: '/preface' },
        ],
      },
      {
        text: 'Part I · 설계 원리와 개인 OS',
        items: [
          { text: 'Ch 1. 멘탈 모델의 전환', link: '/01_mental_model' },
          { text: 'Ch 2. 나를 문서화하기 (Personal OS)', link: '/02_personal_os' },
          { text: 'Ch 3. 위임의 기술과 게이트 설계', link: '/03_delegation_gates' },
        ],
      },
      {
        text: 'Part II · 실전 파이프라인과 진화',
        items: [
          { text: 'Ch 4. 환경 구축 및 시나리오 10선', link: '/04_setup_and_cases' },
          { text: 'Ch 5. 교정과 진화 (Calibration)', link: '/05_calibration_loop' },
          { text: 'Ch 6. 월요일 30분 세팅 & 치트시트', link: '/06_quickstart_cheatsheet' },
        ],
      },
      {
        text: '부록 및 패키지 · Back Matter',
        items: [
          { text: '부록: 용어 사전 & 레퍼런스', link: '/appendix_references' },
          { text: 'Starter Kit (.zip & 템플릿)', link: '/starter-kit' },
          { text: '단일 합본 통독 (Full Edition)', link: '/full_book' },
        ],
      },
    ],

    outline: {
      level: [2, 3],
      label: '이 장의 목차 (On this page)',
    },

    docFooter: {
      prev: '이전 장 (Previous)',
      next: '다음 장 (Next)',
    },

    returnToTopLabel: '맨 위로 이동',
    sidebarMenuLabel: '전체 도서 목차',
    darkModeSwitchLabel: '테마 전환',
    lightModeSwitchTitle: '라이트 모드(종이 테마)로 전환',
    darkModeSwitchTitle: '다크 모드로 전환',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/deep-diver/delegationPlayBook' },
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        _render(src, env, md) {
          // Avoid indexing full_book.md twice since every chapter is already indexed individually
          if (env.relativePath === 'full_book.md') return '';
          if (env.frontmatter?.search === false) return '';
          return md.render(src, env);
        },
        miniSearch: {
          options: {
            // Index-time tokenizer supporting Korean josa stripping + Hangul 2/3-gram indexing + technical identifiers
            tokenize: (text: string) => {
              const normalized = text.normalize('NFC').toLowerCase();
              const rawMatches = normalized.match(/[a-z0-9_.-]+|[가-힣]+/g) || [];
              const tokens = new Set<string>();
              const josaRe =
                /(은|는|이|가|을|를|의|에|에서|으로|로|과|와|도|만|까지|부터|이란|란|이며|며|이고|고)$/;

              for (const word of rawMatches) {
                if (!word) continue;
                tokens.add(word);
                if (/^[가-힣]+$/.test(word) && word.length >= 2) {
                  const stripped = word.replace(josaRe, '');
                  if (stripped.length >= 2) tokens.add(stripped);
                  // Add 2-gram and 3-gram substrings so compound Korean nouns match cleanly
                  for (let len = 2; len <= 3; len++) {
                    for (let i = 0; i <= word.length - len; i++) {
                      tokens.add(word.slice(i, i + len));
                    }
                  }
                } else if (word.includes('.') || word.includes('_') || word.includes('-')) {
                  for (const part of word.split(/[._-]+/)) {
                    if (part.length >= 2) tokens.add(part);
                  }
                }
              }
              return Array.from(tokens);
            },
          },
          searchOptions: {
            prefix: true,
            fuzzy: 0.15,
            combineWith: 'AND',
            boost: { title: 4, titles: 2.5, text: 1 },
            // Query-time tokenizer strips Korean particles without bigram explosion so AND queries stay accurate
            tokenize: (query: string) => {
              const normalized = query.normalize('NFC').toLowerCase();
              const words = normalized.match(/[a-z0-9_.-]+|[가-힣]+/g) || [];
              const josaRe =
                /(은|는|이|가|을|를|의|에|에서|으로|로|과|와|도|만|까지|부터|이란|란)$/;
              return words.map((w) => {
                if (/^[가-힣]{3,}$/.test(w)) {
                  const stripped = w.replace(josaRe, '');
                  return stripped.length >= 2 ? stripped : w;
                }
                return w;
              });
            },
          },
        },
        translations: {
          button: {
            buttonText: '책 전체 검색...',
            buttonAriaLabel: '책 전체 전문 검색',
          },
          modal: {
            displayDetails: '상세 문맥 표시',
            resetButtonTitle: '검색어 지우기',
            backButtonTitle: '닫기',
            noResultsText: '일치하는 본문 내용을 찾지 못했습니다:',
            footer: {
              selectText: '이동',
              selectKeyAriaLabel: '엔터 키',
              navigateText: '탐색',
              navigateUpKeyAriaLabel: '위쪽 화살표',
              navigateDownKeyAriaLabel: '아래쪽 화살표',
              closeText: '닫기',
              closeKeyAriaLabel: 'ESC 키',
            },
          },
        },
      },
    },
  },
});
