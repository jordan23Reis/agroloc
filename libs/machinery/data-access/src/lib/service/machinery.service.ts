import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Avaliacao,
  Categoria,
  Machinery,
  TipoPreco,
  UpdateCategoria,
} from '../entities/machinery-paths.interface';

@Injectable({
  providedIn: 'root',
})
export class MachineryService {
  http = inject(HttpClient);

  createMachinery(machineryData: Machinery): Observable<Machinery> {
    return this.http.post<Machinery>(`/api/maquina/`, machineryData);
  }

  getMachinery(machineryId: string): Observable<Machinery> {
    return this.http.get<Machinery>(`/api/maquina/${machineryId}`);
  }

  getMachineries(
    quantidadePorPagina: number,
    page: number,
    busca: string,
    categoria: string,
    tipoPreco: string,
    precoMin: number,
    precoMax: number,
    ordernarPor: string
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('quantidadePorPagina', quantidadePorPagina.toString())
      .set('page', page.toString())
      .set('busca', busca)
      .set('categoria', categoria)
      .set('tipoPreco', tipoPreco)
      .set('precoMin', precoMin.toString())
      .set('precoMax', precoMax.toString())
      .set('ordernarPor', ordernarPor);

    return this.http.get<any[]>(`/api/maquina/`, { params });
  }

  deleteMachinery(machineryId: string): Observable<any> {
    return this.http.delete(`/api/maquina/${machineryId}`);
  }

  updateMachinery(
    machineryId: string,
    machineryData: Machinery
  ): Observable<any> {
    return this.http.put(`/api/maquina/${machineryId}`, machineryData);
  }

  createMainImage(machineryId: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('Imagem', image);

    return this.http.post<any>(
      `/api/maquina/imagem/principal/${machineryId}`,
      formData
    );
  }

  deleteMainImage(machineryId: string): Observable<any> {
    return this.http.delete<any>(
      `/api/maquina/imagem/principal/${machineryId}`
    );
  }

  createSecondaryImages(machineryId: string, images: File[]): Observable<any> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`Imagens[${index}]`, image);
    });

    return this.http.post<any>(
      `/api/maquina/imagem/secundaria/${machineryId}`,
      formData
    );
  }

  deleteSecondaryImages(
    machineryId: string,
    imageName: string
  ): Observable<any> {
    return this.http.delete<any>(
      `/api/maquina/imagem/secundaria/${machineryId}/${imageName}`
    );
  }

  findPriceTypes(): Observable<any[]> {
    return this.http.get<any[]>(`/api/tipo-preco`);
  }

  createPriceType(priceTypeData: TipoPreco): Observable<any> {
    return this.http.post<any>(`/api/tipo-preco`, priceTypeData);
  }

  updatePriceType(
    priceTypeId: string,
    priceTypeData: TipoPreco
  ): Observable<any> {
    return this.http.put<any>(`/api/tipo-preco/${priceTypeId}`, priceTypeData);
  }

  deletePriceType(priceTypeId: string): Observable<any> {
    return this.http.delete<any>(`/api/tipo-preco/${priceTypeId}`);
  }

  findCategories(searchData: Categoria): Observable<any[]> {
    return this.http.post<any[]>(`/api/categoria`, searchData);
  }

  createCategory(categoryData: Categoria): Observable<any> {
    return this.http.post<any>(`/api/categoria`, categoryData);
  }

  updateCategory(
    categoryId: string,
    categoryData: UpdateCategoria
  ): Observable<any> {
    return this.http.put<any>(`/api/categoria/${categoryId}`, categoryData);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`/api/categoria/${categoryId}`);
  }

  createMachineReview(
    accountId: string,
    machineId: string,
    reviewData: Avaliacao
  ): Observable<any> {
    return this.http.post<any>(
      `/api/avaliacao/maquina/${accountId}/${machineId}`,
      reviewData
    );
  }

  updateMachineReview(
    reviewId: string,
    reviewData: Avaliacao
  ): Observable<any> {
    return this.http.put<any>(`/api/avaliacao/maquina/${reviewId}`, reviewData);
  }

  deleteMachineReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(`/api/avaliacao/maquina/${reviewId}`);
  }

  createCarrierReview(
    accountId: string,
    carrierId: string,
    reviewData: Avaliacao
  ): Observable<any> {
    return this.http.post<any>(
      `/api/avaliacao/freteiro/${accountId}/${carrierId}`,
      reviewData
    );
  }

  updateCarrierReview(
    reviewId: string,
    reviewData: Avaliacao
  ): Observable<any> {
    return this.http.put<any>(
      `/api/avaliacao/freteiro/${reviewId}`,
      reviewData
    );
  }

  deleteCarrierReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(`/api/avaliacao/freteiro/${reviewId}`);
  }
}
