export default (value: string, onSuccess?: () => any, onError?: () => any) => {
  if (value.length <= 140) {
    onSuccess && onSuccess();
    return Promise.resolve();
  } else {
    onError && onError();
    return Promise.reject("Description must be max 140 characters long");
  }
};
