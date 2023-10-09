export default {
  state: {
    locale: process.env.VUE_APP_I18N_LOCALE,
  },
  getters: {
    getLocale: (state) => state.locale,
  },
  mutations: {
    setLocale: (state, payload) => {
      state.locale = payload;
    },
    setState(state, payload) {
      Object.keys(state)
        .forEach((key) => {
          state[key] = payload[key];
        });
    },
  },
  actions: {
    addLocale({ commit }, payload) {
      commit('setLocale', payload);
    },
    clearState({ commit }) {
      commit('setState', { locale: process.env.VUE_APP_I18N_LOCALE });
    },
  },
};
