import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MachineryService {
  http = inject(HttpClient);

  //metodo para registrar maquinario
  register(data) {
    this.http.post('/api/machinery', data);
  }
}
