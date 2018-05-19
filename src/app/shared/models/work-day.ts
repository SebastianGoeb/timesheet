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
}
