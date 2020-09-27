export interface BrazilianDeputy {
  email: string;
  id: number;
  idLegislatura: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  uri: string;
  uriPartido: string;
  urlFoto: string;
}

export interface BrazilianDeputyDataLinks {
  href: string;
  rel: string;
}

export interface BrazilianDeputyData {
  dados: BrazilianDeputy[];
  links: BrazilianDeputyDataLinks[];
}
