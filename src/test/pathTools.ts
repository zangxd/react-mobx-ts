/* eslint-disable @typescript-eslint/no-explicit-any */
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url: any) {
  const urllist = url.split('/').filter((i: any) => i);
  return urllist.map((urlItem: any, index: any) => `/${urllist.slice(0, index + 1).join('/')}`);
}
