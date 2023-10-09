import mapStore from '../../../src/store/modules/map';
import localeStore from '../../../src/store/modules/locale';

export default {
  modules: {
    locale: { ...localeStore },
    map: { ...mapStore },
  },
};
