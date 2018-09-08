<template>
    <div id="app">

        <reader v-on:fromReader="setData($event)" v-on:load="getLoad($event)"></reader>
        <img v-if="loading === true" :src="getImgUrl('loading.gif')"/>
      <v-expansion-panel id="my-accordion">
        <v-expansion-panel-content>
          <div slot="header">Killfeed</div>
          <v-card>
            <v-card-text>
              <killfeed :content="killfeed"></killfeed>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Weapon charts</div>
          <v-card>
            <v-card-text>
              <weapon-view :content="weaponView"></weapon-view>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    <!--router-view/-->
    </div>
</template>

<script>
    import Killfeed from './components/Killfeed';
    import Reader from './components/Reader';
    import WeaponView from "./components/WeaponView"

    import 'vuetify/dist/vuetify.min.css';

    export default {
        name: 'App',
        components: {
          WeaponView,
            Killfeed,
            Reader,
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

    #my-accordion {
        width: 95%;
        margin: auto;
    }
</style>
