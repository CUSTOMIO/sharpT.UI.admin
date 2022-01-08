import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { Otp } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OtpService {

  constructor(private http: HttpClient) { }

  public getOtp(pageSize: number, currentPage: number) {
    const url = `${environment.api_endpoint}/otp?pageSize=${pageSize}&page=${currentPage}`;
    return this.http.get<Otp[]>(url)
      .pipe(
        map(data =>
          data.map(x => new Otp(x))
        )
      );
  }

  public otpCount(){
    const url = `${environment.api_endpoint}/otpCount`;
    return this.http.get<{count: number}>(url)
  }
}
