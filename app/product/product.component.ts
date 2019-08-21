import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarmodalComponent } from '../carmodal/carmodal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  rec=true
  constructor(private data: DataService, private modals: NgbModal) { }
  item_detail:object
 ngOnInit() {
    this.data.single_item_details_observe.subscribe(message => this.item_detail = message)  
    this.rec=this.item_detail.hasOwnProperty('pic_url')
    ||this.item_detail.hasOwnProperty('subtitle')
    ||this.item_detail.hasOwnProperty('price')
    ||this.item_detail.hasOwnProperty('location')
    ||this.item_detail.hasOwnProperty('return_policy')
    ||this.item_detail.hasOwnProperty('itemspecifics')
  }

  modalopener() {
  this.modals.open(CarmodalComponent);
  }

}
