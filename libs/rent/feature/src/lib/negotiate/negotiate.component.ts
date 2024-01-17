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
import {
  debounceTime,
  combineLatest,
  take,
  map,
  ReplaySubject,
  catchError,
} from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

interface OptionNameAndId {
  NomeCompleto: string;
  IdFreteiro: string | undefined;
}
interface Avaliacao {
  Nivel: number;
  Comentario: string;
}

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
  changeDetectorRef = inject(ChangeDetectorRef);

  userDate = this.accountService.userAccount$.pipe(debounceTime(1));
  userProfile = this.authService.userProfile$;
  processItem = this.rentService.selectedProcess$;
  processItemFrete = this.rentService.selectedProcessFrete$.pipe(
    map((response) => {
      console.log(response);

      return response;
    })
  );

  dadosLocador = new ReplaySubject<Account>(1);
  dadosLocador$ = this.dadosLocador.asObservable();
  dadosLocatario = new ReplaySubject<Account>(1);
  dadosLocatario$ = this.dadosLocatario.asObservable();
  dadosFreteiro = new ReplaySubject<Account>(1);
  dadosFreteiro$ = this.dadosFreteiro.asObservable();

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
  populateFret = this.processItemFrete.subscribe((response) => {
    if (response) {
      const idfreteiro = response.Envolvidos.Freteiro.idFreteiro;
      if (idfreteiro) {
        this.accountService.getUser(idfreteiro).subscribe((response) => {
          this.dadosFreteiro.next(response);
        });
        this.accountService
          .getUser(response.Envolvidos.Solicitante.idSolicitante)
          .subscribe((response) => {
            this.dadosLocador.next(response);
          });
      }
    }
  });

  myControlFrete = new FormControl('');
  myControlValue = new FormControl(null);
  options: OptionNameAndId[];
  valueFrete = 0;

  optionsForStringSubscribe = this.accountService.acharFreteiros$
    .pipe(
      map((response) => {
        return response.map((value) => {
          return {
            NomeCompleto:
              value.CadastroComum!.Nome + ' ' + value.CadastroComum!.Sobrenome,
            IdFreteiro: value._id,
          };
        });
      })
    )
    .subscribe((response) => {
      this.options = response;
    });

  filteredOptionsSubscribe = this.myControlFrete.valueChanges.pipe(
    map((value) => {
      if (value) {
        this.accountService.findFreteiros({
          busca: value,
          ordenarPor: 'MaisBemAvaliado',
        });
      }
      return this.filter(value || '');
    })
  );

  valueFreteSubscribe = this.myControlValue.valueChanges
    .pipe(
      map((value) => {
        console.log(value);
        if (value) {
          this.valueFrete = value;
        }
        return value;
      })
    )
    .subscribe();

  filter(value: string): OptionNameAndId[] {
    const filterValue = value.toLowerCase();
    if (this.options) {
      return this.options.filter((option) =>
        option.NomeCompleto.toLowerCase().includes(filterValue)
      );
    } else {
      return [{ NomeCompleto: '', IdFreteiro: '' }];
    }
  }

  selectedFreteiro: Account;

  onSelectecFreteiro(event: MatAutocompleteSelectedEvent) {
    const valueId = event.option.value;
    const valueObject = this.options.filter(
      (value) => value.IdFreteiro === valueId
    );
    this.myControlFrete.setValue(valueObject[0].NomeCompleto);

    this.accountService.getUser(valueId).subscribe((response) => {
      this.selectedFreteiro = response;
    });
  }

  moveToAutomovel(id: string | undefined) {
    this.accountService.onSelectAutomovelForOtherUser(
      id as string,
      this.selectedFreteiro
    );
    this.router.navigate(['web', 'main', 'automobiledetails']);
  }

  applyFreteiro() {
    combineLatest([this.processItem, this.userProfile, this.userDate])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([process, profile, account]) => {
        this.rentService
          .createProcessFrete(
            process._id,
            process.Maquina.idMaquina,
            this.selectedFreteiro._id as string,
            profile.IdUsuario,
            account.CadastroComum?.Enderecos?.[0]._id as string,
            this.valueFrete
          )
          .pipe(
            catchError((error) => {
              console.log(error);
              this.snackBar.open(
                'Erro ao Solicitar Freteiro, Verifique as informações Inseridas',
                undefined,
                { duration: 3000 }
              );
              throw new Error(error);
            })
          )
          .subscribe((response) => {
            this.snackBar.open('Frete solicitado', undefined, {
              duration: 3000,
            });
            this.nextProcess();
            this.userProfile.pipe(take(1)).subscribe((response) => {
              this.accountService.nextAccount(response.IdUsuario);
            });
          });
      });
  }

  //////////////////////////////////////

  /////////////////////////////////////

  myControlSelectPreco = new FormControl('');

  loadingProcessLocatario = false;
  loadingProcessLocador = false;
  loadingProcessFreteiro = false;
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
  Avaliado = false;

  ///////////////////////////////////

  isLocador = false;
  isFreteiro = false;
  isSolicitante = false;
  etapaAceitarProcessoFrete = false;
  aComecarFrete = false;
  emAndamentoFrete = false;
  aPagarFrete = false;
  aAvaliarFrete = false;
  AvaliadoFrete = false;

  ///////////////////////////////////

  infoLocatario: Account;
  infoLocatarioEndereco: any;
  infoLocatarioTelefone1: any;
  infoLocatarioTelefone2: any;
  infoFreteiro: Account;
  infoLocador: Account;

  ngOnInit() {
    this.searchService.changeNavTab('Processo');

    this.dadosLocatario$.subscribe((response) => {
      console.log(response);

      this.infoLocatario = response;
      this.infoLocatarioEndereco = response.CadastroComum?.Enderecos?.[0];
      this.infoLocatarioTelefone1 = response.CadastroComum?.Telefone?.[0];
      this.infoLocatarioTelefone2 = response.CadastroComum?.Telefone?.[1];
    });

    this.dadosFreteiro$.subscribe((response) => {
      console.log(response);
      this.infoFreteiro = response;
    });

    this.dadosLocador$.subscribe((response) => {
      console.log(response);
      this.infoLocador = response;
    });

    ////////////////////////////////

    combineLatest([this.userProfile, this.processItem])
      .pipe(debounceTime(1000))
      .subscribe(([profile, processItem]) => {
        console.log('passei');

        this.isLocador =
          profile.IdUsuario === processItem.Envolvidos.Locador.idLocador;

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

        this.Avaliado =
          profile?.IdUsuario ===
            processItem?.Envolvidos?.Locatario?.idLocatario &&
          processItem?.Status === 'Avaliado';

        this.loadingProcessLocatario =
          profile?.IdUsuario ===
            processItem?.Envolvidos?.Locatario?.idLocatario &&
          processItem?.Status !== 'A Confirmar Preco' &&
          processItem?.Status !== 'A Avaliar' &&
          processItem?.Status !== 'Avaliado';

        this.loadingProcessLocador =
          profile?.IdUsuario === processItem?.Envolvidos?.Locador?.idLocador &&
          processItem?.Status !== 'A Pagar' &&
          processItem?.Status !== 'A Refazer Preco' &&
          processItem?.Status !== 'A Selecionar Preco' &&
          processItem?.Status !== 'Aguardando Selecao de Frete de Volta' &&
          processItem?.Status !== 'Em Andamento' &&
          processItem?.Status !== 'A Comecar' &&
          processItem?.Status !== 'Aguardando Selecao de Frete de Ida' &&
          processItem?.Status !== 'A aceitar';
      });

    combineLatest([this.userProfile, this.processItemFrete])
      .pipe(debounceTime(1000))
      .subscribe(([profile, processItemFrete]) => {
        this.isFreteiro =
          profile.IdUsuario === processItemFrete.Envolvidos.Freteiro.idFreteiro;

        this.isSolicitante =
          profile.IdUsuario ===
          processItemFrete.Envolvidos.Solicitante.idSolicitante;

        this.etapaAceitarProcessoFrete =
          this.isFreteiro && processItemFrete.Status === 'A aceitar';

        this.aComecarFrete =
          this.isFreteiro && processItemFrete.Status === 'A Comecar';

        this.emAndamentoFrete =
          this.isFreteiro && processItemFrete.Status === 'Em Andamento';

        this.aPagarFrete =
          this.isFreteiro && processItemFrete.Status === 'A Pagar';

        this.aAvaliarFrete =
          this.isSolicitante && processItemFrete.Status === 'A Avaliar';

        this.AvaliadoFrete =
          this.isSolicitante && processItemFrete.Status === 'Avaliado';

        this.loadingProcessFreteiro =
          this.isFreteiro &&
          processItemFrete.Status !== 'A aceitar' &&
          processItemFrete.Status !== 'A Comecar' &&
          processItemFrete.Status !== 'Em Andamento' &&
          processItemFrete.Status !== 'A Pagar';
      });
  }

  nextProcess() {
    this.processItem.pipe(take(1), debounceTime(1000)).subscribe((response) => {
      this.rentService.onSelectProcess(response._id);
    });
    this.processItemFrete
      .pipe(take(1), debounceTime(1000))
      .subscribe((response) => {
        this.rentService.onSelectProcessFrete(response._id);
      });
  }

  moveToItem() {
    this.router.navigate(['web', 'main', 'details']);
  }

  acceptProcess() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.acceptProcess(response._id).subscribe((response) => {
        this.snackBar.open('Processo Aceito com Sucesso', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  recuseProcess() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.recuseProcess(response._id).subscribe((response) => {
        this.snackBar.open('Processo Recusado com Sucesso', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  createProcessFrete(freteiroId: string, value: number) {
    this.rentService.userCreateProcessFrete(freteiroId, value);
    this.nextProcess();
  }

  skipFrete() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.skipTransport(response._id).subscribe((response) => {
        this.snackBar.open('Frete Pulado', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  comecarProcesso() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.initProcess(response._id).subscribe((response) => {
        this.snackBar.open('Processo Iniciado', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  finalizarAndamento() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.finishProcess(response._id).subscribe((response) => {
        this.snackBar.open('Processo finalizado', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
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
      this.nextProcess();
    });
  }

  aceitarPreco() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.acceptPrice(response._id).subscribe((response) => {
        this.snackBar.open('Preço Aceito', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  recusarPreco() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.recusePrice(response._id).subscribe((response) => {
        this.snackBar.open('Preço Recusado', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  concluirProcesso() {
    this.processItem.pipe(take(1)).subscribe((response) => {
      this.rentService.confirmPayment(response._id).subscribe((response) => {
        this.snackBar.open('Pagamento Confirmado', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  // PROCESSO DE FRETE

  selectedAutomovelId = 'Nenhum';

  selectAutomovel(automovelId: string) {
    this.selectedAutomovelId = automovelId;
  }

  acceptProcessFrete() {
    this.processItemFrete.pipe(take(1)).subscribe((response) => {
      this.rentService
        .acceptProcessFrete(response._id, this.selectedAutomovelId)
        .subscribe((response) => {
          this.snackBar.open('Processo Aceito com Sucesso', undefined, {
            duration: 3000,
          });
        });
      this.nextProcess();
    });
  }
  recuseProcessFrete() {
    this.processItemFrete.pipe(take(1)).subscribe((response) => {
      this.rentService
        .recuseProcessFrete(response._id)
        .subscribe((response) => {
          this.snackBar.open('Processo Recusado com Sucesso', undefined, {
            duration: 3000,
          });
        });
      this.router.navigate(['web', 'main', 'home']);
      this.nextProcess();
    });
  }

  comecarProcessFrete() {
    this.processItemFrete.pipe(take(1)).subscribe((response) => {
      this.rentService.initProcessFrete(response._id).subscribe((response) => {
        this.snackBar.open('Frete Iniciado com Sucesso', undefined, {
          duration: 3000,
        });
      });
      this.nextProcess();
    });
  }

  concluirProcessFrete() {
    this.processItemFrete.pipe(take(1)).subscribe((response) => {
      this.rentService
        .finishProcessFrete(response._id)
        .subscribe((response) => {
          this.snackBar.open('Frete Concluido com Sucesso', undefined, {
            duration: 3000,
          });
        });
      this.nextProcess();
    });
  }

  verificarPagamento() {
    this.processItemFrete.pipe(take(1)).subscribe((response) => {
      this.rentService
        .confirmPaymentFrete(response._id)
        .subscribe((response) => {
          this.snackBar.open(
            'Processo de Frete Concluido com Sucesso',
            undefined,
            {
              duration: 3000,
            }
          );
        });
      this.nextProcess();
    });
  }

  value = 0;
  myControlDescricaoAluguel = new FormControl('Minha Avaliação');
  myControlDescricaoFrete = new FormControl('Minha Avaliação');

  avaliarFrete() {
    combineLatest([this.userProfile, this.processItemFrete])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([profile, processItemFrete]) => {
        const avaliacao: Avaliacao = {
          Nivel: this.value,
          Comentario: this.myControlDescricaoFrete.value!,
        };
        this.rentService
          .avaliarFreteiro(
            profile.IdUsuario,
            processItemFrete.Envolvidos.Freteiro.idFreteiro,
            processItemFrete._id,
            avaliacao
          )
          .subscribe((response) => {
            this.snackBar.open('Avaliação enviada com Sucesso', undefined, {
              duration: 3000,
            });
          });
        this.nextProcess();
      });
  }

  avaliarAluguel() {
    combineLatest([this.userProfile, this.processItem])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([profile, processItem]) => {
        const avaliacao: Avaliacao = {
          Nivel: this.value,
          Comentario: this.myControlDescricaoAluguel.value!,
        };
        this.rentService
          .avaliarMaquina(
            profile.IdUsuario,
            processItem.Maquina.idMaquina,
            processItem._id,
            avaliacao
          )
          .subscribe((response) => {
            this.snackBar.open('Avaliação enviada com Sucesso', undefined, {
              duration: 3000,
            });
          });
        this.nextProcess();
      });
  }
}
