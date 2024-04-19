import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoteComponent } from './dialog-note/dialog-note.component';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
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
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TaskComponent implements OnInit {
  mode = new FormControl('side');
  taskForm: FormGroup;
  showFiller = false;
  isNewEvent = false;
  dialogTitle: string;
  userImg: string;
  url
  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialog: MatDialog) {
    this.taskForm = this.createFormGroup();
  }
  cerca_note:boolean = false
  cerca_gruppo:boolean = false
  cerca_piastrine:boolean = false
  cerca_tessera:boolean = false
  cerca_compleanno:boolean = false
  cerca_cognome:boolean = false
  tasks = [];
  localita:any = []
  anno: any = []
  localita_filtro = []
  donatori: any = []
  donatori_filtro: any = []
  nascondi_citta:boolean = false
  

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Cerca Donatori',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'search'
    }
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
  toggle(task, nav: any) {
    nav.close();
    task.done = !task.done;
  }
  addNewTask(nav: any) {

    nav.open();
  }

  closeSlider(nav: any) {
    if (nav.open()) {
      nav.close();
    }
  }
  createFormGroup() {
    return this.fb.group({
      sangue: [null],
      piastrine: [null],
      plasma: [null],
      multicomponente: [null],
      admo:[null],
      anno: [null],
      opzioni:[null],
      note:[null],
      filtri_personalizzati:[null],
      gruppo:[null],
      tessera:[null],
      data_compleanno:'',
      cognome:[null]
    });
  }
  saveTask(nav: any,url) {
    const anno:any = new Date(this.taskForm.controls.anno.value,0,1,0,0,0,0)
    const oggi:any = new Date()
    const diff = oggi/1000/24/60/60 - anno/1000/24/60/60
    console.log('giorni',diff)
    this.showNotification(
      'snackbar-info',
      'Sto cercando i dati. Attendere qualche secondo...',
      'top',
      'center'
    );
    const valori = {
      check_note: this.cerca_note,
      note: this.taskForm.controls.note.value,
      opzioni: this.taskForm.controls.opzioni.value, 
      sangue: this.taskForm.controls.sangue.value,
      piastrine: this.taskForm.controls.piastrine.value,
      plasma: this.taskForm.controls.plasma.value,
      multicomponente: this.taskForm.controls.multicomponente.value,
      admo: this.taskForm.controls.admo.value,
      anno: this.taskForm.controls.anno.value,
      gruppo: this.taskForm.controls.gruppo.value,
      tessera: this.taskForm.controls.tessera.value,
      data_compleanno: moment(this.taskForm.get('data_compleanno').value).format('DD/MM/YYYY'),
      localita: this.filtra(),
      cognome: this.taskForm.controls.cognome.value,
     //localita: '"Cimina\' (RC)","Cava De\' Tirreni (SA)"'
    }
   // const url = (this.cerca_note==false) ? '/filtro_donatori.php' : '/filtro_note.php'
    this.http.post(environment.apiUrl+url,JSON.stringify(valori))
    .subscribe(response => {
      this.spinnerButtonOptions.active = false;
      console.log('-->',response)
      if(!response['donatori']) {
        this.showNotification(
          'snackbar-danger',
          'Non ci sono dati da visualizzare! Provare un altro criterio di ricerca',
          'top',
          'center'
        );
        nav.close()
        return false
      }
      
      nav.close()
      this.donatori = response['donatori']
      this.donatori_filtro = response['donatori']
      console.log(this.donatori)
    },err => {
      console.log('-->',err)
      this.showNotification(
        'snackbar-danger',
        'Si è verificato un errore nel caricamento dei dati.  ',
        'center',
        'center'
      );
    },() => {
      this.donatori.map(x => {
        const ultime_donazioni = {
          Multicomponenti: (x.gg_multicomponenti) ? x.gg_multicomponenti : 1000000,
          Plasma: (x.gg_plasma) ? x.gg_plasma : 1000000,
          Piastrine: (x.gg_plt) ? x.gg_plt : 1000000,
          'Sangue Intero': (x.giorni_ultima_donazione) ? x.giorni_ultima_donazione : 1000000
        }
        let arr = Object.values(ultime_donazioni);
        let min = Math.min(...arr);

        if(min>0) {
        let chiave =  Object.keys(ultime_donazioni).find(key => ultime_donazioni[key] == min);
         // console.log('boh',chiave,min,Object.keys(ultime_donazioni))
          
          //
          switch (chiave) {
            case 'Multicomponenti':
              //Comandi eseguiti quando il valore dell'espressione coincide con valore1
              x.gestione_donazioni = {
                tipo:chiave,
                gg:min,
                SI: (x.sesso=='M') ? 14 : 14,
                plasma: (x.sesso=='M') ? 14 : 14,
                piastrine: (x.sesso=='M') ? 14 : 14,
                multicomponente: (x.sesso=='M') ? 14 : 14,
              } 
              break;
            case 'Plasma':
              //Comandi eseguiti quando il valore dell'espressione coincide con valore2
              x.gestione_donazioni = {
                tipo:chiave,
                gg:min,
                SI: (x.sesso=='M') ? 14 : 14,
                plasma: (x.sesso=='M') ? 14 : 14,
                piastrine: (x.sesso=='M') ? 14 : 14,
                multicomponente: (x.sesso=='M') ? 14 : 14,
              } 
              break;
            case 'Piastrine':
              //Comandi eseguiti quando il valore dell'espressione coincide con valoreN
              x.gestione_donazioni = {
                tipo:chiave,
                gg:min,
                SI: (x.sesso=='M') ? 14 : 14,
                plasma: (x.sesso=='M') ? 14 : 14,
                piastrine: (x.sesso=='M') ? 14 : 14,
                multicomponente: (x.sesso=='M') ? 14 : 14,
              } 
              break;
            case 'Sangue Intero':
            x.gestione_donazioni = {
              tipo:chiave,
              gg:min,
              SI: (x.sesso=='M') ? 90 : 180,
              plasma: (x.sesso=='M') ? 30 : 30,
              piastrine: (x.sesso=='M') ? 30 : 30,
              multicomponente: (x.sesso=='M') ? 30 : 30,
            }
              //Comandi eseguiti quando il valore dell'espressione coincide con valoreN
              break;
            default:
              //Comandi eseguiti quando nessuno dei valori coincide col valore dell'epressione
              break;
          }
          //
        }
      })
      this.donatori = this.donatori.filter(x => {
        return x.gestione_donazioni.gg<diff
      })
    })
    
   // this.tasks.unshift(this.taskForm.value);
   // this.resetFormField();

  }

  filtra() {
    let string = '"';
    let fil = []
    this.localita_filtro = this.localita
    this.localita_filtro.filter(x => x.seleziona==true)
    .map(x => {
      let s = x.comune_domicilio.replace("'","'"+String.fromCharCode(92))
      fil.push(s)
    })
    fil.forEach(element => {
      string += element+'","'
    });
    string = string.slice(0,-2)
    console.log(string)
    return string
  }

  resetFormField() {
   // this.taskForm.controls.name.reset();
   // this.taskForm.controls.title.reset();
   // this.taskForm.controls.done.reset();
   // this.taskForm.controls.priority.reset();
   // this.taskForm.controls.due_date.reset();
   // this.taskForm.controls.note.reset();
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
  ngOnInit() {
    this.http.get(environment.apiUrl+'/elenco.php')
    .subscribe(response => {
      this.localita = response['comune_domicilio']
      this.anno = response['anno']
    })
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  record(item) {
    item.seleziona = !item.seleziona
    console.log(item)
  }

  classe_tabella() {
    let conta = 0
    let sangue = (this.taskForm.controls.sangue.value) ? 3 : 0
    let plt = (this.taskForm.controls.piastrine.value) ? 3 : 0
    let plasma = (this.taskForm.controls.plasma.value) ? 3 : 0
    let multicompionente = (this.taskForm.controls.multicomponente.value) ? 3 : 0
    let admo = (this.taskForm.controls.admo.value) ? 3 : 0
    conta = sangue+plt+plasma+multicompionente+admo
    console.log(conta)
  }

  masterToggle(event) {
    console.log(this.donatori)
    if(event.checked) {
      this.donatori = this.donatori.filter(x => x.seleziona==true)
    } else {
      this.donatori = this.donatori_filtro
    }
  }

  masterToggleLoc(event) {
    
    if(event.checked) {
     this.localita.map(x => x.seleziona=true)
    } else {
    this.localita.map(x => x.seleziona=false)
    }
    console.log(this.localita)
  }

  apriNote(donatore) {
    donatore.campo = 'nota_generica'
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      width: '640px',
      disableClose: true,
      data: donatore
    })
    dialogRef.afterClosed().subscribe(
      data => {
        const note = JSON.parse(localStorage.getItem('note_generiche'))
        this.donatori.find(x => x.id==note.id).note_generiche = note.note
        localStorage.removeItem('note_generiche')
        console.log(note)
       
      }
  ) 
  }

  apriNoteS(donatore) {
    donatore.campo = 'nota_salute'
    const dialogRef = this.dialog.open(DialogNoteComponent, {
      width: '640px',
      disableClose: true,
      data: donatore
    })
    dialogRef.afterClosed().subscribe(
      data => {
        const note = JSON.parse(localStorage.getItem('note_generiche'))
        this.donatori.find(x => x.id==note.id).note_relative_alla_salute = note.note
        localStorage.removeItem('note_generiche')
        console.log(note)
       
      }
  ) 
  }

