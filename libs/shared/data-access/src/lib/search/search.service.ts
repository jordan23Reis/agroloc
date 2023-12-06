// eslint-disable-next-line @nx/enforce-module-boundaries
import { MachineryService, Maquina } from '@agroloc/machinery/data-access';
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
  machineryService = inject(MachineryService);

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

  itemSelect = new ReplaySubject<Maquina>(1);
  itemSelect$ = this.itemSelect.asObservable();

  searchData = new ReplaySubject<Maquina[]>(1);
  searchData$ = this.searchData.asObservable();

  searchFilter = new ReplaySubject<SearchFilter>(1);
  searchFilter$ = this.searchFilter.asObservable();

  searchQtde = new ReplaySubject<number>(1);
  searchQtde$ = this.searchQtde.asObservable();

  navTabControl = new ReplaySubject<string>(1);
  navTabControl$ = this.navTabControl.asObservable();

  searchControlSubscribe = this.searchFilter$
    .pipe(debounceTime(1000))
    .subscribe((response) => {
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

      this.searchMachineries(
        null,
        null,
        response.Busca,
        response.Categoria,
        response.TipoPreco,
        response.PrecoMin,
        response.PrecoMax,
        response.Ordem
      )
        .pipe(take(1))
        .subscribe((response) => {
          this.searchQtde.next(response.length);
        });
    });

  constructor() {
    this.searchFilter.next(this.initialFilter);
  }

  changeNavTab(page: string) {
    this.navTabControl.next(page);
  }

  searchMachineries(
    quantidadePorPagina: number | null,
    page: number | null,
    busca: string,
    categoria: string,
    tipoPreco: string,
    precoMin: number,
    precoMax: number,
    ordernarPor: string
  ): Observable<Maquina[]> {
    const params = new HttpParams()
      .set(
        'quantidadePorPagina',
        quantidadePorPagina ? quantidadePorPagina.toString() : 999999
      )
      .set('page', page ? page.toString() : 0)
      .set('busca', busca)
      .set('categoria', categoria)
      .set('tipoPreco', tipoPreco)
      .set('precoMin', precoMin.toString())
      .set('precoMax', precoMax.toString())
      .set('ordernarPor', ordernarPor);

    return this.http.get<Maquina[]>(`/api/maquina/`, { params });
  }

  searchMachineriesAll(): Observable<Maquina[]> {
    const params = new HttpParams();
    return this.http.get<Maquina[]>(`/api/maquina/`, { params });
  }
  searchMachineriesForCategory(categoria: string): Observable<Maquina[]> {
    const params = new HttpParams().set('categoria', categoria);
    return this.http.get<Maquina[]>(`/api/maquina/`, { params });
  }
  searchMachineriesForOrder(ordernarPor: string): Observable<Maquina[]> {
    const params = new HttpParams().set('ordernarPor', ordernarPor);
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

  onSelectItem(idItem: string) {
    this.machineryService
      .getMachinery(idItem)
      .pipe(take(1))
      .subscribe((response) => {
        this.itemSelect.next(response);
        this.router.navigate(['web', 'main', 'details']);
      });
  }

  onSelectForProcess(idItem: string) {
    this.machineryService
      .getMachinery(idItem)
      .pipe(take(1))
      .subscribe((response) => {
        this.itemSelect.next(response);
      });
  }
}
