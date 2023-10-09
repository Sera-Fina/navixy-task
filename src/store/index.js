import Vue from 'vue';
import Vuex from 'vuex';
import map from './modules/map';
import locale from './modules/locale';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    locale,
    map,
  },
});
