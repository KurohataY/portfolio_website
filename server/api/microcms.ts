import type { IncomingMessage, ServerResponse } from "http";
import axios from 'axios'
import config from '#config'
import { useBody, useCookies, useQuery } from 'h3'

let url = `https://${config.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`
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


  const post_id = !!useQuery(req).id ? "/" + useQuery(req).id : "";
  const post_offset = !!useQuery(req).offset ? useQuery(req).offset : "";
  const post_limit = !!useQuery(req).limit ? useQuery(req).limit : "10";
  const post_order = !!useQuery(req).order ? useQuery(req).order : "";
  const post_fields = !!useQuery(req).fields ? useQuery(req).fields : "";
  const post_filters = useQuery(req).filters ? useQuery(req).filters : "";

  const parameters = `${post_id}?fields=${post_fields}&filters=${post_filters}&limit=${post_limit}&offset=${post_offset}&orders=${post_order}`;
  const ENDPOINT = url + parameters;


  let data: Array<any>
  await axios.get(
    `${ENDPOINT}`,
    API_HEAD
  ).then(res => {
    if (!!post_id) {
      data = res.data;
    } else {
      data = res.data;
    }

  });
  const json = JSON.stringify(data)

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(json)
}