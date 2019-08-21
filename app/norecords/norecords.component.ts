import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-norecords',
  templateUrl: './norecords.component.html',
  styleUrls: ['./norecords.component.css']
})
export class NorecordsComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {

    // this.data.clear_flags();
    // this.data.change_flag_result("norec",true);
  }

}
