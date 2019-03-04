import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Observable, from} from 'rxjs';
import {FileService} from '../../files/shared/file.service';
import {ImageMetadata} from '../../files/shared/image-metadata';

const collection_path = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFirestore,
              private fs: FileService) {
  }

  getUsers(): Observable<User[]> {
    return this.db
      .collection<User>(collection_path)
      // This will return an Observable
      .snapshotChanges()
      .pipe(
        map(actions => {
          // actions is an array of DocumentChangeAction
          return actions.map(action => {
            const data = action.payload.doc.data() as User;
            return {
              id: action.payload.doc.id,
              name: data.name,
              pictureId: data.pictureId
            };
          });
        })
      );
  }

  deleteUser(id: string): Observable<User> {
    return this.db.doc<User>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
          // debugger;
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            throw new Error('Product not found');
            // debugger;
          } else {
            return from(
              this.db.doc<User>(collection_path + '/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = productDocument.data() as User;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
    /*return Observable.create(obs => {
      this.db.doc<Product>('products/' + id)
        .delete()
        .then(() => obs.next())
        .catch(err => obs.error(err))
        .finally(() => obs.complete());
    });*/
    /*return this.db.doc<Product>('products/' + id)
      .delete();*/
  }

  addUserWithImage(product: User, imageMeta: ImageMetadata)
    : Observable<User> {
    if (imageMeta && imageMeta.fileMeta
      && imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image)) {
      return this.fs.uploadImage(imageMeta)
        .pipe(
          switchMap(metadata => {
            product.pictureId = metadata.id;
            return this.addUser(product);
          })
        );
    } else {
      throw Error('You need better metadata');
    }
  }

  private addUser(product: User): Observable<User> {
    return from(
      this.db.collection('users').add(
        {
          name: product.name,
          pictureId: product.pictureId
        }
      )
    ).pipe(
      map(productRef => {
        product.id = productRef.id;
        return product;
      })
    );
  }

  /* constructor(private db: AngularFirestore) {
  }

  getProducts(): Observable<User[]> {
    return this.db
      .collection<User>(collection_path)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as User;
            return {
              id: action.payload.doc.id,
              name: data.name,
              pictureId: data.pictureId
            };
          });
        })
      );
  }

  deleteProduct(id: string): Observable<User> {
    return this.db.doc<User>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            throw new Error('Product not found');
          } else {
            return from(
              this.db.doc<User>(collection_path + '/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = productDocument.data() as User;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
  }

  addProduct(user: User): Observable<User> {
    return from(
      this.db.collection('users').add(
        {
          name: user.name,
          pictureId: user.pictureId
        }
      )
    ).pipe(
      map(userRef => {
        user.id = userRef.id;
        return user;
      })
    );
  }*/
}
