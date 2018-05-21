import {LocalTime} from 'js-joda';
import {safeFormatLocalTime, safeParseLocalTime} from '../utils/date-time-utils';
import {safeEquals} from '../utils/misc';
import {Equatable} from '../utils/equatable';

export class WorkUnit implements Equatable {

  public startTime?: LocalTime;
  public endTime?: LocalTime;
  public breakTime?: LocalTime;

  static fromJSON(json: any): WorkUnit {
    if (json == undefined) {
      return undefined;
    }

    return Object.assign(new WorkUnit(), {
      startTime: safeParseLocalTime(json.startTime),
      endTime: safeParseLocalTime(json.endTime),
      breakTime: safeParseLocalTime(json.breakTime)
    });
  }

  public static toJSON(workUnit: WorkUnit) {
    if (workUnit == undefined) {
      return undefined;
    }

    return {
      startTime: safeFormatLocalTime(workUnit.startTime),
      endTime: safeFormatLocalTime(workUnit.endTime),
      breakTime: safeFormatLocalTime(workUnit.breakTime)
    };
  }

  public equals(that: Equatable): boolean {
    if (this === that) {
      return true;
    }

    if (that instanceof WorkUnit) {
      return safeEquals(this.startTime, that.startTime) &&
        safeEquals(this.endTime, that.endTime) &&
        safeEquals(this.breakTime, that.breakTime);
    }

    return false;
  }
}
