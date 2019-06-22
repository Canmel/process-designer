import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DesignerRoutingModule} from './designer-routing.module';
import {DesignerComponent} from './designer.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {Ng2DragDropModule} from 'ng2-drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DesignerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DesignerRoutingModule,
    NgZorroAntdModule,
    Ng2DragDropModule.forRoot()
  ]
})
export class DesignerModule {
}
