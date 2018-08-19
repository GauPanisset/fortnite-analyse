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
                const gunType = ['Storm', 'Fall', 'Pistol', 'Shotgun', 'AR', 'SMG', 'Sniper', 'Pickaxe', "Grenade", "C4", "Grenade Launcher", "Rocket Launcher", undefined, undefined, "Trap", "No mercy", undefined, undefined, undefined, undefined, undefined, undefined, "LMG", "Poison"];
                const koString = ['eliminates', 'knock out'];
                    let killfeed = [];
                    let maxTime = 0;
                    data.forEach(chunk => {
                        if (chunk.data.group === "playerElim\0") {
                            if (maxTime < chunk.data.time1) {
                                maxTime = chunk.data.time1;
                            }
                            let kill = {
                                time: chunk.data.time1,
                                eliminator: chunk.content.eliminator,
                                eliminated: chunk.content.eliminated,
                                gun: (gunType[chunk.content.gun] !== undefined ? gunType[chunk.content.gun] : chunk.content.gun),
                                ko: koString[chunk.content.ko]
                            };
                            killfeed.push(kill);
                        }
                    });
                    this.$emit('fromReader', {"killfeed": killfeed, "weaponView": this.weaponCount(killfeed), "maxTime": Math.trunc(maxTime/10000)});

            },
            weaponCount(data) {
                let count = {};
                data.forEach(kill => {
                    if (kill.gun !== "No mercy"){
                        if (count[kill.gun] === undefined) {
                            count[kill.gun] = {tot: 1, time: {}};
                        } else {
                            count[kill.gun].tot += 1;
                        }
                        if (count[kill.gun].time[Math.trunc(kill.time / 10000)] === undefined) {
                            count[kill.gun].time[Math.trunc(kill.time / 10000)] = 1
                        } else {
                            count[kill.gun].time[Math.trunc(kill.time / 10000)] += 1
                        }
                    }
                });
                let res = [];
                for (let prop in count) {
                    res.push({"weapon": prop, "tot": count[prop].tot, "time": count[prop].time})
                }
               return res;
            },
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
