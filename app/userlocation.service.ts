import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserlocationService {

  _url="http://ip-api.com/json";
  constructor(private _http: HttpClient) { }


  get_location(){
    // return this._http.post<any>(this._url,code);
    return this._http.get<any>(this._url);

  }
}
