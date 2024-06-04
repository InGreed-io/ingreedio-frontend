import { getApiUri } from "./values";

export const hasAdminPanelAccess = (role) => ["Admin", "Moderator", "Producer"].includes(role);

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

export const mapToSelectObject = (array) => array.map(o => ({ value: o.id.toString(), label: o.name }));

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

    if (response.status === 204) {
      return null;  // No content to return
    }

    return await response.json();
  } catch (error) {
    console.error("API GET request error:", error, " ", endpoint);
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

export const apiPatch = async (endpoint, body) => {
  try {
    const response = await fetch(`${getApiUri()}/${endpoint}`, {
      method: "PATCH",
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
