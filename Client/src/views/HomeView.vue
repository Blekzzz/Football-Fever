<script>
import NewsCard from '../components/NewsCard.vue';
import { mapActions, mapState } from 'pinia'
import { useNewsStore } from '../stores/news'

export default {
    data() {
        return {
            page: 1
        }
    },
    components: { NewsCard },
    computed: {
        ...mapState(useNewsStore, ['news', 'isLoading'])
    },
    methods: {
        ...mapActions(useNewsStore, ['getNews']),
        nextPage() {
            if (this.page == 10) {
                console.log("gabisa di next bg")
            } else {
                this.page = this.page + 1
                this.getNews(this.page)
            }
        },
        previousPage() {
            if (this.page == 1) {
                console.log("gabisa di prev lg bg")
            } else {
                this.page = this.page - 1
                this.getNews(this.page)
            }
        }
    },
    created() {
        this.getNews(this.page)
    },
}
</script>

<template>
    <div v-if="isLoading" class="loader"></div>
    <div v-else>
        <div class="container mb-5">
            <h1><strong>Football News</strong></h1>
        </div>
        <div class="container d-flex justify-content-center">
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <NewsCard v-for="article in news.articles" :key="article.source" :article="article" />
            </div>
        </div>
        <nav aria-label="Page navigation example">
            <ul class="container pagination d-flex justify-content-end mt-5">
                <li class="page-item"><a class="page-link" @click.prevent="previousPage" href="">Previous</a></li>
                <li class="page-item"><a class="page-link">{{ page }}</a></li>
                <li class="page-item"><a class="page-link" @click.prevent="nextPage" href="">Next</a></li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.loader {
    border: 16px solid #f3f3f3;
    /* Light gray */
    border-top: 16px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: 0 auto;
    margin-top: 50px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>