import { Component, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import {
  AuthService,
  AuthStorage,
  AccountService,
} from '@agroloc/account/data-acess';
import { MachineryService } from '@agroloc/machinery/data-access';
import {
  LoaderFacade,
  SearchService,
  SidenavService,
} from '@agroloc/shared/data-access';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, map } from 'rxjs';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'agroloc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  platform = inject(Platform);
  breakpointObserver = inject(BreakpointObserver);
  formBuilder = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  loader = inject(LoaderFacade);
  authService = inject(AuthService);
  authStorage = inject(AuthStorage);
  accountService = inject(AccountService);
  machineryService = inject(MachineryService);
  sidenavService = inject(SidenavService);
  searchService = inject(SearchService);

  searchData = this.searchService.searchData$.pipe(
    debounceTime(1000),
    map((response) => {
      return response;
    })
  );

  loadingRequest = this.loader.active$;

  isLogged = this.authService.IsLogged();
  notLogged = this.authService.IsLogged().pipe(
    map((response) => {
      return !response;
    })
  );

  allCategories = this.machineryService.findAllCategories().pipe(
    map((response) => {
      return response.filter((category) => category.Tipo === 'Maquina');
    })
  );

  isMobile = this.platform.ANDROID || this.platform.IOS;
  pageSize = 10;
  pageIndex = 1;

  toggleSidenav() {
    this.sidenavService.activeSidenav();
  }

  calculateAverageRating(avaliacoes: any[]) {
    if (avaliacoes && avaliacoes.length > 0) {
      const totalNivel = avaliacoes.reduce(
        (total, avaliacao) => total + avaliacao.Nivel,
        0
      );
      return (totalNivel / avaliacoes.length).toFixed(1);
    }
    return 'N/A';
  }

  onChipSelectionChange(event: MatChipSelectionChange, categoria: string) {
    if (event.selected) {
      this.searchService.setCategoria(categoria);
    } else {
      this.searchService.remCategoria();
    }
  }

  paginatorLength(length: any[] | null): number {
    if (length) {
      return length.length * 2;
    } else {
      return 0;
    }
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.searchService.setQuantidade(this.pageSize);
    this.pageIndex = event.pageIndex + 1;
    this.searchService.setPagina(this.pageIndex);
  }
}
