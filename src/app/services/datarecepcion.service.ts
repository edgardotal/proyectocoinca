import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recepcion} from '../../../models/datarecepcion.model';

@Injectable({
  providedIn: 'root'
})
export class DataRecepcionService {
  protected apiUrl = 'http://localhost:3000/api/recepcion'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para guardar los datos de recepción
  guardarDatos(recepcionData: Recepcion): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, recepcionData);
  }


  // Método para obtener la URL para debugging
  getApiUrl(): string {
    return this.apiUrl;
  }
}
