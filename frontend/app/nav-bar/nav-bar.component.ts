import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.validateToken().subscribe(resp => !resp ? this.router.navigate(['/login']) : console.log("TOKEN VALIDO"));
  }

  ngOnInit() {
  }

  logout() {
    this.authService.loggedOut();
  }

}
