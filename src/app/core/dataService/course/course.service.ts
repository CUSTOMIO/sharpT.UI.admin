import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Course } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private http: HttpClient) { }

  public getCourse() {
    const url = `${environment.api_endpoint}/course`;
    return this.http.get<Course[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Course(x))
        )
      );
  }

}
