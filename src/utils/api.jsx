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

const getToken = () => sessionStorage.getItem("token");

export const apiGet = async (endpoint, searchParams) => {
  let url = `${getApiUri()}/${endpoint}`;
  if (searchParams) {
    url += "?" + buildParams(searchParams);
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Authorization": `Bearer ${getToken()}` }
    });

    if (!response.ok) {
      let error;
      if (response.status >= 400 && response.status < 500) {
        error = new Error(`Client error: ${response.status} - ${response.statusText}`);
      } else {
        error = new Error(`Server error: ${response.status}`);
      }

      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("API GET request error:", error);
    throw error;
  }
};

export const apiPost = async (endpoint, body) => {
  try {
    const response = await fetch(`${getApiUri()}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      let error;
      if (response.status >= 400 && response.status < 500) {
        error = new Error(`Client error: ${response.status} - ${response.statusText}`);
      } else {
        error = new Error(`Server error: ${response.status}`);
      }

      error.status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("API POST request error:", error);
    throw error;
  }
};

