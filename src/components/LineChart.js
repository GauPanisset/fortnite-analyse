import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'options'],
  methods: {
    update() {
      this._chart.update();
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
