<script setup lang="ts">
import { withBase } from 'vitepress';
</script>

<template>
  <div class="kit-banner no-print">
    <div class="kit-banner-info">
      <div class="kit-banner-eyebrow">READY-TO-USE PACKAGE · 12 FILES</div>
      <div class="kit-banner-title">빈칸만 채우면 바로 돌아가는 실전 스타터 킷 (.zip)</div>
      <p class="kit-banner-desc">
        압축을 풀면 에이전트 전용 작업 폴더(<code>~/agent-workspace/</code>)나 Claude · ChatGPT 지침창에 바로 넣을 수 있는 기준 문서와 잠금 스크립트 12종이 준비됩니다.
      </p>
    </div>
    <div class="kit-banner-actions">
      <a
        class="btn-book btn-primary"
        :href="withBase('/starter-kit.zip')"
        download="delegation-playbook-starter-kit.zip"
      >
        Starter Kit (.zip) 다운로드
      </a>
    </div>
  </div>
</template>
