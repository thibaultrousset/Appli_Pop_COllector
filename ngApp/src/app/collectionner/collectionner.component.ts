import { Component, OnInit } from '@angular/core';

// I get the http modules to use my http requests
import { HttpClient, HttpParams } from '@angular/common/http';

// I use the router module to navigate in the response
import { Router } from '@angular/router';


// the figure service has all my http requests
import { FiguresService } from '../figures.service';


@Component({
  selector: 'app-collectionner',
  templateUrl: './collectionner.component.html',
  styleUrls: ['./collectionner.component.css']
})
export class CollectionnerComponent implements OnInit {

  // array  that will get back the response of the get request. I will display it with an ngFor in the html
  collec = [];

  univers = 'All';

  // array of all items to be paged
     allItems=[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems=[];

  body = {
    'figure': '',
    'id': '',
    'collec': ''
  };
  // default value of the univers filter


  // I can use the  the imports in my methodes
  constructor(private http: HttpClient,
    private _figuresService: FiguresService,
    private _router: Router) {
  }


  // On the init of the page I get the collection of the user connected
  ngOnInit() {
    const univers = this.univers;
    // get the id of local storage wich is the id of connected user
    const id = localStorage.getItem('id');
    // use the figure service and call the 'getCollec' function tha send a get http request with id in parameter
    this._figuresService.getCollec(id,univers)
      .subscribe(
        // put in the collec array the response wich is all the figures of the user connected
        res => this.collec = res,
        err => console.log(err)
      );
  }

  getCollec(event){
    const univers = event.target.id;
    const id = localStorage.getItem('id');

    this._figuresService.getCollec(id,univers)
      .subscribe(
        data => {
                // set items to json response
                this.collec = data;
 
                // initialize to page 1
                
            },
        err => console.log(err)
      );
  }

  


  // on the click of the button I remove the figure from the user collection
  removeFigure(figure) {
    const id = localStorage.getItem('id');
    this.body.id = id;
    this.body.figure = figure;
    this._figuresService.removeFigure(this.body)
      .subscribe(
        res => {
          this.collec = res,
          this._router.navigate(['/figures']);
        },
        err => console.log('err')
      );
  }
}
