<template>
    <div class="dynamic-block" v-show="dynamic.length">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="daysCount">Показать график за последнии кол-во дней: </label>
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
                            <th>Дата</th>
                            <th>Курс ЦБ РФ</th>
                            <th></th>
                        </tr>
                        <tr v-for="(item, index) in dynamic">
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
                    <dynamic-chart :chart-data="dynamicData" :options="chartOptions"></dynamic-chart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import Vue from 'vue';
    import './DynamicBlock.scss';
    import DynamicChart from '../../components/DynamicChart/DynamicChart.js';
    import moment from 'moment';
    import urls from '../../config';
    import {parseString} from 'xml2js';

    export default {
        data:() => {
            return {
                chartOptions: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    }
                }
            }
        },
        methods: {
            diffValue(index) {
                return this.dynamic.length && index + 1 != this.dynamic.length ?
                    (this.dynamic[index].value - this.dynamic[index + 1].value).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : 0;
            },
            compareValue(index){
                return this.dynamic.length && index + 1 != this.dynamic.length ?
                    this.dynamic[index].value > this.dynamic[index + 1].value : true;
            },
            setDaysCountHandler(event) {
                this.setDaysCount(event.target.value);
                let now = new Date();
                let date_req2 = moment().format("DD.MM.YYYY");
                let date_req1 = moment(now.setDate(now.getDate() - this.daysCount)).format("DD.MM.YYYY");

                this.$http.jsonp(urls.urlCurrenciesDynamics(date_req1, date_req2, this.selectedCurrency.value),
                    {})
                    .then(response => {
                        parseString(response.body.results[0], (err, result) => {
                            this.setDynamic(result.ValCurs);
                        })
                    }, error => console.log(error));
            },
            ...mapActions([
                'setCurrencies',
                'setDynamic',
                'setDaysCount'
            ]),
        },
        computed: {
            ...mapState([
                'currencies',
                'dynamic',
                'daysCount',
                'selectedCurrency'
            ]),


            dynamicData() {
                if (!this.dynamic.length) return {};
                let dates = this.dynamic.map(function (item) {
                    return item.date;
                }).reverse();

                let values = this.dynamic.map(function (item) {
                    return item.value;
                }).reverse();
                return {
                    labels: dates,
                    datasets: [
                        {
                            label: 'RUB',
                            backgroundColor: '#387979',
                            data: values
                        }
                    ]
                }
            }
        },
        components: {
            DynamicChart
        }

    }
</script>