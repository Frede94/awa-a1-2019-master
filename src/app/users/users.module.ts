import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FilesModule} from '../files/files.module';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [UserListComponent, UserAddComponent, UserUpdateComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FilesModule,
    ImageCropperModule
  ]
})
export class UsersModule { }
