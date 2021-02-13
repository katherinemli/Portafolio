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
        <div>Falabella</div>
        <div>Last Mille Management Platform</div>
        <div>Jan-2018 to Jun-2018</div>
        <div>Product Owner</div>
      </div>
    </div>
    <div class="citiapps-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Brief</div>
      </div>
      <div class="wherex-child-right">
        <div>{{brief_1}}</div>
      </div>
    </div>
    <div class="citiapps-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Solution</div>
      </div>
      <div class="wherex-child-right">
        <div class="citiapps-child">
          <Step/>
        </div>
      </div>
    </div>

    <div style="width: 100%;" class="work-content">
        <div> <router-link  to="citiapps" class="text-h6">Prev</router-link ></div>
        <div> <router-link  to="/#work" fragment="work" class="text-h6">All</router-link ></div>
        <div> <router-link  to="teacher" class="text-h6">Next</router-link ></div>
    </div>
  </q-page>
</template>
<script>
import Step from './Step.vue';

export default {
  components: {
    Step,
  },
  name: 'Wherex',
  data() {
    return {
      heightValue: 500,
      parrafo1: 'Geosort project, software responsible for planning, tracking and geocoding orders from Falabella.com.',
      textParrafo: 'Developed web user interface with Vue from scratch, Implemented maintainable, scalable, responsive code, Able to solve problems efficiently, think creatively and deliver user focused software solutions in a timely manner, Engaged with clients for suggestions and feedback throughout development and implementation process',
      tecnologias: ['Vue', 'Google Maps API', 'vue-chartjs'],
      brief_1: 'I designed and developed a web interface using VUE from scratch with a maintainable, scalable and responsive code',
      brief_2: '',
      widthValue: 500,
    };
  },
};
</script>
