import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { User } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(pageSize: number, currentPage: number){
    const url = `${environment.api_endpoint}/getAdminUser?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<User[]>(url)
    .pipe(
        map(data =>
          data.map(x => new User(x))
        )
      );
  }
}