scarica() {
  const csvData =  this.objecToCsv(this.donatori)
  this.download(csvData)
}

  download = function(data) {
   // console.log('-->',data)
    const blob = new Blob([data],{type:'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.setAttribute('hidden','');
    a.setAttribute('href',url);
    a.setAttribute('download','elenco.csv');
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    }
    
    objecToCsv(data) {
      const csvRows = []
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(','))
    
    for(const row of data) {
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g,'\\"')
        return `"${escaped}"`
      })
      csvRows.push(values.join(","))
    }
    return csvRows.join('\n')
    
    }  

    cambio_filtro(event) {
      console.log(event.value)
      switch(event.value) { 
        case 'Compleanno': { 
          this.cerca_note = false 
          this.cerca_gruppo = false
          this.cerca_piastrine = false
          this.nascondi_citta = false
          this.cerca_tessera = false
          this.cerca_compleanno = true
          this.cerca_cognome = false
          break; 
       } 
        case 'Località': { 
          this.cerca_note = false 
          this.cerca_gruppo = false
          this.cerca_piastrine = false
          this.nascondi_citta = true
          this.cerca_tessera = false
          this.cerca_compleanno = false
          this.cerca_cognome = false
          break; 
       } 
        case 'Note': { 
           this.cerca_note = true 
           this.cerca_gruppo = false
           this.cerca_piastrine = false
           this.nascondi_citta = false
           this.cerca_tessera = false
           this.cerca_compleanno = false
           this.cerca_cognome = false
           break; 
        } 
        case 'Gruppo': { 
          this.cerca_note = false 
          this.cerca_gruppo = true
          this.cerca_piastrine = false 
          this.nascondi_citta = false
          this.cerca_tessera = false
          this.cerca_compleanno = false
          this.cerca_cognome = false
           break; 
        } 
        case 'Piastrine': { 
          this.cerca_note = false 
          this.cerca_gruppo = false
          this.cerca_piastrine = true  
          this.nascondi_citta = false
          this.cerca_tessera = false
          this.cerca_compleanno = false
          this.cerca_cognome = false
          break; 
       } 
        case 'Numero tessera': { 
          this.cerca_note = false 
          this.cerca_gruppo = false
          this.cerca_piastrine = false  
          this.nascondi_citta = false
          this.cerca_tessera = true
          this.cerca_compleanno = false
          this.cerca_cognome = false
          break; 
      } 
      case 'Cognome': { 
        this.cerca_note = false 
        this.cerca_gruppo = false
        this.cerca_piastrine = false  
        this.nascondi_citta = false
        this.cerca_tessera = false
        this.cerca_compleanno = false
        this.cerca_cognome = true
        break; 
      }  
        case 'Tutti': { 
          this.cerca_note = false 
          this.cerca_gruppo = false
          this.cerca_piastrine = false  
          this.nascondi_citta = false
          this.cerca_tessera = false
          this.cerca_compleanno = false
          break; 
      } 
        default: { 
           //statements; 
           break; 
        } 
     } 
    }

    someFunc(nav:any): void {
      this.spinnerButtonOptions.active = true;
      switch(this.taskForm.controls.filtri_personalizzati.value) { 
        case 'Compleanno': {
          const url = '/filtro_compleanno.php'
          this.saveTask(nav,url)
          break; 
       }
       case 'Località': {
        const url = '/filtro_donatori.php'
        this.saveTask(nav,url)
        break; 
     } 
        case 'Note': {
          const url = '/filtro_note.php' 
          this.saveTask(nav,url)
           break; 
        } 
        case 'Gruppo': { 
          const url = '/filtro_gruppo.php' 
          this.saveTask(nav,url)
           break; 
        } 
        case 'Piastrine': { 
          const url = '/filtro_piastrine.php' 
          this.saveTask(nav,url)
          break; 
       } 
        case 'Numero tessera': { 
          const url = '/filtro_tessera.php' 
          this.saveTask(nav,url)
          break; 
      }
      case 'Cognome': { 
        const url = '/filtro_cognome.php' 
        this.saveTask(nav,url)
        break; 
    } 
        case 'Tutti': { 
          const url = '/filtro_tutti.php' 
          this.saveTask(nav,url)
          break; 
      } 
      case 'Inidoneo': { 
        const url = '/filtro_inidoneo.php' 
        this.saveTask(nav,url)
        break; 
    } 

    case 'Deceduto': { 
      const url = '/filtro_deceduto.php' 
      this.saveTask(nav,url)
      break; 
  } 

  case 'Ex Donatore': { 
    const url = '/filtro_ex_donatore.php' 
    this.saveTask(nav,url)
    break; 
} 

case 'Plasma': { 
  const url = '/filtro_plasma.php' 
  this.saveTask(nav,url)
  break; 
} 
        default: { 
           //statements; 
           break; 
        } 
     } 
      
    }

} // fine classe
