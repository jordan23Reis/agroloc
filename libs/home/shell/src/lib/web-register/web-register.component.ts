import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'agroloc-web-register',
  templateUrl: './web-register.component.html',
  styleUrls: ['./web-register.component.scss'],
})
export class WebRegisterComponent {
  section: Tile[] = [{ text: 'Two', cols: 4, rows: 20, color: 'lightgreen' }];
  footer: Tile[] = [{ text: 'Three', cols: 4, rows: 1, color: 'lightpink' }];
}
