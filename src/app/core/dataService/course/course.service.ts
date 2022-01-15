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

  public getAdminCourse(pageSize: number, currentPage: number,  filterStatus) {
    const url = `${environment.api_endpoint}/adminCourse?pageSize=${pageSize}&page=${currentPage}&isActive=${filterStatus}`;
    return this.http.get<Course[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Course(x))
        )
      );
  }
  public postEditCours(form: object, id:number) {
    const url = `${environment.api_endpoint}/editAdminCourse/${id}`;
    return this.http.post<{message: string}>(url, form)
  }
  public postAddCourse(form: object) {
    const url = `${environment.api_endpoint}/addAdminCourse`;
    return this.http.post<{message: string}>(url, form)
  }

  public courseCount(filterStatus){
    const url = `${environment.api_endpoint}/courseCount?&isActive=${filterStatus}`;
    return this.http.get<{count: number}>(url)
  }
}
