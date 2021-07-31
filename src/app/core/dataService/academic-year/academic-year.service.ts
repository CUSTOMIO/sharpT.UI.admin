import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { AcademicYear } from '../../model';

@Injectable({
  providedIn: 'root'
})

export class AcademicYearService {

  constructor(private http: HttpClient) { }

  public academicYear(){
    const url = `${environment.api_endpoint}/academicYear`;
    return this.http.get<AcademicYear[]>(url)
    .pipe(
        map(data =>
          data.map(x => new AcademicYear(x))
        )
      );
  }

}
