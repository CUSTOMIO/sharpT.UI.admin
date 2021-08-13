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

}
