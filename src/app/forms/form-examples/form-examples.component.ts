import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {
  MatDialog,
} from '@angular/material/dialog';
import { DialogformComponent } from '../../ui/modal/dialogform/dialogform.component';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { environment } from 'src/environments/environment';
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
  selector: 'app-form-examples',
  templateUrl: './form-examples.component.html',
  styleUrls: ['./form-examples.component.scss'],
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
export class FormExamplesComponent {

  date = new FormControl(moment());

  url: string = 'https://advst.softwarevm.online/api';
  donatore: any = []
  eferesi: any = []
  d_admo: any = []
  sangue: any = []
  plasma: any = []
  multicomponenti: any []
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
    private http: HttpClient,
    private dialogModel: MatDialog,
    private snackBar: MatSnackBar) {
    this.initForm();
  }
  initForm() {
   
    this.register = this.fb.group({
      tessera: [''],
      cognome: [''],
      nome: [''],
      sesso: [''],
      data_di_nascita: [''],
      luogo_di_nascita: [''],
      donatore_attivo:[false],
      candidabile:[false],
      gruppo: [''],
      fenotipo: [''],
      portatore_sano: [false],
      ultima_donazione:[''],
      giorni_ultima_donazione: [''],
      donazione_totale_sangue_intero:[''],
      ultima_donazione_plt:[''],
      donazione_totale_plt: [''],
      codice_fiscale: [''],
      comune_di_residenza: [''],
      indirizzo_residenza: [''],
      comune_domicilio: [''],
      indirizzo_domicilio: [''],
      telefono: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      smart_donor:[false],
      note_generiche: [''],
      note_relative_alla_salute: [''],
      ferritina: [''],
      data_ferritina: [''],
      cap: [''],
      eta:[''],
      donazione_totale_admo:[''],
      ultima_donazione_admo:[''],
      donazione_totale_plasma:[''],
      ultima_donazione_plasma:[''],
      donazione_totale_multicomponente:[''],
      ultima_donazione_multicomponente:[''],
      ultima_ecg:[''],
      cap_domicilio:[''],
      valore_plt:[''],
      inidoneo:[false],
      deceduto:[''],
      ex_donatore:['']
    });
  }


  onRegister() {
    console.log('Form Value', this.register.value);
  }

  carrica(event) {
    let firsta = ''
   // console.log(event.target.fieldName)
     firsta = (event.target) ? event.target.value : event
    this.http.get(this.url+'/tessera_test.php?tessera='+firsta)
    .subscribe({
      next:response => {
      this.donatore = response[0]
      console.log(response[0])
      if(response[0] == null) {
        this.donatore = []
        this.initForm();
        this.showTitleErorIcon()
        return false
      }
    },
    error:null,
    complete: () =>{
      console.log('invio a sguiccia =>',firsta)
      this.sguiccia(firsta)
    }
  });
    //

    //

    // fine funzione
  }

  sguiccia(firsta) {
    this.http.get(this.url+'/tessera.php?tessera='+firsta)
    .subscribe(response => {
      console.log('sguiccia')
      console.log(response,this.donatore,firsta)
      //this.donatore = response['donatori'][0]
      this.sangue = response['sangue']
      this.eferesi = response['piastrine']
      this.d_admo = response['admo']
      this.plasma = response['plasma']
      this.multicomponenti = response['multicomponenti']

      const ddn = moment(this.donatore.data_di_nascita,'DD/MM/YYYY')
      const dud = moment(this.donatore.ultima_donazione,'DD/MM/YYYY')
      const dud_plt = moment(this.donatore.ultima_donazione_plt,'DD/MM/YYYY')
      const df = moment(this.donatore.data_ferritina,'DD/MM/YYYY')
      const admo = moment(this.donatore.ultima_donazione_admo,'DD/MM/YYYY')
      const plasma = moment(this.donatore.ultima_donazione_plasma,'DD/MM/YYYY') 
      const multicomponente = moment(this.donatore.ultima_donazione_multicomponenti,'DD/MM/YYYY')
      const ecg = moment(this.donatore.ultima_ecg,'DD/MM/YYYY') 
      //const da = (this.donatore.donatore_attivo==1) ? true : false
      let da = this.check_attivo(this.donatore.giorni_ultima_donazione)
      //const candidabile = (this.donatore.candidabile==1) ? true : false
      let candidabile = this.check_candidabile(this.donatore.sesso,this.donatore.giorni_ultima_donazione)
      const portatore_sano = (this.donatore.portatore_sano==1) ? true : false
      this.register = this.fb.group({
        tessera: firsta,
        cognome: [this.donatore.cognome],
        nome: [this.donatore.nome],
        sesso: [this.donatore.sesso],
        data_di_nascita: [ddn],
        luogo_di_nascita: [this.donatore.luogo_di_nascita],
        donatore_attivo:[da],
        candidabile:[candidabile],
        gruppo: [this.donatore.gruppo],
        fenotipo: [this.donatore.fenotipo],
        portatore_sano: [portatore_sano],
        ultima_donazione:[dud],
        giorni_ultima_donazione:[this.donatore.giorni_ultima_donazione],
        donazione_totale_sangue_intero: [this.donatore.donazione_totale_sangue_intero],
        ultima_donazione_plt: [dud_plt],
        donazione_totale_plt: [this.donatore.donazione_totale_plt],
        codice_fiscale: [this.donatore.codice_fiscale],
        comune_di_residenza: [this.donatore.comune_di_residenza],
        indirizzo_residenza: [this.donatore.indirizzo_residenza],
        comune_domicilio: [this.donatore.comune_domicilio],
        indirizzo_domicilio: [this.donatore.indirizzo_domicilio],
        telefono: [this.donatore.telefono],
        email: [
          this.donatore.email,
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        smart_donor:(this.donatore.smart_donor==1) ? true : false,
        inidoneo:(this.donatore.inidoneo==1) ? true : false,
        deceduto:(this.donatore.deceduto==1) ? true : false,
        ex_donatore:(this.donatore.ex_donatore==1) ? true : false,
        note_generiche: [this.donatore.note_generiche],
        note_relative_alla_salute: [this.donatore.note_relative_alla_salute],
        ferritina: [this.donatore.ferritina],
        data_ferritina: [df],
        cap: [this.donatore.cap],
        eta:[this.donatore.eta],
        donazione_totale_admo:[this.donatore.donazione_totale_admo],
        ultima_donazione_admo:[admo],
        donazione_totale_plasma:[this.donatore.donazione_totale_plasma],
        ultima_donazione_plasma:[plasma],
        donazione_totale_multicomponente:[this.donatore.donazione_totale_multicomponenti],
        ultima_donazione_multicomponente:[multicomponente],
        ultima_ecg:[ecg],
        cap_domicilio:[this.donatore.cap_domicilio],
      valore_plt:[this.donatore.valore_plt]
        
      });
    })

  }

  check_attivo(giorni) {
    
    if(giorni<=720) {
      console.log('minore di',giorni)
      return true
    } else if(giorni>720) {
      console.log('maggiore di',giorni)
      return false
    } 
  }

  check_candidabile(sesso,giorni) {
    if(sesso=='M' && giorni>=90) {
      return true
    } else if(sesso=='F' && giorni>=180) {
      return true
    } else {
      return false
    }
  }
  showTitleErorIcon() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Numero tessera inesistente!',
      footer: '<a href="javascript:void(0)">Prova con un altro numero</a>'
    });
  }

  richieta_aggiornamento(campo,valore) {
    if(this.register.get('tessera').value) {
      //console.log(campo,valore.target.value,this.register.get('tessera').value)
     const firsta = this.register.get('tessera').value
      this.customWithFunction(campo,valore.target.value,firsta)
    }
  }

  richieta_aggiornamento_c(campo,valore) {
    const check = (valore.checked) ? 1 : 0
    if(this.register.get('tessera').value) {
      //console.log(campo,valore.target.value,this.register.get('tessera').value)
     const firsta = this.register.get('tessera').value
      this.customWithFunction(campo,check,firsta)
    }
  }

  richieta_aggiornamento_s(campo,valore) {

    if(this.register.get('tessera').value) {
      //console.log(campo,valore.target.value,this.register.get('tessera').value)
     const firsta = this.register.get('tessera').value
      this.customWithFunction(campo,valore.value,firsta)
    }
  }

  aggiorna(campo,valore,firsta) {
    const db = {
      campo:campo,
      valore:valore,
      tessera: firsta
    }
    this.http.post(this.url+'/aggiorna_campo.php',JSON.stringify(db))
    .subscribe(response => {
    },null,() => {
      console.log(valore)
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Il database è stato aggiornato!',
      //   showConfirmButton: false,
      //   timer: 1500
      // });
      this.snackBar.open('Il database è stato aggiornato!', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snackbar-info',
      });
    })
    
  }

  customWithFunction(campo,valore,firsta) {
    Swal.fire({
      title: 'Aggiornare il valore nel Database?',
      text: "L'operazione è irreversibile!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aggiorna!',
      cancelButtonText: 'Annulla'
    }).then(result => {
      if (result.value) {
        this.aggiorna(campo,valore,firsta)
      } else {
       this.carrica(firsta)
      }
    });
  }

  eliminaDonazione(id,tabella,tessera) {
    Swal.fire({
      title: 'Eliminare la donazione?',
      text: "L'operazione è irreversibile!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Elimina',
      cancelButtonText: 'Annulla'
    }).then(result => {
      if (result.value) {
        console.log(result.value,id,tabella)
        this.cancDonazione(id,tabella,tessera)
      } else {
       console.log(result.value)
      }
    });
  }

  cancDonazione(id,tabella,tessera) {
    this.http.get(environment.apiUrl+'/cancDonazione.php?id='+id+'&tabella='+tabella)
    .subscribe(response => {
      this.carrica(tessera)
      console.log(response)
    })
    
  }

  openDialog(): void {
    localStorage.removeItem('chiudo_modal')
    const firsta = this.register.get('tessera').value
    const dialogRef = this.dialogModel.open(DialogformComponent, {
      width: '640px',
      disableClose: true,
      data: {tessera:firsta}
    });
      dialogRef.afterClosed().subscribe(
        data => {
          if(localStorage.getItem('chiudo_modal')=='1') {
          this.carrica(firsta)
          this.showNotification('snackbar-success','Inserimento effettuato!','top','center')
          console.log('chiudo modal',localStorage.getItem('chiudo_modal'))
          }
        }
    ) 


}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, '', {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName
  });
}

}
