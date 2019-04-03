import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddComponent } from './user-add.component';
import {ReactiveErrors} from '@angular/forms/src/directives/reactive_errors';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {UsersService} from '../shared/users.service';

describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddComponent ],
      imports: [
        ReactiveFormsModule,
        ImageCropperModule,
        RouterTestingModule
      ],
      providers: [
        {provide: UsersService, use: UsersServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class UsersServiceStub {}
