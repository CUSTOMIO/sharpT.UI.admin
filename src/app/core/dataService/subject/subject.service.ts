import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Subject } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

  constructor(private http: HttpClient) { }

  public getSubject(pageSize: number, currentPage: number) {
    const url = `${environment.api_endpoint}/adminEditSubject?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<Subject[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Subject(x))
        )
      );
  }
  public postEditSubject(form: object, id:number) {
    const url = `${environment.api_endpoint}/adminSubject/${id}`;
    return this.http.post<{message: string}>(url, form)
  }
  public postAddSubject(form: object) {
    const url = `${environment.api_endpoint}/adminAddSubject`;
    return this.http.post<{message: string}>(url, form)
  }
}
