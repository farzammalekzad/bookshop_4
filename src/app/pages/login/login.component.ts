import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../DTO/auth.service";
import {UserModel} from "../../model/user.model";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: UserModel

  constructor(private authService: AuthService,
              private router: Router,
              private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.email]
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
    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((resp) => {
      const user = {
        name: resp.name,
        token: resp.token
      }
      if (resp.status == 'success') {
        this.cookieService.set('admin-cookie', resp.token);
        this.authService.setCurrentUser(user);
        this.loginForm.reset();
        this.router.navigate(['panel']);
      } else {
        console.log(resp);
      }
    })
  }

}
