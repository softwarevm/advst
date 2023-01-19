import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.sass']
})
export class MaterialTableComponent implements OnInit {
  dati: any = []
  mese = ''
  anno_corrente: any = new Date().getFullYear() 
  anno = [this.anno_corrente*1,(this.anno_corrente*1)-1]
  mesi = [
    {mese:'Gennaio',valore:'01'},
    {mese:'Febbraio',valore:'02'},
    {mese:'Marzo',valore:'03'},
    {mese:'Aprile',valore:'04'},
    {mese:'Maggio',valore:'05'},
    {mese:'Giugno',valore:'06'},
    {mese:'Luglio',valore:'07'},
    {mese:'Agosto',valore:'08'},
    {mese:'Settembre',valore:'09'},
    {mese:'Ottobre',valore:'10'},
    {mese:'Novembre',valore:'11'},
    {mese:'Dicembre',valore:'12'},
  ]
  displayedColumns: string[] = ['Gruppo','Tessera', 'smart_donor','Nominativo', 'Sesso', 'Data_Donazione','Luogo_Donazione','Tipologia','Modo_Invio_Esami','Data_Invio_Esami','Tesserino','Note'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
  }
  constructor(
    private http: HttpClient,
    private dialog: MatDialog) { }
  ngOnInit() {
    
  }

  filtra() {
    console.log('sss',this.mese,this.anno_corrente)
    const mese = {mese:this.mese,anno:this.anno_corrente}
    this.http.post(environment.apiUrl+'/filtro_mensile.php',JSON.stringify(mese))
    .subscribe({
      next:(response) => {
      this.dati = response
      console.log(response)
      },
    error:(err) => {
      console.log(err)
    },
    complete:() => {
      this.dati.sort((a, b) => (a.data < b.data ? -1 : 1));
    }
    }
    )
  }

  apriModal(donatore) {
    localStorage.removeItem('note_donazione')
    console.log(donatore)
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '650px',
      disableClose: true,
      data: donatore
    })
    dialogRef.afterClosed().subscribe(
      data => {
        const n = JSON.parse(localStorage.getItem('note_donazione'))
        console.log('enne',n)
        let i = this.dati.filter(x => {
         return x.Tipologia == n.tipologia && x.id==n.id
        })
       i[0].modo_invio_esami = n.modo_invio_esami
       i[0].data_invio_esami = (n.data!='Invalid date') ? n.data : ''
       i[0].note = n.note
       i[0].nuovo_donatore = this.tesserino(n.tesserino,n.nuovo_donatore)
      }
  ) 
  }

  tesserino(valore,nuovo_donatore) {
    console.log('nuovo?',valore,nuovo_donatore)
    if(valore==true || valore=='Sì' ) {
      return 'Sì'
    }
    if(valore==false && nuovo_donatore=='') {
      return ''
    }
    if(nuovo_donatore==1) {
      return '1'
    }
  }

  scarica() {
    const csvData =  this.objecToCsv(this.dati)
    this.download(csvData)
  }
  
    download = function(data) {
      const nome = this.mesi.find(x => {
        return x.valore==this.mese
      })
     // console.log('-->',data)
      const blob = new Blob([data],{type:'text/csv'});
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.setAttribute('hidden','');
      a.setAttribute('href',url);
      a.setAttribute('download',nome.mese+'_'+this.anno_corrente+'.csv');
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

}
