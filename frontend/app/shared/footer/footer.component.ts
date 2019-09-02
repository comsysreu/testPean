import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  redirect(type: number) {
    switch (type) {
      case 1:
        window.open("https://www.facebook.com/cemacogt", "_blank");
      case 2:
        window.open("https://twitter.com/CEMACO_GT", "_blank");
      case 3:
        window.open("https://www.youtube.com/user/CEMACOgt", "_blank");
      case 4:
        window.open("https://www.pinterest.com/cemacoguatemala/", "_blank");
      case 5:
        window.open("https://www.instagram.com/cemaco/?hl=es-la", "_blank");
    }
  }

}
