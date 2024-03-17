const apiUri = import.meta.env.VITE_API_URI;

export const apiGet = (endpoint) => 
  fetch(`${apiUri}/${endpoint}`)
    .then(data => data.json());

