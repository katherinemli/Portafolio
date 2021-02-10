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
        <div>EVIC 2018</div>
        <div>Ganadora Primer Lugar Hackathon Falabella</div>
        <div>
          Profesora y Ayudante de la Universidad de Santiago de Chile
        </div>
        <div>
          Profesora particular
        </div>
        <div>Voluntaria SUBE</div>
        <div>SmarthHouse Project</div>
        <div>Miembro del centro de alumnos del departamento de ingenieria informatica</div>
        <div>Viajera</div>
        <div>Photographer</div>
        <div>March-2013 to Now</div>
      </div>
    </div>
    <div class="citiapps-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Brief</div>
      </div>
      <div class="wherex-child-right">
        <div></div>
      </div>
    </div>
    <div class="citiapps-child">
      <div class="wherex-child-left">
        <div class="wherex-child-text">The Solution</div>
      </div>
      <div class="wherex-child-right">
        <div></div>
      </div>
    </div>
    <div class="citiapps-child">
    </div>
    <div style="width: 100%;" class="work-content">
        <div> <router-link  to="falabella" class="text-h6">Prev</router-link ></div>
        <div> <router-link  to="/#work" fragment="work" class="text-h6">All</router-link ></div>
        <div> <router-link  to="citiapps" class="text-h6">Next</router-link ></div>
    </div>
  </q-page>
</template>
<script>

export default {
  name: 'Teacher',
  data() {
    return {
      heightValue: 700,
      parrafo1: 'Profesora ',
      textParrafo: '',
      tecnologias: ['Python', 'Design & Analysis of Algorithm', 'Distributed Computing', 'Full Stack Development', 'Java', 'C++', 'Maths', 'Chemistry'],
      widthValue: 800,
    };
  },
};
</script>
