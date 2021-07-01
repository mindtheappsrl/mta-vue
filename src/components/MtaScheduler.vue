<template>
  <div style="position:relative">
    <v-toolbar
      id="toolbar"
      dense
      flat
      class="grey lighten-4"
    >
      <v-btn rounded icon @click="prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h3 class="text--secondary text-center" style="min-width: 210px">
        {{ moment(currentDate).format("dddd DD MMMM YYYY") }}
      </h3>
      <v-btn rounded icon @click="next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn-toggle
        mandatory
        v-model="typeValue"
        rounded
        dense
        color="secondary darken-2"
        class="ml-5"
      >
        <v-btn :value="hasCategoryView ? 'category' : 'day'"> Giorno </v-btn>

        <v-btn value="week"> Settimana </v-btn>

        <v-btn value="month"> Mese </v-btn>
      </v-btn-toggle>
      <v-switch
        v-if="typeValue != 'month'"
        v-model="showFullDay"
        inset
        class="ml-5 mt-5"
        color="primary"
        label="Mostra intera giornata"
        @change="setCalendarViewInterval"
      >
      </v-switch>
      <v-btn
        v-if="typeValue == 'category' && !proposalData && extraBtnData.visible"
        elevation="0"
        rounded
        class="ml-5"
        color="orange"
        dark
        @click="extraBtnData.fn"
      >
        {{ extraBtnData.text }}
      </v-btn>
    </v-toolbar>
    <div style="width: 100%; overflow:auto">
      <div ref="schedulerContainer">
        <v-calendar
          v-on="$listeners"
          ref="calendar"
          v-model="currentDate"
          :locale="localeValue"
          :type="typeValue"
          :events="eventsData"
          :event-overlap-mode="modeValue"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          :first-time="firstTimeValue"
          :interval-count="intervalCountValue"
          :interval-minutes="15"
          :interval-format="(locale, getOptions) => locale.time"
          :mobile-breakpoint="0"
          :event-more="false"
          :categories="categories"
          :weekdays="[1, 2, 3, 4, 5, 6, 0]"
          @change="getEvents"
          @click:event="showDetails"
          @click:date="goToDate"
          @click:interval="emitDateTime"
        >
          <template #event="{ event }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <div
                    class="pl-1"
                    style="text-shadow: 1px 1px 2px rgb(0 0 0);"
                  >
                    <strong>{{ event.title }}</strong>
                    <br />
                    <span>
                      {{ getTimeRange(event) }}
                    </span>
                    <br />
                    <small v-if="event.subtitle" class="font-weight-bold mr-2">
                      {{ event.subtitle }}
                    </small>
                  </div>
                  <div
                    v-if="event.isChecked"
                    style="position: absolute; top: -1px; right: 3px"
                  >
                    <v-icon color="white">mdi-check</v-icon>
                  </div>
                </div>
              </template>
              <span>
                <div>
                  <strong>
                    {{ event.title }}
                    <span
                      v-if="event.isChecked"
                      class="ml-3"
                    >
                      <v-icon color="white">mdi-check</v-icon>
                    </span>
                  </strong>
                  <br />
                  <span>
                    {{ getTimeRange(event) }}
                  </span>
                  <br />
                  <small v-if="event.subtitle" class="font-weight-bold mr-2">
                    {{ event.subtitle }}
                  </small>
                </div>                
              </span>
            </v-tooltip>
          </template>
        </v-calendar>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import EventModel from "../models/event.model";
