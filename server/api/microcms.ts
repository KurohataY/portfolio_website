import axios from 'axios'
import { useQuery } from 'h3'

const config = useRuntimeConfig();

let url: string = `https://${config.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`
const API_HEAD = {
  headers: {
    "X-MICROCMS-API-KEY": config.MICRO_CMS_API_KEY,
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
    'Accept-Charset': 'utf-8',
    'Content-Encoding':'gzip',
  }

}

export default async (req, res) => {
  if (req.method != 'GET') {
    console.log(req.method)
    res.statusCode = 500
    res.end()
  }


  const post_id: string = !!useQuery(req).id ? "/" + useQuery(req).id : "";
  const post_offset = !!useQuery(req).offset ? useQuery(req).offset : "";
  const post_limit = !!useQuery(req).limit ? useQuery(req).limit : "10";
  const post_order = !!useQuery(req).order ? useQuery(req).order : "";
  const post_fields = !!useQuery(req).fields ? useQuery(req).fields : "";
  const filter = useQuery(req).filter ? `${useQuery(req).filterKeyName}[contains]${useQuery(req).filter}` : "";
  const query = !!useQuery(req).query ? useQuery(req).query : "";

  const parameters: string = `${post_id}?fields=${post_fields}&filters=${filter}&limit=${post_limit}&offset=${post_offset}&orders=${post_order}&q=${query}`;
  const ENDPOINT: string = url + encodeURI(parameters);

  let data: Array<any>
  await axios.get(
    `${ENDPOINT}`,
    API_HEAD
  ).then(res => {
    data = res.data;
  });
  const json = JSON.stringify(data)

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(json)
}