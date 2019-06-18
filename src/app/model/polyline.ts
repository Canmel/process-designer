import {SvgPoint} from './svg-point';
import {BaseEvent} from './base-event';

export class Polyline {
  points: Array<SvgPoint>;
  startRect: BaseEvent;
  endRect: BaseEvent;

  constructor(startRect: BaseEvent, endRect: BaseEvent) {
    this.startRect = startRect;
    this.endRect = endRect;

    this.points.push(new SvgPoint(startRect.x, startRect.y));
    this.points.push(new SvgPoint(endRect.x, endRect.y));
  }

  getPoints(): Array<any> {
    const result = new Array<any>();
    this.points.forEach(function (value: SvgPoint, index: number) {
      console.log(value);
    });
    return result;
  }
}
