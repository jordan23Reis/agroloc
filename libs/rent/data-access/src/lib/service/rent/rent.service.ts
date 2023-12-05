import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ReplaySubject,
  catchError,
  combineLatest,
  debounceTime,
  map,
  take,
} from 'rxjs';
import { DadosTransacao } from '../../entities/negotiate.interface';
import { AccountService, AuthService } from '@agroloc/account/data-acess';
import { SearchService } from '@agroloc/shared/data-access';
import { Router } from '@angular/router';
import { AluguelProcesso } from '../../entities';
import ProcessoDeFrete from '../../entities/process-frete.interface';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  http = inject(HttpClient);
  snackbar = inject(MatSnackBar);
  searchService = inject(SearchService);
  authService = inject(AuthService);
  router = inject(Router);
  accountService = inject(AccountService);

  userProfile = this.authService.userProfile$;
  selectData = this.searchService.itemSelect$;
  dataAccount = this.accountService.userAccount$;

  selectedProcess = new ReplaySubject<AluguelProcesso>(1);
  selectedProcess$ = this.selectedProcess.asObservable().pipe(
    debounceTime(10),
    map((response) => {
      const idmaquina = response?.Maquina?.idMaquina;
      console.log(idmaquina);

      if (idmaquina) {
        this.searchService.onSelectForProcess(idmaquina);
      }

      return response;
    })
  );

  listProcess = new ReplaySubject<AluguelProcesso[]>(1);
  listProcess$ = this.listProcess.asObservable();

  selectedProcessFrete = new ReplaySubject<ProcessoDeFrete>(1);
  selectedProcessFrete$ = this.selectedProcessFrete.asObservable().pipe(
    debounceTime(100),
    map((response) => {
      const idmaquina = response?.Maquina?.idMaquina;
      if (idmaquina) {
        this.searchService.onSelectForProcess(idmaquina);
      }
      return response;
    })
  );

  listProcessFrete = new ReplaySubject<ProcessoDeFrete[]>(1);
  listProcessFrete$ = this.listProcessFrete.asObservable();

  onSelectProcess(idprocessodealuguel: any) {
    return this.http
      .get(`/api/processo-de-aluguel/${idprocessodealuguel}`, {})
      .pipe(
        catchError((error) => {
          console.log(error);
          this.snackbar.open('Erro ao Procurar Processos', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      )
      .subscribe((response) => {
        this.selectedProcess.next(response as AluguelProcesso);
      });
  }

  onSelectProcessFrete(idprocessodefrete: any) {
    return this.http
      .get(`/api/processo-de-frete/${idprocessodefrete}`, {})
      .pipe(
        catchError((error) => {
          console.log(error);
          this.snackbar.open('Erro ao Procurar Processos', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      )
      .subscribe((response) => {
        this.selectedProcessFrete.next(response as ProcessoDeFrete);
      });
  }

  findListProcess(idusuario: string) {
    return this.http
      .get(`/api/processo-de-aluguel/abertos/${idusuario}`, {})
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Procurar Lista', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }

  findListProcessFrete(idusuario: string) {
    return this.http
      .get(`/api/processo-de-frete/abertos/${idusuario}`, {})
      .pipe(
        catchError((error) => {
          this.snackbar.open('Erro ao Procurar Lista', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }

  listProcessSubscribe = combineLatest([
    this.dataAccount,
    this.userProfile,
  ]).subscribe(([account, profile]) => {
    this.findListProcess(profile.IdUsuario).subscribe((response) => {
      this.listProcess.next(response as AluguelProcesso[]);
    });
  });

  listProcessFreteSubscribe = combineLatest([
    this.dataAccount,
    this.userProfile,
  ]).subscribe(([account, profile]) => {
    this.findListProcessFrete(profile.IdUsuario).subscribe((response) => {
      this.listProcessFrete.next(response as ProcessoDeFrete[]);
    });
  });

  userCreateProcess() {
    combineLatest([this.selectData, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([machinery, profile]) => {
        this.createProcess(
          machinery._id,
          machinery.DonoDaMaquina.idDono,
          profile.IdUsuario
        )
          .pipe(
            catchError((error) => {
              console.log(error);

              this.snackbar.open('Erro ao criar Processo', undefined, {
                duration: 3000,
              });
              throw new Error(error);
            })
          )
          .subscribe((response) => {
            this.selectedProcess.next(response as AluguelProcesso);
            this.snackbar.open('Processo Criado', undefined, {
              duration: 3000,
            });
            this.accountService.nextAccount(profile.IdUsuario);
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
          console.log(error);

          this.snackbar.open('Erro ao Negociar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  acceptProcess(idprocessodealuguel: any) {
    return this.http
      .patch(
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
      .patch(
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
      .patch(
        `/api/processo-de-aluguel/mudarstatus/pularfrete/${idprocessodealuguel}`,
        {}
      )
      .pipe(
        catchError((error) => {
          console.log(error);

          this.snackbar.open('Erro ao Skipar', undefined, { duration: 3000 });
          throw new Error(error);
        })
      );
  }
  initProcess(idprocessodealuguel: any) {
    return this.http
      .patch(
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
      .patch(
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
      .patch(
        `/api/processo-de-aluguel/mudarstatus/selecionarpreco/${idprocessodealuguel}`,
        price
      )
      .pipe(
        catchError((error) => {
          console.log(error);

          this.snackbar.open('Erro ao Selecionar Preço', undefined, {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
  acceptPrice(idprocessodealuguel: any) {
    return this.http
      .patch(
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
      .patch(
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
      .patch(
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

  userCreateProcessFrete(selectedFreteiroId: string, value: number) {
    combineLatest([this.selectData, this.userProfile, this.selectedProcess$])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([machinery, profile, process]) => {
        this.createProcessFrete(
          process._id,
          machinery._id,
          selectedFreteiroId,
          profile.IdUsuario,
          machinery.Endereco._id,
          value
        )
          .pipe(
            catchError((error) => {
              console.log(error);
              this.snackbar.open('Erro ao criar Processo', undefined, {
                duration: 3000,
              });
              throw new Error(error);
            })
          )
          .subscribe((response) => {
            this.selectedProcess.next(response as AluguelProcesso);
            this.snackbar.open('Processo Criado', undefined, {
              duration: 3000,
            });
          });
      });
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
      .patch(
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
      .patch(
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
      .patch(
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
      .patch(
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
  confirmPaymentFrete(idprocessodefrete: any) {
    return this.http
      .patch(
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
