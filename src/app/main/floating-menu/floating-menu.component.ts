import { Component, OnInit } from '@angular/core';
import { WindowsManagerService } from 'src/app/services/windows-manager.service';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss']
})
export class FloatingMenuComponent implements OnInit {
  windows: string[] = [];

  constructor(private windowsManager: WindowsManagerService) { }

  ngOnInit() {
    this.windowsManager.getWindows().subscribe(windows => this.windows = windows);
  }

  toggleWindows(windowTitle: string) {
    if (this.windows.includes(windowTitle)) {
      this.windowsManager.updateWindows(this.windows.filter(window => window !== windowTitle));
    } else {
      this.windows.push(windowTitle);
      this.windowsManager.updateWindows(this.windows);
    }
  }

}
