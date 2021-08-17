import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../DTO/auth.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.cookieService.delete('admin-cookie');
    this.authService.setCurrentUser(null);
    return this.router.navigateByUrl('/');
  }

}
