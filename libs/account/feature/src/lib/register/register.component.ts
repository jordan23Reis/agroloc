import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { Account, AccountService, accountTypes } from '@agroloc/account/data-acess';

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

  firstFormGroup = this._formBuilder.group({
    Nome: ['', Validators.required],
    Sobrenome: ['', Validators.required],
    Email: ['', Validators.required, Validators.email],
    Senha: ['', Validators.required],
    ConfSenha: ['', Validators.required],
    Freteiro: [false, Validators.required],
    Nascimento: [null, Validators.required],
    Sexo: ['', Validators.required],
    CNH: [''],
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
    if (this.firstFormGroup.valid && this.firstFormGroup.value.Senha === this.firstFormGroup.value.ConfSenha) {
      const userData: Account = {
        Login: {
          Email: this.firstFormGroup.value.Email,
          Senha: this.firstFormGroup.value.Senha,
          Tipo: (this.firstFormGroup.value.Freteiro ? accountTypes.Freteiro: accountTypes.Comum),
        },
        CadastroComum: {
          Nome: this.firstFormGroup.value.Nome,
          Sobrenome: this.firstFormGroup.value.Sobrenome,
          DataDeNascimento: this.firstFormGroup.value.Nascimento,
          Sexo: this.firstFormGroup.value.Sexo,
        },
        CadastroFreteiro: {
          CNH: (this.firstFormGroup.value.Freteiro ? this.firstFormGroup.value.CNH : null),
        },
      };

      // Chame o método de registro da AccountService
      this.accountService.register(userData).subscribe(
        (response) => {
          // Lida com a resposta do registro bem-sucedido, redireciona o usuário, etc.
          this.login();
        },
        (error) => {
          // Lida com erros, exibe mensagens de erro, etc.
        }
      );
    }
  }
}
