<template>
  <div class="post-view">
    <div class="post">
      <div class="text">
        <div class="post-header">
          <p class="usernames">{{ post.author }}</p>
          <p class="post-date">{{ formatDate(post.created_at) }}</p>
        </div>

        <textarea v-model="editableText" class="editable-text"></textarea>

        <div class="apost-actions">
          <button class="apost-action-btn update" @click="updatePost">UPDATE</button>
          <button class="apost-action-btn delete" @click="deletePost">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../assets/styles/apost.css'

export default {
  name: "PostView",
  data() {
    return {
      post: {},          
      editableText: ''   
    }
  },
  async created() {
    const postId = this.$route.params.id
    try {
      const res = await axios.get(`http://localhost:3000/posts/${postId}`)
      this.post = res.data
      this.editableText = this.post.description
    } catch (err) {
      console.error(err)
      alert('Failed to load post')
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    async updatePost() {
      const token = localStorage.getItem('token')
      try {
        await axios.put(
          `http://localhost:3000/posts/${this.post.id}`,
          { description: this.editableText },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('Post updated!')
        this.$router.push('/')
      } catch (err) {
        console.error(err)
        alert('Failed to update post')
      }
    },
    async deletePost() {
      if (!confirm('Are you sure you want to delete this post?')) return
      const token = localStorage.getItem('token')
      try {
        await axios.delete(
          `http://localhost:3000/posts/${this.post.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('Post deleted!')
        this.$router.push('/')
      } catch (err) {
        console.error(err)
        alert('Failed to delete post')
      }
    }
  }
}
</script>
