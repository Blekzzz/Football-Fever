<script>
export default {
    methods: {
        callback(response) {
            this.$emit('googleLogin', response)
        },
    },

}
</script>

<template>
    <GoogleLogin :callback="callback" />
</template>