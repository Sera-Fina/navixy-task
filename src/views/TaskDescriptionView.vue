<template>
  <div class="task-description">
    <PageViewer
      v-for="(page, i) in pages"
      :key="i"
    >
      <div v-html="$t(`taskDescriptionPages.${page}`)"></div>
    </PageViewer>
  </div>
</template>

<script>
import PageViewer from '../components/PageViewer.vue';

export default {
  name: 'TaskDescription',
  components: { PageViewer },
  data() {
    return {
      pages: ['first', 'second'],
    };
  },
};
</script>

<style lang="scss">
@import 'src/styles/variables';

.task-description {
  height: $height__full;
  overflow: auto;

  .example-image {
    width: $width__full;
    height: 25rem;
    background-size: contain;
    background-image: url("../assets/example.png");
    background-repeat: no-repeat;
    background-position: 50% 0;
  }
}
</style>
