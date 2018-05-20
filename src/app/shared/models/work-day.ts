import {LocalDate} from 'js-joda';
import {WorkUnit} from './work-unit';
import {safeFormatLocalDate, safeParseLocalDate} from '../utils/date-time-utils';

export class WorkDay {
  date: LocalDate = null;
  workUnit: WorkUnit = null;

  public static fromJSON(json: any): WorkDay {
    if (!json) {
      return null;
    }

    return {
      date: safeParseLocalDate(json.date),
      workUnit: WorkUnit.fromJSON(json.workUnit)
    };
  }

  public static toJSON(workDay: WorkDay) {
    if (!workDay) {
      return null;
    }

    return {
      date: safeFormatLocalDate(workDay.date),
      workUnit: WorkUnit.toJSON(workDay.workUnit)
    };
  }

  static ofDate(date: LocalDate) {
    return Object.assign(new WorkDay(), {date});
  }

  static isEqual(wd1: WorkDay, wd2: WorkDay) {
    if (wd1) {
      if (wd2) {
        return (wd1.date ? wd1.date.isEqual(wd2.date) : wd1.date === wd2.date) &&
          WorkUnit.isEqual(wd1.workUnit, wd2.workUnit);
      } else {
        return false;
      }
    } else {
      return wd1 === wd2;
    }
  }
}
