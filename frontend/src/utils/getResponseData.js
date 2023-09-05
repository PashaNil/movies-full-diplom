export const getResponseData = (res) => res.ok ? res.json() : Promise.reject(res);
