import { Component, OnInit } from '@angular/core';
import { WindowsManagerService } from 'src/app/services/windows-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  windows: string[] = [];

  constructor(private windowManager: WindowsManagerService) { }

  ngOnInit() {
    this.windowManager.getWindows().subscribe(windows => this.windows = windows);
  }
}
