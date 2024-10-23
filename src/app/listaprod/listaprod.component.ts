import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService, Product } from '../services/product.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-listaprod',
  templateUrl: './listaprod.component.html',
  styleUrls: ['./listaprod.component.scss']
})
export class ListaprodComponent implements ICellRendererAngularComp, OnInit {
  public productForm!: FormGroup;
  public products: Product[] = [];
  public filteredProducts: Product[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      searchTerm: [''],
      selectedProduct: [null],
    });

    this.loadProducts();
  }

  agInit(params: any): void {
    this.products = params.value;
    this.filteredProducts = [...this.products]; // Inicialmente, muestra todos los productos
  }

  refresh(params: any): boolean {
    return false;
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = [...this.products]; // Muestra todos los productos inicialmente
        console.log('Productos cargados:', this.products);
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }

  filterProducts(): void {
    const searchTerm = this.productForm.get('searchTerm')?.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.descripcion.toLowerCase().includes(searchTerm)
    );
  }

  selectProduct(product: Product): void {
    this.productForm.patchValue({ selectedProduct: product.id });
    console.log('Producto seleccionado:', product.descripcion);
    // Puedes emitir un evento aquí o hacer algo más si es necesario
  }

  onSubmit(): void {
    console.log('Producto seleccionado:', this.productForm.value.selectedProduct);
  }
}
