#!/usr/bin/env node
/**
 * scripts/prepare_site.mjs
 *
 * Non-destructive pre-build pipeline for the Delegation Playbook Digital Book.
 * Reads `book/` WITHOUT modifying any source files, and generates the VitePress
 * source tree under `site/docs/` (which is gitignored).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BOOK_DIR = path.join(ROOT_DIR, 'book');
const BOOK_ASSETS_DIR = path.join(BOOK_DIR, 'assets');

const DOCS_DIR = path.join(ROOT_DIR, 'site', 'docs');
const DOCS_ASSETS_DIR = path.join(DOCS_DIR, 'assets');
const PUBLIC_DIR = path.join(DOCS_DIR, 'public');
const PUBLIC_ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

const isStrict = process.argv.includes('--strict');

const EXPECTED_ASSETS = [
  'cover.png',
  'og_card.png',
  'ch01_conductor.png',
  'ch01_literal_agent.png',
  'ch02_three_notebooks.png',
  'ch03_glass_lock.png',
  'ch04_atelier.png',
  'ch05_scenarios_compass.png',
  'ch06_calibration_ledger.png',
  'diag01_dumbbell_control.png',
  'diag02_pace_layers.png',
  'diag03_authority_ladder_doors.png',
  'diag04_three_zones_floorplan.png',
  'diag05_verification_funnel.png',
  'diag06_ten_patterns_map.png',
  'diag07_calibration_compass.png',
];

const CHAPTER_PIPELINE = [
  {
    src: 'README.md',
    dest: 'preface.md',
    route: '/preface',
    navTitle: '서문. 왜 유능한 실무자일수록 실패하는가',
    pageTitle: '서문 — 왜 일 잘하는 실무자일수록 위임에 실패하는가',
    description:
      '설명할 시간에 내가 하고 만다는 달콤한 감옥에서 벗어나, 도구가 바뀌어도 흔들리지 않는 위임의 아키텍처를 세우는 법.',
  },
  {
    src: '01_mental_model.md',
    dest: '01_mental_model.md',
    route: '/01_mental_model',
    navTitle: '1장. 실행자에서 설계자로',
    pageTitle: '1장. 실행자에서 설계자로 — 위임의 첫 번째 멘탈 모델',
    description:
      '기준·실행·검증의 삼분법, 사람 비서와 인공지능 대리인의 네 가지 본질적 차이, 그리고 절대 넘기면 안 되는 네 가지 성역.',
  },
  {
    src: '02_context_architecture.md',
    dest: '02_context_architecture.md',
    route: '/02_context_architecture',
    navTitle: '2장. 머릿속 일머리의 구조화',
    pageTitle: '2장. 머릿속 일머리의 구조화 — 암묵지를 세 겹의 맥락으로 꺼내는 법',
    description:
      '보이지 않는 암묵지를 배경과 우선순위, 원칙과 금지선, 작업 절차와 합격선의 세 겹 맥락 계층으로 꺼내 적는 원리.',
  },
  {
    src: '03_authority_and_gates.md',
    dest: '03_authority_and_gates.md',
    route: '/03_authority_and_gates',
    navTitle: '3장. 권한의 사다리와 비가역성의 관문',
    pageTitle: '3장. 권한의 사다리와 비가역성의 관문 — 안전하게 고삐를 푸는 설계',
    description:
      '다섯 단계의 권한 사다리, 되돌릴 수 있는 일과 주워 담을 수 없는 일의 경계, 초안 격리실과 구조적 관문 설계.',
  },
  {
    src: '04_isolation_and_topology.md',
    dest: '04_isolation_and_topology.md',
    route: '/04_isolation_and_topology',
    navTitle: '4장. 작업장의 경계와 위임 토폴로지',
    pageTitle: '4장. 작업장의 경계와 위임 토폴로지 — 대리인이 일하는 공간과 흐름 설계',
    description:
      '작업 공간의 격리, 읽기·초안·실행의 삼중 분리, 종료 조건 설계, 그리고 인간의 검토 병목을 푸는 출력 구조.',
  },
  {
    src: '05_ten_delegation_patterns.md',
    dest: '05_ten_delegation_patterns.md',
    route: '/05_ten_delegation_patterns',
    navTitle: '5장. 일상의 실무를 재설계하는 열 가지 패턴',
    pageTitle: '5장. 일상의 실무를 재설계하는 열 가지 위임 아키텍처 패턴',
    description:
      '수신함 분류, 시간 방어, 맥락 브리핑, 교차 검증, 침묵의 보고, 추론과 연산의 분리, 이단계 폭포수 등 열 가지 보편 위임 패턴.',
  },
  {
    src: '06_calibration_loop.md',
    dest: '06_calibration_loop.md',
    route: '/06_calibration_loop',
    navTitle: '6장. 잔소리 대신 설계도를 고쳐라',
    pageTitle: '6장. 잔소리 대신 설계도를 고쳐라 — 실패를 복리로 바꾸는 교정 아키텍처',
    description:
      '실패의 네 가지 구조적 뿌리를 진단하고, 규칙의 비대화를 막으며, 작은 성공을 신뢰의 복리 곡선으로 쌓아 올리는 법.',
  },
  {
    src: 'appendix_references.md',
    dest: 'appendix_references.md',
    route: '/appendix_references',
    navTitle: '부록. 핵심 개념 사전 & 사상적 원류',
    pageTitle: '부록. 위임 아키텍처 핵심 개념 사전 & 사상적 원류',
    description:
      '시대가 바뀌어도 변하지 않는 위임 아키텍처 핵심 개념 16선과 이 책을 지탱하는 고전 경영·시스템 사상의 원류.',
  },
];

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function transformOutsideInlineCode(line) {
  const parts = line.split(/(`+[^`]*`+)/g);
  return parts
    .map((segment, idx) => {
      if (idx % 2 === 1) return segment;

      let out = segment;

      // 1. Rewrite Markdown links: [label](target) and ![alt](target)
      out = out.replace(/(\[[^\]]*\]\()([^)]+)(\))/g, (_match, prefix, rawTarget, suffix) => {
        const trimmed = rawTarget.trim();

        if (/^(https?:\/\/|mailto:|#)/i.test(trimmed)) {
          return `${prefix}${rawTarget}${suffix}`;
        }

        const hashIdx = trimmed.indexOf('#');
        const targetPath = hashIdx >= 0 ? trimmed.slice(0, hashIdx) : trimmed;
        const hashPart = hashIdx >= 0 ? trimmed.slice(hashIdx) : '';

        if (/^(\.\/|\.\.\/book\/)?README\.md$/i.test(targetPath)) {
          return `${prefix}./preface.md${hashPart}${suffix}`;
        }

        const bookRelMatch = targetPath.match(/^\.\.\/book\/(.+)$/);
        if (bookRelMatch) {
          return `${prefix}./${bookRelMatch[1]}${hashPart}${suffix}`;
        }

        return `${prefix}${rawTarget}${suffix}`;
      });

      // 2. Escape Vue mustache interpolations outside code spans
      out = out.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;');

      // 3. Escape currency amounts ($20, $47,000) while preserving LaTeX ($T_...$, $$...$$)
      out = out.replace(/(?<![\\$a-zA-Z0-9_{}])\$(?=\d)/g, '\\$');

      return out;
    })
    .join('');
}

function transformMarkdownContent(rawMarkdown) {
  const normalized = rawMarkdown.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const result = [];

  let activeFence = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedStart = line.trimStart();

    const fenceMatch = trimmedStart.match(/^(`{3,}|~{3,})(.*)$/);
    if (fenceMatch) {
      const fenceMarker = fenceMatch[1];
      const trailing = fenceMatch[2] || '';
      const char = fenceMarker[0];
      const len = fenceMarker.length;

      if (!activeFence) {
        activeFence = { char, length: len };
        result.push(line);
        continue;
      } else if (
        activeFence.char === char &&
        len >= activeFence.length &&
        trailing.trim() === ''
      ) {
        activeFence = null;
        result.push(line);
        continue;
      }
    }

    if (activeFence) {
      result.push(line);
      continue;
    }

    result.push(transformOutsideInlineCode(line));
  }

  return result.join('\n');
}

function buildFrontmatter(fields) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    if (typeof value === 'boolean' || typeof value === 'number') {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === 'string') {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    } else if (typeof value === 'object' && value !== null) {
      lines.push(`${key}:`);
      for (const [subKey, subVal] of Object.entries(value)) {
        lines.push(`  ${subKey}: ${JSON.stringify(subVal)}`);
      }
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

function syncAssets() {
  if (!fs.existsSync(BOOK_ASSETS_DIR)) {
    throw new Error(`Missing book assets directory: ${BOOK_ASSETS_DIR}`);
  }

  // In strict mode, verify exact asset hygiene (all 9 expected files present)
  const existingFiles = fs.readdirSync(BOOK_ASSETS_DIR).filter((f) => !f.startsWith('.'));
  for (const file of existingFiles) {
    const src = path.join(BOOK_ASSETS_DIR, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, path.join(DOCS_ASSETS_DIR, file));
      fs.copyFileSync(src, path.join(PUBLIC_ASSETS_DIR, file));
    }
  }

  const fallbackSrc = existingFiles.find((f) => f.endsWith('.png'))
    ? path.join(BOOK_ASSETS_DIR, existingFiles.find((f) => f.endsWith('.png')))
    : null;

  const missingAssets = [];
  for (const expected of EXPECTED_ASSETS) {
    const targetDocAsset = path.join(DOCS_ASSETS_DIR, expected);
    if (!fs.existsSync(targetDocAsset)) {
      missingAssets.push(expected);
      if (isStrict) continue;
      if (fallbackSrc) {
        console.warn(
          `[prepare_site] Notice: book/assets/${expected} not yet generated; using temporary stand-in in site/docs/assets/`
        );
        fs.copyFileSync(fallbackSrc, targetDocAsset);
        fs.copyFileSync(fallbackSrc, path.join(PUBLIC_ASSETS_DIR, expected));
      }
    }
  }

  if (isStrict && missingAssets.length > 0) {
    throw new Error(
      `[prepare_site --strict] Missing required book assets: ${missingAssets.join(', ')}`
    );
  }

  return { totalCopied: existingFiles.length, missingAssets };
}

function syncChapters() {
  const missingChapters = [];

  for (let i = 0; i < CHAPTER_PIPELINE.length; i++) {
    const item = CHAPTER_PIPELINE[i];
    const srcPath = path.join(BOOK_DIR, item.src);
    const destPath = path.join(DOCS_DIR, item.dest);

    const prevItem =
      i === 0
        ? { text: '표지 (Cover)', link: '/' }
        : { text: CHAPTER_PIPELINE[i - 1].navTitle, link: CHAPTER_PIPELINE[i - 1].route };

    const nextItem =
      i < CHAPTER_PIPELINE.length - 1
        ? { text: CHAPTER_PIPELINE[i + 1].navTitle, link: CHAPTER_PIPELINE[i + 1].route }
        : { text: '전 권 통독 합본', link: '/full_book' };

    let rawContent = '';
    if (fs.existsSync(srcPath)) {
      rawContent = fs.readFileSync(srcPath, 'utf8');
    } else {
      missingChapters.push(item.src);
      if (isStrict) continue;
      console.warn(
        `[prepare_site] Notice: book/${item.src} not yet created; generating temporary placeholder in site/docs/${item.dest}`
      );
      rawContent = `# ${item.pageTitle}\n\n원고 집필 진행 중입니다.\n`;
    }

    const transformed = transformMarkdownContent(rawContent);
    const frontmatter = buildFrontmatter({
      title: item.pageTitle,
      description: item.description,
      prev: prevItem,
      next: nextItem,
    });

    fs.writeFileSync(destPath, frontmatter + transformed, 'utf8');
  }

  if (isStrict && missingChapters.length > 0) {
    throw new Error(
      `[prepare_site --strict] Missing required book chapters: ${missingChapters.join(', ')}`
    );
  }

  const fullBookSrc = path.join(BOOK_DIR, 'full_book.md');
  if (!fs.existsSync(fullBookSrc)) {
    throw new Error(`Missing required file: ${fullBookSrc}`);
  }

  const rawFullBook = fs.readFileSync(fullBookSrc, 'utf8');
  fs.copyFileSync(fullBookSrc, path.join(PUBLIC_DIR, 'full_book.md'));

  const fullBookWeb =
    buildFrontmatter({
      title: '전 권 통독 합본 — 평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북',
      description:
        '서문부터 6장, 부록까지 전 권을 한 페이지에서 끊김 없이 읽는 단일 합본 에디션.',
      prev: { text: '부록. 핵심 개념 사전 & 사상적 원류', link: '/appendix_references' },
      next: false,
    }) +
    `<FullBookBanner />\n\n` +
    transformMarkdownContent(rawFullBook);

  fs.writeFileSync(path.join(DOCS_DIR, 'full_book.md'), fullBookWeb, 'utf8');

  return { missingChapters, fullBookLines: rawFullBook.split('\n').length };
}

function writeLandingPage() {
  const indexMd =
    buildFrontmatter({
      layout: 'page',
      title: '평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북',
      titleTemplate: 'Digital Book Edition',
      description:
        '일의 실행은 위임하되, 기준의 설계와 검증의 책임은 절대 위임하지 마라. 도구가 바뀌어도 흔들리지 않는 위임의 아키텍처.',
      sidebar: false,
      aside: false,
    }) + `<BookLanding />\n`;

  fs.writeFileSync(path.join(DOCS_DIR, 'index.md'), indexMd, 'utf8');
}

function writeFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#FAF9F6" stroke="#1A1A1A" stroke-width="3"/>
  <rect x="10" y="12" width="16" height="4" fill="#C92A2A"/>
  <text x="10" y="42" font-family="Georgia, serif" font-size="25" font-weight="700" fill="#1A1A1A">DP</text>
  <rect x="10" y="49" width="44" height="3" fill="#2B4C7E"/>
</svg>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), svg, 'utf8');
}

function main() {
  ensureCleanDir(DOCS_DIR);
  fs.mkdirSync(DOCS_ASSETS_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true });

  writeFavicon();
  const assetReport = syncAssets();
  const chapterReport = syncChapters();
  writeLandingPage();

  console.log(
    `[prepare_site] Ready -> chapters synced, assets: ${assetReport.totalCopied} (fallbacks: ${assetReport.missingAssets.length}), full_book: ${chapterReport.fullBookLines} lines.`
  );
}

main();
