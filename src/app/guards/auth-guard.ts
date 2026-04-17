import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../common/services/auth-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const loggedIn = this.authService.isLoggedIn();
        if (loggedIn) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      } else {
        resolve(true);
      }
    });
  }
}
