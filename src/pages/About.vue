<template>
  <q-page class="about-content">
    <div class="about-left">
      <div>{{parrafo1}}</div>
      <div>{{parrafo2}}</div>
      <div>{{parrafo3}}</div>
      <div>{{parrafo4}}</div>
      <div>{{parrafo5}}</div>
    </div>
    <div class="about-right">
      <div>{{parrafo6}}</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      position: 150,
      parrafo1: 'Who I Am',
      parrafo2: 'I\'m Front End Developer passionate about building engaging experiences that contribute to the overall growth of a company.',
      parrafo3: 'I possess a Bachelor’s Degree in Computer Science and I have industry experience building websites and web applications using Vue.',
      parrafo4: 'With an eye for intuitive, well designed and user-friendly websites, I love to build websites that not only look great, but also feel great to use, regardless of how the final user access the web.',
      parrafo5: 'Teacher.',
      parrafo6: 'Traveler',
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>
