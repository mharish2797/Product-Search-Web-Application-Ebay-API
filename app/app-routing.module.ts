import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NorecordsComponent } from './norecords/norecords.component';
import { ListItemComponent } from './list-item/list-item.component';

const routes: Routes = [
  {path:'norecords', component:NorecordsComponent},
  {path:'listitem', component:ListItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[NorecordsComponent]
