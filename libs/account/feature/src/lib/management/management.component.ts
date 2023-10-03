import { Component, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'agroloc-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  platform = inject(Platform);

  isMobile = this.platform.ANDROID || this.platform.IOS;
  panelOpenState = false;
}
