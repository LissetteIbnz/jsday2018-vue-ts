<template>
  <div class="w3-container">
    <h2>{{ msg | capitalize }}</h2>
    <ul class="w3-ul w3-card-4">
      <li
        class="w3-bar"
        v-for="user in users"
        :key="user.id">
        <span class="w3-bar-item w3-button w3-white w3-xlarge w3-right" @click="removeUser(user.id)" >×</span>
        <img
          class="w3-bar-item w3-circle w3-hide-small"
          style="width:85px"
          :src="getImgUrl(user.avatar_url)">
        <div class="w3-bar-item">
          <span class="w3-large">{{ user.name }}</span><br>
          <span>{{ user.login }}</span>
        </div>
      </li>
    </ul>
    <h3 ref="counter">Users: {{ counter }}</h3>
    <!-- <ref-extend ref="refExtend" />
    <ref-decorators ref="refDecorators" /> -->
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
// import RefExtend from './RefExtend.vue';
// import RefDecorators from './RefDecorators.vue'

import { MemberEntity } from '../models';
import { fetchMembers } from '../api';

import MixinsComponent from '../mixins/MixinsComponent.vue';

interface ComplexObjectInterface {
  testProp: string;
  modelName: number;
}

export default (Vue as VueConstructor<
  // Infiriendo tipos en $refs
  Vue & {
    $refs: {
      counter: HTMLElement;
      // refExtend: InstanceType<typeof RefExtend>, // Importando Extend
      // refDecorators: InstanceType<typeof RefDecorators>, // Importando Decorators
    };
  }
>).extend({
  name: 'Extend',
  components: {
    // RefExtend,
    // RefDecorators,
  },
  // Mixins
  mixins: [MixinsComponent],
  // Filtros
  filters: {
    capitalize: (value: string) => {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  props: {
    msg: String,
    title: {
      type: String,
      required: true,
    },
    optionalItem: {
      type: String,
      required: false,
    },
    numbers: Array as () => {},
    complexObject: Object as () => ComplexObjectInterface,
  },
  data() {
    return {
      users: [] as MemberEntity[],
      baz: undefined, // Ambas serán reactivas
      bar: null,
    };
  },
  computed: {
    counter(): number {
      return this.users.length;
    },
  },
  watch: {
    'users.length': (val, oldVal) => {
      console.log(`Watch users.length -> val: ${val}, oldVal: ${oldVal}`);
    },
  },
  mounted() {
    // Plugins con aumento de tipo
    this.$_console();

    console.log('Extend mounted');
    this.$nextTick(() => fetchMembers().then(response => (this.users = response)));
  },
  methods: {
    getImgUrl(pic: string): void {
      return require(`../assets/${pic}`);
    },
    removeUser(id: number) {
      const index = this.users.findIndex(user => user.id === id);
      this.users.splice(index, 1);

      // Uso de $refs definidas
      if (!this.users.length) {
        this.$refs.counter.style.color = 'red';
        // this.$refs.refExtend.fromHelloWorld('RefExtend');
        // this.$refs.refDecorators.fromHelloWorld('RefDecorators');
      }
      // Uso de Props con objetos complejos
      console.log(this.complexObject.testProp);
    },
  },
});
</script>
