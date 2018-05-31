import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  collectionneur = []

  constructor(private _auth: AuthService,
              private _router: Router) { 
              }

  ngOnInit() {
  }

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res=>{
        localStorage.setItem('id', res._id)
        localStorage.setItem('collec', res.Usercollection)
        this.collectionneur=res
        
        this._router.navigate(['/figures'])
        console.log(res)},
      err => console.log(err)
    )
    
  }

}