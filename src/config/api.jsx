import axios from "axios";
import { API_PATH } from "./constants";

export const fetchUsers = () => {
  return axios({
    url: `${API_PATH}`,
    method: "get",
    responseType: "json",
  });
};

export const updateUser = (id, data) => {
  return axios({
    url: `${API_PATH}/${id}`,
    method: "put",
    responseType: "json",
    data: data,
  });
};
