import { Component,OnInit, Input } from '@angular/core';
import {FormBuilder,Validators,FormControl} from '@angular/forms';
import {AutocompleteService} from './autocomplete.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UserlocationService} from './userlocation.service';
import {AllItemsService} from './all-items.service';

import {DataService} from './data.service';
import { animate, trigger, style,state, transition } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  wish="id_res"
  title = 'productSearch';
  option_list=[];
  user_location="";
  message:object;
  flag_list:object;
  center="center"
  just_flag=false;
  wish_list:any
  hide_progress=true
  get keyword(){
    return this.psform.get('keyword');
  }

  get zip(){
    return this.psform.get('zip');
  }
  get zipcode(){
    return this.psform.get('zipcode');
  }

  get miles(){
    return this.psform.get('miles');
  }
  

  psform=this.fb.group({
    keyword: ['', Validators.required],
    category: ['All Categories'],
   condition: this.fb.group({
     cnew: [false],
     cused: [false],
     cunspecified: [false]
   }),
   shipping: this.fb.group({
     slocal: [false],
     sship:[false]
   }),
   miles: [''],
   zip: ['1'],
   zipcode: ['']
  });

  category_list=["All Categories","Art","Baby","Books","Clothing, Shoes & Accessories","Computers/Tablets & Networking","Health & Beauty","Music","Video Games & Consoles"];
  category_map={"All Categories":0, "Art":550,"Baby":2984,"Books":267,"Clothing, Shoes & Accessories":11450,"Computers/Tablets & Networking":58058,"Health & Beauty":26395,"Music":11233,"Video Games & Consoles":1249};
  
  filteredOptions: Observable<string[]>;
  ngOnInit() {
    this.filteredOptions = this.zipcode.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this._filter(val): [])
      );
      
      this.data.list_item_observe.subscribe(message => this.message = message)
      this.data.flags_observe.subscribe(message => this.flag_list = message)
      this.data.wish_list_observe.subscribe(message => this.wish_list = message)

      if(localStorage.getItem('harishmo-cacher')!=null)
       {          
         var temp=JSON.parse(localStorage.getItem('harishmo-cacher'))
          if(temp.length>0)
            this.data.change_wish_list(temp)
      }
    }

  private _filter(value: string): string[] {
    return this.option_list;
  }

  constructor(
    private data: DataService,
    private fb: FormBuilder, 
    private _auto_service: AutocompleteService, 
    private loc_service: UserlocationService, 
    private all_items_service: AllItemsService){
    this.zipcode.disable();
  
  }

zip_clear(){
  this.psform.patchValue({
    zipcode:''
  });
  this.zipcode.disable();
}

zip_autocomplete(){
  var zipcode_val=this.zipcode.value;
  // console.log("Jeez",zipcode_val,zipcode_val.length);
  if(zipcode_val.trim().length>2){
      this._auto_service.autoc(zipcode_val.trim())
      .subscribe(
        data=>{
          var temp=data;
          if(temp!="error"){
            temp=temp.postalCodes;
            this.option_list=[];
            for (var i=0;i<temp.length;i++){
              this.option_list.push(temp[i].postalCode);
            }
          }
          
        } ,
        error=>console.log()
      );
  }
}

tune_inputs(form_var){
  var form_inputs=form_var;
  var temp=form_inputs['category'];
  form_inputs['category']=this.category_map[temp];
  if(form_inputs['miles']=='')
    form_inputs['miles']='10';
  return form_inputs;
}

tctoggle(){

 if( this.flag_list['cur_tab']=='id_res')
 this.flag_list['cur_tab']='id_wish'
 else this.flag_list['cur_tab']='id_res'

}


async on_search(){
  this.hide_progress=false
  this.just_flag=true
  this.data.clear_flags();
  
var form_inputs=this.tune_inputs(this.psform.value);
if(form_inputs.zip=='1'){
  var k=await this.loc_service.get_location().toPromise();
  this.user_location=k.zip;
  // console.log("P2",this.user_location);
  form_inputs['zipcode']=this.user_location;
}

// console.log("f",form_inputs);
var resp_items= await this.all_items_service.get_all_items(form_inputs).toPromise();
// console.log("l",resp_items);
var parsed_object=this.generatar(resp_items);
this.hide_progress=true
  this.data.change_list_items(parsed_object);
  this.data.change_flag_result("result",true);

}

