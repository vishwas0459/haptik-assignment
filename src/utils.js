import { APP_KEY } from "./constants";

export const setLocalStorageData = (data = []) => {
  localStorage.setItem(APP_KEY, JSON.stringify(data));
};

export const getLocalStorageData = () => {
  const data = localStorage.getItem(APP_KEY);
  return JSON.parse(data);
};

export const paginateData = (data, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const items = data.slice(startIndex).slice(0, pageSize);
  return items;
};
