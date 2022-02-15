<template>
  <SimpleDialog
    :value="value"
    :title="title"
    :max-width="maxWidth"
    :persistent="persistent"
    :scrollable="scrollable"
    :full-screen="fullScreen"
    :show-close-button="showCloseButton"
    :header-class="[...headerClass, 'primary', 'white--text']"
    @input="$emit('input', $event)"
    @close="$emit('close')"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #buttons>
      <slot name="buttons"></slot>
    </template>
  </SimpleDialog>
</template>

<script>
import SimpleDialog from './MtaSimpleDialog'

export default {
  name: 'MtaDialogWithHeader',
  components: {
    SimpleDialog
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    headerClass: {
      type: [Array, Object],
      default: () => []
    },
    maxWidth: {
      type: String,
      default: '500'
    },
    persistent: {
      type: Boolean,
      default: true
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      required: true
    },
    fullScreen: {
      type: Boolean,
      default: false
    },
    showCloseButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    hideDialog() {
      this.$emit('input', false)
    }
  }
}
</script>
