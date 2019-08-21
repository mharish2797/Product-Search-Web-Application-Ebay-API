import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllItemsService {

  local=""
  constructor(private _http: HttpClient) { }

  get_all_items(items:object){
    var _url=this.local+"/link_all_items?";
    var link="";
    for (let [key, value] of Object.entries(items)) { 
      if(key!='zip'){
        if(key=='condition'||key=='shipping'){
          for (let [k,v] of Object.entries(value)){
            link+=k+'='+v+'&';
          }
        }
        else{
          link+=key+'='+encodeURI(value)+'&';
        }
      } 
     
    }
    link=link.slice(0,-1);
    // console.log(link);
    return this._http.get<any>(_url+link);

  }


  get_single_item(item_id:number){
    var _url_single_item=this.local+"/link_single_item?";
    return this._http.get<any>(_url_single_item+"item_id="+item_id);

  }

  get_photo_item(item_title:string){
    var _url_photo=this.local+"/link_photos?";
    return this._http.get<any>(_url_photo+"item_id="+item_title);

  }

  get_similar_item(item_id:number){
    var _url_single_item=this.local+"/link_similar_item?";
    return this._http.get<any>(_url_single_item+"item_id="+item_id);

  }



}
