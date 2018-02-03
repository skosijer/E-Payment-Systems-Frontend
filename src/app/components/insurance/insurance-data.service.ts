import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {PolisaDTO} from "../../beans/dtos/polisa.dto";
import { VrstaPlacanja } from '../enums/vrstaPlacanja.enum';
import { CompletePaymentDTO } from '../../beans/completePaymentDTO';
import {CenaRequestDTO} from "../../beans/dtos/cena-request.dto";


@Injectable()
export class InsuranceDataService {


  private url = 'https://localhost:8081/corpMain/';
  //private url = 'https://localhost:8080/';

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

  public getOsiguranjaDoIznosa(){
    return this.http.get(this.url + 'getOsiguranjaDoIznosa');
  }

  public getSlepovanje(){
    return this.http.get(this.url + 'getSlepovanje');
  }

  public getPopravka(){
    return this.http.get(this.url + 'getPopravka');
  }

  public getPrevoz(){
    return this.http.get(this.url + 'getPrevoz');
  }

  public getSmestaj(){
    return this.http.get(this.url + 'getSmestaj');
  }

  public getPovrsina(){
    return this.http.get(this.url + 'getPovrsina');
  }

  public prikaziCenovnik(cr:CenaRequestDTO){
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(this.url + 'cena', JSON.stringify(cr), {headers : headers});
  }

  public saveInsurance(polisaDTO : PolisaDTO) {
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(this.url + 'polisa', JSON.stringify(polisaDTO), {headers : headers});
  }

  public buyInsurance(polisaDTO : PolisaDTO) {
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    //console.log(osiguranjeDTO.nekretnine);
    //return this.http.post(this.url + 'saveInsurance', JSON.stringify(osiguranjeDTO), {headers : headers});
    return this.http.post(this.url + 'dmzMain/buyInsurance', JSON.stringify(polisaDTO), {headers : headers});
  }

  public completePayment(dto : CompletePaymentDTO) {
    console.log("COMPLETING PAYMENT SERVICE!!!");
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(this.url + 'dmzMain/completePayment', JSON.stringify(dto), {headers : headers});
  }

  public cenaSvega(cr:CenaRequestDTO[]){
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json');
    return this.http.post('https://localhost:8082/dcRizici/cenaSvega', JSON.stringify(cr), {headers : headers});
  }


}
