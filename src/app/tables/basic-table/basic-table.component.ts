import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {
  tipi_donazione: any = []
  luogo_raccolta: any = []
  anno: any = (localStorage.getItem('anno')) ? localStorage.getItem('anno') : new Date().getFullYear()
  tipi:any = {
    SI_ST:0,
    Aferesi_ST:0,
    Autoemoteca:0
  }
  luogo: any = {
    Uomini_ST:0,
    Donne_ST:0,
    Uomini_A:0,
    Donne_A:0
  }
  riepilogo_fasce:any = []
  riepilogo_fasce_anno_corrente:any = []
  riepilogo_donatori: any = []
  constructor(private http: HttpClient) { }
  ngOnInit() {
    console.log(this.anno)
    const anno = {anno:this.anno}
    let tipi = {
      SI_ST:0,
      Aferesi_ST:0,
      Autoemoteca:0
    }
    this.http.post(environment.apiUrl+'/statistiche/tipi_donazione.php',JSON.stringify(anno))
    .subscribe({
      next:response => {
      console.log(response)
      this.tipi_donazione = response['tipi_donazione']
    },
  error:null,
complete:() => {
  this.tipi_donazione.forEach(element => {
    tipi.SI_ST += element.SI_ST*1
    tipi.Aferesi_ST += element.Aferesi_ST*1
    tipi.Autoemoteca += element.Autoemoteca*1
  });
  this.tipi = tipi
}})


let luogo = {
  Uomini_ST:0,
  Donne_ST:0,
  Uomini_A:0,
  Donne_A:0
}
    this.http.post(environment.apiUrl+'/statistiche/luogo_raccolta.php',JSON.stringify(anno))
    .subscribe({next:response => {
      console.log(response)
      this.luogo_raccolta = response['luogo_raccolta']
    },
  error:null,
  complete:() => {
    this.luogo_raccolta.forEach(element => {
      luogo.Uomini_ST += element.Uomini_ST*1
      luogo.Donne_ST += element.Donne_ST*1
      luogo.Uomini_A += element.Uomini_A*1
      luogo.Donne_A += element.Donne_A*1
    });
    this.luogo = luogo
  }
  })

  this.http.post(environment.apiUrl+'/statistiche/riepilogo.php',JSON.stringify(anno))
  .subscribe(
    response => {
      console.log(response)
      this.riepilogo_fasce = response['riepilogo_fasce'][0]
      this.riepilogo_donatori = response['riepilogo_donatori'][0]
      this.riepilogo_fasce_anno_corrente = response['riepilogo_fasce_anno_corrente'][0]
    console.log(response)})

   }

   classe(valore) {
     console.log(valore)
     return 'width-per-'+valore
   }
}
