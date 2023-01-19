import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  url: string = 'https://advst.softwarevm.online/api'
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    let cre
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Username e Password non valide !';
      return;
    } else {
      const credenziali = {username: this.f.username.value, password:this.f.password.value}
      this.http.post(this.url+'/accesso.php',JSON.stringify(credenziali))
      .subscribe(x => {
        cre = x
        console.log(cre)
        
        if(x[0] && x[0].username == this.f.username.value && x[0].password == this.f.password.value ) {
          localStorage.setItem('STATE', 'true');
          this.router.navigate(['/dashboard/main']);
        } else {
          this.error = 'Credenziali errate!';
        }
      },null,() => {
        const s = {attivazione:cre[0].data_attivazione,scadenza:cre[0].data_scadenza,gg:cre[0].giorni_scadenza}
        console.log(s)
        localStorage.setItem('attivazione',JSON.stringify(s))
      })
    }
  }
}
