import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/dataService';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    public isLoading: boolean = true;

    constructor(private fb: FormBuilder,
        private authService: AuthService) {
        this.loginForm = this.fb.group({
            email: ['',
                [Validators.required, Validators.email,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
            ],
            password: ['',
                [Validators.required]
            ]
        });
        this.isLoading = false;
    }

    onSubmit() {
        this.isLoading = true
        const observer = {
            next: x => {
                this.isLoading = false;
            },
            error: err => console.error('Observer got an error: ' + err)
        };
        if (this.loginForm.valid) {
            this.authService.postlogin(this.loginForm.value)
        }
    }
}


