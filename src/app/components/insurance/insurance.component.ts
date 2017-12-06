import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InsuranceComponent implements OnInit {

  items: MenuItem[];
  destinacije: SelectItem[];
  vrstePaketa: SelectItem[];
  starost: SelectItem[];

  form1: FormGroup;
  form1Data: any = {destinacija: "", vrstaPaketa: "individualno", starost: "odrasli", brojOdraslih: 0, brojDece: 0, brojStarijih: 0, pocetakOsiguranja: new Date, trajanjeOsiguranja: 1};

  form2: FormGroup;
  form2Data: any = {ime : "", jmbg : "",prezime: "", brojPasosa: "", datumRodjenja: null, adresa: "", brojTelefona : ""};

  private activeIndex = 0;
  private groupIterNiz : any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.items = [
      { label: 'Osnovni podaci' },
      { label: 'Individualni podaci' },
      { label: 'Dodatna osiguranja' },
      { label: 'Placanje' }
    ];

    this.destinacije = [
      { label: 'Odaberi destinaciju', value: null },
      { label: 'Srbija', value: "RS" },
      { label: 'Rusija', value: "RU" }
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
      trajanjeOsiguranja: ['']
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
  }

  submitForm1()
  {
    this.activeIndex++;
    console.log(this.form1);
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
  }

}
