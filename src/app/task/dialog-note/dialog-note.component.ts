import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.sass']
})
export class DialogNoteComponent implements OnInit {
  public addCusForm: FormGroup;
  dati_donatore:any
  constructor( 
    private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dati_donatore = this.data
    this.addCusForm = this.fb.group({
      id: this.data.id,
      cognome: [this.data.cognome],
      tessera: [this.data.tessera],
      note: [this.data.note_generiche],
      note_salute: [this.data.note_relative_alla_salute],
    });
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  onSubmitClick() {
    console.log('salvo...',this.addCusForm.get('id').value)
      const db = {
      campo: (this.dati_donatore.campo=='nota_generica') ? 'note_generiche' : 'note_relative_alla_salute',
      valore: (this.dati_donatore.campo=='nota_generica') ? this.addCusForm.get('note').value : this.addCusForm.get('note_salute').value,
      tessera: this.addCusForm.get('tessera').value
    }
    this.http.post(environment.apiUrl+'/aggiorna_campo.php',JSON.stringify(db))
    .subscribe(response => {
    },null,() => {
      let note
      if(this.dati_donatore.campo=='nota_generica') {
        note = {note:this.addCusForm.get('note').value,id:this.addCusForm.get('id').value}
      } else if(this.dati_donatore.campo=='nota_salute') {
        note = {note:this.addCusForm.get('note_salute').value,id:this.addCusForm.get('id').value}
      }
      
      localStorage.setItem('note_generiche',JSON.stringify(note))
      this.showNotification(
        'snackbar-info',
        'Note aggiornate!',
        'top',
        'center'
      );
      this.closeDialog()
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
  // aggiorna(campo,valore,firsta) {
  //   const db = {
  //     campo:campo,
  //     valore:valore,
  //     tessera: firsta
  //   }
  //   this.http.post(this.url+'/aggiorna_campo.php',JSON.stringify(db))
  //   .subscribe(response => {
  //   },null,() => {
  //     console.log(valore)
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Il database è stato aggiornato!',
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   })
    
  // }

}
