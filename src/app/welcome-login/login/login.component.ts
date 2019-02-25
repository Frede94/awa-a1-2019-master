import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /*loginForm = new FormGroup({
    username = new FormControl(''),
    password = new FormControl('')
  });*/

  submitted = false;
  loading = false;
  errormessage = '';

  constructor() {
  }

  ngOnInit() {
    /*this.loginForm = this.formBuilder.group({
      username: [''], // , Validators.required
      password: ['']  // , Validators.required
    });*/
  }

  /*onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  }*/
}