generatar(json:any){
  
    
  if(json.hasOwnProperty('findItemsAdvancedResponse')){
    
  var fiar=json.findItemsAdvancedResponse[0];
  var status_code=fiar.ack[0];
  // console.log("list",status_code);
  if((status_code=="Success") && (fiar.hasOwnProperty('searchResult')) && (fiar.searchResult[0].hasOwnProperty('item'))){
    var content=[]
      var items=fiar.searchResult[0].item;
      var html_text="";
      
     var x=0; var y=0;
    
      for(var i=0; i<items.length;i++){
        var temp={};
          var galleryurl="N/A";
          if(items[i].hasOwnProperty('galleryURL'))
          galleryurl=items[i].galleryURL[0];

          temp['image']=galleryurl;
          var hrefer="";

         
          var title="N/A";
          if(items[i].hasOwnProperty('title'))
          title=items[i].title[0];
          temp['title']=title;

          if(items[i].hasOwnProperty('itemId'))
          temp['itemid']=items[i].itemId[0];

          if(items[i].hasOwnProperty('shippingInfo'))
          temp["shippingInfo"]=items[i].shippingInfo[0];
        
          if(items[i].hasOwnProperty('returnsAccepted'))
          temp["shippingInfo"]["return"]=items[i].returnsAccepted[0];

          if(items[i].hasOwnProperty('viewItemURL'))
          temp["vurl"]=items[i].viewItemURL[0];


          if(items[i].hasOwnProperty('sellerInfo'))
          temp["seller"]=items[i].sellerInfo[0];
        
          if(items[i].hasOwnProperty('storeInfo')){
            if(items[i].storeInfo[0].hasOwnProperty('storeName'))
            temp["seller"]["s_name"]=items[i].storeInfo[0].storeName;
            if(items[i].storeInfo[0].hasOwnProperty('storeURL'))
            temp["seller"]["s_url"]=items[i].storeInfo[0].storeURL;
          }

          var seller_info="N/A";
          if(items[i].hasOwnProperty('sellerInfo')&&items[i].sellerInfo[0].hasOwnProperty('sellerUserName'))
          {seller_info=items[i].sellerInfo[0].sellerUserName[0];
            temp["seller"]["sel_name"]=seller_info.toUpperCase();
          }
          temp['seller_info']=seller_info.toUpperCase();



          var price="N/A";
          if(items[i].hasOwnProperty('sellingStatus') && items[i].sellingStatus[0].hasOwnProperty('currentPrice') )
              price="$"+items[i].sellingStatus[0].currentPrice[0].__value__;

          temp['price']=price;
          
          temp['index']=i+1;
          var postalcode="N/A";
          if(items[i].hasOwnProperty('postalCode'))
              postalcode=items[i].postalCode[0];
          temp['zip']=postalcode;
       
          var condition="N/A";

          if(items[i].hasOwnProperty('condition'))    
              condition=items[i].condition[0].conditionDisplayName[0];
        
          var shipping="N/A";
          if(items[i].hasOwnProperty('shippingInfo'))    
          {
                  if (items[i].shippingInfo[0].hasOwnProperty('shippingType')){
                      if(items[i].shippingInfo[0].shippingType[0]=="Free")
                          shipping="Free Shipping";
                      else if (items[i].shippingInfo[0].hasOwnProperty('shippingServiceCost')){
                          var service_cost=parseFloat(items[i].shippingInfo[0].shippingServiceCost[0].__value__);
                          if(service_cost==0) shipping="Free Shipping";
                          else shipping="$"+items[i].shippingInfo[0].shippingServiceCost[0].__value__;
                      }
                  }
                  else if (items[i].shippingInfo[0].hasOwnProperty('shippingServiceCost')){
                      
                  var service_cost=parseFloat(items[i].shippingInfo[0].shippingServiceCost[0].__value__);
                  if(service_cost==0) shipping="Free Shipping";
                  else shipping="$"+items[i].shippingInfo[0].shippingServiceCost[0].__value__;
                  }
              
          }
          
      
          temp['shipping']=shipping;
          temp["shippingInfo"]["cost"]=shipping
          
          content.push(temp);
           
 }

      return content;
  }
  else{
    return [];
}
}
  else{
      return [];
  }
}


on_clear(){
  this.data.clear_flags();
  this.psform.patchValue({
        keyword: '',
        category: 'All Categories',
       condition:{
         cnew: false,
         cused: false,
         cunspecified: false
       },
       shipping: {
         slocal: false,
         sship:false
       },
       miles: '',
       zip: '1',
       zipcode: ''
      });
      this.zipcode.disable();
      this.keyword.markAsUntouched();
    }
}

