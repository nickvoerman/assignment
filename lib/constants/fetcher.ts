//fetcher function, fetch url with js fetch and convert it to json
export const fetcher = (url: string) => fetch(url).then(r => r.json());