export default (value: string, onSuccess?: () => any, onError?: () => any) => {
  if (value.length <= 140 && value.length > 0) {
    onSuccess && onSuccess();
    return Promise.resolve();
  } else {
    onError && onError();
    if (value.length === 0) {
      return Promise.reject("Description field is required!");
    } else {
      return Promise.reject("Description must be max 140 characters long");
    }
  }
};
