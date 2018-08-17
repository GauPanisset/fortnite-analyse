<template>
    <div class="container">
        <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a .replay file..."></b-form-file>
        <b-button id="submit-button" :size="'lg'" :variant="'outline-secondary'" @click="sendFile">
            Get killfeed
        </b-button>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import axios from 'axios';

    //const base = 'https://fortnite-analyse.herokuapp.com';
    //const base = 'http://localhost:8080';
    const base = '';

    export default {
        name: "reader",
        data() {
            return {
                file: null,
            }
        },
        methods: {
            sendFile() {
                this.$emit('load', true);

                let data = new FormData();
                data.append("replay", this.file);
                axios
                    .post(base + '/read', data)
                    .then(response => {
                        this.sendKillfeed(response.data);
                    })
                    .catch(err => {
                        this.$emit('load', false);
                        console.log(err);
                    });
            },
            sendKillfeed(data) {
              const gunType = ['Storm', 'Fall', 'Pistol', 'Shotgun', 'AR', 'SMG', 'Sniper', 'Pickaxe', "Grenade", undefined, "Grenade Launcher", undefined, undefined, undefined, undefined, "No mercy", undefined, undefined, undefined, undefined, undefined, undefined, "LMG", undefined];
              const koString = ['eliminates', 'knock out'];
                const that = this;
                let killfeed = [];
                data.forEach(chunk => {
                    if (chunk.data.group === "playerElim\0") {
                        let kill = {
                            time: that.millisecondsToTime(chunk.data.time1),
                            eliminator: chunk.content.eliminator,
                            eliminated: chunk.content.eliminated,
                            gun: (gunType[chunk.content.gun] !== undefined ? gunType[chunk.content.gun] : chunk.content.gun),
                            ko: koString[chunk.content.ko]
                        };
                        killfeed.push(kill);
                    }
                });
                this.$emit('killfeed', killfeed);
            },
            millisecondsToTime(ms) {
              return new Date(ms).toISOString().slice(14, -5);
            }
        },
        mounted() {
            const data = new FormData();
        }

    }



</script>

<style scoped>

    #submit-button {
        margin: 20px 0 50px 0;
        border-radius: 50px;
    }

</style>
