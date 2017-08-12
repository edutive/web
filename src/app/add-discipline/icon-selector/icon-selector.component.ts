import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['../add-discipline.component.scss']
})
export class IconSelectorComponent {
  selected: string = 'user';

  selectIcon(icon: string) {
    this.selected = icon;
  }
}
