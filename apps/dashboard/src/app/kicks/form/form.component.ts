import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KicksFacade } from '@mdv8/core-state';

@Component({
  selector: 'mdv8-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form: FormGroup;

  constructor( private facade: KicksFacade ) {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      coolLevel: new FormControl(0, Validators.compose([ Validators.max(100), Validators.required ])),
      title: new FormControl('', Validators.compose([ Validators.minLength(3), Validators.required ])),
      details: new FormControl('', Validators.compose([ Validators.minLength(5), Validators.required ]))
    });
  }

  onSubmit() {
    this.facade.save(this.form.value);
  }

  onCancel() { }

}
