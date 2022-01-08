import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Notice } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NoticeService {

    constructor(private http: HttpClient) { }

    public getNotice(pageSize: number, currentPage: number) {
        const url = `${environment.api_endpoint}/adminNotice?pageSize=${pageSize}&page=${currentPage}`;
        return this.http.get<Notice[]>(url)
          .pipe(
            map(data =>
              data.map(x => new Notice(x))
            )
          );
      }

  public postEditNotice(form: object, id: number) {
    const url = `${environment.api_endpoint}/editNotice/${id}`;
    return this.http.post<{message: string}>(url, form);
  }

  public postAddNotice(form: object) {
    const url = `${environment.api_endpoint}/addNotice`;
    return this.http.post<{message: string}>(url, form);
  }

}
