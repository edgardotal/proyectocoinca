import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataDespachoService {
  protected apiUrl = 'http://localhost:3000/api/despacho'; // URL de tu API

  constructor(private http: HttpClient) { }


  // Método para obtener datos de despacho por número de cava
  obtenerDatosPorCava(cava: string): Observable<any> {
    console.log('Cava enviada al backend:', cava);  // Verifica que el valor enviado sea correcto
    return this.http.get<any>(`${this.apiUrl}/cava/${cava}`);
  }


//------------------------------------------------------------------------------------------

guardarDatos(despacho: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, despacho);
}


guardarTotales(totalesData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, totalesData);
}

getApiUrl(): string {
  return this.apiUrl;
}



}
