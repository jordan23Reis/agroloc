import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
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
import { BehaviorSubject, catchError, debounceTime, map, take } from 'rxjs';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Router } from '@angular/router';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'agroloc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  platform = inject(Platform);
  router = inject(Router);
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
  scrollDispatcher = inject(ScrollDispatcher);
  viewportScroller = inject(ViewportScroller);
  changeDetectorRef = inject(ChangeDetectorRef);

  searchData = this.searchService.searchData$.pipe(
    debounceTime(1000),
    map((response) => {
      return response;
    })
  );

  loadingRequest = this.loader.active$;
  arrayDeItensPreview = new Array(10);
  intervalLoading = false;
  isMobile = this.platform.ANDROID || this.platform.IOS;
  pageSize = 10;
  pageIndex: number;
  lastScrollPosition = 0;
  showButton = new BehaviorSubject<boolean>(false);
  showButton$ = this.showButton.asObservable().pipe(
    map((response) => {
      if (response) {
        setTimeout(() => {
          this.changeDetectorRef.detectChanges();
        }, 1000);
      }
      return response;
    })
  );
  elementScrollRef: CdkScrollable;

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

  ngOnInit() {
    this.loader.intervalLoading();
    this.scrollDispatcher.scrolled().subscribe((response) => {
      if (response instanceof CdkScrollable) {
        this.elementScrollRef = response;

        const currentScrollPosition =
          response.getElementRef().nativeElement.scrollTop;

        if (currentScrollPosition > 600) {
          console.log('passei');

          this.showButton.next(true);
        } else {
          this.showButton.next(false);
        }
        this.lastScrollPosition = currentScrollPosition;
      }
    });
  }

  scrollToTop() {
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 1000);
    this.elementScrollRef.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('passei');
  }

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
    this.loader.intervalLoading();
    if (event.selected) {
      this.searchService.setCategoria(categoria);
    } else {
      this.searchService.remCategoria();
    }
  }

  paginatorLength(length: any[] | null): number {
    if (length) {
      if (this.pageSize > length.length) {
        return 0;
      } else {
        return 100 * length.length;
      }
    } else {
      return 0;
    }
  }

  onPageChange(event: any) {
    this.scrollToTop();
    this.loader.intervalLoading();
    this.pageSize = event.pageSize;
    this.searchService.setQuantidade(this.pageSize);
    this.pageIndex = event.pageIndex + 1;
    this.searchService.setPagina(this.pageIndex);
  }

  addFavorite(machineryId: string) {
    this.authService
      .IsLogged()
      .pipe(debounceTime(1000), take(1))
      .subscribe((response) => {
        if (response) {
          this.authService.userProfile$.pipe(take(1)).subscribe((response) => {
            this.accountService
              .addMaquinaFavorita(response.IdUsuario, machineryId)
              .pipe(
                catchError((error) => {
                  this.snackBar.open(
                    'Ocorreu um erro ao Adicionar Favorito',
                    undefined,
                    { duration: 3000 }
                  );
                  throw new Error(error);
                })
              )
              .subscribe((response) => {
                this.snackBar.open('Maquinário adicionado', undefined, {
                  duration: 3000,
                });
              });
          });
        } else {
          this.snackBar.open('Você precisa ter uma Conta', undefined, {
            duration: 3000,
          });
        }
      });
  }
}
