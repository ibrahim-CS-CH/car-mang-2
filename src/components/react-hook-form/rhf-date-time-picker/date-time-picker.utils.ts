export const getHijriDate = (locale: string) => {
  return new Intl.DateTimeFormat(`${locale}-u-ca-islamic`, {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format;
};
