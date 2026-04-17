import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../common/services/auth-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!isPlatformBrowser(this.platformId)) {
        const loggedIn = this.authService.isLoggedIn();
        if (loggedIn) {
          resolve(true);
        } else {
          this.router.navigate(['/dashboard']);
          resolve(false);
        }
      } else {
        resolve(true);
      }
    });
    // const loggedIn = this.authService.isLoggedIn();
    // if (loggedIn) {
    //   this.router.navigate(['/dashboard']);
    //   return false;
    // } else {
    //   return true;
    // }
  }
}
