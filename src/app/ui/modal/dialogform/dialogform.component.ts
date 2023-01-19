import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
const moment =  _moment;
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
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogformComponent implements OnInit {
  tipologia = ['Sangue','Aferesi','ADMO']
  scelta_eferesi: string[] = ['Plasma', 'Piastrine', 'Multicomponenti'];
  public fname: string = moment().format('DD/MM/YYYY');
  public addCusForm: FormGroup;
  url: string = 'https://advst.softwarevm.online/api';
  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {tessera: string}) { }
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      tessera: this.data.tessera,
      eferesi: [''],
      data: [
        this.fname,
        [Validators.required]
      ],
      tipo_donazione: ['', [Validators.required]],
      luogo_donazione: ['', [Validators.required]],
      note: [null]
    });
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  onSubmitClick() {
    localStorage.setItem('chiudo_modal','1')
    const donazione = this.addCusForm.value
    switch (donazione.tipo_donazione) {
      case this.tipologia[0]:
      donazione.data = moment(donazione.data).format('DD/MM/YYYY')
        this.http.post(this.url+'/donazione_sangue.php',JSON.stringify(donazione))
        .subscribe(response => {
          console.log(response)
        },null,() => {
          this.dialog.closeAll()
        })
        break
      case this.tipologia[1]:
      console.log('sto donando il eferesi',donazione.eferesi)
      if(donazione.eferesi=='Piastrine') {
        donazione.data = moment(donazione.data).format('DD/MM/YYYY')
        this.http.post(this.url+'/donazione_piastrine.php',JSON.stringify(donazione))
        .subscribe(response => {
          console.log(response)
        },null,() => {
          this.dialog.closeAll()
        })
      }
      if(donazione.eferesi=='Plasma') {
        donazione.data = moment(donazione.data).format('DD/MM/YYYY')
        this.http.post(this.url+'/donazione_plasma.php',JSON.stringify(donazione))
        .subscribe(response => {
          console.log(response)
        },null,() => {
          this.dialog.closeAll()
        })
      }
      if(donazione.eferesi=='Multicomponenti') {
        donazione.data = moment(donazione.data).format('DD/MM/YYYY')
        this.http.post(this.url+'/donazione_multicomponenti.php',JSON.stringify(donazione))
        .subscribe(response => {
          console.log(response)
        },null,() => {
          this.dialog.closeAll()
        })
      }
        break
      case this.tipologia[2]:
      console.log('sto donando il ADMO')
      donazione.data = moment(donazione.data).format('DD/MM/YYYY')
      this.http.post(this.url+'/donazione_admo.php',JSON.stringify(donazione))
      .subscribe(response => {
        console.log(response)
      },null,() => {
        this.dialog.closeAll()
      })
        break  
      default:
        //Comandi eseguiti quando nessuno dei valori coincide col valore dell'epressione
        break
    }
    console.log('Form Value', this.addCusForm.value);
  }

  check_eferesi() {
    if(this.addCusForm.get('tipo_donazione').value=='Eferesi') {
      if(this.addCusForm.get('eferesi').value) {
        console.log(this.addCusForm.get('eferesi').value)
        return true
        } else {
          return false
        } 
    } else {
      return true
    }
  }

}
