export class BaseEvent {
  x: number;
  y: number;
  name: string;
  mainColor: string;
  selected: boolean;
  borderWidth: number;
  skin: string;

  constructor() {
    this.mainColor = '#fff';
    this.skin = '#faad14';
    this.selected = false;
    this.borderWidth = 3;
  }

  setTrueX(x: number): BaseEvent {
    this.x = x;
    return this;
  }

  setTrueY(y: number): BaseEvent {
    this.y = y;
    return this;
  }
}
