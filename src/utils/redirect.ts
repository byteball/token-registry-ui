export const redirect = (url: string) => {
  if (url) {
    // eslint-disable-next-line no-useless-escape
    if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
      // @ts-ignore
      window.open(url).close();
    } else {
      if (typeof window !== "undefined") {
        window.location.href = url;
      }
    }
  }
};
