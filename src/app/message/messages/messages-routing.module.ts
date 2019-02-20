import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessagesListComponent} from './message-list/messages-list.component';

const routes: Routes = [{
  path: '',
  component: MessagesListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
