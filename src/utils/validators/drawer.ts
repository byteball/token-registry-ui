export default (value: string, onSuccess?: () => any, onError?: () => any) => {
  onSuccess && onSuccess();
  return Promise.resolve();
};
