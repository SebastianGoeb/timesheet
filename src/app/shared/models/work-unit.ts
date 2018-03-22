import * as moment from 'moment';

export class WorkUnit {
  public start: moment.Moment;
  public end: moment.Moment;
  public breakDuration: moment.Duration;

  constructor({start, end, breakDuration}) {
    this.start = moment(start);
    this.end = moment(end);
    this.breakDuration = moment.duration(breakDuration);
  }
}
