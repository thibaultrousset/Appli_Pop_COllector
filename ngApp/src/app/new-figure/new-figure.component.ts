import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FiguresService } from '../figures.service';

@Component({
  selector: 'app-new-figure',
  templateUrl: './new-figure.component.html',
  styleUrls: ['./new-figure.component.css']
})
export class NewFigureComponent implements OnInit {

  constructor(private _figuresService: FiguresService,
    private _router: Router) { }

  // the object with the data I will send to database to create a new figure
  // i set an empty parameter tha doesn't exist in the form of the html
  figureData = {
    'creator': ''
  };

  // the univers available in the select
  univers = ['Disney', 'Marvel', 'Lord of the rings'];


  // new figures doesn't belong to connected user but to its creator.
  newFigure() {
    const creator = localStorage.getItem('id');
    this.figureData.creator = creator;
    this._figuresService.newFigure(this.figureData)
      .subscribe(
      res => {
        this._router.navigate(['/figures']);
        console.log(res);
      },
      err => console.log(err)
      );
  }


  ngOnInit() {
  }

}
