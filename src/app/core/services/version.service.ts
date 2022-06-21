import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  public numVersion$ = new BehaviorSubject(0);
  private version: number = 0;

  //Observables (classique/froid) type requete HTTP
  private obs1: Observable<number> = new Observable((resp) => resp.next(Math.random()));

  //Subject (Observable chaud)
  private sub1 = new Subject<number>();
  private subCollection$ = new Subject<any[]>();

  //BehaviorSubject (Observable chaud)
  private behav1 = new BehaviorSubject<number>(42);

  constructor() {
    this.obs1.pipe(
      tap(x => console.log(`Brut : ${x}`)),
      map(x => x+1)
    ).subscribe((data) => console.log(`Observer 1 : data ${data}`));

    this.obs1.subscribe((data) => console.log(`Observer 2 : data ${data}`));

    
    this.sub1.subscribe((data) => console.log(`Observer sub1 : data ${data}`))
    this.sub1.next(Math.random());

    this.sub1.subscribe((data) => console.log(`Observer sub2 : data ${data}`))
    this.sub1.next(Math.random());

    //Mon composant s'abonne au flux
    this.subCollection$.subscribe((data) => console.log(`Composant : data ${data}`));

    //mon composant demande la MAJ des données du flux 
    let tab = ['toto', 'tata'];
    this.subCollection$.next(tab);
    // il les récupère via sa souscription précédente

    // une MAJ des données est effectuée
    tab = [...tab, 'titi'];
    this.subCollection$.next(tab);

    this.behav1.subscribe((data) => console.log(`Observer behav1 : data ${data}`))
    this.behav1.next(Math.random());
    
    this.behav1.subscribe((data) => console.log(`Observer 2 behav1 : data ${data}`))
    this.behav1.next(Math.random());

    // this.sub1.subscribe((data) => console.log(`Observer sub2 : data ${data}`))
    // this.sub1.next(Math.random());      
   }

  public incrementNumVersion(): void {
    console.log('this.numVersion$.value : ', this.numVersion$.value);
    this.numVersion$.next(this.numVersion$.value + 1);
    // this.numVersion$.next(++this.version);
  }
}
