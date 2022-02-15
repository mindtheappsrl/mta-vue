<template>
  <v-dialog
    :value="value"
    :max-width="maxWidth"
    :persistent="persistent"
    :scrollable="scrollable"
    :fullscreen="fullScreen"
  >
    <v-card>
      <v-card-title :class="[...headerClass, 'text-h5']">
        <slot name="header">
          {{ title }}
        </slot>
        <v-spacer />
        <v-btn
          icon
          :color="headerClass.includes('white--text') ? 'white' : 'black'"
          @click="hideDialog()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-5 pb-0" style="overflow-y: auto">
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="showCloseButton" text rounded @click="hideDialog()">
          {{ closeLabel }}
        </v-btn>
        <v-spacer v-if="showCloseButton"></v-spacer>
        <slot name="buttons"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MtaSimpleDialog',
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
    },
    closeLabel: {
      type: String,
      default: 'Chiudi'
    }
  },
  methods: {
    hideDialog() {
      this.$emit('input', false)
      this.$emit('close')
    }
  }
}
</script>
