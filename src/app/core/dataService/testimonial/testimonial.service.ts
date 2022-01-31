import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Testimonial } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TestimonialService {

  constructor(private http: HttpClient) { }

  public getTestimonial(pageSize: number, currentPage: number) {
    // const url = `${environment.api_endpoint}/adminTestimonial?pageSize=${pageSize}&page=${currentPage}&standardId=${filterStandardId}&isActive=${filterStatus}`;
    const url = `${environment.api_endpoint}/adminTestimonial?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<Testimonial[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Testimonial(x))
        )
      );
  }

  public testimonialRead(email: string, id: number) {
    const form = {
      email
    };
    const url = `${environment.api_endpoint}/testimonial/${id}`;
    return this.http.post<{ message: boolean }>(url, form);
  }

}
