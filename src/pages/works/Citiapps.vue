<template>
  <q-page class="wherex-parent">
    <div class="citiapps-child">
      <div class="wherex-child-left">
          <div class="wherex-child-text" >Tecnologias</div>
          <div class="wherex-child-text"
          v-for="( tecnologia, index ) in tecnologias"
          :key="`tec-${index}`">
            {{tecnologia}}
          </div>
      </div>
      <div class="wherex-child-right">
        <div>Wherex</div>
        <div>Tender Management Platform</div>
        <div>Sep-2020 to Now</div>
        <div>Full Stack Engineer</div>
      </div>
    </div>
    <div class="citiapps-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Brief</div>
      </div>
      <div class="wherex-child-right">
        <div>{{parrafo}}</div>
      </div>
    </div>
    <div class="citiapps-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Solution</div>
      </div>
      <div class="wherex-child-right">
        <div>{{textParrafo}}{{parrafo1}}</div>
      </div>
    </div>
    <div class="citiapps-child">
      <Step/>
    </div>
    <div style="width: 100%;" class="work-content">
        <div> <router-link  to="teacher" class="text-h6">Prev</router-link ></div>
        <div> <router-link  to="/#work" fragment="work" class="text-h6">All</router-link ></div>
        <div> <router-link  to="wherex" class="text-h6">Next</router-link ></div>
    </div>
  </q-page>
</template>
<script>
import Step from './Step.vue';

export default {
  name: 'Citiaps',
  components: {
    Step,
  },
  data() {
    return {
      heightValue: 700,
      parrafo: 'Plataformas para gestión de voluntarios y entidades gubernamentales ante situaciones de catastrofes nacionales como terremotos o maremotos',
      parrafo1: 'Implemented new user-facing features using Vue.js, JavaScript, HTML, CSS3, Sass, D3 and Google Maps.',
      textParrafo: 'Worked closely with a small team of developers to create optimized application for maximum speed and scalability and ensured the technical feasibility of UI/UX designs',
      tecnologias: ['Vue', 'Google Maps API', 'D3', 'Twitter APIS'],
      widthValue: 800,
    };
  },
};
</script>
