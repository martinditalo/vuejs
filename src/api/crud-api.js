import axios from "axios";

export const getUser = () => {
  const api = axios.get("https://62468c8fe3450d61b0001464.mockapi.io/crud");
  return api;
};

export const addUser = (postData) => {
  const api = axios.post(
    "https://62468c8fe3450d61b0001464.mockapi.io/crud",
    postData
  );
  return api;
};

export const deleteUser = (id) => {
  const api = axios.delete(
    `https://62468c8fe3450d61b0001464.mockapi.io/crud/${id}`
  );
  return api;
};

export const editUser = (postData, id) => {
  const api = axios.put(
    `https://62468c8fe3450d61b0001464.mockapi.io/crud/${id}`,
    postData
  );
  return api;
};
