<template>
    <div>
    <q-page
    id="portada"
    ref="portada"
    class="box-1"
  >
    <div
     style="margin-top: -2%;"
     v-intersection="onIntersectionIndex"/>
    <PortadaContenido
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="subtitle"
    v-bind:toptext="toptext"
    v-bind:subtext="subtext"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="'/'"
    v-bind:id="'-2'"
    v-bind:title="title"
    />
    </q-page>
        <q-page
    id="work"
    ref="work"
    class="box-3"
  >
    <ImgLeftFolder
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="subtitle"
    v-bind:toptext="toptext"
    v-bind:subtext="textParrafo"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="'/'"
    v-bind:id="2"
    />
    <div v-intersection="onIntersectionWork"/>
    </q-page>
    <q-page
    id="work2"
    ref="work2"
    style="background-color: #ffffff;
    height: 100%;
    width: 100%;
    padding: 8%;
    min-height: 0%;"
  >
    <ImgRightFolder
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="subtitleRight"
    v-bind:toptext="toptext"
    v-bind:subtext="subtext"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="'/'"
    v-bind:id="'1'"
    />
    <div v-intersection="onIntersectionWork"/>
    </q-page>
    <q-page
    id="about"
    ref="about"
    style="min-height: 0%;"
    class="box-3"
  >
    <TextFolder
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="subtitle"
    v-bind:toptext="toptext"
    v-bind:subtext="subtext"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="'/'"
    v-bind:id="4"
    v-bind:title="title"
    />
    </q-page>
    </div>
</template>
<script>
import PortadaContenido from './PortadaContenido.vue';
import ImgLeftFolder from './ImgLeftFolder.vue';
import ImgRightFolder from './ImgRightFolder.vue';
import TextFolder from './TextFolder.vue';

export default {
  name: 'Wherex',
  components: {
    PortadaContenido,
    ImgLeftFolder,
    ImgRightFolder,
    TextFolder,
  },
  data() {
    return {
      position: 150,
      visibleIndex: true,
      visibleAbout: false,
      visibleWork: false,
      selected: 't_1',
      marginTop: '2%',
      marginLeft: '20%',
      marginLeftTxt: '50.6vw',
      title: 'Wherex',
      toptext: 'katherine.lib.ira@gmail.com',
      subtitle: 'The Brief',
      subtitleRight: 'The Solution',
      subtext: 'Web platform for quotes and tenders that aims to transform the acquisition processes of big companies. Allow Suppliers to have new business opportunities through access to more buyers; and to the Buyers to ensure a higher level of competence, efficiency and control in their procurement processes, generating significant benefits.',
      textParrafo: 'Allow Suppliers to have new business opportunities through access to more buyers; and to the Buyers to ensure a higher level of competence, efficiency and control in their procurement processes, generating significant benefits.',
      tecnologias: ['Angular', 'twig', 'php'],
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
