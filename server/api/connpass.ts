import type { IncomingMessage, ServerResponse } from "http";
import axios from 'axios'
import config from '#config'

const zeroPadding = ((num, len) => {
  return (Array(len).join('0') + num).slice(-len);
})

const calendarFormatter = ((data, color) => {
  let events = []
  data.events.forEach((event) => {
    events.push({ name: event.title, start: event.started_at.toString().split("T")[0], end: event.ended_at.toString().split("T")[0], color: color, url: event.event_url })
  })

  return events;
})


const today = new Date();
const year = today.getFullYear();
const month = zeroPadding(today.getMonth() + 1, 2);

const ENDPOINT = `https://connpass.com/api/v1/event/?nickname=${config.CONNPASS_NICKNAME}&ym=` + year + month
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

  const json = JSON.stringify(calendarFormatter(data, "orange"))
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(json)
}