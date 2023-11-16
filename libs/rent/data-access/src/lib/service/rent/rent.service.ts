import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { DadosTransacao } from '../../entities/negotiate.interface';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  http = inject(HttpClient);
  snackbar = inject(MatSnackBar);

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
