import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { WindowsManagerService } from 'src/app/services/windows-manager.service';

@Component({
  host: {
    '(document:click)': 'removeFocus($event)'
  },
  selector: 'app-draggable-window',
  templateUrl: './draggable-window.component.html',
  styleUrls: ['./draggable-window.component.scss']
})
export class DraggableWindowComponent implements OnInit {
  @Input() windowTitle: string;
  @Input() windowHeight: string;
  @Input() windowWidth: string;
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;
  windows: string[] = [];


  constructor(private windowsManager: WindowsManagerService, private _eref: ElementRef) {
  }

  ngOnInit() {
    this.windowsManager.getWindows().subscribe(windows => this.windows = windows);
  }

  isWindowOpen() {
    if (this.windows.length > 0) {
      return this.windows.includes(this.windowTitle);
    }
  }

  closeWindow() {
    this.windowsManager.updateWindows(this.windows.filter(window => window !== this.windowTitle));
  }

  focusWindow() {
    this.wrapper.nativeElement.classList.add('wrapper-active');
  }

  removeFocus(event) {
    if (!this._eref.nativeElement.contains(event.target))
      if (this.wrapper) {
        this.wrapper.nativeElement.classList.remove('wrapper-active');
      }
  }
}
