import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Account } from '../entities/account.interface';
import { Login } from '../entities/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http = inject(HttpClient);

  register(account: Account) {
    this.http.post('/users', account).subscribe(console.log);
  }
}
