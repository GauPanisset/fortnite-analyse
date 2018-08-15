<template>
    <div id="app">
        <reader v-on:killfeed="setKillfeed($event)"></reader>
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
            }
        },
        methods: {
            setKillfeed(data) {
                this.killfeed = data;
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
