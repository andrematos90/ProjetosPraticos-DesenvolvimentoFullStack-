import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';


@Injectable()
export class IconService {
  // cache com a lista de requisições realizadas
  private requests = new Map<string, Promise<any>>();

  getSvgContent(url: string): Observable<string> {
    // verificamos se já fizemos uma requisição para essa url
    let req = this.requests.get(url);

    if (!req) {
      // ainda não temos a requisição, então vamos criar uma
      req = fetch(url).then(response => {
        if (response.ok) {
          return response.text();
        }

        return null;
      });

      // armazena a requisição para fazer o cache dela na lista
      this.requests.set(url, req);
    }

    // retorna um observable com a requisição do cache/criada
    return from(req);
  }
}
