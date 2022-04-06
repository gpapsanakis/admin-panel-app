import axios from "axios";
import { API_PATH } from "./constants";

export const fetchUsers = async () => {
  return axios({
    url: `${API_PATH}`,
    method: "get",
    responseType: "json",
  });
};

export const updateUser = async (id, data) => {
  return axios({
    url: `${API_PATH}/${id}`,
    method: "put",
    responseType: "json",
    data: data,
  });
};
