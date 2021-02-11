<template>
  <q-page class="wherex-parent">
    <div class="wherex-child">
      <FolderBase
      v-bind:title="title"
      v-bind:subtitle="subtitle"
      v-bind:subtext="subtext"
      />
    </div>
    <div style="width: 100%;" class="work-content">
        <div> <router-link  to="citiapps" class="text-h6">Prev</router-link ></div>
        <div> <router-link  to="/#work" fragment="work" class="text-h6">All</router-link ></div>
        <div> <router-link  to="falabella" class="text-h6">Next</router-link ></div>
    </div>
  </q-page>
</template>
<script>
import FolderBase from '../FolderBase.vue';

export default {
  name: 'Wherex',
  components: {
    FolderBase,
  },
  data() {
    return {
      heightValue: 500,
      title: 'KATHERINE',
      subtitle: ' I\'m a FrontEnd Developer and Software Enginee',
      subtext: 'With an eye for intuitive, well designed and user-friendly websites, I love to build websites that not only look great, but also feel great to use, regardless of how the final user access the web.',
      parrafo1: 'Web platform for quotes and tenders that aims to transform the acquisition processes of big companies.',
      textParrafo: 'Allow Suppliers to have new business opportunities through access to more buyers; and to the Buyers to ensure a higher level of competence, efficiency and control in their procurement processes, generating significant benefits.',
      tecnologias: ['Angular', 'twig', 'php'],
      widthValue: 500,
    };
  },
};
</script>
