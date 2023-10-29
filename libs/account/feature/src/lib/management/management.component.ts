import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import {
  AuthService,
  AccountService,
  Imagem,
  AccountData,
} from '@agroloc/account/data-acess';
import { combineLatest, map, take } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioSchemaDtoRestraints } from '@agroloc/shared/util';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  userDate = this.accountService.userAccount$.pipe(
    map((response) => {
      return response;
    })
  );
  userProfile = this.authService.userProfile$.pipe(
    map((response) => {
      return response;
    })
  );

  // enctype="multipart/form-data"

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
  AllDisable: boolean;

  Image: File | null | undefined = null;
  imagePreview: string | ArrayBuffer | null | undefined = null;

  fotoPerfil = this._formBuilder.group({
    Foto: [this.Image],
  });
  infoPessoais = this._formBuilder.group({
    CadastroComum: this._formBuilder.group({
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
    }),
  });

  ngOnInit() {
    this.infoPessoais.controls['CadastroComum'].controls['Nome'].disable();
    this.infoPessoais.controls['CadastroComum'].controls['Sobrenome'].disable();
    this.infoPessoais.controls['CadastroComum'].controls[
      'Nascimento'
    ].disable();
    this.infoPessoais.controls['CadastroComum'].controls['Sexo'].disable();
    this.infoPessoais.controls['CadastroComum'].controls['Cpf'].disable();
    this.infoPessoais.controls['CadastroComum'].controls['Cnpj'].disable();
    this.checkDisable();
  }

  checkDisable() {
    this.AllDisable =
      this.disableNome &&
      this.disableSobrenome &&
      this.disableNascimento &&
      this.disableGenero &&
      this.disableCpf &&
      this.disableCnpj &&
      this.fotoPerfil.value.Foto === null;
  }

  selectImage() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleImageSelection(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fotoPerfil.patchValue({ Foto: file });
      this.imagePreview = URL.createObjectURL(file);
    }
    this.checkDisable();
  }

  swtichStateEditName() {
    if (this.disableNome) {
      this.infoPessoais.controls['CadastroComum'].controls['Nome'].enable();
      this.disableNome = !this.disableNome;
    } else {
      this.infoPessoais.controls['CadastroComum'].controls['Nome'].disable();
      this.disableNome = !this.disableNome;
    }
    this.checkDisable();
  }

  swtichStateEditSobrenome() {
    if (this.disableSobrenome) {
      this.infoPessoais.controls['CadastroComum'].controls[
        'Sobrenome'
      ].enable();
      this.disableSobrenome = !this.disableSobrenome;
    } else {
      this.infoPessoais.controls['CadastroComum'].controls[
        'Sobrenome'
      ].disable();
      this.disableSobrenome = !this.disableSobrenome;
    }
    this.checkDisable();
  }

  swtichStateEditNascimento() {
    this.infoPessoais.controls['CadastroComum'].controls['Nascimento'].enable();
    this.checkDisable();
  }

  swtichStateEditSexo() {
    if (this.disableGenero) {
      this.infoPessoais.controls['CadastroComum'].controls['Sexo'].enable();
      this.disableGenero = !this.disableGenero;
    } else {
      this.infoPessoais.controls['CadastroComum'].controls['Sexo'].disable();
      this.infoPessoais.patchValue({
        CadastroComum: {
          Sexo: null,
        },
      });
      this.disableGenero = !this.disableGenero;
    }
    this.checkDisable();
  }

  swtichStateEditCpf() {
    if (this.disableCpf) {
      this.infoPessoais.controls['CadastroComum'].controls['Cpf'].enable();
      this.disableCpf = !this.disableCpf;
    } else {
      this.infoPessoais.controls['CadastroComum'].controls['Cpf'].disable();
      this.disableCpf = !this.disableCpf;
    }
    this.checkDisable();
  }

  swtichStateEditCnpj() {
    if (this.disableCnpj) {
      this.infoPessoais.controls['CadastroComum'].controls['Cnpj'].enable();
      this.disableCnpj = !this.disableCnpj;
    } else {
      this.infoPessoais.controls['CadastroComum'].controls['Cnpj'].disable();
      this.disableCnpj = !this.disableCnpj;
    }
    this.checkDisable();
  }

  setInfoPessoais() {
    combineLatest([this.userDate, this.userProfile])
      .pipe(take(1))
      .subscribe((response) => {
        this.accountService
          .updateAccount(response[1].IdUsuario, this.infoPessoais.value)
          .subscribe((response) => console.log(response));
      });
    console.log(this.infoPessoais.value);
    console.log(this.fotoPerfil.value);
  }
}
