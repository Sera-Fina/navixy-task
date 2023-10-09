import { Loader } from '@googlemaps/js-api-loader';
import markers from './markers';

export default {
  namespaced: true,
  state: {
    MapClass: null,
  },
  getters: {
    getMapClass: (state) => state.MapClass,
  },
  mutations: {
    setMapClass(state, payload) {
      state.MapClass = payload;
    },

    setState(state, payload) {
      Object.keys(state).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async uploadMapLibrary({ commit }, { locale }) {
      const loader = new Loader({
        apiKey: process.env.VUE_APP_MAP_KEY,
        language: locale,
        version: 'weekly',
      });
      await loader.load();
      const { Map } = await window.google.maps.importLibrary('maps');
      commit('setMapClass', Map);
    },

    clearState({ commit }) {
      commit('setState', { MapClass: null });
    },
  },
  modules: {
    markers,
  },
};
