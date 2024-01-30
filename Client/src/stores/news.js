import { defineStore } from 'pinia'
import axios from 'axios'

export const useNewsStore = defineStore('news', {
    state: () => ({
        // host: 'http://localhost:3000',
        host: 'https://football-fever.blekzzz.com',
        news: [],
        isLoading: false
    }),
    actions: {
        async getNews(page) {
            try {
                this.isLoading = true
                const { data } = await axios({
                    url: this.host + '/news',
                    method: 'GET',
                    params: {
                        page: page
                    }
                })
                this.news = data
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
        }
    }
})