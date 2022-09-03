import { getQuery } from 'h3'

const config = useRuntimeConfig();

let url: string = `https://${config.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`

export default async (req, res) => {
  if (req.method != 'GET') {
    console.log(req.method)
    res.statusCode = 500
    res.end()
  }


  const post_id: string = !!getQuery(req).id ? "/" + getQuery(req).id : "";
  const post_offset = !!getQuery(req).offset ? getQuery(req).offset : "";
  const post_limit = !!getQuery(req).limit ? getQuery(req).limit : "10";
  const post_order = !!getQuery(req).order ? getQuery(req).order : "";
  const post_fields = !!getQuery(req).fields ? getQuery(req).fields : "";
  const filter = getQuery(req).filter ? `${getQuery(req).filterKeyName}[contains]${getQuery(req).filter}` : "";
  const query = !!getQuery(req).query ? getQuery(req).query : "";

  const parameters: string = `${post_id}?fields=${post_fields}&filters=${filter}&limit=${post_limit}&offset=${post_offset}&orders=${post_order}&q=${query}`;
  const ENDPOINT: string = url + encodeURI(parameters);

  let data: unknown;

  await $fetch(`${ENDPOINT}`, {
    method: "GET",
    headers: {
      "X-MICROCMS-API-KEY": config.MICRO_CMS_API_KEY,
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
      'Accept-Charset': 'utf-8',
      'Content-Encoding': 'gzip',
    }
  }
  ).then((response) => {
    data = response
  })

  const json = JSON.stringify(data)

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(json)
}