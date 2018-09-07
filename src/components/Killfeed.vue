<template>
    <div class="container" v-if="content.length > 0">
        <table id="killfeed-tab">
            <tr v-for="kill in content" :key="kill.time+kill.eliminated+kill.ko">
                <th class="kill">{{millisecondsToTime(kill.time * 1000) + " – " + kill.eliminator + " " + kill.ko + " " + kill.eliminated + " with " + kill.gun}}</th>
            </tr>
        </table>
    </div>

    <div class="line" v-else>
    </div>
</template>

<script>

    export default {
        name: "killfeed",
        props: ["content"],
        data() {
            return {
            }
        },
        methods: {
            millisecondsToTime(ms) {
                return new Date(ms).toISOString().slice(14, -5);
            }
        }
    }
</script>

<style scoped>

    .container {
        width: fit-content;
        height: 65vh;
        padding-top: 20px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 2px;
        overflow: auto;
        box-shadow: -1px 2px 10px 3px rgba(0, 0, 0, 0.3) inset;
        background-color: rgba(0, 0, 0, 0.05);
    }

    #killfeed-tab {
        margin: auto;
        text-align: left;
    }

    .line {
        border-top: 2px solid rgba(0, 0, 0, 0.5);
        margin: auto;
        width: 50px;
    }

</style>
