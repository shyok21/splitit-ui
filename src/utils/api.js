import axios from "axios";
import { getToken } from "./firebase";
import { DataArraySharp } from "@mui/icons-material";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const getAxiosConfig = async () => {
  const token = await getToken();
  console.log(token)

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
  } catch(e) {
    return null;
  }
}

export const getAllUsers = async () => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.get('users', config);
    return data;
  } catch(e) {
    return null;
  }
}

export const addMemberToGroup = async (reqBody, groupId) => {
  try {
    const config = await getAxiosConfig();
    const { data } = await api.post(
      `/expense_groups/${groupId}/add_user/`,
      reqBody,
      config
    );

    return data;
  } catch(e) {
    return null;
  }
}

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