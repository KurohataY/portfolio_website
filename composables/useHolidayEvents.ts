export const useHolidayEvents = (holidayData) => {

    type holidatData = {
        name: string,
        start: string,
        end: string,
        color: string,
        url: string,
    }

    const zeroPadding = ((num: number, len: number) => {
        return (Array(len).join('0') + num).slice(-len);
    })

    const today: Date = new Date();
    const year: string = String(today.getFullYear());
    const month: string = zeroPadding(today.getMonth() + 1, 2);

    const calendarFormatter = ((data, color) => {
        let events: Array<holidatData> = []
        const yearMonthFormat: string = year + "-" + month;
        Object.keys(data).forEach((key) => {
            if (key.includes(yearMonthFormat)) {
                events.push({ name: data[key], start: key, end: key, color: color, url: "" })
            }
        })

        return events
    })

    return (calendarFormatter(holidayData, "orange"));
}



