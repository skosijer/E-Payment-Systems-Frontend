import {Osoba} from "../osoba";
import {Rizik} from "../rizik";
import {NekretninaDTO} from "./nekretnina.dto";
import {VoziloDTO} from "./vozilo.dto";
import { VrstaPlacanja } from "../../components/enums/vrstaPlacanja.enum";
export class PolisaDTO{
  public osiguranici:Osoba[]=[];
  public riziciPutno:Rizik[]=[];
  public nosilac:Osoba = new Osoba();
  public nekretnine:NekretninaDTO[]=[];
  public vozila:VoziloDTO[]=[];
  public trajanjeOsiguranja:number;
  public vrstaPaketa:string;
  public pocetakOsiguranja:Date;
  public vrstaPlacanja:VrstaPlacanja; 

  constructor(){

  }
}
