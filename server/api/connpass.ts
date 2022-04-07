import type { IncomingMessage, ServerResponse } from "http";
import axios from 'axios'

type eventsDataType = {
  name: string,
  start: string,
  end: string,
  color: string,
  url: string
}

const zeroPadding = ((num: number, len: number) => {
  return (Array(len).join('0') + num).slice(-len);
})

const calendarFormatter = ((data, color) => {
  let events: Array<eventsDataType> = []
  data.events.forEach((event) => {
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


const today: Date = new Date();
const year: string = String(today.getFullYear());
const month: string = zeroPadding(today.getMonth() + 1, 2);
const config = useRuntimeConfig();
const nickname: string = config.CONNPASS_NICKNAME;

const ENDPOINT = `https://connpass.com/api/v1/event/?nickname=${nickname}&ym=` + year + month;
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