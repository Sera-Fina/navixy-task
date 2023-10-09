<template>
  <div class="markers">
    <div class="markers-title pa-4">{{ $t('mapListTitle') }}</div>
    <v-list v-if="markers.length" ref="markersList" class="markers-list pa-0" two-line>
      <v-list-item
        v-for="(marker) in markers" :key="marker.id"
        :class="{selected: selected && selected.id === marker.id}"
        class="markers-list_item pointer"
      >
        <v-list-item-content @click="clickHandler(marker)">
          <v-list-item-title v-text="marker.name || $t('noName')" />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-subtitle
                v-if="marker.coordinatesString"
                v-bind="attrs"
                v-on="on"
                v-text="marker.coordinatesString"
              />
            </template>
            <span>{{ marker.coordinatesString }}</span>
          </v-tooltip>
        </v-list-item-content>
        <v-list-item-action class="ml-0">
          <v-btn color="#ff5252" icon small @click="eventClickDelete(marker)">
            <v-icon size="1.25rem">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MapList',
  props: {
    keyField: {
      default: null,
    },
    titleField: {
      default: null,
    },
    subtitleField: {
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      markers: 'map/markers/getMarkersList',
      loading: 'map/markers/getLoading',
      selected: 'map/markers/getSelectedMarker',
    }),
  },
  methods: {
    async eventClickDelete(item) {
      await this.$store.dispatch('map/markers/deleteMarker', item);
    },

    clickHandler(marker) {
      this.$store.dispatch('map/markers/setSelected', marker);
    },
  },
};
</script>

<style lang="scss">
/** note: cannot be scoped as it has vuetify component inside. Scoping using classes **/
@import 'src/styles/variables';

.navixy-test {
  .markers {
    height: $height__full;
    overflow: hidden;
  }

  .markers-list {
    position: relative;
    height: calc(#{$height__full} - 4.063rem);
    overflow: auto;
  }
}
</style>
