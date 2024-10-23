import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CavaPosicionesService {
  private apiUrl = 'http://localhost:3000/api'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  // Obtener información sobre una cava específica
  getCava(cavaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ocupadas/${cavaId}`);
  }

  // Obtener el estado de una posición específica
  getEstadoPosicion(cavaId: number, fila: number, nivel: number, posicion: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posiciones/${cavaId}/fila/${fila}/nivel/${nivel}/posicion/${posicion}`);
  }

  // Actualizar el estado de una posición específica
  updateEstadoPosicion(
    cavaId: number, 
    fila: number, 
    nivel: number, 
    posicion: number, 
    nuevoEstado: string, 
    nuevocontrol: string
  ): Observable<any> {
    // Ajustamos la URL para incluir el segmento 'nuevocontrol'
    const url = `${this.apiUrl}/posiciones/${cavaId}/fila/${fila}/nivel/${nivel}/posicion/${posicion}/ncontrol/${nuevocontrol}`;
  
    // El cuerpo solo contiene nuevoEstado
    const body = { nuevoEstado };
  
    return this.http.put(url, body);
  }
  
}
