<template>
  <q-page class="index-content">
    <div style="height: 100hv;  width: 100vh;">
      <div class="work-style" :style="bodyMargin()">
        <div class="child child-img">
            <div class="index-tittle">{{ title }}</div>
        </div>
        <div class="child child-2-img" :style="textMargin()">
            <div class="index-top">{{toptext}}</div>
            <div class="index-right">{{subtitle}}</div>
            <div class="sub-right">{{subtext}}</div>
        </div>
        <div class="child-3-img">
            <div class="content-logo">
              {{id}}
                <img
                src="~assets/hakaton.jpeg"
                v-if="id===1"
                id="companyLogo"
               />
                <img
                src="~assets/hakaton2.jpg"
                v-if="id===2"
                id="companyLogo"
               />
                <img
                src="~assets/sube1.jpg"
                v-if="id===3"
                id="companyLogo"
               />
                <img
                src="~assets/sube2.jpg"
                v-if="id===4"
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
  },
};
</script>
