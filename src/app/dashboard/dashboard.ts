import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  userEmail = '';
  ngOnInit(): void {
    this.userEmail = this.authService.getToken() || '';
  }
}
