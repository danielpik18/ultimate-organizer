import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService {
  private colorPalette = {
    grey: '#ccc',
    grey_light: '#e2e2e2',
    grey_light2: '#f0f0f0',
    grey_dark: '#9c9c9c',
    grey_dark2: '#575757',

    red: '#df3737',
    red_light: '#e75757',
    red_dark: '#852a2a',

    blue: '#37a2df',
    blue_light: '#67b3e6',
    blue_dark: '#2a6485',

    green: '#37df53',
    green_light: '#67e66d',
    green_dark: '#2a852f'
  };

  constructor() { }

  getColorHex(name: string) {
    return this.colorPalette[name];
  }
}
