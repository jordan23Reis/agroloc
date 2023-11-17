import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { LoaderFacade, SearchService } from '@agroloc/shared/data-access';
import { AccountService, AuthService } from '@agroloc/account/data-acess';
import { FormBuilder, FormControl } from '@angular/forms';
import { RentService } from '@agroloc/rent/data-access';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, combineLatest, take, map } from 'rxjs';

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

  accountService = inject(AccountService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  userDate = this.accountService.userAccount$.pipe(debounceTime(1));
  userProfile = this.authService.userProfile$;

  addInfoAutomovel() {
    this.router.navigate(['web', 'main', 'automobile']);
  }

  remInfoAutomovel(automovel: string) {
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        this.accountService
          .removeAutomovel(profile.IdUsuario, automovel)
          .subscribe((response) => {
            this.snackBar.open(`Automovel Removido`, undefined, {
              duration: 3000,
            });
            this.accountService.nextAccount(profile.IdUsuario);
          });
      });
  }

  myControl = new FormControl('');
  options: string[];
  loader = inject(LoaderFacade);

  enterPress(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.router.navigate(['web', 'main', 'search']);
    }
  }

  clearSearch(element: HTMLInputElement) {
    this.loader.intervalLoading();

    if (element.value === '') {
      this.searchService.setBusca('');
      this.myControl.patchValue('');
    }
  }

  onSelectecSearch() {
    this.router.navigate(['web', 'main', 'search']);
  }

  filteredOptionsSubscribe = this.myControl.valueChanges.pipe(
    map((value) => {
      if (value) {
        this.loader.intervalLoading();
        this.searchService.setBusca(value);
      }
      return this.filter(value || '');
    })
  );

  optionsSubscribe = this.searchService.searchData$
    .pipe(
      map((response) => {
        return response.map((value) => {
          return value.Nome;
        });
      })
    )
    .subscribe((response) => {
      this.options = response;
    });

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.options) {
      return this.options.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    } else {
      return [''];
    }
  }

  moveToAutomovel(id: string) {
    this.accountService.onSelectAutomovel(id);
    this.router.navigate(['web', 'main', 'automobiledetails']);
  }
}
