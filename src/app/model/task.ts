import {BaseEvent} from './base-event';

export class Task extends BaseEvent {
  width: number;
  height: number;

  constructor(x: number, y: number, name: string) {
    super();
    this.width = 120;
    this.height = 50;
    this.x = this.correctPosition(x, this.width);
    this.y = this.correctPosition(y, this.height);
    if (name === undefined || name === '') {
      this.name = '未命名任务';
    } else {
      this.name = name;
    }
  }

  setX(x: number): Task {
    this.x = this.correctPosition(x, this.width);
    return this;
  }

  setY(y: number): Task {
    this.y = this.correctPosition(y, this.height);
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}
