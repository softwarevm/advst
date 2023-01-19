import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-nuovo-donatore',
  templateUrl: './nuovo-donatore.component.html',
  styleUrls: ['./nuovo-donatore.component.sass']
})
export class NuovoDonatoreComponent implements OnInit {

  tipi_donazione: any = []
  luogo_raccolta: any = []
  fasce_eta:any = []
  totali_raccolta:any = {
    Uomini_ST:0,
    Donne_ST:0,
    Uomini_A:0,
    Donne_A:0
  }
  totali_fasce:any = {
    '18_28':0,
    '29_38':0,
    '39_48':0,
    '49_58':0,
    '59_69':0,
    '70':0
  }
  anno: any = (localStorage.getItem('anno')) ? localStorage.getItem('anno') : new Date().getFullYear()
  constructor(private http: HttpClient) { }
  ngOnInit() {
    const anno = {anno:this.anno}


    this.http.post(environment.apiUrl+'/statistiche/nuovo_donatore.php',JSON.stringify(anno))
    .subscribe({
      next:response => {
      this.luogo_raccolta = response['nuovi_donatori']
    },
    error:null,
    complete:() => {
      let totali_raccolta = {
        'Uomini_ST':0,
        'Donne_ST':0,
        'Uomini_A':0,
        'Donne_A':0
      }
      this.luogo_raccolta.forEach((element) => {
        console.log(element.Uomini_ST)
        totali_raccolta.Uomini_ST += element.Uomini_ST*1
        totali_raccolta.Donne_ST += element.Donne_ST*1
        totali_raccolta.Uomini_A += element.Uomini_A*1
        totali_raccolta.Donne_A += element.Donne_A*1
      });
      this.totali_raccolta =totali_raccolta
    }
  })

    this.http.post(environment.apiUrl+'/statistiche/fasce_di_eta.php',JSON.stringify(anno))
    .subscribe({
      next:response => {
      console.log(response)
      this.fasce_eta = response['fasce_eta']
    },
    error:null,
    complete:() => {
      let tot_fasce = {
        '18_28':0,
        '29_38':0,
        '39_48':0,
        '49_58':0,
        '59_69':0,
        '70':0
      }
      this.fasce_eta.forEach((element) => { 
        console.log(element)
        tot_fasce['18_28'] += element['eta_18_28']*1
        tot_fasce['29_38'] += element['eta_29_38']*1
        tot_fasce['39_48'] += element['eta_39_48']*1
        tot_fasce['49_58'] += element['eta_49_58']*1
        tot_fasce['59_69'] += element['eta_59_69']*1
        tot_fasce['70'] += element['eta_70']*1
      })
      this.totali_fasce = tot_fasce
    }
  })

   }

}
