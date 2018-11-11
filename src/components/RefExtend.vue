<template>
  <div class="w3-container">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RefExtend',
  data() {
    return {
      msg: null as string | null,
    };
  },
  methods: {
    fromHelloWorld(val: string): void {
      this.msg = val;
    },
  },
});
</script>
