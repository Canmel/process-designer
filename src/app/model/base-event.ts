export class BaseEvent {
  x: number;
  y: number;
  name: string;
  mainColor: string;
  selected: boolean;
  borderWidth: number;
  skin: string;
  showTools: boolean;

  constructor() {
    this.mainColor = '#fff';
    this.skin = '#faad14';
    this.selected = false;
    this.showTools = false;
    this.borderWidth = 3;
  }

  horizontal(): number {
    return 0;
  }

  longitudinal(): number {
    return 0;
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
