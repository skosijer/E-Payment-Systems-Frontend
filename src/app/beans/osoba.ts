export class Osoba{
  public id : number;
  public ime : string;
  public prezime : string;
  public jmbg : string;
  public adresa : string;
  public brojTelefona : string;
  public brojPasosa : string;
  public datumRodjenja : Date = new Date();
  public email:string;
  public tipOsobe:TipOsobe;
}

export enum TipNosioca{
  OSIGURANIK,
  DRUGO_LICE
}

export enum TipOsobe{
  OSIGURANIK,
  DRUGO_LICE,
  PRODAVAC
}
