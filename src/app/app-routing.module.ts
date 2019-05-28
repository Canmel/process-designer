import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesignerModule} from './designer/designer.module';

const routes: Routes = [
  {
    path: 'designer',
    loadChildren: () => DesignerModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
