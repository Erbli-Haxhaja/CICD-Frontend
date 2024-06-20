<template>
  <div>
    <h1>{{ headline }}</h1>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button :class="buttonClass" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from "@/api";

export default {
  name: "Register",
  data() {
    return {
      username: '',
      password: '',
      headline: Math.random() < 0.5 ? 'Join Us Today!' : 'Become a Member!',
      buttonClass: Math.random() < 0.5 ? 'button-style-a' : 'button-style-b'
    }
  },
  methods: {
    async register() {
      try {
        await registerUser(this.username, this.password);
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.button-style-a {
  background-color: blue;
  color: white;
}
.button-style-b {
  background-color: green;
  color: white;
}
</style>
