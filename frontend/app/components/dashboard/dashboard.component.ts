import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../contact-us-admin/contact-us-admin.component.css']
})
export class DashboardComponent implements OnInit {

  items: any = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartColors: Color[] = [
    {
      backgroundColor: '#00a9e0',
      pointBackgroundColor: '',
      borderColor: '',
      hoverBorderColor: ''
    }
  ];

  public barChartLabels = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Semana 1' },
  ];


  public barChartLabelsMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartTypeMonth = 'bar';
  public barChartLegendMonth = true;
  public barChartDataMonth = [
    { data: [], label: 'Usuarios por Mes' }
  ];

  constructor(private employeesService: EmployeesService) {
    this.employeesService.getAll().then(resp => {
      this.items = resp;
      let date = new Date();
      let getMonth = date.getMonth();
      let getDay = date.getDay();

      for (let i = 0; i <= getMonth; i++) {
        this.barChartDataMonth[0].data[i] = this.items.filter(element => new Date(element.creationDate).getMonth() == i).length;
      }

      for (let i = 0; i <= getDay; i++) {
        this.barChartData[0].data[i] = this.items.filter(element => new Date(element.creationDate).getDay() == i).length;
      }
    });
  }

  ngOnInit() {
  }

}
