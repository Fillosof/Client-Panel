import { Form } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(valid: boolean) {
    if (!valid) {
      this.flashMessage.show(`Пожалуйста введите данные для входа`, {
        cssClass: 'alert-danger', closeOnClick: true, timeout: 4000
      });
    } else {
      this.authService.register( this.email, this.password )
        .then(res => {
          this.flashMessage.show('Вы зарегестрированы, приятной работы', {
            cssClass: 'alert-success', closeOnClick: true, timeout: 4000
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
