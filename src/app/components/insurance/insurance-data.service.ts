import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {OsiguranjeDTO} from "../../beans/osiguranjeDTO";

@Injectable()
export class InsuranceDataService {


  private url = 'http://localhost:8081/corpMain/';

  constructor(private http:Http) { }

  public getStarosneGrupe(){
    return this.http.get(this.url+'dobaviStarosneGrupe');
  }

  public getRegioni() {
    return this.http.get(this.url + 'dobaviRegione');
  }

  public getSvrheOsiguranja() {
    return this.http.get(this.url + 'dobaviSvrheOsiguranja');
  }

  public getPaketiOsiguranja() {
    return this.http.get(this.url + 'dobaviPaketeOsiguranja');
  }

  public getStarostiStana() {
    return this.http.get(this.url + 'dobaviStarostiStana');
  }

  public getProcenjeneVrednostiStana() {
    return this.http.get(this.url + 'dobaviProcenjeneVrednostiStana');
  }

  public getOsiguranjaStana() {
    return this.http.get(this.url + 'dobaviOsiguranjaStana');
  }

  public saveInsurance(osiguranjeDTO : OsiguranjeDTO) {
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    console.log(osiguranjeDTO.nekretnine);
    return this.http.post(this.url + 'saveInsurance', JSON.stringify(osiguranjeDTO), {headers : headers});
  }

}
