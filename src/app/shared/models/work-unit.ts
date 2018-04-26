import * as moment from 'moment';

export class WorkUnit {
  public date: moment.Moment;
  public start: moment.Moment;
  public end: moment.Moment;
  public breakDuration: moment.Duration;

  constructor({date, start, end, breakDuration}) {
    this.date = moment(date);
    this.start = moment(start);
    this.end = moment(end);
    this.breakDuration = moment.duration(breakDuration);
  }
}
