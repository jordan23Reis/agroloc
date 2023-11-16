import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { SearchService } from '@agroloc/shared/data-access';
import { AuthService } from '@agroloc/account/data-acess';
import { FormBuilder } from '@angular/forms';
import { RentService } from '@agroloc/rent/data-access';

@Component({
  selector: 'agroloc-negotiate',
  templateUrl: './negotiate.component.html',
  styleUrls: ['./negotiate.component.scss'],
})
export class NegotiateComponent {
  platform = inject(Platform);
  isMobile = this.platform.ANDROID || this.platform.IOS;

  searchService = inject(SearchService);
  searchItem = this.searchService.itemSelect$;

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  rentService = inject(RentService);

  configsPrice = this.formBuilder.group({});
}
