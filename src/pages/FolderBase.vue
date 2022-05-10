<template>
  <q-page class="index-content">
    <div style="height: 100hv;  width: 100vh;">
      <div class="mama">
        <div class="child">
            <div class="index-tittle">{{ title }}</div>
        </div>
        <div class="child child2">
            <div class="index-right">
              {{subtitle}}</div>
              <div class="sub-right">{{subtext}}</div>
        </div>
        <div class="child3">
          <div
          v-for="( tecnologia, index ) in tecnologias"
          :key="`tec-${index}`">
            <q-avatar size="md">
              <img src="~assets/arrow.svg">
            </q-avatar>
            <code>{{tecnologia}}</code>
          </div>
        </div>
        </div>
      </div>
  </q-page>
</template>
<script>
export default {
  name: 'FolderBase',
  props: {
    title: {
      type: String,
      required: '',
    },
    subtitle: {
      type: String,
      default: '',
    },

    subtext: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python', 'golang'],
    };
  },
};
</script>
