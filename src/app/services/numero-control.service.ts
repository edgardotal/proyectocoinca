import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NumeroControlService {
  private apiUrlRecepcion = 'http://localhost:3000/api/numeroControl'; // URL para número de control de recepción
  private apiUrlDespacho = 'http://localhost:3000/api/numeroControlDesp'; // URL para número de control de despacho
  
  constructor(private http: HttpClient) { }

  // Método para obtener el número de control de recepción
  getNumeroControl(): Observable<string> {
    //console.log('Enviando solicitud para obtener el número de control de recepción');
    return this.http.get<any>(this.apiUrlRecepcion).pipe(
      map(response => {
        if (response && response.ncontrolrecep) {
          console.log('Número de control de recepción:', response.ncontrolrecep);
          return String(response.ncontrolrecep);
        } else {
          console.error('El campo ncontrolrecep no está presente en la respuesta.');
          return '';
        }
      }),
      tap({
        next: (controlData) => {
          if (controlData) {
      //      console.log('Número de control de recepción procesado:', controlData);
          }
        },
        error: (error) => {
          console.error('Error al obtener el número de control de recepción:', error);
        }
      })
    );
  }
  
  // Método para actualizar el número de control de recepción
  actualizarNumeroControl(nuevoControl: string): Observable<any> {
 //   console.log('Enviando solicitud para actualizar el número de control de recepción con:', nuevoControl);
    return this.http.put<any>(`${this.apiUrlRecepcion}/actualizar`, { ncontrolrecep: nuevoControl }).pipe(
      tap({
        next: (response) => {
          console.log('Respuesta recibida en la actualización del número de control de recepción:', response);
        },
        error: (error) => {
          console.error('Error al actualizar el número de control de recepción:', error);
        }
      })
    );
  }

  // Método para obtener el número de control de despacho
  getNumeroControldesp(): Observable<string> {
 //   console.log('Enviando solicitud para obtener el número de control de despacho');
    return this.http.get<any>(this.apiUrlDespacho).pipe(
      map(response => {
        if (response && response.ncontroldesp) {
          console.log('Número de control de despacho recibido:', response.ncontroldesp);
          return String(response.ncontroldesp);
        } else {
          console.error('El campo ncontroldesp no está presente en la respuesta.');
          return '';
        }
      }),
      tap({
        next: (controlData) => {
          if (controlData) {
            console.log('Número de control de despacho procesado:', controlData);
          }
        },
        error: (error) => {
          console.error('Error al obtener el número de control de despacho:', error);
        }
      })
    );
  }
  
  actualizarNumeroControldesp(nuevoControl: string): Observable<any> {
    //   console.log('Enviando solicitud para actualizar el número de control de recepción con:', nuevoControl);
       return this.http.put<any>(`${this.apiUrlDespacho}/actualizar`, { ncontroldesp: nuevoControl }).pipe(
         tap({
           next: (response) => {
             console.log('Respuesta recibida en la actualización del número de control de despacho:', response);
           },
           error: (error) => {
             console.error('Error al actualizar el número de control de recepción:', error);
           }
         })
       );
     }


}
