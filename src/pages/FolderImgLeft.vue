<template>
  <div
  style="padding-top: 4%; padding-bottom: 4%;"
  class="grid-container-left ">
    <div
    style=
    "box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
    grid-area: 1 row / 1 col / span 3 / span 2;
    height: 70%;"
    >
    </div>
    <div
    style="
    grid-column: col 4/span 1;
    grid-row: 1 row;
    font-weight: 300;"
    class="sub-right titulo-estilo">{{subtitle}}</div>
    <div
    style="
    grid-row: 2 row/ span 4;
    grid-column: 4 col;"
    class="item-7">
      <div>{{subtext}}</div>
      <div v-for="lenguaje in tecnologias" :key="lenguaje">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: cover;
        width: 7%;
        max-height: 100%;"
      />
        <code>{{lenguaje}}</code>
      </div>
    </div>
    <div
    style="
    grid-row: 2 row / span 2;
    grid-column: 2 col / span 2;"
    class="item-2-left">
      <img
        v-if="id===2"
        src="~assets/falabella.jpeg"
        id="companyLogo"
        style=
        "object-fit: cover;
        width: 100%;
        max-height: 100%;"
      />

      <img
        v-if="id===4"
        src="~assets/hakaton.jpeg"
        id="companyLogo"
        style=
        "object-fit: cover;
        width: 100%;
        max-height: 100%;"
      />

    </div>
  </div>
</template>

<script>
export default {
  name: 'FolderImg',
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
      type: Number,
    },
  },
  data() {
    return {
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python', 'golang'],
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
