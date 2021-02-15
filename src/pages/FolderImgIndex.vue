<template>
  <div>
  <div
  v-if="plataformaEscritorio"
  style=
  "height: 125vh;
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
    height: 163.3%;
    margin: 15% 0% 0% 5%;
    box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
    grid-row: row 3;
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
      <img
        src="~assets/yo.jpg"
        id="companyLogo"
        style=
        "width: 98%;
        max-height: 100%;"
      /></div>
  </div>
    <div
  v-if="plataformaMobile"
  style=
  "cursor: default;
  grid-template-columns: [col] 1fr;
  grid-template-rows: [row] 3fr [row] 1fr [row] 1fr;"
  class="grid-container">
    <div
    style="
    font-family: 'Alegreya Sans', sans-serif;
    grid-row: row 1;
    padding-top: 4%;
    display: grid;
    line-height: 6vh;
    justify-content: center;
    font-weight: 800;
    font-size: 18.5vw"
    >{{title}}</div>
    <div
    style="
    font-weight: 300;
    line-height: 6vh;
    padding: 4%;
    font-size: 8vw
    text-align: justify;
    color: rgb(39, 52, 96);
    grid-row: row 2;">
    {{subtitle}}</div>
    <div style="
    padding: 4%;
    grid-row: row 3;
    font-size: calc((25 * 1px) + (20 - 25) * ((40vw - 420px) / (1200 - 420)));
    text-align: justify;
    line-height: 6vh;
    color: rgb(39, 52, 96);
    font-weight: 100;"
    >{{subtext}}</div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'FolderImgIndex',
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
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python'],
      plataformaMobile: this.$q.platform.is.mobile,
      plataformaEscritorio: this.$q.platform.is.desktop,
    };
  },
  methods: {
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
