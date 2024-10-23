import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Totalesd } from '../../../models/totalesdespacho.model';

@Injectable({
  providedIn: 'root'
})
export class TotalesdespachoService {
  // URL de la API donde se realizarán las peticiones
  protected apiUrl = 'http://localhost:3000/api/guardarTotalesDespacho'; // Ruta correcta

  constructor(private http: HttpClient) { }

  /**
   * Método para guardar los totales de despacho.
   * @param totalesData Objeto que contiene los datos de los totales.
   * @returns Un observable que resuelve con la respuesta de la API.
   */
  guardarTotalesd(totalesData: Totalesd): Observable<any> {
    console.log('URL de la API:', this.getApiUrl());
    console.log('Datos a enviar:', totalesData);

    return this.http.post<any>(this.apiUrl, totalesData);
  }

  getApiUrl(): string {
    return this.apiUrl;
  }
}
