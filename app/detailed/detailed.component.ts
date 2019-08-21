import { Component, OnInit,HostListener } from '@angular/core';
import {DataService} from '../data.service';
import { animate, trigger, style,state, transition } from '@angular/animations';
import { delay } from 'q';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
  animations:[
    trigger('ozslizer',[
      state('lefter',style({transform:'translateX(50%)'})),
      state('righter',style({transform:'translateX(0%)'})),
      transition('* <=>*',[
        animate(300)
      ])
    ]),
    trigger('progslizer',[
      state('lefter',style({transform:'translateX(0%)'})),
      state('righter',style({transform:'translateX(-50%)'})),
      transition('* <=>*',[
        animate(300)
      ])
    ])

    
    
  ]
})
export class DetailedComponent implements OnInit {

  constructor(private data: DataService) { }
  item_detail:any
  toggler:string="lefter"
  current_item:object
  hide_progress=true
  end:string="end"
  flag_list:object
  similar_title=window.innerWidth>750?"Similar Products":"Related"
  fb_link:string="https://www.facebook.com/dialog/share?app_id=2351877448356992&display=popup"
  ngOnInit() {
    this.data.single_item_details_observe.subscribe(message => this.item_detail = message)  
    this.data.curr_item_observe.subscribe(message => this.current_item = message)  
    this.data.flags_observe.subscribe(message => this.flag_list = message)
    var quote="Buy "+this.item_detail.title+" at $"+this.item_detail.price+" from link below";
    var href=this.item_detail.vurl;
    this.fb_link+="&quote="+quote+"&href="+href
    // console.log(this.item_detail)
    this.toggler="righter"
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event){
   if (event.target.innerWidth <= 750){
     this.similar_title = 'Related';
   }else {
     this.similar_title = 'Similar Products';
   }
  }

 async list_click(){
  this.hide_progress=false
    this.toggler="lefter"
    await delay(300)
    this.hide_progress=true

    this.data.change_flag_result('detail',false)
  
  }


wish_contains(){
  
  if(!this.data.contains_wish_list(this.current_item)){
    this.data.add_wish_list(this.current_item)
  }
  else{
    this.data.delete_wish_list(this.current_item)
  }

}

cart_displayer(){
  return this.data.contains_wish_list(this.current_item)? 'remove_shopping_cart' : 'add_shopping_cart'
}

async resetab(x){
  this.hide_progress=false
    this.toggler="lefter"
    await delay(300)
    this.hide_progress=true
    this.data.change_flag_result('cur_tab',x)
    this.data.change_flag_result('detail',false)
  
}

}
