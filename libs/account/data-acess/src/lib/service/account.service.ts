import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from '../entities/account-paths.interface';
import { BehaviorSubject, Observable, Subject, catchError, take } from 'rxjs';
import { InformacoesBancarias } from '../entities/account-paths.interface';
import {
  Imagem,
  EditarEndereco,
  ImagemPrincipal,
  ImagensSecundarias,
  NovoEndereco,
  UpdatePassword,
} from '../entities/others-paths.interface';
import { AccountData } from '../entities/register-account.interface';
import { Automovel, EditAutomovel } from '../entities/car-path.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http = inject(HttpClient);

  userDate = new Subject<Account>();

  register(account: any): Observable<any> {
    return this.http.post(`/api/usuario/`, account as Account);
  }

  getUser(userId: string) {
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
        this.userDate.next(response as Account);
      });
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

  updateProfile(accountId: string, accountData: AccountData): Observable<any> {
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
    imagemData: ImagemPrincipal
  ): Observable<any> {
    const formData = new FormData();
    formData.append('Imagem', imagemData.Imagem);

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
    imagensData: ImagensSecundarias
  ): Observable<any> {
    const formData = new FormData();
    for (const imagem of imagensData.Imagens) {
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
}
