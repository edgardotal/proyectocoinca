import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../services/cliente.service';

@Component({
  selector: 'app-buscacliente',
  templateUrl: './buscacliente.component.html',
  styleUrls: ['./buscacliente.component.scss']
})
export class BuscaclienteComponent implements OnInit, AfterViewInit {
  searchControl = new FormControl(''); // Control para la búsqueda
  clientes: Cliente[] = []; // Todos los clientes
  filteredClientes: Cliente[] = []; // Clientes filtrados
  currentIndex: number = -1; // Índice actual de navegación

  @Output() clienteSelected = new EventEmitter<Cliente>(); // Emitir cliente seleccionado
  @Output() close = new EventEmitter<void>();  // Evento para notificar el cierre del modal
  @ViewChild('searchInput') searchInput!: ElementRef; // Referencia al input de búsqueda

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    // Obtener la lista de clientes desde el servicio
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.filteredClientes = clientes; // Inicialmente, todos los clientes están filtrados
      },
      error: error => {
        console.error('Error al obtener clientes:', error);
      }
    });

    // Filtrar los clientes cuando cambia el valor de la búsqueda
    this.searchControl.valueChanges.subscribe(value => {
      this.filterClientes(value ?? '');
    });
  }

  ngAfterViewInit(): void {
    // Enfocar el campo de búsqueda cuando el modal se ha inicializado
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus(); // Asegurarse de enfocar el campo
      }
    }, 0);
  }

  private filterClientes(query: string): void {
    const lowerCaseQuery = query.trim().toLowerCase(); // Convertir a minúsculas y recortar espacios
    
    // Si no hay una búsqueda, mostrar todos los clientes
    this.filteredClientes = lowerCaseQuery === '' 
      ? this.clientes 
      : this.clientes.filter(cliente => cliente.nombre.toLowerCase().includes(lowerCaseQuery));

    // Reiniciar el índice de navegación
    this.currentIndex = -1;
  }

  // Seleccionar un cliente y emitir el evento
  selectCliente(cliente: Cliente): void {
    this.clienteSelected.emit(cliente);
    this.currentIndex = -1; // Reiniciar el índice después de seleccionar
  }

  // Manejar eventos de teclado en el campo de búsqueda
  onSearchKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    // Si no hay clientes filtrados, salir
    if (this.filteredClientes.length === 0) {
      return;
    }

    // Navegar hacia abajo en los resultados
    if (key === 'ArrowDown') {
      event.preventDefault();  // Prevenir el comportamiento por defecto del input
      if (this.currentIndex === -1) {
        this.currentIndex = 0; // Comienza la selección en el primer cliente si no hay selección previa
      } else {
        this.focusNextItem(); // Mover al siguiente ítem
      }
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      this.focusPreviousItem(); // Mover al ítem anterior
    } else if (key === 'Enter' && this.currentIndex === -1 && this.filteredClientes.length > 0) {
      // Si no hay navegación previa y se presiona Enter
      event.preventDefault();
      this.currentIndex = 0;
      this.focusCurrentItem();
    }
  }

  // Manejar eventos de teclado en las filas de resultados
  onRowKeyDown(event: KeyboardEvent, index: number): void {
    const key = event.key;

    if (key === 'ArrowDown') {
      event.preventDefault();
      this.focusNextItem(); // Mover al siguiente ítem
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      this.focusPreviousItem(); // Mover al ítem anterior
    } else if (key === 'Enter') {
      // Si se presiona Enter en una fila
      event.preventDefault();
      if (this.currentIndex >= 0 && this.currentIndex < this.filteredClientes.length) {
        this.selectCliente(this.filteredClientes[this.currentIndex]);
      }
    }
  }

  private focusNextItem(): void {
    // Navegar hacia abajo en la lista
    if (this.currentIndex < this.filteredClientes.length - 1) {
      this.currentIndex++;
      this.focusCurrentItem();
    }
  }

  private focusPreviousItem(): void {
    // Navegar hacia arriba en la lista
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.focusCurrentItem();
    } else {
      this.currentIndex = -1; // Si se mueve más allá del primer ítem, regresar el foco al input
      this.searchInput.nativeElement.focus();
    }
  }

  // Enfocar el ítem actual en la lista
  private focusCurrentItem(): void {
    const items = document.querySelectorAll<HTMLElement>('.list-group-item');
    if (items.length > 0 && this.currentIndex >= 0 && this.currentIndex < items.length) {
      const item = items[this.currentIndex];
      item.focus();
      item.scrollIntoView({ block: 'nearest' }); // Asegura que el ítem sea visible
    }
  }

  // Cerrar el modal
  onClose(): void {
    this.close.emit(); // Emitir evento para cerrar el modal
  }
}
