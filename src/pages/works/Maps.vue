<template>
<div style="height: 500px; width: 100%">
    <div style="height: 200px; overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :icon="icon"  :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
          </div>
        </l-popup>
      </l-marker>
    <l-marker :lat-lng="withTooltip" :icon="icon">
      </l-marker>
      <l-marker :icon="icon" :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng, icon } from 'leaflet';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
} from 'vue2-leaflet';

export default {
  name: 'Maps',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
  data() {
    return {
      plataformaMobile: this.$q.platform.is.mobile,
      plataformaEscritorio: this.$q.platform.is.desktop,
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python'],
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      icon: icon({
        iconUrl: 'https://image.flaticon.com/icons/png/512/5426/5426368.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
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
