import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()

export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register/";
  private _loginUrl = "http://localhost:3000/api/login/";
  private _profilUrl = "http://localhost:3000/api/profil/";




  constructor(private http: HttpClient,
    private _router: Router) {
  }


  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)

  }

  loginUser(user) {

    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('id')//!! asks true or false answer
  }

  logoutUser() {
    localStorage.removeItem('id')
    localStorage.removeItem('collec')
    this._router.navigate(['/figures'])
  }

  modifUser(user) {
    return this.http.post<any>(this._profilUrl, user)
  }

  deleteUser(id) {
    console.log(localStorage.getItem('id'));
    return this.http.delete<any>(this._profilUrl + id)
  }
}
