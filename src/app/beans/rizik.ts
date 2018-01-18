import {TipRizika} from "./tipRizlika";
import {StavkaCenovnik} from "./stavkaCenovnik";
export class Rizik {

  public id : number;
  public vrednost : string;
  public kolicina:number;
  public tipRizik : TipRizika = new TipRizika();
  public stavkaCenovnik : StavkaCenovnik = new StavkaCenovnik();

}
