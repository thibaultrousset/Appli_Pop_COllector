import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { FiguresService } from "../figures.service";

@Component({
  selector: 'app-new-figure',
  templateUrl: './new-figure.component.html',
  styleUrls: ['./new-figure.component.css']
})
export class NewFigureComponent implements OnInit {

  constructor(private _auth: AuthService, private _figuresService: FiguresService,
    private _router: Router) { }
  figureData = {
    "creator": ""
  }

  univers = ["Disney", "Marvel", "Lord of the rings"];

  newFigure() {
    let creator = localStorage.getItem('id')
    this.figureData.creator = creator;
    this._figuresService.newFigure(this.figureData)
      .subscribe(
      res => {
        this._router.navigate(['/figures'])
        console.log(res)
      },
      err => console.log(err)
      )

  }


  ngOnInit() {
  }

}
