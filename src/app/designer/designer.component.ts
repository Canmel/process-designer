import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ToolTip} from '../model/tool-tip';
import {Start} from '../model/start';
import {End} from '../model/end';
import {Intermediate} from '../model/intermediate';
import {BaseEvent} from '../model/base-event';
import {Getway} from '../model/getway';

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

  getways: Array<Getway> = [];

  currentTip: ToolTip = new ToolTip('', 0, 0);

  selected = null;

  svgProperties = {
    scaleX: 1.0,
    scaleY: 1.0,
    // 平移量
    translateX: 0,
    translateY: 0
  };

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
      case('getway'):
        this.getways.push(new Getway(e['nativeEvent']['offsetX'], e['nativeEvent']['offsetY'], ''));
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
    this.selected.setTrueX(this.taskMove.x - this.svgProperties.translateX).setTrueY(this.taskMove.y - this.svgProperties.translateY);
    this.taskMove = null;
  }

  rectMouseMoveHandler(e) {
    if (this.taskMove) {
      if (this.taskMove instanceof Getway) {
        this.taskMove.setTransForm(e['offsetY'], e['offsetX']);
      }
      this.toCurrentPosition(e, this.taskMove);
    }
  }

  rectMouseDownHandler(e: any, item) {
    this.selected = item;
    // 使用copy方法，复制一个新的对象，如果只是单纯的赋值，实际上引用的事同一个对象，在angular的双向绑定中，并不能生成临时可移动的组件
    this.taskMove = this.copyNewInstance(item);
  }

  /**
   * 重新拷贝一个新的svg对象，避免angular 的双向绑定。使得确保可以生成一个移动任务模块
   * @param item 模块对象
   */
  copyNewInstance(item) {
    // 当item的实际类型不同，可能有些属性需要自定义，这里不再直接使用超类，而是分成各个组件重新生成
    if (item instanceof Task) {
      const task = new Task(0, 0, item.name);
      // 在赋值x, y 的时候加上偏移量，偏移量初始值已设置为0
      task.setTrueX(item.x + this.svgProperties.translateX).setTrueY(item.y + this.svgProperties.translateY);
      return task;
    }
    if (item instanceof Start) {
      const start = new Start(0, 0, item.name);
      start.setTrueX(item.x + this.svgProperties.translateX).setTrueY(item.y + this.svgProperties.translateY);
      return start;
    }
    if (item instanceof End) {
      const end = new End(0, 0, item.name);
      end.setTrueX(item.x + this.svgProperties.translateX).setTrueY(item.y + this.svgProperties.translateY);
      return end;
    }
    if (item instanceof Intermediate) {
      const intermediate = new Intermediate(0, 0, item.name);
      intermediate.setTrueX(item.x + this.svgProperties.translateX).setTrueY(item.y + this.svgProperties.translateY);
      return intermediate;
    }
    if (item instanceof Getway) {
      const getWay = new Getway(0, 0, item.name);
      getWay.setTransForm(item.x, item.y).setTrueX(item.x + this.svgProperties.translateX).setTrueY(item.y + this.svgProperties.translateY);
      return getWay;
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

  test(event) {
    this.svgProperties.translateX = this.svgProperties.translateX - event.deltaX;
    this.svgProperties.translateY = this.svgProperties.translateY - event.deltaY;
  }


  toCurrentPosition(e, item) {
    item.setX(e['offsetX']).setY(e['offsetY']);
  }

  toTrueCurrentPosition(e, item) {
    item.setTrueX(e['offsetX']).setTrueY(e['offsetY']);
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

  isShowGetWay(item: BaseEvent): boolean {
    if (item instanceof Getway) {
      return true;
    }
    return false;
  }

}
