#!/usr/bin/env node
/**
 * scripts/prepare_site.mjs
 *
 * Non-destructive pre-build pipeline for the Delegation Playbook Digital Book.
 * Reads `book/` and `starter-kit/` WITHOUT modifying any source files, and generates
 * the VitePress source tree under `site/docs/` (which is gitignored).
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BOOK_DIR = path.join(ROOT_DIR, 'book');
const BOOK_ASSETS_DIR = path.join(BOOK_DIR, 'assets');
const STARTER_KIT_DIR = path.join(ROOT_DIR, 'starter-kit');

const DOCS_DIR = path.join(ROOT_DIR, 'site', 'docs');
const DOCS_ASSETS_DIR = path.join(DOCS_DIR, 'assets');
const PUBLIC_DIR = path.join(DOCS_DIR, 'public');
const PUBLIC_ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

const isStrict = process.argv.includes('--strict');

const EXPECTED_ASSETS = [
  'cover.png',
  'og_card.png',
  'fig01_ic_vs_architect.png',
  'fig02_human_ea_vs_ai_agent.png',
  'fig03_personal_os_stack.png',
  'fig04_delegation_5levels_gates.png',
  'fig05_agent_architecture_setup.png',
  'fig06_calibration_loop.png',
  'fig07_ten_scenarios_map.png',
  'fig08_context_hygiene_tree.png',
  'illus_ch02_brain_blueprint.png',
  'illus_ch03_glass_lock.png',
  'illus_ch04_atelier.png',
  'illus_ch06_monday_coffee.png',
];

const CHAPTER_PIPELINE = [
  {
    src: 'README.md',
    dest: 'preface.md',
    route: '/preface',
    navTitle: '서문 및 읽는 법',
    pageTitle: '서문 — 왜 일 잘하는 실무자일수록 AI에게 일을 못 맡길까',
    description:
      '내가 직접 하는 게 빠르다는 함정에서 벗어나 기준을 적고 결과만 검수하는 사람으로 일하는 법.',
  },
  {
    src: '01_mental_model.md',
    dest: '01_mental_model.md',
    route: '/01_mental_model',
    navTitle: 'Ch 1. 멘탈 모델의 전환',
    pageTitle: 'Chapter 1. 멘탈 모델의 전환 — 실무자(IC)에서 시스템 아키텍트로',
    description:
      '혼자 다 끌어안던 일을 기준 적기·실행 맡기기·결과 확인하기로 나누고, 첫 위임 대상과 절대 넘기면 안 되는 금지선을 정한다.',
  },
  {
    src: '02_personal_os.md',
    dest: '02_personal_os.md',
    route: '/02_personal_os',
    navTitle: 'Ch 2. 나를 문서화하기 (Personal OS)',
    pageTitle: 'Chapter 2. 나를 문서화하기 (Personal OS)',
    description:
      '내 머릿속에만 있던 일머리를 꺼내 USER.md, SOUL.md, PLAYBOOK.md 세 장의 평문 파일로 정리하는 법.',
  },
  {
    src: '03_delegation_gates.md',
    dest: '03_delegation_gates.md',
    route: '/03_delegation_gates',
    navTitle: 'Ch 3. 위임의 기술과 게이트 설계',
    pageTitle: 'Chapter 3. 위임의 기술과 게이트 설계',
    description:
      '말로 조심하라고 타이르는 대신 초안 전용 모드와 설정 파일·차단 스크립트로 되돌릴 수 없는 사고를 막는 법.',
  },
  {
    src: '04_setup_and_cases.md',
    dest: '04_setup_and_cases.md',
    route: '/04_setup_and_cases',
    navTitle: 'Ch 4. 환경 구축 및 시나리오 10선',
    pageTitle: 'Chapter 4. 실전 환경 구축 및 업무 위임 시나리오 10선',
    description:
      '웹 UI와 로컬 CLI 환경을 안전하게 세팅하고 메일 정리·일정 방어·자료 조사·문서·코드 등 10가지 실무 레시피를 바로 돌린다.',
  },
  {
    src: '05_calibration_loop.md',
    dest: '05_calibration_loop.md',
    route: '/05_calibration_loop',
    navTitle: 'Ch 5. 교정과 진화 (Calibration)',
    pageTitle: 'Chapter 5. 교정과 진화 (Calibration)',
    description:
      '채팅창 잔소리를 멈추고 10초 만에 실수 원인을 찾아 문서에 규칙 두 줄을 보태는 주간 교정 루틴.',
  },
  {
    src: '06_quickstart_cheatsheet.md',
    dest: '06_quickstart_cheatsheet.md',
    route: '/06_quickstart_cheatsheet',
    navTitle: 'Ch 6. 월요일 30분 세팅 & 치트시트',
    pageTitle: 'Chapter 6. 실전 부트스트랩 — 월요일 오전 30분 세팅 가이드 & 원페이지 치트시트',
    description:
      '월요일 출근 후 30분 안에 첫 위임을 성공시키는 실행 시간표, 모니터 옆 한 장 치트시트, 막힐 때 보는 7문 7답.',
  },
  {
    src: 'appendix_references.md',
    dest: 'appendix_references.md',
    route: '/appendix_references',
    navTitle: '부록: 용어 사전 & 레퍼런스',
    pageTitle: 'Appendix. 5초 만에 이해하는 핵심 용어 사전 및 검증된 출처',
    description:
      '비개발자도 바로 이해하는 18개 핵심 용어 풀이와 실제 사고 사례·공식 문서·수석 비서 매뉴얼 출처 38선.',
  },
];

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Transform non-code segments within a single line (outside inline `...` code spans):
 * - Rewrite relative links so they work inside VitePress `site/docs/`
 * - Escape Vue mustache `{{` / `}}` so Vue compiler never crashes on prompt variables
 * - Escape currency dollar signs (`$20`, `$47,000`) so MathJax doesn't pair two prices as inline math
 */
