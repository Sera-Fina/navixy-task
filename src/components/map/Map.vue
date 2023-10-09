<template>
  <div id="map"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Map',
  computed: {
    ...mapGetters({
      language: 'getLocale',
      MapClass: 'map/getMapClass',
      markers: 'map/markers/getMarkersList',
      editing: 'map/markers/getEditing',
      loading: 'map/markers/getLoading',
      selected: 'map/markers/getSelectedMarker',
    }),
    mapSettings() {
      return {
        mapTypeId: 'roadmap',
        zoomControl: true,
        center: this.selected?.coordinates || {
          lat: -34.397,
          lng: 150.644,
        },
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_TOP,
        },
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        zoom: 8,
      };
    },
  },
  watch: {
    editing(newValue) {
      if (!newValue) {
        const button = this.getMapButton();
        if (button) {
          this.setMapEditingStateOff(button);
        }
      }
    },
    loading(newValue) {
      if (!newValue && this.map) {
        this.setMarkers();
      }
    },
    selected(newValue, oldValue) {
      if ((!oldValue && newValue.id) || newValue.id !== oldValue.id) {
        this.centredMap(newValue.coordinates);
      }
    },
  },
  data: () => ({
    map: null,
    clickable: false,
    temporaryMapMarker: null,
    markersInstances: [],
  }),
  async mounted() {
    await this.uploadMapLibrary();
    await this.setMap();
    this.setMarkers();
  },
  methods: {
    async uploadMapLibrary() {
      if (!this.MapClass) {
        await this.$store.dispatch('map/uploadMapLibrary', { locale: this.language });
      }
    },

    async setMap() {
      this.map = new this.MapClass(document.getElementById('map'), this.mapSettings);
      this.map.addListener('click', this.addTemporaryMarker);
      this.drawAddButton();
    },

    setMarkers() {
      this.removeAllMarkers();
      this.markersInstances = this.markers.map((marker) => {
        const mapMarker = new window.google.maps.Marker({
          position: marker.coordinates,
          map: this.map,
        });
        this.setMarkerListener(mapMarker, marker);
        return mapMarker;
      });
    },

    removeAllMarkers() {
      if (this.markersInstances.length) {
        this.markersInstances.forEach((marker) => {
          marker.setMap(null);
        });
      }
      this.markersInstances = [];
    },

    setMarkerListener(mapMarker, marker) {
      mapMarker.addListener('click', () => {
        this.$store.dispatch('map/markers/setSelected', marker);
        this.map.setZoom(8);
        this.centredMap(mapMarker.getPosition());
      });
    },

    centredMap(coordinates) {
      if (this.map) {
        this.map.setCenter(coordinates);
      }
    },

    addTemporaryMarker(mapsMouseEvent) {
      if (this.clickable) {
        this.clearTemporaryMapMarker();
        const coordinates = mapsMouseEvent.latLng.toJSON();
        this.temporaryMapMarker = new window.google.maps.Marker({
          position: coordinates,
          map: this.map,
        });
        this.centredMap(coordinates);
        this.$store.dispatch('map/markers/setEditing', true);
        this.$store.dispatch('map/markers/setEditingFormFields', { coordinates });
      }
    },

    clearTemporaryMapMarker() {
      if (this.temporaryMapMarker) {
        this.temporaryMapMarker.setMap(null);
        this.temporaryMapMarker = null;
      }
    },

    drawAddButton() {
      const addControlDiv = document.createElement('div');
      const addButton = this.getAddButtonControl(this.map);
      addControlDiv.appendChild(addButton);
      this.map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(addControlDiv);
    },

    getAddButtonControl() {
      const controlButton = document.createElement('button');
      controlButton.className = 'map_button';
      controlButton.type = 'button';
      controlButton.innerHTML = '&#215;';
      this.addAddButtonListener(controlButton);
      return controlButton;
    },

    addAddButtonListener(button) {
      button.addEventListener('click', () => {
        if (this.editing) {
          this.$store.dispatch('map/markers/setEditing', false);
        } else if (this.clickable) {
          this.setMapEditingStateOff(button);
        } else {
          this.setMapEditingStateOn(button);
        }
      });
    },

    setMapEditingStateOff(button) {
      this.clickable = false;
      this.clearTemporaryMapMarker();
      button.classList.remove('map_button__cancel');
      button.classList.add('map_button__add');
    },

    setMapEditingStateOn(button) {
      this.clickable = true;
      const nonEditingState = button.className === 'map_button' || button.className.includes('map_button__add');
      if (nonEditingState) {
        button.classList.remove('map_button__add');
        button.classList.add('map_button__cancel');
      }
    },

    getMapButton() {
      return document.getElementsByClassName('map_button')[0] || null;
    },
  },
};
</script>

<style lang="scss">
@import 'src/styles/animations';
@import 'src/styles/variables';

$width_map_button: 3rem;

#map {
  width: $width__full;
  height: $height__full;

  .map_button {
    cursor: pointer;
    width: $width_map_button;
    height: $width_map_button;
    line-height: $width_map_button;
    font-size: 1.75rem;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 50%;
    margin: 0 0.625rem 0.625rem 0;
    background-color: #1976d2;
    transform: rotate(45deg);

    &__cancel {
      background-color: #ff5252;
      transform: none;
      animation-name: rotateCancel;
      animation-duration: $duration_animation;
    }

    &__add {
      background-color: #1976d2;
      transform: rotate(45deg);
      animation-name: rotateAdd;
      animation-duration: $duration_animation;
    }
  }
}
</style>
