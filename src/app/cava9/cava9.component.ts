import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CavaPosicionesService } from '../services/cava-posiciones.service';

interface VerticalPosition {
  id: string;
  status: number; // Cambia de string a number
}

interface HorizontalPosition {
  id: string;
  verticals: VerticalPosition[]; // Ahora solo contendrá un nivel
}

interface Row {
  id: string;
  horizontals: HorizontalPosition[]; // Mantenemos el mismo formato
}

@Component({
  selector: 'app-cava9',
  templateUrl: './cava9.component.html',
  styleUrls: ['./cava9.component.scss']
})
export class Cava9Component implements AfterViewInit, OnInit {
  
  @Output() reiniciar = new EventEmitter<void>();
  @ViewChild('cavaContainer') cavaContainer!: ElementRef;

  cava: Row[] = this.initializeCava();

  initializeCava(): Row[] {
    return [
      { id: 'F1', horizontals: this.generateHorizontals('F1') },
      { id: 'F2', horizontals: this.generateHorizontals('F2') },
      { id: 'F3', horizontals: this.generateHorizontals('F3') },
      { id: 'F4', horizontals: this.generateHorizontals('F4') },
      { id: 'F5', horizontals: this.generateHorizontals('F5') },
      { id: 'F6', horizontals: this.generateHorizontals('F6') },
      { id: 'F7', horizontals: this.generateHorizontals('F7') },
      { id: 'F8', horizontals: this.generateHorizontals('F8') },
      { id: 'F9', horizontals: this.generateHorizontals('F9') },
      { id: 'F10', horizontals: this.generateHorizontals('F10') },
      { id: 'F11', horizontals: this.generateHorizontals('F11') },
      { id: 'F12', horizontals: this.generateHorizontals('F12') },
      { id: 'F13', horizontals: this.generateHorizontals('F13') }
    ];
  }

  generateHorizontals(rowId: string): HorizontalPosition[] {
    return Array.from({ length: 4 }, (_, index) => ({
      id: `${rowId}-H${index + 1}`,
      verticals: [{ id: `${rowId}-H${index + 1}-V1`, status: 0 }]
    }));
  }
  positionsLeft: Row[] = this.cava;

  ngAfterViewInit() {
    if (this.cavaContainer) {
      console.log(this.cavaContainer.nativeElement);
      this.cavaContainer.nativeElement.scrollTop = this.cavaContainer.nativeElement.scrollHeight;
    }
    this.cargarEstadosPosiciones();
    window.scrollTo(0, document.body.scrollHeight);
  }

  constructor(
    public dialog: MatDialog,
    private cavaPosicionesService: CavaPosicionesService
  ) {}

  openDialog(horizontal: HorizontalPosition, palette: string): void {
    // Lógica para abrir el diálogo
  }

  cargarEstadosPosiciones() {
    this.cava.forEach(row => {
      row.horizontals.forEach(horizontal => {
        const fila = parseInt(row.id.replace('F', ''));
        const posicion = parseInt(horizontal.id.split('-H')[1]);

        this.cavaPosicionesService.getEstadoPosicion(9, fila, 1, posicion).subscribe(res => {
          res.forEach(posicionData => {
            if (posicionData.cava_id === 9 && posicionData.fila === fila) {
              horizontal.verticals[0].status = posicionData.estado === 'ocupado' ? 1 : 0;
            }
          });
        });
      });
    });
  }

  ngOnInit(): void {
    this.cargarEstadosPosiciones();
  }
}
