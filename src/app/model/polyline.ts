import {SvgPoint} from './svg-point';
import {BaseEvent} from './base-event';

export class Polyline {
  points: Array<SvgPoint>;
  startRect: BaseEvent;
  endRect: BaseEvent;
  minClearanceX: number;
  minClearanceY: number;
  pointStrs: Array<string>;

  constructor(startRect: BaseEvent, endRect: BaseEvent) {
    this.startRect = startRect;
    this.endRect = endRect;
    this.minClearanceX = 40;
    this.minClearanceY = 50;
    this.setPoints();
  }

  setPoints() {
    this.points = [];
    // 加点
    this.points.push(new SvgPoint(this.startRect.centerX(), this.startRect.centerY()));
    this.points.push(new SvgPoint(this.endRect.centerX(), this.endRect.centerY()));
    this.setTortuousPoint();
    const result = new Array<any>();
    const _this = this;
    _this.pointStrs = [];
    // 拆点只为显示;
    this.points.forEach(function (value: SvgPoint, index: number) {
      _this.pointStrs.push(value.x + ', ' + value.y);
      console.log(_this);
    });
  }

  // 设置折点
  setTortuousPoint() {
    // 两点相差距离
    const distanceX = this.endRect.centerX() - this.startRect.centerX();
    const distanceY = this.endRect.centerY() - this.startRect.centerY();
    console.log(this.endRect.centerX() - this.startRect.centerX());

    // 两个元素 间隙
    const clearanceX = distanceX - (this.endRect.horizontal() + this.startRect.horizontal()) * 0.5;
    const clearanceY = distanceY - (this.endRect.longitudinal() + this.startRect.longitudinal() + 10) * 0.5;
    console.log(clearanceX, clearanceY);
    // 实际看了一下 当 clearanceX > 40 的时候可以先画好水平线，再画垂直，最后画水平线
    if (clearanceX > this.minClearanceX) {
      this.points.splice(this.points.length - 1, 0,
        new SvgPoint(this.startRect.centerX() + 0.5 * (clearanceX + this.startRect.horizontal()), this.startRect.centerY()));
      this.points.splice(this.points.length - 1, 0,
        new SvgPoint(this.startRect.centerX() + 0.5 * (clearanceX + this.startRect.horizontal()), this.endRect.centerY()));
    } else if (clearanceY > this.minClearanceY) {
      this.points.splice(this.points.length - 1, 0,
        new SvgPoint(this.startRect.centerX(), this.startRect.centerY() + 0.5 * (clearanceY + this.startRect.longitudinal())));
      this.points.splice(this.points.length - 1, 0,
        new SvgPoint(this.endRect.centerX(), this.startRect.centerY() + 0.5 * (clearanceY + this.startRect.longitudinal())));
    } else {
      this.points.splice(this.points.length - 1, 0,
        new SvgPoint(this.startRect.centerX(), this.startRect.centerY() - this.minClearanceX - 0.5 * this.startRect.longitudinal()));
      this.points.splice(this.points.length - 1, 0,
        new SvgPoint(this.endRect.centerX(), this.startRect.centerY() - this.minClearanceX - 0.5 * this.startRect.longitudinal()));
    }
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
    this.setTortuousPoint();
    this.pointStrs = [];
    const _this = this;
    this.points.forEach(function (value: SvgPoint, index: number) {
      _this.pointStrs.push(value.x + ', ' + value.y);
    });
  }
}
