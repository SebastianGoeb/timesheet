import {DateTimeFormatter, LocalDate, LocalTime} from 'js-joda';

export function safeParseLocalDate(string: string, formatter?: DateTimeFormatter): LocalDate {
  try {
    return LocalDate.parse(string, formatter);
  } catch (e) {
    return undefined; // default
  }
}

export function safeFormatLocalDate(localDate: LocalDate, formatter?: DateTimeFormatter): string {
  try {
    return localDate.format(formatter || DateTimeFormatter.ISO_LOCAL_DATE);
  } catch (e) {
    return undefined; // default
  }
}

export function safeParseLocalTime(string: string, formatter?: DateTimeFormatter): LocalTime {
  try {
    return LocalTime.parse(string, formatter);
  } catch (e) {
    return undefined; // default
  }
}

export function safeFormatLocalTime(localTime: LocalTime, formatter?: DateTimeFormatter): string {
  try {
    return localTime.format(formatter || DateTimeFormatter.ISO_LOCAL_TIME);
  } catch (e) {
    return undefined; // default
  }
}
