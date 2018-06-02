import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  UserData = {
  }
  collectionneur

  constructor(private _auth: AuthService,
    private _router: Router,
    public http: HttpClient) { }

  ngOnInit() {
  }

  modifUser() {

    let id = localStorage.getItem('id');
    let body = {
      "UserData": this.UserData,
      "user_id": id
    }

    this._auth.modifUser(body)
      .subscribe(
      res => {
        this._router.navigate(['/collection'])
        console.log(res)
      },
      err => console.log(err)
      )

  }

  deleteUser() {
    let id = localStorage.getItem('id');

    this.http.delete<any>("http://localhost:3000/api/profil/" + id)
      .subscribe(
      res => localStorage.removeItem('id'),
      err => console.log(err)
      )
    localStorage.removeItem('id')
    this._router.navigate(['/login'])
  }
}