import {LocalTime} from 'js-joda';

export class WorkUnit {

  public startTime: LocalTime = null;
  public endTime: LocalTime = null;
  public breakTime: LocalTime = null;

  constructor(arg: { startTime: string, endTime: string, breakTime: string } = {
    startTime: null,
    endTime: null,
    breakTime: null
  }) {
    this.startTime = WorkUnit.safeParseLocalTime(arg.startTime);
    this.endTime = WorkUnit.safeParseLocalTime(arg.endTime);
    this.breakTime = WorkUnit.safeParseLocalTime(arg.breakTime);
  }

  public static toJSON(workUnit: WorkUnit) {
    return {
      startTime: WorkUnit.safeFormatLocalTime(workUnit.startTime),
      endTime: WorkUnit.safeFormatLocalTime(workUnit.endTime),
      breakTime: WorkUnit.safeFormatLocalTime(workUnit.breakTime)
    };
  }

  private static safeFormatLocalTime(startTime: LocalTime) {
    try {
      return startTime.toString();
    } catch (e) {
      return null; // default
    }
  }

  private static safeParseLocalTime(string: string): LocalTime {
    try {
      return LocalTime.parse(string);
    } catch (e) {
      return null; // default
    }
  }
}
