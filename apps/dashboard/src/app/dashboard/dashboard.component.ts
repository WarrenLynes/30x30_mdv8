import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mdv8-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  links = [
    {path: '/shoes', title: 'shoes', quantity: 69},
    {path: '/cars', title: 'cars', quantity: 10},
    {path: '/computers', title: 'computers', quantity: 18},
    {path: '/species', title: 'pets', quantity: 10},
  ];

  constructor() { }

  ngOnInit() {
  }

}
