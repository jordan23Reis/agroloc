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
export class WebRegisterComponent {}
