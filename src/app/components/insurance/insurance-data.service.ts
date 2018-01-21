import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {OsiguranjeDTO} from "../../beans/osiguranjeDTO";

@Injectable()
export class InsuranceDataService {


  private url = 'https://localhost:8080/';

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

  public saveInsurance(osiguranjeDTO : OsiguranjeDTO) {
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    console.log(osiguranjeDTO.nekretnine);
    return this.http.post(this.url + 'dmzMain/saveInsurance', JSON.stringify(osiguranjeDTO), {headers : headers});
  }

}
