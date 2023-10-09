<template>
  <div :size="pageSize" class="page-viewer">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'PageViewer',
  props: {
    pageSettings: {
      default: () => ({
        size: 'A4',
      }),
    },
  },
  computed: {
    pageSize() {
      return this.pageSettings.size || 'A4';
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.navixy-test .page-viewer {
  background: white;
  display: block;
  margin: 0 auto 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  font-size: 1rem;
  text-align: start;
  letter-spacing: -0.006rem;
  padding: 5rem 4.375rem;

  ol {
    list-style-position: inside;
  }

  &[size="A4"] {
    width: 21cm;
    height: 29.7cm;
  }
}

@media only screen and (max-width: 49.6rem) {
  .navixy-test .page-viewer {
    padding: 2.5rem 2.170rem;
    &[size="A4"] {
      width: $width__full;
      height: fit-content;
    }
  }
}

@media only screen and (max-width: 23.6rem) {
  .navixy-test .page-viewer {
    padding: 1rem;
  }
}

@media print {
  .navixy-test .page-viewer {
    background: white;
    margin: 0;
    box-shadow: none;
  }
}
</style>
