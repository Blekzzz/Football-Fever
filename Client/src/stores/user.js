import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useUserStore = defineStore('user', {
    state: () => ({
        // host: 'http://localhost:3000',
        host: 'https://football-fever.blekzzz.com',
        user: [],
        isLogin: false
    }),
    actions: {
        async register(value) {
            try {
                await axios({
                    url: this.host + '/register',
                    method: 'POST',
                    data: {
                        email: value.email,
                        password: value.password,
                        username: value.username
                    }
                })

                this.router.push('/login')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Register Success! Login to continue!',
                    showConfirmButton: true,
                    timer: 1300
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: error.response.data.message,
                })
            }
        },

        async login(value) {
            try {
                let { data } = await axios({
                    url: this.host + '/login',
                    method: 'POST',
                    data: {
                        email: value.email,
                        password: value.password
                    }
                })

                localStorage.access_token = data.access_token
                localStorage.id = data.id
                localStorage.membership = data.membership
                this.isLogin = true
                this.router.push('/')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Success!',
                    showConfirmButton: true,
                    timer: 1300
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: error.response.data.message,
                })
            }
        },

        logout() {
            Swal.fire({
                title: 'Are you sure want to logout?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear()
                    this.isLogin = false
                    this.router.push('/login')
                    Swal.fire(
                        'Logout Success',
                        'Please login again to continue!',
                        'success'
                    )
                }
            })

        },

        async getUser() {
            try {
                let { data } = await axios({
                    url: this.host + '/profiles/' + localStorage.id,
                    method: 'GET',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })

                this.user = data
            } catch (error) {
                this.router.push('/login')
            }
        },

        async editProfile(value) {
            try {
                await axios({
                    url: this.host + '/profiles',
                    method: 'PUT',
                    headers: {
                        access_token: localStorage.access_token
                    },
                    data: {
                        username: value.username,
                        about: value.about
                    }
                })
                this.router.push('/profile')
                Swal.fire({
                    position: 'centr',
                    icon: 'success',
                    title: 'Your changes has been saved',
                    showConfirmButton: true,
                    timer: 1500
                  })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                })
            }
        },

        async newMembership() {
            try {
                await axios({
                    url: this.host + '/subscribe',
                    method: 'PATCH',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })

                this.getUser()
                localStorage.membership = true
            } catch (error) {
                console.log(error)
            }
        },

        async unsubscribe() {
            try {
                await axios({
                    url: this.host + '/unsubscribe',
                    method: 'PATCH',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })

                this.getUser()
                localStorage.membership = false
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Unsubsribe Success',
                    showConfirmButton: true,
                    timer: 1200
                  })
            } catch (error) {
                console.log(error)
            }
        },

        async subscribe() {
            try {
                const { data } = await axios({
                    url: this.host + '/generate-midtrans-token',
                    method: 'POST',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })

                const callBack = this.newMembership

                window.snap.pay(data.token, {
                    onSuccess: async function () {
                        callBack()
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },

        googleLogin(response) {
            // console.log(response)
            axios({
                url: this.host + '/google-login',
                method: 'POST',
                headers: {
                    google_token: response.credential
                }
            })
                .then(res => {
                    // console.log(res)
                    localStorage.access_token = res.data.access_token
                    localStorage.membership = res.data.isMembership
                    localStorage.id = res.data.id
                    this.id = res.data.id

                    Swal.fire(
                        'Login Success',
                        'Click the button to continue',
                        'success'
                    )

                    this.isLogin = true
                    this.router.push('/')
                })
                .catch(error => {
                    // console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: error.response.statusText,
                        text: error.response.data.message,
                    })
                })
        }
    }
})