<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '../stores/user'

export default {
    data() {
        return {
            value: {
                username: '',
                about: ''
            }
        }
    },
    computed: {
        ...mapState(useUserStore, ['user'])
    },
    methods: {
        ...mapActions(useUserStore, ['getUser', 'editProfile', 'subscribe', 'unsubscribe'])
    },
    async created() {
        await this.getUser()
        this.value.username = this.user.username
        this.value.about = this.user.about
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <img src="../assets/images/user-circle.png" style="width: 600px;" />
            </div>
            <div class="col-6 mt-5">
                <div class="profile-form">
                    <form class="" @submit.prevent="editProfile(value)">
                        <div class="mb-3">
                            <label for="" class="form-label">Username</label>
                            <input type="text" class="form-control" id="" aria-describedby="" placeholder="username"
                                v-model="value.username">
                        </div>
                        <div class="mb-3">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                    style="height: 230px" v-model="value.about"></textarea>
                                <label for="floatingTextarea2">About</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-1">Confirm Changes</button>
                    </form>
                </div>
                <div v-if="!user.isMembership">
                    <button disabled class="btn btn-bg-light mt-1 ms-2">No Membership Applied</button>
                    <button type="submit" class="btn btn-dark mt-1 ms-2" @click="subscribe">Subscribe To Membership</button>
                </div>
                <div v-if="user.isMembership">
                    <button disabled class="btn btn-bg-light mt-1 ms-2">Membership Applied</button>
                    <button type="submit" class="btn btn-dark mt-1 ms-2" @click="unsubscribe">Unsubscribe
                        Membership</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.row {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    height: 75vh;
}

.profile-form {
    padding: 10px;
    border: none;
    width: 50vh
}
</style>