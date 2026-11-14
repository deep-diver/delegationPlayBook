<script setup lang="ts">
import { withBase } from 'vitepress';

function triggerPrint() {
  if (typeof window !== 'undefined') {
    window.print();
  }
}
</script>

<template>
  <div class="kit-banner no-print">
    <div class="kit-banner-info">
      <div class="kit-banner-eyebrow">SINGLE-PAGE FULL EDITION</div>
      <div class="kit-banner-title">전 권 단일 합본 (서문 · Ch 1~6 · 부록 전문)</div>
      <p class="kit-banner-desc">
        서문부터 부록까지 끊김 없이 한 페이지에서 쭉 읽거나, 마크다운 원문 파일로 내려받고 PDF로 인쇄해 두고 볼 수 있습니다.
      </p>
    </div>
    <div class="kit-banner-actions">
      <a
        class="btn-book btn-primary"
        :href="withBase('/full_book.md')"
        download="delegation-playbook-full_book.md"
      >
        원문(full_book.md) 내려받기
      </a>
      <button type="button" class="btn-book btn-outline" @click="triggerPrint">
        인쇄 / PDF 저장
      </button>
    </div>
  </div>
</template>
