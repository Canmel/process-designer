export class BaseEvent {
  x: number;
  y: number;
  name: string;
  mainColor: string;
  selected: boolean;
  borderWidth: number;


  constructor() {
    this.mainColor = '#fff';
    this.selected = false;
    this.borderWidth = 3;
  }
}
