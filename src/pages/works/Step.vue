<template>
  <div >

    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      animated
      class="no-shadow"
      done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"
    >
      <q-step
        :name="1"
        title="Importar"
        icon="settings"
        :done="done1"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.

      </q-step>

      <q-step
        :name="2"
        title="Geocodificar"
        icon="create_new_folder"
        :done="done2"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.

      </q-step>

      <q-step
        :name="3"
        title="Planificar"
        icon="add_comment"
        :done="done3"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.
      </q-step>
      <q-step
        :name="4"
        title="Rutas"
        icon="add_comment"
        :done="done4"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.
      </q-step>
            <q-step
        :name="5"
        title="Seguimiento"
        icon="add_comment"
        :done="done5"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.

      </q-step>
    </q-stepper>
  </div>
</template>
<script>
export default {
  name: 'Step',
  data() {
    return {
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      done4: false,
      done5: false,
    };
  },
  methods: {
    reset() {
      this.done1 = false;
      this.done2 = false;
      this.done3 = false;
      this.done4 = false;
      this.done5 = false;
      this.step = 1;
    },
  },
};
</script>
