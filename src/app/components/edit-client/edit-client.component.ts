import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';

import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id = '';
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    // Get client from firebase
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
    // get Settings paramerer
    this.disableBalanceOnEdit = this.settings.getSettings().disableBalanceOnEdit;
  }

  onSubmit( {value, valid}: {value: Client, valid: boolean} ) {

    if ( !valid ) {
      // Show error
      this.flashMessage.show(
        'Пожалуйста, заполните форму корректно',
        {
          cssClass: 'alert-danger text-center',
          closeOnClick: true,
          timeout: 4000
        }
      );
    } else {
      // Add Id to client
      value.id = this.id;
      // Update client to firebase
      this.clientService.updateClient(value);
      // Show message
      this.flashMessage.show(
        'Добавлен новый клиент',
        {
          cssClass: 'alert-success text-center',
          closeOnClick: true,
          timeout: 2000
        }
      );
      // redirect to dashboard
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}

