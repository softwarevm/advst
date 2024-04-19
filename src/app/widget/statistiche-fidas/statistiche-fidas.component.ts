import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment'
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
  selector: 'app-statistiche-fidas',
  templateUrl: './statistiche-fidas.component.html',
  styleUrls: ['./statistiche-fidas.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class StatisticheFidasComponent implements OnInit {
  fidas:any = []
  TG:any = []
  da =  new Date()
  a = new Date()
  constructor(
    private http: HttpClient
  ) {}


  // TODO end
  ngOnInit() {
    let donazioni = []
    const dal = moment().add(-730,'days').format('YYYY-MM-DD')
    const al = moment().format('YYYY-MM-DD')
    this.http.post<any>(environment.apiUrl+"/statistiche/fidas.php",JSON.stringify({start:dal,end:al}))
    .subscribe(result => {
      this.TG = result['totali_giovani']
      result['fidas'].forEach(element => {
        const i =  donazioni.findIndex(x => x===element)
        i===-1 ? donazioni.push(element) : ''
       })
    })
    setTimeout(() => {
      this.fidas = donazioni
    },100)
  }

  ncda(sesso:string) {
    return this.fidas.filter(x => x.sesso.toUpperCase()===sesso).length
  }

  _18_35_(sesso:string,da:number,a:number) {
    if(sesso) {
      return this.fidas.filter(x => {return x.eta*1>=da && x.eta*1<=a && x.sesso.toUpperCase()===sesso}).length
    } else {
      return this.fidas.filter(x => {return x.eta*1>=da && x.eta*1<=a}).length
    }
  }

  over(sesso:string,over:number) {
    if(sesso) {
      return this.fidas.filter(x => {return x.eta*1>=over && x.sesso.toUpperCase()===sesso}).length
    } else {
      return this.fidas.filter(x => {return x.eta*1>=over}).length
    }
  }

  totG(sesso:string) {
      return this.TG.filter(x => {return x.sesso.toUpperCase()===sesso}).length
  }

  cerca() {
    console.log(moment(this.da).format('DD/MM/YYYY'))
    let donazioni = []
    const dal = moment(this.da).format('YYYY-MM-DD')
    const al = moment(this.a).format('YYYY-MM-DD')
    this.http.post<any>(environment.apiUrl+"/statistiche/fidas.php",JSON.stringify({start:dal,end:al}))
    .subscribe(result => {
      this.TG = result['totali_giovani']
      result['fidas'].forEach(element => {
        const i =  donazioni.findIndex(x => x===element)
        i===-1 ? donazioni.push(element) : ''
       })
    })
    setTimeout(() => {
      this.fidas = donazioni
    },100)
  }
  
  
}
