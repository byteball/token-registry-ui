export const encodeData = (data: object): string => {
  const sData = JSON.stringify(data);
  return btoa(unescape(encodeURIComponent(sData)));
};
