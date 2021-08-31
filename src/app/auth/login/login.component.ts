import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/dataService';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  public isLoading = true;
  public spinnerLoading = false;
  public invalidLogin: boolean;


  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      password: ['',
        [Validators.required]
      ]
    });
    this.isLoading = false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinnerLoading = true;
      this.authService.postlogin(this.loginForm.value);
      this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.spinnerLoading = isAuthenticated;
          if (!isAuthenticated) {
            this.invalidLogin = true;
          }
        });
    }
  }
}
