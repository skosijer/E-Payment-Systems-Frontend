import {Osoba} from "../osoba";
import {Rizik} from "../rizik";
export class NekretninaDTO{
  public vlasnik:Osoba = new Osoba();
  public rizici:Rizik[]=[];

  constructor(){

  }
}
