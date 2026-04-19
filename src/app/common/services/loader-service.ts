import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private requestsInProgress = 0;
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  show() {
    // this.requestsInProgress++;
    this.loading.next(true);
  }
  hide() {
    setTimeout(() => {
      // this.requestsInProgress--;
      // if (this.requestsInProgress <= 0) {
      this.requestsInProgress = 0;
      this.loading.next(false);
      // }
    }, 500);
  }
}
