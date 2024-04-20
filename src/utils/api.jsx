const apiUri = import.meta.env.VITE_API_URI;

export const apiGet = (endpoint, searchParams) =>
  fetch(`${apiUri}/${endpoint}?` + new URLSearchParams(searchParams))
    .then(data => data.json());

export const apiPost = (endpoint, body) =>
  fetch(`${apiUri}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json());
