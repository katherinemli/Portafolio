<template>
  <div
  class="grid-container-left">
    <div class="item-6"
    style=
    "object-fit: cover;
    width: 100%;
    max-height: 100%;
    box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
    grid-column: col 2;
    grid-row: row 1/ span 6;
    "
    >
    </div>
    <div
    class="item-5-left sub-right">{{subtitle}}</div>
    <div
    class="item-7-left">{{subtext}}</div>
    <div
    style="
    grid-column: col 2;
    grid-row: row 3;"
    class="item-2-left">
      <div
        v-if="id===2"
        id="companyLogo1"
        class="size-font"
        style=
        "object-fit: cover;
        width: 100%;
        justify-content: center;
        max-height: 100%;"
      >hola mundo</div>
      <div
        v-if="id===4"
        id="companyLogo5"
        class="size-font"
        style=
        "object-fit: cover;
        width: 100%;
        flex-direction: column;
        align-items: center;
        max-height: 100%;"
      >
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        <div>Angular</div>
      </div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        Twig</div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        PHP 5.3</div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        Go</div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        MongoDB Atlas</div>
      </div>
      <div
        v-if="id===5"
        id="companyLogo5"
        class="size-font"
        style=
        "object-fit: cover;
        width: 100%;
        flex-direction: column;
        align-items: center;
        max-height: 100%;"
      >
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        <div>Vue</div>
      </div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        Google Maps</div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        Chart.js</div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        View Design</div>
      <div style="display:flex; flex-direction: row;">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: fit;
        max-height: 100%;"/>
        Process design</div>
      </div>
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
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python'],
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
