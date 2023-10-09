import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from '../locales/en';
import ruLocale from '../locales/ru';
import store from '../store';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
  },
  ru: {
    ...ruLocale,
  },
};

export const setLocale = (lang) => {
  localStorage.setItem('lang', lang);
  window.location.reload();
};

export const getLocale = () => {
  let currLanguage = localStorage.getItem('lang');
  if (currLanguage) {
    localStorage.getItem('lang');
  } else {
    currLanguage = process.env.VUE_APP_I18N_LOCALE;
    localStorage.setItem('lang', process.env.VUE_APP_I18N_LOCALE);
  }
  store.dispatch('addLocale', currLanguage);
  return currLanguage || process.env.VUE_APP_I18N_FALLBACK_LOCALE;
};

export default new VueI18n({
  locale: getLocale(),
  messages,
});
