<template>
    <div :class="{ 'value-selected': currency}">
        <v-select
                v-model="currency"
                :options="currencies"
                placeholder="Валюта"
                :searchable="false"
                class="row-pad"
        >
        </v-select>
        <input :type="typeError"
               class="form-control" :readonly="error"
               :value="error? 'Ошибка': count"
               @blur="changeValue">
    </div>
</template>
<script>
export default {
  props: ['currencies', 'count', 'currency'],
  data() {
    return {
      error: false,
    };
  },
  computed: {
    typeError() {
      return this.error ? 'text' : 'number';
    },
  },
  methods: {
    changeValue($event) {
      this.$emit('changeValue', $event);
    },
  },
};
</script>
