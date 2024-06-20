<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { loginUser } from "@/api";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await loginUser(this.username, this.password);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
</style>
