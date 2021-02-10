<template>
  <q-layout id="q-app" ref="app" view="hHh lpR fFf">
    <q-header
    :class="visibleClass"
    text-positive
    height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <router-link
            to="/"
            class="text-white"
            style="text-decoration: none;">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
            Katherine
          </router-link>
        </q-toolbar-title>
        <q-tabs style="color: #3DFFBE;" v-model="selected" align="center" vertical>
        <q-tab name="me" v-on:click="scrollToPortada" label="Me"/>
        <q-tab name="about" v-on:click="scrollToAbout" label="about"/>
        <q-tab name="work" v-on:click="scrollToWork" label="work"/>
      </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <transition name="fade">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>
<script>
import EventBus from './event-bus';

export default {
  name: 'App',
  data() {
    return {
      position: 150,
      visibleIndex: true,
      visibleAbout: false,
      visibleWork: false,
      selected: 't_1',
      visibleClass: 'bg-accent text-white transition',
    };
  },
  mounted() {
    EventBus.$on('selectedValue', (payload) => {
    // handle event
      console.log('selectedValue: ', payload);
      this.selected = payload;
    });
    EventBus.$on('classValue', (payload) => {
    // handle event
      console.log('classValue: ', payload);
      this.visibleClass = payload;
    });
  },
  methods: {
    scrollToPortada() {
      this.$router.push('/#portada').then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      /* const el = this.$refs.app.$el;
      // MUST call it in timer
      setTimeout(() => {
        el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        // window.scrollTo({ top: 500, behavior: 'smooth' });
      }, 100); */
    },
    onIntersectionIndex(entry) {
      this.visibleIndex = entry.isIntersecting;
    },
    onIntersectionAbout(entry) {
      this.visibleAbout = entry.isIntersecting;
    },
    onIntersectionWork(entry) {
      this.visibleWork = entry.isIntersecting;
    },
    scrollToAbout() {
      this.$router.push('/#about');
    },
    scrollToWork() {
      this.$router.push('/#work');
    },
  },
};
</script>
