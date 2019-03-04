import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {map, switchMap, tap} from 'rxjs/operators';
import {defer, from, Observable} from 'rxjs';
import {FileService} from '../../files/shared/file.service';
import {UsersService} from '../shared/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  constructor(private us: UsersService,
              private fs: FileService) {
  }

  ngOnInit() {
    this.users = this.us.getUsers()
      .pipe(
        tap(users => {
          users.forEach(user => {
            if (user.pictureId) {
              this.fs.getFileUrl(user.pictureId)
                .subscribe(url => {
                  user.url = url;
                });
            }
          });
        })
      );
  }

  deleteUsers(user: User) {
    const obs = this.us.deleteUser(user.id);
    obs.subscribe(productFromFirebase => {
      window.alert('product with id: ' + productFromFirebase.id + ' is Deleted');
    }, error1 => {
      window.alert('product not found id: ' + user.id);
    });
  }
}
