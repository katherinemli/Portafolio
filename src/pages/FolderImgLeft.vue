<template>
  <div
  v-on:click="scrollToWorkSelelected(urlPicture)"
  class="grid-container-left">
    <div class="item-5-left sub-right">{{subtitle}}</div>
    <div class="item-7-left">{{subtext}}</div>
    <div class="item-2-left">
      {{id}}
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
    <div
    style=
    "grid-column: col 3/span 3;
     grid-row: row 4/ span 1;
     margin-left: 2%;"
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
    "grid-column: col 3/span 3;
     grid-row: row 4/ span 1;
     margin-top: 12%;
     margin-left: 2%;"
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
