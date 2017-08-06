import Vue from 'vue';
import Vuex from 'vuex';
import moment from "moment";
import urls from "./config";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        currencies: [],
        dynamic: {
        },
        daysCount: 10,
        selectedCurrency: ''
    },
    actions: {
        setCurrencies({commit}, currencies = []) {
            let newCurr = currencies.map(function (item) {
                return {id: item.$.ID, value: item.$.ID, label: item.Name[0], engLabel: item.EngName[0]}
            });

            commit('SET_CURRENCIES', newCurr)
        },
        setDynamic({commit}, dynamic) {
            let newDynamic = dynamic.Record? dynamic.Record.map(function (item) {
                return {id: item.$.Id, date: item.$.Date, value: parseFloat(item.Value[0].replace(',', '.'))}
            }).reverse(): [];

            commit('SET_DYNAMIC', newDynamic)
        },
        setDaysCount({commit}, daysCount = 10) {
            commit('SET_DAYS_COUNT', daysCount > 1000 ? 1000: daysCount);
        },
        setSelectedCurrency({commit}, selectedCurrency = '') {
            commit('SET_SELECTED_CURRENCY', selectedCurrency);
        }
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
        }
    },
    getters: {
        currencies(state) {
            return state.currencies;
        },
        dynamic(state) {
            return state.dynamic;
        },
        daysCount(state) {
            return state.daysCount;
        },
        selectedCurrency(state) {
            return state.selectedCurrency;
        }
    }
});
