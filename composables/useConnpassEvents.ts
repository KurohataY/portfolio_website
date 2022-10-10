export const useConnpassEvents = (connpassData) => {
    type eventsDataType = {
        name: string,
        start: string,
        end: string,
        color: string,
        url: string
    }

    const calendarFormatter = ((data, color) => {
        let events: Array<eventsDataType> = []

        data.forEach((event) => {
            events.push({
                name: event.title,
                start: event.started_at.toString().split("T")[0],
                end: event.ended_at.toString().split("T")[0],
                color: color,
                url: event.event_url
            })
        })

        return events;
    })

    return  calendarFormatter(connpassData, "orange");
}