<script>
export default {
    props: ['transfer']
}
</script>

<template>
    <tr>
        <td>{{ transfer.transferType }}</td>
        <td>{{ transfer.playerName }}</td>
        <td>{{ transfer.playerRole }}</td>
        <td>{{ transfer.oldClub }}</td>
        <td>{{ transfer.newClub }}</td>
        <td>{{ transfer.price }}</td>
    </tr>
</template>