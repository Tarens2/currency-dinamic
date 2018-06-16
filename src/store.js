import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutationTypes = {
  SET_SELECTED_CURRENCY: 'SET_SELECTED_CURRENCY',
  SET_DAYS_COUNT: 'SET_DAYS_COUNT',
  SET_DYNAMIC: 'SET_DYNAMIC',
  SET_CURRENCIES: 'SET_CURRENCIES',
};

export default new Vuex.Store({
  state: {
    currencies: [],
    dynamic: [],
    daysCount: 10,
    selectedCurrency: '-',
  },
  actions: {
    setCurrencies({ commit }, currencies = []) {
      const newCurr = currencies.map(item => ({
        id: item.$.ID,
        value: item.$.ID,
        label: item.EngName[0],
      }));

      commit(mutationTypes.SET_CURRENCIES, newCurr);
      if (newCurr.length) {
        commit(mutationTypes.SET_SELECTED_CURRENCY, newCurr[0]);
      }
    },
    setDynamic({ commit }, dynamic = []) {
      const newDynamic = dynamic
        ? dynamic.map(item => ({
          id: item.$.Id,
          date: item.$.Date,
          value: parseFloat(item.Value[0].replace(',', '.')),
        })).reverse()
        : [];

      commit(mutationTypes.SET_DYNAMIC, newDynamic);
    },
    setDaysCount({ commit }, daysCount = 10) {
      let count = daysCount;
      if (count < 1) {
        count = 1;
      }
      if (count > 1000) {
        count = 1000;
      }
      commit(mutationTypes.SET_DAYS_COUNT, count);
    },
  },
  mutations: {
    [mutationTypes.SET_CURRENCIES](state, currencies) {
      state.currencies = currencies;
    },
    [mutationTypes.SET_DYNAMIC](state, dynamic) {
      state.dynamic = dynamic;
    },
    [mutationTypes.SET_DAYS_COUNT](state, daysCount) {
      state.daysCount = daysCount;
    },
    [mutationTypes.SET_SELECTED_CURRENCY](state, selectedCurrency) {
      state.selectedCurrency = selectedCurrency;
    },
  },
});
