export const stringToInt = (string: string): number | null => {
  const num: number = parseInt(string);
  return isNaN(num) ? null : num;
};
