import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from '../entities/account-paths.interface';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  debounceTime,
  map,
  take,
} from 'rxjs';
import { InformacoesBancarias } from '../entities/account-paths.interface';
import {
  Imagem,
  EditarEndereco,
  ImagemPrincipal,
  ImagensSecundarias,
  NovoEndereco,
  UpdatePassword,
  CepType,
} from '../entities/others-paths.interface';
import { AccountData } from '../entities/register-account.interface';
import { Automovel, EditAutomovel } from '../entities/car-path.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  loadingAccount: Account = {
    Login: {
      Email: 'Carregando',
      Senha: 'Carregando',
      Tipo: 'Carregando',
    },
    CadastroComum: {
      Nome: 'Carregando',
      Sobrenome: 'Carregando',
      DataDeNascimento: '1990-01-01',
      Sexo: 'Carregando',
      Telefone: ['Carregando'],
      Cpf: 'Carregando',
      Cnpj: 'Carregando',
      Enderecos: [
        {
          _id: 'Carregando',
          Cep: 'Carregando',
          Estado: 'Carregando',
          Cidade: 'Carregando',
          Logradouro: 'Carregando',
          Bairro: 'Carregando',
          Complemento: 'Carregando',
          Numero: 23,
        },
      ],
      Foto: {
        Url: 'assets/default-account-icon.png',
        NomeArquivo: 'Carregando',
      },
    },
    CadastroFreteiro: {
      CNH: 'Carregando',
      Automovel: [
        {
          Nome: 'Carregando',
          Descricao: 'Carregando',
          Peso: 2323,
          Comprimento: 23,
          Largura: 23,
          Altura: 23,
          ImagemPrincipal: {
            Url: 'https://th.bing.com/th/id/R.a1d5699377217044dd3932f4b9438aaf?rik=NA1cHKeLwV%2fNJw&pid=ImgRaw&r=0',
            NomeArquivo: 'Carregando',
          },
          ImagensSecundarias: [
            {
              Url: 'https://th.bing.com/th/id/R.a1d5699377217044dd3932f4b9438aaf?rik=NA1cHKeLwV%2fNJw&pid=ImgRaw&r=0',
              NomeArquivo: 'Carregando',
            },
          ],
          Categoria: {
            idCategoria: 'Carregando',
            Nome: 'Carregando',
          },
        },
      ],
    },
    Maquinas: [],
    MaquinasFavoritas: [],
    FreteirosFavoritos: [],
    MaquinasAlugadas: [],
    MaquinasLocadas: [],
    FretesRealizados: [],
    FretesSolicitados: [],
    InformacoesBancarias: {
      ContaBancaria: {
        Agencia: 'Carregando',
        Conta: 'Carregando',
      },
      Pix: {
        Chave: 'Carregando',
        Tipo: 'Carregando',
      },
    },
  };

  userAccount = new ReplaySubject<Account>(1);
  userAccount$ = this.userAccount.asObservable().pipe(debounceTime(1));

  nextAccount(userId: string) {
    this.http
      .get(`/api/usuario/cadastro/${userId}`)
      .pipe(
        take(1),
        catchError((error) => {
          console.log('Error: ', error);
          throw new Error(
            'Ocorreu um Erro ao tentar obter os dados do Usuario.'
          );
        })
      )
      .subscribe((response) => {
        this.userAccount.next(response as Account);
      });
  }

  register(account: any): Observable<any> {
    return this.http.post(`/api/usuario/`, account as Account).pipe(
      catchError((error) => {
        this.snackBar.open('Falha ao criar Conta', 'Fechar', {
          duration: 3000,
        });
        throw new Error(error);
      })
    );
  }

  searchFreteiros(params: {
    quantidadePorPagina: number;
    page: number;
    busca: string;
    ordenarPor: string;
  }): Observable<Account[]> {
    const queryParams = new HttpParams()
      .set('quantidadePorPagina', params.quantidadePorPagina.toString())
      .set('page', params.page.toString())
      .set('busca', params.busca)
      .set('ordenarPor', params.ordenarPor);

    return this.http.get<Account[]>(`/api/usuario/freteiros`, {
      params: queryParams,
    });
  }

  getCadastro(accountId: string): Observable<any> {
    return this.http.get(`/api/usuario/cadastro/${accountId}`);
  }

  updateAccount(accountId: string, accountData: any): Observable<any> {
    return this.http.put(`/api/usuario/cadastro/${accountId}`, accountData);
  }

  updatePassword(
    accountId: string,
    updatePasswordData: UpdatePassword
  ): Observable<any> {
    return this.http.put(`/api/usuario/senha/${accountId}`, updatePasswordData);
  }

  updatePhoto(accountId: string, imageData: Imagem): Observable<any> {
    const formData = new FormData();
    formData.append('Imagem', imageData.Imagem);

    return this.http.post(`/api/usuario/foto/${accountId}`, formData);
  }

  removePhoto(accountId: string): Observable<any> {
    return this.http.delete(`/api/usuario/foto/${accountId}`);
  }

  getInformacoesBancarias(accountId: string): Observable<InformacoesBancarias> {
    return this.http.get<InformacoesBancarias>(
      `/api/usuario/informacoesbancarias/${accountId}`
    );
  }

  updateInformacoesBancarias(
    accountId: string,
    infoBancariasData: InformacoesBancarias
  ): Observable<any> {
    return this.http.put(
      `/api/usuario/informacoesbancarias/${accountId}`,
      infoBancariasData
    );
  }

  addAutomovel(accountId: string, automovelData: Automovel): Observable<any> {
    return this.http.post(`/api/usuario/automovel/${accountId}`, automovelData);
  }

  editAutomovel(
    accountId: string,
    automovelId: string,
    editData: EditAutomovel
  ): Observable<any> {
    return this.http.put(
      `/api/usuario/automovel/${accountId}/${automovelId}`,
      editData
    );
  }

  removeAutomovel(accountId: string, automovelId: string): Observable<any> {
    return this.http.delete(
      `/api/usuario/automovel/${accountId}/${automovelId}`
    );
  }

  updateAutomovelImagemPrincipal(
    accountId: string,
    automovelId: string,
    imagemData: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('Imagem', imagemData);

    return this.http.post(
      `/api/usuario/automovel/imagem/principal/${accountId}/${automovelId}`,
      formData
    );
  }

  deleteAutomovelImagemPrincipal(
    accountId: string,
    automovelId: string
  ): Observable<any> {
    return this.http.delete(
      `/api/usuario/automovel/imagem/principal/${accountId}/${automovelId}`
    );
  }

  addOrUpdateAutomovelImagensSecundarias(
    accountId: string,
    automovelId: string,
    imagensData: File[]
  ): Observable<any> {
    const formData = new FormData();
    for (const imagem of imagensData) {
      formData.append('Imagens', imagem);
    }

    return this.http.post(
      `/api/usuario/automovel/imagem/secundaria/${accountId}/${automovelId}`,
      formData
    );
  }

  deleteAutomovelImagemSecundaria(
    accountId: string,
    automovelId: string,
    imagemName: string
  ): Observable<any> {
    return this.http.delete(
      `/api/usuario/automovel/imagem/secundaria/${accountId}/${automovelId}/${imagemName}`
    );
  }

  addEndereco(accountId: string, novoEndereco: NovoEndereco): Observable<any> {
    return this.http.post(`/api/usuario/endereco/${accountId}`, novoEndereco);
  }

  editEndereco(
    accountId: string,
    enderecoId: string,
    editarEndereco: EditarEndereco
  ): Observable<any> {
    return this.http.put(
      `/api/usuario/endereco/${accountId}/${enderecoId}`,
      editarEndereco
    );
  }

  removeEndereco(accountId: string, enderecoId: string): Observable<any> {
    return this.http.delete(`/api/usuario/endereco/${accountId}/${enderecoId}`);
  }

  addFreteiroFavorito(accountId: string, freteiroId: string): Observable<any> {
    return this.http.post(
      `/api/favorito/freteiro/${accountId}/${freteiroId}`,
      null
    );
  }

  removeFreteiroFavorito(
    accountId: string,
    freteiroId: string
  ): Observable<any> {
    return this.http.delete(
      `/api/favorito/freteiro/${accountId}/${freteiroId}`
    );
  }

  addMaquinaFavorita(accountId: string, maquinaId: string): Observable<any> {
    return this.http.post(
      `/api/favorito/maquina/${accountId}/${maquinaId}`,
      null
    );
  }

  removeMaquinaFavorita(accountId: string, maquinaId: string): Observable<any> {
    return this.http.delete(`/api/favorito/maquina/${accountId}/${maquinaId}`);
  }

  findCepEndereco(Cep: string) {
    return this.http
      .get<CepType>('https://viacep.com.br/ws/' + Cep + '/json')
      .pipe(
        catchError((error) => {
          this.snackBar.open('CEP Incorreto', 'Fechar', {
            duration: 3000,
          });
          throw new Error(error);
        })
      );
  }
}
