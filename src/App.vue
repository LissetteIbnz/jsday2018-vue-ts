<template>
  <div id="app" class="w3-container">
    <div class="w3-cell-row">
      <div class="w3-container w3-cell w3-center">
        <img alt="Vue logo" src="./assets/logo.png">
        <h1>Vue + Typescript</h1>
        <h2>Decorators vs Extend, Fight!</h2>
        <div class="w3-bar">
          <button class="w3-button w3-teal" @click="loadComponent('decorators')">Decorators</button>
          <button class="w3-button w3-green" @click="loadComponent('extend')">Extend</button>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <async-extend
          class="w3-container w3-cell"
          title="From parent"
          :numbers="arrayNumbers"
          :complexObject="testComplexProp"
          msg="extend component"
          v-if="showExtend"/>
        <async-decorators
          class="w3-container w3-cell"
          title="From parent"
          :numbers="arrayNumbers"
          :complexObject="testComplexProp"
          msg="decorators component"
          v-if="showDecorators" />
      </transition>
    </div>
  </div>
</template>

<script>
// Test intellisense html
// import ExtendComponent from './components/Extend.vue';
// import DecoratorsComponent from './components/Decorators.vue';

// Test bundled size
const AsyncExtend = () => import(/* webpackChunkName: "extend-component" */ './components/Extend.vue');
const AsyncDecorators = () => import(/* webpackChunkName: "decorators-component" */ './components/Decorators.vue');

export default {
  name: 'App',
  components: {
    AsyncExtend,
    AsyncDecorators,
    // DecoratorsComponent,
    // ExtendComponent,
  },
  data() {
    return {
      showExtend: false,
      showDecorators: false,
      testComplexProp: {
        testProp: 'testProp',
        modelName: 1,
      },
      arrayNumbers: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    loadComponent(type) {
      if (type === 'decorators') {
        this.showExtend = false;
        this.showDecorators = true;
      } else {
        this.showDecorators = false;
        this.showExtend = true;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 10%;
}
button {
  margin: 0 2px !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
