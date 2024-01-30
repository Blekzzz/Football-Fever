import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useLeagueStore = defineStore('league', {
    state: () => ({
        // host: 'http://localhost:3000',
        host: 'https://football-fever.blekzzz.com',
        leagueTable: [],
        matchDay: [],
        latestTransfers: [],
        teamData: [],
        isLoading: false
    }),
    actions: {
        async getTable(league) {
            try {
                this.isLoading = true
                let { data } = await axios({
                    url: this.host + `/table/${league}`,
                    method: 'GET',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.leagueTable = data
            } catch (error) {
                if (!localStorage.membersihp) {
                    this.router.push('/')
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: 'Please subscribe to continue to this page!',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: error.response.data.message,
                    })
                }
            } finally {
                this.isLoading = false
            }
        },

        async getMatchday(league) {
            try {
                this.isLoading = true
                let { data } = await axios({
                    url: this.host + `/matchday/${league}`,
                    method: 'GET',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.matchDay = data
            } catch (error) {
                if (!localStorage.membersihp) {
                    this.router.push('/')
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: 'Please subscribe to continue to this page!',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: error.response.data.message,
                    })
                }
            } finally {
                this.isLoading = false
            }
        },

        async getLatestTransfer(league) {
            try {
                this.isLoading = true
                let { data } = await axios({
                    url: this.host + `/transfers/${league}`,
                    method: 'GET',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.latestTransfers = data
            } catch (error) {
                if (!localStorage.membersihp) {
                    this.router.push('/')
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: 'Please subscribe to continue to this page!',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: error.response.data.message,
                    })
                }
            } finally {
                this.isLoading = false
            }
        },

        async getTeam(team, league) {
            try {
                this.isLoading = true
                let { data } = await axios({
                    url: this.host + `/squad-detail/${league}/${team}`,
                    method: 'GET',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                console.log(data)
                this.teamData = data
            } catch (error) {
                if (!localStorage.membersihp) {
                    this.router.push('/')
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: 'Please subscribe to continue to this page!',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!',
                        text: error.response.data.message,
                    })
                }
            } finally {
                this.isLoading = false
            }
        }
    }
})