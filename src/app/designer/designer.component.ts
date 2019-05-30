import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task';

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

}
