import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiguresService } from '../figures.service';

@Component({
  selector: 'app-update-figure',
  templateUrl: './update-figure.component.html',
  styleUrls: ['./update-figure.component.css']
})
export class UpdateFigureComponent implements OnInit {


  // object that will get the html data
  // is set the figure name empty
  figureData = {
    'figure_name': ''
  };

  // the univers available in the select
  univers = ['Disney', 'Marvel', 'Lord of the rings'];

  constructor(private _figuresService: FiguresService,
    private _router: Router) { }

  ngOnInit() {
  }

  // send the new data to update the figure I clicked on
  updateFigure() {
    // get the figure name i set in local storage
    const figure_name = localStorage.getItem('figure_name');
    this.figureData.figure_name = figure_name;
    this._figuresService.updateFigure(this.figureData)
      .subscribe(
      res => {
        console.log(res),
        this._router.navigate(['/myFigures']);
      },
      err => console.log(err)
      );
  }

}
