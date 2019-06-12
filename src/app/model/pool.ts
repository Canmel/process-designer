import {BaseEvent} from './base-event';

export class Pool extends BaseEvent {
  width: number;
  height: number;
  twidth: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.width = 120;
    this.height = 50;
    this.twidth = 20;
    this.x = this.correctPosition(x, this.width);
    this.y = this.correctPosition(y, this.height);
    if (name === undefined || name === '') {
      this.name = '未命名任务';
    } else {
      this.name = name;
    }
  }

  horizontal(): number {
    return this.width + 5;
  }

  longitudinal(): number {
    return this.borderWidth - 0.5 * this.height;
  }

  setX(x: number): Pool {
    this.x = this.correctPosition(x, this.width);
    return this;
  }

  setY(y: number): Pool {
    this.y = this.correctPosition(y, this.height);
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }

  centerX(): number {
    return this.x + 0.5 * this.width;
  }

  centerY(): number {
    return this.y + 0.5 * this.height;
  }
}
