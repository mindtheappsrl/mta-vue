<template>
  <SimpleDialog
    :value="value"
    :title="title"
    max-width="500"
    persistent
    :header-class="['error', 'white--text', 'text-center']"
    @input="$emit('input', $event)"
  >
    <p>{{ message }}</p>

    <template #buttons>
      <v-btn rounded dark color="error" @click="$emit('click:delete')">
        <v-icon>mdi-delete</v-icon>
        {{ yesLabel }}
      </v-btn>
    </template>
  </SimpleDialog>
</template>

<script>
import SimpleDialog from './MtaSimpleDialog'

export default {
  name: 'MtaDeleteDialog',
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
      default: 'Attenzione'
    },
    message: {
      type: String,
      required: true
    },
    yesLabel: {
      type: String,
      default: 'Si, cancella'
    }
  }
}
</script>
