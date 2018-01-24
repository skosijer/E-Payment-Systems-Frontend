import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {OsiguranjeDTO} from "../../beans/osiguranjeDTO";
import {PolisaDTO} from "../../beans/dtos/polisa.dto";

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

  public getOsiguranjaDoIznosa(){
    return this.http.get(this.url + 'dmzMain/getOsiguranjaDoIznosa');
  }

  public getSlepovanje(){
    return this.http.get(this.url + 'dmzMain/getSlepovanje');
  }

  public getPopravka(){
    return this.http.get(this.url + 'dmzMain/getPopravka');
  }

  public getPrevoz(){
    return this.http.get(this.url + 'dmzMain/getPrevoz');
  }

  public getSmestaj(){
    return this.http.get(this.url + 'dmzMain/getSmestaj');
  }

  public getPovrsina(){
    return this.http.get(this.url + 'dmzMain/getPovrsina');
  }

  public saveInsurance(polisaDTO : PolisaDTO) {
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    return this.http.post('https://localhost:8082/dcRizici/polisa', JSON.stringify(polisaDTO), {headers : headers});
  }

}
