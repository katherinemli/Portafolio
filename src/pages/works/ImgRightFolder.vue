<template>
  <div
  v-on:click="scrollToWorkSelelected(urlPicture)"
  class="grid-container">
    <div
    style=
    "box-shadow: rgb(61, 255, 190) 0px 0px 0px 8px;
    height: 80%;
    grid-row: 1 row / span 2;
    grid-column: 4 col / span 2;"
    >
    </div
    ><div
    style="
    grid-column: col 1/span 2;
    grid-row: 1 row;    font-weight: 300;
    font-size: calc((25 * 1px) + (100 - 25) * ((100vw - 420px) / (1200 - 420)));"
    class="sub-right">{{subtitle}}</div>
    <div
    style="
    grid-column: col 1/span 2;
    grid-row: 2 row;
    font-size: calc(1.8em + 1vw);"
    class="item-7">
      <div>{{subtext}}</div>
<!--       <div v-for="lenguaje in tecnologias" :key="lenguaje">
        <img
        src="~assets/arrow.svg"
        id="arrow1"
        style=
        "object-fit: cover;
        width: 7%;
        max-height: 100%;"
      />
        <code>{{lenguaje}}</code>
      </div> -->
    </div>

    <div
    style="
    grid-row: row 2 ;
    grid-column: 3 col/ span 2;"
    class="item-2">
      <img
        v-if="id==='1'"
        src="~assets/licitacion.png"
        id="companyLogo"
        style=
        "object-fit: cover;
        width: 100%;
        max-height: 100%;
        grid-row: row 4;"
      />
      <img
        v-if="id==='3'"
        src="~assets/volunteering.jpg"
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
      type: String,
      default: '',
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
