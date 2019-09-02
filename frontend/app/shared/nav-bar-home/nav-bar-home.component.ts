import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-home',
  templateUrl: './nav-bar-home.component.html',
  styleUrls: ['./nav-bar-home.component.css']
})
export class NavBarHomeComponent implements OnInit {

  @Input('showBanner') showBanner: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
