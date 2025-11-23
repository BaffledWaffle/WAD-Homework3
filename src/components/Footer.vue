<template>
    <footer>
        <div id="columns-container">
            <div class="column">
                <h2>Pages</h2>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/add-post">Add Post</router-link></li>
                    <li><router-link to="/login">Log In</router-link></li>
                    <li><router-link to="/signup">Sign Up</router-link></li>
                </ul>
            </div>
            <div class="column">
                <h2>Quote of the moment</h2>
                <p id="footer-quote">{{ quote }}</p>
            </div>
            <div class="column">
                <h2>Our team</h2>
                <p>Evelina</p>
                <p>Nele Taisi</p>
                <p>Jevgeni</p>
            </div>
        </div>
        <div id="copyright">
            © 2025-2026 Autumn WAD, Group 2, AH
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'FooterComponent',

    data() {
    return {
      quote: ''
    };
  },

  mounted() {
    const quotes = [
      "Life is better with a slice of pizza",
      "Creativity takes courage",
      "Seashells are whispers of the ocean",
      "A day without laughter is a day wasted",
      "Small steps lead to big adventures",
      "Share your ideas, inspire the world",
      "If we had not been born, there would be no problems, then we would not have been born, we would not exist (c) Evelina"
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.quote = quotes[randomIndex]; // Vue updates the template
  }
}

</script>


<style scoped>
footer {
    min-height: 200px;      
    background-color: #1F0E03;
    padding: 30px 80px;
    display: flex;
    flex-direction: column;
    font-family: 'mont';
}

footer #columns-container {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    flex-direction: row;
    justify-content: space-between;
    color: #F5E8D9;
}

footer .column {
    flex: 1 1 200px;
}

footer .column h2 {
    font: 24px;
    color: #B2997C;
}

footer .column ul li::marker {
    color: #B2997C;
}

footer .column a {
    text-decoration: none;
    color: #F5E8D9;
}

footer #copyright {
    width: 100%;
    height: 16px;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    color: #B2997C;
    
    font-family: 'mont_light';
}
</style>