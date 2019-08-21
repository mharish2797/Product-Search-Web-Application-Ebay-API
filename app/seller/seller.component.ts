import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private data: DataService) { }
  item_detail:any
  rec=true
  radius: number = 17;
  semicircle: boolean = false;
  color_feedback:string="black"
  star_feedback:string="stars"
 ngOnInit() {
    this.data.single_item_details_observe.subscribe(message => this.item_detail = message)  
    if(!this.item_detail.hasOwnProperty('seller'))
      this.rec=false
    else{
    this.item_detail=this.item_detail.seller
    // console.log(this.item_detail)
    
    this.rec=this.item_detail.hasOwnProperty('sellerUserName')
    ||this.item_detail.hasOwnProperty('feedbackScore')
    ||this.item_detail.hasOwnProperty('positiveFeedbackPercent')
    ||this.item_detail.hasOwnProperty('feedbackRatingStar')
    ||this.item_detail.hasOwnProperty('topRatedSeller')
    ||this.item_detail.hasOwnProperty('s_name')
    ||this.item_detail.hasOwnProperty('s_url')

    if(this.item_detail.hasOwnProperty('feedbackRatingStar'))
      this.star_feedback=this.get_feedback();
 }}

get_feedback(){
  var temp:string=this.item_detail.feedbackRatingStar[0].toLowerCase();
  if(temp=="none"){
    return "stars"
  }
  else if(temp.includes("shooting")){
    var k=temp.indexOf("shooting")
    this.color_feedback=temp.substring(0,k);
    return "star_border"
  }
  else{
    this.color_feedback=temp;
    return "stars"
  }

}


}
