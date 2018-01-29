import {Rizik} from "../rizik";
export class CenaRequestDTO{
  public rizikDTO:Rizik = new Rizik();
  public trajanje:number;
  public riziciDTO:Rizik[]=[];

  constructor(){}
}
