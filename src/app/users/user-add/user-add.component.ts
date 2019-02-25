import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../shared/users.service';
import {FileService} from '../../files/shared/file.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userFormGroup: FormGroup;
  fileToUpload: File;
  imageChangedEvent: any = '';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private us: UsersService,
              private fs: FileService) {
    this.userFormGroup = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit() {
  }

  addProduct() {
    const productData = this.userFormGroup.value;
    if (this.fileToUpload) {
      this.fs.upload(this.fileToUpload)
        .pipe(
          switchMap(metadata => {
            productData.pictureId = metadata.id;
            return this.us.addProduct(productData);
          })
        )
        .subscribe(product => {
          this.router.navigate(['../'],
            {relativeTo: this.activatedRoute});
          // window.alert('product with id: ' + product.id + ' and name : ' + product.name + 'is added');
        });
    }
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
    // Going away soon.. Bye bye..
    this.fileToUpload = event.target.files[0];
  }

}
