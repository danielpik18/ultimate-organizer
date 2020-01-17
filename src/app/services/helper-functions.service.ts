import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsService {

  getCurrentTimeIn12HourFormat() {
    const now = new Date();
    now.setHours(now.getHours());
    const isPM = now.getHours() >= 12;
    const isMidday = now.getHours() == 12;
    const time = [now.getHours() - (isPM && !isMidday ? 12 : 0),
    now.getMinutes()].join(':') +
      (isPM ? ' pm' : 'am');

    return time
  }

  constructor() { }
}
