import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class InsuranceDataService {


  private url = 'http://localhost:8080/';

  constructor(private http:Http) { }

  public getStarosneGrupe(){
    return this.http.get(this.url+'dmzMain/dobaviStarosneGrupe');
  }

  public getRegioni() {
    return this.http.get(this.url + 'dmzMain/dobaviRegione');
  }

  public getSvrheOsiguranja() {
    return this.http.get(this.url + 'dmzMain/dobaviSvrheOsiguranja');
  }

  public getPaketiOsiguranja() {
    return this.http.get(this.url + 'dmzMain/dobaviPaketeOsiguranja');
  }

  public getStarostiStana() {
    return this.http.get(this.url + 'dmzMain/dobaviStarostiStana');
  }

  public getProcenjeneVrednostiStana() {
    return this.http.get(this.url + 'dmzMain/dobaviProcenjeneVrednostiStana');
  }

  public getOsiguranjaStana() {
    return this.http.get(this.url + 'dmzMain/dobaviOsiguranjaStana');
  
}

}
