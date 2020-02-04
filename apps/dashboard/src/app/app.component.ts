import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppFacade, KicksFacade } from '@mdv8/core-state';
import { AuthFacade } from '@mdv8/core-state';
import { of } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'mdv8-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  initialized$;
  title = 'dashboard';

  links = [
    {path: '/kicks', title: 'kicks'}
  ];

  get authenticated() {
    return this.authFacade.authenticated$;
  }

  get loading$() {
    return this.authFacade.loading$
  }

  constructor(
    private facade: AppFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.initialized$ = this.facade.initialized$;
    this.facade.initialize();
  }

  onLogout() {
    this.authFacade.logout();
  }

}
