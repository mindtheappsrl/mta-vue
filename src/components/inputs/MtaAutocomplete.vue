<template>
  <v-autocomplete
    :value="valueAsArray ? value[0] : value"
    :items="items"
    :multiple="multiple"
    :item-text="itemText"
    :item-value="itemValue"
    chips
    filled
    rounded
    hide-details
    :label="label"
    :disabled="disabled"
    :dense="dense"
    :clearable="clearable"
    :filter="filter"
    :readonly="readonly"
    :search-input.sync="searchInput"
    @input="onInput($event)"
    @change="
      searchInput = ''
      $emit('change', $event)
    "
  >
    <template #selection="{ item }">
      <slot name="selection" :item="item">
        {{ item[itemText] }}
      </slot>
    </template>
    <template #item="{ item }">
      <slot name="item" :item="item">
        {{ item[itemText] }}
      </slot>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'MtaAutocomplete',
  props: {
    value: {
      type: [String, Array, Number],
      required: false,
      default: ''
    },
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    itemText: {
      type: String,
      required: false,
      default: 'text'
    },
    itemValue: {
      type: String,
      required: false,
      default: 'value'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function,
      default: function _default(item, queryText, itemText) {
        return itemText
          .toLocaleLowerCase()
          .includes(queryText.toLocaleLowerCase())
      }
    },
    // Specify that the value is an array and use the first
    // element, don't use with 'multiple' prop
    valueAsArray: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', this.valueAsArray ? [event] : event)
    }
  }
}
</script>

<style scoped></style>
