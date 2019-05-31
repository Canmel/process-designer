export class Task {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  mainColor: string;

  constructor(x: number, y: number, name: string) {
    this.mainColor = '#fff';
    this.width = 200;
    this.height = 80;
    this.x = this.correctPosition(x, this.width);
    this.y = this.correctPosition(y, this.height);
    if (name === undefined || name === '') {
      this.name = '任务';
    } else {
      this.name = name;
    }
    console.log(this.x, this.y);
  }

  setX(x: number): Task {
    this.x = x;
    return this;
  }

  setY(y: number): Task {
    this.y = y;
    return this;
  }

  // 位置斧正
  correctPosition(p: number, length: number): number {
    return p - (length / 2);
  }
}
