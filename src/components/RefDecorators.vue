<template>
  <div class="w3-container">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class RefDecorators extends Vue {
  msg: string | null = null;

  fromHelloWorld(val: string): void {
    this.msg = val;
  }
}
</script>
