import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeLoginRoutingModule } from './welcome-login-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    WelcomeLoginRoutingModule
  ]
})
export class WelcomeLoginModule { }
