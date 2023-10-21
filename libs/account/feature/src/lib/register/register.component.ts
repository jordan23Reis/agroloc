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
  breakpointObserver = inject(BreakpointObserver);
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
        Validators.minLength(AvaliacaoSchemaDtoRestraints.minNivelAvaliacao),
        Validators.maxLength(AvaliacaoSchemaDtoRestraints.maxNivelAvaliacao),
      ],
    ],
  });

  stepperOrientation: Observable<StepperOrientation>;
  firstPassword = true;
  secondPassword = true;
  container = 1;
  isMobile = this.platform.ANDROID || this.platform.IOS;

  // applyStyle() {
  //   this.styleUrls = this.getStyleUrl();
  // }

  // getStyleUrl() {
  //   if (this.isMobile) {
  //     return ['./register.component.scss'];
  //   } else {
  //     return ['./register.component.scss'];
  //   }
  // }

  constructor() {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

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

  isFreteiro() {
    this.freteiro();
    this.next();
  }

  login() {
    this.router.navigate(['web', 'login']);
  }

  register() {
    if (
      this.firstFormGroup.valid &&
      this.firstFormGroup.value.Senha === this.firstFormGroup.value.ConfSenha
    ) {
      let userData;
      if (this.firstFormGroup.value.Freteiro) {
        userData = {
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
        userData = {
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
        };
      }

      console.log(userData);

      this.accountService.register(userData).subscribe((response) => {
        console.log(response);
        this.snackBar.open('Conta criada com Sucesso!!', 'Fechar', {
          duration: 3000,
        });
        setTimeout(() => {
          this.login();
          this.snackBar.open('Agora faça o Login', 'Fechar', {
            duration: 3000,
          });
        }, 4000);
      });
    }
  }
}
