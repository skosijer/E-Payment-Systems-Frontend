import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class InsuranceDataService {


  private url = 'http://localhost:8080/';

  constructor(private http:Http) { }


  public getRegions(){
    return this.http.get(this.url+'dmz-insurance-forms/test');
  }

}
