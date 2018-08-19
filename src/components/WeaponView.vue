<template>
    <b-card no-body>
        <b-tabs card>
            <b-tab v-for="weapon in content" :key="weapon.weapon" :title="weapon.weapon + ' : ' + weapon.tot">
                <line-chart :data="weapon.data" :option="{responsive: false, maintainAspectRatio: false}" :height="200"></line-chart>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css';

    import LineChart from './LineChart';

    export default {
        components: {LineChart},
        name: "weapon-view",
        data() {
            return {
            }
        },
        props: ['content'],
    }
</script>

<style scoped>
    .chart-container {
        height: 50px;
    }
</style>
