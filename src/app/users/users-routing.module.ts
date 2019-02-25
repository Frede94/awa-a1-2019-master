import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserAddComponent} from './user-add/user-add.component';

const routes: Routes = [
  {
    path: 'registrer',
    component: UserAddComponent
  },
  {
    path: '',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
