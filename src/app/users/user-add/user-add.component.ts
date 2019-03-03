import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../shared/users.service';
import {FileService} from '../../files/shared/file.service';
import {switchMap} from 'rxjs/operators';
import {ImageMetadata} from '../../files/shared/image-metadata';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private us: UsersService) {
    this.userFormGroup = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit() {
  }

  addUser() {
    const userData = this.userFormGroup.value;
    this.us.addUserWithImage(
      userData,
      this.getMetaDataForImage()
    ).subscribe(user => {
      this.router.navigate(['../'],
        {relativeTo: this.activatedRoute});
    });
  }

  private getMetaDataForImage(): ImageMetadata {
    if (this.imageChangedEvent && this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        imageBlob: this.croppedBlob,
        fileMeta: {
          name: fileBeforeCrop.name,
          type: 'image/png',
          size: fileBeforeCrop.size
        }
      };
    }
    return undefined;
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

 /* userFormGroup: FormGroup;
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
        });
    }
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
    // Going away soon.. Bye bye..
    this.fileToUpload = event.target.files[0];
  }*/

}
