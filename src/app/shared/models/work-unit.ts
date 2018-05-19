import {LocalTime} from 'js-joda';
import {safeFormatLocalTime, safeParseLocalTime} from '../utils/date-time-utils';

export class WorkUnit {

  public startTime: LocalTime = null;
  public endTime: LocalTime = null;
  public breakTime: LocalTime = null;

  static fromJSON(workUnit: any): WorkUnit {
    if (!workUnit) {
      return null;
    }

    return {
      startTime: safeParseLocalTime(workUnit.startTime),
      endTime: safeParseLocalTime(workUnit.endTime),
      breakTime: safeParseLocalTime(workUnit.breakTime)
    };
  }

  public static toJSON(workUnit: WorkUnit) {
    if (!workUnit) {
      return null;
    }

    return {
      startTime: safeFormatLocalTime(workUnit.startTime),
      endTime: safeFormatLocalTime(workUnit.endTime),
      breakTime: safeFormatLocalTime(workUnit.breakTime)
    };
  }
}
