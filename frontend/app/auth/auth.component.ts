import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: string = '';
  password: string = '';

  ToastConfig = {
    progressBar: true,
    closeButton: true,
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  auth() {
    this.authService.login(this.user, this.password).then((resp: any) => {

      if (resp.includes('Usuario no encontrado') || resp.includes('Contraseña Incorrecta')) {
        let respnose = JSON.parse(resp);
        setTimeout(() => this.toastr.error(respnose.message, 'Error de autenticación!', this.ToastConfig));
      } else {
        this.authService.saveToken(resp);
        this.userService.getByUserName(this.user).then((resp: any) => {
          this.authService.saveData(resp.user, resp.name, resp.id, resp.position);
          setTimeout(() => this.toastr.info(resp.name, 'Bienvenido!'));
          this.router.navigate(['/dashboard']);
        })
      }

    }).catch(err => {
      setTimeout(() => this.toastr.error(err.message, 'Error de autenticación!'));
    })
  }

}
