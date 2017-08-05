<template>
    <div id="app" class="container top">
        <div class="row">
            <div class="container col-md-8">
                <h1>Курсы валют</h1>
                <currency-show-block></currency-show-block>
                <dynamic-block></dynamic-block>
            </div>
            <div class="container col-md-4">
                <h2>Конвертор</h2>
                <convert-block></convert-block>
            </div>
        </div>
    </div>
</template>

<script>
    import store from './store';
    import CurrencyShowBlock from './components/CurrencyShowBlock/CurrencyShowBlock.vue';
    import DynamicBlock from './components/DynamicBlock/DynamicBlock.vue';
    import ConvertBlock from './components/ConvertBlock/ConvertBlock.vue';

    export default {
        name: 'app',
        data: () => ({
        }),
        components: {CurrencyShowBlock, DynamicBlock, ConvertBlock},
        store
    }
</script>

<style>
    .top {
        margin-top: 30px;
    }
</style>
