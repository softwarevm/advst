import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
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
export class ModalComponent implements OnInit {
  public addCusForm: FormGroup;
  dati_donatore:any
  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.nuovo_donatore)
    this.dati_donatore = this.data
    this.addCusForm = this.fb.group({
      id: this.data.id,
      tessera: [this.data.tessera],
      modo_invio_esami: [this.data.modo_invio_esami],
      data_invio_esami: [moment(this.data.data_invio_esami,'DD/MM/YYYY')],
      tesserino: [(this.data.nuovo_donatore=='Sì' ? true : false)],
      note: [this.data.note],
      tipologia: [this.data.Tipologia],
      data:[null],
      nuovo_donatore : [(this.data.nuovo_donatore=='Sì' ? '' : this.data.nuovo_donatore)]
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
  onSubmitClick() {
    let data = this.addCusForm.controls['data_invio_esami'].value 
     data = moment(data).format('DD/MM/YYYY')
     if(data!='Invalid date') {
       data = data
     } else {
       data = ''
     }
     this.addCusForm.controls['data'].setValue(data)
    console.log('Form Value', data,this.addCusForm.value);
    this.http.post(environment.apiUrl+'/aggiorna_note_donazione.php',JSON.stringify(this.addCusForm.value))
    .subscribe(response => {
      console.log(response)
    },err => {
      console.log(err)
    },() => {localStorage.setItem('note_donazione',JSON.stringify(this.addCusForm.value))
      this.dialog.closeAll();
    })

  }

}
