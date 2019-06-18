import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {ToolTip} from '../model/tool-tip';
import {Start} from '../model/start';
import {End} from '../model/end';
import {Intermediate} from '../model/intermediate';
import {BaseEvent} from '../model/base-event';
import {Getway} from '../model/getway';
import {Pool} from '../model/pool';
import * as $ from 'jquery';
import {TransitionLine} from '../model/transition-line';
import {Polyline} from '../model/polyline';

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

  pools: Array<Pool> = [];

  currentTip: ToolTip = new ToolTip('', 0, 0);

  selected = null;

  transitionLine: TransitionLine = null;

  svgProperties = {
    scaleX: 1.0,
    scaleY: 1.0,
    // 平移量
    translateX: 0,
    translateY: 0,
    width: 300,
    height: 200,
    cursor: 'pointer',
    drag: false,
    cursorX: 0,
    cursorY: 0
  };

  polyLines: Array<Polyline> = [];

  onItemDrop(e: any) {
    let positionX = e['nativeEvent']['offsetX'];
    positionX = positionX / this.svgProperties.scaleX;
    positionX -= this.svgProperties.translateX;
    let positionY = e['nativeEvent']['offsetY'];
    positionY = positionY / this.svgProperties.scaleY;
    positionY -= this.svgProperties.translateY;

    console.log('新建位置', positionX, positionY);
    switch (e.dragData) {
      case('start'):
        this.starts.push(new Start(positionX, positionY, ''));
        break;
      case('end'):
        this.ends.push(new End(positionX, positionY, ''));
        break;
      case('task'):
        this.tasks.push(new Task(positionX, positionY, ''));
        break;
      case('intermediates'):
        this.intermediates.push(new Intermediate(positionX, positionY, ''));
        break;
      case('getway'):
        this.getways.push(new Getway(positionX, positionY, ''));
        break;
      case ('pool'):
        this.pools.push(new Pool(positionX, positionY, ''));
        break;
      default :
    }
  }

  constructor() {
  }

  ngOnInit() {
    this.svgProperties.width = $('#designer-content').width();
    this.svgProperties.height = $('#designer-content').height();
  }

  svgMouseDownHandler(e) {
    this.svgProperties.drag = true;
    this.transitionLine = null;
    console.log(this.svgProperties);
    console.log('画布位置', e.offsetX, e.offsetY);
  }

  svgMouseUpHandler($event) {
    this.svgProperties.drag = false;
    console.log(this.svgProperties.drag);
  }

  rectMouseUpHandler(e) {
    if (this.selected === null) {
      return;
    }
    this.selected.setTrueX(this.taskMove.x / this.svgProperties.scaleX - this.svgProperties.translateX)
      .setTrueY(this.taskMove.y / this.svgProperties.scaleY - this.svgProperties.translateY);
    this.taskMove = null;
    console.log(this.selected.x, this.selected.y);
  }

  svgMouseMoveHandler(e) {
    this.svgProperties.cursorX = e['offsetX'];
    this.svgProperties.cursorY = e['offsetY'];
    if (this.transitionLine) {
      this.transitionLine.terminalX = e['offsetX'];
      this.transitionLine.terminalY = e['offsetY'];
    }
    if (this.taskMove) {
      if (this.taskMove instanceof Getway) {
        this.taskMove.setTransForm(e['offsetY'], e['offsetX']);
      }
      this.toCurrentPosition(e, this.taskMove);
    } else {
      if (this.svgProperties.drag) {
        this.svgProperties.translateX += e.movementX;
        this.svgProperties.translateY += e.movementY;
      }
    }
  }

  rectMouseDownHandler(e: any, item) {
    this.transitionLine = null;
    this.selected = item;
    if (this.selected === item) {
      this.selected.showTools = !this.selected.showTools;
    } else {
      this.selected.showTools = true;
    }
    // 使用copy方法，复制一个新的对象，如果只是单纯的赋值，实际上引用的事同一个对象，在angular的双向绑定中，并不能生成临时可移动的组件
    this.taskMove = this.copyNewInstance(item);
    this.toCurrentPosition(e, this.taskMove);
    e.stopPropagation();
  }

  // rect hover事件
  rectMouseOverHandler(e: any, item) {
    if (this.transitionLine) {
      this.rectToActive(e.srcElement);
    }
  }

  // rect hover 离开事件
  rectMouseOutHandler(e: any, item) {
      this.rectToNormal(e.srcElement);
  }

  rectToActive(element: any) {
    $(element).parent().addClass('d-outline-selected-true');
    $(element).addClass('d-outline-selected-true');
  }

  rectToNormal(element: any) {
    $(element).parent().removeClass('d-outline-selected-true');
    $(element).removeClass('d-outline-selected-true');
  }

  /**
   * 重新拷贝一个新的svg对象，避免angular 的双向绑定。使得确保可以生成一个移动任务模块
   * @param item 模块对象
   */
  copyNewInstance(item) {
    const trueX = item.x + this.svgProperties.translateX;
    const trueY = item.y + this.svgProperties.translateY;
    // trueX = trueX / this.svgProperties.scaleX;
    // trueY = trueY / this.svgProperties.scaleY;
    // 当item的实际类型不同，可能有些属性需要自定义，这里不再直接使用超类，而是分成各个组件重新生成
    if (item instanceof Task) {
      const task = new Task(0, 0, item.name);
      // 在赋值x, y 的时候加上偏移量，偏移量初始值已设置为0
      task.setTrueX(trueX).setTrueY(trueY);
      return task;
    }
    if (item instanceof Start) {
      const start = new Start(0, 0, item.name);
      start.setTrueX(trueX).setTrueY(trueY);
      return start;
    }
    if (item instanceof End) {
      const end = new End(0, 0, item.name);
      end.setTrueX(trueX).setTrueY(trueY);
      return end;
    }
    if (item instanceof Intermediate) {
      const intermediate = new Intermediate(0, 0, item.name);
      intermediate.setTrueX(trueX).setTrueY(trueY);
      return intermediate;
    }
    if (item instanceof Getway) {
      const getWay = new Getway(0, 0, item.name);
      getWay.setTransForm(item.x, item.y).setTrueX(trueX).setTrueY(trueY);
      return getWay;
    }
    if (item instanceof Pool) {
      const pool = new Pool(0, 0, item.name);
      pool.setTrueX(trueX).setTrueY(trueY);
      return pool;
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

  toolDeleteHandler(e) {
    const items = this.getItemsArray(this.selected);
    const index = items.indexOf(this.selected);
    items.splice(index, 1);
    this.selected = null;
  }

  svgWheelHandler(event) {
    if (event.ctrlKey) {
      if ((event.deltaX + event.deltaY) > 0) {
        this.svgProperties.scaleX += 0.03;
        this.svgProperties.scaleY += 0.03;
      } else {
        this.svgProperties.scaleX -= 0.03;
        this.svgProperties.scaleY -= 0.03;
      }
    } else {
      this.svgProperties.translateX = this.svgProperties.translateX - event.deltaX;
      this.svgProperties.translateY = this.svgProperties.translateY - event.deltaY;
    }
    event.stopPropagation();
    return false;
  }

  showTransition(e) {
    this.selected.showTools = false;
    this.transitionLine = new TransitionLine(this.selected.centerX(),
      this.selected.centerY(),
      this.svgProperties.cursorX, this.svgProperties.cursorY);
  }

  toCurrentPosition(e, item) {
    console.log('前往目标点：', e.offsetX, e.offsetY);
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

  isShowPool(item: BaseEvent): boolean {
    if (item instanceof Pool) {
      return true;
    }
    return false;
  }

  wheelTools(e) {
    e.stopPropagation();
    return false;
  }

  getItemsArray(item): Array<BaseEvent> {
    if (item instanceof Start) {
      return this.starts;
    }
    if (item instanceof End) {
      return this.ends;
    }
    if (item instanceof Task) {
      return this.tasks;
    }
    if (item instanceof Getway) {
      return this.getways;
    }
    if (item instanceof Intermediate) {
      return this.intermediates;
    }
    if (item instanceof Pool) {
      return this.pools;
    }
  }
}
