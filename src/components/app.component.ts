import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentAuthStatus.subscribe(authStatus => this.isAuthenticated = authStatus ? true : false);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
