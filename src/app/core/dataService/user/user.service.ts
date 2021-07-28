import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { UsersDetail, UserName, UserEnrollDate, UserStandard, UserSubject } from '../../model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(pageSize: number, currentPage: number): Observable<UsersDetail[]> {
    const url = `${environment.api_endpoint}/getAdminUser?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<UsersDetail[]>(url)
      .pipe(
        map(data =>
          data.map(x => new UsersDetail(x))
        ));
  }

  public getUserName(userId: number): Observable<UserName> {
    const url = `${environment.api_endpoint}/getUserName/${userId}`;
    return this.http.get<UserName>(url);
  }

  public getUserImage(userId: number): Observable<{ image: string }> {
    const url = `${environment.api_endpoint}/getUserImage/${userId}`;
    return this.http.get<{ image: string }>(url);
  }

  public getUserPN(userId: number): Observable<{ studentPN: bigint }> {
    const url = `${environment.api_endpoint}/getUserPN/${userId}`;
    return this.http.get<{ studentPN: bigint }>(url);
  }

  public getUserPPN(userId: number): Observable<{ parentPN: bigint }> {
    const url = `${environment.api_endpoint}/getUserPPN/${userId}`;
    return this.http.get<{ parentPN: bigint }>(url);
  }

  public getUserAddress(userId: number): Observable<{ address: string }> {
    const url = `${environment.api_endpoint}/getUserAddress/${userId}`;
    return this.http.get<{ address: string }>(url);
  }

  public getUserSchool(userId: number): Observable<string> {
    const url = `${environment.api_endpoint}/getUserSchool/${userId}`;
    return this.http.get<string>(url);
  }

  public getUserStatus(userId: number): Observable<boolean> {
    const url = `${environment.api_endpoint}/getUserStatus/${userId}`;
    return this.http.get<boolean>(url);
  }

  public getUserEnrollDate(userId: number): Observable<UserEnrollDate> {
    const url = `${environment.api_endpoint}/getUserEnrollDate/${userId}`;
    return this.http.get<UserEnrollDate>(url);
  }

  public getUserStandard(userId: number): Observable<UserStandard> {
    const url = `${environment.api_endpoint}/getUserStandard/${userId}`;
    return this.http.get<UserStandard>(url);
  }

  public getUserSubject(userId: number): Observable<UserSubject[]> {
    const url = `${environment.api_endpoint}/getUserSubject/${userId}`;
    return this.http.get<UserSubject[]>(url)
      .pipe(
        map(data =>
          data.map(x => new UserSubject(x))
        ));
  }
  public getUserEmail(userId: number): Observable<{ email: string }> {
    const url = `${environment.api_endpoint}/getUserEmail/${userId}`;
    return this.http.get<{ email: string }>(url);
  }
}
