import {SvgPoint} from './svg-point';
import {BaseEvent} from './base-event';

export class Polyline {
  points: Array<SvgPoint>;
  startRect: BaseEvent;
  endRect: BaseEvent;
  pointStrs: Array<string>;

  constructor(startRect: BaseEvent, endRect: BaseEvent) {
    this.startRect = startRect;
    this.endRect = endRect;
    this.setPoints();
  }

  setPoints() {
    this.points = [];
    this.points.push(new SvgPoint(this.startRect.centerX(), this.startRect.centerY()));
    this.points.push(new SvgPoint(this.endRect.centerX(), this.endRect.centerY()));
    const result = new Array<any>();
    const _this = this;
    _this.pointStrs = [];
    this.points.forEach(function (value: SvgPoint, index: number) {
      _this.pointStrs.push(value.x + ', ' + value.y);
      console.log(_this);
    });
  }


  setStartRect(value: BaseEvent) {
    this.startRect = value;
    this.setPointeAndStr();
  }

  setEndRect(value: BaseEvent) {
    this.endRect = value;
    this.setPointeAndStr();
  }

  setPointeAndStr() {
    this.points = [];
    this.points.push(new SvgPoint(this.startRect.centerX(), this.startRect.centerY()));
    this.points.push(new SvgPoint(this.endRect.centerX(), this.endRect.centerY()));
    this.pointStrs = [];
    const _this = this;
    this.points.forEach(function (value: SvgPoint, index: number) {
      _this.pointStrs.push(value.x + ', ' + value.y);
    });
  }
}
