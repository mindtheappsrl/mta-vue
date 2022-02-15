<template>
  <mta-autocomplete
    :value="value"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    multiple
    :label="label"
    :disabled="disabled"
    :dense="dense"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <template #selection="{ item }">
      <v-chip class="mt-2" small color="primary">
        <span style="overflow: hidden; text-overflow: ellipsis;">
          {{ item[itemText] }}
        </span>
        <v-icon
          small
          right
          @click="
            $emit(
              'input',
              value.filter((u) => u !== item[itemValue])
            )
          "
        >
          mdi-close-circle
        </v-icon>
      </v-chip>
    </template>
  </mta-autocomplete>
</template>

<script>
import MtaAutocomplete from '../inputs/MtaAutocomplete'

export default {
  name: 'MtaAutocompleteMultiple',
  components: {
    MtaAutocomplete
  },
  props: {
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    }
  }
}
</script>

<style scoped></style>
