import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  flags:object={'result':false,'detail':false,'single_item':false,'cur_tab':'id_res'}
  private flags_source = new BehaviorSubject(this.flags);
  flags_observe = this.flags_source.asObservable();

  list_items:Array<object>=[]
  private list_item_source = new BehaviorSubject(this.list_items);
  list_item_observe = this.list_item_source.asObservable();

  single_item:number=0
  private single_item_source = new BehaviorSubject(this.single_item);
  single_item_observe = this.single_item_source.asObservable();

  curr_item:object
  private curr_item_source = new BehaviorSubject(this.curr_item);
  curr_item_observe = this.curr_item_source.asObservable();

  single_item_details:object={}
  private single_item_details_source = new BehaviorSubject(this.single_item_details);
  single_item_details_observe = this.single_item_details_source.asObservable();

  single_photo:object={}
  private single_photo_source = new BehaviorSubject(this.single_photo);
  single_photo_observe = this.single_photo_source.asObservable();

  similar_items:object={}
  private similar_items_source = new BehaviorSubject(this.similar_items);
  similar_items_observe = this.similar_items_source.asObservable();

  wish_list:any=[]
  private wish_list_source = new BehaviorSubject(this.wish_list);
  wish_list_observe = this.wish_list_source.asObservable();

  constructor(){
  }
  ngOnInit() { 
    
  }

  change_list_items(message: Array<object>) {
    this.list_item_source.next(message)
  }

  change_wish_list(message: Array<object>) {
    this.wish_list=message
    this.wish_list_source.next(this.wish_list)
    // console.log("after_change",this.wish_list)

  }


  delete_wish_list(message: any) {
    // console.log(localStorage.length)
    this.wish_list=this.wish_list.filter(obj=>obj.itemid !=message.itemid)
    this.wish_list_source.next(this.wish_list)
    localStorage.setItem('harishmo-cacher',JSON.stringify(this.wish_list))
  }

  add_wish_list(message: object) {
    this.wish_list.push(message)
    this.wish_list_source.next(this.wish_list)
    // console.log("after_add",this.wish_list)
    localStorage.setItem('harishmo-cacher',JSON.stringify(this.wish_list))
  }

  contains_wish_list(message: any){
    // console.log("check",this.wish_list)
    if(this.wish_list.filter(obj=>obj.itemid ==message.itemid).length>0)
      return true;
    return false;
  }

  change_single_items(message: number) {
    this.single_item_source.next(message)
  }

  change_curr_item(message: object) {
    this.curr_item_source.next(message)
  }


  change_single_items_details(message: object) {
    this.single_item_details_source.next(message)
  }

  change_single_photo(message: object) {
    this.single_photo_source.next(message)
  }

  change_similar_items(message: object) {
    this.similar_items_source.next(message)
  }

  change_flag_result(param:string,message: boolean) {
    var temp=this.flags
    temp[param]=message
    this.flags_source.next(temp)
  }

  clear_flags(){
    this.change_single_items(0);
    this.change_single_items_details({});
    this.flags={'result':false,'detail':false,'single_item':false,'cur_tab':'id_res'}
    this.flags_source.next(this.flags)
  }
}
