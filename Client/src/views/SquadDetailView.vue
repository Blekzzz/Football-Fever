<script>
import { mapActions, mapState } from 'pinia';
import { useLeagueStore } from '../stores/league';

export default {
    computed: {
        ...mapState(useLeagueStore, ['teamData', 'isLoading'])
    },
    methods: {
        ...mapActions(useLeagueStore, ['getTeam'])
    },
    async created() {
        await this.getTeam(this.$route.params.team, this.$route.params.league)
    }
}
</script>

<template>
    <div v-if="isLoading" class="loader"></div>
    <div v-else>
        <div class="container">
            <div class="text-center">
                <img :src="teamData[0].SquadLogo" style="width: 100px;" />
                <h1 class="mt-5"><strong>{{ teamData[0].Name }}</strong></h1>
            </div>
            <div class="d-flex justify-content-center mt-5">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Games Played</th>
                            <th>Win</th>
                            <th>Lose</th>
                            <th>Drawn</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ teamData[0].Position }}</td>
                            <td>{{ teamData[0].Played }}</td>
                            <td>{{ teamData[0].Winned }}</td>
                            <td>{{ teamData[0].Loosed }}</td>
                            <td>{{ teamData[0].Tie }}</td>
                            <td>{{ teamData[0].Points }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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