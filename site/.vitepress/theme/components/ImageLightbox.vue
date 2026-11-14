<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const activeSrc = ref('');
const activeAlt = ref('');
const activeCaption = ref('');

function closeLightbox() {
  isOpen.value = false;
  activeSrc.value = '';
  activeAlt.value = '';
  activeCaption.value = '';
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
}

function handleDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target || target.tagName !== 'IMG') return;

  // Only activate for images inside book prose (.vp-doc), never nav/landing icons
  const inDoc = target.closest('.vp-doc');
  if (!inDoc) return;
  if (target.closest('a')) return;

  const img = target as HTMLImageElement;
  activeSrc.value = img.currentSrc || img.src;
  activeAlt.value = img.alt || '';

  // Find adjacent figure caption if present
  const parentP = img.closest('p');
  const nextEl = parentP?.nextElementSibling;
  if (nextEl && nextEl.classList.contains('book-figure-caption')) {
    activeCaption.value = nextEl.textContent?.trim() || '';
  } else {
    activeCaption.value = img.alt || '';
  }

  isOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    closeLightbox();
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen"
        class="book-lightbox-backdrop no-print"
        role="dialog"
        aria-modal="true"
        :aria-label="activeAlt || '도식 확대 보기'"
        @click="closeLightbox"
      >
        <button
          type="button"
          class="book-lightbox-close"
          aria-label="확대 창 닫기"
          @click.stop="closeLightbox"
        >
          닫기 ✕
        </button>

        <div class="book-lightbox-stage" @click.stop="closeLightbox">
          <img
            class="book-lightbox-img"
            :src="activeSrc"
            :alt="activeAlt"
            @click.stop
          />
          <p v-if="activeCaption" class="book-lightbox-caption" @click.stop>
            {{ activeCaption }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
