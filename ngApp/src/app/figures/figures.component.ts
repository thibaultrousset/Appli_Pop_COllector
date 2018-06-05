import { Component, OnInit } from '@angular/core';
import { FiguresService } from "../figures.service";



@Component({
  selector: 'app-figures',
  templateUrl: './figures.component.html',
  styleUrls: ['./figures.component.css']
})
export class FiguresComponent implements OnInit {


  // array tha will get back from response all the figures from database
  figures = [];

  // default value of the filter univers
  univers = "All"

  constructor(private _figuresService: FiguresService) {
  }


  // On the init of the page I get all the figures of database
  ngOnInit() {
    let univers = this.univers
    this._figuresService.getFigures(this.univers)
      .subscribe(
      res => this.figures = res,
      err => console.log(err)
      )
  }

  body = {
    "figure": "",
    "id": ""
  }

  // on click of filter button I get all figures of this univers
  getFigures(event) {
    // get id of pressed button
    let univers = event.target.id;

    this._figuresService.getFigures(univers)
      .subscribe(
      res => this.figures = res,
      err => console.log(err)
      )
  }


  //On click of the button I select the figure clicked and add it to user connected collection
  addFigure(figure) {
    let id = localStorage.getItem('id');
    this.body.id = id;
    this.body.figure = figure;
    this._figuresService.addFigure(this.body)
      .subscribe(
      res => console.log(res),
      err => console.log("err")
      )
  }


}
