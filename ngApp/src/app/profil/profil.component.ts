import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

// object will get the values set in the html
// id isn't set in the html so I create it before
  UserData = {
    'id': ''
  };

  constructor(private _auth: AuthService,
    private _router: Router,
    public http: HttpClient) { }

  ngOnInit() {
  }

  // send new data to update the connected user datas
  modifUser() {
    const id = localStorage.getItem('id');
    this.UserData.id = id;
    this._auth.modifUser(this.UserData)
      .subscribe(
      res => {
        this._router.navigate(['/collection']);
        console.log(res);
      },
      err => console.log(err)
      );

  }

  // remove the user from data base
  deleteUser() {
    const id = localStorage.getItem('id');

    this.http.delete<any>('http://localhost:3000/api/profil/' + id)
      .subscribe(
      res => localStorage.removeItem('id'),
      err => console.log(err)
      );
    localStorage.removeItem('id');
    this._router.navigate(['/login']);
  }
}
