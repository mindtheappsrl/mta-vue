<template>
  <SimpleDialog
    :value="value"
    :title="title"
    max-width="500"
    persistent
    :header-class="isWarning ? ['error', 'white--text', 'text-center'] : []"
    :show-close-button="false"
    @input="$emit('input', $event)"
  >
    <p>{{ message }}</p>

    <template #buttons>
      <v-btn
        rounded
        :text="!isWarning"
        :dark="isWarning"
        :color="isWarning ? 'error' : ''"
        @click="onNoClick()"
      >
        {{ noLabel }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        text
        :color="isWarning ? 'error' : ''"
        @click="onYesClick()"
      >
        {{ yesLabel }}
      </v-btn>
    </template>
  </SimpleDialog>
</template>

<script>
import SimpleDialog from './MtaSimpleDialog'

export default {
  name: 'MtaConfirmDialog',
  components: {
    SimpleDialog
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default() {
        return this.$t('WARNING')
      }
    },
    message: {
      type: String,
      required: true
    },
    isWarning: {
      type: Boolean,
      default: true
    },
    yesLabel: {
      type: String,
      default: 'Si'
    },
    noLabel: {
      type: String,
      default: 'No'
    }
  },
  methods: {
    onNoClick() {
      this.$emit('click:no')
      this.$emit('input', false)
    },
    onYesClick() {
      this.$emit('click:yes')
      this.$emit('input', false)
    }
  }
}
</script>
