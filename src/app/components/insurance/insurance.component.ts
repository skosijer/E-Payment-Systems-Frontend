import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Osoba, TipNosioca } from "../../beans/osoba";
import { InsuranceDataService } from "./insurance-data.service";
import { Rizik } from "../../beans/rizik";
import { Nosilac } from "../../beans/nosilac_osiguranja";
import { Message } from 'primeng/primeng';
import { JmbgValidators } from "../../components/validators/jmbg.validators";



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
  destinacije: SelectItem[] = [{ label: 'Odaberite region', value: null }];
  vrstePaketa: SelectItem[];
  starostLabela: SelectItem[] = [];
  starosti: Rizik[] = [];
  regioni: Rizik[] = [];
  paketiOsiguranja: SelectItem[] = [{ label: 'Izaberite paket osiguranja', value: null }];
  vrsteAlternativnogPrevoza: SelectItem[];
  osiguranjaStana: SelectItem[] = [{ label: 'Izaberite osiguranje stana', value: null }];
  svrhaOsiguranja: SelectItem[] = [{ label: 'Izaberite svrhu osiguranja', value: null }];
  starostiStana: SelectItem[] = [{ label: 'Izaberite starost stana', value: null }];
  procenjeneVrednostiStana: SelectItem[] = [{ label: 'Izaberite starost stana', value: null }];

  //************************************/

  //Podaci za prikaz tabela koje sadrze sve informacije o dodatnim osiguranjima

  osiguranjaVozila: any[] = [];
  osiguranjaVozilaKolone: any[];

  osiguranjaNekretnina: any[] = [];
  osiguranjaNekretninaKolone: any[];
  putnaOsiguranja: any[] = [];
  putnaOsiguranjaKolone: any[];

  //Forme za kupovinu polise

  form1: FormGroup;
  form1Data: any = { destinacija: "", vrstaPaketa: "individualno", starost: "odrasli", pocetakOsiguranja: new Date, trajanjeOsiguranja: 1, svrhaOsiguranja: 'Turisticki' };

  form2: FormGroup;
  //form2Data: any = { ime: "", jmbg: "", prezime: "", brojPasosa: "", datumRodjenja: null, adresa: "", brojTelefona: "", emailNosioca: "" };
  form2Data: any = { ime: "Stevan", jmbg: "2409994340053", prezime: "Kosijer", brojPasosa: "123456789", datumRodjenja: null, adresa: "MGorkog 2C", brojTelefona: "184848", emailNosioca: "stk@gmk.com" };

  form3: FormGroup;
  //form3Data: any = { markaITip: "", godinaProizvodnje: "", brojTablica: "", brojSasije: "", imeVlasnika: '', prezimeVlasnika: '', jmbgVlasnika: '', paketOsiguranja: '', slepovanje: 0, popravka: 0, smestaj: 0, prevoz: 'autobus' };
  form3Data: any = { markaITip: "191919", godinaProizvodnje: "1950", brojTablica: "21442", brojSasije: "421", imeVlasnika: 'Ludak', prezimeVlasnika: 'Ludacina', jmbgVlasnika: '2409994340053', paketOsiguranja: '', slepovanje: 0, popravka: 0, smestaj: 0, prevoz: 'autobus' };

  form4: FormGroup;
  //form4Data: any = { povrsinaStana: "", starostStana: "", procenjenaVrednostStana: "", osiguranjeStana: "", imeVlasnika: '', prezimeVlasnika: '', jmbgVlasnika: '', adresaVlasnika: '' };
  form4Data: any = { povrsinaStana: "525", starostStana: "5252", procenjenaVrednostStana: "1255", osiguranjeStana: "", imeVlasnika: 'Predrag', prezimeVlasnika: 'Preludovic', jmbgVlasnika: '2409994340053', adresaVlasnika: 'Murovac 2' };

  formNosilac: FormGroup;
  formNosilacData: any = { potencijalniNosilac: "", osobe: "", ime: "", jmbg: "", prezime: "", brojPasosa: "", datumRodjenja: null, adresa: "", brojTelefona: "", emailNosioca: "" };
  //**********************************************/


  private showCarDialog = false;
  private showHomeDialog = false;
  private showInsuranceDialog = false;

  //*********************************************/

  private activeIndex = 0;
  private groupIterNiz: any[] = [];
  private osobe: Osoba[] = [];
  private osobeKolone: any[] = [];


  //Podaci nosioca osiguranja!
  private enterEmailBoolean: boolean = false;
  private canBeInsuranceHolder: boolean = true;


  /*******PODACI ZA NOSIOCA**********/

  private showNosilacDialog: boolean = false;
  potencijalniNosilac: string;
  private osobe_labels: SelectItem[] = [{ label: 'Izaberite nosioca osiguranja', value: null }];
  private nosilac: Nosilac = null;


  /*Poruke za ne validnu prvu formu*/
  msgs: Message[] = [];


  //PODACI ZA BROJ OSIGURANIKA ZA DRUGI KORAK
  private brojOsiguranika: number;


  private form2SubmitAttempt: boolean;
  private form3SubmitAttempt: boolean;
  private form4SubmitAttempt: boolean;
  private formNosilacSubmitAttempt: boolean;

  constructor(private fb: FormBuilder, private insuranceDataService: InsuranceDataService) { }

  ngOnInit() {


    this.insuranceDataService.getStarosneGrupe().subscribe(
      (data) => {
        this.starosti = JSON.parse(data['_body']);

        for (let i = 0; i < this.starosti.length; i++) {
          let s = {
            label: this.starosti[i].vrednost, value: this.starosti[i].id
          };
          this.starostLabela.push(s);
          let str = this.starosti[i].vrednost;
          let ss = {
            str: 1
          };
          this.form1Data.str = 1;

          this.form1.addControl(this.starosti[i].vrednost, new FormControl(''));
        }
      }
    );

    this.insuranceDataService.getRegioni().subscribe(
      (data) => {
        this.regioni = JSON.parse(data['_body']);

        for (let i = 0; i < this.regioni.length; i++) {
          let s = {
            label: this.regioni[i].vrednost, value: this.regioni[i].id
          };
          this.destinacije.push(s);
        }
      }
    );

    this.insuranceDataService.getSvrheOsiguranja().subscribe(
      (data) => {
        let rizici: Rizik[] = JSON.parse(data['_body']);
        for (var i = 0; i < rizici.length; i++) {
          let temp: SelectItem = { label: '', value: '' };
          temp.label = rizici[i].vrednost;
          let val: string[] = rizici[i].vrednost.split(" ");
          temp.value = val[0];
          this.svrhaOsiguranja.push(temp);
        }
      }
    );

    this.insuranceDataService.getPaketiOsiguranja().subscribe(
      (data) => {
        let rizici: Rizik[] = JSON.parse(data['_body']);
        for (var i = 0; i < rizici.length; i++) {
          let temp: SelectItem = { label: '', value: '' };
          temp.label = rizici[i].vrednost;
          let val: string[] = rizici[i].vrednost.split(" ");
          temp.value = val[0];
          this.paketiOsiguranja.push(temp);
        }
      }
    );

    this.insuranceDataService.getStarostiStana().subscribe(
      (data) => {
        let rizici: Rizik[] = JSON.parse(data['_body']);
        for (var i = 0; i < rizici.length; i++) {
          let temp: SelectItem = { label: '', value: '' };
          temp.label = rizici[i].vrednost;
          let val: string[] = rizici[i].vrednost.split(" ");
          temp.value = val[0];
          this.starostiStana.push(temp);
        }
      }
    );

    this.insuranceDataService.getProcenjeneVrednostiStana().subscribe(
      (data) => {
        let rizici: Rizik[] = JSON.parse(data['_body']);
        for (var i = 0; i < rizici.length; i++) {
          let temp: SelectItem = { label: '', value: '' };
          temp.label = rizici[i].vrednost;
          let val: string[] = rizici[i].vrednost.split(" ");
          temp.value = val[0];
          this.procenjeneVrednostiStana.push(temp);
        }
      }
    );

    this.insuranceDataService.getOsiguranjaStana().subscribe(
      (data) => {
        let rizici: Rizik[] = JSON.parse(data['_body']);
        for (var i = 0; i < rizici.length; i++) {
          let temp: SelectItem = { label: '', value: '' };
          temp.label = rizici[i].vrednost;
          let val: string[] = rizici[i].vrednost.split(" ");
          temp.value = val[0];
          this.osiguranjaStana.push(temp);
        }
      }
    );


    this.items = [
      { label: 'Osnovni podaci' },
      { label: 'Individualni podaci' },
      { label: 'Ostala osiguranja' },
      { label: 'Placanje' }
    ];

    this.vrstePaketa = [
      { label: 'Individualno', value: "individualno" },
      { label: 'Grupno', value: "grupno" }
    ];


    this.vrsteAlternativnogPrevoza = [
      { label: 'Autobus', value: "autobus" },
      { label: 'Automobil', value: "automobil" },
      { label: 'Avion', value: "avion" }
    ];

    this.osiguranjaVozilaKolone = [
      { field: 'markaITip', header: 'Marka i tip vozila' },
      //{field: 'godinaProizvodnje', header: 'Godina proizvodnje'}, //Potrebno je formatirati ovaj datum na neki nacin
      { field: 'brojTablica', header: 'Broj tablica' },
      { field: 'brojSasije', header: 'Broj šasije' },
      { field: 'paketOsiguranja', header: 'Paket osiguranja' },
      { field: 'slepovanje', header: 'Šlepovanje (KM)' },
      { field: 'popravka', header: 'Popravka (RSD)' },
      { field: 'smestaj', header: 'Smeštaj (dana)' },
      { field: 'prevoz', header: 'Prevoz' }
    ];

    this.osiguranjaNekretninaKolone = [
      { field: 'povrsinaStana', header: 'Površina stana' },
      { field: 'starostStana', header: 'Starost stana (godine)' },
      { field: 'procenjenaVrednostStana', header: 'Procenjena vrednost stana (RSD)' },
      { field: 'osiguranjeStana', header: 'Od čega se osigurava' },
      { field: 'imeVlasnika', header: 'Ime vlasnika' },
      { field: 'prezimeVlasnika', header: 'Adresa vlasnika' },
      { field: 'jmbgVlasnika', header: 'JMBG vlasnika' },
      { field: 'adresaVlasnika', header: 'Adresa vlasnika' }
    ];

    this.putnaOsiguranjaKolone = [
      { field: 'ime', header: 'Ime' },
      { field: 'jmbg', header: 'JMBG' },
      { field: 'prezime', header: 'Prezime' }
    ];
    this.osobeKolone = [
      { field: 'ime', header: 'Ime' },
      { field: 'jmbg', header: 'JMBG' },
      { field: 'prezime', header: 'Prezime' }
    ];


    this.form1 = this.fb.group({
      destinacija: ['', Validators.required],
      vrstaPaketa: ['', Validators.required],
      //polje vezano samo za individualno osiguranje
      starost: [''],
      pocetakOsiguranja: ['', Validators.required],
      trajanjeOsiguranja: ['', Validators.required],
      svrhaOsiguranja: ['']
    });

    this.form2 = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), JmbgValidators.proveraContrBr]],
      brojPasosa: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      datumRodjenja: [''],
      adresa: ['', Validators.required],
      brojTelefona: [''],
      emailNosioca: ['']
    });

    this.form3 = this.fb.group({
      markaITip: ['', Validators.required],
      godinaProizvodnje: ['', [Validators.pattern('[01-9]{4}'), Validators.required]],
      brojTablica: ['', Validators.required],
      brojSasije: ['', Validators.required],
      imeVlasnika: ['', Validators.required],
      prezimeVlasnika: ['', Validators.required],
      jmbgVlasnika: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), JmbgValidators.proveraContrBr]],
      paketOsiguranja: ['', Validators.required],
      slepovanje: [''],
      popravka: [''],
      smestaj: [''],
      prevoz: ['']
    });

    this.form4 = this.fb.group({
      povrsinaStana: ['', Validators.required],
      starostStana: ['', Validators.required],
      procenjenaVrednostStana: ['', Validators.required],
      osiguranjeStana: ['', Validators.required],
      imeVlasnika: ['', Validators.required],
      prezimeVlasnika: ['', Validators.required],
      jmbgVlasnika: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), JmbgValidators.proveraContrBr]],
      adresaVlasnika: ['', Validators.required]
    });

    console.log('FORM 2');
    console.log(this.form2);

    this.formNosilac = this.fb.group({
      potencijalniNosilac: [''],
      osobe: [''],
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), JmbgValidators.proveraContrBr]],
      brojPasosa: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      datumRodjenja: [''],
      adresa: ['', Validators.required],
      brojTelefona: [''],
      emailNosioca: ['', [Validators.required, Validators.email]]
    });
  }

  printForm() {
    console.log(this.form1);
  }

  stepSubmit() {
    console.log(this.form1);
    // VALIDACIJE PROMENITI JER SE DINAMICKI KREIRA FORMA
    /*if(this.form1.controls['vrstaPaketa'].value == 'grupno'){
      if(this.form1.controls['brojOdraslih'].value == 0 && this.form1.controls['brojStarijih'].value == 0
        && this.form1.controls['brojDece'].value == 0){
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Paznja!', detail:'Molim Vas unesite odgovarajuci[] broj lica.'});
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
    } */

    this.activeIndex++;

    if (this.activeIndex != 1)
      return;
  }

  secondStepSubmit() {
    if (this.osobe.length < 1) {
      return;
    }


    let counter: number = 0;
    for (var i = 0; i < this.osobe.length; i++) {

      if (this.osobe[i].email !== undefined) {
        counter++;
        break;
      }
    }

    if (counter > 0) {
      this.activeIndex++;

      if (this.activeIndex != 2)
        return;
    } else {
      this.osobe_labels = [{
        label: 'Izaberite nosioca osiguranja', value: null
      }];
      this.showNosilacDialog = true;
      for (var i = 0; i < this.osobe.length; i++) {

        let temp: SelectItem = { label: '', value: '' };
        temp.label = this.osobe[i].ime + ' ' + this.osobe[i].prezime + ' |JMBG:' + this.osobe[i].jmbg;
        temp.value = this.osobe[i].jmbg;
        this.osobe_labels.push(temp);
      }
    }
  }

  previous() {
    if (this.activeIndex == 1)
      this.groupIterNiz = [];
    this.activeIndex--;
  }

  secondStepPrevious() {
    this.activeIndex--;
  }

  dodajOsiguranjeVozila() {
    console.log(this.form3);
    this.form3SubmitAttempt = true;
    //pravljenje kopije objekta da se ne bi prenosila referenca u novi niz
    let x = Object.assign({}, this.form3Data);
    //spread operator za unos kopije objekta u niz
    this.osiguranjaVozila = [...this.osiguranjaVozila, x];
    this.showCarDialog = false;
    this.form3.reset();
  }

  obrisiOsiguranjeVozila(formaOsiguranjaVozila) {
    let index = this.osiguranjaVozila.indexOf(formaOsiguranjaVozila);
    this.osiguranjaVozila.splice(index, 1);
    this.osiguranjaVozila = [...this.osiguranjaVozila];
  }

  dodajOsiguranjeNekretnine() {
    this.form4SubmitAttempt = true;
    //pravljenje kopije objekta da se ne bi prenosila referenca u novi niz
    let x = Object.assign({}, this.form4Data);
    //spread operator za unos kopije objekta u niz
    this.osiguranjaNekretnina = [...this.osiguranjaNekretnina, x];
    this.showHomeDialog = false;
    this.form4.reset();
  }

  obrisiOsiguranjeNekretnine(formaOsiguranjaNekretnine) {
    let index = this.osiguranjaNekretnina.indexOf(formaOsiguranjaNekretnine);
    this.osiguranjaNekretnina.splice(index, 1);
    this.osiguranjaNekretnina = [...this.osiguranjaNekretnina];
  }

  dodajOsiguranika() {

    this.form2SubmitAttempt = true;
    //pravljenje kopije objekta da se ne bi prenosila referenca u novi niz

    let x = Object.assign({}, this.form2Data);
    //spread operator za unos kopije objekta u niz

    this.showInsuranceDialog = false;

    let osoba: Osoba = new Osoba();
    osoba.ime = x.ime;
    osoba.adresa = x.adresa;
    osoba.brojPasosa = x.brojPasosa;
    osoba.jmbg = x.jmbg;
    osoba.brojTelefona = x.brojTelefona;
    osoba.datumRodjenja = x.datumRodjenja;
    osoba.prezime = x.prezime;

    //Provera da li je dodati osiguranik nosilac osiguranja
    if (x.emailNosioca != '') {
      this.canBeInsuranceHolder = false;
      osoba.email = x.emailNosioca;
      this.osobe = [...this.osobe, osoba];
      this.nosilac = new Nosilac(osoba, TipNosioca.OSIGURANIK);
    } else {
      this.osobe = [...this.osobe, osoba];
    }

    this.brojOsiguranika--;
    this.form2.reset();
  }

  obrisiOsiguranika(osiguranik) {

    let osoba: Osoba = new Osoba();
    for (var i = 0; i < this.osobe.length; i++) {
      if (this.osobe[i].jmbg == osiguranik.jmbg) {
        osoba = this.osobe[i];
        break;
      }
    }

    let index = this.osobe.indexOf(osoba);

    if (this.nosilac) {
      if (this.nosilac.osoba.jmbg === osoba.jmbg) {
        this.nosilac = null;
      }
    }

    this.osobe.splice(index, 1);
    this.osobe = [...this.osobe];
    this.brojOsiguranika++;


    if (osiguranik.emailNosioca != '') {
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

  nosiocOsiguranjaChange(checked: boolean) {

    this.enterEmailBoolean = checked;
  }

  dodajNosioca() {
    this.formNosilacSubmitAttempt = true;
    let x = Object.assign({}, this.formNosilacData);
    if (this.potencijalniNosilac === 'osiguranik') {
      if (x.osobe != '') {
        for (var i = 0; i < this.osobe.length; i++) {
          if (x.osobe === this.osobe[i].jmbg) {

            this.osobe[i].email = x.emailNosioca;
            this.nosilac = new Nosilac(this.osobe[i], TipNosioca.OSIGURANIK);
            this.canBeInsuranceHolder = false;
            break;
          }
        }
      }
    } else {

      let osoba: Osoba = new Osoba();
      osoba.ime = x.ime;
      osoba.adresa = x.adresa;
      osoba.brojPasosa = x.brojPasosa;
      osoba.jmbg = x.jmbg;
      osoba.brojTelefona = x.brojTelefona;
      osoba.datumRodjenja = x.datumRodjenja;
      osoba.prezime = x.prezime;
      osoba.email = x.emailNosioca;
      this.nosilac = new Nosilac(osoba, TipNosioca.DRUGO_LICE);
      this.canBeInsuranceHolder = false;
    }
    this.showNosilacDialog = false;
    this.activeIndex++;

    if (this.activeIndex != 2)
      return;
  }

  get ime() {
    return this.form2.get('ime');
  }

  get prezime() {
    return this.form2.get('prezime');
  }

  get jmbg() {
    return this.form2.get('jmbg');
  }

  get adresa() {
    return this.form2.get('adresa');
  }

  get brojPasosa() {
    return this.form2.get('brojPasosa');
  }

  get emailNosioca() {
    return this.form2.get('emailNosioca');
  }

  isFieldValidForm2(field: string) {
    return (!this.form2.get(field).valid && this.form2.get(field).touched) ||
      (this.form2.get(field).untouched && this.form2SubmitAttempt);
  }

  displayFieldCssForm2(field: string) {
    return {
      'has-error': this.isFieldValidForm2(field),
      'has-feedback': this.isFieldValidForm2(field)
    }
  }

  isFieldValidForm3(field: string) {
    return (!this.form3.get(field).valid && this.form3.get(field).touched) ||
      (this.form3.get(field).untouched && this.form3SubmitAttempt);
  }

  displayFieldCssForm3(field: string) {
    return {
      'has-error': this.isFieldValidForm3(field),
      'has-feedback': this.isFieldValidForm3(field)
    }
  }

  isFieldValidForm4(field: string) {
    return (!this.form4.get(field).valid && this.form4.get(field).touched) ||
      (this.form4.get(field).untouched && this.form4SubmitAttempt);
  }

  displayFieldCssForm4(field: string) {
    return {
      'has-error': this.isFieldValidForm4(field),
      'has-feedback': this.isFieldValidForm4(field)
    }
  }

  isFieldValidFormNosilac(field: string) {
    return (!this.formNosilac.get(field).valid && this.formNosilac.get(field).touched) ||
      (this.formNosilac.get(field).untouched && this.formNosilacSubmitAttempt);
  }

  displayFieldCssFormNosilac(field: string) {
    return {
      'has-error': this.isFieldValidFormNosilac(field),
      'has-feedback': this.isFieldValidFormNosilac(field)
    }
  }

}
