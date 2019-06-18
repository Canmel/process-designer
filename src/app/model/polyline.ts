import {SvgPoint} from './svg-point';
import {BaseEvent} from './base-event';

export class Polyline {
  points: Array<SvgPoint>;
  startRect: BaseEvent;
  endRect: BaseEvent;

  constructor(startRect: BaseEvent, endRect: BaseEvent) {
    this.points = [];
    this.startRect = startRect;
    this.endRect = endRect;
    this.points.push(new SvgPoint(startRect.centerX(), startRect.centerY()));
    this.points.push(new SvgPoint(endRect.centerX(), endRect.centerY()));
  }

  getPoints(): Array<any> {
    const result = new Array<any>();
    this.points.forEach(function (value: SvgPoint, index: number) {
      result.push(value.x + ', ' + value.y);
    });
    return result;
  }
}
