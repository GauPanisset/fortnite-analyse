<template>
    <div id="app">
        <reader v-on:fromReader="setData($event)" v-on:load="getLoad($event)"></reader>
        <img v-if="loading === true" :src="getImgUrl('loading.gif')"/>
      <div role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion1 variant="secondary">Killfeed</b-btn>
          </b-card-header>
          <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <killfeed :content="killfeed"></killfeed>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion2 variant="secondary">Weapon count</b-btn>
          </b-card-header>
          <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <p class="card-text">
                <weapon-view :content="weaponView"></weapon-view>
              </p>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    <!--router-view/-->
    </div>
</template>

<script>
    import Killfeed from './components/Killfeed';
    import Reader from './components/Reader';
    import WeaponView from "./components/WeaponView"
    import Chart from "./components/Chart"


    export default {
        name: 'App',
        components: {
            WeaponView,
            Killfeed,
            Reader,
            Chart,
        },
        data() {
            return {
                killfeed: [],
                weaponView: {
                    label: [],
                    options: [],
                    data: [],
                },
                loading: false,
                offset: 15,

            }
        },
        methods: {
            setData(data) {
                this.loading = false;
                this.killfeed = data.killfeed;

                this.weaponView.label = data.chartData.label;

                for (let gun in data.chartData.data) {
                    this.weaponView.data.push({
                        weapon: gun,
                        data: data.chartData.data[gun],
                    });
                }

                                  //[0, this.offset, 35, 60, 180, 120, 120, 120, 90, 90, 60, 90, 40, 60, 30, 25, 30, 25];
            },
            getLoad(data) {
                this.loading = data;
            },
            getImgUrl(pic) {                                //Méthode pour afficher les images à partir de l'url.

                if (pic !== "") {
                    return require('./assets/' + pic);
                }
                return pic;
            },
            millisecondsToTime(ms) {
                return new Date(ms).toISOString().slice(14, -5);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
