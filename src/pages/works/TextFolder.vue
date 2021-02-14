<template>
  <div
  v-on:click="scrollToWorkSelelected(urlPicture)"
  class="grid-container-left">
    <div
    style="font-size: calc(3em + 1vw);"
    class="item-5-left sub-right">{{subtitle}}</div>
    <div
    style="font-size: calc(1.8em + 1vw);"
    class="item-7-left">{{subtext}}</div>
    <div
    style="
    grid-column: col 2;
    grid-row: row 4;"
    class="item-2-left">
      <div
        v-if="id===2"
        id="companyLogo1"
        style=
        "object-fit: cover;
        width: 100%;
        display: flex;
        font-size: calc(1em + 1vw);
        justify-content: center;
        max-height: 100%;"
      >hola mundo</div>
      <div
        v-if="id===4"
        id="companyLogo2"
        style=
        "object-fit: cover;
        width: 100%;
        font-size: calc(1em + 1vw);
        display: flex;
        justify-content: center;
        max-height: 100%;"
      >Chao mundo</div>
    </div>
    <div
    style=
    "grid-column: col 2 / span 3;
      grid-row: row 4;"
    class="item-2-left">
      <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: cover;
        width: 7%;
        max-height: 100%;"
      />
    </div>
    <div
    style=
    "grid-column: col 2 / span 3;
      grid-row: row 4;"
    class="item-2-left">
      <img
        src="~assets/arrow.svg"
        id="arrow2"
        style=
        "object-fit: cover;
        width: 7%;
        max-height: 100%;"
      />
    </div>
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
