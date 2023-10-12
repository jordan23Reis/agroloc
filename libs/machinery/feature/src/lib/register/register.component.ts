import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'agroloc-machinery-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class MachineryRegisterComponent {
  platform = inject(Platform);
  breakpointObserver = inject(BreakpointObserver);
  formBuilder = inject(FormBuilder);

  isOptional = false;
  isMobile = this.platform.ANDROID || this.platform.IOS;

  #imagensSecundarias = new BehaviorSubject<string[]>([]);
  imagensSecundarias = this.#imagensSecundarias.asObservable();
  imagemPrincipalPreview: string | ArrayBuffer | null | undefined = null;

  imageUrl: string | ArrayBuffer | null | undefined = null;
  listImageUrl: string[] | null | undefined = null;
  categoryList = [{
    value: 'Categoria 1',
    name: 'Categoria 1'
  },
  {
    value: 'Categoria 1',
    name: 'Categoria 1'
  },
  {
    value: 'Categoria 1',
    name: 'Categoria 1'
  },
  {
    value: 'Categoria 1',
    name: 'Categoria 1'
  },]

  ImagemPrincipalType: File | null | undefined = null;
  ImagemSecundariasType: File[] = [];

  firstFormGroup = this.formBuilder.group({
    Nome: ['', Validators.required],
    Categoria: ['', Validators.required],
    Descricao: ['', Validators.required],
    ImagemPrincipal: [this.ImagemPrincipalType, Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    Peso: ['', Validators.required],
    Comprimento: ['', Validators.required],
    Largura: ['', Validators.required],
    Altura: ['', Validators.required],
  });
  thirdFormGroup = this.formBuilder.group({
    ImagemSecundarias: [this.ImagemSecundariasType, Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;


  constructor(breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 950px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onImagemPrincipalSelected(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      this.firstFormGroup.patchValue({ ImagemPrincipal: file });
      this.imagemPrincipalPreview = URL.createObjectURL(file);
    }
  }

  async onImagensSecundariasSelected(event: any) {
    const fileList = event.target.files as FileList;
    const files: File[] = Array.from(fileList);

    if (files.length > 0) {
      this.thirdFormGroup.patchValue({ ImagemSecundarias: files });
      this.#imagensSecundarias.next(files.map(URL.createObjectURL));
    }
  }

}
