<template>
    <div class="dynamic-block" v-show="dynamic.length">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="daysCount">Show graph for last (days):</label>
                        <input type="number"
                               id="daysCount"
                               @keyup.enter="setDaysCountHandler"
                               @focusout="setDaysCountHandler"
                               class="form-control"
                               :value="daysCount">

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-5 dynamic-block__dynamic-table">
                    <table class="table dynamic-block__dynamic-table dynamic-table">
                        <tr>
                            <th>Date</th>
                            <th>RUB</th>
                            <th></th>
                        </tr>
                        <tr v-for="(item, index) in dynamic" :key="index">
                            <td>{{item.date}}</td>
                            <td>{{item.value}}</td>
                            <td :class="{
                            'red': !compareValue(index),
                            'green': compareValue(index)
                            }"> {{ compareValue(index)? '+' + diffValue(index): diffValue(index)}}
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="col-sm-12 col-md-7">
                    <dynamic-chart
                            :chart-data="dynamicData"
                            :options="chartOptions">
                    </dynamic-chart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import DynamicChart from '../../components/DynamicChart/DynamicChart';
import './DynamicBlock.scss';
import service from '../../service';

export default {
  data: () => ({
    chartOptions: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
          },
        }],
      },
    },
  }),
  methods: {
    diffValue(index) {
      return this.dynamic.length && index + 1 !== this.dynamic.length ?
        (this.dynamic[index].value - this.dynamic[index + 1].value).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : 0;
    },
    compareValue(index) {
      return this.dynamic.length && index + 1 !== this.dynamic.length ?
        this.dynamic[index].value > this.dynamic[index + 1].value : true;
    },
    setDaysCountHandler(event) {
      this.setDaysCount(event.target.value);

      service.fetchByDate(this.daysCount, this.selectedCurrency.value).then((result) => {
        this.setDynamic(result);
      });
    },
    ...mapActions([
      'setCurrencies',
      'setDynamic',
      'setDaysCount',
    ]),
  },
  computed: {
    ...mapState([
      'currencies',
      'dynamic',
      'daysCount',
      'selectedCurrency',
    ]),


    dynamicData() {
      if (!this.dynamic.length) return { datasets: [] };

      const dates = this.dynamic.map(item => item.date).reverse();
      const values = this.dynamic.map(item => item.value).reverse();

      return {
        labels: dates,
        datasets: [
          {
            label: 'RUB',
            backgroundColor: '#387979',
            data: values,
          },
        ],
      };
    },
  },
  components: {
    DynamicChart,
  },

};
</script>
