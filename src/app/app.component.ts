import { Component } from '@angular/core';
import { AuthService } from './core/dataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sharpTadmin';

  constructor(private authService: AuthService) {
    //this.authService.autoAuthUser();
  }
  ngOnInit() {
  }
}
