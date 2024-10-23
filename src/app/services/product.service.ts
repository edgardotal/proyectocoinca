import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// los campos de producto a inyectar en el grid
// cuando seleccione el producto desde el modal
export interface Product {
  id: number;
  codigo: string;
  descripcion: string;
  unidad: number;
  bultos: number;
  kgsxunidad: number;
  // Añade aquí otras propiedades si es necesario
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/productos'; // Cambia el puerto si es necesario
  private selectedProductSubject = new BehaviorSubject<Product | null>(null); // Subject para el producto seleccionado
  selectedProduct$ = this.selectedProductSubject.asObservable(); // Observable expuesto para suscripciones

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  selectProduct(product: Product): void {
    this.selectedProductSubject.next(product); // Emitir el producto seleccionado
  }
}
