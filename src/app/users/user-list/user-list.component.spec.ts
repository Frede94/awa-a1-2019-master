import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import {UsersService} from '../shared/users.service';
import {FileService} from '../../files/shared/file.service';
import {Observable} from 'rxjs/internal/Observable';
import {User} from '../shared/user.model';
import {of} from 'rxjs/internal/observable/of';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {Location} from '@angular/common';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserListComponent,
        DummyComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: 'registrer', component: DummyComponent}
          ]
        )
      ],
      providers: [
        {provide: UsersService, useClass: UsersServiceStub},
        {provide: FileService, useClass: FileServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain an h2 tag', () => {
    const h2Ele = fixture.debugElement.query(By.css('h2'));
    expect(h2Ele.nativeElement.textContent).toBe('List of Users');
  });
  it('Should minimum be one "Registrer" button on the page', () => {
    const linkDes = fixture.debugElement
      .queryAll(By.css('button'));
    expect(linkDes.length >= 1).toBeTruthy();
    // expect(dh.count('button')).toBeGreaterThanOrEqual(1);
  });
  it('Should be a Registrer button first on the page', () => {
    const linkDes = fixture.debugElement
      .queryAll(By.css('button'));
    const nativeBtn: HTMLButtonElement = linkDes[0].nativeElement;
    expect(nativeBtn.textContent).toBe('Registrer');
    // expect(dh.singleText('button')).toBe('+');
  });

  it('Should navigate to / before Registrer button click',
    () => {
      // find DebugElements with an attached RouterLinkStubDirective
      const location = TestBed.get(Location);
      expect(location.path()).toBe('');
    }
  );

  it('Should navigate to /registrer on Registrer button click',
    () => {
    const location = TestBed.get(Location);
    const linkDes = fixture.debugElement
      .queryAll(By.css('button'));
    const nativeBtn: HTMLButtonElement = linkDes[0].nativeElement;
    nativeBtn.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/registrer');
    });
    /*const router: Router = TestBed.get(Router);
      spyOn(router, 'navigateByUrl');
      dh.clickButton('+');
      expect(router.navigateByUrl).
      toHaveBeenCalledWith(router.createUrlTree(['/add']),
        { skipLocationChange: false, replaceUrl: false });*/
    });
  it ('Should only show 1 Table item', () => {
    const table = fixture.debugElement
      .queryAll(By.css('table'));
    expect(table.length).toBe(1);
  });
  it('Should Oonly show headers when no users are available', () => {
    const tableItem = fixture.debugElement
      .queryAll(By.css('tr'));
    expect(tableItem.length).toBe(1);
  });
  it('Should show 1 table item besides headers ', () => {
    component.users = of([
      {id: '1337', name: 'user1', pictureId: 'def', url: 'http://www.snap.com'}
    ]);
    fixture.detectChanges();
    const tableItem = fixture.debugElement
      .queryAll(By.css('tr'));
    expect(tableItem.length).toBe(2);
  });
});

@Component({template: ''})
class DummyComponent {}

class UsersServiceStub {
  getUsers(): Observable<User[]> {
    return of ([]);
  }
}
class FileServiceStub {}

