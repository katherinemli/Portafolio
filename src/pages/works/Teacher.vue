<template>
  <q-page class="wherex-parent">
    <div class="wherex-child">
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
    <div class="wherex-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Brief</div>
      </div>
      <div class="wherex-child-right">
        <div>{{parrafo1}}</div>
      </div>
    </div>
    <div class="wherex-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Solution</div>
      </div>
      <div class="wherex-child-right">
        <div>{{textParrafo}}</div>
      </div>
    </div>
    <div class="wherex-child">
      <Step/>
    </div>
    <div style="width: 100%;" class="work-content">
        <div> <router-link  to="falabella" class="text-h6">Prev</router-link ></div>
        <div> <router-link  to="/#work" fragment="work" class="text-h6">All</router-link ></div>
        <div> <router-link  to="citiapps" class="text-h6">Next</router-link ></div>
    </div>
  </q-page>
</template>
<script>
import Step from './Step.vue';

export default {
  name: 'Teacher',
  components: {
    Step,
  },
  data() {
    return {
      heightValue: 700,
      parrafo1: 'Web platform for quotes and tenders that aims to transform the acquisition processes of big companies.',
      textParrafo: 'Allow Suppliers to have new business opportunities through access to more buyers; and to the Buyers to ensure a higher level of competence, efficiency and control in their procurement processes, generating significant benefits.',
      tecnologias: ['Angular', 'twig', 'php'],
      widthValue: 800,
    };
  },
};
</script>
