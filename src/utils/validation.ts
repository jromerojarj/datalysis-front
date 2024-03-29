export const isValidDateTimeFormat = (dateTimeString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}$/;
  return regex.test(dateTimeString);
};
