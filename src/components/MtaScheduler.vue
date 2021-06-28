<template>
  <v-app>
    <v-toolbar
      id="toolbar"
      dense
      flat
      class="grey lighten-4"
      :class="{
        'mr-4':
          (categories.length > 5 && type === 'category') || type === 'week',
      }"
    >
      <v-btn rounded icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h3 class="text--secondary text-center" style="min-width: 210px">
        {{ moment(value).format("dddd DD MMMM YYYY") }}
      </h3>
      <v-btn rounded icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn-toggle
        v-model="typeValue"
        rounded
        dense
        color="secondary darken-2"
        class="ml-5"
      >
        <v-btn value="category"> Giorno </v-btn>

        <v-btn value="week"> Settimana </v-btn>

        <v-btn value="month"> Mese </v-btn>
      </v-btn-toggle>
      <v-switch
        v-if="type != 'month'"
        v-model="showFullDay"
        inset
        class="ml-5 mt-5"
        color="primary"
        label="Mostra intera giornata"
        @change="setCalendarViewInterval"
      >
      </v-switch>
      <v-btn
        v-if="type == 'category' && !proposalData && extraBtnData.visible"
        elevation="0"
        rounded
        class="ml-5"
        color="orange"
        dark
        @click="extraBtnData.fn"
      >
        {{extraBtnData.text}}
      </v-btn>
    </v-toolbar>
    <v-calendar
      ref="calendar"
      v-model="value"
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
    >
      <template #event="{ event }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <div class="pl-1" style="text-shadow: 1px 1px 2px rgb(0 0 0);">
                <strong>{{ event.title }}</strong>
                <br />
                <span>
                  {{ moment(event.start).format("HH:mm") }} -
                  {{ moment(event.end).format("HH:mm") }}
                </span>
                <br />
                <small v-if="event.subtitle" class="font-weight-bold mr-2">
                  {{ event.subtitle }}
                </small>
              </div>
              <div
                v-if="event.isChecked"
                style="position: absolute; top: 3px; right: 3px"
              >
                <v-icon color="white">mdi-account-check</v-icon>
              </div>
            </div>
          </template>
          <span>
            <div>
              <strong>{{ event.title }}</strong>
              <br />
              <span>
                {{ moment(event.start).format("HH:mm") }} -
                {{ moment(event.end).format("HH:mm") }}
              </span>
              <br />
              <small v-if="event.subtitle" class="font-weight-bold mr-2">
                {{ event.subtitle }}
              </small>
            </div>
            <div
              v-if="event.isChecked"
              style="position: absolute; top: 3px; right: 3px"
            >
              <v-icon color="white">mdi-account-check</v-icon>
            </div>
          </span>
        </v-tooltip>
      </template>
    </v-calendar>
  </v-app>
</template>
<script>
import moment from "moment";
export default {
  props: {
    proposal: {
      type: Object,
      default: () => null,
    },
    events: {
      type: Array,
      default: () => [],
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
            text: '',
            fn: ''
          }
      },
    },
  },
  data: () => ({
    moment,
    value: moment().format("YYYY-MM-DD"),
    categories: [],
    eventsData: [],
    proposalData: {},
    localeValue: "it",
    typeValue: "category",
    modeValue: "stack",
    firstTimeValue: "05:00",
    intervalCountValue: 60,
    extraBtnData: {},
    showFullDay: false,
    // colors: [
    //   "blue",
    //   "indigo",
    //   "deep-purple",
    //   "cyan",
    //   "green",
    //   "orange",
    //   "grey darken-1",
    // ],
    // names: [
    //   "Meeting",
    //   "Holiday",
    //   "PTO",
    //   "Travel",
    //   "Event",
    //   "Birthday",
    //   "Conference",
    //   "Party",
    // ],
  }),
  mounted() {
    moment.locale(this.locale);
  },
  methods: {
    setCalendarViewInterval() {
      if (this.showFullDay) {
        this.firstTimeValue = "00:00";
        this.intervalCountValue = 96;
      } else {
        this.firstTimeValueime = "05:00";
        this.intervalCountValue = 60;
      }
    },
    getEventColor(event) {
      return event.color;
    },
    getEvents({ start, end }) {
      this.$emit("CALENDAR_CHANGED", { start, end });
      //   const events = [];

      //   const min = new Date(`${start.date}T00:00:00`);
      //   const max = new Date(`${end.date}T23:59:59`);
      //   const days = (max.getTime() - min.getTime()) / 86400000;
      //   const eventCount = this.rnd(days, days + 150);

      //   for (let i = 0; i < eventCount; i++) {
      //     const allDay = this.rnd(0, 3) === 0;
      //     const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //     const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //     const second = new Date(first.getTime() + secondTimestamp);

      //     events.push({
      //         id: this.rnd(0, 999),
      //         title: this.names[this.rnd(0, this.names.length - 1)],
      //         subtitle: this.names[this.rnd(0, this.names.length - 1)],
      //         category: this.categories[this.rnd(0, this.categories.length - 1)],
      //         start: first,
      //         end: second,
      //         color: this.colors[this.rnd(0, this.colors.length - 1)],
      //         isChecked: true,
      //         timed: allDay,
      //         extra: ''
      //     });
      //   }
      //   this.events = events;
    },
    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a;
    // },
  },
  watch: {
    events: {
        handler(newVal) {
            this.eventsData = newVal;    
            const list = newVal.map((e) => e.category);
            this.categories = list.filter((v, i) => list.indexOf(v) == i);
        },
    },
    proposal: {
        handler(newVal) {
            this.porposalData = newVal;   
        }
    },
    locale: {
        handler(newVal) {
            this.localeValue = newVal;   
        }
    },
    type: {
        handler(newVal) {
            this.typeValue = newVal;   
        }
    },
    mode: {
        handler(newVal) {
            this.modeValue = newVal;   
        }
    },
    firstTime: {
        handler(newVal) {
            this.firstTimeValue = newVal;   
        }
    },
    intervalCount: {
        handler(newVal) {
            this.intervalCountValue = newVal;   
        }
    },
    extraBtn: {
        handler(newVal) {
            this.extraBtnData = newVal;   
        }
    },
  },
};
</script>
