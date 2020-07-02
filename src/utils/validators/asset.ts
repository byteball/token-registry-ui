export default (value: string, onSuccess?: () => any, onError?: () => any) => {
  if (value.trim().length === 44) {
    onSuccess && onSuccess();
    return Promise.resolve();
  } else if (value.trim().length === 0) {
    onError && onError();
    return Promise.reject("This field is required");
  } else {
    onError && onError();
    return Promise.reject("Asset is not valid!");
  }
};
