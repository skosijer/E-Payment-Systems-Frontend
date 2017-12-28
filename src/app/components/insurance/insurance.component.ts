import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {Osoba, TipNosioca} from "../../beans/osoba";
import {InsuranceDataService} from "./insurance-data.service";
import {Rizik} from "../../beans/rizik";
import {Nosilac} from "../../beans/nosilac_osiguranja";
import {Message} from 'primeng/primeng';


@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InsuranceComponent implements OnInit {

  //Podaci za select polja u formama

  items: MenuItem[];
  itemsTwo: MenuItem[];
  destinacije: SelectItem[];
  vrstePaketa: SelectItem[];
  starost: SelectItem[];
  paketiOsiguranja : SelectItem[];
  vrsteAlternativnogPrevoza : SelectItem[];
  osiguranjaStana : SelectItem[];
  svrhaOsiguranja : SelectItem[];
  starostiStana : SelectItem[];
  procenjeneVrednostiStana : SelectItem[];

  //************************************/

  //Podaci za prikaz tabela koje sadrze sve informacije o dodatnim osiguranjima

  osiguranjaVozila : any[] = [];
  osiguranjaVozilaKolone : any[];

  osiguranjaNekretnina : any[] = [];
  osiguranjaNekretninaKolone : any[];
  putnaOsiguranja : any[] = [];
  putnaOsiguranjaKolone : any[];

  //Forme za kupovinu polise

  form1: FormGroup;
  form1Data: any = {destinacija: "", vrstaPaketa: "individualno", starost: "odrasli", brojOdraslih: 0, brojDece: 0, brojStarijih: 0, pocetakOsiguranja: new Date, trajanjeOsiguranja: 1, svrhaOsiguranja: 'Turisticki'};

  form2: FormGroup;
  form2Data: any = {ime : "", jmbg : "",prezime: "", brojPasosa: "", datumRodjenja: null, adresa: "", brojTelefona : "", emailNosioca: ""};

  form3: FormGroup;
  form3Data: any = {markaITip: "", godinaProizvodnje: "", brojTablica: "", brojSasije: "", imeVlasnika: '', prezimeVlasnika: '', jmbgVlasnika: '', paketOsiguranja: '', slepovanje: 0, popravka: 0, smestaj: 0, prevoz: 'autobus'};

  form4: FormGroup;
  form4Data: any = {povrsinaStana: "", starostStana: "", procenjenaVrednostStana: "", osiguranjeStana: "", imeVlasnika: '', prezimeVlasnika: '', jmbgVlasnika: '', adresaVlasnika: ''};

  formNosilac: FormGroup;
  formNosilacData: any = {potencijalniNosilac: "", osobe: "", ime : "", jmbg : "",prezime: "", brojPasosa: "", datumRodjenja: null, adresa: "", brojTelefona : "", emailNosioca: ""};
  //**********************************************/


  private showCarDialog = false;
  private showHomeDialog = false;
  private showInsuranceDialog = false;

  //*********************************************/

  private activeIndex = 0;
  private groupIterNiz : any[] = [];
  private osobe : Osoba[] = [];
  private osobeKolone: any[]=[];


  //Podaci nosioca osiguranja!
  private enterEmailBoolean:boolean = false;
  private canBeInsuranceHolder:boolean = true;


  /*******PODACI ZA NOSIOCA**********/

  private showNosilacDialog:boolean = false;
  potencijalniNosilac:string;
  private osobe_labels: SelectItem[]=[{
    label:'Izaberite nosioca osiguranja', value:null
  }];
  private nosilac:Nosilac = null;


  /*Poruke za ne validnu prvu formu*/
  msgs: Message[] = [];


  //PODACI ZA BROJ OSIGURANIKA ZA DRUGI KORAK
  private brojOsiguranika:number;




  constructor(private fb: FormBuilder, private insuranceDataService:InsuranceDataService) { }

  ngOnInit() {


    this.insuranceDataService.getStarosneGrupe().subscribe(
      (data) => {
        console.log(data['_body']);
        let rizici : Rizik[] = JSON.parse(data['_body']);
        console.log(rizici);
      }
    );



    this.items = [
      { label: 'Osnovni podaci' },
      { label: 'Individualni podaci' },
      { label: 'Ostala osiguranja' },
      { label: 'Placanje' }
    ];

    this.destinacije = [
      { label: 'Odaberite region', value: null },
      { label: 'Evropa - nadoknada stete do 30 000 €', value: "Evropa" },
      { label: 'Svet - nadoknada stete do 40 000 €', value: "Svet" },
      { label: 'Interkontinentalne - nadoknada stete do 15 000 €', value: 'Interkontinentalno'}
    ];

     this.vrstePaketa = [
      { label: 'Individualno', value: "individualno" },
      { label: 'Grupno', value: "grupno" }
    ];

    this.starost = [
        { label: 'Deca (0 - 18 godina)', value: "deca" },
        { label: 'Odrasli (19 - 70 godina)', value: "odrasli" },
        { label: 'Starija lica (preko 70 godina)', value: "stariji" }
    ];

    this.paketiOsiguranja = [
      { label: 'Odaberi paket', value: null },
      { label: 'Šlepovanje do određene kilometraže', value: "slepovanje" },
      { label: 'Popravka do određene cene', value: "popravka" },
      { label: 'Smeštaj u hotelu do određenog broja dana', value: "smestaj" },
      { label: 'Alternativni prevoz', value: "prevoz" }
    ];

     this.vrsteAlternativnogPrevoza = [
        { label: 'Autobus', value: "autobus" },
        { label: 'Automobil', value: "automobil" },
        { label: 'Avion', value: "avion" }
    ];

    this.osiguranjaStana = [
        { label: 'Osiguranje od poplave', value: "Poplava" },
        { label: 'Osiguranje od krađe', value: "Krađa" },
        { label: 'Osiguranje od požara', value: "Požar" }
    ];

    this.starostiStana = [
      { label: 'Do 5 godina', value: "Pet" },
      { label: 'Do 20 godina', value: "Dvadeset" },
      { label: 'Do 50 godina', value: "Pedeset" },
      { label: 'Preko 50 godina', value: "PrekoPedeset" }
    ];

    this.procenjeneVrednostiStana = [
      { label: 'Do 50.000 €', value: "Pedeset" },
      { label: 'Do 100.000 €', value: "Sto" },
      { label: 'Preko 100.000 €', value: "PrekoSto"}
    ];

    this.svrhaOsiguranja = [
        { label: 'Turisticki', value: "Turisticki"},
        { label: 'Poslovno-administrativni poslovi', value: "Poslovno-administrativni-poslovi"},
        { label: 'Poslovno-privremeni rad', value: "Poslovno-privremeni-rad"},
        { label: 'Sportisti', value: "Sportisti"},
        { label: 'Rekreativni skijasi', value: "Rekreativni-skijasi"}
    ];

    this.osiguranjaVozilaKolone = [
            {field: 'markaITip', header: 'Marka i tip vozila'},
          //{field: 'godinaProizvodnje', header: 'Godina proizvodnje'}, //Potrebno je formatirati ovaj datum na neki nacin
            {field: 'brojTablica', header: 'Broj tablica'},
            {field: 'brojSasije', header: 'Broj šasije'},
            {field: 'paketOsiguranja', header: 'Paket osiguranja'},
            {field: 'slepovanje', header: 'Šlepovanje (KM)'},
            {field: 'popravka', header: 'Popravka (RSD)'},
            {field: 'smestaj', header: 'Smeštaj (dana)'},
            {field: 'prevoz', header: 'Prevoz'}
    ];

     this.osiguranjaNekretninaKolone = [
            {field: 'povrsinaStana', header: 'Površina stana'},
            {field: 'starostStana', header: 'Starost stana (godine)'},
            {field: 'procenjenaVrednostStana', header: 'Procenjena vrednost stana (RSD)'},
            {field: 'osiguranjeStana', header: 'Od čega se osigurava'},
            {field: 'imeVlasnika', header: 'Ime vlasnika'},
            {field: 'prezimeVlasnika', header: 'Adresa vlasnika'},
            {field: 'jmbgVlasnika', header: 'JMBG vlasnika'},
            {field: 'adresaVlasnika', header: 'Adresa vlasnika'}
    ];

    this.putnaOsiguranjaKolone = [
        {field: 'ime', header: 'Ime'},
        {field: 'jmbg', header: 'JMBG'},
        {field: 'prezime', header: 'Prezime'}
    ];
    this.osobeKolone = [
      {field: 'ime', header: 'Ime'},
      {field: 'JMBG', header: 'JMBG'},
      {field: 'prezime', header: 'Prezime'}
    ];


    this.form1 = this.fb.group({
      destinacija: ['', Validators.required],
      vrstaPaketa: ['', Validators.required],
      //polje vezano samo za individualno osiguranje
      starost: [''],
      /******************************************/
      //polja vezana samo za grupno osiguranje
      brojOdraslih: ['', Validators.required],
      brojDece: ['', Validators.required],
      brojStarijih: ['', Validators.required],
      /************************************/
      pocetakOsiguranja: ['', Validators.required],
      trajanjeOsiguranja: ['', Validators.required],
      svrhaOsiguranja: ['']
    });



    this.form2 = this.fb.group({
      ime : [''],
      prezime : [''],
      jmbg : [''],
      brojPasosa : [''],
      datumRodjenja : [''],
      adresa : [''],
      brojTelefona : [''],
      emailNosioca: ['']
    });

    this.form3 = this.fb.group({
      markaITip : [''],
      godinaProizvodnje : ['', [Validators.pattern('[01-9]{4}'), Validators.required]],
      brojTablica : [''],
      brojSasije : [''],
      imeVlasnika: [''],
      prezimeVlasnika: [''],
      jmbgVlasnika: [''],
      paketOsiguranja : ['',  Validators.required],
      slepovanje : [''],
      popravka : [''],
      smestaj : [''],
      prevoz : ['']
    });

     this.form4 = this.fb.group({
      povrsinaStana : [''],
      starostStana : [''],
      procenjenaVrednostStana : [''],
      osiguranjeStana : [''],
      imeVlasnika: [''],
      prezimeVlasnika: [''],
      jmbgVlasnika: [''],
      adresaVlasnika : ['']
    });


    this.formNosilac = this.fb.group({
      potencijalniNosilac: [''],
      osobe: [''],
      ime : [''],
      prezime : [''],
      jmbg : [''],
      brojPasosa : [''],
      datumRodjenja : [''],
      adresa : [''],
      brojTelefona : [''],
      emailNosioca: ['']
    });
  }

  stepSubmit()
  {

    if(this.form1.controls['vrstaPaketa'].value == 'grupno'){
      if(this.form1.controls['brojOdraslih'].value == 0 && this.form1.controls['brojStarijih'].value == 0
        && this.form1.controls['brojDece'].value == 0){
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Paznja!', detail:'Molim Vas unesite odgovarajuci broj lica.'});
        return;
      }else{
        let num = this.form1.controls['brojOdraslih'].value + this.form1.controls['brojStarijih'].value + this.form1.controls['brojDece'].value;
        this.brojOsiguranika = num;
        if(num < 2){
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Paznja!', detail:'Molim Vas unesite odgovarajuci broj lica.'});
          return;
        }
      }
    }else{
      this.brojOsiguranika = 1;
    }

    this.activeIndex++;

    if(this.activeIndex != 1)
        return;
  }

  secondStepSubmit()
  {
    if(this.osobe.length < 1){
      return;
    }


    let counter:number = 0;
    for(var i = 0;i < this.osobe.length; i++){

      if(this.osobe[i].email !== undefined){
        counter++;
        break;
      }
    }

    if(counter > 0){
      this.activeIndex++;

      if(this.activeIndex != 2)
        return;
    }else{
      this.osobe_labels = [{
        label:'Izaberite nosioca osiguranja', value:null
      }];
      this.showNosilacDialog = true;
      for(var i = 0;i < this.osobe.length; i++){

        let temp:SelectItem = {label:'',value:''};
        temp.label = this.osobe[i].ime + ' '+ this.osobe[i].prezime + ' |JMBG:' +this.osobe[i].JMBG;
        temp.value = this.osobe[i].JMBG;
        this.osobe_labels.push(temp);
      }
    }
  }

  previous(){
      if(this.activeIndex == 1)
        this.groupIterNiz = [];
      this.activeIndex--;
  }

  secondStepPrevious() {
    this.activeIndex--;
  }

  dodajOsiguranjeVozila()
  {
      console.log(this.form3);
      //pravljenje kopije objekta da se ne bi prenosila referenca u novi niz
      let x = Object.assign({}, this.form3Data);
      //spread operator za unos kopije objekta u niz
      this.osiguranjaVozila = [...this.osiguranjaVozila, x];
      this.showCarDialog = false;
      this.form3.reset();
  }

  obrisiOsiguranjeVozila(formaOsiguranjaVozila)
  {
      let index = this.osiguranjaVozila.indexOf(formaOsiguranjaVozila);
      this.osiguranjaVozila.splice(index, 1);
      this.osiguranjaVozila =  [...this.osiguranjaVozila];
  }

  dodajOsiguranjeNekretnine()
  {
      //pravljenje kopije objekta da se ne bi prenosila referenca u novi niz
      let x = Object.assign({}, this.form4Data);
      //spread operator za unos kopije objekta u niz
      this.osiguranjaNekretnina = [...this.osiguranjaNekretnina, x];
      this.showHomeDialog = false;
      this.form4.reset();
  }

   obrisiOsiguranjeNekretnine(formaOsiguranjaNekretnine)
  {
      let index = this.osiguranjaNekretnina.indexOf(formaOsiguranjaNekretnine);
      this.osiguranjaNekretnina.splice(index, 1);
      this.osiguranjaNekretnina =  [...this.osiguranjaNekretnina];
  }

  dodajOsiguranika()
  {
      //pravljenje kopije objekta da se ne bi prenosila referenca u novi niz
      let x = Object.assign({}, this.form2Data);
      //spread operator za unos kopije objekta u niz

      this.showInsuranceDialog = false;

      let osoba:Osoba = new Osoba();
      osoba.ime = x.ime;
      osoba.adresa = x.adresa;
      osoba.brojPasosa = x.brojPasosa;
      osoba.JMBG = x.jmbg;
      osoba.brojTelefona = x.brojTelefona;
      osoba.datumRodjenja = x.datumRodjenja;
      osoba.prezime = x.prezime;

      //Provera da li je dodati osiguranik nosilac osiguranja
      if(x.emailNosioca != ''){
        this.canBeInsuranceHolder = false;
        osoba.email = x.emailNosioca;
        this.osobe = [...this.osobe,osoba];
        this.nosilac = new Nosilac(osoba, TipNosioca.OSIGURANIK);
      }else{
        this.osobe = [...this.osobe,osoba];
      }

      this.brojOsiguranika--;
      this.form2.reset();
  }

   obrisiOsiguranika(osiguranik)
  {

    let osoba:Osoba = new Osoba();
    for(var i = 0;i < this.osobe.length; i++){
      if(this.osobe[i].JMBG == osiguranik.jmbg){
        osoba = this.osobe[i];
        break;
      }
    }

      let index = this.osobe.indexOf(osoba);

      if(this.nosilac){
        if(this.nosilac.osoba.JMBG === osoba.JMBG){
          this.nosilac = null;
        }
      }

      this.osobe.splice(index, 1);
      this.osobe =  [...this.osobe];
      this.brojOsiguranika++;


      if(osiguranik.emailNosioca != ''){
        this.canBeInsuranceHolder = true;
      }
  }

    onShowCarDialog() {
      this.showCarDialog = true;
    }

    onShowHomeDialog() {
      this.showHomeDialog = true;
    }

    onShowInsuranceDialog() {
      this.showInsuranceDialog = true;
    }

  nosiocOsiguranjaChange(checked:boolean){

    this.enterEmailBoolean = checked;
  }

  dodajNosioca(){
    let x = Object.assign({}, this.formNosilacData);
    if(this.potencijalniNosilac === 'osiguranik'){
      if(x.osobe != ''){
        for(var i = 0; i < this.osobe.length; i++){
          if(x.osobe === this.osobe[i].JMBG){

            this.osobe[i].email = x.emailNosioca;
            this.nosilac = new Nosilac(this.osobe[i], TipNosioca.OSIGURANIK);
            this.canBeInsuranceHolder = false;
            break;
          }
        }
      }
    }else{

      let osoba:Osoba = new Osoba();
      osoba.ime = x.ime;
      osoba.adresa = x.adresa;
      osoba.brojPasosa = x.brojPasosa;
      osoba.JMBG = x.jmbg;
      osoba.brojTelefona = x.brojTelefona;
      osoba.datumRodjenja = x.datumRodjenja;
      osoba.prezime = x.prezime;
      osoba.email = x.emailNosioca;
      this.nosilac = new Nosilac(osoba, TipNosioca.DRUGO_LICE);
      this.canBeInsuranceHolder = false;
    }
    this.showNosilacDialog = false;
    this.activeIndex++;

    if(this.activeIndex != 2)
      return;
  }


}
