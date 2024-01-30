<script>
export default {
    props: ['team', 'i']
}
</script>

<template>
    <tr>
        <td>{{ i + 1 }}</td>
        <td>
            <img class="me-2" :src="team.SquadLogo" style="width: 30px;" />
            {{ team.Name }}
        </td>
        <td>{{ team.Played }}</td>
        <td>{{ team.Winned }}</td>
        <td>{{ team.Tie }}</td>
        <td>{{ team.Loosed }}</td>
        <td>{{ team.Points }}</td>
    </tr>
</template>