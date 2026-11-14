<script setup lang="ts">
import { withBase } from 'vitepress';
</script>

<template>
  <div class="kit-banner no-print">
    <div class="kit-banner-info">
      <div class="kit-banner-eyebrow">READY-TO-USE PACKAGE · 12 FILES INCLUDED</div>
      <div class="kit-banner-title">Delegation Playbook Starter Kit (.zip)</div>
      <p class="kit-banner-desc">
        압축 해제 즉시 로컬 에이전트 워크스페이스(<code>~/agent-workspace/</code>) 또는 Claude Projects / ChatGPT 지침으로 사용할 수 있는 표준 템플릿 묶음입니다.
      </p>
    </div>
    <div class="kit-banner-actions">
      <a
        class="btn-book btn-primary"
        :href="withBase('/starter-kit.zip')"
        download="delegation-playbook-starter-kit.zip"
      >
        Starter Kit (.zip) 원클릭 다운로드
      </a>
    </div>
  </div>
</template>
