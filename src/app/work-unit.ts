import * as moment from 'moment';
import {Duration, Moment, duration} from 'moment';

export class WorkUnit {
  public id: string;

  public start: Moment;
  public end: Moment;
  public breakDuration: Duration;


  constructor({id, start, end, breakDuration}) {
    this.id = id;
    this.start = moment(start);
    this.end = moment(end);
    this.breakDuration = duration(breakDuration);
  }

  static fromObject({id, start, end, breakDuration}): WorkUnit {
    return {
      id,
      start: moment(start),
      end: moment(end),
      breakDuration: duration(breakDuration)
    }
  }

  static fromJson(json: string): WorkUnit {
    return this.fromJson(JSON.parse(json));
  }
}