export default {
  inheritAttrs: false,
  props: {    
    value: {
      type: String,
      default: () => moment().format("YYYY-MM-DD"),
    },
    events: {
      type: Array,
      default: () => [],
    },
    hasCategoryView: {
      type: Boolean,
      default: () => true,
    },
    proposal: {
      type: Object,
      default: () => null,
    },
    headOnly: {
      type: Boolean,
      default: () => false,
    },
    locale: {
      type: String,
      default: () => "it",
    },
    type: {
      type: String,
      default: () => "category",
    },
    mode: {
      type: String,
      default: () => "stack",
    },
    firstTime: {
      type: String,
      default: () => "05:00",
    },
    intervalCount: {
      type: Number,
      default: () => 60,
    },
    extraBtn: {
      type: Object,
      default: () => {
        return {
          visible: false,
          text: "",
          fn: "",
        };
      },
    },
  },
  data: () => ({
    moment,
    currentDate: moment().format("YYYY-MM-DD"),
    categories: [],
    eventsData: [],
    proposalData: null,
    localeValue: "it",
    typeValue: "category",
    modeValue: "stack",
    firstTimeValue: "05:00",
    intervalCountValue: 60,
    extraBtnData: {},
    showFullDay: false,
  }),
  mounted() {
    moment.locale(this.locale);
    this.hasCategoryView
      ? (this.typeValue = "category")
      : (this.typeValue = "day");
  },
  updated() {
    if (this.$refs && this.$refs.calendar) {
      if (this.typeValue == "month") {
        this.$refs.calendar.$el.style.maxHeight = "auto";
      } else {
        this.$refs.calendar.$el.style.maxHeight = "700px";
      }

      if(this.headOnly) {
        this.$refs.calendar.$el.style.maxHeight = "auto";
        this.$refs.calendar.$el.children[0].style.minHeight = "500px";
        this.$refs.calendar.$el.children[1].style.display = "none";
      }
    }
  },
  methods: {
    setCalWidth() {
      if (
        (this.categories.length > 5 && this.typeValue === "category") ||
        this.typeValue === "week"
      ) {
        this.$refs.schedulerContainer.style.width = "2500px";
      } else {
        this.$refs.schedulerContainer.style.width = "";
      }
    },
    setCalendarViewInterval() {
      if (this.$refs && this.$refs.calendar) {
        if (this.showFullDay) {
          this.firstTimeValue = "00:00";
          this.intervalCountValue = 96;
        } else {
          this.firstTimeValue = "05:00";
          this.intervalCountValue = 60;
        }
      }
    },
    showDetails({ nativeEvent, event }) {
      if (this.$refs && this.$refs.calendar) {
        this.$emit("eventDetails", event);
      }
      if (nativeEvent) nativeEvent.stopPropagation();
    },
    goToDate(date) {
      if (this.typeValue !== "category" && this.typeValue !== "day") {
        this.hasCategoryView
          ? (this.typeValue = "category")
          : (this.typeValue = "day");
        this.currentDate = date.date;
      }
    },
    emitDateTime(date) {
      console.log(date);
      return date;
    },
    getTimeRange(event) {
      const start = moment(event.start);
      const end = moment(event.end);

      if (
        start.isValid() &&
        end.isValid() &&
        start.format("HH:mm") != "00:00" &&
        end.format("HH:mm") != "00:00"
      ) {
        return start.format("HH:mm") + " - " + end.format("HH:mm");
      } else {
        return "Tutto il giorno";
      }
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getEventColor(event) {
      return event.color;
    },
    getEvents({ start, end }) {
      if (this.$refs && this.$refs.calendar) {
        this.$emit("rangeChanged", {
          start,
          end,
          date: this.currentDate,
          showFullDay: this.showFullDay,
        });
        this.setCalWidth();
      }
    },
  },
  watch: {
    value: {
      handler(newVal) {
        this.currentDate = newVal;
      },
    },
    events: {
      handler(newVal) {
        if (newVal && newVal.length) {
          this.eventsData = newVal.map((e) => new EventModel(e));
          this.eventsData.forEach((e) => {
            if (!e.timed) {
              e.start = moment(e.start).format("YYYY-MM-DD");
              e.end = null;
            }
          });
          const list = newVal.map((e) => e.category);
          this.categories = list.filter((v, i) => list.indexOf(v) == i);
        } else {
          this.eventsData = [];
          this.categories = [];
        }
        this.setCalWidth();
      },
    },
    proposal: {
      handler(newVal) {
        this.porposalData = newVal;
      },
    },
    locale: {
      handler(newVal) {
        this.localeValue = newVal;
      },
    },
    type: {
      handler(newVal) {
        this.typeValue = newVal;
      },
    },
    mode: {
      handler(newVal) {
        this.modeValue = newVal;
      },
    },
    firstTime: {
      handler(newVal) {
        this.firstTimeValue = newVal;
      },
    },
    intervalCount: {
      handler(newVal) {
        this.intervalCountValue = newVal;
      },
    },
    extraBtn: {
      handler(newVal) {
        this.extraBtnData = newVal;
      },
    },
  },
};
</script>
