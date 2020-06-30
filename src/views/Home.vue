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
  computed: {
    username() {
      console.log(this.$route.params.username);
      return this.$route.params.username;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter');
    next();
  },

  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');
    next();
  },

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave');
    next();
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted');
  },
};
</script>
