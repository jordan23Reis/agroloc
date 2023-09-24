import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'agroloc-machinery-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class MachineryRegisterComponent {
  platform = inject(Platform);
  breakpointObserver = inject(BreakpointObserver);
  formBuilder = inject(FormBuilder);

  isMobile = this.platform.ANDROID || this.platform.IOS;

  #imagensSecundarias = new BehaviorSubject<string[]>([]);
  imagensSecundarias = this.#imagensSecundarias.asObservable();
  imagemPrincipalPreview: string | ArrayBuffer | null | undefined = null;

  imageUrl: string | ArrayBuffer | null | undefined = null;
  listImageUrl: string[] | null | undefined = null;

  ImagemPrincipalType: File | null | undefined = null;
  ImagemSecundariasType: File[] = [];

  formMachinery = this.formBuilder.group({
    Nome: ['', Validators.required],
    Descricao: ['', Validators.required],
    Peso: ['', Validators.required],
    Comprimento: ['', Validators.required],
    Largura: ['', Validators.required],
    Altura: ['', Validators.required],
    ImagemPrincipal: [this.ImagemPrincipalType, Validators.required],
    ImagemSecundarias: [this.ImagemSecundariasType, Validators.required],
  });

  onImagemPrincipalSelected(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      this.formMachinery.patchValue({ ImagemPrincipal: file });
      this.imagemPrincipalPreview = URL.createObjectURL(file);
    }
  }

  async onImagensSecundariasSelected(event: any) {
    const fileList = event.target.files as FileList;
    const files: File[] = Array.from(fileList);

    if (files.length > 0) {
      this.formMachinery.patchValue({ ImagemSecundarias: files });
      this.#imagensSecundarias.next(files.map(URL.createObjectURL));
    }
  }
}
