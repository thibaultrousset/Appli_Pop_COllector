import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()

export class AuthService {

  // i set the url on wich I will cal the http requests
  private _registerUrl = "http://localhost:3000/api/register/";
  private _loginUrl = "http://localhost:3000/api/login/";
  private _profilUrl = "http://localhost:3000/api/profil/";




  constructor(private http: HttpClient,
    private _router: Router) {
  }

  // post httprequest that send the user datas to database on register url
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)

  }

  // post httprequest that send the user datas to database on login url
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  // function that check if there is an id in local storage
  loggedIn() {
    return !!localStorage.getItem('id')//!! asks true or false answer
  }


  // function that remove the local storage items and open the figures page
  logoutUser() {
    localStorage.removeItem('id')
    localStorage.removeItem('figure_name')
    this._router.navigate(['/figures'])
  }

  // post httprequest that send the new user datas to database on profil url
  modifUser(user) {
    return this.http.post<any>(this._profilUrl, user)
  }


  // delete httprequest thats send the user id to database on profil url
  deleteUser(id) {
    console.log(localStorage.getItem('id'));
    return this.http.delete<any>(this._profilUrl + id)
  }
}
