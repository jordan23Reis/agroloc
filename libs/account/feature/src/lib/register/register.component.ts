import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';
import { Account, AccountService } from '@agroloc/account/data-acess';

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
    if (this.firstFormGroup.valid) {
      const userData: Account = {
        Login: {
          Email: '12345@gmail.com',
          Senha: '123',
          Tipo: 'Freteiro',
        },
        CadastroComum: {
          Nome: 'FFFFFFFFFFFFFFFF',
          Sobrenome: '232',
          DataDeNascimento: '1990-01-01',
          Sexo: '2323',
          Telefone: ['22323232323233232322'],
          Cpf: '22222222222222',
          Cnpj: '222222222222222222',
          Enderecos: [
            {
              Cep: '222222222',
              Cidade: 'Maringa',
              Logradouro: '2323232',
              Bairro: 'sdaadssad',
              Complemento: 'sadsaddasdsa',
              Numero: 23,
            },
          ],
          Foto: {
            Url: '1',
            NomeArquivo: '12',
          },
        },
        CadastroFreteiro: {
          CNH: 'A',
          Automovel: [
            {
              Nome: '2323',
              Descricao: '2323323232323232',
              Peso: 2323,
              Comprimento: 23,
              Largura: 23,
              Altura: 23,
              ImagemPrincipal: {
                Url: '23232',
                NomeArquivo: '22',
              },
              ImagensSecundarias: [
                {
                  Url: '23232',
                  NomeArquivo: '22',
                },
              ],
              Categoria: {
                idCategoria: '323223',
                Nome: '2323232',
              },
            },
          ],
        },
        Maquinas: [],
        Favoritos: [],
        MaquinasAlugadas: [],
        MaquinasLocadas: [],
        FretesRealizados: [],
        FretesSolicitados: [],
        InformacoesBancarias: {
          ContaBancaria: {
            Agencia: '2323',
            Conta: '23232',
          },
          Pix: {
            Chave: '232323',
            Tipo: '23232',
          },
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
