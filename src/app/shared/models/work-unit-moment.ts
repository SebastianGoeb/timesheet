import * as moment from 'moment';
import {ISO_DATE_FORMAT, ISO_DATE_TIME_FORMAT} from "../utils/iso-8601";

export class WorkUnitMoment {
  public date: moment.Moment; // YYYY-MM-DD
  public start: moment.Moment; // YYYY-MM-DD'T'HH-mm-ss
  public end: moment.Moment; // YYYY-MM-DD'T'HH-mm-ss
  public breakDuration: moment.Duration; // HH:mm

  public static fromJson({date, start, end, breakDuration}): WorkUnitMoment {
    return {
      date: date ? moment(date, ISO_DATE_FORMAT) : date,
      start: start ? moment(start, ISO_DATE_TIME_FORMAT) : start,
      end: end ? moment(end, ISO_DATE_TIME_FORMAT) : end,
      breakDuration: breakDuration ? moment.duration(breakDuration) : breakDuration
    };
  }

  public static toJson(workUnit: WorkUnitMoment): Object {
    return {
      date: workUnit.date ? workUnit.date.format(ISO_DATE_FORMAT) : workUnit.date,
      start: workUnit.start ? workUnit.start.format(ISO_DATE_TIME_FORMAT) : workUnit.start,
      end: workUnit.end ? workUnit.end.format(ISO_DATE_TIME_FORMAT) : workUnit.end,
      breakDuration: workUnit.breakDuration ? workUnit.breakDuration.format() : workUnit.breakDuration
    }
  }
}
