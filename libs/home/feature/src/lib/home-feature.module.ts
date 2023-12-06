import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeFeatureRoutes } from './lib.routes';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GalleriaModule } from 'primeng/galleria';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeFeatureRoutes),
    CarouselModule,
    ButtonModule,
    TagModule,
    MatIconModule,
    MatButtonModule,
    GalleriaModule,
    MessagesModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeFeatureModule {}
