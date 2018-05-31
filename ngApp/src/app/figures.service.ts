import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders} from "@angular/common/http";


@Injectable()
export class FiguresService {

  private _figuresUrl = "http://localhost:3000/api/figures"
  private _collectionUrl = "http://localhost:3000/api/collection"
  private _newFigureUrl = "http://localhost:3000/api/newFigure"
  private _myFiguresUrl = "http://localhost:3000/api/myFigures"
  private _updateFigureUrl = "http://localhost:3000/api/updateFigure"
  figure : String
  
  constructor(private http: HttpClient) {
    
  }

  getFigures(univers){
    return this.http.get<any>(this._figuresUrl+'/'+univers)
  }

  getMyFigures(id){
    return this.http.get<any>(this._myFiguresUrl+'/'+id)
  }

  updateFigure(body){
    return this.http.post<any>(this._updateFigureUrl,body)
  }

  deleteFigure(figure, id){
    return this.http.delete<any>(this._myFiguresUrl+'/'+figure+'/'+id )
  }

  addFigure(figure,id){
    let body = {
      "figure": figure,
      "user_id": id
    }
    return this.http.post<any>(this._figuresUrl,body)
  }

  newFigure(figureData){
    return this.http.post<any>(this._newFigureUrl,figureData)
  }

  removeFigure(figure,id){
    let body = {
      "figure": figure,
      "user_id": id
    }
    return this.http.put<any>(this._collectionUrl,body)
  }

  removeMyFigure(body){
    
    return this.http.put<any>(this._myFiguresUrl,body)
  }

  getCollec(id){
   
    return this.http.get<any>(this._collectionUrl + '/' + id)
    
  }
}
