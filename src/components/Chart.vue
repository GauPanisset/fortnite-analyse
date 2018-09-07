<template>
  <canvas :id="weapon"></canvas>
</template>

<script>
    export default {
        name: "chart",
        props: ["zone", "data", "options", "label", "weapon"],
        mounted() {

          const ctx = document.getElementById(this.weapon).getContext('2d');

          function truncData(data, start, end) {
            let index = 0;
            let res = [];

            while (index < data.length) {
              if (index < start || index >= end) {
                res.push(null);
              } else {
                res.push(data[index]);
              }
              index++;
            }
            return res;
          }



          function setData(data, zone, label) {
            let res = {
              datasets: [],
              labels: label,
            };

            for (let index = 0; index < zone.length - 1; index++) {
              let dataset = null;
              if (index % 2 === 0) {
                dataset = {
                  data: truncData(data, zone[index], zone[index + 1]),
                  fillColor: "rgba(200,0,0,0.2)"
                };
              } else {
                dataset = {
                  data: truncData(data, zone[index], zone[index + 1]),
                  fillColor: "rgba(0,200,0,0.2)"
                };
              }
              res.datasets.push(dataset);
            }
            return res;
          }

          console.log(setData(this.data, this.zone, this.label));

          const myChart = new Chart(ctx, {
            type: 'bar',
            data: setData(this.data, this.zone, this.label),
            options: this.options
          });
        }
    }


</script>

<style scoped>

</style>
