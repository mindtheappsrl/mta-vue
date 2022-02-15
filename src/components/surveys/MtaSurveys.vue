<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
            rounded
            small
            dark
            color="accent"
            @click="openSurveyRowDialog()"
        >
          <v-icon left small>mdi-plus</v-icon>
          {{ labels.newSurveyRow }}
        </v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn
            v-if="!isSorting && !isEditing && surveyDetails.surveys.length"
            rounded
            small
            color="primary"
            @click="toggleSort()"
        >
          <v-icon left small>mdi-menu-swap</v-icon>
          {{ labels.sort }}
        </v-btn>
        <v-btn
            v-if="!isSorting && !isEditing && surveyDetails.surveys.length"
            rounded
            small
            color="primary"
            @click="toggleEdit()"
        >
          <v-icon left small>mdi-pencil</v-icon>
          {{ labels.edit }}
        </v-btn>
        <v-btn v-if="isEditing" rounded text small @click="undo()">
          <v-icon small left>mdi-undo</v-icon>
          {{ labels.stopEdit }}
        </v-btn>
        <v-btn v-if="isSorting" rounded small text @click="undo()">
          <v-icon small left>mdi-undo</v-icon>
          {{ labels.undo }}
        </v-btn>
        <v-btn
            v-if="surveyDetails.surveys.length || ignoreRows.length"
            rounded
            color="success"
            class="ml-5"
            @click="$emit('click:save-survey', surveyDetails)"
        >
          <v-icon small left>mdi-content-save</v-icon>
          {{ labels.save }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        <div v-if="surveyDetails.surveys.length" class="list">
          <draggable
              v-model="surveyDetails.surveys"
              :scroll-sensitivity="200"
              :force-fallback="true"
              ghost-class="u-drag-ghost"
              :options="{ disabled: !isSorting }"
              @end="onDragEnd($event)"
          >
            <transition-group type="transition" :name="'flip-list'">
              <v-card
                  v-for="(sr, index) in sortedSurveyRows"
                  :key="sr.id ? sr.id : index"
                  class="mb-2"
                  :class="{'cursor-grab': isSorting, 'orange lighten-5': sr.rowTypeCode === 11, 'grey lighten-5': sr.rowTypeCode !== 11}"
              >
                <v-card-title class="py-0 pl-5">
                  <v-row justify="center" align="center">
                    <v-col class="mt-1">
                      <v-icon v-if="isSorting" left>
                        mdi-drag-horizontal-variant
                      </v-icon>
                      <v-chip
                          v-if="sr.rowTypeCode !== 11"
                          small
                          :color="sr.isRequired ? 'red' : 'primary'"
                          class="text-uppercase white--text font-weight-bold mr-3"
                      >
                        <v-icon
                            v-if="sr.isRequired"
                            left
                            color="white"
                            size="12"
                        >
                          mdi-asterisk
                        </v-icon>
                        {{
                          labels.surveyRowTypes[sr.rowTypeCode]
                        }}
                      </v-chip>
                      <span v-if="sr.surveyRowTextCode">
                        <span class="font-weight-bold text-subtitle-2">
                        {{ sr.surveyRowTextCode }}
                      </span>
                      <span class="text-subtitle-2"> - </span>
                      </span>
                      <span
                          class="text-subtitle-2"
                          :class="{'text-uppercase font-weight-bold grey--text text--darken-2 pl-2': sr.rowTypeCode === 11}"
                      >
                        {{ sr.title }} ({{ sr.code }})
                      </span>
                    </v-col>
                    <v-col v-if="isEditing" class="text-right mt-1">
                      <v-btn
                          rounded
                          icon
                          small
                          outlined
                          color="primary"
                          class="mr-3"
                          @click.stop="editSurveyRow(sr.id)"
                      >
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                          rounded
                          icon
                          small
                          outlined
                          color="error"
                          class="mr-3"
                          @click.stop="confirmDelete(sr.id)"
                      >
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text class="pa-2 pt-0">
                  <div
                      v-if="sr.answersList && sr.answersList.length && (sr.rowTypeCode === 5 || sr.rowTypeCode === 6)"
                      class="white_light grey--text text--darken-1 pa-2"
                      style="border-radius: 15px"
                  >
                    <ul>
                      <li
                          v-for="(answer, idx) in sr.answersList"
                          :key="idx"
                      >
                        <span>{{ answer.value }}</span>
                      </li>
                    </ul>
                  </div>
                </v-card-text>
              </v-card>
            </transition-group>
          </draggable>
        </div>
        <div v-else id="no-data">
          <v-row class="text-center grey--text pa-5">
            <v-col>
              <v-icon color="grey" class="mb-2">
                mdi-alert-circle
              </v-icon>
              <div>{{ labels.noData }}</div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <mta-dialog-with-header
        v-model="surveyRowDialog.model"
        :title="surveyRowDialog.row.id ? labels.surveyRow.edit : labels.surveyRow.add"
    >
      <v-tabs id="survey-row-tabs" v-model="surveyRowDialog.tab">
        <v-tab-item value="tab-question">
          <v-text-field
              v-model="surveyRowDialog.row.title"
              rounded
              filled
              dense
              :label="labels.surveyRow.text"
          >
          </v-text-field>
          <v-text-field
              v-model="surveyRowDialog.row.code"
              rounded
              filled
              dense
              :label="labels.surveyRow.code"
          >
          </v-text-field>
          <mta-autocomplete
              v-model="surveyRowDialog.row.rowTypeCode"
              :disabled="surveyRowDialog.row.id !== null"
              :label="labels.surveyRow.type"
              :items="surveyRowTypeCodes"
          >
            <template v-slot:selection="data">
              {{ labels.surveyRowTypes[data.item.text] }}
            </template>
            <template v-slot:item="data">
              {{ labels.surveyRowTypes[data.item.text] }}
            </template>
          </mta-autocomplete>
          <v-switch
              v-if="surveyRowDialog.row.rowTypeCode !== 11"
              v-model="surveyRowDialog.row.isRequired"
              class="ml-2"
              inset
              :label="labels.isRequired"
              color="error"
          >
          </v-switch>
        </v-tab-item>
        <v-tab-item value="tab-answers">
          <div class="text-center">
            <v-chip
                v-if="surveyRowDialog.row.rowTypeCode"
                small
                :color="surveyRowDialog.row.isRequired ? 'red' : 'primary'"
                class="text-uppercase white--text font-weight-bold mr-3"
            >
              <v-icon
                  v-if="surveyRowDialog.row.isRequired"
                  left
                  color="white"
                  size="12"
              >
                mdi-asterisk
              </v-icon>
              {{ labels.surveyRowTypes[surveyRowDialog.row.rowTypeCode] }}
            </v-chip>
          </div>
          <div class="text-center">
            <h4>{{ surveyRowDialog.row.title }}</h4>
          </div>

          <!-- RADIOLIST or CHECKLIST -->

          <div class="text-right my-3">
            <v-btn
                rounded
                color="primary"
                small
                @click="addOption(surveyRowDialog.row.answersList.length)"
            >
              <v-icon left small>mdi-plus</v-icon>
              {{ labels.surveyRow.addOption }}
            </v-btn>
          </div>

          <div
              v-for="(answer, idx) in surveyRowDialog.row.answersList"
              :key="idx"
              class="mb-3"
          >
            <v-text-field
                v-model="answer.value"
                rounded
                dense
                filled
                hide-details
                :label="`${labels.surveyRow.answers.text} ${idx + 1}`"
                :append-icon="idx > 0 ? 'mdi-close-circle' : ''"
                @click:append="removeOption(idx)"
            ></v-text-field>
          </div>
        </v-tab-item>
      </v-tabs>
      <template #buttons>
        <template v-if="surveyRowDialog.row && surveyRowDialog.row.rowTypeCode">
          <v-btn
              v-if="
                [5, 6].indexOf(surveyRowDialog.row.rowTypeCode) !== -1 ||
                  surveyRowDialog.tab === 'tab-answers'
              "
              rounded
              color="success"
              :disabled="
                !surveyRowDialog.row.title ||
                  (surveyRowDialog.tab === 'tab-answers' &&
                    !surveyRowDialog.row.answersList.length)
              "
              @click="addEditSurveyAnswers()"
          >
            <v-icon left small>mdi-arrow-right</v-icon>
            {{ labels.continue }}
          </v-btn>
          <v-btn
              v-else
              rounded
              color="success"
              :disabled="!surveyRowDialog.row.title"
              @click="addEditSurveyRow()"
          >
              <span v-if="surveyRowDialog.row.id">
                <v-icon left small>mdi-pencil</v-icon>{{ labels.edit }}
              </span>
            <span v-else>
                <v-icon left small>mdi-plus</v-icon>{{ labels.add }}
              </span>
          </v-btn>
        </template>
      </template>
    </mta-dialog-with-header>

    <mta-delete-dialog
        v-model="confirmDeleteSurveyRowDialog.model"
        :message="labels.surveyRow.deleteMsg"
        @click:delete="deleteSurveyRow()"
    >
    </mta-delete-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import SurveyRowModel from "../../models/surveys/SurveyRowModel";
import SurveyDetailModel from "../../models/surveys/SurveyDetailModel";
import surveyRowTypeCodes from "../../models/surveys/SurveyRowTypeCodes";
import MtaDialogWithHeader from "../dialogs/MtaDialogWithHeader";
import MtaAutocomplete from "../inputs/MtaAutocomplete";
import AnswerModel from "../../models/surveys/answers/AnswerModel";
import MtaDeleteDialog from "../dialogs/MtaDeleteDialog";
import { uuid } from 'vue-uuid';

export default {
  name: "MtaSurveys",
  components: {
    MtaDeleteDialog,
    MtaAutocomplete,
    MtaDialogWithHeader,
    draggable
  },
  props: {
    labels: {
      type: Object,
      default: () => ({
        newSurveyRow: 'Aggiungi domanda',
        sort: 'Ordina',
        edit: 'Modifica',
        add: 'Aggiungi',
        stopEdit: 'Annulla',
        undo: 'Annulla',
        save: 'Salva',
        noData: 'Nessuna domanda inserita',
        isRequired: 'Obbligatorio',
        continue: 'Continua',
        surveyRow: {
          add: 'Aggiungi domanda',
          edit: 'Modifica domanda',
          text: 'Domanda',
          code: 'Codice',
          type: 'Tipo',
          addOption: 'Aggiungi opzione',
          deleteMsg: 'Vuoi eliminare questa domanda?',
          answers: {
            text: 'Opzione',
          }
        },
        surveyRowTypes: surveyRowTypeCodes.reduce((acc, cur) => {
          acc[cur.value] = cur.text
          return acc
        }, {}),
      }),
    },
    surveyDetails: {
      type: Object,
      default: () => new SurveyDetailModel(null),
    },
    ignoreRows: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      isSorting: false,
      isEditing: false,

      surveyRowTypeCodes,

      surveyRowDialog: {
        model: false,
        row: new SurveyRowModel(null),
        tab: 'tab-question'
      },

      confirmDeleteSurveyRowDialog: {
        model: false,
        id: null
      },
    }
  },
  computed: {
    sortedSurveyRows() {
      return this.surveyDetails.surveys
          .slice()
          .sort((a, b) => {
            return a.rowOrder > b.rowOrder ? 1 : a.rowOrder < b.rowOrder ? -1 : 0
          })
          .filter((row) => !this.ignoreRows.includes(row.id))
    },
  },
  methods: {
    openSurveyRowDialog() {
      this.surveyRowDialog.model = true
      this.surveyRowDialog.row = new SurveyRowModel(null)
      this.surveyRowDialog.tab = 'tab-question'
    },
    toggleSort() {
      this.isSorting = !this.isSorting
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
    },
    undo() {
      this.surveyRowDialog.tab = 'tab-question'
      this.isEditing = false
      this.isSorting = false
    },
    onDragEnd(moved) {
      if (moved.oldIndex !== moved.newIndex) {
        this.surveyDetails.surveys = this.surveyDetails.surveys.map(
            (q, i) => {
              return {
                ...q,
                rowOrder: i
              }
            }
        )
      }
    },
    confirmDelete(id) {
      this.confirmDeleteSurveyRowDialog.id = id
      this.confirmDeleteSurveyRowDialog.model = true
    },
    editSurveyRow(surveyRowId) {
      this.surveyRowDialog.row = this.surveyDetails.surveys.find((s) => s.id === surveyRowId)
      this.surveyRowDialog.model = true
    },
    addOption(adminSurvey) {
      const answerOption = new AnswerModel({
        answerOrder: this.surveyRowDialog.row.answersList.length,
        surveyRowTypeCode: this.surveyRowDialog.row.rowTypeCode,
        answerAdminSurvey: adminSurvey
      })
      this.surveyRowDialog.row.answersList.push(answerOption)
    },
    removeOption(idx) {
      this.surveyRowDialog.row.answersList = this.surveyRowDialog.row.answersList.filter(
          (o, key) => key !== idx
      )
    },
    addEditSurveyRow() {
      if (!this.surveyRowDialog.row.id) {
        this.surveyDetails.surveys.push(
            new SurveyRowModel({
              ...this.surveyRowDialog.row,
              id: `new_${uuid.v4()}`,
              rowOrder: this.surveyDetails.surveys.length
            })
        )
      }
      this.closeSurveyRowDialog()
    },
    addEditSurveyAnswers() {
      if (
          this.surveyRowDialog.tab !== 'tab-answers' &&
          this.surveyRowDialog.row.rowTypeCode !== 11
      ) {
        this.surveyRowDialog.tab = 'tab-answers'
      } else {
        this.addEditSurveyRow()
      }
    },
    deleteSurveyRow() {
      const id = this.confirmDeleteSurveyRowDialog.id
      if (id.startsWith('new_')) {
        const index = this.surveyDetails.surveys.findIndex(
            (survey) => survey.id === id
        )
        this.surveyDetails.surveys.splice(index, 1)
      } else {
        this.$emit('click:delete-survey', id)
      }

      this.confirmDeleteSurveyRowDialog.model = false
    },
    closeSurveyRowDialog() {
      this.surveyRowDialog.model = false
    },
  },
}
</script>

<style scoped>

</style>
