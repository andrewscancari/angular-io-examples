import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BrazilianDeputy, BrazilianDeputyData } from './models/brazilian-deputy.model';

const mockBrazilianDeputies: BrazilianDeputy[] = [{
  email: 'dep.abiliosantana@camara.leg.br',
  id: 204554,
  idLegislatura: 56,
  nome: 'Abílio Santana',
  siglaPartido: 'PL',
  siglaUf: 'BA',
  uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204554',
  uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37906',
  urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204554.jpg',
}]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public readonly title = 'async-await';
  public tableDataSource = [];
  public readonly displayedColumns: string[] = ['nome', 'siglaPartido', 'siglaUf', 'urlFoto'];

  constructor(
    private httpclient: HttpClient
  ) {}

  private getBrazilianDeputies(): Promise<BrazilianDeputyData> {
    const url = 'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=10&ordem=ASC&ordenarPor=nome';
    return this.httpclient.get<BrazilianDeputyData>(url).toPromise();
  }

  async ngOnInit(): Promise<void> {
    try {
      console.log('buscando lista de deputados...');
      const brazilianDeputiesData = await this.getBrazilianDeputies();
      console.log('lista carregada com sucesso!');
      this.tableDataSource = brazilianDeputiesData.dados;

    } catch (error) {
      console.log(error);
    }
  }
}
