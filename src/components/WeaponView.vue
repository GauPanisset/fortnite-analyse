<template>
    <div class="weapon-view">

      <div data-app class="text-xs-center">
        <v-btn id="offset-button" @click="update(true)">Zone offset : {{offset}}</v-btn>
        <v-btn id="clear-button" slot="activator" @click="clear()">Clear</v-btn>
      </div>
      <div data-app class="text-xs-center">
        <v-slider
          slot="activator"
          v-model="offset"
          thumb-color="#311B92"
          thumb-label="always"
          id="mySlider"
        ></v-slider>
      </div>

      <v-tabs
        slot="extension"
        v-model="tab"
        color="rgba(0, 0, 0, 0.05)"
        grow
        show-arrows
      >
        <v-tabs-slider color="#311B92"></v-tabs-slider>

        <v-tab
          v-for="weapon in content.data"
          :key="weapon.weapon"
        >
          {{ weapon.weapon + ' : ' + weapon.data[weapon.data.length - 1] }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="weapon in content.data"
          :key="weapon.weapon + '_item'"
        >
          <v-card flat>
            <v-card-text>
                <line-chart v-if="display" :data="chartData[weapon.weapon]" :options="options" :height="'300px'"></line-chart>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
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
                options: {
                    elements: {
                        points: {
                            radius: 0,
                        },
                    },
                },
                tab: null,
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

  .chart-container {
    max-height: 65%;
  }


</style>
