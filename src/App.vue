<template>
  <v-app class="navixy-test">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(lang) in languages"
            :key="lang.key"
            :class="{selected: language === lang.key}"
            @click="setLanguage(lang.key)"
          >
            <v-list-item-title class="pointer">{{ lang.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-tabs v-model="tab">
          <v-tab
            v-for="(tab) in tabs"
            :key="tab.title"
            :to="tab.path"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import i18n, { setLocale } from './plugins/i18n';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      language: 'getLocale',
    }),
  },
  data: () => ({
    tab: 'task-description',
    tabs: [
      { title: i18n.t('routesNames.taskDescription'), path: '/task-description' },
      { title: i18n.t('routesNames.map'), path: '/map' },
    ],
    languages: [
      {
        title: i18n.t('languages.en'),
        key: 'en',
      },
      {
        title: i18n.t('languages.ru'),
        key: 'ru',
      },
    ],
  }),
  beforeDestroy() {
    this.$store.dispatch('map/clearState');
    this.$store.dispatch('local/clearState');
  },
  methods: {
    setLanguage(lang) {
      setLocale(lang);
    },
  },
};
</script>
