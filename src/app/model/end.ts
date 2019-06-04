import {BaseEvent} from './base-event';

export class End extends BaseEvent {
  radius: number;
  strokeWidth: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.radius = 20;
    this.strokeWidth = 5;
    this.borderWidth = 8;
    this.x = x;
    this.y = y;
    if (name === undefined || name === '') {
      this.name = '结束';
    } else {
      this.name = name;
    }
  }


  horizontal(): number {
    return this.radius + this.x + this.strokeWidth + this.borderWidth;
  }

  longitudinal(): number {
    return this.y - 2 * this.radius;
  }

  setX(x: number): End {
    this.x = x;
    return this;
  }

  setY(y: number): End {
    this.y = y;
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}