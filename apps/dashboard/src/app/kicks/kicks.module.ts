import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { KicksComponent } from './kicks.component';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule, MatProgressBarModule,
  MatSliderModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [DetailComponent, ListComponent, KicksComponent, FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: KicksComponent, children: [
          { path: '', component: ListComponent },
          { path: 'create', component: FormComponent },
          { path: ':id', component: DetailComponent },
        ]
      }
    ]),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class KicksModule { }
