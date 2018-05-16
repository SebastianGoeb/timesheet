import {DateTimeFormatter, LocalDate} from 'js-joda';
import {WorkUnit} from './work-unit';

export class WorkDay {
  date: LocalDate;
  workUnit: WorkUnit;

  constructor(arg: { date: string, workUnit: { startTime: string, endTime: string, breakTime: string } } | LocalDate) {
    if (arg instanceof LocalDate) {
      this.date = arg;
      this.workUnit = null;
    } else {
      this.date = LocalDate.parse(arg.date);
      this.workUnit = new WorkUnit(arg.workUnit);
    }
  }

  public static toJSON(workDay: WorkDay) {
    return {
      date: workDay.date.format(DateTimeFormatter.ISO_LOCAL_DATE),
      workUnit: WorkUnit.toJSON(workDay.workUnit)
    };
  }
}