function transformOutsideInlineCode(line) {
  // Split preserving inline code spans (`...`, ``...``, etc.)
  const parts = line.split(/(`+[^`]*`+)/g);
  return parts
    .map((segment, idx) => {
      // Odd indices are inline code spans (`...`)
      if (idx % 2 === 1) return segment;

      let out = segment;

      // 1. Rewrite Markdown links: [label](target) and ![alt](target)
      out = out.replace(/(\[[^\]]*\]\()([^)]+)(\))/g, (_match, prefix, rawTarget, suffix) => {
        const trimmed = rawTarget.trim();

        // Leave external URLs, mailto, or pure hash anchors untouched
        if (/^(https?:\/\/|mailto:|#)/i.test(trimmed)) {
          return `${prefix}${rawTarget}${suffix}`;
        }

        // Split path and hash (#anchor)
        const hashIdx = trimmed.indexOf('#');
        const targetPath = hashIdx >= 0 ? trimmed.slice(0, hashIdx) : trimmed;
        const hashPart = hashIdx >= 0 ? trimmed.slice(hashIdx) : '';

        // Normalize ./README.md or ../book/README.md -> ./preface.md
        if (/^(\.\/|\.\.\/book\/)?README\.md$/i.test(targetPath)) {
          return `${prefix}./preface.md${hashPart}${suffix}`;
        }

        // Normalize ../book/<chapter>.md -> ./<chapter>.md
        const bookRelMatch = targetPath.match(/^\.\.\/book\/(.+)$/);
        if (bookRelMatch) {
          return `${prefix}./${bookRelMatch[1]}${hashPart}${suffix}`;
        }

        // Normalize links to starter-kit directory or starter-kit/README.md -> ./starter-kit.md
        if (
          /^(\.\.\/|\.\/)?starter-kit\/?$/i.test(targetPath) ||
          /^(\.\.\/|\.\/)?starter-kit\/README\.md$/i.test(targetPath)
        ) {
          return `${prefix}./starter-kit.md${hashPart}${suffix}`;
        }

        // Normalize links to specific files inside starter-kit -> ./starter-kit.md#<slug> or GitHub blob
        const starterFileMatch = targetPath.match(/^(\.\.\/|\.\/)?starter-kit\/(.+)$/);
        if (starterFileMatch) {
          const subFile = starterFileMatch[2];
          return `${prefix}https://github.com/deep-diver/delegationPlayBook/blob/main/starter-kit/${subFile}${suffix}`;
        }

        return `${prefix}${rawTarget}${suffix}`;
      });

      // 2. Escape Vue mustache interpolations outside code spans
      out = out.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;');

      // 3. Escape currency amounts ($20, $200, $47,000) while preserving LaTeX ($T_...$, $$...$$)
      // Currency starts with `$` NOT preceded by `\` or `$` or alphanumeric/brace, and immediately followed by a digit.
      out = out.replace(/(?<![\\$a-zA-Z0-9_{}])\$(?=\d)/g, '\\$');

      return out;
    })
    .join('');
}

