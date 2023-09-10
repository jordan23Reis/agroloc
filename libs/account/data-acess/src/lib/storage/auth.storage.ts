import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {
  getAcessToken() {
    return localStorage.getItem('acess-token');
  }
  setAcessToken(token: string) {
    localStorage.setItem('acess-token', token);
  }
  removeAcessToken() {
    localStorage.removeItem('acess-token');
  }
}
