import { API_BASE_URL } from "./config";

export const login = async (data) => {
  const url = `${API_BASE_URL}/api/usuario/login`;

  console.log("Intentenado hacer login en: ", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return responseData;
};
