import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Result } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  constructor(private http: HttpClient) { }

  public getResult(standardId: number) {
    const url = `${environment.api_endpoint}/getResult/${standardId}`;
    return this.http.get<Result[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Result(x))
        )
      );
  }

  public postAddResult(form, userId: number) {
    const url = `${environment.api_endpoint}/postAddResult/${userId}`;
    return this.http.post<{ message: boolean }>(url, form);
  }

  public postFetchResult(examinationDetailId: string, subjectArray: number[], userId: number) {
    const form = {
      examinationDetailId,
      subjectArray
    };
    const url = `${environment.api_endpoint}/postFetchResult/${userId}`;
    return this.http.post<{ message: boolean }>(url, form);
  }

}
