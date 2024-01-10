import axios from "axios";
import { getToken } from "./firebase";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

export const getGroupById = async (id) => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.get(`expense_groups/${id}`, config);
    return data;
  } catch (e) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.get("users", config);
    return data;
  } catch (e) {
    return null;
  }
};

export const addMemberToGroup = async (reqBody, groupId) => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.post(
      `/expense_groups/${groupId}/add_user/`,
      reqBody,
      config
    );

    return data;
  } catch (e) {
    return null;
  }
};

export const addExpenseGroup = async ({ name, description, type }) => {
  if (!type || type.length === 0) {
    type = "other";
  }
  try {
    const config = await getAxiosConfig();
    const { data } = await api.post(
      "expense_groups/",
      {
        name,
        description,
        type,
      },
      config
    );

    return data;
  } catch (e) {
    return null;
  }
};

export const addExpenses = async (reqBody) => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.post("expenses/", reqBody, config);

    return data;
  } catch (e) {
    return null;
  }
};

export const getExpensesByGroupId = async (id) => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.get(`expense_groups/${id}/expenses/`, config);

    return data;
  } catch (e) {
    return null;
  }
};

export const getBalancesByGroupId = async (id) => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.get(`expense_groups/${id}/balances/`, config);

    return data;
  } catch (e) {
    return null;
  }
};

export { getAxiosConfig };
