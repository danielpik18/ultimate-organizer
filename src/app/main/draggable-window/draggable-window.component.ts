import { Component, OnInit } from '@angular/core';
import { WindowsManagerService } from 'src/app/services/windows-manager.service';

@Component({
  selector: 'app-draggable-window',
  templateUrl: './draggable-window.component.html',
  styleUrls: ['./draggable-window.component.scss']
})
export class DraggableWindowComponent implements OnInit {
  windows: string[] = [];


  constructor(private windowsManager: WindowsManagerService) {
  }

  ngOnInit() {
    this.windowsManager.getWindows().subscribe(windows => this.windows = windows);
  }

  isWindowOpen(windowTitle: string) {
    if (this.windows.length > 0) {
      return this.windows.includes(windowTitle);
    }
  }

  closeWindow(windowTitle: string) {
    this.windowsManager.updateWindows(this.windows.filter(window => window !== windowTitle))
  }
}
