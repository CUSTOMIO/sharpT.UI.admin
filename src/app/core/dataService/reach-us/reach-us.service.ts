import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ReachUs } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ReachUsService {

  constructor(private http: HttpClient) { }

  public getReachus (pageSize: number, currentPage: number) {
    const url = `${environment.api_endpoint}/reachus?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<ReachUs[]>(url)
      .pipe(
        map(data =>
          data.map(x => new ReachUs(x))
        )
      );
  }

  public reachUsCount() {
    const url = `${environment.api_endpoint}/reachUsCount`;
    return this.http.get<{ count: number }>(url)
  }

  public reachUsUnreadCount() {
    const url = `${environment.api_endpoint}/reachusUnreadCount`;
    return this.http.get<{ count: number }>(url)
  }

  public reachUsRead(form: object, id: number) {
    const url = `${environment.api_endpoint}/reachUs/${id}`;
    return this.http.post<{ message: boolean }>(url, form)
  }

}
