import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlagService {
  flags:object={'result':false,'detail':false,'wishlist':false}
  private flags_source = new BehaviorSubject(this.flags);
  flags_observe = this.flags_source.asObservable();

  constructor() { }

  change_flag_result(param:string,message: boolean) {
    var temp=this.flags
    temp[param]=message
    this.flags_source.next(temp)
  }


}
