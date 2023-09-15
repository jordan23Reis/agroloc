import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';
import { Router } from '@angular/router';

@Component({
  selector: 'agroloc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  _formBuilder = inject(FormBuilder);
  breakpointObserver = inject(BreakpointObserver);
  http = inject(HttpClient);
  platform = inject(Platform);
  router = inject(Router);

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
  isMobile = this.platform.ANDROID || this.platform.IOS;

  // applyStyle() {
  //   this.styleUrls = this.getStyleUrl();
  // }

  // getStyleUrl() {
  //   if (this.isMobile) {
  //     return ['./register.component.scss'];
  //   } else {
  //     return ['./register.component.scss'];
  //   }
  // }

  constructor() {
    this.stepperOrientation = this.breakpointObserver
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
    this.router.navigate(['web', 'login']);
  }
}
