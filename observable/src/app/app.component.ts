import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'observable';

  valoresRecebidos: string[] = [];
  inscricaoObservable: Subscription;

  exemploTimeout(): Observable<string> {
    return new Observable<string>(observador => {
      setTimeout(() => {
        observador.next('Primeiro timeout');
      }, 2000);

      setTimeout(() => {
        observador.next('Segundo timeout');

        // (Obs: erro finaliza o observable automaticamente)
        // DESCOMENTE LINHA ABAIXO PARA EMITIR ERRO
        // observador.error('Erro no observable!');

        // DESCOMENTE LINHA ABAIXO PARA FINALIZAR O OBSERVABLE
        // observador.complete();
      }, 3000);

      setTimeout(() => {
        observador.next('Terceiro timeout');
      }, 5000);

      setTimeout(() => {
        observador.next('Quarto timeout');
      }, 4000);
    });
  }

  async ngOnInit() {
    const observable = this.exemploTimeout();

    this.inscricaoObservable = observable.subscribe(
      sucesso => {
        this.valoresRecebidos.push(sucesso);
      },
      erro => {
        this.valoresRecebidos.push(erro);
      },
      () => {
        this.valoresRecebidos.push('O observable foi encerrado!');
      }
    );

    console.log(this.valoresRecebidos);
  }

  ngOnDestroy() {
    if (this.inscricaoObservable) {
      this.inscricaoObservable.unsubscribe();
   }
  }
}
