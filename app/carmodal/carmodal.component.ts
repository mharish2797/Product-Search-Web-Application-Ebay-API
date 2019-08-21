import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {DataService} from '../data.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-carmodal',
  templateUrl: './carmodal.component.html',
  styleUrls: ['./carmodal.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CarmodalComponent implements OnInit {

  item_detail:any
  constructor( private data: DataService, public aM:NgbActiveModal) { }

  //item_detail.pic_url[]
  ngOnInit() {
    this.data.single_item_details_observe.subscribe(message => this.item_detail = message)  

  }

  indd(entity){
    let x=this.item_detail.pic_url;
    return x.indexOf(entity)
  }

}
