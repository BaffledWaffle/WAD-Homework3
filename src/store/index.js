import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // Method for checking, if the password is valid (meets all the requirements)
    async validatePassword(context, password) {
      const errors = [];

      if (password.length < 8 || password.length > 15) {
        errors.push("be 8–15 characters long");
      }

      if (!/^[A-Z]/.test(password)) {
        errors.push("start with an uppercase letter");
      }

      if (!/[A-Z]/.test(password)) {
        errors.push("include one uppercase letter");
      }

      if ((password.match(/[a-z]/g) || []).length < 2) {
        errors.push("include two lowercase letters");
      }

      if (!/[0-9]/.test(password)) {
        errors.push("include one number");
      }

      if (!/[_]/.test(password)) {
        errors.push('include the character "_"');
      }

      return errors;
    },

    async signup({ dispatch }, { password }) {
      const errors = dispatch("validatePassword", password);
      return errors;
    }
  },
  modules: {
  }
})
