import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import {
  Account,
  AccountService,
  accountTypes,
} from '@agroloc/account/data-acess';
import {
  AvaliacaoSchemaDtoRestraints,
  UsuarioSchemaDtoRestraints,
} from '@agroloc/shared/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'agroloc-users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class AccountRegisterComponent {
  _formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  platform = inject(Platform);
  router = inject(Router);
  accountService = inject(AccountService);
  snackBar = inject(MatSnackBar);

  firstFormGroup = this._formBuilder.group({
    Nome: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinNome),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxNome),
      ],
    ],
    Sobrenome: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSobrenome),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSobrenome),
      ],
    ],
    Email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinEmail),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxEmail),
      ],
    ],
    Senha: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSenha),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSenha),
      ],
    ],
    ConfSenha: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSenha),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSenha),
      ],
    ],
    Freteiro: [false, Validators.required],
    Nascimento: [null, Validators.required],
    Sexo: [
      '',
      [
        Validators.required,
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinSexo),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxSexo),
      ],
    ],
    CNH: [
      '',
      [
        Validators.minLength(UsuarioSchemaDtoRestraints.tamMinCnh),
        Validators.maxLength(UsuarioSchemaDtoRestraints.tamMaxCnh),
      ],
    ],
  });

  firstPassword = true;
  secondPassword = true;
  container = 1;
  isMobile = this.platform.ANDROID || this.platform.IOS;

  next() {
    this.container += 1;
  }

  doubloNext() {
    this.container += 2;
  }

  back() {
    this.container -= 1;
  }

  reset() {
    this.container = 1;
  }

  freteiro() {
    this.firstFormGroup.patchValue({ Freteiro: true });
  }

  comum() {
    this.firstFormGroup.patchValue({ Freteiro: false });
  }

  isFreteiro() {
    this.freteiro();
    this.next();
  }

  isComum() {
    this.comum();
    this.doubloNext();
  }

  login() {
    this.router.navigate(['web', 'login']);
  }

  register() {
    if (
      this.firstFormGroup.valid &&
      this.firstFormGroup.value.Senha === this.firstFormGroup.value.ConfSenha
    ) {
      let comumUserData;
      let driveUserData;
      if (this.firstFormGroup.value.Freteiro) {
        driveUserData = {
          Login: {
            Email: this.firstFormGroup.value.Email,
            Senha: this.firstFormGroup.value.Senha,
            Tipo: accountTypes.Freteiro,
          },
          CadastroComum: {
            Nome: this.firstFormGroup.value.Nome,
            Sobrenome: this.firstFormGroup.value.Sobrenome,
            DataDeNascimento: this.firstFormGroup.value.Nascimento,
            Sexo: this.firstFormGroup.value.Sexo,
          },
          CadastroFreteiro: {
            CNH: this.firstFormGroup.value.CNH,
          },
        };
      } else {
        comumUserData = {
          Login: {
            Email: this.firstFormGroup.value.Email,
            Senha: this.firstFormGroup.value.Senha,
            Tipo: accountTypes.Comum,
          },
          CadastroComum: {
            Nome: this.firstFormGroup.value.Nome,
            Sobrenome: this.firstFormGroup.value.Sobrenome,
            DataDeNascimento: this.firstFormGroup.value.Nascimento,
            Sexo: this.firstFormGroup.value.Sexo,
          },
        };
      }

      const registerSubscribe = this.accountService
        .register(
          this.firstFormGroup.value.Freteiro ? driveUserData : comumUserData
        )
        .subscribe((response) => {
          this.snackBar.open('Conta criada com Sucesso!!', 'Fechar', {
            duration: 3000,
          });
          setTimeout(() => {
            this.login();
            this.snackBar.open('Agora efetue o Login da sua Conta', 'Fechar', {
              duration: 3000,
            });
          }, 4000);

          registerSubscribe.unsubscribe();
        });
    }
  }
}
