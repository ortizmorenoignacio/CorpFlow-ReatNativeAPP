import axios from "axios";
import { API_BASE_URL } from "../config";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url) => {
  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error en el GET ${url}`, error);
    throw error;
  }
};

export const post = async (url, data) => {
  try {
    const response = await client.post(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error en el POST ${url}`, error);
    throw error;
  }
};
