import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { UsersDetail, UserName, UserEnrollDate, UserStandard, UserSubject, UserByStandardId } from '../../model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(pageSize: number, currentPage: number, filterStandardId, filterStatus): Observable<UsersDetail[]> {
    const url = `${environment.api_endpoint}/adminUser?pageSize=${pageSize}&page=${currentPage}&standardId=${filterStandardId}&isVerified=${filterStatus}`;
    return this.http.get<UsersDetail[]>(url)
      .pipe(
        map(data =>
          data.map(x => new UsersDetail(x))
        ));
  }

  public getUserBySId(pageSize: number, currentPage: number, standardId: number): Observable<UserByStandardId[]> {
    const url = `${environment.api_endpoint}/userBySId/${standardId}?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<UserByStandardId[]>(url)
      .pipe(
        map(data =>
          data.map(x => new UserByStandardId(x))
        ));
  }


  public getUserName(userId: number): Observable<UserName> {
    const url = `${environment.api_endpoint}/userName/${userId}`;
    return this.http.get<UserName>(url);
  }

  public getUserImage(userId: number): Observable<{ image: string }> {
    const url = `${environment.api_endpoint}/userImage/${userId}`;
    return this.http.get<{ image: string }>(url);
  }

  public getUserPN(userId: number): Observable<{ studentPN: bigint }> {
    const url = `${environment.api_endpoint}/userPN/${userId}`;
    return this.http.get<{ studentPN: bigint }>(url);
  }

  public getUserPPN(userId: number): Observable<{ parentPN: bigint }> {
    const url = `${environment.api_endpoint}/userPPN/${userId}`;
    return this.http.get<{ parentPN: bigint }>(url);
  }

  public getUserAddress(userId: number): Observable<{ address: string }> {
    const url = `${environment.api_endpoint}/userAddress/${userId}`;
    return this.http.get<{ address: string }>(url);
  }

  public getUserSchool(userId: number): Observable<string> {
    const url = `${environment.api_endpoint}/userSchool/${userId}`;
    return this.http.get<string>(url);
  }

  public getUserStatus(userId: number): Observable<{status : boolean}> {
    const url = `${environment.api_endpoint}/userStatus/${userId}`;
    return this.http.get<{status : boolean}>(url);
  }

  public getUserEnrollDate(userId: number): Observable<UserEnrollDate> {
    const url = `${environment.api_endpoint}/userEnrollDate/${userId}`;
    return this.http.get<UserEnrollDate>(url);
  }

  public getUserStandard(userId: number): Observable<UserStandard> {
    const url = `${environment.api_endpoint}/userStandard/${userId}`;
    return this.http.get<UserStandard>(url);
  }

  public getUserSubject(userId: number): Observable<UserSubject[]> {
    const url = `${environment.api_endpoint}/userSubject/${userId}`;
    return this.http.get<UserSubject[]>(url)
      .pipe(
        map(data =>
          data.map(x => new UserSubject(x))
        ));
  }
  public getUserEmail(userId: number): Observable<{ email: string }> {
    const url = `${environment.api_endpoint}/userEmail/${userId}`;
    return this.http.get<{ email: string }>(url);
  }

  public getUserCount(filterStandardId, filterStatus ): Observable<{ count: number}> {
    const url = `${environment.api_endpoint}/userCount?standardId=${filterStandardId}&isVerified=${filterStatus}`;
    return this.http.get<{ count: number }>(url);
  }

  public getUserUnverifiedCount(): Observable<{ count: number }> {
    const url = `${environment.api_endpoint}/unverifiedUserCount`;
    return this.http.get<{ count: number }>(url);
  }

  public postUserImage(image: FormData) {
    const url = `${environment.api_endpoint}/updateUserImage`;
    return this.http.post<{ message: boolean }>(url, image);
  }

  public postUserData(form: FormGroup, userId: number) {
    const url = `${environment.api_endpoint}/updateUserData/${userId}`;
    return this.http.post<{ message: boolean }>(url, form);
  }

  public postUserStandard (form: FormGroup, userId: number) {
    const url = `${environment.api_endpoint}/updateUserStandard/${userId}`;
    return this.http.post<{ message: boolean }>(url, form);
  }

  
  public postVerifyUser ( userId: number, email: string, standard: number) {
    const form = {
      email,
      standard
    };
    const url = `${environment.api_endpoint}/verifyUser/${userId}`;
    return this.http.post<{ message: boolean }>(url, form);
  }

  public postRefuteUser ( userId: number, email: string, standard: number) {
    const form = {
      email,
      standard
    };
    const url = `${environment.api_endpoint}/refuteUser/${userId}`;
    return this.http.post<{ message: boolean }>(url, form);
  }

}
