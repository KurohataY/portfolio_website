import type { IncomingMessage, ServerResponse } from "http";
import axios from 'axios'

const zeroPadding = ((num, len) => {
    return (Array(len).join('0') + num).slice(-len);
  })

const today = new Date();
const year = today.getFullYear();
const month = zeroPadding(today.getMonth() + 1, 2);

const calendarFormatter = ((data, color) => {
    let events = []
    const yearMonthFormat = year + "-" + month;
    Object.keys(data).forEach((key) => {
        if (key.includes(yearMonthFormat)) {
            events.push({ name: data[key], start: key, end: key, color: color, url: "" })
        }
    })

    return events
})


const ENDPOINT = "https://holidays-jp.github.io/api/v1/" + year + "/date.json"
const API_HEAD = {
    headers: {
        'accept': "application/json"
    }
}

export default async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method != 'GET') {
        console.log(req.method)
        res.statusCode = 500
        res.end()
    }

    let data: Array<any>
    await axios.get(
        `${ENDPOINT}`,
        API_HEAD
    ).then(res => {
        data = res.data;
    });

    const json = JSON.stringify(calendarFormatter(data, "red"))
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(json)
}