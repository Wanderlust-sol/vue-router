<template>
  <div class="home">
    <p>This is Home page.</p>
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'Home',
  components: { Login },
  data() {
    return {
      view: Login,
    };
  },
};
</script>
