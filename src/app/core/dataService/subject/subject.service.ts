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

  public getSubject(pageSize: number, currentPage: number, filterStandardId, filterStatus) {
    const url = `${environment.api_endpoint}/adminGetSubject?pageSize=${pageSize}&page=${currentPage}&standardId=${filterStandardId}&isActive=${filterStatus}`;
    return this.http.get<Subject[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Subject(x))
        )
      );
  }

  public getSubjectByStandardId(id: number) {
    const url = `${environment.api_endpoint}/subject/${id}`;
    return this.http.get<Subject[]>(url);
  }

  public postEditSubject(form: object, id: number) {
    const url = `${environment.api_endpoint}/adminEditSubject/${id}`;
    return this.http.post<{message: string}>(url, form)
  }

  public postAddSubject(form: object) {
    const url = `${environment.api_endpoint}/adminAddSubject`;
    return this.http.post<{message: string}>(url, form)
  }

  public subjectCount(filterStandardId, filterStatus){
    const url = `${environment.api_endpoint}/subjectCount?standardId=${filterStandardId}&isActive=${filterStatus}`;
    return this.http.get<{count: number}>(url)
  }
}
