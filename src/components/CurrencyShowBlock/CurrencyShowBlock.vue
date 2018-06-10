<template>
    <div class="currency-show-block">
        <div class="row currency-show-block__first-row">
            <div class="col-sm-6">
                <div :class="{ 'value-selected': selectedCurrency}">
                    <v-select
                            v-model="selectedCurrencyModel"
                            :options="currencies"
                            placeholder="Currency"
                            :searchable="false">
                    </v-select>

                </div>
            </div>
            <div class="col-sm-6">
                RUB
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                {{selectedCurrency.engLabel}}
            </div>
            <div class="col-sm-6">
                {{valueCurrency}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { parseString } from 'xml2js';
import moment from 'moment';
import urls from '../../config';
import './CurrencyShowBlock.scss';

export default {
  data() {
    return {
      selectedCurrencyModel: '',
    };
  },
  computed: {
    ...mapState([
      'currencies',
      'dynamic',
      'selectedCurrency',
    ]),
    valueCurrency() {
      return this.dynamic && this.dynamic.length ? this.dynamic[0].value : '-';
    },
  },
  methods: {
    ...mapActions([
      'setCurrencies',
      'setDynamic',
      'setSelectedCurrency',
    ]),
  },
  watch: {
    selectedCurrency() {
      const now = new Date();
      const dateReq2 = moment().format('DD.MM.YYYY');
      const dateReq1 = moment(now.setDate(now.getDate() - this.daysCount)).format('DD.MM.YYYY');
      this.$http.jsonp(
        urls.urlCurrenciesDynamics(dateReq1, dateReq2, this.selectedCurrency.value),
        {},
      )
        .then((response) => {
          parseString(response.body.results[0], (err, result) => {
            this.setDynamic(result.ValCurs);
          });
        }, error => console.error(error));
    },
    selectedCurrencyModel() {
      this.setSelectedCurrency(this.selectedCurrencyModel);
    },
  },

  mounted() {
    this.$http.jsonp(urls.urlCurrenciesTypes(), {})
      .then((response) => {
        parseString(response.body.results[0], (err, result) => {
          this.setCurrencies(result.Valuta.Item);
          [this.selectedCurrencyModel] = this.currencies;
        });
      }, error => console.error(error));
  },
};
</script>
