<template>
    <nav id="navbar">
        <div id="header-links-container">
            <router-link to="/" class="nav-link">Home</router-link>
            <span id="divider">|</span>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/signup" class="nav-link">Signup</router-link>
            
        </div>

        <div id="account">
            <div id="account-image-container">
                <a class="nav-link" @click="toggleDropdown">
                    <img src="../assets/img/account_circle.svg" alt="Account" id="account-img">
                </a>
    
            </div>
        </div>

        <!-- Dropdown Menu -->
        <div id="myDropdown" class="dropdown-content" :class="{ show: dropdownVisible }">
            <a href="#" @click.prevent="handleProfile">Profile</a>
            <a href="#" @click.prevent="handleSettings">Settings</a>
            <a href="#" @click.prevent="handleLogout">Logout</a>
        </div>
    </nav>
</template>

<script>
export default { 
    name: 'HeaderComponent',
    data() {
        return {
            dropdownVisible: false
        }
    },
    methods: {
        toggleDropdown(event) {
            event.stopPropagation(); 
            this.dropdownVisible = !this.dropdownVisible;
        },
        handleProfile() {
            console.log('Profile clicked');
            this.dropdownVisible = false;
        },
        handleSettings() {
            console.log('Settings clicked');
            this.dropdownVisible = false;
        },
        handleLogout() {
            console.log('Logout clicked');
            this.dropdownVisible = false;
        },
        closeDropdown() {
            this.dropdownVisible = false;
        }
    },
    mounted() {
        // Close dropdown when clicking anywhere else
        document.addEventListener('click', this.closeDropdown);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeDropdown);
    }
}
</script>

<style scoped>
#navbar {
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 30px;
    background-color: #341A0B;
}

#navbar #header-links-container a {
    font-size: 20px;
    color: #F5E8D9;
    text-decoration: none;
}

.nav-link {
    padding: 8px 16px;
    border-radius: 5px;
    transition: 0.3s;
    cursor: pointer;
}

#navbar #header-links-container a:hover {
    color: #B2997C;
    background-color: #1F0E03;
}

#account {
    position: relative;
}

#account-image-container {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    transition: 0.3s;
    overflow: hidden;
    position: relative;
}

#account-image-container img {
    width: 45px;
    height: 45px;
    margin-top: 6px;
}

#account-image-container:hover {
    cursor: pointer;
    background-color: #1F0E03;
}

#divider{
    font-family:Arial, Helvetica, sans-serif;
    color: #B2997C !important;
    opacity: 0.6;
    margin: 0 8px;
    user-select: none;
    font-weight: 300;

}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  right: 5%;
  top: 60%;
  background-color: #F5E8D9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  z-index: 1000;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 10px 14px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content a:hover {
  background-color: #B2997C;
}

.dropdown-content a:first-child:hover {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.dropdown-content a:last-child:hover {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Show the dropdown */
.dropdown-content.show {
  display: block;
}
</style>