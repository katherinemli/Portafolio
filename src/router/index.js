import Vue from 'vue';
import VueRouter from 'vue-router';
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'animate.css/animate.min.css';
import routes from './routes';

Vue.use(VueRouter);
Vue.component('lat-lng', latLng);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const scrollBehavior = function calculo(to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  }
  const position = {};

  // scroll to anchor by returning the selector
  if (to.hash) {
    position.selector = to.hash;

    // specify offset of the element
    if (to.hash === '#anchor2') {
      position.offset = { y: 100 };
    }
    // bypass #1number check
    if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
      return position;
    }

    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return false;
  }

  return new Promise((resolve) => {
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some((m) => m.meta.scrollToTop)) {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0;
      position.y = 0;
    }
    position.behavior = 'smooth';
    // wait for the out transition to complete (if necessary)
    this.app.$root.$once('triggerScroll', () => {
      // if the resolved position is falsy or an empty object,
      // will retain current scroll position.
      resolve(position);
    });
  });
};
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
  });

  return Router;
}
