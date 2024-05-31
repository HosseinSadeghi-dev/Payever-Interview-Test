export const setTime = (date: Date, time: string): Date => {
  const newDate = new Date(date.getTime()); // Create a new Date object to avoid mutating the original
  const [hours, minutes] = time.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid time format");
  }

  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
}

export const addHoursToDate = (date: Date, hours: number): Date => {
  const newDate = new Date(date.getTime()); // Create a new Date object to avoid mutating the original
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

export const addMinutesToDate = (date: Date, minutesToAdd: number): Date => {
  const newDate = new Date(date.getTime() + minutesToAdd * 60000);
  const currentDate = new Date(date);

  if (newDate.getMonth() !== currentDate.getMonth()) {
    if ((newDate.getMonth() === 0 && currentDate.getMonth() === 11) || newDate.getMonth() > currentDate.getMonth()) {
      throw('New Time Will be Out of Range')
    }
    if ((newDate.getMonth() === 11 && currentDate.getMonth() === 0) || newDate.getMonth() < currentDate.getMonth()) {
      throw('New Time Will be Out of Range')
    }
  }

  if (newDate.getDate() !== currentDate.getDate()) {
    if (newDate.getDate() < currentDate.getDate()) {
      throw('New Time Will be Out of Range')
    }
    if (newDate.getDate() > currentDate.getDate()) {
      throw('New Time Will be Out of Range')
    }
  }

  return newDate;
}

export const addDaysToDate = (date: Date, toChange: number): Date => {
  const newDate: Date = new Date(date);
  newDate.setDate(newDate.getDate() + toChange);
  return newDate;
}

export const differenceInMinutes = (date1: Date, date2: Date): number => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffInMs / (1000 * 60));
}

export const getHourAndMinutes = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
}

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}
