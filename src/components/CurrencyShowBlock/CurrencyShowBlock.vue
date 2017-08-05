<template>
    <div class="currency-show-block">
        <div class="row currency-show-block__first-row">
            <div class="col-sm-6">
                <div :class="{ 'value-selected': selectedCurrency}">
                    <v-select
                            v-model="selectedCurrencyModel"
                            :options="currencies"
                            placeholder="Валюта"
                            :searchable="false">
                    </v-select>

                </div>
            </div>
            <div class="col-sm-6">
                Курс ЦБ
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
    import CurrencyShowBlock from './CurrencyShowBlock';
    import './CurrencyShowBlock.scss';
    export default CurrencyShowBlock;


</script>
