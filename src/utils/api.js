import axios from "axios";
import { getToken } from "./firebase";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const getAxiosConfig = async () => {
  const token = await getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const signInUser = async (idToken) => {
  try {
    const { data } = await api.post("auth/", {
      idToken,
    });

    return data;
  } catch (e) {
    return null;
  }
};

export const getExpenseGroupsForUser = async () => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.get("expense_groups/", config);
    return data;
  } catch (e) {
    return [];
  }
};

export const addExpenseGroup = async ({ name, description }) => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.post(
      "expense_groups/",
      {
        name,
        description,
      },
      config
    );

    return data;
  } catch (e) {
    return null;
  }
};

export {
  getAxiosConfig
}