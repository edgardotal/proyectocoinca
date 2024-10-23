import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModalRef
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-buscaprod',
  templateUrl: './buscaprod.component.html',
  styleUrls: ['./buscaprod.component.scss']
})
export class BuscaprodComponent implements OnInit, AfterViewInit {
  searchControl = new FormControl('');
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;

  @Output() productSelected = new EventEmitter<Product>();
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  public currentIndex: number = -1;
  private modalRef: NgbModalRef | null = null; // Variable para almacenar la referencia del modal

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: error => {
        console.error('Error al obtener productos:', error);
      }
    });

    this.searchControl.valueChanges.subscribe(value => {
      this.filterProducts(value ?? '');
    });
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }

  private filterProducts(query: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    this.currentIndex = -1; // Resetea el índice al filtrar
  }

  selectProduct(product: Product): void {
    this.productSelected.emit(product);
    this.currentIndex = -1; // Resetea el índice después de la selección
    this.closeModal(); // Cierra el modal al seleccionar un producto
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    event.stopPropagation(); // Detiene la propagación del evento
    const key = event.key;

   // console.log('Key pressed in search:', key); // Depuración

    if (key === 'ArrowDown') {
      event.preventDefault();
      if (this.filteredProducts.length > 0) {
        this.currentIndex = 0; // Inicia la selección en el primer producto
        this.focusCurrentItem();
      }
    } else if (key === 'Enter') {
      event.preventDefault();
      if (this.currentIndex === -1 && this.filteredProducts.length > 0) {
        this.currentIndex = 0;
        this.focusCurrentItem();
      } else if (this.currentIndex >= 0) {
        this.selectProduct(this.filteredProducts[this.currentIndex]);
      }
    } else if (key === 'Escape') {
      event.preventDefault();
      this.closeModal(); // Cierra el modal
      this.currentIndex = -1; // Resetea el índice
    }
  }

  onRowKeyDown(event: KeyboardEvent, index: number): void {
    event.stopPropagation(); // Detener la propagación del evento

    const key = event.key;
   // console.log('Key pressed in row:', key); // Depuración

    if (key === 'ArrowDown') {
      event.preventDefault();
      this.focusNextItem();
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      this.focusPreviousItem();
    } else if (key === 'Enter') {
      event.preventDefault();
      if (this.currentIndex >= 0) {
        this.selectProduct(this.filteredProducts[this.currentIndex]);
      }
    }
  }

  private focusNextItem(): void {
    if (this.currentIndex < this.filteredProducts.length - 1) {
      this.currentIndex++;
      this.focusCurrentItem();
    }
  }

  private focusPreviousItem(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.focusCurrentItem();
    } else {
      this.currentIndex = -1; // Regresa al campo de búsqueda si se sube desde el primer elemento
      this.searchInput.nativeElement.focus();
    }
  }

  private focusCurrentItem(): void {
    const items = document.querySelectorAll<HTMLElement>('.list-group-item');
    if (items.length > 0 && this.currentIndex >= 0 && this.currentIndex < items.length) {
      const item = items[this.currentIndex];
      item.focus();
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Desplazar el elemento al área visible
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePressed(event: KeyboardEvent): void {
    this.closeModal(); // Cierra el modal cuando se presiona Escape
  }

  private closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close(); // Cierra el modal
    }
  }

  public setModalRef(modalRef: NgbModalRef): void {
    this.modalRef = modalRef; // Establece la referencia del modal
  }

  private focusOnCellC(): void {
    // Usamos 'HTMLElement' para que tenga el método 'focus'
    const cellC = document.querySelector('ag-grid-element-selector .ag-cell[col-id="c"]') as HTMLElement;

    if (cellC) {
      cellC.focus(); // Ahora 'cellC' tendrá el método 'focus'
    } else {
      console.warn('No se encontró la celda "c".');
    }
  }
}
