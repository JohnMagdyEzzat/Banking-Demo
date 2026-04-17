import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  login(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token); //Prefer HttpOnly cookies
    }
    this.tokenSubject.next(token);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.tokenSubject.next(null);
  }

  isLoggedIn(): any {
    try {
      const token = localStorage.getItem(this.tokenKey);
      return !!token;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(this.tokenKey) : null;
  }
}
