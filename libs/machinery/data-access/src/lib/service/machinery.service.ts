import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MachineryService {
  http = inject(HttpClient);

  register(data) {
    this.http.post('/api/machinery', data);
  }
}
