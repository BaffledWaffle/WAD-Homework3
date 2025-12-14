import { createStore } from 'vuex';
import axios from 'axios'

export default createStore({
  state: {
    posts: []
  },
  getters: {
    // Get all posts
    allPosts: state => state.posts
  },
  mutations: {
    // Increment likes for a post by its id
    likePost(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes++;
      }
    },
    // Reset likes for all posts
    resetLikes(state) {
      state.posts.forEach(post => post.likes = 0);
    },
    setPosts(state, posts) {
    state.posts = posts;
  }

  },
  actions: {
    // Actions can call mutations if needed (optional here)
    likePost({ commit }, postId) {
      commit('likePost', postId);
    },
    resetLikes({ commit }) {
      commit('resetLikes');
    },
    async fetchPosts( {commit} ) {
      try {
        const res = await axios.get('http://localhost:3000/api/posts/get-all');
        commit('setPosts', res.data);
      } catch (err) {
        console.error('Error fetching posts:', err)
      }

    },

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
      // FIX: Added 'await' here
      const errors = await dispatch("validatePassword", password);
      return errors;
    }
  },
  modules: {}
});