import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoaderFacade, SearchService } from '@agroloc/shared/data-access';
import {
  Account,
  AccountService,
  AuthService,
} from '@agroloc/account/data-acess';
import { FormBuilder, FormControl } from '@angular/forms';
import { DadosTransacao, RentService } from '@agroloc/rent/data-access';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, combineLatest, take, map, ReplaySubject } from 'rxjs';

@Component({
  selector: 'agroloc-negotiate',
  templateUrl: './negotiate.component.html',
  styleUrls: ['./negotiate.component.scss'],
})
export class NegotiateComponent implements OnInit {
  platform = inject(Platform);
  isMobile = this.platform.ANDROID || this.platform.IOS;

  searchService = inject(SearchService);
  searchItem = this.searchService.itemSelect$;

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  rentService = inject(RentService);

  configsPrice = this.formBuilder.group({});

  accountService = inject(AccountService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  userDate = this.accountService.userAccount$.pipe(debounceTime(1));
  userProfile = this.authService.userProfile$;
  processItem = this.rentService.selectedProcess$.pipe(
    map((response) => {
      console.log(response);

      return response;
    })
  );
  processFreteItem = this.rentService.selectedProcessFrete$;

  dadosLocador = new ReplaySubject<Account>(1);
  dadosLocador$ = this.dadosLocador.asObservable();
  dadosLocatario = new ReplaySubject<Account>(1);
  dadosLocatario$ = this.dadosLocatario.asObservable();
  dadosFreteiro = new ReplaySubject<Account>(1);
  dadosFreteiro$ = this.dadosFreteiro.asObservable();
  changeDetectorRef = inject(ChangeDetectorRef);

  populateLoc = this.processItem.subscribe((response) => {
    if (response) {
      this.accountService
        .getUser(response.Envolvidos.Locador.idLocador)
        .subscribe((response) => {
          this.dadosLocador.next(response);
        });
      this.accountService
        .getUser(response.Envolvidos.Locatario.idLocatario)
        .subscribe((response) => {
          this.dadosLocatario.next(response);
        });
    }
  });
  populateFret = this.processFreteItem.subscribe((response) => {
    if (response) {
      const idfreteiro = response.Envolvidos.Freteiro.idFreteiro;
      if (idfreteiro) {
        this.accountService.getUser(idfreteiro).subscribe((response) => {
          this.dadosFreteiro.next(response);
        });
      }
    }
  });

  addInfoAutomovel() {
    this.router.navigate(['web', 'main', 'automobile']);
  }

  remInfoAutomovel(automovel: string) {
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        this.accountService
          .removeAutomovel(profile.IdUsuario, automovel)
          .subscribe((response) => {
            this.snackBar.open(`Automovel Removido`, undefined, {
              duration: 3000,
            });
            this.accountService.nextAccount(profile.IdUsuario);
          });
      });
  }

  myControlFrete = new FormControl('');
  myControlValue = new FormControl('');
  options: string[];
  loader = inject(LoaderFacade);

  filteredOptionsSubscribe = this.myControlFrete.valueChanges.pipe(
    map((value) => {
      if (value) {
        this.loader.intervalLoading();
        this.accountService.findFreteiros({
          quantidadePorPagina: 10,
          page: 0,
          busca: value,
          ordenarPor: 'MaisBemAvaliado',
        });
      }
      return this.filter(value || '');
    })
  );

  ultimaPesquisa: any;

  optionsSubscribe = this.accountService.acharFreteiros$
    .pipe(
      map((response) => {
        return response.map((value) => {
          this.ultimaPesquisa = value;
          return value.CadastroComum!.Nome;
        });
      })
    )
    .subscribe((response) => {
      this.options = response;
    });

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

  // applyFreteiro() {
  //   processItem;
  //   userDate;

  //   this.rentService.createProcessFrete();
  // }

  moveToAutomovel(id: string) {
    this.accountService.onSelectAutomovel(id);
    this.router.navigate(['web', 'main', 'automobiledetails']);
  }

  //////////////////////////////////////

  /////////////////////////////////////

  myControlSelectPreco = new FormControl('');

  loadingProcessLocatario = false;
  loadingProcessLocador = false;
  etapaAceitarProcesso = false;
  estapaAguardandoSelecaoFrete = false;
  aComecar = false;
  emAndamento = false;
  segundaSelecaoFrete = false;
  selecionarPreco = false;
  confirmarPreco = false;
  refazerPreco = false;
  aPagar = false;
  aAvaliar = false;

  ///////////////////////////////////

  infoLocatario: Account;
  arrayEndLocata: any;
  infoFreteiro: Account;
  infoLocador: Account;

  ngOnInit() {
    this.dadosLocatario$.subscribe((response) => {
      this.arrayEndLocata = response.CadastroComum?.Enderecos?.[0];
      this.infoLocatario = response;
    });

    this.dadosFreteiro$.subscribe((response) => {
      this.infoFreteiro = response;
    });

    this.dadosLocador$.subscribe((response) => {
      this.infoLocador = response;
    });

    ////////////////////////////////

    combineLatest([this.userProfile, this.processItem])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([profile, processItem]) => {
        this.etapaAceitarProcesso =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'A aceitar';

        this.estapaAguardandoSelecaoFrete =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'Aguardando Selecao de Frete de Ida';

        this.aComecar =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'A Comecar';

        this.emAndamento =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'Em Andamento';

        this.segundaSelecaoFrete =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'Aguardando Selecao de Frete de Volta';

        this.selecionarPreco =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'A Selecionar Preco';

        this.confirmarPreco =
          profile?.IdUsuario ===
            processItem?.Envolvidos?.Locatario?.idLocatario &&
          processItem?.Status === 'A Confirmar Preco';

        this.refazerPreco =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'A Refazer Preco';

        this.aPagar =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status === 'A Pagar';

        this.aAvaliar =
          profile?.IdUsuario ===
            processItem?.Envolvidos?.Locatario?.idLocatario &&
          processItem?.Status === 'A Avaliar';
      });
  }

  moveToHome() {
    this.router.navigate(['web', 'main', 'search']);
  }

  acceptProcess() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.acceptProcess(response._id).subscribe((response) => {
        this.snackBar.open('Processo Aceito com Sucesso', undefined, {
          duration: 3000,
        });
      });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  skipFrete() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.skipTransport(response._id).subscribe((response) => {
        this.snackBar.open('Frete skipado', undefined, {
          duration: 3000,
        });
      });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  comecarProcesso() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.initProcess(response._id).subscribe((response) => {
        this.snackBar.open('Processo Iniciado', undefined, {
          duration: 3000,
        });
      });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  finalizarAndamento() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.finishProcess(response._id).subscribe((response) => {
        this.snackBar.open('Processo finalizado', undefined, {
          duration: 3000,
        });
      });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  selectPreco() {
    const dataSelect: DadosTransacao = {
      QuantificadorPreco: parseFloat(
        this.myControlSelectPreco.value as unknown as string
      ),
      TipoRecebimento: 'ContaBancaria',
    };

    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService
        .selectPrice(response._id, dataSelect)
        .subscribe((response) => {
          this.snackBar.open('Preço Enviado', undefined, {
            duration: 3000,
          });
        });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  aceitarPreco() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.acceptPrice(response._id).subscribe((response) => {
        this.snackBar.open('Preço Aceito', undefined, {
          duration: 3000,
        });
      });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  recusarPreco() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.recusePrice(response._id).subscribe((response) => {
        this.snackBar.open('Preço Recusado', undefined, {
          duration: 3000,
        });
      });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  concluirProcesso() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.confirmPayment(response._id).subscribe((response) => {
        this.snackBar.open('Pagamento Confirmado', undefined, {
          duration: 3000,
        });
      });
      this.rentService.onSelectProcessFrete(response._id);
      this.moveToHome();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }
}
