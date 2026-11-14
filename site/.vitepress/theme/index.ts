import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import BookLanding from './components/BookLanding.vue';
import FullBookBanner from './components/FullBookBanner.vue';
import ImageLightbox from './components/ImageLightbox.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(ImageLightbox),
    });
  },
  enhanceApp({ app }) {
    app.component('BookLanding', BookLanding);
    app.component('FullBookBanner', FullBookBanner);
  },
} satisfies Theme;
