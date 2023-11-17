import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ReplaySubject,
  catchError,
  combineLatest,
  debounceTime,
  take,
} from 'rxjs';
import { DadosTransacao } from '../../entities/negotiate.interface';
import { AuthService } from '@agroloc/account/data-acess';
import { SearchService } from '@agroloc/shared/data-access';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  http = inject(HttpClient);
  snackbar = inject(MatSnackBar);
  searchService = inject(SearchService);
  authService = inject(AuthService);
  router = inject(Router);

  userProfile = this.authService.userProfile$;
  selectData = this.searchService.itemSelect$;

  selectedProcess = new ReplaySubject(1);
  selectedProcess$ = this.selectedProcess.asObservable();

  selectedProcessFrete = new ReplaySubject(1);
  selectedProcessFrete$ = this.selectedProcessFrete.asObservable();

  userCreateProcess() {
    combineLatest([this.selectData, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([machinery, profile]) => {
        console.log('paasei');

        this.createProcess(
          machinery._id,
          profile.IdUsuario,
          machinery.DonoDaMaquina._id
        )
          .pipe(
            catchError((error) => {
              this.snackbar.open('Erro ao criar Processo', undefined, {
                duration: 3000,
              });
              throw new Error(error);
            })
          )
          .subscribe((response) => {
            this.snackbar.open('Processo Criado', undefined, {
              duration: 3000,
            });
            this.router.navigate(['web', 'main', 'negotiate']);
          });
      });
  }

  createProcess(idmaquina: any, idlocador: any, idlocatario: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/${idmaquina}/${idlocador}/${idlocatario}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Negociar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  acceptProcess(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/aceitar/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Aceitar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  recuseProcess(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/recusar/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Recusar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  skipTransport(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/pularfrete/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Skipar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  initProcess(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/comecar/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Iniciar Processo', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  finishProcess(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/concluir/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Finalizar Processo', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  selectPrice(idprocessodealuguel: any, price: DadosTransacao) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/selecionarpreco/${idprocessodealuguel}`,
        price
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Selecionar Preço', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  acceptPrice(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/confirmarpreco/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Aceitar Preço', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  recusePrice(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/recusarpreco/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Recusar Preço', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  confirmPayment(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/confirmarpagamento/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Confirmar Pagamento', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }

  createProcessFrete(
    idprocessodealuguel: any,
    idmaquina: any,
    idfreteiro: any,
    idsolicitante: any,
    idendereco: any,
    valorfrete: any
  ) {
    return this.http
      .post(
        `/api/processo-de-frete/${idprocessodealuguel}/${idmaquina}/${idfreteiro}/${idsolicitante}/${idendereco}/${valorfrete}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao criar processo de Frete', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  acceptProcessFrete(idprocessodealuguel: any, idautomovel: any) {
    return this.http
      .post(
        `/api/processo-de-frete/mudarstatus/aceitar/${idprocessodealuguel}/${idautomovel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Aceitar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  recuseProcessFrete(idprocessodealuguel: any) {
    return this.http
      .post(
        `/api/processo-de-frete/mudarstatus/recusar/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Recusar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  initProcessFrete(idprocessodefrete: any) {
    return this.http
      .post(
        `/api/processo-de-frete/mudarstatus/comecar/${idprocessodefrete}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Iniciar Processo', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  finishProcessFrete(idprocessodefrete: any) {
    return this.http
      .post(
        `/api/processo-de-frete/mudarstatus/finalizar/${idprocessodefrete}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Finalizar Processo', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  confirmPaymentFrte(idprocessodefrete: any) {
    return this.http
      .post(
        `/api/processo-de-frete/mudarstatus/confirmarpagamento/${idprocessodefrete}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Confirmar Pagamento', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
}
