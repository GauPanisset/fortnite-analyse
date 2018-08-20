<template>
    <div class="weapon-view">

        <b-card no-body>
            <b-tabs card pills secondary>
                <b-tab title="Not combined">
                    <b-card no-body>
                        <b-tabs card vertical pills>
                            <b-tab v-for="weapon in content[0]" :key="weapon.weapon" :title="weapon.weapon + ' : ' + weapon.tot">
                                <line-chart :data="weapon.data" :option="{responsive: false, maintainAspectRatio: true}" :height="200"></line-chart>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-tab>
                <b-tab title="Combined">
                    <b-card no-body>
                        <b-tabs card vertical pills>
                            <b-tab v-for="weapon in content[1]" :key="weapon.weapon" :title="weapon.weapon + ' : ' + weapon.tot">
                                <line-chart :data="weapon.data" :option="{responsive: false, maintainAspectRatio: true}" :height="200"></line-chart>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import Switches from 'vue-switches'

    import LineChart from './LineChart';

    export default {
        components: {LineChart, Switches},
        name: "weapon-view",
        data() {
            return {
                enabled: true,
            }
        },
        props: ['content'],
    }
</script>

<style scoped>

    .switch-container {
        display: block;
    }

    .row{
        flex-wrap: nowrap;
    }

</style>
