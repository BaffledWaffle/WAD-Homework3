<template>
      <div id="content">
    <div id="content-positioner">
      <div class="sidebar left"></div>
        <div id="feed-of-posts">
          <!-- Render posts from store -->
          <PostItem
            v-for="post in allPosts" 
            :key="post.id" 
            :post="post" 
          />

          <div class="reset-likes-container">
            <button @click="resetAllLikes" class="reset-likes-btn">
              Reset All Likes
            </button>
          </div>
        </div>
      <div class="sidebar right"></div>
    </div>
  </div>
    <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/Footer.vue'
import PostItem from '@/components/Post.vue'
import { mapGetters, mapActions } from 'vuex'


export default {
  name: "HomeView",
  components: {
    FooterComponent,
    PostItem
  },
 computed: {
  ...mapGetters(['allPosts'])
  },

    methods: {
    ...mapActions(['resetLikes']),
    resetAllLikes() {
      this.resetLikes();
    }
  }
}

</script>

<style scoped src="../assets/styles/index.css">

</style>
