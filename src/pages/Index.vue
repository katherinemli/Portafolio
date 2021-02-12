<template>
  <div>
    <FolderImg
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="subtitle"
    v-bind:toptext="toptext"
    v-bind:subtext="subtext"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="'home'"
    v-bind:id="1"
    v-bind:title="title"
    />
  </div>
</template>

<script>
import FolderImg from './FolderImg.vue';

export default {
  name: 'Index',
  components: {
    FolderImg,
  },
  data() {
    return {
      marginTop: '2%',
      marginLeft: '20%',
      marginLeftTxt: '50.6vw',
      title: 'KATHERINE',
      toptext: 'katherine.lib.ira@gmail.com',
      subtitle: ' I\'m a FrontEnd Developer and Software Engineer',
      subtext: 'With an eye for intuitive, well designed and user-friendly websites, I love to build websites that not only look great, but also feel great to use, regardless of how the final user access the web.',
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python'],
    };
  },
};
</script>
