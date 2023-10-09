<template>
  <div v-if="loading" class="loading">
    <v-progress-circular
      color="primary"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      default: null,
    },
  },
  computed: {},
};
</script>

<style lang="scss">
/** note: cannot be scoped as it has vuetify component inside. Scoping using classes **/
@import 'src/styles/variables';

.navixy-test .loading {
  width: $width__full;
  height: $height__full;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
}
</style>
