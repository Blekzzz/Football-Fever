<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from '../stores/user'
import Swal from 'sweetalert2'

export default {
    components: {
        RouterLink
    },
    computed: {
        ...mapWritableState(useUserStore, ['isLogin', 'user'])
    },
    methods: {
        ...mapActions(useUserStore, ['logout']),
        toLeague() {
            if (!localStorage.membership) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: 'Please subscribe to continue to this page!',
                })
            } else {
                this.$router.push('/league')
            }
        }
    },
    created() {
        if (localStorage.access_token) {
            this.isLogin = true
        } else if (!localStorage.access_token) {
            this.isLogin = false
        }
    }
}
</script>

<template>
    <nav class="navbar fixed-top">
        <RouterLink to="/" style="color: white;">
            <div class="logo"><img src="../assets/images/ball-logo.png" style="width: 40px;" /> Football Fever</div>
        </RouterLink>
        <ul class="nav-links">
            <div class="menu">
                <li>
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li @click="toLeague">League</li>
                <li>
                    <RouterLink to="/profile">Profile</RouterLink>
                </li>
                <li @click="logout" v-if="isLogin" style=":hover {
                    background-color: red;
                    border-radius: 5px;
                    transition: 0.3s ease;
                    cursor: pointer;}">Logout</li>
            </div>
        </ul>
    </nav>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: cursive;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #068FFF;
    color: #fff;
}

.nav-links a {
    color: #fff;
}

.logo {
    font-size: 32px;
}

.menu {
    display: flex;
    gap: 1em;
    font-size: 18px;
}

.menu li:hover {
    background-color: #4E4FEB;
    border-radius: 5px;
    transition: 0.3s ease;
    cursor: pointer;
}


.menu li {
    padding: 5px 14px;
}
</style>