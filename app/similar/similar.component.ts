import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

  constructor(private data: DataService,private fb: FormBuilder) { }
  similar_list:any
  default_list:any
  page: number = 1;
  pageSize: number = 10;
  category_list=["Default","Product Name", "Days Left","Price", "Shipping Cost"]
  sort_order=["Ascending","Descending"]
  sort_key=1
  show_more=true
  form=this.fb.group({
    category_control: [0],
    sort_control:[0]
  })

  get category_control(){
    return this.form.get('category_control')
  }

  get sort_control(){
    return this.form.get('sort_control')
  }
  ngOnInit() {
    this.data.similar_items_observe.subscribe(message => this.similar_list = message)  
    // console.log(this.similar_list)
    this.similar_list=this.parser(this.similar_list)
    this.default_list=this.similar_list
    // console.log(this.similar_list)
    // console.log(this.category_control.value)
    this.sort_control.disable();

  }

parser(json:any):Array<object>{

  if((json.hasOwnProperty('getSimilarItemsResponse'))&&(json.getSimilarItemsResponse.hasOwnProperty('itemRecommendations'))&&(json.getSimilarItemsResponse.itemRecommendations.hasOwnProperty('item'))){
    var item=json.getSimilarItemsResponse.itemRecommendations.item;
    var content=[]
    if(item.length==0)
    return [];
    var dummy:any;

    for(var i=0;i<item.length;i++){
        var temp={}
        dummy="N/A"
        if(item[i].hasOwnProperty('imageURL')){
            dummy=item[i].imageURL
}
        temp['image']=dummy

        dummy="N/A"
        if(item[i].hasOwnProperty('title')){
            dummy=item[i].title
        }
        temp['title']=dummy

        dummy="N/A"
        if(item[i].hasOwnProperty('viewItemURL')){
            dummy=item[i].viewItemURL
        }
        temp['url']=dummy

        dummy="N/A"
        if(item[i].hasOwnProperty('timeLeft')){
            dummy=item[i].timeLeft
        }
        temp['time']=parseInt(dummy.substring(dummy.indexOf('P')+1,dummy.indexOf('D')))

        dummy="N/A"
        if(item[i].hasOwnProperty('shippingCost')&&(item[i].shippingCost.hasOwnProperty('__value__'))){
            dummy=parseFloat(item[i].shippingCost.__value__);
        }
        temp['ship_cost']=dummy

        dummy="N/A"
        if((item[i].hasOwnProperty('buyItNowPrice'))&&(item[i].buyItNowPrice.hasOwnProperty('__value__'))){
          dummy= parseFloat(item[i].buyItNowPrice.__value__);
        }
        temp['price']=dummy

        content.push(temp)
    }
    
    return content;
}
else
    return []

}

onCategory(){
  var k=this.category_control.value
  var sort_order=this.sort_key
  this.sort_control.enable();
    switch(parseInt(k)){
      case 1: 
      this.similar_list = this.similar_list.sort((a,b)=>{
                var pa=a.title.toLowerCase()
                var pb=b.title.toLowerCase()
                if(pa<pb) return -1*sort_order
                else if (pa>pb) return sort_order
                return 0
              })
              break;
      case 2:
      this.similar_list = this.similar_list.sort((a,b)=>{
                return (a.time-b.time)*sort_order;
              })
              break;
      case 3: 
      this.similar_list = this.similar_list.sort((a,b)=>{
                return (a.price-b.price)*sort_order
              })
              break;
      case 4:
      this.similar_list = this.similar_list.sort((a,b)=>{
                return (a.ship_cost-b.ship_cost)*sort_order
              })
              break;
      default:
      this.similar_list=JSON.parse(JSON.stringify(this.default_list));
      this.sort_control.disable();
            } 
  
}

onOrder(){
  var k=this.sort_control.value
  this.sort_key*=-1
  this.onCategory()
}

moreClick(){
this.show_more=!this.show_more
}

}
