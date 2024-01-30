<script>
import { mapActions, mapState } from 'pinia';
import { useLeagueStore } from '../stores/league'
import LeagueTable from '../components/LeagueTable.vue'
import MatchDay from '../components/MatchDay.vue'
import LatestTransfer from '../components/LatestTransfer.vue';

export default {
    components: {
        LeagueTable,
        MatchDay,
        LatestTransfer
    },
    computed: {
        ...mapState(useLeagueStore, ['leagueTable', 'matchDay', 'isLoading', 'latestTransfers'])
    },
    methods: {
        ...mapActions(useLeagueStore, ['getTable', 'getMatchday', 'getLatestTransfer'])
    },
    async created() {
        await this.getTable(this.$route.params.league)
        await this.getMatchday(this.$route.params.league)
        await this.getLatestTransfer(this.$route.params.league)
    }
}
</script>

<template>
    <div v-if="isLoading" class="loader"></div>
    <div v-else>
        <!-- League Table -->
        <section id="league-table">
            <div class="container">
                <h1><strong>{{ this.$route.params.league.toUpperCase() }}</strong></h1>
                <div>
                    <table class="table mt-5">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Club</th>
                                <th>Played</th>
                                <th>Won</th>
                                <th>Drawn</th>
                                <th>Lost</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LeagueTable v-for="(team, i) in leagueTable" :key="team.Name" :team="team" :i="i" />
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Matchday -->
        <div class="row">
            <div class="col-7">
                <section id="matchday">
                    <div class="container mt-5">
                        <h1><strong>FIXTURES</strong></h1>
                        <MatchDay v-for="match in matchDay[0]" :key="match" :match="match" class="mt-5 align-items-center" />
                    </div>
                </section>
            </div>

            <!-- Latest Transfers -->
            <div class="col-5">
                <section id="latest-transfers">
                    <div class="container mt-5">
                        <h1><strong>Latest Transfer This Days</strong></h1>
                        <table class="table mt-5">
                            <thead>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Old Club</th>
                                <th>New Club</th>
                                <th>Fee</th>
                            </thead>
                            <tbody>
                                <LatestTransfer v-for="transfer in latestTransfers" :key="transfer" :transfer="transfer" />
                            </tbody>
                        </table>
                    </div>
                </section>
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