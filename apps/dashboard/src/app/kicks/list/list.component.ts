import { Component, OnInit } from '@angular/core';
import { Shoe } from '@mdv8/core-data';
import { KicksFacade } from '@mdv8/core-state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'mdv8-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loading$: Observable<boolean>;

  get data$() {
    return this.facade.kicks$;
  }

  constructor( private facade: KicksFacade, private router: Router ) {}

  ngOnInit(): void {
    this.facade.load();
    this.loading$ = this.facade.loading$;
  }

  onDelete(entity: Shoe) {
    this.facade.delete(entity);
  }

  onEdit(entity: Shoe) {
    this.facade.select(entity);
    this.router.navigateByUrl(`/kicks/${entity.id}`)
  }
}
