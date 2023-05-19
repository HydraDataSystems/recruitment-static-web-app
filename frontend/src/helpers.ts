export const isDateBefore = (date: Date | string, dateToCompare: Date | string): boolean => {
  if (typeof date === 'string') {
    date = new Date(date);
  };
  if (typeof dateToCompare === 'string') {
    dateToCompare = new Date(dateToCompare);
  };
  return date.getTime() < dateToCompare.getTime();
}

export const isDateAfter = (date: Date | string, dateToCompare: Date | string): boolean => {
  if (typeof date === 'string') {
    date = new Date(date);
  };
  if (typeof dateToCompare === 'string') {
    dateToCompare = new Date(dateToCompare);
  };
  return date.getTime() > dateToCompare.getTime();
}

