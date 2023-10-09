<template>
  <v-container class="map-viewer fill-height full-width pa-0" fluid>
    <Loading :loading="loading" />
    <v-row class="fill-height" no-gutters>
      <v-col
        class="map-viewer_section fill-height"
        md="3"
        sm="5"
        xs="12"
      >
        <MapForm v-if="editing" />
        <MapList v-else />
      </v-col>
      <v-col
        class="map-viewer_section fill-height"
        md="9"
        sm="7"
        xs="12"
      >
        <Map />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import MapList from '../components/map/MapList.vue';
import MapForm from '../components/map/MapForm.vue';
import Map from '../components/map/Map.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'MapView',
  components: {
    Loading,
    MapForm,
    MapList,
    Map,
  },
  computed: {
    ...mapGetters({
      loading: 'map/markers/getLoading',
      editing: 'map/markers/getEditing',
    }),
  },
  async mounted() {
    await this.$store.dispatch('map/markers/uploadMarkers');
  },
  beforeDestroy() {
    this.$store.dispatch('map/markers/clearState');
  },
};
</script>

<style lang="scss">
@media only screen and (max-width: 37.5rem) {
  .map-viewer_section {
    flex-basis: auto;
    height: 50%;
    &:first-child {
      order: 2;
    }
    &:last-child {
      order: 1;
    }
  }
}
</style>
