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
    this.x = x - (this.width / 2);
    this.y = y - (this.height / 2);
    if (name === undefined || name === '') {
      this.name = '任务';
    } else {
      this.name = name;
    }
  }
}
