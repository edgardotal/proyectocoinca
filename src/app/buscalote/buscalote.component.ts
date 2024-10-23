import { Component, OnInit, Input } from '@angular/core';
import { DataDespachoService } from '../services/data-despacho.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscalote',
  templateUrl: './buscalote.component.html',
  styleUrls: ['./buscalote.component.scss']
})
export class BuscaloteComponent implements OnInit {
  
  @Input() cava!: string;  // Recibe la cava como input desde el componente padre
  lotes: any[] = [];
  loteFiltro: string = ''; // Variable para almacenar el valor del filtro de búsqueda

  constructor(
    private dataDespachoService: DataDespachoService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.cargarLotesPorCava(); // Cargar lotes filtrados por cava al iniciar
  }

  // Carga los lotes de la cava seleccionada
  cargarLotesPorCava() {
    this.dataDespachoService.obtenerDatosPorCava(this.cava).subscribe(
      (data) => {
        this.lotes = data; // Almacena los lotes recibidos
        console.log('Lotes filtrados por cava:', this.lotes);
      },
      (error) => {
        console.error('Error al cargar lotes:', error);
      }
    );
  }

  // Método para filtrar lotes en función del número de lote introducido
  filtrarLotes() {
    if (!this.loteFiltro) {
      return this.lotes; // Si no hay filtro, retornar todos los lotes
    }
    return this.lotes.filter(lote => lote.lote.toLowerCase().includes(this.loteFiltro.toLowerCase()));
  }

  // Cierra el modal y devuelve el lote seleccionado
  seleccionarLote(lote: any) {
    this.activeModal.close(lote);
  }
}
