<template>
    <div class="weapon-view">
      <b-button @click="update(true)">Zone offset : {{offset}}</b-button>
      <b-button @click="clear()">Clear</b-button>
      <b-form-input v-model="offset" name="zone" id="zone-input" type=range></b-form-input>
        <b-tabs card vertical pills>
            <b-tab v-for="weapon in content.data" :key="weapon.weapon" :title="weapon.weapon + ' : ' + weapon.data[weapon.data.length - 1]">
              <line-chart v-if="display" :data="chartData[weapon.weapon]" :options="options"></line-chart>
            </b-tab>
        </b-tabs>
    </div>
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
                enabled: true,
                options: {
                    elements: {
                        points: {
                            radius: 0,
                        },
                    },
                },
                offset: 0,
                chartData: {},
                display: false,
            }
        },
        props: ['content'],
        methods: {
            update(bool) {
                this.content.data.forEach(weapon => {
                  this.chartData[weapon.weapon] = this.setData(weapon.data, this.content.label);
                });
                this.display = bool;
            },
            clear() {
                this.display = false;
            },
            setData(data, label) {
              const offset = parseInt(this.offset);
              let zone = [0, offset, offset + 35, offset + 95, offset + 275, offset + 395, offset + 515, offset + 635, offset + 725, offset + 815, offset + 875, offset + 965, offset + 1005, offset + 1065, offset + 1095, offset + 1120, offset + 1150, offset + 1175, offset + 1205];
              let res = {
                    datasets: [],
                    labels: label,
                };
                let bool = true;
                let dataset1 = {
                  data: [],
                  backgroundColor: "rgba(200,0,0,0.2)",
                };
                let dataset2 = {
                  data: [],
                  backgroundColor: "rgba(0,200,0,0.2)",
                };
                for (let index = 0; index < data.length; index++) {
                    if (zone.includes(index)) {
                        bool = !bool;
                    }
                    if (bool) {
                        dataset1.data.push(data[index]);
                        dataset2.data.push(null);
                    } else {
                        dataset1.data.push(null);
                        dataset2.data.push(data[index]);
                    }
                }
                res.datasets = [dataset1, dataset2];

                return res;
            }
        },
        mounted() {
           this.update(false);
        }
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
