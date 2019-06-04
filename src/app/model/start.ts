import {BaseEvent} from './base-event';

export class Start extends BaseEvent {
  radius: number;
  strokeWidth: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.radius = 20;
    this.borderWidth = 8;
    this.strokeWidth = 2;
    this.x = this.correctPosition(x, 0);
    this.y = this.correctPosition(y, 0);
    if (name === undefined || name === '') {
      this.name = '开始';
    } else {
      this.name = name;
    }
    console.log(this.x, this.y);
  }

  horizontal(): number {
    return this.radius + this.x + this.borderWidth + this.strokeWidth;
  }

  longitudinal(): number {
    return this.y - 2 * this.radius;
  }

  setX(x: number): Start {
    this.x = this.correctPosition(x, 0);
    return this;
  }

  setY(y: number): Start {
    this.y = this.correctPosition(y, 0);
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}
