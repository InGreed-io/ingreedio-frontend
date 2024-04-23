import { getApiUri } from "./values";

export const apiGet = (endpoint, searchParams) =>
  fetch(`${getApiUri()}/${endpoint}?` + new URLSearchParams(searchParams))
    .then(data => data.json());

export const apiPost = (endpoint, body) =>
  fetch(`${getApiUri()}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json());
