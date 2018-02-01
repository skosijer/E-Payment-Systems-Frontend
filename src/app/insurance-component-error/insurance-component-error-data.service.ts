import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";


@Injectable()
export class InsuranceComponentErrorDataService {


  private url = 'https://localhost:8080/';

  constructor(private http:Http) { }

//   public getStarosneGrupe(){
//     return this.http.get(this.url+'dmzMain/dobaviStarosneGrupe');
//   }

//   public getRegioni() {
//     return this.http.get(this.url + 'dmzMain/dobaviRegione');
//   }

}
