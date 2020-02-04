import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  get fontAwesomeSolidIconClasses(){
    return [
      'archive',
      'baby',
      'blender',
      'bullhorn',
      'calendar-alt',
      'camera-retro',
      'chart-pie',
      'cloud-showers-heavy',
      'cog',
      'cubes',
      'dice',
      'envelope-open',
      'eye',
      'flask',
      'glass-martini-alt',
      'headset',
      'keyboard',
      'laptop',
      'magnet',
      'money-bill-wave',
      'motorcycle',
      'newspaper',
      'parachute-box',
      'paw',
      'pencil-ruler',
      'portrait',
      'running'
    ];
  }

  get fontAwesomeRegularIconClasses(){
    return [

    ];
  }

  constructor() { }
}
