import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from './../state/auth.actions';
import { setLoadingSpinner } from '../../store/Shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    // document.addEventListener("DOMContentLoaded", async (e) => {
    //   try {
        
    //     const resToken = await fetch("/api/v1/auth/refresh", {
    //                   method: "GET",
    //                   credentials: "include"
    //               });

    //               const { token } = await resToken.json();

    //     const res = await fetch("/api/v1/auth/protected", {
    //                   method: "GET",
    //                   headers: {
    //                       "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}` // en el caso de usar cookies, tenemos que comentar esta opcion, y agregar la propiedad "credentials: 'include' en el fetch --> tampoco guardariamos el token en la variable 'token' arriba, justo antes del fetch
    //       },
    //       // credentials: 'include' // para el caso de que guardemos el token en cookies, aunque no podamos acceder a las cookies, con esta opcion se le indica que las envie igualmente
    //     });
        
    //     if(res.ok) {						
    //       const outcome = await res.json();						
    //       const app = document.querySelector("#app").textContent = `Email: ${outcome.user}`;
    //     }
    //   } catch(err) {
    //     console.log(err);
    //   }
    // });
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }

}
