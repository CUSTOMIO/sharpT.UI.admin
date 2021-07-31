import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ExaminationDetail } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExaminationDetailService {

  constructor(private http: HttpClient) { }

  public getExaminationDetail(pageSize: number, currentPage: number) {
    const url = `${environment.api_endpoint}/getExaminationDetail?pageSize=${pageSize}&page=${currentPage}`;
    // const url = `${environment.api_endpoint}/getExaminationDetail`;
    return this.http.get<ExaminationDetail[]>(url)
      .pipe(
        map(data =>
          data.map(x => new ExaminationDetail(x))
        )
      );
  }

  public postEditExaminationDetail(form: object, id: number) {
    const url = `${environment.api_endpoint}/editExaminationDetail/${id}`;
    return this.http.post<{message: boolean}>(url, form);
  }

  public postAddExaminationDetail(form: object) {
    const url = `${environment.api_endpoint}/addExaminationDetail`;
    return this.http.post<{message: boolean}>(url, form);
  }
}
