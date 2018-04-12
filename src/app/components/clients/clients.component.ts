import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  totalOwed = 0;

  constructor( private clientServise: ClientService) { }

  ngOnInit() {
    this.clientServise.getClients().subscribe( clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce( (total, client) => {
      return total + client.balance;
    }, 0);
  }

}
