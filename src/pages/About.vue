<template>
    <div ref="myList"
    style="
    display: flex;
    flex-direction: column;">
      <div style="
      color: rgb(39, 52, 96);
      line-height: 5vh;
      font-family: 'Alegreya Sans', sans-serif;
      font-size: calc(1rem + ((1vw - 0.48rem) * 0.6944));
      display: grid;
      justify-content: flex-end;
      align-items: end;
      font-weight: 800;
      font-size: calc((25 * 1px) + (100 - 25) * ((100vw - 420px) / (1200 - 420)));

      ">About Me</div>
      <div
        v-for="( tecnologia, index ) in aboutMePar"
        :key="index"
        class="example-item"
      >
        <FolderText
        v-bind:marginTop="marginTop"
        v-bind:marginLeft="marginLeft"
        v-bind:subtitle="subtitle"
        v-bind:toptext="toptext"
        v-bind:subtext="subtext"
        v-bind:marginLeftTxt="marginLeftTxt"
        v-bind:urlPicture="'/'"
        v-bind:id="2"
        v-bind:title="title"
        />
      </div>
      <div
      v-for="tecnologia in aboutMeImpar"
      :key="tecnologia"
      transition="jump-left"
      class="example-item"
      >
        <FolderText
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
      </div>
    </div>
</template>
<script>
import usersData from './myWork.json';
import FolderImg from './FolderImg.vue';
import FolderText from './FolderText.vue';
/* eslint-disable */
export default {
  name: 'About',
  components: {
    FolderImg,
    FolderText,
  },
  computed: {
  },
  data() {
    return {
      title: 'KATHERINE',
      toptext: 'katherine.lib.ira@gmail.com',
      subtitle: ' I\'m a FrontEnd Developer and Software Engineer',
      subtext: 'With an eye for intuitive, well designed and user-friendly websites, I love to build websites that not only look great, but also feel great to use, regardless of how the final user access the web.',
      users: usersData,
      heightValue: 700,
      widthValue: 800,
      aboutMePar: [2],
      aboutMeImpar: [4],
      urlPicture: 'hakaton.jpeg',
      urlPicture2: 'hakaton2.jpg',
      urlPicture3: 'sube1.jpg',
      urlPicture4: 'sube2.jpg',
      marginTop: '2%',
      marginLeft: '20%',
      marginLeftTxt: '50.6vw',
      selectedCursor: `url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='32px' height='32px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E %3Cpath d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z'/%3E %3C/svg%3E"), pointer`,
    };
  },
  methods: {
    scrollToWorkSelelected(url) {
      console.log('que se esta mandando?', url);
      const urlComplete = url.trim('/');
      this.$router.push({ path: url, params: { id: urlComplete } });
    },
    formatDate(fecha) {
      const fechaSeparada = fecha.split(',');
      let dt = new Date();
      console.log('date: ', fecha);
      let dateString = `${dt.getUTCDate()}/${dt.getUTCMonth() + 1}/${dt.getUTCFullYear()}`;
      if (fecha !== '') {
        dt = new Date(
          parseInt(fechaSeparada[0], 10),
          parseInt(fechaSeparada[1], 10),
          parseInt(fechaSeparada[2], 10),
        );
        dateString = `${dt.getUTCDate()}/${dt.getUTCMonth()}/${dt.getUTCFullYear()}`;
      }
      return dateString;
    },
  },
};
/* eslint-enable */
</script>
