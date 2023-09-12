import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'agroloc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstFormGroup = this._formBuilder.group({
    Nome: ['', Validators.required],
    Sobrenome: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    Email: ['', Validators.required],
    Senha: ['', Validators.required],
    ConfSenha: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    Freteiro: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
}
