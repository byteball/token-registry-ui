export default (value: string, onSuccess?: () => any, onError?: () => any) => {
  let error = null;
  const reg = /^[0-9]+$/g;
  if (reg.test(value)) {
    if (Number(value) >= 0 && Number(value) <= 15) {
      onSuccess && onSuccess();
      return Promise.resolve();
    } else {
      error = "Decimals must be between 0 and 15";
    }
  } else {
    if (value.length > 0) {
      error = "Decimals field is not valid!";
    } else {
      error = "Decimals field is required!";
    }
  }
  onError && onError();
  return Promise.reject(error);
};
