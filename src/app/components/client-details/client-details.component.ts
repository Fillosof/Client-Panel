import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id = '';
  client: Client = {};
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from URL
    this.id = this.route.snapshot.params['id'];
    // Get client from firebase
    // console.log(this.clientService.getClient(this.id), this.id);

    this.clientService.getClient(this.id).subscribe(
      client => {
        if (client != null) {
          if (client.balance > 0) {
            this.hasBalance = true;
          }
          this.client = client;
        }

      }
    );
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Баланс обновлен', {
      cssClass: 'alert-success', closeOnClick: true
    });
    this.showBalanceUpdateInput = !this.showBalanceUpdateInput;
  }

  onDeleteClick() {
    if (confirm('Вы уверены что хотите отправить этого клиента в небытие?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show(
        `${this.client.lastName} ${this.client.firstName} удален с Вашей Базы`,
        {
          cssClass: 'alert-warning text-center',
          closeOnClick: true,
          timeout: 4000
        }
      );
      this.router.navigate(['/']);
    }
  }

}
