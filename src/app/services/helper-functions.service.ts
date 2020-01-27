import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsService {

  getCurrentTimeIn12HourFormat() {
    const now = new Date();
    now.setHours(now.getHours());

    const isPM = now.getHours() >= 12;
    const isMidday = now.getHours() === 12;

    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    const time =
    [
      nowHours - (isPM && !isMidday ? 12 : 0),
      nowMinutes.toString().length === 1 ? '0' + nowMinutes : nowMinutes
    ]
    .join(':') + (isPM ? ' pm' : ' am');

    return time;
  }

  findParentElementByClass(initialElement: Element, className: string){
    let targetElement: Element;


    while (initialElement.parentElement) {
      initialElement = initialElement.parentElement;

      if(initialElement.className === className){
        targetElement = initialElement;
        break;
      }
    }

    return targetElement;
  }

  constructor() { }
}
