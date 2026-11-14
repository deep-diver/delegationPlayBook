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
      <div class="kit-banner-eyebrow">COMPLETE MONOGRAPH EDITION</div>
      <div class="kit-banner-title">전 권 단일 합본 (서문 · 1장~6장 · 부록 전문)</div>
      <p class="kit-banner-desc">
        서문부터 부록까지 끊김 없이 한 호흡으로 통독하거나, 인쇄 및 PDF 저장으로 소장해 두고 읽을 수 있습니다.
      </p>
    </div>
    <div class="kit-banner-actions">
      <button type="button" class="btn-book btn-primary" @click="triggerPrint">
        인쇄 / PDF 소장하기
      </button>
      <a
        class="btn-book btn-outline"
        :href="withBase('/full_book.md')"
        download="delegation-playbook.md"
      >
        원문 텍스트 내려받기
      </a>
    </div>
  </div>
</template>
