import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    currencies: [],
    dynamic: {},
    daysCount: 10,
    selectedCurrency: '',
  },
  actions: {
    setCurrencies({ commit }, currencies = []) {
      const newCurr = currencies.map(item => ({
        id: item.$.ID,
        value: item.$.ID,
        label: item.Name[0],
        engLabel: item.EngName[0],
      }));

      commit('SET_CURRENCIES', newCurr);
    },
    setDynamic({ commit }, dynamic) {
      const newDynamic = dynamic.Record
        ? dynamic.Record.map(item => ({
          id: item.$.Id,
          date: item.$.Date,
          value: parseFloat(item.Value[0].replace(',', '.')),
        })).reverse()
        : [];

      commit('SET_DYNAMIC', newDynamic);
    },
    setDaysCount({ commit }, daysCount = 10) {
      let count = daysCount;
      if (count < 1) {
        count = 1;
      }
      if (count > 1000) {
        count = 1000;
      }
      commit('SET_DAYS_COUNT', count);
    },
    setSelectedCurrency({ commit }, selectedCurrency = '') {
      commit('SET_SELECTED_CURRENCY', selectedCurrency);
    },
  },
  mutations: {
    SET_CURRENCIES(state, currencies) {
      state.currencies = currencies;
    },
    SET_DYNAMIC(state, dynamic) {
      state.dynamic = dynamic;
    },
    SET_DAYS_COUNT(state, daysCount) {
      state.daysCount = daysCount;
    },
    SET_SELECTED_CURRENCY(state, selectedCurrency) {
      state.selectedCurrency = selectedCurrency;
    },
  },
});
