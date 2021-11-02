export const clear = (obj: object) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === obj['page'] || obj['limit']) delete obj[key];
  });
  return obj;
};
