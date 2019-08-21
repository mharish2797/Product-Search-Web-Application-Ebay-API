import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {AllItemsService} from '../all-items.service';
import { animate, trigger, style,state, transition } from '@angular/animations';
import { delay } from 'q';
import { generate } from 'rxjs';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
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
export class WishlistComponent implements OnInit {

 
  tags:string
  content:Array<object>
  page: number = 1;
  pageSize: number = 10;
  flag_list:object;
  toggler:string="righter"
  hide_progress=true
  highlight_item:number
  wisher:any
  constructor(private data: DataService,private all_items_service: AllItemsService) { }
  headings = ["#","Image","Title","Price","Shipping","Seller","Wish List"];
  ngOnInit() {
    this.data.list_item_observe.subscribe(message => this.content = message)
    this.data.flags_observe.subscribe(message => this.flag_list = message)
    this.data.single_item_observe.subscribe(message => this.highlight_item = message)
    this.data.wish_list_observe.subscribe(message => this.wisher = message)
  }


  trimmer(title:string){
    if(title.length<35)
    return title;
    else{
      if (title[34]==' ')
      return  title.substring(0,35)+'...'
      else 
      return title.substring(0,title.substring(0,35).lastIndexOf(' '))+' ...'
    }
    
  }

  parser(json:any){
    if((json.hasOwnProperty('Ack'))&& (json.Ack=="Success") &&(json.hasOwnProperty('Item')))
    {
        var temp_obj:object={};
        var item=json.Item;
        var html_text="";
        var dummy=""
     
        if(item.hasOwnProperty('PictureURL'))
          temp_obj["pic_url"]=item.PictureURL;
    
        if(item.hasOwnProperty('Title'))
        temp_obj["title"]=item.Title;

        if(item.hasOwnProperty('Subtitle'))
        temp_obj["subtitle"]=item.Subtitle;
        
        if(item.hasOwnProperty('CurrentPrice'))
        temp_obj["price"]=item.CurrentPrice.Value;

        if(item.hasOwnProperty('Location'))
        temp_obj["location"]=item.Location;
        
        if((item.hasOwnProperty('ReturnPolicy')) && (item.ReturnPolicy.hasOwnProperty('ReturnsWithin'))&&(item.ReturnPolicy.hasOwnProperty('ReturnsAccepted')))
        temp_obj["return_policy"]=item.ReturnPolicy.ReturnsAccepted+" within "+item.ReturnPolicy.ReturnsWithin;

        if((item.hasOwnProperty('ItemSpecifics'))&&(item.ItemSpecifics.hasOwnProperty('NameValueList'))){
        var namevalue=item.ItemSpecifics.NameValueList;
        var new_don=[];
        for(var k=0;k<namevalue.length;k++)
            { var don_dum="";
            for(var z=0;z<namevalue[k].Value.length;z++)
              don_dum+=namevalue[k].Value[z]+",";
            don_dum=don_dum.substring(0,don_dum.length-1)
            new_don.push({"name":namevalue[k].Name,"value":don_dum});
            }
            temp_obj['itemspecifics']=new_don;
        }                
        return temp_obj;
    }
    else
    return {error:"error"};
  }

 async detail_click(){
  this.hide_progress=false
  this.toggler="lefter"
  await delay(300)
  this.hide_progress=true

    this.data.change_flag_result('detail',true)
  }

  async get_details(item:any){
    this.hide_progress=false
    this.toggler="lefter"
    var item_id=item.itemid
     // console.log(item_id);
     // console.log(item)
     this.data.change_single_items(item_id);
     this.data.change_curr_item(item)
     var single_set= await this.all_items_service.get_single_item(item_id).toPromise();
     
     var parsed_single:any=this.parser(single_set)
     // console.log("Parsed single",parsed_single)
    
       var similar_obj= await this.all_items_service.get_similar_item(item_id).toPromise();
         this.data.change_similar_items(similar_obj)
       parsed_single["seller"]=item.seller
       parsed_single["shipping"]=item.shippingInfo
       parsed_single["vurl"]=item.vurl
       this.data.change_single_items_details(parsed_single);
       this.data.change_flag_result('detail',true)
       this.data.change_flag_result('single_item',true)
       if(parsed_single.hasOwnProperty('title')){
         var photo_obj= await this.all_items_service.get_photo_item(parsed_single.title).toPromise();
         this.data.change_single_photo(photo_obj)        
     }
     await delay(300)
  this.hide_progress=true
   }
 
 wish_contains(temp_item){
  //  console.log(this.data.contains_wish_list(temp_item),temp_item)
   if( !this.data.contains_wish_list(temp_item))
   this.data.add_wish_list(temp_item)
 
 else
   this.data.delete_wish_list(temp_item)
 
 }
 cart_displayer(temp_item){
   return this.data.contains_wish_list(temp_item)? 'remove_shopping_cart' : 'add_shopping_cart'
 }

  get_total_cost(){
    var sum=0
    for(var k=0;k<this.wisher.length;k++)
    {
      var x:string=this.wisher[k].price
      x=x.substring(x.indexOf("$")+1,x.length)
      sum+=parseFloat(x)
    }
    return sum.toFixed(2)
  }
}
