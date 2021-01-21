<template>
    <div>
    <q-page
    id="portada"
    ref="portada"
    class="box-1"
  >
    <div v-intersection="onIntersectionIndex"/>
    <Index />
    </q-page>
    <q-page
    id="about"
    ref="about"
    class="box-2"
  >
    <About v-intersection="onIntersectionAbout"/>
    </q-page>
        <q-page
    id="work"
    ref="work"
    class="box-3"
  >
    <Work/>
    <div v-intersection="onIntersectionWork"/>
    </q-page>
    </div>
</template>
<script>
import Index from 'pages/Index.vue';
import Work from 'pages//Works.vue';
import About from 'pages/About.vue';

export default {
  name: 'Main',
  components: { Index, Work, About },
  data() {
    return {
      position: 150,
      visibleIndex: true,
      visibleAbout: false,
      visibleWork: false,
      selected: 't_1',
    };
  },
  methods: {
    onIntersectionIndex(entry) {
      this.visibleIndex = entry.isIntersecting;
    },
    onIntersectionAbout(entry) {
      this.visibleAbout = entry.isIntersecting;
    },
    onIntersectionWork(entry) {
      this.visibleWork = entry.isIntersecting;
    },
  },
};
</script>
