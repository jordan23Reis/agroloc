import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AccountService, AuthService } from '@agroloc/account/data-acess';
import { Observable, map, startWith } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { SearchService, SidenavService } from '@agroloc/shared/data-access';
import { FormBuilder, FormControl } from '@angular/forms';
import { MachineryService } from '@agroloc/machinery/data-access';
import { MatSelect } from '@angular/material/select';

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

  @ViewChild('drawer') sidenav: MatSidenav;
  @ViewChild('valorMaximo') valorMaximoInput: ElementRef;
  @ViewChild('valorMinimo') valorMinimoInput: ElementRef;
  @ViewChild('tipoPreco') tipoPrecoInput: MatSelect;
  @ViewChild('ordenadoPor') ordenadoPorInput: MatSelect;

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

  links = [
    { nome: 'Home', url: 'home' },
    { nome: 'Pesquisa', url: 'search' },
    { nome: 'Detalhes', url: 'details' },
  ];

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
  }

  setValorMaximo() {
    const valorMaximo = this.valorMaximoInput.nativeElement.value;
    this.valorMaximo.setValue(valorMaximo);
  }
  setValorMinimo() {
    const valorMinimo = this.valorMinimoInput.nativeElement.value;
    this.valorMinimo.setValue(valorMinimo);
  }
  setTipoPreco() {
    const tipoPreco = this.tipoPrecoInput.value;
    this.tipoPreco.patchValue(tipoPreco);
  }
  setOrdenadoPor() {
    const ordenadoPor = this.ordenadoPorInput.value;
    this.ordenadoPor.patchValue(ordenadoPor);
  }

  clearSearch(element: HTMLInputElement) {
    if (element.value === '') {
      this.myControl.patchValue('');
    }
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
    const link = this.links[event.index];
    if (this.activeLink !== link.url) {
      this.activeLink = link.url;
      if (this.isMobile) {
        this.router.navigateByUrl(`mob/main/${link.url}`);
      } else {
        this.router.navigateByUrl(`web/main/${link.url}`);
      }
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
