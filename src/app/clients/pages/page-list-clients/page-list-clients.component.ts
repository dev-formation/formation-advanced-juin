import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe, pluck, Subject, Subscription, tap } from 'rxjs';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss']
})
export class PageListClientsComponent implements OnInit, OnDestroy {
  public headers: string[];
  public subCollection$: Subject<Client[]>;
  public collection!: Client[];
  public stateClient = StateClient;

  private subscription!: Subscription;

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute
  ) { 
    this.headers = ['', '', 'Name', 'TotalCaHt', 'Tva', 'TotalTTC', 'State'];
    this.subCollection$ = this.clientsService.subCollection$;
    
    // this.clientsService.refreshCollection();
    this.route.data.pipe(
      tap(() =>console.log("Init via resolve")),
      pluck('clients')
    ).subscribe(
      (listClient: Client[]) => {
        this.collection = [...listClient];
      }
    )
    console.log('Composant list client instancié !');
  }
  
  ngOnInit(): void {
    // this.clientsService.collection$.subscribe(
    //   (data) => console.log("TEST INstance clients", data)
    // )
    this.subscription = this.subCollection$.pipe(
      tap(() =>console.log("Récup via subject"))
    ).subscribe(
      (listClient: Client[]) => {
        this.collection = [...listClient];
      }
    )
  }

  public onClickDeleteClient(client: Client): void {
    this.clientsService.deleteById(client.id).subscribe();
  }

  public onChangeUpdateState(client: Client, event: Event): void {
      const target = event.target as HTMLSelectElement;
      const state = target.value as StateClient;
      this.clientsService.changeState(client, state).subscribe((updatedClient: Client) => {
        client.state = updatedClient.state;
      });
  }
  
  ngOnDestroy(): void {
    console.log('Composant list client detruit ...');
    this.subscription.unsubscribe();
  }

  check() {
    console.log("CD LIST CLIENTS");
    
  }
}
