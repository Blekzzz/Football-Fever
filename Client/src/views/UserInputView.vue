<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user'
import { RouterLink } from 'vue-router';
import GoogleLogin from '../components/GoogleLogin.vue'

export default {
    components: {
        RouterLink,
        GoogleLogin
    },
    data() {
        return {
            value: {
                username: '',
                email: '',
                password: ''
            },
        }
    },
    methods: {
        ...mapActions(useUserStore, ['register', 'login', 'googleLogin']),
        submitForm() {
            if (this.$route.path == '/login') {
                this.login(this.value)
            } else if (this.$route.path == '/register') {
                this.register(this.value)
            }
        }
    }
}
</script>

<template>
    <div class="container w-50">
        <div class="mb-5">
            <div v-if="this.$route.path == '/login'">
                <h1><strong>Login</strong></h1>
            </div>
            <div v-if="this.$route.path == '/register'">
                <h1><strong>Register</strong></h1>
            </div>
        </div>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="value.email" type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="email">
            </div>
            <div v-if="this.$route.path == '/register'">
                <div class="mb-3">
                    <label for="" class="form-label">Username</label>
                    <input v-model="value.username" type="text" class="form-control" id="" aria-describedby=""
                        placeholder="username">
                </div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="value.password" type="password" class="form-control" id="exampleInputPassword1"
                    placeholder="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div v-if="this.$route.path == '/login'" class="text-center">
                <p>Don't have an account? <RouterLink to="/register">Register</RouterLink>
                </p>
                <div class="text-center mb-3">
                    <p>or</p>
                    <p>Sign in with:</p>
                    <GoogleLogin @googleLogin="googleLogin" />
                </div>
            </div>
            <div v-if="this.$route.path == '/register'" class="d-flex justify-content-center">
                <p>Have account? <RouterLink to="/login">Sign in</RouterLink>
                </p>
            </div>
        </form>
    </div>
</template>