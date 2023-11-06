import {
  AuthService,
  AccountService,
  AuthStorage,
  NovoEndereco,
} from '@agroloc/account/data-acess';
import { Machinery, MachineryService } from '@agroloc/machinery/data-access';
import { LoaderFacade } from '@agroloc/shared/data-access';
import {
  MaquinaSchemaDtoRestraints,
  UsuarioSchemaDtoRestraints,
} from '@agroloc/shared/util';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  map,
  retry,
  take,
} from 'rxjs';

@Component({
  selector: 'agroloc-machinery-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class MachineryRegisterComponent implements OnInit {
  platform = inject(Platform);
  breakpointObserver = inject(BreakpointObserver);
  formBuilder = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  loader = inject(LoaderFacade);
  authService = inject(AuthService);
  authStorage = inject(AuthStorage);
  accountService = inject(AccountService);
  machineryService = inject(MachineryService);

  loadingRequest = this.loader.active$;

  userDate = this.accountService.userAccount$.pipe(debounceTime(1));
  userProfile = this.authService.userProfile$;

  isLogged = this.authService.IsLogged();
  notLogged = this.authService.IsLogged().pipe(
    map((response) => {
      return !response;
    })
  );

  allCategories = this.machineryService.findAllCategories().pipe(
    map((response) => {
      return response.filter((category) => category.Tipo === 'Maquina');
    })
  );

  allTypePrice = this.machineryService.findPriceTypes();

  isOptional = false;
  isMobile = this.platform.ANDROID || this.platform.IOS;
  disableEndereco = true;
  disableForCep = false;

  #imagensSecundarias = new BehaviorSubject<string[]>([]);
  imagensSecundarias = this.#imagensSecundarias.asObservable();
  imagemPrincipalPreview: string | ArrayBuffer | null | undefined = null;

  imageUrl: string | ArrayBuffer | null | undefined = null;
  listImageUrl: string[] | null | undefined = null;

  ImagemPrincipalType: File | null | undefined = null;
  ImagemSecundariasType: File[] = [];
  typeNumber: number | null = null;

  firstFormGroup = this.formBuilder.group({
    ImagemPrincipal: [this.ImagemPrincipalType, Validators.required],
    Nome: [
      '',
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.tamMaxNomeMaquina),
        Validators.minLength(MaquinaSchemaDtoRestraints.tamMinNomeMaquina),
      ],
    ],
    Categoria: [
      '',
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.tamMaxCategoria),
        Validators.minLength(MaquinaSchemaDtoRestraints.tamMinCategoria),
      ],
    ],
    Descricao: [
      '',
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.tamMaxDescricaoMaquina),
        Validators.minLength(MaquinaSchemaDtoRestraints.tamMinDescricaoMaquina),
      ],
    ],
  });
  secondFormGroup = this.formBuilder.group({
    Peso: [
      this.typeNumber,
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.pesoMaxMaquina),
        Validators.minLength(MaquinaSchemaDtoRestraints.pesoMinMaquina),
      ],
    ],
    Comprimento: [
      this.typeNumber,
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.comprimentoMaxMaquina),
        Validators.minLength(MaquinaSchemaDtoRestraints.comprimentoMinMaquina),
      ],
    ],
    Largura: [
      this.typeNumber,
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.larguraMaxMaquina),
        Validators.minLength(MaquinaSchemaDtoRestraints.larguraMinMaquina),
      ],
    ],
    Altura: [
      this.typeNumber,
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.alturaMaxMaquina),
        Validators.minLength(MaquinaSchemaDtoRestraints.alturaMinMaquina),
      ],
    ],
  });
  thirdFormGroup = this.formBuilder.group({
    ImagemSecundarias: [this.ImagemSecundariasType, Validators.required],
  });

  secondFormGroupEnd = this.formBuilder.group({
    IdEndereco: [
      '',
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.tamMaxIdEndereco),
        Validators.minLength(MaquinaSchemaDtoRestraints.tamMinIdEndereco),
      ],
    ],
  });

  thirdFormGroupEnd = this.formBuilder.group({
    ValorPorTipo: [
      '',
      [
        Validators.required,
        Validators.maxLength(MaquinaSchemaDtoRestraints.ValorPorTipoMax),
        Validators.minLength(MaquinaSchemaDtoRestraints.ValorPorTipoMin),
      ],
    ],
    idTipo: ['', [Validators.required]],
  });

  infoEndereco = this.formBuilder.group({
    Cep: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinCep),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxCep),
      ],
    ],
    Estado: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
    ],
    Cidade: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNomeCidade),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNomeCidade),
      ],
    ],
    Logradouro: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinLogradouro),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxLogradouro),
      ],
    ],
    Bairro: [
      '',
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNomeBairro),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNomeBairro),
      ],
    ],
    Complemento: [
      '',
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinComplemento),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxComplemento),
      ],
    ],
    Numero: [
      this.typeNumber,
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNumero),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNumero),
      ],
    ],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 950px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.disableAllInfoEndereco();
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

  resetDisableInfoEndereco() {
    this.disableEndereco = true;
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

  setInfoEndereco() {
    let novoEndereco: NovoEndereco;

    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        if (this.infoEndereco.valid) {
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

  addInfoEndereco(endereco: string) {
    this.secondFormGroupEnd.patchValue({ IdEndereco: endereco });
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

  onImagemPrincipalSelected(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      this.firstFormGroup.patchValue({ ImagemPrincipal: file });
      this.imagemPrincipalPreview = URL.createObjectURL(file);
    }
  }

  onImagensSecundariasSelected(event: any) {
    const fileList = event.target.files as FileList;
    const files: File[] = Array.from(fileList);

    if (files.length > 0) {
      this.thirdFormGroup.patchValue({ ImagemSecundarias: files });
      this.#imagensSecundarias.next(files.map(URL.createObjectURL));
    }
  }

  registerMachiney() {
    let machineryData: Machinery;
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        if (
          this.firstFormGroup.valid &&
          this.secondFormGroup.valid &&
          this.thirdFormGroup.valid &&
          this.secondFormGroupEnd.valid &&
          this.thirdFormGroupEnd.valid
        ) {
          machineryData = {
            Nome: this.firstFormGroup.value.Nome as unknown as string,
            Descricao: this.firstFormGroup.value.Descricao as unknown as string,
            Peso: this.secondFormGroup.value.Peso as unknown as number,
            Comprimento: this.secondFormGroup.value
              .Comprimento as unknown as number,
            Largura: this.secondFormGroup.value.Largura as unknown as number,
            Altura: this.secondFormGroup.value.Altura as unknown as number,
            EstaAtiva: true,
            idCategoria: this.firstFormGroup.value
              .Categoria as unknown as string,
            IdEndereco: this.secondFormGroupEnd.value
              .IdEndereco as unknown as string,
            Preco: {
              idTipo: this.thirdFormGroupEnd.value.idTipo as unknown as string,
              ValorPorTipo: this.thirdFormGroupEnd.value
                .ValorPorTipo as unknown as number,
            },
          };

          this.machineryService
            .createMachinery(machineryData)
            .subscribe((response) => {
              this.snackBar.open(`Cadastro efetuado com Sucesso!!`, undefined, {
                duration: 3000,
              });

              if (this.firstFormGroup.value.ImagemPrincipal) {
                console.log(response);

                this.machineryService
                  .createMainImage(
                    response._id as string,
                    this.firstFormGroup.value.ImagemPrincipal as File
                  )
                  .pipe(retry(3), debounceTime(1000))
                  .subscribe((response) => {
                    this.accountService.nextAccount(profile.IdUsuario);
                  });
              }

              if (this.thirdFormGroup.value.ImagemSecundarias) {
                this.machineryService
                  .createSecondaryImages(
                    response._id as string,
                    this.thirdFormGroup.value.ImagemSecundarias as File[]
                  )
                  .pipe(retry(3), debounceTime(1000))
                  .subscribe((response) => {
                    this.accountService.nextAccount(profile.IdUsuario);
                  });
              }

              this.accountService.nextAccount(profile.IdUsuario);
            });
        } else {
          this.snackBar.open('Informações invalidas', 'Fechar', {
            duration: 3000,
          });
        }
      });
  }
}
