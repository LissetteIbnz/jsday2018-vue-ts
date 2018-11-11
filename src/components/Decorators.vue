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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// import RefExtend from './RefExtend.vue';
// import RefDecorators from './RefDecorators.vue';

import { MemberEntity } from '../models';
import { fetchMembers } from '../api';

interface ComplexObjectInterface {
  testProp: string;
  modelName: number;
}

@Component({
  components: {
    // RefExtend,
    // RefDecorators,
  },
  // Filtros
  filters: {
    capitalize: (value: string) => {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
})
export default class Decorators extends Vue {
  // Infiriendo tipos en las $refs
  $refs!: {
    counter: HTMLElement,
    // refExtend: InstanceType<typeof RefExtend>, // Extend
    // refDecorators: RefDecorators, // Decorators
  };

  // Props
  @Prop(String) msg!: string;
  @Prop({ required: true }) title!: string;
  @Prop() optionalItem: string | undefined;

  @Prop(Array) numbers!: number[];
  @Prop(Object) complexObject!: ComplexObjectInterface;

  // Data
  users: MemberEntity[] = [];
  baz = undefined; // NO será reactivo
  bar = null; // Será reactivo

  // Computed properties
  get counter(): number {
    return this.users.length;
  }

  // Watch
  @Watch('users.length')
  onUsersChanged(val: number, oldVal: number) {
    console.log(`Watch users.length -> val: ${val}, oldVal: ${oldVal}`);
  }

  // Ciclos de vida
  mounted() {
    // Plugins con aumento de tipo
    this.$_console();

    console.log('Decorators mounted');
    this.$nextTick(() => fetchMembers().then(response => (this.users = response)));
  }

  // Métodos
  getImgUrl(pic: string): void {
    return require(`../assets/${pic}`);
  }

  removeUser(id: number): void {
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
  }
}
</script>
