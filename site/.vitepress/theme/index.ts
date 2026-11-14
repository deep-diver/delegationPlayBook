import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import BookLanding from './components/BookLanding.vue';
import FullBookBanner from './components/FullBookBanner.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BookLanding', BookLanding);
    app.component('FullBookBanner', FullBookBanner);
  },
} satisfies Theme;
