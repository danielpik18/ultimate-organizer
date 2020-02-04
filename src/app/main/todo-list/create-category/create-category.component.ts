import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss', './../task-category/task-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  @Output() onClickAway: EventEmitter<any> = new EventEmitter();

  @ViewChild('categoryIcon', { static: true }) categoryIcon: ElementRef;

  editModeSubject: BehaviorSubject<any> = new BehaviorSubject(true);
  _clickAwayOmittedFirst = false;

  categoryTitle: string = "";
  categoryColor: string = this._colorPalette.getColorHex('blue');

  constructor(private _colorPalette: ColorPaletteService) { }

  ngOnInit() {
  }

  changeIcon(iconClassNames: string) {
    this.categoryIcon.nativeElement.classList.remove(this.categoryIcon.nativeElement.classList.item(3));

    iconClassNames.split(" ").forEach(className => {
      this.categoryIcon.nativeElement.classList.add(className);
    });
  }

  changeIconColor(color: string) {
    this.categoryColor = color;
  }

  returnCategoryData(){
    if(this.categoryTitle){
      const categoryData = {
        title: this.categoryTitle,
        color: this.categoryColor,
        faIconClass: `${this.categoryIcon.nativeElement.classList[2]} ${this.categoryIcon.nativeElement.classList[3]}`
      };

      this.onClickAway.emit(categoryData);
    } else {
      this.onClickAway.emit();
    }
  }
}
