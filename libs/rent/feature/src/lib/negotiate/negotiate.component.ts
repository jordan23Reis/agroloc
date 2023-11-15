import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'agroloc-negotiate',
  templateUrl: './negotiate.component.html',
  styleUrls: ['./negotiate.component.scss'],
})
export class NegotiateComponent {
  platform = inject(Platform);
  isMobile = this.platform.ANDROID || this.platform.IOS;
}
