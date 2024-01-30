<script>
import { mapActions } from 'pinia';
import { useLeagueStore } from '../stores/league'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            squadName: '',
            league: '--Select League--'
        }
    },
    methods: {
        ...mapActions(useLeagueStore, ['getTable', 'getMatchday', 'getTeam']),
        toDetail(league) {
            this.getTable(league)
            this.getMatchday(league)
            this.$router.push('/league/' + league)
        },
        toSquadDetail() {
            if (this.league == '--Select League--') {
                Swal.fire({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: 'Please select the league',
                })
            } else {
                this.getTeam(this.squadName, this.league)
                this.$router.push(`/league/${this.league}/${this.squadName}`)
            }

        }
    }
}
</script>

<template>
    <div class="container text-center">
        <h1><strong>SEARCH TEAM</strong></h1>
    </div>
    <div class="container d-flex justify-content-center align-items-center mb-5">
        <form class="w-50 ms-5" @submit.prevent="toSquadDetail">
            <div class="row mt-5">
                <div class="col-4">
                    <input type="text" class="form-control" id="" aria-describedby="" placeholder="Team Name"
                        v-model="squadName" required>
                </div>
                <div class="col-4">
                    <select class="form-select" aria-label="Default select example" v-model="league" required>
                        <option selected disabled>--Select League--</option>
                        <option value="premierleague">Premier League</option>
                        <option value="ligue1ubereats">Ligue 1 Uber Eats</option>
                        <option value="laliga">La Liga</option>
                        <option value="eredivisie">Eredivisie</option>
                        <option value="bundesliga">Bundesliga</option>
                        <option value="seriea">Serie A</option>
                    </select>
                </div>
                <div class="col-4">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
    <div class="container text-center">
        <h1 class="ms-5"><strong>LEAGUE AVAILABLE</strong></h1>
    </div>
    <div class="container d-flex justify-content-center align-items-center mt-5">
        <div class="row gap-5 ms-4">
            <div @click="toDetail('premierleague')" class="col-4 card-border d-flex align-items-center p-4"
                style="width: 40vh;">
                <figure class="figure">
                    <img src="../assets/images/premier-league.png" style="width: ;" class="figure-img img-fluid rounded"
                        alt="...">
                </figure>
            </div>
            <div @click="toDetail('laliga')" class="col-4 card-border d-flex align-items-center p-4" style="width: 40vh;">
                <figure class="figure">
                    <img src="../assets/images/laliga.png" class="figure-img img-fluid rounded" alt="...">
                </figure>
            </div>
            <div @click="toDetail('bundesliga')" class="col-4 card-border d-flex align-items-center p-4"
                style="width: 40vh;">
                <figure class="figure">
                    <img src="../assets/images/bundesliga.png" class="figure-img img-fluid rounded" alt="...">
                </figure>
            </div>
            <div @click="toDetail('seriea')" class="col-4 card-border d-flex align-items-center p-4" style="width: 40vh;">
                <figure class="figure">
                    <img src="../assets/images/seriea.png" class="figure-img img-fluid rounded" alt="...">
                </figure>
            </div>
            <div @click="toDetail('eredivisie')" class="col-4 card-border d-flex align-items-center p-4"
                style="width: 40vh;">
                <figure class="figure">
                    <img src="../assets/images/eredivisie.png" class="figure-img img-fluid rounded" alt="...">
                </figure>
            </div>
            <div @click="toDetail('ligue1ubereats')" class="col-4 card-border d-flex align-items-center p-4"
                style="width: 40vh;">
                <figure class="figure">
                    <img src="../assets/images/ligue1.png" class="figure-img img-fluid rounded" alt="...">
                </figure>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-border {
    border: none;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}

.figure-img:hover {
    transform: scale(1.1);
    transition: 0.5s ease;
    cursor: pointer;
}
</style>