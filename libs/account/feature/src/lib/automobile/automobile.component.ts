import {
  AuthService,
  AuthStorage,
  AccountService,
  NovoEndereco,
  Automovel,
} from '@agroloc/account/data-acess';
import { MachineryService, Machinery } from '@agroloc/machinery/data-access';
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
  debounceTime,
  map,
  BehaviorSubject,
  Observable,
  combineLatest,
  take,
} from 'rxjs';

@Component({
  selector: 'agroloc-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.scss'],
})
export class AutomobileComponent {
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
      return response.filter((category) => category.Tipo === 'Automovel');
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

  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 950px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
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
    let automobileData: Automovel;
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1), debounceTime(1000))
      .subscribe(([account, profile]) => {
        if (
          this.firstFormGroup.valid &&
          this.secondFormGroup.valid &&
          this.thirdFormGroup.valid
        ) {
          automobileData = {
            Nome: this.firstFormGroup.value.Nome as unknown as string,
            Descricao: this.firstFormGroup.value.Descricao as unknown as string,
            Peso: this.secondFormGroup.value.Peso as unknown as number,
            Comprimento: this.secondFormGroup.value
              .Comprimento as unknown as number,
            Largura: this.secondFormGroup.value.Largura as unknown as number,
            Altura: this.secondFormGroup.value.Altura as unknown as number,
            idCategoria: this.firstFormGroup.value
              .Categoria as unknown as string,
          };
          this.accountService
            .addAutomovel(profile.IdUsuario, automobileData)
            .subscribe((response) => {
              this.snackBar.open(`Automovel Adicionado`, undefined, {
                duration: 3000,
              });

              if (this.firstFormGroup.value.ImagemPrincipal) {
                this.accountService
                  .updateAutomovelImagemPrincipal(
                    profile.IdUsuario,
                    response._id as string,
                    this.firstFormGroup.value.ImagemPrincipal as File
                  )
                  .subscribe((response) => {
                    this.accountService.nextAccount(profile.IdUsuario);
                  });
              }

              if (this.thirdFormGroup.value.ImagemSecundarias) {
                this.accountService
                  .addOrUpdateAutomovelImagensSecundarias(
                    profile.IdUsuario,
                    response._id as string,
                    this.thirdFormGroup.value.ImagemSecundarias as File[]
                  )
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
