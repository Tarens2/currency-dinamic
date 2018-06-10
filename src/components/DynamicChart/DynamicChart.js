import { Line, mixins } from 'vue-chartjs';

export default Line.extend({
  props: ['options'],
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});
