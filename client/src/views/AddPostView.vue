<template>
  <div id="content">
    <form id="add-post-form" @submit.prevent="goToCreatePost">
      <div id="inputs-container">
        <div>
          <label for="post-text">Post text:</label>
          <textarea 
            id="post-text" 
            placeholder="Type here your post text..." 
            v-model="body">
          </textarea>
        </div>
      </div>
      <button type="submit">CREATE POST</button>
    </form>
  </div>
  <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/Footer.vue'
import axios from 'axios'

export default {
  name: "AddPostView",

  components: {
    FooterComponent
  },

  data() {
    return {
      body: '' // new data property for the post body
    }
  },

  methods: {
    async goToCreatePost() {
      this.body = document.getElementById('post-text').value
      
      if (!this.body.trim()) {
        alert('Post cannot be empty!')
        return
      }

      try {
        const token = localStorage.getItem('token')

        await axios.post(
          'http://localhost:3000/posts',
          { body: this.body },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        alert('Post created successfully!')
        this.$router.push('/') // go back to home
      } catch (err) {
        console.error(err)
        alert('Failed to create post. Are you logged in?')
      }
    }
  }
}
</script>

<style scoped src="../assets/styles/add-post.css">
</style>
