import { Component, OnInit } from '@angular/core';
import { FiguresService } from '../figures.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-figures',
  templateUrl: './my-figures.component.html',
  styleUrls: ['./my-figures.component.css']
})
export class MyFiguresComponent implements OnInit {

  figures = [];
  body = {
    'figure': '',
    'id': ''
  };
  constructor(private _figuresService: FiguresService,
    private _router: Router) {

  }

  ngOnInit() {
    const id = localStorage.getItem('id');
    this._figuresService.getMyFigures(id)
      .subscribe(
      res => this.figures = res,
      err => console.log(err)
      );
  }

  // get the name of the figures I clicked on
  // the nme will be used for the update form
  getFigureName(figure) {
    // put the figure name in the local storage
    localStorage.setItem('figure_name', figure);
  }

  // get the figure name i clicked on , delete it from the database and
  // remove it from the connected user collection if it is in it
  removeMyFigure(figure) {
    const id = localStorage.getItem('id');
    this.body.id = id;
    this.body.figure = figure;
    this._figuresService.removeMyFigure(this.body)
      .subscribe(
      res => this._router.navigate(['/figures']),
      err => console.log('err')
      );
  }

}
