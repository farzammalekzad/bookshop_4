import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../DTO/auth.service';
import {UserModel} from '../../model/user.model';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {catchError} from 'rxjs/operators';
import {Observable, observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('SwalSuccess') public readonly SwalSuccess: SwalComponent;
  @ViewChild('SwalFail') public readonly SwalFail: SwalComponent;
  @ViewChild('SwalFound') public readonly SwalFound: SwalComponent;
  loginForm: FormGroup;
  user: UserModel;
  errMsg: string;
  loading: false;

  constructor(private authService: AuthService,
              private router: Router,
              private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
        }),
      password: new FormControl(null, {
        updateOn: 'blur',
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
      };
      if (resp.status === 'success') {
        this.cookieService.set('admin-cookie', resp.token);
        this.authService.setCurrentUser(user);
        this.loginForm.reset();
        this.SwalSuccess.fire();
        this.router.navigate(['panel']);
      }
    }, (error => {
      this.errMsg = error.message;
      if (error.status === 401) {
        this.SwalFail.fire();
      } else if (error.status === 404) {
        this.SwalFound.fire();
      }
    }));
  }

}
