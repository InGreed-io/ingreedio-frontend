import { getApiUri } from "./values";

function buildParams(data) {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null)
      return;

    if (Array.isArray(value)) {
      value.forEach(value => params.append(key, value.toString()));
    } else {
      params.append(key, value.toString());
    }
  });

  return params.toString();
}

export const apiGet = async (endpoint, searchParams) => {
  let url = `${getApiUri()}/${endpoint}`;
  if (searchParams) {
    url += "?" + buildParams(searchParams);
  }
  return fetch(url).then(data => data.json());
};

export const apiPost = (endpoint, body) =>
  fetch(`${getApiUri()}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json());
