import {LocalDate} from 'js-joda';
import {WorkUnit} from './work-unit';
import {safeFormatLocalDate, safeParseLocalDate} from '../utils/date-time-utils';
import {safeEquals} from '../utils/misc';
import {Equatable} from '../utils/equatable';

export class WorkDay implements Equatable {

  date: LocalDate;
  workUnit?: WorkUnit;

  public static fromJSON(json: any): WorkDay {
    if (json == undefined) {
      return undefined;
    }

    return Object.assign(new WorkDay(), {
      date: safeParseLocalDate(json.date),
      workUnit: WorkUnit.fromJSON(json.workUnit)
    });
  }

  public static toJSON(workDay: WorkDay) {
    if (workDay == undefined) {
      return undefined;
    }

    return {
      date: safeFormatLocalDate(workDay.date),
      workUnit: WorkUnit.toJSON(workDay.workUnit)
    };
  }

  static ofDate(date: LocalDate) {
    return Object.assign(new WorkDay(), {date});
  }

  public equals(that: Equatable): boolean {
    if (this === that) {
      return true;
    }

    if (that instanceof WorkDay) {
      return safeEquals(this.date, that.date) &&
        safeEquals(this.workUnit, that.workUnit);
    }

    return false;
  }
}
