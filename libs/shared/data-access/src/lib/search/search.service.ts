import { Maquina } from '@agroloc/machinery/data-access';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, debounceTime, take } from 'rxjs';

export interface SearchFilter {
  Quantidade: number;
  Pagina: number;
  Busca: string;
  Categoria: string;
  TipoPreco: string;
  PrecoMin: number;
  PrecoMax: number;
  Ordem: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  http = inject(HttpClient);
  router = inject(Router);

  initialFilter: SearchFilter = {
    Quantidade: 10,
    Pagina: 1,
    Busca: '',
    Categoria: '',
    TipoPreco: '',
    PrecoMin: 0,
    PrecoMax: 999999999,
    Ordem: '',
  };

  searchData = new ReplaySubject<Maquina[]>(1);
  searchData$ = this.searchData.asObservable();

  searchFilter = new ReplaySubject<SearchFilter>(1);
  searchFilter$ = this.searchFilter.asObservable();

  searchControlSubscribe = this.searchFilter$
    .pipe(debounceTime(1000))
    .subscribe((response) => {
      console.log(response);

      this.searchMachineries(
        response.Quantidade,
        response.Pagina,
        response.Busca,
        response.Categoria,
        response.TipoPreco,
        response.PrecoMin,
        response.PrecoMax,
        response.Ordem
      )
        .pipe(take(1))
        .subscribe((response) => {
          this.searchData.next(response);
        });
    });

  constructor() {
    this.searchFilter.next(this.initialFilter);
  }

  searchMachineries(
    quantidadePorPagina: number,
    page: number,
    busca: string,
    categoria: string,
    tipoPreco: string,
    precoMin: number,
    precoMax: number,
    ordernarPor: string
  ): Observable<Maquina[]> {
    const params = new HttpParams()
      .set('quantidadePorPagina', quantidadePorPagina.toString())
      .set('page', page.toString())
      .set('busca', busca)
      .set('categoria', categoria)
      .set('tipoPreco', tipoPreco)
      .set('precoMin', precoMin.toString())
      .set('precoMax', precoMax.toString())
      .set('ordernarPor', ordernarPor);

    return this.http.get<Maquina[]>(`/api/maquina/`, { params });
  }

  setQuantidade(quantidade: number) {
    this.updateSearchFilter({ Quantidade: quantidade });
  }

  setPagina(pagina: number) {
    this.updateSearchFilter({ Pagina: pagina });
  }

  setBusca(busca: string) {
    this.updateSearchFilter({ Busca: busca });
  }

  setCategoria(categoria: string) {
    this.updateSearchFilter({ Categoria: categoria });
  }

  remCategoria() {
    this.updateSearchFilter({ Categoria: '' });
  }

  setTipoPreco(tipoPreco: string) {
    this.updateSearchFilter({ TipoPreco: tipoPreco });
  }

  setPrecoMin(precoMin: number) {
    console.log('min: ', precoMin);
    this.updateSearchFilter({ PrecoMin: precoMin });
  }

  setPrecoMax(precoMax: number) {
    console.log('max: ', precoMax);

    this.updateSearchFilter({ PrecoMax: precoMax });
  }

  setOrdem(ordem: string) {
    this.updateSearchFilter({ Ordem: ordem });
  }

  private updateSearchFilter(updatedValues: Partial<SearchFilter>) {
    this.searchFilter.pipe(take(1)).subscribe((currentFilter) => {
      const updatedFilter: SearchFilter = {
        ...currentFilter,
        ...updatedValues,
      };

      this.searchFilter.next(updatedFilter);
    });
  }
}
