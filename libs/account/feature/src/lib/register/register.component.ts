import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'agroloc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstFormGroup = this._formBuilder.group({
    Nome: ['', Validators.required],
    Sobrenome: ['', Validators.required],
    Email: ['', Validators.required, Validators.email],
    Senha: ['', Validators.required],
    ConfSenha: ['', Validators.required],
    Freteiro: [false, Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;
  firstPassword = true;
  secondPassword = true;
  container = 1;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private http: HttpClient
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  next() {
    this.container += 1;
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

  register() {
    this.http.post('/api/users', this.firstFormGroup.value);
  }
}
