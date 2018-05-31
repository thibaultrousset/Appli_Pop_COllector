import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FiguresService } from "../figures.service";

@Component({
  selector: 'app-update-figure',
  templateUrl: './update-figure.component.html',
  styleUrls: ['./update-figure.component.css']
})
export class UpdateFigureComponent implements OnInit {

  figureData = {
    "figure_name": ""
  }

  constructor(private _figuresService: FiguresService,
    private _router: Router) { }

  ngOnInit() {
  }

  updateFigure(){
    let figure_name = localStorage.getItem("figure_name")
    this.figureData.figure_name = figure_name;
    this._figuresService.updateFigure(this.figureData)
    .subscribe(
      res => {console.log(res),
        this._router.navigate(['/myFigures'])},
      err => console.log(err)
    )
  }

}
