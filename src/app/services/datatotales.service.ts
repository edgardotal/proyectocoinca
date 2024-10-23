import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Totales } from '../../../models/datatotales.model';

@Injectable({
  providedIn: 'root'
})
export class DataTotalesService {
  protected apiUrl = 'http://localhost:3000/api/totales'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para guardar los totales
  guardarTotales(totalesData: Totales): Observable<any> {
    // Log de la URL de la API y los datos que se están enviando
    //console.log('URL de la API:', this.getApiUrl());
    //console.log('Datos a enviar rata :', totalesData);

    // Pausa la ejecución para depuración
    //debugger;

    return this.http.post<any>(`${this.apiUrl}`, totalesData);
  }

  // Método para obtener la URL para debugging
  getApiUrl(): string {
    return this.apiUrl;
  }
}
