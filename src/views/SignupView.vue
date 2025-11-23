<template>
    <div id="content">
    <form id="signup-form" @submit.prevent="handleSignup">
      <div id="inputs-container">
        <h2>Create an Account</h2>

        <input 
          type="text" 
          v-model="email" 
          placeholder="Email"
        >

        <input 
          type="password" 
          v-model="password" 
          placeholder="Password"
        >

        <!-- Show errors -->
        <p v-if="errors.length > 0" style="color: red; text-align: center;">
          The password must:
          <ul style="text-align: left; margin-top: 10px;">
            <li v-for="(msg, index) in errors" :key="index">
              {{ msg }}
            </li>
          </ul>
        </p>

        <button type="submit">SUBMIT</button>

        <p>
          Already have an account?
          <router-link to="/login">Log in</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "SignupView",

  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },

  methods: {
    async handleSignup() {
      // Call Vuex action
      this.errors = await this.$store.dispatch("signup", {
        email: this.email,
        password: this.password
      });

      if (this.errors.length === 0) {
        alert("Signup successful! (Vuex version)");
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/signup.css">
</style>