import {Osoba} from "../osoba";
import {Rizik} from "../rizik";
import {NekretninaDTO} from "./nekretnina.dto";
import {VoziloDTO} from "./vozilo.dto";
export class PolisaDTO{
  public osiguranici:Osoba[]=[];
  public riziciPutno:Rizik[]=[];
  public nosilac:Osoba = new Osoba();
  public nekretnine:NekretninaDTO[]=[];
  public vozila:VoziloDTO[]=[];
  public trajanjeOsiguranja:number;
  public vrstaPaketa:string;
  public pocetakOsiguranja:Date;

  constructor(){

  }
}
