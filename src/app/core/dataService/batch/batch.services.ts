import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Batch } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BatchService {

  constructor(private http: HttpClient) { }

  public getAdminBatch(){
    const url = `${environment.api_endpoint}/getAdminBatch`;
    return this.http.get<Batch[]>(url)
    .pipe(
        map(data =>
          data.map(x => new Batch(x))
        )
      );
  }

  public batchCount(){
    const url = `${environment.api_endpoint}/getBatchCount`;
    return this.http.get<{count: number}>(url)
  }

}
