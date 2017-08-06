import {mapState, mapActions} from 'vuex';
import {parseString} from 'xml2js';
import urls from '../../config';
import moment from 'moment';

export default {
    data: function () {
        return {
            selectedCurrencyModel: ''
        }
    },
    computed: {
        ...mapState([
            'currencies',
            'dynamic',
            'daysCount',
            'selectedCurrency'
        ]),
        valueCurrency: function () {
            return this.dynamic && this.dynamic.length ? this.dynamic[0].value : 'Отсутствует динамика';
        }
    },
    methods: {
        ...mapActions([
            'setCurrencies',
            'setDynamic',
            'setDaysCount',
            'setSelectedCurrency'
        ])
    },
    watch: {
        selectedCurrency() {
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
        selectedCurrencyModel() {
            this.setSelectedCurrency(this.selectedCurrencyModel);
        }
    },

    created() {
        this.$http.jsonp(urls.urlCurrenciesTypes(),{})
            .then(response => {
                parseString(response.body.results[0], (err, result) => {
                    this.setCurrencies(result.Valuta.Item);
                    this.selectedCurrencyModel = this.currencies[0];
                });
            }, error => console.log(error));

    }
}