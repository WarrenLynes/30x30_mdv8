import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoesService } from './shoes/shoes.service';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService, ShoesService]
})
export class CoreDataModule {}
