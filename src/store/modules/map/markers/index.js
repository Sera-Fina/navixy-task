import router from '../../../../router';
import api from '../../../../backend';

export default {
  namespaced: true,
  state: {
    markersList: [],
    editingForm: {
      name: '',
      coordinates: null,
    },
    loading: false,
    editing: false,
    selectedMarker: null,
  },
  getters: {
    getMarkersList: (state) => state.markersList,
    getSelectedMarker: (state) => state.selectedMarker,
    getEditingForm: (state) => state.editingForm,
    getLoading: (state) => state.loading,
    getEditing: (state) => state.editing,
  },
  mutations: {
    setMarkersList(state, payload) {
      state.markersList = payload;
    },

    setEditingForm(state, payload) {
      Object.keys(payload)
        .forEach((key) => {
          state.editingForm[key] = payload[key];
        });
    },

    setLoading(state, payload) {
      state.loading = payload;
    },

    setEditing(state, payload) {
      state.editing = payload;
    },

    setSelectedMarker(state, payload) {
      state.selectedMarker = payload;
    },

    setState(state, payload) {
      Object.keys(state)
        .forEach((key) => {
          state[key] = payload[key];
        });
    },
  },
  actions: {
    async uploadMarkers({
      commit,
      dispatch,
    }) {
      commit('setLoading', true);
      const res = await api('markers', 'getData');
      if (res.code === 200) {
        commit('setMarkersList', res.data);
        let selected = res.data[0];
        const queryId = router.currentRoute.query.id;
        if (queryId) {
          const existingMarker = res.data.find((marker) => marker.id === queryId);
          if (existingMarker) {
            selected = existingMarker;
          }
        }
        if (selected) {
          dispatch('setSelected', selected);
        }
      }
      commit('setLoading', false);
    },

    async deleteMarker({
      commit,
      dispatch,
    }, payload) {
      commit('setLoading', true);
      const res = await api('markers', 'deleteData', payload.id);
      if (res.code === 200) {
        dispatch('uploadMarkers');
      }
    },

    async addMarker({
      commit,
      dispatch,
    }, payload) {
      commit('setLoading', true);
      const res = await api('markers', 'postData', payload);
      if (res.code === 200) {
        dispatch('setSelected', res.data);
        dispatch('uploadMarkers');
      }
    },

    setSelected({ commit }, payload) {
      if (router.currentRoute.query.id !== payload.id) {
        router.replace({
          ...router.currentRoute,
          query: { id: payload.id },
        });
      }
      commit('setSelectedMarker', payload);
    },

    setEditingFormFields({ commit }, payload) {
      commit('setEditingForm', payload);
    },

    setEditing({ commit }, payload) {
      commit('setEditing', payload);
    },

    clearState({ commit }) {
      commit('setState', {
        markersList: [],
        editingForm: {
          name: '',
          coordinates: null,
        },
        loading: false,
        editing: false,
        selectedMarker: null,
      });
    },
  },
};
