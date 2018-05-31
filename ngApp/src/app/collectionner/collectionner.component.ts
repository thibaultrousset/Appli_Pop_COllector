import { Component, OnInit } from '@angular/core';
import { FiguresComponent } from "../figures/figures.component";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FiguresService } from "../figures.service";

@Component({
  selector: 'app-collectionner',
  templateUrl: './collectionner.component.html',
  styleUrls: ['./collectionner.component.css']
})
export class CollectionnerComponent implements OnInit {

  collec = [];
  

  constructor(private http: HttpClient,
              private _figuresService: FiguresService,
              private _router: Router) { 
              }
  
  ngOnInit() {
    
    let collec = localStorage.getItem('collec')
    let id=localStorage.getItem('id')
   
    this._figuresService.getCollec(id)
    .subscribe(
      res=> this.collec = res,
      err => console.log(err) 
    )}

    removeFigure (figure){
      let id=localStorage.getItem('id')
      this._figuresService.removeFigure(figure,id)
      .subscribe(
        res=>{this.collec = res,
          this._router.navigate(['/figures'])},
        err=>console.log("err")
      )
    }
    }