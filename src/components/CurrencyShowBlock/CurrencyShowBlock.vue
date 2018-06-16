<template>
    <div class="currency-show-block">
        <div class="row currency-show-block__first-row">
            <div class="col-sm-6">
                <div :class="{'value-selected': selectedCurrency}">
                    <v-select
                            v-model="selectedCurrency"
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
                {{selectedCurrency.label}}
            </div>
            <div class="col-sm-6">
                {{valueCurrency}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import './CurrencyShowBlock.scss';
import { mutationTypes } from '../../store';
import service from '../../service';

export default {
  computed: {
    ...mapState([
      'currencies',
      'dynamic',
      'daysCount',
    ]),
    valueCurrency() {
      return this.dynamic && this.dynamic.length ? this.dynamic[0].value : '-';
    },
    selectedCurrency: {
      get() { return this.$store.state.selectedCurrency; },
      set(val) { this.$store.commit(mutationTypes.SET_SELECTED_CURRENCY, val); },
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
      service.fetchByDate(this.daysCount, this.selectedCurrency.value)
        .then((result) => {
          this.setDynamic(result);
        });
    },
  },

  mounted() {
    service.fetchCurrencies().then((result) => {
      this.setCurrencies(result);
    });
  },
};
</script>
