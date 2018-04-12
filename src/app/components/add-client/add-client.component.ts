import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0
  };
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMsg: FlashMessagesService,
    private clientServices: ClientService,
    private router: Router,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settings.getSettings().disableBalanceOnAdd;
  }

  onSubmit( {value, valid}: {value: Client, valid: boolean} ) {
    if ( this.disableBalanceOnAdd ) {
      value.balance = 0;
    }

    if ( !valid ) {
      // Show error
      this.flashMsg.show(
        'Пожалуйста, заполните форму корректно',
        {
          cssClass: 'alert-danger text-center',
          closeOnClick: true,
          timeout: 4000
        }
      );
    } else {
      // Add client to firebase
      this.clientServices.newClient(value);
      // Show message
      this.flashMsg.show(
        'Добавлен новый клиент',
        {
          cssClass: 'alert-success text-center',
          closeOnClick: true,
          timeout: 2000
        }
      );
      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }


}
