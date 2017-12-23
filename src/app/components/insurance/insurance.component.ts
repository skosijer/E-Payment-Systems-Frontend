import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Osoba} from "../../beans/osoba";


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

  //************************************/

  //Podaci za prikaz tabela koje sadrze sve informacije o dodatnim osiguranjima

  osiguranjaVozila : any[] = [];
  osiguranjaVozilaKolone : any[];

  osiguranjaNekretnina : any[] = [];
  osiguranjaNekretninaKolone : any[];

  //Forme za kupovinu polise

  form1: FormGroup;
  form1Data: any = {destinacija: "", vrstaPaketa: "individualno", starost: "odrasli", brojOdraslih: 0, brojDece: 0, brojStarijih: 0, pocetakOsiguranja: new Date, trajanjeOsiguranja: 1, svrhaOsiguranja: 'Turisticki'};

  form2: FormGroup;
  form2Data: any = {ime : "", jmbg : "",prezime: "", brojPasosa: "", datumRodjenja: null, adresa: "", brojTelefona : ""};

  form3: FormGroup;
  form3Data: any = {markaITip: "", godinaProizvodnje: "", brojTablica: "", brojSasije: "", imeVlasnika: '', prezimeVlasnika: '', jmbgVlasnika: '', paketOsiguranja: '', slepovanje: 0, popravka: 0, smestaj: 0, prevoz: 'autobus'};

  form4: FormGroup;
  form4Data: any = {povrsinaStana: "", starostStana: "", procenjenaVrednostStana: "", osiguranjeStana: "", imeVlasnika: '', prezimeVlasnika: '', jmbgVlasnika: '', adresaVlasnika: ''};

  //**********************************************/

  //Boolean vrednosti za medjusobno sakrivanje formi

  showForm3 : boolean = false;
  showForm4 : boolean = false;

  private showCarDialog = false;
  private showHomeDialog = false;

  //*********************************************/

  private activeIndex = 0;
  private groupIterNiz : any[] = [];
  private osobe : Osoba[] = [];




  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.items = [
      { label: 'Osnovni podaci' },
      { label: 'Individualni podaci' },
      { label: 'Ostala osiguranja' },
      { label: 'Placanje' }
    ];

    this.destinacije = [
      { label: 'Odaberite region', value: null },
      { label: 'Evropa', value: "EU" },
      { label: 'Svet', value: "SV" },
      { label: 'Interkontinentalne', value: 'IN'}
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

    this.form1 = this.fb.group({
      destinacija: ['', Validators.required],
      vrstaPaketa: ['', Validators.required],
      //polje vezano samo za individualno osiguranje
      starost: [''],
      /******************************************/
      //polja vezana samo za grupno osiguranje
      brojOdraslih: [''],
      brojDece: [''],
      brojStarijih: [''],
      /************************************/
      pocetakOsiguranja: ['', Validators.required],
      trajanjeOsiguranja: [''],
      svrhaOsiguranja: ['']
    });

    this.form2 = this.fb.group({
      ime : [''],
      prezime : [''],
      jmbg : [''],
      brojPasosa : [''],
      datumRodjenja : [''],
      adresa : [''],
      brojTelefona : ['']
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
  }

  stepSubmit()
  {
    this.activeIndex++;

    if(this.activeIndex != 1)
        return;

    let br;
    if(this.form1.controls['vrstaPaketa'].value == 'individualno')
      br = 1;
    else
      br = this.form1.controls['brojOdraslih'].value + this.form1.controls['brojDece'].value + this.form1.controls['brojStarijih'].value;
    console.log(br);
    for (let i = 0; i < br; i++)
      this.groupIterNiz.push(null);
  }

  onSubmitStepTwo(form) {
    console.log(form);
    this.activeIndex++;
    let br;
    if (this.form1.controls['vrstaPaketa'].value == 'individualno')
      br = 1;
    else {
      br = this.form1.controls['brojOdraslih'].value + this.form1.controls['brojDece'].value + this.form1.controls['brojStarijih'].value;
    }

    for (let i = 0; i < br; i++) {
      let osoba = new Osoba();
      console.log('adresa' + i);
      console.log(form.controls['adresa' + i].value);
      osoba.adresa = form.controls['adresa' + i].value;
      osoba.brojPasosa = form.controls['brojPasosa' + i].value;
      osoba.brojTelefona = form.controls['brojTelefona' + i].value;
      osoba.ime = form.controls['ime' + i].value;
      osoba.JMBG = form.controls['jmbg' + i].value;
      osoba.prezime = form.controls['prezime' + i].value;
      this.osobe.push(osoba);
    }
    console.log(this.osobe);
  }

  previous(){
      if(this.activeIndex == 1)
        this.groupIterNiz = [];
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

    onShowCarDialog() {
      this.showCarDialog = true;
    }

    onShowHomeDialog() {
      this.showHomeDialog = true;
    }

}
