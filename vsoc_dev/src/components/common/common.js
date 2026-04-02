const padZero = (num) => String(num).padStart(2, "0");

const formatDate = (date, includeTime = false) => {
  const yyyy = date.getFullYear();
  const MM = padZero(date.getMonth() + 1);
  const dd = padZero(date.getDate());
  let formattedDate = `${yyyy}-${MM}-${dd}`;

  if (includeTime) {
    const hh = padZero(date.getHours());
    const mm = padZero(date.getMinutes());
    const ss = padZero(date.getSeconds());
    formattedDate += ` ${hh}:${mm}:${ss}`;
  }

  return formattedDate;
};

export const getNow = () => formatDate(new Date(), true);

export const getDate = (dateString) => formatDate(new Date(dateString));

export const maskingNumber = (data) =>
  data?.replace(/(?<=.{3})(?=.{5})./gi, "*");

export const maskingName = (data) => {
  if (!data) return data;
  return data.length < 3
    ? data.replace(/(?<=.{1})./g, "*")
    : data.replace(/(?<=.{1})(?=.{2})./g, "*");
};

export const waitTime = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));
