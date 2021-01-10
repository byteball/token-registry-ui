export default (
  value: string,
  onSuccess?: () => any,
  onError?: () => any,
  maxValue?: number,
  minValue?: number
) => {
  let error = null;
  const reg = /^[0-9.]+$/g;
  const minSupport = minValue !== undefined ? minValue : 0.1;
  if (reg.test(value)) {
    if (Number(value) >= minSupport) {
      if (maxValue && Number(value) > maxValue) {
        error = `Max amount is ${maxValue} GBYTE`;
      } else {
        onSuccess && onSuccess();
        return Promise.resolve();
      }
    } else {
      error = `Min amount is ${minSupport} GBYTE`;
    }
  } else {
    error = "This field is not valid!";
  }
  onError && onError();
  return Promise.reject(error);
};
