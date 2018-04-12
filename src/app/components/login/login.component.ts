import { Form } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(valid: boolean) {
    if (!valid) {
      this.flashMessage.show(`Пожалуйста введите данные для входа`, {
        cssClass: 'alert-danger', closeOnClick: true, timeout: 4000
      });
    } else {
      this.authService.login( this.email, this.password )
        .then(res => {
          this.flashMessage.show('C возвращением, отличного дня', {
            cssClass: 'alert-success', closeOnClick: true
          });
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.flashMessage.show(`${err.message}`, {
            cssClass: 'alert-danger', closeOnClick: true, timeout: 4000
          });
        });
    }
  }

}
