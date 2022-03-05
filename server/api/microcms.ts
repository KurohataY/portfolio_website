import type { IncomingMessage, ServerResponse } from "http";
import axios from 'axios'
import config from '#config'

const ENDPOINT = `https://${config.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`
const API_HEAD = {
  headers: {
    "X-MICROCMS-API-KEY": config.MICRO_CMS_API_KEY,
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
    data = res.data.contents;
  });

  const json = JSON.stringify(data)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(json)
}