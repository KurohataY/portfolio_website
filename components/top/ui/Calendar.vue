<template>
    <div class="content pa-4">
        <div class="calendar">
            <div class="calendar-weekly" v-for="(week, index) in calendars" :key="index">
                <div class="calendar-daily" :class="{ outside: !currentMonth.includes(day.month) }"
                    v-for="(day, index) in week" :key="index">
                    <span class="calendar-day">{{ day.day }}</span>
                    <div v-for="(dayEvent, dayEventIndex) in day.dayEvents" :key="dayEventIndex">
                        <a v-if="!!dayEvent.url" class="calendar-event"
                            :style="`width:${dayEvent.width}%;background-color:${dayEvent.color}`" :href="dayEvent.url"
                            style="display: block;overflow: hidden;" target="_blank">{{
                                dayEvent.name
                            }}</a>
                        <div v-else class="calendar-event"
                            :style="`width:${dayEvent.width}%;background-color:${dayEvent.color}`"
                            style="overflow: hidden;">{{ dayEvent.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

let calendars = ref([])
let currentDate = ref()
let currentMonth = ref('')

const { data: connpass } = await useFetch("/api/connpass");
const { data: holiday } = await useFetch("/api/holidays");

let events = ref([])



if (!!connpass.value && !!holiday.value) {
    events.value = connpass.value.concat(holiday.value);
} else if (!!connpass.value) {
    events.value = connpass.value
}

// Today
events.value.push({ name: "Today", start: currentDate.value, end: currentDate.value, color: "skyblue", url: "" })


onMounted(async () => {
    const { default: moment } = await import("moment")

    currentDate = moment()
    currentMonth.value = currentDate.format('YYYY-MM')

    let startDate = getStartDate(moment);
    const endDate = getEndDate(moment);
    const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

    for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
            let dayEvents = getDayEvents(startDate, moment, day)
            weekRow.push({
                day: startDate.get("date"),
                month: startDate.format("YYYY-MM"),
                dayEvents,
            });
            startDate.add(1, "days");
        }
        calendars.value.push(weekRow);
    }
})

const getStartDate = ((moment) => {
    let date = moment(currentDate);
    date.startOf("month");
    const youbiNum = date.day();
    return date.subtract(youbiNum, "days");
});

const getEndDate = ((moment) => {
    let date = moment(currentDate);
    date.endOf("month");
    const youbiNum = date.day();
    return date.add(6 - youbiNum, "days");
})

const getDayEvents = ((date, moment, day) => {
    let stackIndex = 0;
    let dayEvents = [];
    let startedEvents = [];
    events.value.forEach(event => {
        let startDate = moment(event.start).format('YYYY-MM-DD')
        let endDate = moment(event.end).format('YYYY-MM-DD')
        let Date = date.format('YYYY-MM-DD')

        if (startDate <= Date && endDate >= Date) {
            if (startDate === Date) {
                [stackIndex, dayEvents] = getStackEvents(event, day, stackIndex, dayEvents, startedEvents, event.start, moment);
            } else if (day === 0) {
                [stackIndex, dayEvents] = getStackEvents(event, day, stackIndex, dayEvents, startedEvents, Date, moment);
            } else {
                startedEvents.push(event)
            }
        }
    });
    return dayEvents;
});

const getEventWidth = ((end, start, day, moment) => {
    let betweenDays = moment(end).diff(moment(start), "days")
    if (betweenDays > 6 - day) {
        return (6 - day) * 100 + 95;
    } else {
        return betweenDays * 100 + 95;
    }
});


const getStackEvents = ((event, day, stackIndex, dayEvents, startedEvents, start, moment) => {
    [stackIndex, dayEvents] = getStartedEvents(stackIndex, startedEvents, dayEvents)
    let width = getEventWidth(start, event.end, day, moment);
    Object.assign(event, {
        stackIndex
    })
    dayEvents.push({ ...event, width })
    stackIndex++;
    return [stackIndex, dayEvents];
});
const getStartedEvents = ((stackIndex, startedEvents, dayEvents) => {
    let startedEvent;
    do {
        startedEvent = startedEvents.find(event => event.stackIndex === stackIndex)
        if (startedEvent) {
            dayEvents.push(startedEvent)
            stackIndex++;
        }
    } while (typeof startedEvent !== 'undefined')
    return [stackIndex, dayEvents]
});

</script>

<style lang="scss">
.content {
    width: 500px;
    background-color: #fff;
}

.button-area {
    margin: 0.5em 0;
}

.button {
    padding: 4px 8px;
    margin-right: 8px;
}

.calendar {
    border-top: 1px solid #e0e0e0;
    font-size: 0.8em;
}

.calendar-weekly {
    display: flex;
    border-left: 1px solid #e0e0e0;
}

.calendar-daily {
    flex: 1;
    min-height: 90px;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    margin-right: -1px;
    width: 70px;
}

.calendar-day {
    text-align: center;
}

.outside {
    .calendar-day {
        opacity: 0.2;
    }
}

.calendar-event {
    color: white;
    margin-bottom: 1px;
    height: 25px;
    line-height: 25px;
    position: relative;
    z-index: 1;
    border-radius: 4px;

    div {
        height: 25px;
    }
}
</style>