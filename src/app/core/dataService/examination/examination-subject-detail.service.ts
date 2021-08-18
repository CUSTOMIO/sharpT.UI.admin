import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ExaminationSubjectDetail } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExaminationSubjectDetailService {

  constructor(private http: HttpClient) { }

  public getExaminationSubjectDetail(examinationId: number) {
    const url = `${environment.api_endpoint}/examinationSubjectDetail/${examinationId}`;
    return this.http.get<ExaminationSubjectDetail[]>(url)
      .pipe(
        map(data =>
          data.map(x => new ExaminationSubjectDetail(x))
        )
      );
  }

}
