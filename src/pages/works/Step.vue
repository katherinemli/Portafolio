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
        Se creó un sistema centralizado que conecta los sistemas de la empresa
        distribuidora Tradis con los pedidos hechos en la página web Falabella.com
      </q-step>

      <q-step
        :name="2"
        title="Geocodificar"
        icon="create_new_folder"
        :done="done2"
      >
        Usando API Google Maps, Vue y Go se diseño un sistema que se adecua a el
        lenguaje y los modismos de Chile.

      </q-step>

      <q-step
        :name="3"
        title="Planificar"
        icon="add_comment"
        :done="done3"
      >
        Se diseñó un algortimo de planificación en Go que permite tomar en
        consideración las variables que se presentan durante todo el proceso de
        entrega como por ejemplo ferias, tiempo de estacionamiento, horario o
        congestión vehicular.
        Se diseño la vista que permitia crear, modificar y ver la planificación
        para los distintos participantes del proceso.
        The dispatch unit optimizes delivery routes based on drop-off locations,
        goods needed to be transported, and driver capabilities — all with an eye
        towards minimizing costs.
      </q-step>
      <q-step
        :name="4"
        title="Rutas"
        icon="add_comment"
        :done="done4"
      >
      En este paso se permite agregar automaticamente a los choferes las rutas
      planificadas tomando en consideración la cantidad de choferes disponibles y
      sus antiguas rutas y zonas de despacho.
      </q-step>
            <q-step
        :name="5"
        title="Seguimiento"
        icon="add_comment"
        :done="done5"
      >
        This is the step where orders and requests are monitored both by the
        sender and the end recipient, who is likely following the status of
        their delivery through a tracking number.
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
