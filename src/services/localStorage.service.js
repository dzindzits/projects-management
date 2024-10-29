export const saveToLocalStorage = (key, value) => {
  //   console.debug("Saving to localStorage", key, value);
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  //   console.debug("Getting from localStorage", key);
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
