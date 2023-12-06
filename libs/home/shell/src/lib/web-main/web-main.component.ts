import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AccountService, AuthService } from '@agroloc/account/data-acess';
import {
  Observable,
  ReplaySubject,
  debounceTime,
  map,
  startWith,
  take,
} from 'rxjs';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import {
  LoaderFacade,
  SearchService,
  SidenavService,
} from '@agroloc/shared/data-access';
import { FormBuilder, FormControl } from '@angular/forms';
import { MachineryService } from '@agroloc/machinery/data-access';
import { MatSelect } from '@angular/material/select';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

interface ListTabControl {
  nome: string;
  url: string;
}

@Component({
  selector: 'agroloc-web-main',
  templateUrl: './web-main.component.html',
  styleUrls: ['./web-main.component.scss'],
})
export class WebMainComponent {
  router = inject(Router);
  location = inject(Location);
  platform = inject(Platform);
  authService = inject(AuthService);
  accountService = inject(AccountService);
  sidenavService = inject(SidenavService);
  formBuilder = inject(FormBuilder);
  searchService = inject(SearchService);
  machineryService = inject(MachineryService);
  loader = inject(LoaderFacade);
  scrollDispatcher = inject(ScrollDispatcher);

  userProfile = this.authService.userProfile$;

  @ViewChild('drawer') sidenav: MatSidenav;
  @ViewChild('valorMaximo') valorMaximoInput: ElementRef;
  @ViewChild('valorMinimo') valorMinimoInput: ElementRef;
  @ViewChild('tipoPreco') tipoPrecoInput: MatSelect;
  @ViewChild('ordenadoPor') ordenadoPorInput: MatSelect;
  @ViewChild('navTabs') navTabs: MatTabGroup;

  userDate = this.accountService.userAccount$;

  isLogged = this.authService.IsLogged();
  notLogged = this.authService.IsLogged().pipe(
    map((response) => {
      return !response;
    })
  );

  myControl = new FormControl('');
  options: string[];
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

  filteredOptionsSubscribe = this.myControl.valueChanges.pipe(
    map((value) => {
      if (value) {
        this.loader.intervalLoading();
        this.searchService.setBusca(value);
      }
      return this.filter(value || '');
    })
  );

  allTypePrice = this.machineryService.findPriceTypes();
  orderBy = [
    {
      valor: 'MaisBemAvaliado',
      nome: 'Mais Bem Avaliado',
    },
    {
      valor: 'OrdemAlfabetica',
      nome: 'Ordem Alfabética',
    },
    {
      valor: 'OrdemAlfabeticaInvertida',
      nome: 'Inverso Ordem Alfabética',
    },
    {
      valor: 'MaisRecentementeCriado',
      nome: 'Mais Recente',
    },
    {
      valor: 'MenosRecentementeCriado',
      nome: 'Mais Antigo',
    },
    {
      valor: 'MaisRecentementeAtualizado',
      nome: 'Atualizado Recentemento',
    },
    {
      valor: 'MenosRecentementeAtualizado',
      nome: 'Atualizados Antigamente',
    },
  ];

  valorMaximo = new FormControl(0);
  valorMinimo = new FormControl(0);
  tipoPreco = new FormControl('');
  ordenadoPor = new FormControl('');
  valorMaximoSubscribe = this.valorMaximo.valueChanges
    .pipe(
      map((value) => {
        if (value) {
          this.searchService.setPrecoMax(value);
        } else {
          this.searchService.setPrecoMax(999999999);
        }
        return value;
      })
    )
    .subscribe();
  valorMinimoSubscribe = this.valorMinimo.valueChanges
    .pipe(
      map((value) => {
        if (value) {
          this.searchService.setPrecoMin(value);
        } else {
          this.searchService.setPrecoMin(0);
        }
        return value;
      })
    )
    .subscribe();
  tipoPrecoSubscribe = this.tipoPreco.valueChanges
    .pipe(
      map((value) => {
        if (value) {
          this.searchService.setTipoPreco(value);
        } else {
          this.searchService.setTipoPreco('');
        }
        return value;
      })
    )
    .subscribe();
  ordenadoPorSubscribe = this.ordenadoPor.valueChanges
    .pipe(
      map((value) => {
        console.log(value);

        if (value) {
          this.searchService.setOrdem(value);
        } else {
          this.searchService.setOrdem('');
        }
        return value;
      })
    )
    .subscribe();

  currentUrl = this.location.path() ?? '';
  isMobile = this.platform.ANDROID || this.platform.IOS;
  showFiller = false;
  isDarkMode?: boolean;
  darkMode = false;
  value = '';
  activeLink = '';
  sidenavControl = this.sidenavService.sidenav$.subscribe((response) => {
    this.sidenav.toggle();
  });

