<template>
  <h1>{{ numbers }}</h1>
</template>

<script>
export default {
  props: {
    numbers: Array,
  },
  data() {
    return {
      msg: 'Simple component',
    };
  },
  mounted() {
    console.log('Js mounted');
    this.testMethod();
  },
  methods: {
    testMethod() {
      console.log(this.msg);
    },
  },
};
</script>
