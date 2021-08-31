<template>
  <FolderImgIndex
  v-bind:marginTop="marginTop"
  v-bind:marginLeft="marginLeft"
  v-bind:subtitle="subtitle"
  v-bind:toptext="toptext"
  v-bind:subtext="subtext"
  v-bind:marginLeftTxt="marginLeftTxt"
  v-bind:urlPicture="'/'"
  v-bind:id="'-1'"
  v-bind:title="title"
  />
</template>

<script>
import FolderImgIndex from './FolderImgIndex.vue';

export default {
  name: 'Index',
  components: {
    FolderImgIndex,
  },
  data() {
    return {
      marginTop: '2%',
      marginLeft: '20%',
      marginLeftTxt: '50.6vw',
      title: 'KATHERINE',
      toptext: 'katherine.lib.ira@gmail.com',
      subtitle: ' I\'m a FullStack Developer and Software Engineer',
      subtext: 'I\'m passionate about building engaging experiences that contribute to the overall growth of a company. I possess a Bachelor’s Degree in Computer Science and I have industry experience building websites and web applications using Vue, Angular, Twig, PHP 5.3 and Go. With an eye for intuitive, well designed and user-friendly websites, I love to build websites that not only look great, but also feel great to use, regardless of how the final user access the web.',
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python'],
    };
  },
};
</script>
