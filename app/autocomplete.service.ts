import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  _url="/link_autocomplete";
  constructor(private _http: HttpClient) { }


  autoc(code:string){
    // return this._http.post<any>(this._url,code);
    return this._http.get<any>(this._url+'?zipcode='+code);

  }
}
