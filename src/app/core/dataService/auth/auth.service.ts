import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Login } from '../../model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  private  token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient,
    private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  postlogin(form: Login) {
    const url = `${environment.api_endpoint}/login`;
    return this.http.post<{token: string}>(url, form)
    .subscribe(res => {
      const token = res.token;
      if(token){
        this.token = token;
        this.router.navigate(['../subject'])
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
    })
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.router.navigate(['../login']);
    this.authStatusListener.next(false);
  }
}
