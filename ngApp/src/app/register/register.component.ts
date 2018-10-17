import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

// object will get the values set in the html
  registerUserData = {};

  constructor(private _auth: AuthService,
    private _router: Router) {

  }

  ngOnInit() {
  }

  // send the datas of the html to create a new user
  // sendback the user id
  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
      res => {
        localStorage.setItem('id', res._id);
        this._router.navigate(['/figures']);
        console.log(res);
      },

      err => console.log(err)
      );
  }
}
