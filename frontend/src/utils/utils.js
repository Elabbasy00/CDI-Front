export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const baseUrl = () => {
  if (window.location.origin === 'http://localhost:3000') {
    return 'http://127.0.0.1:8000/';
  } else {
    return `${window.location.origin}/`;
  }
};
