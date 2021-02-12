<template>
  <div>
     <FolderImg
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="users[0].name"
    v-bind:toptext="users[0].company"
    v-bind:subtext="users[0].about"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="users[0].url"
    v-bind:id="1"
    />
    <FolderImgLeft
    v-bind:marginTop="'-4vw'"
    v-bind:marginLeft="'58.6vw'"
    v-bind:subtitle="users[1].name"
    v-bind:toptext="users[1].company"
    v-bind:subtext="users[1].about"
    v-bind:marginLeftTxt="'-51.4vw'"
    v-bind:urlPicture="users[1].url"
    v-bind:id="2"
    />
    <FolderImg
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="users[2].name"
    v-bind:toptext="users[2].company"
    v-bind:subtext="users[2].about"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="users[2].url"
    v-bind:id="3"
    />
    <FolderImgLeft
    v-bind:marginTop="'-4vw'"
    v-bind:marginLeft="'58.6vw'"
    v-bind:subtitle="users[3].name"
    v-bind:toptext="users[3].company"
    v-bind:subtext="users[3].about"
    v-bind:marginLeftTxt="'-51.4vw'"
    v-bind:urlPicture="users[3].url"
    v-bind:id="4"
    />
    <!--<div>b</div>
    <div>c</div>
    <div>d</div>
     <FolderImg
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="users[0].name"
    v-bind:toptext="users[0].company"
    v-bind:subtext="users[0].about"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="users[0].url"
    v-bind:id="1"
    />
    <FolderImg
    v-bind:marginTop="'-4vw'"
    v-bind:marginLeft="'58.6vw'"
    v-bind:subtitle="users[1].name"
    v-bind:toptext="users[1].company"
    v-bind:subtext="users[1].about"
    v-bind:marginLeftTxt="'-51.4vw'"
    v-bind:urlPicture="users[1].url"
    v-bind:id="2"
    />
    <FolderImg
    v-bind:marginTop="marginTop"
    v-bind:marginLeft="marginLeft"
    v-bind:subtitle="users[2].name"
    v-bind:toptext="users[2].company"
    v-bind:subtext="users[2].about"
    v-bind:marginLeftTxt="marginLeftTxt"
    v-bind:urlPicture="users[2].url"
    v-bind:id="3"
    />
    <FolderImg
    v-bind:marginTop="'-4vw'"
    v-bind:marginLeft="'58.6vw'"
    v-bind:subtitle="users[3].name"
    v-bind:toptext="users[3].company"
    v-bind:subtext="users[3].about"
    v-bind:marginLeftTxt="'-51.4vw'"
    v-bind:urlPicture="users[3].url"
    v-bind:id="4"
    /> -->

<!--     <q-card
    class="my-card"
    v-for="user in users"
    :key="user.guid"
    v-bind:style="{ cursor: selectedCursor }"
    flat
    bordered>
      <div
      v-on:click="scrollToWorkSelelected(user.url)">
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
        <q-card-section>
          <div class="text-overline text-orange-9">{{user.company}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{user.tittle}}</div>
          <div class="text-caption text-grey">
              <div class="text-subtitle2">{{user.name}} - {{user.company}}</div>
              <div class="text-subtitle2">
                {{formatDate(user.fechaInicio)}} to
                {{formatDate(user.fechaFinal)}}
              </div>
          </div>
        </q-card-section>
      </div>
    </q-card> -->
  </div>
</template>
<script>
import usersData from './myWork.json';
import FolderImg from './FolderImg.vue';
import FolderImgLeft from './FolderImgLeft.vue';
/* eslint-disable */
export default {
  name: 'Work',
  components: {
    FolderImg,
    FolderImgLeft,
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
