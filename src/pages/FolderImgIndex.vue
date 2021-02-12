<template>
  <div
  style="cursor: default;"
  class="grid-container">
    <div class="item-1">{{title}}</div>
    <div class="item-6"
    style=
    "width: 79%;
    height: 83.3%;
    margin: 15% 0% 0% 5%;
    box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
    "
    >
    </div>
    <div class="item-3">3</div>
    <div class="item-4">4</div>
    <div class="item-5 sub-right">{{subtitle}}</div>
    <div class="item-7">{{subtext}}</div>
    <div class="item-2">
      <img
        src="~assets/yo.jpg"
        id="companyLogo"
        style=
        "width: 98%;
        max-height: 100%;"
      /></div>
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