  tabListControl = new ReplaySubject<ListTabControl[]>(1);
  tabListControl$ = this.tabListControl.asObservable();

  onLoggedLinks = [
    { nome: 'Inicio', url: 'home' },
    { nome: 'Pesquisa', url: 'search' },
    { nome: 'Gerenciar Conta', url: 'management' },
  ];

  notLoggedLinks = [
    { nome: 'Inicio', url: 'home' },
    { nome: 'Pesquisa', url: 'search' },
  ];

  activeTab = this.searchService.navTabControl$
    .pipe(debounceTime(500))
    .subscribe((response) => {
      const moveTab = response;
      let index = 0;
      let findTab = false;
      this.tabListControl$.subscribe((response) => {
        response.map((value) => {
          if (value.nome === moveTab) {
            findTab = true;
            this.mudarAba(index);
          }
          index += 1;
        });
      });

      if (findTab === false) {
        index = 0;
        if (response === 'Detalhes') {
          this.tabListControl$
            .pipe(
              take(1),
              map((response) => {
                response.push({ nome: 'Detalhes', url: 'details' });
                return response;
              })
            )
            .subscribe();
        }
        if (response === 'Processo') {
          this.tabListControl$
            .pipe(
              take(1),
              map((response) => {
                response.push({ nome: 'Processo', url: 'negotiate' });
                return response;
              })
            )
            .subscribe();
        }

        this.tabListControl$.subscribe((response) => {
          response.map((value) => {
            if (value.nome === moveTab) {
              findTab = true;
              this.mudarAba(index);
            }
            index += 1;
          });
        });
      }
    });

  constructor() {
    this.isDarkMode =
      localStorage.getItem('prefers-color-scheme') === 'light' ? false : true;
    if (this.isDarkMode) {
      localStorage.setItem('prefers-color-scheme', 'dark');
      document.body.classList.add('darkMode');
    } else {
      localStorage.setItem('prefers-color-scheme', 'light');
      document.body.classList.remove('darkMode');
    }

    this.searchService.searchFilter$
      .pipe(take(1), debounceTime(1000))
      .subscribe((response) => {
        this.valorMaximo.setValue(response.PrecoMax);
        this.valorMinimo.setValue(response.PrecoMin);
        this.tipoPreco.setValue(response.TipoPreco);
        this.ordenadoPor.setValue(response.Ordem);
      });

    this.authService.IsLogged().subscribe((response) => {
      if (response) {
        this.tabListControl.next(this.onLoggedLinks);
      } else {
        this.tabListControl.next(this.notLoggedLinks);
      }
    });
  }

  remThema() {
    document.body.classList.remove('darkMode');
  }

  setValorMaximo() {
    this.loader.intervalLoading();
    const valorMaximo = this.valorMaximoInput.nativeElement.value;
    this.valorMaximo.setValue(valorMaximo);
  }
  setValorMinimo() {
    this.loader.intervalLoading();
    const valorMinimo = this.valorMinimoInput.nativeElement.value;
    this.valorMinimo.setValue(valorMinimo);
  }
  setTipoPreco() {
    this.loader.intervalLoading();
    const tipoPreco = this.tipoPrecoInput.value;
    this.tipoPreco.patchValue(tipoPreco);
  }
  setOrdenadoPor() {
    this.loader.intervalLoading();
    const ordenadoPor = this.ordenadoPorInput.value;
    this.ordenadoPor.patchValue(ordenadoPor);
  }

  clearSearch(element: HTMLInputElement) {
    this.loader.intervalLoading();

    if (element.value === '') {
      this.searchService.setBusca('');
      this.myControl.patchValue('');
    }
  }

  enterPress(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.router.navigate(['web', 'main', 'search']);
    }
  }

  onSelectecSearch() {
    this.router.navigate(['web', 'main', 'search']);
  }

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

  moveUrl(event: MatTabChangeEvent) {
    this.tabListControl$.pipe(take(1)).subscribe((response) => {
      const link = response[event.index];
      if (this.activeLink !== link.url) {
        this.activeLink = link.url;
        if (this.isMobile) {
          this.router.navigateByUrl(`mob/main/${link.url}`);
        } else {
          this.router.navigateByUrl(`web/main/${link.url}`);
        }
      }
    });
  }

  mudarAba(index: number) {
    if (this.navTabs && this.navTabs.selectedIndex !== index) {
      this.navTabs.selectedIndex = index;
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.darkMode = this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('prefers-color-scheme', 'dark');
      document.body.classList.add('darkMode');
    } else {
      localStorage.setItem('prefers-color-scheme', 'light');
      document.body.classList.remove('darkMode');
    }
  }

  logout() {
    this.authService.SingOutWeb();
  }

  switchAccount() {
    this.authService.SwtichAccountWeb();
  }
}
