const MAX_MINUTES = 30 * 24 * 60; //minutes during the month

const inRange: (from: number, to: number, totalMinutes: number) => boolean = (
  from,
  to,
  totalMinutes
) => {
  const normalizedMinutes = normalizeTotalMinutes(totalMinutes);

  if (from < to) return normalizedMinutes >= from && normalizedMinutes <= to;
  if (from > to) return normalizedMinutes >= from || normalizedMinutes <= to;
  return true;
};

const normalizeHours = (hours: number) => {
  if (hours < 0) return 0;
  return hours;
};

const normalizeMinutes = (minutes: number) => {
  if (minutes < 0) return 0;
  if (minutes > 59) return 59;
  return minutes;
};

const normalizeTotalMinutes = (totalMinutes: number) =>
  totalMinutes < 0
    ? MAX_MINUTES + (totalMinutes % MAX_MINUTES)
    : totalMinutes % MAX_MINUTES;

export const formatNumber = (number: string) => {
  const parsedNumber = Math.abs(parseInt(number) || 0);

  return parsedNumber > 9 ? String(parsedNumber) : `0${String(parsedNumber)}`;
};

export const formatTime = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => `${formatNumber(`${hours}`)}:${formatNumber(`${minutes}`)}`;

export const parseTime: (time: string) => {
  hours: number;
  minutes: number;
} = (time) => {
  const [hours, minutes] = time.split(':');

  return {
    hours: normalizeHours(parseInt(hours) || 0),
    minutes: normalizeMinutes(parseInt(minutes) || 0),
  };
};

const minutesToHoursAndMinutes = (minutes: number) => {
  const normalizedMinutes = normalizeTotalMinutes(minutes);
  const hours = Math.floor(normalizedMinutes / 60);

  return {
    hours,
    minutes: normalizedMinutes - hours * 60,
  };
};

export const hoursAndMinutesToMinutes: (
  hours: number,
  minutes: number
) => number = (hours, minutes) => 60 * hours + minutes;

const totalMinutesFromRange: (
  from: number,
  to: number
) => { fromMinutes: number; rangeInMinutes: number; toMinutes: number } = (
  from,
  to
) => {
  const fromTime = parseTime(`${from}`);
  const fromMinutes = hoursAndMinutesToMinutes(
    fromTime.hours,
    fromTime.minutes
  );
  const toTime = parseTime(`${to}`);
  const toMinutes = hoursAndMinutesToMinutes(toTime.hours, toTime.minutes);
  const rangeInMinutes =
    fromMinutes <= toMinutes
      ? toMinutes - fromMinutes
      : MAX_MINUTES - fromMinutes + toMinutes;

  return {
    fromMinutes,
    rangeInMinutes,
    toMinutes,
  };
};

const addOrSubtractMinutesWithRange: (
  value: string,
  delta: number,
  from: number,
  to: number
) => { hours: number; minutes: number } = (value, delta, from, to) => {
  const { fromMinutes, rangeInMinutes, toMinutes } = totalMinutesFromRange(
    from,
    to
  );
  const { hours, minutes } = parseTime(value);
  const nextMinutes = hoursAndMinutesToMinutes(hours, minutes) + delta;

  if (rangeInMinutes === 0) {
    return minutesToHoursAndMinutes(fromMinutes);
  } else if (inRange(fromMinutes, toMinutes, nextMinutes)) {
    return minutesToHoursAndMinutes(nextMinutes);
  } else {
    return delta > 0
      ? minutesToHoursAndMinutes(toMinutes)
      : minutesToHoursAndMinutes(fromMinutes);
  }
};

export const addOrSubtractMinutes: (
  value: string,
  delta: number,
  from?: number,
  to?: number
) => string = (value, delta, from, to) => {
  if (from && !to)
    throw new Error(
      '`from` range parameter is specified while `to` is missing.'
    );
  if (!from && to)
    throw new Error(
      '`to` range parameter is specified while `from` is missing.'
    );

  if (from && to) {
    return formatTime(addOrSubtractMinutesWithRange(value, delta, from, to));
  }

  const { hours, minutes } = parseTime(value);
  const nextMinutes = hoursAndMinutesToMinutes(hours, minutes) + delta;

  return formatTime(minutesToHoursAndMinutes(nextMinutes));
};

export function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}
