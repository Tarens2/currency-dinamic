<template>
    <div id="app" class="top">
        <div class="container">
            <h1>Курсы валют</h1>
            <currency-show-block></currency-show-block>
            <dynamic-block></dynamic-block>
        </div>
        <div class="container">
            <convert-block></convert-block>
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
        data: () => ({}),
        components: {CurrencyShowBlock, DynamicBlock, ConvertBlock},
        store
    }
</script>

<style>
    .top {
        margin-top: 30px;
    }
</style>
