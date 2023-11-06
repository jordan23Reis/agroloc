import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import {
  AuthService,
  AccountService,
  Imagem,
  AccountData,
  UpdatePassword,
  NovoEndereco,
  Login,
  AuthStorage,
  ContaBancaria,
  InformacoesBancarias,
  Pix,
} from '@agroloc/account/data-acess';
import { combineLatest, debounceTime, map, take } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderFacade } from '@agroloc/shared/data-access';

@Component({
  selector: 'agroloc-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  platform = inject(Platform);
  authService = inject(AuthService);
  accountService = inject(AccountService);
  _formBuilder = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  loader = inject(LoaderFacade);
  authStorage = inject(AuthStorage);

  loadingRequest = this.loader.active$;

  userDate = this.accountService.userAccount$.pipe(debounceTime(1));
  userProfile = this.authService.userProfile$;

  isLogged = this.authService.IsLogged();
  notLogged = this.authService.IsLogged().pipe(
    map((response) => {
      return !response;
    })
  );

  isMobile = this.platform.ANDROID || this.platform.IOS;
  panelOpenState = false;
  disableNome = true;
  disableSobrenome = true;
  disableNascimento = true;
  disableGenero = true;
  disableCpf = true;
  disableCnpj = true;
  AllDisableInfoPessoais: boolean;
  FormDisableInfoPessoais: boolean;
  disableEmail = true;
  disableTelefoneOne = true;
  disableTelefoneTwo = true;
  AllDisableInfoContatos: boolean;
  disableSenha = true;
  disableNovaSenha = true;
  disableConfSenha = true;
  disableEndereco = true;
  disableBancarias = true;
  disablePix = true;
  disableForCep = false;

  ImageType: File | null | undefined = null;
  imagePreview: string | ArrayBuffer | null | undefined = null;
  phoneTypeTwo: string | null = null;
  passwordType: string | null = null;
  stringType = '';

  fotoPerfil = this._formBuilder.group({
    Imagem: [this.ImageType],
  });
  infoPessoais = this._formBuilder.group({
    Nome: [
      undefined,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNome),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNome),
      ],
    ],
    Sobrenome: [
      undefined,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSobrenome),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSobrenome),
      ],
    ],
    Nascimento: [undefined],
    Sexo: [
      undefined,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSexo),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSexo),
      ],
    ],
    Cpf: [
      undefined,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinCpf),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxCpf),
      ],
    ],
    Cnpj: [
      undefined,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinCnpj),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxCnpj),
      ],
    ],
  });

  infoContato = this._formBuilder.group({
    Email: [
      undefined,
      [
        Validators.email,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinEmail),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxEmail),
      ],
    ],
    TelefoneOne: [
      undefined,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNumeroTelefone),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNumeroTelefone),
      ],
    ],
    TelefoneTwo: [
      this.phoneTypeTwo,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNumeroTelefone),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNumeroTelefone),
      ],
    ],
  });

  infoSenha = this._formBuilder.group({
    Senha: [
      this.passwordType,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSenha),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSenha),
      ],
    ],
    NovaSenha: [
      this.passwordType,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSenha),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSenha),
      ],
    ],
    ConfSenha: [
      this.passwordType,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSenha),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSenha),
      ],
    ],
  });

  infoEndereco = this._formBuilder.group({
    Cep: [
      this.stringType,
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinCep),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxCep),
      ],
    ],
    Estado: [
      this.stringType,
      [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
    ],
    Cidade: [
      this.stringType,
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNomeCidade),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNomeCidade),
      ],
    ],
    Logradouro: [
      this.stringType,
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinLogradouro),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxLogradouro),
      ],
    ],
    Bairro: [
      this.stringType,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNomeBairro),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNomeBairro),
      ],
    ],
    Complemento: [
      this.stringType,
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinComplemento),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxComplemento),
      ],
    ],
    Numero: [
      null,
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNumero),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNumero),
      ],
    ],
  });

  infoBancarias = this._formBuilder.group({
    Agencia: [
      this.stringType,
      [
        Validators.required,
        Validators.minLength(
          UsuarioSchemaDtoRestraints.tamMinAgenciaContaBancaria
        ),
        Validators.maxLength(
          UsuarioSchemaDtoRestraints.tamMaxAgenciaContaBancaria
        ),
      ],
    ],
    Conta: [
      this.stringType,
      [
        Validators.required,
        Validators.minLength(
          UsuarioSchemaDtoRestraints.tamMinContaContaBancaria
        ),
        Validators.maxLength(
          UsuarioSchemaDtoRestraints.tamMaxContaContabancaria
        ),
      ],
    ],
  });

  infoPix = this._formBuilder.group({
    Chave: [
      this.stringType,
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinChavePix),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxChavePix),
      ],
    ],
    Tipo: [
      this.stringType,
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinTipoPix),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxTipoPix),
      ],
    ],
  });

  ngOnInit() {
    this.disableAllInfoPessoais();
    this.checkDisableInfoPessoais();
    this.disableAllInfoContatos();
    this.checkDisableInfoContatos();
    this.disableAllInfoEndereco();
    this.disableAllInfoBancarias();
    this.disableAllInfoPix();
  }

  disableAllInfoPessoais() {
    this.infoPessoais.controls['Nome'].disable();
    this.infoPessoais.controls['Sobrenome'].disable();
    this.infoPessoais.controls['Nascimento'].disable();
    this.infoPessoais.controls['Sexo'].disable();
    this.infoPessoais.controls['Cpf'].disable();
    this.infoPessoais.controls['Cnpj'].disable();
  }

  disableAllInfoContatos() {
    this.infoContato.controls['Email'].disable();
    this.infoContato.controls['TelefoneOne'].disable();
    this.infoContato.controls['TelefoneTwo'].disable();
  }

  disableAllInfoEndereco() {
    this.infoEndereco.controls['Cep'].disable();
    this.infoEndereco.controls['Estado'].disable();
    this.infoEndereco.controls['Cidade'].disable();
    this.infoEndereco.controls['Logradouro'].disable();
    this.infoEndereco.controls['Bairro'].disable();
    this.infoEndereco.controls['Complemento'].disable();
    this.infoEndereco.controls['Numero'].disable();
  }

  disableAllInfoBancarias() {
    this.infoBancarias.controls['Agencia'].disable();
    this.infoBancarias.controls['Conta'].disable();
  }

  disableAllInfoPix() {
    this.infoPix.controls['Chave'].disable();
    this.infoPix.controls['Tipo'].disable();
  }

  checkDisableInfoPessoais() {
    this.AllDisableInfoPessoais =
      this.disableNome &&
      this.disableSobrenome &&
      this.disableNascimento &&
      this.disableGenero &&
      this.disableCpf &&
      this.disableCnpj &&
      this.fotoPerfil.value.Imagem === null;
    this.FormDisableInfoPessoais =
      this.disableNome &&
      this.disableSobrenome &&
      this.disableNascimento &&
      this.disableGenero &&
      this.disableCpf &&
      this.disableCnpj;
  }

  checkDisableInfoContatos() {
    this.AllDisableInfoContatos =
      this.disableEmail && this.disableTelefoneOne && this.disableTelefoneTwo;
  }

  resetDisableInfoPessoais() {
    this.disableNome = true;
    this.disableSobrenome = true;
    this.disableNascimento = true;
    this.disableGenero = true;
    this.disableCpf = true;
    this.disableCnpj = true;
  }

  resetDisableInfoContatos() {
    this.disableEmail = true;
    this.disableTelefoneOne = true;
    this.disableTelefoneTwo = true;
  }

  resetDisableInfoEndereco() {
    this.disableEndereco = true;
  }

  resetDisableInfoBancarias() {
    this.disableBancarias = true;
  }

  resetDisableInfoPix() {
    this.disablePix = true;
  }

  selectImage() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleImageSelection(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fotoPerfil.patchValue({ Imagem: file });
      this.imagePreview = URL.createObjectURL(file);
    }
    this.checkDisableInfoPessoais();
  }

  swtichStateEditName() {
    if (this.disableNome) {
      this.infoPessoais.controls['Nome'].enable();
      this.disableNome = !this.disableNome;
    } else {
      this.infoPessoais.controls['Nome'].disable();
      this.disableNome = !this.disableNome;
    }
    this.checkDisableInfoPessoais();
  }

  swtichStateEditSobrenome() {
    if (this.disableSobrenome) {
      this.infoPessoais.controls['Sobrenome'].enable();
      this.disableSobrenome = !this.disableSobrenome;
    } else {
      this.infoPessoais.controls['Sobrenome'].disable();
      this.disableSobrenome = !this.disableSobrenome;
    }
    this.checkDisableInfoPessoais();
  }

  swtichStateEditNascimento() {
    this.infoPessoais.controls['Nascimento'].enable();
    this.disableNascimento = false;
    this.checkDisableInfoPessoais();
  }

  swtichStateEditSexo() {
    if (this.disableGenero) {
      this.infoPessoais.controls['Sexo'].enable();
      this.disableGenero = !this.disableGenero;
    } else {
      this.infoPessoais.controls['Sexo'].disable();
      this.infoPessoais.patchValue({ Sexo: null });
      this.disableGenero = !this.disableGenero;
    }
    this.checkDisableInfoPessoais();
  }

  swtichStateEditCpf() {
    if (this.disableCpf) {
      this.infoPessoais.controls['Cpf'].enable();
      this.disableCpf = !this.disableCpf;
    } else {
      this.infoPessoais.controls['Cpf'].disable();
      this.disableCpf = !this.disableCpf;
    }
    this.checkDisableInfoPessoais();
  }

  swtichStateEditCnpj() {
    if (this.disableCnpj) {
      this.infoPessoais.controls['Cnpj'].enable();
      this.disableCnpj = !this.disableCnpj;
    } else {
      this.infoPessoais.controls['Cnpj'].disable();
      this.disableCnpj = !this.disableCnpj;
    }
    this.checkDisableInfoPessoais();
  }

  swtichStateEditEmail() {
    if (this.disableEmail) {
      this.infoContato.controls['Email'].enable();
      this.disableEmail = !this.disableEmail;
    } else {
      this.infoContato.controls['Email'].disable();
      this.disableEmail = !this.disableEmail;
    }
    this.checkDisableInfoContatos();
  }

  swtichStateEditTelefoneOne() {
    if (this.disableTelefoneOne) {
      this.infoContato.controls['TelefoneOne'].enable();
      this.disableTelefoneOne = !this.disableTelefoneOne;
    } else {
      this.infoContato.controls['TelefoneOne'].disable();
      this.disableTelefoneOne = !this.disableTelefoneOne;
    }
    this.checkDisableInfoContatos();
  }

  swtichStateEditTelefoneTwo() {
    if (this.disableTelefoneTwo) {
      this.infoContato.controls['TelefoneTwo'].enable();
      this.disableTelefoneTwo = !this.disableTelefoneTwo;
    } else {
      this.infoContato.controls['TelefoneTwo'].disable();
      this.disableTelefoneTwo = !this.disableTelefoneTwo;
    }
    this.checkDisableInfoContatos();
  }

  swtichStateEditEndereco() {
    if (this.disableEndereco) {
      this.infoEndereco.controls['Cep'].enable();
      this.infoEndereco.controls['Estado'].enable();
      this.infoEndereco.controls['Cidade'].enable();
      this.infoEndereco.controls['Logradouro'].enable();
      this.infoEndereco.controls['Bairro'].enable();
      this.infoEndereco.controls['Complemento'].enable();
      this.infoEndereco.controls['Numero'].enable();
      this.disableEndereco = !this.disableEndereco;
    } else {
      this.infoEndereco.controls['Cep'].disable();
      this.infoEndereco.controls['Estado'].disable();
      this.infoEndereco.controls['Cidade'].disable();
      this.infoEndereco.controls['Logradouro'].disable();
      this.infoEndereco.controls['Bairro'].disable();
      this.infoEndereco.controls['Complemento'].disable();
      this.infoEndereco.controls['Numero'].disable();
      this.disableEndereco = !this.disableEndereco;
    }
  }

  swtichStateEditBancarias() {
    if (this.disableBancarias) {
      this.infoBancarias.controls['Agencia'].enable();
      this.infoBancarias.controls['Conta'].enable();
      this.disableBancarias = !this.disableBancarias;
      this.disableAllInfoPix();
      this.resetDisableInfoPix();
    } else {
      this.infoBancarias.controls['Agencia'].disable();
      this.infoBancarias.controls['Conta'].disable();
      this.disableBancarias = !this.disableBancarias;
    }
  }

  swtichStateEditPix() {
    if (this.disablePix) {
      this.infoPix.controls['Chave'].enable();
      this.infoPix.controls['Tipo'].enable();
      this.disablePix = !this.disablePix;
      this.disableAllInfoBancarias();
      this.resetDisableInfoBancarias();
    } else {
      this.infoPix.controls['Chave'].disable();
      this.infoPix.controls['Tipo'].disable();
      this.disablePix = !this.disablePix;
    }
  }

  setInfoPessoais() {
    let dataUser: AccountData;

    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        dataUser = account as unknown as AccountData;

        if (!this.disableNome) {
          dataUser.CadastroComum!.Nome = this.infoPessoais.value
            .Nome as unknown as string;
        }
        if (!this.disableSobrenome) {
          dataUser.CadastroComum!.Sobrenome = this.infoPessoais.value
            .Sobrenome as unknown as string;
        }
        if (!this.disableNascimento) {
          dataUser.CadastroComum!.DataDeNascimento = this.infoPessoais.value
            .Nascimento as unknown as string;
        }
        if (!this.disableCpf) {
          dataUser.CadastroComum!.Cpf = this.infoPessoais.value
            .Cpf as unknown as string;
        }
        if (!this.disableCnpj) {
          dataUser.CadastroComum!.Cnpj = this.infoPessoais.value
            .Cnpj as unknown as string;
        }

        if (this.fotoPerfil.value.Imagem) {
          this.accountService
            .updatePhoto(profile.IdUsuario, this.fotoPerfil.value as Imagem)
            .subscribe((response) => {
              this.snackBar.open(`Foto Alterada`, undefined, {
                duration: 3000,
              });
              this.fotoPerfil.patchValue({ Imagem: this.ImageType });
              this.checkDisableInfoPessoais();
              this.accountService.nextAccount(profile.IdUsuario);
            });
        }
        if (!this.FormDisableInfoPessoais) {
          this.accountService
            .updateAccount(profile.IdUsuario, dataUser)
            .subscribe((response) => {
              this.snackBar.open(`Informações Alterada`, undefined, {
                duration: 3000,
              });
              this.disableAllInfoPessoais();
              this.resetDisableInfoPessoais();
              this.checkDisableInfoPessoais();
              this.accountService.nextAccount(profile.IdUsuario);
            });
        }
      });
  }

  setInfoContatos() {
    let dataUser: AccountData;

    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        dataUser = account as unknown as AccountData;

        // if (!this.disableEmail) {
        //   dataUser.Login.Email = this.infoPessoais.value
        //     .Nome as unknown as string;
        // }
        if (!this.disableTelefoneOne) {
          dataUser.CadastroComum!.Telefone = [
            this.infoContato.value.TelefoneOne as unknown as string,
            account.CadastroComum?.Telefone?.[1] as string,
          ];
        }
        if (!this.disableTelefoneTwo) {
          if (account.CadastroComum?.Telefone?.[0]) {
            dataUser.CadastroComum!.Telefone = [
              account.CadastroComum?.Telefone?.[0] as string,
              this.infoContato.value.TelefoneTwo as unknown as string,
            ];
          } else {
            dataUser.CadastroComum!.Telefone = [
              this.infoContato.value.TelefoneTwo as unknown as string,
            ];
            this.infoContato.patchValue({ TelefoneTwo: 'Sem Telefone 2' });
          }
        }

        if (!this.AllDisableInfoContatos) {
          this.accountService
            .updateAccount(profile.IdUsuario, dataUser)
            .subscribe((response) => {
              this.snackBar.open(`Informações Alterada`, undefined, {
                duration: 3000,
              });
              this.disableAllInfoContatos();
              this.resetDisableInfoContatos();
              this.checkDisableInfoContatos();
              this.accountService.nextAccount(profile.IdUsuario);
            });
        }
      });
  }

  setInfoSenha() {
    const newPassword: UpdatePassword = {
      Senha: this.infoSenha.value.NovaSenha as unknown as string,
    };
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        if (this.infoSenha.value.NovaSenha === this.infoSenha.value.ConfSenha) {
          const dateAccount: Login = {
            Email: account.Login.Email as unknown as string,
            Senha: this.infoSenha.value.Senha as unknown as string,
          };

          this.authService
            .SingIn(dateAccount)
            .pipe(take(1))
            .subscribe((response) => {
              this.authStorage.setAcessToken(response.access_token);
              this.accountService
                .updatePassword(profile.IdUsuario, newPassword)
                .pipe(take(1))
                .subscribe((response) => {
                  this.snackBar.open(`Senha Alterada`, undefined, {
                    duration: 3000,
                  });
                  this.accountService.nextAccount(profile.IdUsuario);
                });
            });
        } else {
          this.snackBar.open(`Senha Incorreta`, undefined, {
            duration: 3000,
          });
        }
      });
  }

  setInfoEndereco() {
    let novoEndereco: NovoEndereco;
    console.log(this.infoEndereco.value);

    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        if (this.infoEndereco.valid) {
          console.log('passei');
          novoEndereco = this.infoEndereco.value as unknown as NovoEndereco;
          novoEndereco.Cep = novoEndereco.Cep.toString();
          this.accountService
            .addEndereco(profile.IdUsuario, novoEndereco)
            .subscribe((response) => {
              this.snackBar.open(`Endereço Adicionado`, undefined, {
                duration: 3000,
              });
              this.disableAllInfoEndereco();
              this.resetDisableInfoEndereco();
              this.accountService.nextAccount(profile.IdUsuario);
            });
        }
      });
  }

  remInfoEndereco(endereco: string) {
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        this.accountService
          .removeEndereco(profile.IdUsuario, endereco)
          .subscribe((response) => {
            this.snackBar.open(`Endereço Removido`, undefined, {
              duration: 3000,
            });
            this.accountService.nextAccount(profile.IdUsuario);
          });
      });
  }

  setInfoBancarias() {
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        let addCount = 0;
        if (account.InformacoesBancarias) {
          if (this.infoBancarias.valid) {
            account.InformacoesBancarias.ContaBancaria = this.infoBancarias
              .value as unknown as ContaBancaria;
            addCount += 1;
          }
          if (this.infoPix.valid) {
            account.InformacoesBancarias.Pix = this.infoPix
              .value as unknown as Pix;
            addCount += 1;
          }
        } else {
          let informacoesBancarias: InformacoesBancarias;
          if (this.infoBancarias.valid) {
            informacoesBancarias = {
              ContaBancaria: this.infoBancarias
                .value as unknown as ContaBancaria,
            };
            account.InformacoesBancarias = informacoesBancarias;
            addCount += 1;
          }
          if (this.infoPix.valid) {
            informacoesBancarias = {
              Pix: this.infoPix.value as unknown as Pix,
            };
            account.InformacoesBancarias = informacoesBancarias;
            addCount += 1;
          }
        }

        if (addCount) {
          console.log(addCount);

          this.accountService
            .updateInformacoesBancarias(
              profile.IdUsuario,
              account.InformacoesBancarias as InformacoesBancarias
            )
            .subscribe((response) => {
              this.snackBar.open(
                `Informações Bancárias Adicionado`,
                undefined,
                {
                  duration: 3000,
                }
              );
              this.disableAllInfoBancarias();
              this.disableAllInfoPix();
              this.resetDisableInfoBancarias();
              this.resetDisableInfoPix();
              this.accountService.nextAccount(profile.IdUsuario);
            });
        } else {
          this.snackBar.open(
            `Erro ao adicionar Informações Bancárias`,
            undefined,
            {
              duration: 3000,
            }
          );
        }
      });
  }

  remInfoBancarias() {
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        let remCont = 0;
        if (account.InformacoesBancarias) {
          if (account.InformacoesBancarias.ContaBancaria) {
            account.InformacoesBancarias.ContaBancaria = undefined;
            remCont += 1;
          }
        }

        if (remCont === 1) {
          this.accountService
            .updateInformacoesBancarias(
              profile.IdUsuario,
              account.InformacoesBancarias as InformacoesBancarias
            )
            .subscribe((response) => {
              this.snackBar.open(`Informações Bancárias Removido`, undefined, {
                duration: 3000,
              });
              this.accountService.nextAccount(profile.IdUsuario);
            });
        } else {
          this.snackBar.open(
            `Erro ao remover Informações Bancárias`,
            undefined,
            {
              duration: 3000,
            }
          );
        }
      });
  }

  remInfoPix() {
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        let remCont = 0;
        if (account.InformacoesBancarias) {
          if (account.InformacoesBancarias.Pix) {
            account.InformacoesBancarias.Pix = undefined;
            remCont += 1;
          }
        }

        if (remCont === 1) {
          this.accountService
            .updateInformacoesBancarias(
              profile.IdUsuario,
              account.InformacoesBancarias as InformacoesBancarias
            )
            .subscribe((response) => {
              this.snackBar.open(`Pix Removido`, undefined, {
                duration: 3000,
              });
              this.accountService.nextAccount(profile.IdUsuario);
            });
        } else {
          this.snackBar.open(`Erro ao remover o Pix`, undefined, {
            duration: 3000,
          });
        }
      });
  }

  findCep() {
    const cepValue = this.infoEndereco.value.Cep?.toString();
    this.accountService
      .findCepEndereco(cepValue as string)
      .pipe(debounceTime(1000))
      .subscribe((response) => {
        this.infoEndereco.patchValue({
          Cidade: response.localidade,
          Estado: response.uf,
        });
        this.snackBar.open('Cep Encontrado', 'Fechar', {
          duration: 3000,
        });
        this.disableForCep = true;
      });
  }
}
