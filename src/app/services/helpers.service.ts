import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  extractId(url: string) {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }
}
