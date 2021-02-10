<template>
  <q-page class="index-content">
    <div style="height: 100hv;  width: 100vw;">
      <div class="mama">
        <div class="child">
            <h3>KATHERINE LIBERONA IRARRAZABAL</h3>
            <code>grid-area: 1 / 1 / 2 / 2;</code>
        </div>
        <div class="child child2">
            <div class="index-right">
              I'm Chilean FrontEnd Developer,
              Software Engineering</div>
        </div>
        <div class="child3">
          <div
          v-for="( tecnologia, index ) in tecnologias"
          :key="`tec-${index}`">
          ---><code>{{tecnologia}}</code>
          </div>
        </div>
        </div>
      </div>
    <div>
      <h2 class="index-left">Katherine Liberona Irarrazabal</h2>
      <h2 class="index-left">I'm Chilean</h2>
      <h2 class="index-left">FrontEnd Developer</h2>
      <h2 class="index-left">Software Engineering</h2>
      <div><q-icon name="local_post_office" /> katherine.lib.ira@gmail.com</div>
    </div>
    <div >
      <div>
        <div><q-icon name="local_post_office"/></div>
        <h3 class="index-right">Vue, Angular</h3>
        </div>
      <div>
        <div><q-icon name="local_post_office"/></div>
        <h3 class="index-right">Javascript, css, html, Twig</h3>
        </div>
      <div>
        <div><q-icon name="local_post_office"/></div>
       <h3 class="index-right"> Php, Python, Java</h3>
        </div>
      <div>
        <div><q-icon name="local_post_office"/></div>
        <h3 class="index-right">Adobe Creative Suite (Photoshop, sketch).</h3>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      tecnologias: ['Vue', 'Google Maps API', 'vue-chartjs'],
    };
  },
};
</script>
