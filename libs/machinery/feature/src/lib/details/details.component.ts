import {
  AuthService,
  AuthStorage,
  AccountService,
} from '@agroloc/account/data-acess';
import {
  Avaliacao,
  MachineryService,
  Maquina,
} from '@agroloc/machinery/data-access';
import {
  LoaderFacade,
  SearchService,
  SidenavService,
} from '@agroloc/shared/data-access';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { NgClass, ViewportScroller } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  combineLatest,
  debounceTime,
  map,
  take,
} from 'rxjs';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RentService } from '@agroloc/rent/data-access';

@Component({
  selector: 'agroloc-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  platform = inject(Platform);
  searchService = inject(SearchService);

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
  scrollDispatcher = inject(ScrollDispatcher);
  viewportScroller = inject(ViewportScroller);
  changeDetectorRef = inject(ChangeDetectorRef);
  dialog = inject(MatDialog);

  ELEMENT_DATA: any[] = [
    { informacao: 'Peso', valor: 10.5 },
    { informacao: 'Comprimento', valor: 8.6 },
    { informacao: 'Largura', valor: 9.5 },
    { informacao: 'Altura', valor: 25.9 },
  ];

  isMobile = this.platform.ANDROID || this.platform.IOS;
  displayedColumns: string[] = ['informacao', 'valor'];
  dataSource = this.ELEMENT_DATA;
  clickedRows = new Set<any>();
  machineryId = '';
  machineryRate: any;
  haveMachineryRate = false;
  urlMainImage = '';
  focusUrl = '';

  searchItem = this.searchService.itemSelect$;

  searchItemSubscribe = this.searchService.itemSelect$.subscribe((response) => {
    this.machineryId = response._id;
    if (response.Avaliacoes[0]) {
      this.machineryRate = response.Avaliacoes;
      this.haveMachineryRate = false;
    } else {
      this.haveMachineryRate = true;
    }

    this.urlMainImage = response.ImagemPrincipal.Url;

    this.ELEMENT_DATA[0].valor = response.Peso;
    this.ELEMENT_DATA[1].valor = response.Comprimento;
    this.ELEMENT_DATA[2].valor = response.Largura;
    this.ELEMENT_DATA[3].valor = response.Altura;
  });

  product = {
    foto: 'foto aqui',
    titulo:
      'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
    descricao:
      'Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado , Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado Apple iPhone 15 Pro Max (256 GB) - Titânio Preto - Distribuidor autorizado ',
    preco: 'R$4.249,00',
    avaliacao: '4.9',
    locatario: 'Loja oficial Apple',
    like: 'like aqui',
  };

  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  addFavorite(machineryId: string) {
    this.authService
      .IsLogged()
      .pipe(debounceTime(1000), take(1))
      .subscribe((response) => {
        if (response) {
          this.authService.userProfile$.pipe(take(1)).subscribe((response) => {
            const idUser = response.IdUsuario;
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
                this.accountService.nextAccount(idUser);
              });
          });
        } else {
          this.snackBar.open('Você precisa ter uma Conta', undefined, {
            duration: 3000,
          });
        }
      });
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

  onFocus(url: string) {
    this.focusUrl = url;
  }

  navNegotiate() {
    this.router.navigate(['web', 'main', 'negotiate']);
  }

  @ViewChild('zoom') zoom: any;

  clicarNoZoom() {
    const previewButton: ElementRef = this.zoom.previewButton;
    previewButton.nativeElement.click();
  }

  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(ComponentDialogOverviewExampleDialog, {
      height: '250px',
      width: '600px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'agroloc-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgClass,
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ComponentDialogOverviewExampleDialog {
  mode = '';
  constructor(
    public dialogRef: MatDialogRef<ComponentDialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    localStorage.getItem('prefers-color-scheme') === 'light'
      ? (this.mode = '')
      : (this.mode = 'modoEscuro');
  }
  rentService = inject(RentService);
  router = inject(Router);

  onNoClick(): void {
    this.dialogRef.close();
  }

  negotiateMachinery(): void {
    this.rentService.userCreateProcess();
  }
}
