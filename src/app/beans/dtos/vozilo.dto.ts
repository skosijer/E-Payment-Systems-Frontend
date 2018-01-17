import {Rizik} from "../rizik";
import {Osoba} from "../osoba";
export class VoziloDTO{
  public brojSasije:string;
  public brojTablica:string;
  public godinaProizvodnje:string;
  public markaTip:string;
  public rizici:Rizik[]=[];
  public vlasnik:Osoba = new Osoba();

  constructor(){

  }
}
