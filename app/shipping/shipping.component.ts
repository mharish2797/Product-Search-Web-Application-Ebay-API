import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  constructor(private data: DataService) { }
  item_detail:any
  rec=true

 ngOnInit() {
    this.data.single_item_details_observe.subscribe(message => this.item_detail = message)  
    if(!this.item_detail.hasOwnProperty('shipping'))
      this.rec=false
    else{
    this.item_detail=this.item_detail.shipping
    // console.log(this.item_detail)

    this.rec=this.item_detail.hasOwnProperty('cost')
    ||this.item_detail.hasOwnProperty('shipToLocations')
    ||this.item_detail.hasOwnProperty('handlingTime')
    ||this.item_detail.hasOwnProperty('expeditedShipping')
    ||this.item_detail.hasOwnProperty('oneDayShippingAvailable')
    ||this.item_detail.hasOwnProperty('return')

    if(this.item_detail.hasOwnProperty('handlingTime')){
      if(parseInt(this.item_detail.handlingTime[0])>1)
      this.item_detail["handlingTime"]=this.item_detail.handlingTime[0]+" Days"
      else
      this.item_detail["handlingTime"]=this.item_detail.handlingTime[0]+" Day"
    }

  }

}
}