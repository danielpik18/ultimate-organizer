import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { WindowsManagerService } from 'src/app/services/windows-manager.service';

@Component({
  selector: 'app-draggable-window',
  templateUrl: './draggable-window.component.html',
  styleUrls: ['./draggable-window.component.scss']
})
export class DraggableWindowComponent implements OnInit {
  @Input() windowTitle: string;
  @Input() windowHeight: string;
  @Input() windowWidth: string;
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;
  windows: string[];

  // tslint:disable-next-line: variable-name
  constructor(private windowsManager: WindowsManagerService, private _eref: ElementRef) {
  }

  @HostListener('document:click', ['$event']) toggleWindowFocus(event: Event) {
    if (this.wrapper) {
      if (this._eref.nativeElement.contains(event.target)) {
        this.wrapper.nativeElement.classList.add('window-active');
      } else {
        this.wrapper.nativeElement.classList.remove('window-active');
      }
    }
  }

  ngOnInit() {
    this.windowsManager.getWindows().subscribe(windows => this.windows = windows);
  }

  closeWindow() {
    this.windowsManager.updateWindows(this.windows.filter(window => window !== this.windowTitle));
  }
}
