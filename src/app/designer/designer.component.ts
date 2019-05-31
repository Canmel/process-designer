import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {$} from 'protractor';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  items = [
    {name: 'Apple', type: 'fruit'},
    {name: 'Carrot', type: 'vegetable'},
    {name: 'Orange', type: 'fruit'}];
  droppedItems = [];

  tasks = [];

  showOutLine = false;

  onItemDrop(e: any) {
    console.log(e['nativeEvent']['offsetX']);
    console.log(e['nativeEvent']['offsetY']);

    this.tasks.push(new Task(e['nativeEvent']['offsetX'], e['nativeEvent']['offsetY'], ''));
    this.droppedItems.push(e.dragData);
  }

  constructor() {
  }

  ngOnInit() {
  }

  rectMouseUpHandler() {
    alert(11);
  }

  rectMouseMoveHandler(e) {
    // console.log(e.target);
    // e.target.attribute('class', 'qwe');
  }

  rectMouseDownHandler(e: any, item) {
    console.log(item.x, item.y);
    item.setX(e['layerX']).setY(e['layerY']);
    console.log(item.x, item.y);
  }

}
