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

}
