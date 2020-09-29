import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private httpClient: HttpClient
  ) {}

  title = 'observable';

  public auxValues: string[] = [];
  public deputiesList: [];
  private timeoutSubscription: Subscription;


  timeoutExample(): Observable<string> {
    return new Observable<string>(observable => {
      setTimeout(() => {
        observable.next('First timeout');
      }, 2000);

      setTimeout(() => {
        observable.next('Second timeout');

        // Uncomment this line to simulate an error
        // observable.error('Observable error!');

        // Uncomment this line to force observable to complete before next steps
        // observable.complete();
      }, 3000);

      setTimeout(() => {
        observable.next('Third timeout');
      }, 5000);

      setTimeout(() => {
        observable.next('Fourth timeout');
      }, 4000);
    });
  }

  exampleHttpDeputies(): Observable<any> {
    const url = 'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=5&ordem=ASC&ordenarPor=nome';
    return this.httpClient.get(url);
  }

  ngOnInit() {
    const timeoutExample = this.timeoutExample();

    this.timeoutSubscription = timeoutExample.subscribe(
      success => {
        this.auxValues.push(success);
        console.log(success);
      },
      error => {
        this.auxValues.push(error);
        console.log(error);
      },
      () => {
        const auxMsg = 'Observable completed';
        this.auxValues.push(auxMsg);
        console.log(auxMsg);
      }
    );
  }

  ngOnDestroy() {
    if (this.timeoutSubscription) {
      this.timeoutSubscription.unsubscribe();
    }
  }
}
