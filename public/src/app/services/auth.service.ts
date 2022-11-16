import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { AuthResponseData } from './../models/AuthResponseData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { autoLogout } from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      "http://localhost:5000/api/v1/auth/login",
      { email, password }
      // { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string, repassword: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      "http://localhost:5000/api/v1/auth/register",
      { email, password, repassword }
    );
  }


  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message: string) {
  // getErrorMessage(error: { error: string, code: number, email: string }) {
    switch(message) {
      case "Usuario o contrasena incorrecto/a !!!": {
        return "Email o password incorrecto";
      }

      case "El usuario ya existe !!!": {
        return "Usuario ya registrado";
      }

      case "Error: No coinciden las contrasenas": {
        return "El valor del campo password no coincide con el valor del campo repassword";
      }

      // Esta validacion no es necesaria gracias a la validacion en el front
      case "Error: No se ha repetido la contrasena": {
        return "El valor repassword esta vacio y es obligatorio";
      }

      case "Error: El usuario no existe !!!": {
        return "Usuario no encontrado"
      }

      // Esta validacion no es necesaria gracias a la validacion en el front
      case "Ingrese un email valido": {
        return "El email introducido no es valido";
      }

      default: {
        return "Ha habido algun error: " + message;
      }
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      //logout functionality or get the refresh token
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}