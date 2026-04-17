import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  authService = inject(AuthService);
  isLoggedIn = false;

  userEmail = '';
  ngOnInit(): void {
    this.authService.token$.subscribe(() => {
      this.userEmail = this.authService.getToken() || '';
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
}
