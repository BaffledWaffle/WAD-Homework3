<template>
  <div class="post" @click="goToApostView">
    <div class="avatar-text">
      <div class="text">
        <div class="post-header">
          <!-- Only show username (nickname) -->
          <p class="usernames">{{ post.author }}</p>
          <p class="post-date">{{ formatDate(post.created_at) }}</p>
        </div>

        <p :class="['main-text', { expanded: expanded }]" ref="mainText">
          {{ post.description }}
        </p>

        <!-- Show more / Show less button -->
        <button v-if="showButton" @click.stop="toggleExpanded">
          {{ expanded ? 'Show less' : 'Show more' }}
        </button>

        <!-- Like button (visual only) -->
        <div class="post-like">
          <button @click.stop="likePost"></button>
          <p>{{ post.likes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false,
      showButton: false
    };
  },
  mounted() {
    this.checkShowButton();
  },
  methods: {
    goToApostView() {
      this.$router.push(`/post/${this.post.id}`); // navigate to ApostView
    }, 
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    },
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
    likePost() {
      // emit like event to parent
      this.$emit('like', this.post.id)
    },
    checkShowButton() {
      this.$nextTick(() => {
        const el = this.$refs.mainText;
        if (el.scrollHeight > el.clientHeight) {
          this.showButton = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  gap: 15px;
  background-color: #F5E8D9;
  border-radius: 8px;
}

.avatar-text {
  display: flex;
  flex-direction: column; /* removed avatar, only text */
  width: 100%;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.usernames {
  font-weight: bold;
  font-family: "mont";
}

.post-date {
  font-family: "mont_light";
  font-size: 12px;
  color: #666;
  margin: 0;
}

.main-text {
  font-family: "mont_light";
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.main-text.expanded {
  -webkit-line-clamp: unset;
}

.text button {
  font-family: "mont";
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.post-like {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.post-like button {
  width: 30px;
  height: 30px;
  background-image: url("@/assets/img/heartEmpty.png");
  background-size: cover;
  border: none;
  cursor: pointer;
}

.post-like button:hover {
  background-image: url("@/assets/img/heartHover.png");
}
</style>
