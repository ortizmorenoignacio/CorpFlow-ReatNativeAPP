import { API_BASE_URL } from "./config";

export const login = async (data) => {
  const url = `${API_BASE_URL}/api/usuario/login`;

  console.log("Intentando hacer login en: ", url);
  try {
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
  } catch (error) {
    console.log("Error de red:", error.message);
    throw error;
  }
};
