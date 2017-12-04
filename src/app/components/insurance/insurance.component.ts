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
  form1Data: any = {destinacija: "", vrstaPaketa: "individualno", starost: "odrasli", brojOdraslih: 1, brojDece: 1, pocetakOsiguranja: new Date, trajanjeOsiguranja: 1};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.items = [
      { label: 'Podaci za proračun' },
      { label: 'Cena' },
      { label: 'Podaci za polisu' },
      { label: 'Porudžbina' }
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
        { label: 'Deca (6 meseci - 18 godina)', value: "deca" },
        { label: 'Odrasli (18 - 60 godina)', value: "odrasli" },
        { label: 'Starija lica (preko 60 godina)', value: "stariji" }
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
      /************************************/
      pocetakOsiguranja: ['', Validators.required],
      trajanjeOsiguranja: ['']
    });
  }

  submitForm1()
  {
     console.log(this.form1);
  }

}
