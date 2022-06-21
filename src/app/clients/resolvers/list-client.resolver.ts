import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/core/models/client';
import { ClientsService } from '../services/clients.service';

@Injectable({
  providedIn: 'root'
})
export class ListClientResolver implements Resolve<Client[]> {
  constructor(private clientsService: ClientsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client[]> {
    return this.clientsService.collection$;
  }
}
