import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SUCCESS, SUCCESS_MESSAGE, ERROR } from '../../enums/constats.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
