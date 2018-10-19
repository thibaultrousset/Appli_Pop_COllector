import { Component, OnInit } from '@angular/core';

// I get the http modules to use my http requests
import { HttpClient, HttpParams } from '@angular/common/http';

// I use the router module to navigate in the response
import { Router } from '@angular/router';


// the figure service has all my http requests
import { FiguresService } from '../figures.service';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  // array  that will get back the response of the get request. I will display it with an ngFor in the html
  collec = [];

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
    // get the id of local storage wich is the id of connected user
    const id = localStorage.getItem('id');
    // use the figure service and call the 'getCollec' function tha send a get http request with id in parameter
    this._figuresService.getWishList(id)
      .subscribe(
        // put in the collec array the response wich is all the figures of the user connected
        res => this.collec = res,
        err => console.log(err)
      );
  }


  // on the click of the button I remove the figure from the user collection
  removeFigureWish(figure) {
    const id = localStorage.getItem('id');
    this.body.id = id;
    this.body.figure = figure;
    this._figuresService.removeFigureWish(this.body)
      .subscribe(
        res => {
          this.collec = res;
            // go to the figures page if the figure is removed from the collection
            this._router.navigate(['/figures']);
        },
        err => console.log('err')
      );
  }

  addFigure2(figure) {
    const id = localStorage.getItem('id');
    this.body.id = id;
    this.body.figure = figure;
    this.body.collec = 'collec';
    this._figuresService.addFigure2(this.body)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }
}
