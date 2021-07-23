import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
        }),
      password: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm);
  }

}
