import {
  AccountService,
  AuthService,
  Favorito,
} from '@agroloc/account/data-acess';
import { MachineryService, Maquina } from '@agroloc/machinery/data-access';
import { AluguelProcesso, RentService } from '@agroloc/rent/data-access';
import { SearchService } from '@agroloc/shared/data-access';
import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReplaySubject, catchError, debounceTime, map, take } from 'rxjs';

@Component({
  selector: 'agroloc-process-aluguel',
  templateUrl: './process-aluguel.component.html',
  styleUrls: ['./process-aluguel.component.scss'],
})
export class ProcessAluguelComponent {
  platform = inject(Platform);
  accountService = inject(AccountService);
  machineryService = inject(MachineryService);
  authService = inject(AuthService);
  searchService = inject(SearchService);
  snackbar = inject(MatSnackBar);
  rentService = inject(RentService);
  router = inject(Router);

  filter: string;
  isMobile = this.platform.ANDROID || this.platform.IOS;

  favoriteMachinery = new ReplaySubject<AluguelProcesso[]>(1);
  favoriteMachinery$ = this.favoriteMachinery.asObservable();

  listProcess = this.rentService.listProcess$;
  listProcessFrete = this.rentService.listProcessFrete$;

  selectItem(idProcess: string) {
    this.rentService.onSelectProcess(idProcess);
    this.rentService.onSelectProcessFrete(idProcess);
    this.router.navigate(['web', 'main', 'negotiate']);
  }
}
