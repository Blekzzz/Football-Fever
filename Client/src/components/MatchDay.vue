<script>
import PlayingTeams from './PlayingTeams.vue';
export default {
    components: {
        PlayingTeams
    },
    props: ['match'],
    data() {
        return {

        }
    },
}
</script>

<template>
    <table class="table">
        <PlayingTeams v-for="mat in match" :key="mat" :mat="mat" />
    </table>
</template>