import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {HttpClient} from "@angular/common/http";

interface RespAuth {
  status: string,
  message: string,
  token: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private userData: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

 private loggedIn = false;


  constructor(private http: HttpClient) { }

  setCurrentUser(user: UserModel): void {
    this.userData.next(user);
    if(user != null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  getCurrentUser(): Observable<UserModel> {
    return this.userData;
  }

  loginUser(email: string, password: string): Observable<RespAuth> {
    return this.http.post<RespAuth>('/user/login', {email , password});
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    })

    return promise;
  }



}
