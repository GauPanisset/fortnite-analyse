<template>
    <div class="container">
        <v-btn class="my-input">
          replay file
          <input type="file" ref="myFileInput" name="replay" id="myFile" @change="sendFile">
        </v-btn>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import axios from 'axios';

    const base = '';

    export default {
        name: "reader",
        components: [],
        data() {
            return {
              myFile: null,
              gunType: ['Storm', 'Fall', 'Pistol', 'Shotgun', 'AR', 'SMG', 'Sniper', 'Pickaxe', "Grenade", "C4", "Grenade Launcher", "Rocket Launcher", "Minigun", undefined, "Trap", "No mercy", undefined, undefined, undefined, undefined, undefined, undefined, "LMG", "Poison"],
            }
        },
        methods: {
            sendFile() {
                this.myFile = this.$refs.myFileInput.files[0];
                this.$emit('load', true);

                let data = new FormData();
                data.append("replay", this.myFile);
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
                    const koString = ['eliminates', 'knock out'];
                    let killfeed = [];
                    data.forEach(chunk => {
                        if (chunk.data.group === "playerElim\0") {
                            let kill = {
                                time: Math.trunc(chunk.data.time1 / 1000),
                                eliminator: chunk.content.eliminator,
                                eliminated: chunk.content.eliminated,
                                gun: (this.gunType[chunk.content.gun] !== undefined ? this.gunType[chunk.content.gun] : chunk.content.gun),
                                ko: koString[chunk.content.ko]
                            };
                            killfeed.push(kill);
                        }
                    });
                    this.$emit('fromReader', {"killfeed": killfeed, "chartData": this.weaponCount(killfeed)});

            },
            weaponCount(data) {
                let index = 0;
                let count = {};
                this.gunType.forEach(gun => {
                    if (gun !== undefined && gun !== "No mercy") {
                        count[gun] = [0];
                    }
                });
                let time = 1;     //time in seconds
                let label = [this.millisecondsToTime(0)];
                while (index < data.length) {

                    if (data[index].time === time) {
                        let kill = data[index];
                        if (kill.gun !== "No mercy") {
                            count[kill.gun][time] = count[kill.gun][time] === undefined ? count[kill.gun][time - 1] + 1 : count[kill.gun][time] + 1;
                        }
                        index++;
                        if (index === data.length) {
                            label.push(this.millisecondsToTime((time + 1)*1000));
                        }
                    } else {
                        for (let gun in count) {
                            count[gun][time] = count[gun][time] === undefined ? count[gun][time - 1] : count[gun][time];
                        }
                        label.push(this.millisecondsToTime(time*1000));
                        time++;
                    }
                }
                label.push(this.millisecondsToTime((time + 1)*1000));
                return {
                    data: count,
                    label: label,
                }
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

    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
      background-color: #311B92;
      color: white;
    }

    .my-input input[type=file] {
      position: absolute;
      top: 0;
      right: 0;
      min-width: 100%;
      min-height: 100%;
      text-align: right;
      filter: alpha(opacity=0);
      opacity: 0;
      outline: none;
      cursor: inherit;
      display: block;
    }

</style>