/**
 * Process full Markdown file content while strictly respecting fenced code blocks
 * (supports 3+, 4+, 5+ backticks or tildes).
 */
function transformMarkdownContent(rawMarkdown) {
  const normalized = rawMarkdown.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const result = [];

  let activeFence = null; // { char: '`' | '~', length: number }

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
      // Inside a fenced code block: NEVER touch content!
      result.push(line);
      continue;
    }

    // Outside fenced code blocks:
    // Split combined `[나쁜 ...]` + `[좋은 ...]` single blockquotes into two clean blockquotes
    // when a blank `>` line precedes `> **[좋은`
    if (/^>\s*$/.test(line) && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      if (/^>\s*\*\*\[(?:좋은|Good)/i.test(nextLine)) {
        result.push('');
        continue;
      }
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

  const existingFiles = fs.readdirSync(BOOK_ASSETS_DIR).filter((f) => !f.startsWith('.'));
  for (const file of existingFiles) {
    const src = path.join(BOOK_ASSETS_DIR, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, path.join(DOCS_ASSETS_DIR, file));
      fs.copyFileSync(src, path.join(PUBLIC_ASSETS_DIR, file));
    }
  }

  // Check expected 10 assets
  const fallbackSrc = existingFiles.find((f) => f.endsWith('.png'))
    ? path.join(BOOK_ASSETS_DIR, existingFiles.find((f) => f.endsWith('.png')))
    : null;

  const missingAssets = [];
  for (const expected of EXPECTED_ASSETS) {
    const targetDocAsset = path.join(DOCS_ASSETS_DIR, expected);
    if (!fs.existsSync(targetDocAsset)) {
      missingAssets.push(expected);
      if (isStrict) {
        continue;
      }
      if (fallbackSrc) {
        console.warn(
          `[prepare_site] Notice: book/assets/${expected} not yet generated; using temporary build stand-in in site/docs/assets/`
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

function collectFilesRecursive(baseDir, relDir = '') {
  const results = [];
  const currentDir = path.join(baseDir, relDir);
  if (!fs.existsSync(currentDir)) return results;

  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    const entryRel = relDir ? path.posix.join(relDir, entry.name) : entry.name;
    if (entry.isDirectory()) {
      results.push(...collectFilesRecursive(baseDir, entryRel));
    } else if (entry.isFile()) {
      results.push(entryRel);
    }
  }
  return results;
}

function getFenceLangForFile(filename) {
  if (filename.endsWith('.json') || filename.endsWith('.json.example')) return 'json';
  if (filename.endsWith('.py')) return 'python';
  if (filename.endsWith('.sh')) return 'bash';
  if (filename.endsWith('.yml') || filename.endsWith('.yaml')) return 'yaml';
  if (filename.endsWith('.md')) return 'markdown';
  return 'text';
}

function buildStarterKitZipAndPage() {
  const zipDest = path.join(PUBLIC_DIR, 'starter-kit.zip');
  const starterKitExists = fs.existsSync(STARTER_KIT_DIR);

  if (!starterKitExists) {
    if (isStrict) {
      throw new Error(`[prepare_site --strict] Missing required starter-kit directory: ${STARTER_KIT_DIR}`);
    }
    console.warn(
      '[prepare_site] Notice: starter-kit/ not yet created; generating temporary placeholder zip & page in site/docs/'
    );
    const tmpDir = path.join(DOCS_DIR, '_tmp_starter_kit', 'starter-kit');
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, 'README.md'),
      '# Delegation Playbook Starter Kit\n\nStarter kit files are being packaged.\n',
      'utf8'
    );
    execFileSync('zip', ['-r', '-q', zipDest, 'starter-kit'], {
      cwd: path.join(DOCS_DIR, '_tmp_starter_kit'),
    });
    fs.rmSync(path.join(DOCS_DIR, '_tmp_starter_kit'), { recursive: true, force: true });

    const placeholderMd =
      buildFrontmatter({
        title: 'Starter Kit — 즉시 복제용 실전 템플릿 패키지',
        description: 'USER.md, SOUL.md, PLAYBOOK.md, settings.json, PreToolUse 훅 스타터 킷.',
        prev: { text: '부록: 용어 사전 & 레퍼런스', link: '/appendix_references' },
        next: { text: '단일 합본 통독 (Full Book)', link: '/full_book' },
      }) +
      `# Starter Kit — 실전 템플릿 패키지\n\n<StarterKitBanner />\n\n스타터 킷 파일 구성을 준비 중입니다.\n`;
    fs.writeFileSync(path.join(DOCS_DIR, 'starter-kit.md'), placeholderMd, 'utf8');
    return { starterKitFiles: [] };
  }

  // Create starter-kit.zip from repo root so unzipping yields `starter-kit/...` including dotfiles (.claude, .mcp.json.example)
  try {
    execFileSync('zip', ['-r', '-q', zipDest, 'starter-kit', '-x', '*.DS_Store', '*/.DS_Store'], {
      cwd: ROOT_DIR,
    });
  } catch {
    // Fallback to Python zipfile if `zip` binary is unavailable
    const pyScript = `
import os, zipfile
root = ${JSON.stringify(ROOT_DIR)}
target = ${JSON.stringify(zipDest)}
sk = os.path.join(root, 'starter-kit')
with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as zf:
    for dirpath, _, filenames in os.walk(sk):
        for fn in sorted(filenames):
            if fn == '.DS_Store': continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root)
            zf.write(full, rel)
`;
    execFileSync('python3', ['-c', pyScript]);
  }

  const files = collectFilesRecursive(STARTER_KIT_DIR).sort((a, b) => {
    if (a === 'README.md') return -1;
    if (b === 'README.md') return 1;
    return a.localeCompare(b);
  });

  const readmePath = path.join(STARTER_KIT_DIR, 'README.md');
  let readmeBody = '';
  if (fs.existsSync(readmePath)) {
    const raw = fs.readFileSync(readmePath, 'utf8');
    // Strip top H1 from starter-kit/README.md so we don't render duplicate H1
    const withoutH1 = raw.replace(/^#\s+[^\n]+\n+/, '');
    readmeBody = transformMarkdownContent(withoutH1);
  }

  const templateSections = files
    .filter((f) => f !== 'README.md')
    .map((relPath) => {
      const content = fs.readFileSync(path.join(STARTER_KIT_DIR, relPath), 'utf8').trimEnd();
      const lang = getFenceLangForFile(relPath);
      // Choose fence length longer than any backtick sequence inside content
      const backtickRuns = content.match(/`+/g) || [];
      const maxRun = backtickRuns.reduce((m, s) => Math.max(m, s.length), 2);
      const fence = '`'.repeat(Math.max(3, maxRun + 1));

      return `### \`starter-kit/${relPath}\`\n\n${fence}${lang}\n${content}\n${fence}\n`;
    })
    .join('\n');

  const fileRows = files
    .map((relPath) => {
      const stat = fs.statSync(path.join(STARTER_KIT_DIR, relPath));
      const lines = fs.readFileSync(path.join(STARTER_KIT_DIR, relPath), 'utf8').split('\n').length;
      return `| \`starter-kit/${relPath}\` | ${lines}줄 (${(stat.size / 1024).toFixed(1)} KB) | [GitHub 원본 보기](https://github.com/deep-diver/delegationPlayBook/blob/main/starter-kit/${relPath}) |`;
    })
    .join('\n');

  const pageMd =
    buildFrontmatter({
      title: 'Starter Kit — 빈칸만 채우면 바로 돌아가는 12종 실전 템플릿',
      description:
        '백지 앞에서 고민할 필요 없이 내 작업 폴더와 AI 설정창에 바로 복사해 쓰는 개인 OS 문서와 안전 잠금 스크립트 묶음.',
      prev: { text: '부록: 용어 사전 & 레퍼런스', link: '/appendix_references' },
      next: { text: '단일 합본 통독 (Full Book)', link: '/full_book' },
    }) +
    `# Starter Kit — 바로 복사해 쓰는 12종 실전 패키지

> **이 페이지의 활용법**
> 상단 버튼으로 \`starter-kit.zip\` 전체 폴더를 한 번에 내려받아 압축을 풀거나, 아래 파일별 코드 상자 오른쪽 위의 **복사 버튼**을 눌러 필요한 문서만 바로 가져다 쓸 수 있다.

<StarterKitBanner />

---

## 들어 있는 파일 한눈에 보기 (총 ${files.length}개)

| 파일 경로 | 분량 | 저장소 원본 |
| :--- | :--- | :--- |
${fileRows}

---

${readmeBody ? `${readmeBody}\n\n---\n\n` : ''}## 파일별 전체 내용 (바로 복사용)

${templateSections}
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'starter-kit.md'), pageMd, 'utf8');
  return { starterKitFiles: files };
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
        : { text: 'Starter Kit 패키지', link: '/starter-kit' };

    let rawContent = '';
    if (fs.existsSync(srcPath)) {
      rawContent = fs.readFileSync(srcPath, 'utf8');
    } else {
      missingChapters.push(item.src);
      if (isStrict) continue;
      console.warn(
        `[prepare_site] Notice: book/${item.src} not yet created; generating temporary placeholder in site/docs/${item.dest}`
      );
      rawContent = `# ${item.pageTitle}\n\n> 원고 고도화 작업 진행 중입니다.\n`;
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

  // Sync full_book.md -> both web route (`site/docs/full_book.md`) AND raw file download (`site/docs/public/full_book.md`)
  const fullBookSrc = path.join(BOOK_DIR, 'full_book.md');
  if (!fs.existsSync(fullBookSrc)) {
    throw new Error(`Missing required file: ${fullBookSrc}`);
  }

  const rawFullBook = fs.readFileSync(fullBookSrc, 'utf8');
  // 1. Copy verbatim raw markdown to public/ for 1-click `.md` download
  fs.copyFileSync(fullBookSrc, path.join(PUBLIC_DIR, 'full_book.md'));

  // 2. Write transformed web edition to site/docs/full_book.md
  const fullBookWeb =
    buildFrontmatter({
      title: '단일 합본 통독 (Full Book Edition)',
      description:
        '평생 비서를 부려본 적 없는 실무자를 위한 AI 에이전트 위임 플레이북 전 권(서문~부록) 단일 페이지 통합본.',
      prev: { text: 'Starter Kit 패키지', link: '/starter-kit' },
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
      titleTemplate: 'Digital Book Web Edition',
      description:
        '일의 실행(Execution)은 위임하되, 기준의 설계(Specification)와 검증의 책임(Verification)은 절대 위임하지 마라. 실무자(IC)를 위한 AI 에이전트 시스템 설계서.',
      sidebar: false,
      aside: false,
    }) + `<BookLanding />\n`;

  fs.writeFileSync(path.join(DOCS_DIR, 'index.md'), indexMd, 'utf8');
}

function writeFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#FAF9F6" stroke="#1A1A1A" stroke-width="3"/>
  <rect x="10" y="12" width="16" height="4" fill="#C92A2A"/>
  <text x="10" y="42" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="24" font-weight="700" fill="#1A1A1A">DP</text>
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
  const starterReport = buildStarterKitZipAndPage();
  const chapterReport = syncChapters();
  writeLandingPage();

  console.log(
    `[prepare_site] Ready -> chapters synced, assets: ${assetReport.totalCopied} (fallbacks: ${assetReport.missingAssets.length}), starter-kit files: ${starterReport.starterKitFiles.length}, full_book: ${chapterReport.fullBookLines} lines.`
  );
}

main();
