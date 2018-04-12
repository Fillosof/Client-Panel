import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogIn: boolean;
  showRegister: boolean;
  loggedInUser = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLogIn = false;
      }
      this.showRegister = this.settings.getSettings().allowRegistration;
    });
  }

  onLogOutClick() {
    this.authService.logOut();
    this.flashMessage.show('До свидания', {
      cssClass: 'alert-success', closeOnClick: true, timeout: 4000
    });
    this.router.navigate(['/login']);
  }

}
