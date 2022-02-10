import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Standard, StandardRate } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StandardService {

  constructor(private http: HttpClient) { }

  public getStandard() {
    const url = `${environment.api_endpoint}/standard `;
    return this.http.get<Standard[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Standard(x))
        )
      );
  }

  public getAdminStandard(pageSize: number, currentPage: number, filterCourseId, filterStatus, filterSubjectSelection) {
    const url = `${environment.api_endpoint}/adminstandard?pageSize=${pageSize}&page=${currentPage}&courseId=${filterCourseId}&isActive=${filterStatus}&subjectSelection=${filterSubjectSelection}`;
    return this.http.get<Standard[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Standard(x))
        )
      );
  }
  public postEditStandard(form: object, id:number) {
    const url = `${environment.api_endpoint}/editAdminStandard/${id}`;
    return this.http.post<{message: string}>(url, form)
  }
  public postAddStandard(form: object) {
    const url = `${environment.api_endpoint}/addAdminStandard`;
    return this.http.post<{message: string}>(url, form)
  }

  public standardCount(filterCourseId, filterStatus, filterSubjectSelection){
    const url = `${environment.api_endpoint}/standardCount?courseId=${filterCourseId}&isActive=${filterStatus}&subjectSelection=${filterSubjectSelection}`;
    return this.http.get<{count: number}>(url)
  }

  public getStandardRate() {
    const url = `${environment.api_endpoint}/standardRate`;
    return this.http.get<StandardRate[]>(url)
      .pipe(
        map(data =>
          data.map(x => new StandardRate(x))
        )
      );
  }
  
}
