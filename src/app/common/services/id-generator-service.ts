import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  generateID(): string {
    return crypto.randomUUID();
  }

  generateOLDID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
}
