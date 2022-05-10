<template>
  <div>
  <div
  v-if="plataformaEscritorio"
  style=
  "height: 100vh;
  padding: 5%;
  cursor: default;
  grid-template-columns: [col] 0.5fr [col] 0.8fr [col] 0.1fr [col] 1fr [col] 0.1fr;
  grid-template-rows: [row] 0.3fr [row] 0.3fr [row] 0.1fr [row] 1fr;"
  class="grid-container">
    <div class="item-1">{{title}}</div>
    <div
    class="item-6"
    style=
    "width: 79%;
    height: 72.3%;
    margin: 15% 0% 0% 5%;
    box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
    grid-row: row 3 / span 2;
    "
    >
    </div>
    <div class="item-3">
    </div>
    <div class="item-4">4</div>
    <div class="item-5">{{subtitle}}</div>
    <div class="item-7">{{subtext}}</div>
    <div
    style="grid-row: row 3 / span 2;"
    class="item-2">
    <Maps/>

      <img
        src="~assets/licitacion.png"
        id="companyLogo"
        style=
        "width: 98%;
        max-height: 100%;"
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
    font-size: 18.5vw;
    display: flex;
    justify-items: center;
    padding-left: 3%;
    padding-top: 5%;"
    >{{title}}</div>
    <div
    style="
    display: flex;
    padding: 5%
    font-family: 'Alegreya Sans', sans-serif;
    flex-direction: column;">
    <div
    style="font-weight: 300;
    line-height: 6vh;
    font-size: 8vw
    text-align: justify;
    color: rgb(39, 52, 96);"
    >{{subtitle}}</div>
    <div
    style="font-size: calc((25 * 1px) + (50 - 25) * ((40vw - 420px) / (1200 - 420)));
    text-align: justify;
    line-height: 5vh;
    color: rgb(39, 52, 96);
    font-weight: 100;
    ">{{subtext}}</div>
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
          src="~assets/licitacion.png"
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
import Maps from './Maps.vue';

export default {
  name: 'FolderImgIndex',
  components: {
    Maps,
  },
  props: {
    title: {
      type: String,
      required: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    toptext: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    marginTop: {
      type: String,
      default: '7vw',
    },
    marginLeft: {
      type: String,
      default: '58vw',
    },
    marginLeftTxt: {
      type: String,
      default: '',
    },
    urlPicture: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      plataformaMobile: this.$q.platform.is.mobile,
      plataformaEscritorio: this.$q.platform.is.desktop,
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python', 'golang'],
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert('Click!');
    },
    bodyMargin() {
      console.log('entro?1: ', this.marginTop);
      console.log('entro?2: ', this.marginLeft);
      return { margin: `${this.marginTop} ${this.marginLeft} !important` };
    },
    textMargin() {
      console.log('entro?1: ', this.marginTop);
      console.log('entro?2: ', this.marginLeft);
      return { marginLeft: `${this.marginLeftTxt} !important` };
    },
    textImg() {
      console.log('entro?1: ', this.marginTop);
      console.log('entro?2: ', this.marginLeft);
      return `@/assets/${this.urlPicture}`;
    },
    scrollToWorkSelelected(url) {
      console.log('que se esta mandando?', url);
      const urlComplete = url.trim('/');
      this.$router.push({ path: url, params: { id: urlComplete } });
    },
  },
};
</script>
