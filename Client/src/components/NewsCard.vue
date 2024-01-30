<script>
export default {
    props: ['article'],
}
</script>

<template>
    <div class="col">
        <div class="card h-100" style="width: 40rem;">
            <a :href="article.url" style="text-decoration: none; color: black;">
                <img :src="article.urlToImage" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">{{ article.title }}</h5>
                    <p class="card-text">{{ article.description }}</p>
                </div>
            </a>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card:hover {
    transform: scale(1.1);
    transition: 0.8s ease;
    cursor: pointer;
}
</style>