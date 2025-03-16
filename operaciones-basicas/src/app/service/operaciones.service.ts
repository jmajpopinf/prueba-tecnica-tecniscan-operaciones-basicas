import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Resultado {
  resultado: number;
  operacion: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = 'https://localhost:7208/api/Arithmetic/';

  public operacion(primerNumero: number, segundoNumero: number, operacion: string): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.URLbase}${operacion}/${primerNumero}/${segundoNumero}`);
  }

}
