<template>
    <div id="app">
        <reader v-on:killfeed="setKillfeed($event)" v-on:load="getLoad()"></reader>
        <img v-if="loading === true" :src="getImgUrl('loading.gif')"/>
        <killfeed :content="killfeed"></killfeed>
    <!--router-view/-->
    </div>
</template>

<script>
    import Killfeed from './components/Killfeed';
    import Reader from './components/Reader';


    export default {
        name: 'App',
        components: {
            Killfeed,
            Reader,
        },
        data() {
            return {
                killfeed: [],
                loading: false,
            }
        },
        methods: {
            setKillfeed(data) {
                this.loading = false;
                this.killfeed = data;
            },
            getLoad() {
                this.loading = true;
            },
            getImgUrl(pic) {                                //Méthode pour afficher les images à partir de l'url.

                if (pic !== "") {
                    return require('./assets/' + pic);
                }
                return pic;
            },
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
