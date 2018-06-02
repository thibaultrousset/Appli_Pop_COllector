import { Component, OnInit } from '@angular/core';
import { FiguresService } from "../figures.service";
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-figures',
  templateUrl: './my-figures.component.html',
  styleUrls: ['./my-figures.component.css']
})
export class MyFiguresComponent implements OnInit {

  loginUserData = {}
  figures = [];
  collec = [];
  univers = "All"
  body = {
    "figure": "",
    "id": ""
  }
  constructor(private _auth: AuthService, private _figuresService: FiguresService, private _router: Router) {

  }

  ngOnInit() {
    let id = localStorage.getItem('id')
    this._figuresService.getMyFigures(id)
      .subscribe(
      res => this.figures = res,
      err => console.log(err)
      )
  }

  getFigureName(figure) {

    localStorage.setItem("figure_name", figure);
  }

  deleteFigure(figure) {
    let id = localStorage.getItem('id');
    this._figuresService.deleteFigure(figure, id)
      .subscribe(
      res => { this._router.navigate(['/figures']) },
      err => console.log(err)
      )
  }

  removeMyFigure(figure) {
    let id = localStorage.getItem('id')
    this.body.id = id;
    this.body.figure = figure;
    this._figuresService.removeMyFigure(this.body)
      .subscribe(
      res => this._router.navigate(['/figures']),
      err => console.log("err")
      )
  }

}
