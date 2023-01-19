import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { environment } from '../../../environments/environment';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment} from 'moment';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-nuovo-donatore',
  templateUrl: './nuovo-donatore.component.html',
  styleUrls: ['./nuovo-donatore.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class NuovoDonatoreComponent {
  date = new FormControl(moment());

  url: string = 'https://advst.softwarevm.online/api';
  donatore: any = []
  eferesi: any = []
  d_admo: any = []
  sangue: any = []
  plasma: any = []
  tipo_donazione = ['Sangue Intero','Piastrine','Plasma','Multidonazione','ADMO']
  // Form 1
  register: FormGroup;
  hide = true;
  // Form 2
  secondForm: FormGroup;
  hide2 = true;
  // Form 3
  thirdForm: FormGroup;
  hide3 = true;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient) {
    this.initForm();
  }
  initForm() {
   
    this.register = this.fb.group({
      tessera: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      nome: [''],
      sesso: [''],
      data_di_nascita: [''],
      luogo_di_nascita: [''],
      gruppo: [''],
      fenotipo: [''],
      portatore_sano: [false],
      ultima_donazione:['', [Validators.required]],
      codice_fiscale: [''],
      comune_di_residenza: [''],
      indirizzo_residenza: [''],
      comune_domicilio: [''],
      indirizzo_domicilio: [''],
      telefono: [''],
      email: [
        '',
        [Validators.email, Validators.minLength(5)],
      ],
      note_generiche: [''],
      note_relative_alla_salute: [''],
      cap: [''],
      cap_domicilio: [''],
      ultima_ecg: [''],
      luogo_donazione: ['', [Validators.required]],
      ecg:'',
      data_donazione:'',
      data_nascita:'',
      tipo: ['', [Validators.required]],
    });
  }


  onRegister() {
   const ddn = moment(this.register.get('data_di_nascita').value,'DD/MM/YYYY').format('DD/MM/YYYY')
   this.register.get('data_nascita').setValue(ddn)

   const ecg = moment(this.register.get('ultima_ecg').value,'DD/MM/YYYY').format('DD/MM/YYYY')
   this.register.get('ecg').setValue(ecg)

   const ddd = moment(this.register.get('ultima_donazione').value,'DD/MM/YYYY').format('DD/MM/YYYY')
   this.register.get('data_donazione').setValue(ddd)

   console.log('Form Value', this.register.value);
   this.http.post(environment.apiUrl+'/nuovo_donatore.php',JSON.stringify(this.register.value))
   .subscribe(response => {
   },null,() => {
    this.initForm()
     Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: 'Il donatore è stato inserito!',
       showConfirmButton: false,
       timer: 1500
     });
   })
  }





}
