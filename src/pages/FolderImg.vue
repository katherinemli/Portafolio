<template>
  <q-page
  v-on:click="scrollToWorkSelelected(urlPicture)"
  class="index-content">
    <div v-if="id===1" style="height: 100hv;  width: 100vh;">
      <div
      class="work-style" :style="bodyMargin()">
        <div class="child child-2-img" :style="textMargin()">
            <div class="index-top">{{toptext}}</div>
            <div class="index-right">{{subtitle}}</div>
            <div class="sub-right">{{subtext}}</div>
        </div>
        <div class="child-3-img">
            <div class="content-logo">
                <img
                src="~assets/hakaton.jpeg"
                id="companyLogo"
               />
            </div>
        </div>
        </div>
    </div>
    <div v-if="id===2" style="height: 100hv;  width: 100vh;">
      <div
      class="work-style" :style="bodyMargin()">
        <div class="child child-2-img" :style="textMargin()">
            <div class="index-top">{{toptext}}</div>
            <div class="index-right">{{subtitle}}</div>
            <div class="sub-right">{{subtext}}</div>
        </div>
        <div class="child-3-img-right">
            <div class="content-logo">
                <img
                src="~assets/hakaton2.jpg"
                id="companyLogo"
               />
            </div>
        </div>
        </div>
      </div>
    <div v-if="id===3" style="height: 100hv;  width: 100vh;">
      <div
      class="work-style" :style="bodyMargin()">
        <div class="child child-2-img" :style="textMargin()">
            <div class="index-top">{{toptext}}</div>
            <div class="index-right">{{subtitle}}</div>
            <div class="sub-right">{{subtext}}</div>
        </div>
        <div class="child-3-img">
            <div class="content-logo">
                <img
                src="~assets/sube1.jpg"
                id="companyLogo"
               />
            </div>
        </div>
        </div>
      </div>
    <div v-if="id===4" style="height: 100hv;  width: 100vh;">
      <div
      class="work-style" :style="bodyMargin()">
        <div class="child child-2-img" :style="textMargin()">
            <div class="index-top">{{toptext}}</div>
            <div class="index-right">{{subtitle}}</div>
            <div class="sub-right">{{subtext}}</div>
        </div>
        <div class="child-3-img-right">
            <div class="content-logo">
                <img
                src="~assets/sube2.jpg"
                id="companyLogo"
               />
            </div>
        </div>
        </div>
      </div>
  </q-page>
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
