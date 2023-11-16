import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, combineLatest, debounceTime, take } from 'rxjs';
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

  createProcess(idMachinery: any, idUser: any, idLessee: any) {
    return this.http
      .post(`/api/processo-de-aluguel/${idMachinery}/${idUser}/${idLessee}`, {})
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Negociar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  acceptProcess(idProcess: any) {
    return this.http
      .post(`/api/processo-de-aluguel/mudarstatus/aceitar/${idProcess}`, {})
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Aceitar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  skipTransport(idProcess: any) {
    return this.http
      .post(`/api/processo-de-aluguel/mudarstatus/pularfrete/${idProcess}`, {})
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Skipar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  initProcess(idProcess: any) {
    return this.http
      .post(`/api/processo-de-aluguel/mudarstatus/comecar/${idProcess}`, {})
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Iniciar Processo', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  finishProcess(idProcess: any, price: DadosTransacao) {
    return this.http
      .post(`/api/processo-de-aluguel/mudarstatus/concluir/${idProcess}`, price)
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Finalizar Processo', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  acceptPrice(idProcess: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/confirmarpreco/${idProcess}`,
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
  recusePrice(idProcess: any) {
    return this.http
      .post(
        `/api/processo-de-aluguel/mudarstatus/recusarpreco/${idProcess}`,
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
}
