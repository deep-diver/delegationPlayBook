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
      <div class="kit-banner-eyebrow">COMPLETE SINGLE-PAGE EDITION</div>
      <div class="kit-banner-title">전 권 단일 합본 통독 에디션 (서문 · Ch 1~6 · 부록 전문)</div>
      <p class="kit-banner-desc">
        한 페이지에서 전체 내용을 검색·통독하거나, 마크다운 원문 파일 다운로드 및 인쇄/PDF 내보내기로 소장할 수 있습니다.
      </p>
    </div>
    <div class="kit-banner-actions">
      <a
        class="btn-book btn-primary"
        :href="withBase('/full_book.md')"
        download="delegation-playbook-full_book.md"
      >
        원문(full_book.md) 다운로드
      </a>
      <button type="button" class="btn-book btn-outline" @click="triggerPrint">
        인쇄 / PDF 저장
      </button>
    </div>
  </div>
</template>
