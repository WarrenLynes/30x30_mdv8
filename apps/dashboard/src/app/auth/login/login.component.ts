import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@mdv8/core-data';
import { Router } from '@angular/router';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { CustomValidators } from '../../custom-validators';
import { AuthFacade } from '@mdv8/core-state';
import { Subject } from 'rxjs';

@Component({
  selector: 'mdv8-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm: FormGroup;

  constructor(private facade: AuthFacade, private router: Router) {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
   /* this.facade.authenticated$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((x) => {
      console.log(x);
      if(x) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    });*/
  }

  submit() {
    this.facade.authenticate(this.loginForm.value);
  }

  buildForm() {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]))
    });
  }
}
