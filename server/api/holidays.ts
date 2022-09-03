import type { IncomingMessage, ServerResponse } from "http";

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


const ENDPOINT: string = "https://holidays-jp.github.io/api/v1/" + year + "/date.json"

export default async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method != 'GET') {
        console.log(req.method)
        res.statusCode = 500
        res.end()
    }

    let data: unknown
    await $fetch(`${ENDPOINT}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
    ).then((response) => {
        data = response
    })

    const json = JSON.stringify(calendarFormatter(data, "red"))
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(json)
}