<template>
    <div class="last">
        <h2>Конвертор</h2>
        <div class="row">
            <div class="col-sm-6 " :class="{ 'value-selected': left.currency}">
                <v-select
                        v-model="left.currency"
                        :options="leftCurrencies"
                        placeholder="Валюта"
                        :searchable="false"
                        class="row-pad"
                >
                </v-select>
                <input :type="left.error? 'text': 'number'"
                       class="form-control" :readonly="left.error"
                       :value="left.error? 'Ошибка': left.count"
                       @blur="changeValue($event, 'right', 'left')">
            </div>
            <div class="col-sm-6 row-pad" :class="{ 'value-selected': right.currency}">
                <v-select
                        v-model="right.currency"
                        :options="rightCurrencies"
                        placeholder="Валюта"
                        :searchable="false"
                        class="row-pad"
                >
                </v-select>
                <input :type="right.error? 'text': 'number'"
                       class="form-control" :readonly="right.error"
                       :value="right.error? 'Ошибка': right.count"
                       @blur="changeValue($event, 'left', 'right')">
            </div>
        </div>
    </div>

</template>
<script>
import { mapState } from 'vuex';
import { parseString } from 'xml2js';
import moment from 'moment';
import urls from '../../config';

export default {
  data: () => ({
    left: {
      currency: '',
      value: '',
      count: 0,
      error: false,
    },
    right: {
      currency: '',
      value: '',
      count: 0,
      error: false,
    },
  }),
  computed: {
    ...mapState(['currencies']),
    leftCurrencies() {
      return this.currencies.filter(item => item.id !== this.right.currency.id);
    },
    rightCurrencies() {
      return this.currencies.filter(item => item.id !== this.left.currency.id);
    },
  },
  watch: {
    'left.currency': function leftCurrency() {
      this.getCurrency(this.left.currency.id, 'left');
      this.resetValues('right', 'left');
    },
    'right.currency': function rightCurrency() {
      this.getCurrency(this.right.currency.id, 'right');
      this.resetValues('left', 'right');
    },
    'left.value': function leftValue() {
      this.resetValues('right', 'left');
    },
    'right.value': function rightValue() {
      this.resetValues('right', 'left');
    },
  },
  methods: {
    getCurrency(id, side) {
      const now = new Date();
      const dateReq2 = moment().format('DD.MM.YYYY');
      const dateReq1 = moment(now.setDate(now.getDate() - 2)).format('DD.MM.YYYY');

      this.$http.jsonp(urls.urlCurrenciesDynamics(dateReq1, dateReq2, id), {}).then(
        (response) => {
          parseString(response.body.results[0], (err, result) => {
            const record = result.ValCurs.Record;
            this[side].value = record && record.length ? record[record.length - 1].Value[0] : '1';
            this[side].error = !(record && record.length);
          });
        },
        error => console.error(error),
      );
    },
    changeValue(event, side, value) {
      this[value].count = event.target.value;
      this[side].count = this.coefficient(side, value) * event.target.value;
    },
    resetValues(side1, side2) {
      this.right.count = this.coefficient(side1, side2) * this.left.count;
    },
    coefficient(value, side) {
      return Number(this[side].value.replace(',', '.') / this[value].value.replace(',', '.'));
    },
  },
};
</script>

<style>
.last {
  padding-bottom: 70px;
}

.row-pad {
  margin-bottom: 5px;
}
</style>
