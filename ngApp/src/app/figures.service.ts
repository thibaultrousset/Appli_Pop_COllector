import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable()
export class FiguresService {

  private _figuresUrl = 'http://localhost:3000/api/figures';
  private _collectionUrl = 'http://localhost:3000/api/collection';
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


  // get httprequest that send the user id to database on collection url
  getCollec(id) {
    return this.http.get<any>(this._collectionUrl + '/' + id);
  }


  // put httprequest that send the user id and a figure name to database on collection url
  removeFigure(body) {
    return this.http.put<any>(this._collectionUrl, body);
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
}
