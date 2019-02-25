import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';



const routes: Routes = [
  {
    path: 'message-log',
    loadChildren: './message/message-log/message-log.module#MessageLogModule'
  },
  {
    path: 'messages',
    loadChildren: './message/messages/messages.module#MessagesModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: '',
    loadChildren: './welcome-login/welcome-login.module#WelcomeLoginModule'
  },
  /*{
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
