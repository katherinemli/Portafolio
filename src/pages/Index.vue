<template>
  <q-page class="index-content">
    <div style="height: 100hv;  width: 100vh;">
      <div class="mama tia">
        <div class="child child-img">
            <div class="index-tittle">{{ title }}</div>
        </div>
        <div class="child child-2-img">
            <div class="index-top">{{toptext}}</div>
            <div class="index-right">{{subtitle}}</div>
            <div class="sub-right">{{subtext}}</div>
        </div>
        <div class="child-3-img">
            <div class="content-logo">
                <img id="companyLogo"
                class="img-hidden"
                src="~assets/yo.jpg"
                />
            </div>
        </div>
        </div>
      </div>
  </q-page>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      title: 'KATHERINE',
      toptext: 'katherine.lib.ira@gmail.com',
      subtitle: ' I\'m a FrontEnd Developer and Software Engineer',
      subtext: 'With an eye for intuitive, well designed and user-friendly websites, I love to build websites that not only look great, but also feel great to use, regardless of how the final user access the web.',
      tecnologias: ['Vue', 'Angular', 'Twig', 'Python'],
    };
  },
};
</script>
