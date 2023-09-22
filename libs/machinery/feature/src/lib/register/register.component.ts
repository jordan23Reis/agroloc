import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'agroloc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class MachineryRegisterComponent {
  platform = inject(Platform);
  isMobile = this.platform.ANDROID || this.platform.IOS;
}
