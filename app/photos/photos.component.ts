import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {AllItemsService} from '../all-items.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  constructor(private data: DataService,private all_items_service: AllItemsService) { }
  item_detail:any



 
  ngOnInit() {
    this.intialize()
  }

  intialize(){
    this.item_detail=[]
    

    var new_temp:any
    var temp=[]
    this.data.single_photo_observe.subscribe(message => new_temp = message)  
    // console.log(new_temp)
    if(new_temp.hasOwnProperty('items')){
      var new_temp_items=new_temp.items
      
      for(var k=0;k<new_temp_items.length;k++){
        if(new_temp_items[k].hasOwnProperty('link')){
          temp.push(new_temp_items[k].link)
        }
      }
    }

    this.item_detail=temp
    
    var lener=this.item_detail.length
if(lener>0)
{
    if(lener>=3)
    this.snaker(1,3)
    if(lener>=6)
    this.snaker(2,6)
    if(lener>=7)
    this.snaker(5,7)
    while(this.item_detail.length<8)
      this.item_detail.push('')
    // console.log(this.item_detail)
    this.item_detail.splice(2,0,'')
}

  }

  snaker(a,b){
    var t=this.item_detail[a]
    this.item_detail[a]=this.item_detail[b]
    this.item_detail[b]=t
  }

}
