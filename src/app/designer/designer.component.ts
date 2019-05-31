import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ToolTip} from '../model/tool-tip';
import {Start} from '../model/start';
import {End} from '../model/end';
import {Intermediate} from '../model/intermediate';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  tasks: Array[Task] = [];

  starts: Array[Start] = [];

  ends: Array[End] = [];

  intermediates: Array[Intermediate] = [];

  currentTip: ToolTip = new ToolTip('', 0, 0);

  showOutLine = false;

  onItemDrop(e: any) {
    switch (e.dragData) {
      case('start'):
        this.starts.push(new Start(e['nativeEvent']['offsetX'], e['nativeEvent']['offsetY'], ''));
        break;
      case('end'):
        this.ends.push(new End(e['nativeEvent']['offsetX'], e['nativeEvent']['offsetY'], ''));
        break;
      case('task'):
        this.tasks.push(new Task(e['nativeEvent']['offsetX'], e['nativeEvent']['offsetY'], ''));
        break;
      case('intermediates'):
        this.intermediates.push(new Intermediate(e['nativeEvent']['offsetX'], e['nativeEvent']['offsetY'], ''));
        break;
      default :
        alert('222');
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  rectMouseUpHandler(e, item) {
    item.isSelected = false;
    this.toCurrentPosition(e, item);
  }

  rectMouseMoveHandler(e, item) {
    if (this.isSelected(item)) {
      this.toCurrentPosition(e, item);
    }
  }

  rectMouseDownHandler(e: any, item) {
    item.isSelected = true;
    this.toCurrentPosition(e, item);
  }

  /**
   * 工具栏 鼠标悬浮
   */
  toolsMouseMoveHandler(e, msg) {
    const _this = this;
    if (this.currentTip.message === '') {
      _this.currentTip.message = msg;
      _this.currentTip.x = e['clientX'];
      _this.currentTip.y = e['clientY'];
    }
  }


  /**
   * 工具栏 鼠标移除
   */
  toolsMouseOutHandler() {
    this.currentTip.message = '';
  }

  bgClick(e: any) {
  }

  toCurrentPosition(e, item) {
    item.setX(e['offsetX']).setY(e['offsetY']);
  }

  isSelected(item) {
    return item.isSelected;
  }

}
