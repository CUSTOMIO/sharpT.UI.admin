import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ExaminationType } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExaminationService {

  constructor(private http: HttpClient) { }

  public getExamination(pageSize: number, currentPage: number) {
    const url = `${environment.api_endpoint}/getExamination?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<ExaminationType[]>(url)
      .pipe(
        map(data =>
          data.map(x => new ExaminationType(x))
        )
      );
  }

  public examinationCount(){
    const url = `${environment.api_endpoint}/getExaminationCount`;
    return this.http.get<{count: number}>(url)
  }

  public postEditExamination(form: object, id:number) {
    const url = `${environment.api_endpoint}/editExamination/${id}`;
    return this.http.post<{message: boolean}>(url, form)
  }
  
  public postAddExamination(form: object) {
    const url = `${environment.api_endpoint}/addExamination`;
    return this.http.post<{message: string}>(url, form)
  }
}
