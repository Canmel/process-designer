import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ToolTip} from '../model/tool-tip';
import {Start} from '../model/start';
import {End} from '../model/end';
import {Intermediate} from '../model/intermediate';
import {BaseEvent} from '../model/base-event';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  tasks: Array<Task> = [];
  taskMove: BaseEvent = null;

  starts: Array<Start> = [];

  ends: Array<End> = [];

  intermediates: Array<Intermediate> = [];

  currentTip: ToolTip = new ToolTip('', 0, 0);

  selected = null;

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
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  rectMouseUpHandler(e) {
    if (this.selected === null) {
      return;
    }
    this.selected.setTrueX(this.taskMove.x).setTrueY(this.taskMove.y);
    this.taskMove = null;
  }

  rectMouseMoveHandler(e) {
    if (this.taskMove) {
      this.toCurrentPosition(e, this.taskMove);
    }
  }

  rectMouseDownHandler(e: any, item) {
    this.selected = item;
    this.taskMove = this.copyNewInstance(item);
  }

  copyNewInstance(item) {
    if (item instanceof Task) {
      const task = new Task(0, 0, item.name);
      task.setTrueX(item.x).setTrueY(item.y);
      return task;
    }
    if (item instanceof Start) {
      const start = new Start(0, 0, item.name);
      start.setTrueX(item.x).setTrueY(item.y);
      return start;
    }
    if (item instanceof End) {
      const end = new End(0, 0, item.name);
      end.setTrueX(item.x).setTrueY(item.y);
      return end;
    }
    if (item instanceof Intermediate) {
      const intermediate = new Intermediate(0, 0, item.name);
      intermediate.setTrueX(item.x).setTrueY(item.y);
      return intermediate;
    }
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

  toCurrentPosition(e, item) {
    item.setX(e['offsetX']).setY(e['offsetY']);
  }

  isSelected(item) {
    return item.isSelected;
  }

  isShowRect(item: BaseEvent): boolean {
    if (item instanceof Task) {
      return true;
    }
    return false;
  }

  isShowText(item: BaseEvent): boolean {
    if (item instanceof Task) {
      return true;
    }
    return false;
  }

  isShowCircle(item: BaseEvent): boolean {
    if (item instanceof End) {
      return true;
    }
    if (item instanceof Start) {
      return true;
    }
    if (item instanceof Intermediate) {
      return true;
    }
    return false;
  }

  isShowInnerCircle(item: BaseEvent): boolean {
    if (item instanceof Intermediate) {
      return true;
    }
    return false;
  }

}
