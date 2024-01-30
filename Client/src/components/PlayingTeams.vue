<script>
export default {
    props: ['mat']
}
</script>

<template>
    <div class="row">
        <div class="col d-flex justify-content-end">
            <span>{{ mat.homeTeam }}</span>
            <img :src="mat.homeLogo" style="width: 50px;" />
        </div>
        <div class="col d-flex justify-content-center">
            <button class="btn btn-bg-dark me-3" disabled>{{ mat.MatchTime }}</button>
            <button class="btn btn-dark ms-3" disabled>{{ mat.MatchDay }}</button>
        </div>
        <div class="col">
            <img :src="mat.awayLogo" style="width: 50px;" />
            <span>{{ mat.awayTeam }}</span>
        </div>
    </div>
    <hr>
</template>