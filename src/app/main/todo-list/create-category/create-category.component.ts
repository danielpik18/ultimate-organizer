import { Component, OnInit } from '@angular/core';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss', './../task-category/task-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  editModeSubject: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor(private _colorPalette: ColorPaletteService) { }

  ngOnInit() {
  }

}
