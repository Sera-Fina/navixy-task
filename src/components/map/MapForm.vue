<template>
  <v-form
    ref="markerForm"
    class="map-form px-4"
    lazy-validation
  >
    <v-text-field
      :counter="20"
      :label="$t('form.name')"
      :placeholder="placeholders.name"
      :rules="rules.name"
      :value="form.name"
      required
      @input="onFormChanged('name', $event)"
    ></v-text-field>

    <v-text-field
      :label="$t('form.coordinates')"
      :placeholder="placeholders.coordinates"
      :value="getCoordinatesString(form.coordinates)"
      disabled
      required
    ></v-text-field>
    <v-sheet class="d-flex justify-end flex-wrap">
      <v-btn
        :disabled="loading"
        class="mt-1 success"
        small
        @click="submit"
      >
        {{ $t('buttons.submit') }}
      </v-btn>
    </v-sheet>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';
import i18n from '../../plugins/i18n';

export default {
  name: 'MapForm',
  computed: {
    ...mapGetters({
      loading: 'map/markers/getLoading',
      form: 'map/markers/getEditingForm',
    }),
    rules() {
      return {
        name: [
          (value) => !!value || i18n.t('form.required', [i18n.t('form.name')
            .toLowerCase()]),
          (value) => (value && value.length <= 20) || i18n.t('form.maxLength', [20]),
        ],
      };
    },
    placeholders() {
      return {
        name: i18n.t('form.enter', [i18n.t('form.name')
          .toLowerCase()]),
        coordinates: i18n.t('form.enter', [i18n.t('form.coordinates')
          .toLowerCase()]),
      };
    },
  },
  beforeDestroy() {
    this.$store.dispatch('map/markers/setEditingFormFields', {
      name: '',
      coordinates: '',
    });
  },
  methods: {
    onFormChanged(field, value) {
      const form = { [field]: value };
      this.$store.dispatch('map/markers/setEditingFormFields', form);
    },

    getCoordinatesString(coordinates) {
      return coordinates ? `${coordinates.lat}, ${coordinates.lng}` : '';
    },

    async submit() {
      const isValid = this.$refs.markerForm.validate();
      if (isValid) {
        await this.$store.dispatch('map/markers/addMarker', {
          ...this.form,
          coordinatesString: this.getCoordinatesString(this.form.coordinates),
        });
        this.$store.dispatch('map/markers/setEditing', false);
        await this.$store.dispatch('map/markers/uploadMarkers');
      }
    },
  },
};
</script>
