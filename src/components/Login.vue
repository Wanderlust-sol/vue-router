<template>
  <div @click="getData">
    login합시다
  </div>
</template>

<script>
export default {
  method: {
    getData() {
      return console.log(this.$store.state);
    },
  },
};
</script>

<style scoped></style>
