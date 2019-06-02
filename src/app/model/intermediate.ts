import {BaseEvent} from './base-event';

export class Intermediate extends BaseEvent{
  radius: number;
  radiusInner: number;
  strokeWidth: number;
  strokeWidthInner: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.radius = 20;
    this.radiusInner = 14;
    this.strokeWidthInner = 5;
    this.strokeWidth = 2;
    this.borderWidth = 8;
    this.x = x;
    this.y = y;
    if (name === undefined || name === '') {
      this.name = '结束';
    } else {
      this.name = name;
    }
  }

  setX(x: number): Intermediate {
    this.x = x;
    return this;
  }

  setY(y: number): Intermediate {
    this.y = y;
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}
