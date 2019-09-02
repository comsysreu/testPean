import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit {

  constructor() { }

  itemsNew: any = [
    {
      name: 'Multicontacto Tipo Regleta De 6 Entradas',
      price: '34.99',
      img: 'assets/image/l1.PNG',
    },
    {
      name: 'Multicontacto Tipo Regleta De 6 Entradas',
      price: '34.99',
      img: 'assets/image/L2.PNG',
    },
    {
      name: 'Audífonos Intrauriculare Con Micrófono - Maxell Aufífonos línea extra línea extra',
      price: '34.99',
      img: 'assets/image/L3.PNG',
    },
    {
      name: 'Reproductor de DVD Samsumg',
      price: '349.99',
      img: 'assets/image/L4.PNG',
    }
  ]

  ngOnInit() {
  }

}
