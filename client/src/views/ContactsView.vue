<template>
  <div id="content">

    <div class="contacts-container">
      <h1>Contact Us</h1>
      <p>Email: example@domain.com</p>
      <p>Phone: +123 456 7890</p>
      <p>Address: 123 Main Street, City, Country</p>
    </div>

  </div>
  <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/Footer.vue'

export default {
  name: 'ContactsView',
  components: { FooterComponent }
}
</script>

<style scoped src="../assets/styles/contacts.css"></style>
