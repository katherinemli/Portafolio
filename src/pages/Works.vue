<template>
  <div>
    <div v-if="plataformaEscritorio">
        <div style=
        "color: rgb(39, 52, 96);
        line-height: 5vh;
        font-family: 'Alegreya Sans', sans-serif;
        font-size: calc(1rem + ((1vw - 0.48rem) * 0.6944));
        display: grid;
        justify-content: flex-start;
        align-items: top;
        font-weight: 800;
        font-size: calc((25 * 1px) + (100 - 25) * ((100vw - 420px) / (1200 - 420)));">
        WORKS</div>
        <div style=
        "margin-top: 6%;">
          <FolderImg
          v-bind:marginTop="marginTop"
          v-bind:marginLeft="marginLeft"
          v-bind:subtitle="users[0].name"
          v-bind:toptext="users[0].company"
          v-bind:subtext="users[0].about"
          v-bind:marginLeftTxt="marginLeftTxt"
          v-bind:urlPicture="users[0].url"
          v-bind:id="'1'"
          />
        </div>
        <div>
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
      </div>
      <div>
      <FolderImg
      v-bind:marginTop="marginTop"
      v-bind:marginLeft="marginLeft"
      v-bind:subtitle="users[2].name"
      v-bind:toptext="users[2].company"
      v-bind:subtext="users[2].about"
      v-bind:marginLeftTxt="marginLeftTxt"
      v-bind:urlPicture="users[2].url"
      v-bind:id="'3'"
      />
      </div>
    </div>
<div v-if="plataformaMobile">
    <div
    style="
    font-family: 'Alegreya Sans', sans-serif;
    line-height: 6vh;
    font-weight: 800;
    color: rgb(39, 52, 96);
    font-size: 15vw;
    display: flex;
    justify-items: center;
    padding-left: 3%;
    padding-top: 5%;"
    >WHEREX</div>
    <div
    style="
    display: flex;
    padding: 5%
    font-family: 'Alegreya Sans', sans-serif;
    flex-direction: column;">
    <div
    style="font-weight: 300;
    line-height: 6vh;
    font-size: 6.5vw
    text-align: justify;
    color: rgb(39, 52, 96);"
    >Full Stack Engineer</div>
    <div
    style="font-size: calc((25 * 1px) + (50 - 25) * ((40vw - 420px) / (1200 - 420)));
    text-align: justify;
    line-height: 5vh;
    color: rgb(39, 52, 96);
    font-weight: 100;
    ">Web platform for quotes
    and tenders that aims to
    transform the acquisition processes
    of big companies.</div>
    </div>
    <div
    style="
    display: grid;
    grid-template-columns: 8vw 8vw auto 8vw 5vw;
    grid-template-rows: 2vh 5vh auto 3vh 15vh;">
      <div
      style="
      box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
      width: 100%;
      grid-column-start: 2;
      grid-column-end: span 4;
      grid-row-start: 3;
      grid-row-end: 5;"
      />
      <div
      style="
      grid-column-start: 3;
      grid-column-end: 6;
      grid-row-start: 2;
      grid-row-end: span 2;"
      >
        <img
          src="~assets/licitacion.png"
          id="companyLogo"
          style=
          "width: 100%;
          max-height: 100%;"
        />
      </div>
    </div>
  </div>
  <div v-if="plataformaMobile">
    <div
    style="
    font-family: 'Alegreya Sans', sans-serif;
    line-height: 6vh;
    font-weight: 800;
    color: rgb(39, 52, 96);
    font-size: 15vw;
    display: flex;
    justify-items: center;
    padding-left: 3%;
    padding-top: 5%;"
    >FALABELLA</div>
    <div
    style="
    display: flex;
    padding: 5%
    font-family: 'Alegreya Sans', sans-serif;
    flex-direction: column;">
    <div
    style="font-weight: 300;
    line-height: 6vh;
    font-size: 6.5vw
    text-align: justify;
    color: rgb(39, 52, 96);"
    >Product Manager</div>
    <div
    style="font-size: calc((25 * 1px) + (50 - 25) * ((40vw - 420px) / (1200 - 420)));
    text-align: justify;
    line-height: 5vh;
    color: rgb(39, 52, 96);
    font-weight: 100;
    ">Geosort project, software responsible for planning,
    tracking and geocoding orders from Falabella.com.</div>
    </div>
    <div
    style="
    display: grid;
    grid-template-columns: 0 auto auto 8vw 10vw;
    grid-template-rows: 2vh 5vh auto 3vh 15vh;">
      <div
      style="
      box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
      width: 100%;
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 3;
      grid-row-end: 5;"
      />
      <div
      style="
      grid-column-start: 1;
      grid-column-end: span 3;
      grid-row-start: 2;
      grid-row-end: span 2;"
      >
        <img
          src="~assets/falabella.jpeg"
          id="companyLogo"
          style=
          "width: 100%;
          max-height: 100%;"
        />
      </div>
    </div>
  </div>
  <div v-if="plataformaMobile">
    <div
    style="
    font-family: 'Alegreya Sans', sans-serif;
    line-height: 6vh;
    font-weight: 800;
    color: rgb(39, 52, 96);
    font-size: 15vw;
    display: flex;
    justify-items: center;
    padding-left: 3%;
    padding-top: 5%;"
    >CITIAPPS</div>
    <div
    style="
    display: flex;
    padding: 5%
    font-family: 'Alegreya Sans', sans-serif;
    flex-direction: column;">
    <div
    style="font-weight: 300;
    line-height: 6vh;
    font-size: 6.5vw
    text-align: justify;
    color: rgb(39, 52, 96);"
    >Front End Developer</div>
    <div
    style="font-size: calc((25 * 1px) + (50 - 25) * ((40vw - 420px) / (1200 - 420)));
    text-align: justify;
    line-height: 5vh;
    color: rgb(39, 52, 96);
    font-weight: 100;
    ">Platforms for managing volunteers
    and government entities in situations
    of national catastrophes such as earthquakes
    or tsunamis.</div>
    </div>
    <div
    style="
    display: grid;
    grid-template-columns: 8vw 8vw auto 8vw 5vw;
    grid-template-rows: 2vh 5vh auto 3vh 15vh;">
      <div
      style="
      box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
      width: 100%;
      grid-column-start: 2;
      grid-column-end: span 4;
      grid-row-start: 3;
      grid-row-end: 5;"
      />
      <div
      style="
      grid-column-start: 3;
      grid-column-end: 6;
      grid-row-start: 2;
      grid-row-end: span 2;"
      >
        <img
          src="~assets/volunteering.jpg"
          id="companyLogo"
          style=
          "width: 100%;
          max-height: 100%;"
        />
      </div>
    </div>
  </div>
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
      title: 'wORKS',
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
      plataformaMobile: this.$q.platform.is.mobile,
      plataformaEscritorio: this.$q.platform.is.desktop,
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
