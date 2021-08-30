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

  public getAdminCourse(pageSize: number, currentPage: number, filterBatchId, filterStatus) {
    const url = `${environment.api_endpoint}/getAdminCourse?pageSize=${pageSize}&page=${currentPage}&batchId=${filterBatchId}&isActive=${filterStatus}`;
    return this.http.get<Course[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Course(x))
        )
      );
  }
  public postEditCours(form: object, id:number) {
    const url = `${environment.api_endpoint}/postEditAdminCourse/${id}`;
    return this.http.post<{message: string}>(url, form)
  }
  public postAddCourse(form: object) {
    const url = `${environment.api_endpoint}/postAddAdminCourse`;
    return this.http.post<{message: string}>(url, form)
  }

  public courseCount(filterBatchId, filterStatus){
    const url = `${environment.api_endpoint}/getCourseCount?batchId=${filterBatchId}&isActive=${filterStatus}`;
    return this.http.get<{count: number}>(url)
  }
}
