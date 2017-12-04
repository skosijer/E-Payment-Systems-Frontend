import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InsuranceComponent implements OnInit {

  items: MenuItem[];
  cities1: SelectItem[];

  constructor() { }

  ngOnInit() {
      this.items = [
            {label: 'Podaci za proračun'},
            {label: 'Cena'},
            {label: 'Podaci za polisu'},
            {label: 'Porudžbina'}
        ];

       this.cities1 = [
            {label:'Select City', value:null},
            {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
            {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
            {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
            {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
            {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
        ];
  }

}
