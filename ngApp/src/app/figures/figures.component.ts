import { Component, OnInit } from '@angular/core';
import { FiguresService } from "../figures.service";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-figures',
  templateUrl: './figures.component.html',
  styleUrls: ['./figures.component.css']
})
export class FiguresComponent implements OnInit {

  figures = [];
  collec= [];
  univers = "All"
  constructor(private _auth: AuthService,
              private _figuresService: FiguresService) {
             }

  ngOnInit() {
    let univers = this.univers
    this._figuresService.getFigures(this.univers)
    .subscribe(
      res=> this.figures = res,
      err => console.log(err) 
    )
  }

  getFigures(event){
    let univers = event.target.id;
    
    this._figuresService.getFigures(univers)
    .subscribe(
      res=> this.figures = res,
      err => console.log(err) 
    )
  }

  addFigure (figure){
    let id=localStorage.getItem('id')
    this._figuresService.addFigure(figure,id)
    .subscribe(
      res=>this.collec = res,
      err=>console.log("err")
    )
  }

  
}
