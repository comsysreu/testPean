import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../services/contact-us.service';
import { SUCCESS, SUCCESS_MESSAGE, ERROR } from '../../enums/constats.enum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us-body',
  templateUrl: './contact-us-body.component.html',
  styleUrls: ['./contact-us-body.component.css']
})
export class ContactUsBodyComponent implements OnInit {

  contactUs = {
    name: "",
    email: "",
    phone: "",
    message: "",
    sendDate: new Date(),
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private contactUsService: ContactUsService,
  ) { }

  ngOnInit() {
  }

  sendMessage() {
    this.contactUsService.postItem(this.contactUs)
      .then(resp => this.showToast('success', 'Su mensaje ha sido enviado correctamente, pronto lo estaremos contactando'))
      .catch(err => this.showToast('error', err.message));
  }

  showToast(type: string, message?: string) {
    switch (type) {
      case 'success': {
        setTimeout(() => this.toastr.success(message, SUCCESS));
        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 1000);
        break;
      }
      case 'error': {
        setTimeout(() => this.toastr.success(message, ERROR));
        break;
      }
    }
  }

}
