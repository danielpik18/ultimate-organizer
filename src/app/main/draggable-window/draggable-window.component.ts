import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { WindowsManagerService } from 'src/app/services/windows-manager.service';

@Component({
  selector: 'app-draggable-window',
  templateUrl: './draggable-window.component.html',
  styleUrls: ['./draggable-window.component.scss']
})
export class DraggableWindowComponent implements OnInit {
  @Input() windowTitle: string;
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;
  windows: string[] = [];


  constructor(private windowsManager: WindowsManagerService) {
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
    console.log('hi m8');
    this.wrapper.nativeElement.classList.add('wrapper-active');
    console.log(this.wrapper.nativeElement.classList)
  }

  onClickedOutside() {
    console.log('hola')
    this.wrapper.nativeElement.classList.remove('wrapper-active');
  }
}
