import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable()
export class FiguresService {

  private _figuresUrl = 'http://localhost:3000/api/figures';
  private _collectionUrl = 'http://localhost:3000/api/collection';
  private _wishListUrl = 'http://localhost:3000/api/wish-list';
  private _newFigureUrl = 'http://localhost:3000/api/newFigure';
  private _myFiguresUrl = 'http://localhost:3000/api/myFigures';
  private _updateFigureUrl = 'http://localhost:3000/api/updateFigure';


  constructor(private http: HttpClient) {
  }

  // get httprequest that send the user id and a figures univers to database on figures url
  getFigures(univers) {
    return this.http.get<any>(this._figuresUrl + '/' + univers);
  }


  // post httprequest that send the user id and  figure name to database on figures url
  addFigure(body) {
    return this.http.post<any>(this._figuresUrl, body);
  }

    // post httprequest that send the user id and  figure name to database on figures url
   addFigureWish(body) {
    return this.http.post<any>(this._figuresUrl, body);
  }

  addFigure2(body) {
    return this.http.post<any>(this._wishListUrl, body);
  }



  // get httprequest that send the user id to database on collection url
  getCollec(id,univers) {
    return this.http.get<any>(this._collectionUrl + '/' + id+'/'+univers);
  }

   // get httprequest that send the user id to database on wish-list url
   getWishList(id) {
    return this.http.get<any>(this._wishListUrl + '/' + id);
  }


  // put httprequest that send the user id and a figure name to database on collection url
  removeFigure(body) {
    return this.http.put<any>(this._collectionUrl, body);
  }

  removeFigureWish(body) {
    return this.http.put<any>(this._wishListUrl, body);
  }


  // post httprequest that send the user id and  figures data univers to database on new figures url
  newFigure(figureData) {
    return this.http.post<any>(this._newFigureUrl, figureData);
  }


  // put httprequest that send the user id and a figure name to database on my figures url
  removeMyFigure(body) {
    return this.http.put<any>(this._myFiguresUrl, body);
  }


  // get httprequest that send the user id to database on my figures url
  getMyFigures(id) {
    return this.http.get<any>(this._myFiguresUrl + '/' + id);
  }


  // post httprequest that send the user id and  figures datas to database on update figure url
  updateFigure(body) {
    return this.http.post<any>(this._updateFigureUrl, body);
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
 
        // ensure current page isn't out of range
        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
         
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
 
            
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
