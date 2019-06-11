import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activeTab = 'groups';
  onSelect(selected: string): void {
    this.activeTab = selected;
  }
}
