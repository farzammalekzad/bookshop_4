import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from "@angular/common/http";
import {Observable} from 'rxjs';
import {DomainUrl} from './domain';
import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class interceptor implements HttpInterceptor {
  constructor(public cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.cookieService.get('admin-cookie');
    const myRequest = req.clone({
      url: DomainUrl + req.url,
      headers: req.headers.append('Authorization', 'bearer ' + token)
    });

    return next.handle(myRequest);
  }
}
