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

  static isEqual(wu1: WorkUnit, wu2: WorkUnit) {
    if (wu1) {
      if (wu2) {
        return (wu1.startTime ? wu1.startTime.equals(wu2.startTime) : wu1.startTime === wu2.startTime) &&
          (wu1.endTime ? wu1.endTime.equals(wu2.endTime) : wu1.endTime === wu2.endTime) &&
          (wu1.breakTime ? wu1.breakTime.equals(wu2.breakTime) : wu1.breakTime === wu2.breakTime);
      } else {
        return false;
      }
    } else {
      return wu1 === wu2;
    }
  }
}
