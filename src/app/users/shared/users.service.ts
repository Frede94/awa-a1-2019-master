import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Observable} from 'rxjs/internal/Observable';
import {from} from 'rxjs/internal/observable/from';

const collection_path = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFirestore) {
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
  }
}
