import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Define la interfaz Cliente con los campos que necesitas
export interface Cliente {
  id: number;
  codigo: string;
  nombre: string;
  fechaurecepcion?: Date;
  fechauentrega?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = '/api/clientes'; // Cambia el endpoint si es necesario
  private selectedClienteSubject = new BehaviorSubject<Cliente | null>(null); // Subject para el cliente seleccionado
  selectedCliente$ = this.selectedClienteSubject.asObservable(); // Observable expuesto para suscripciones

  constructor(private http: HttpClient) { }

  // Método para obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Método para seleccionar un cliente y emitirlo
  selectCliente(cliente: Cliente): void {
    this.selectedClienteSubject.next(cliente); // Emitir el cliente seleccionado
  }
}
