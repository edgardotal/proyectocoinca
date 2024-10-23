import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CavaPosicionesService } from '../services/cava-posiciones.service'; // Importar el servicio

interface VerticalPosition {
  id: string;
  status: number;  // Cambia de string a number
}

interface HorizontalPosition {
  id: string;
  verticals: VerticalPosition[];
}

interface Row {
  id: string;
  horizontals: HorizontalPosition[];
}

@Component({
  selector: 'app-cavas-a',
  templateUrl: './cavas-a.component.html',
  styleUrls: ['./cavas-a.component.scss']
})
export class CavasAComponent implements AfterViewInit {
  title = 'Coinca';

  @Output() reiniciar = new EventEmitter<void>();  // Evento para emitir hacia el padre

  // Método que emite el evento cuando se necesite reiniciar
  emitirReinicio(): void {
    this.reiniciar.emit();  // Emitir el evento hacia el padre
  }

  @ViewChild('cavaContainer') cavaContainer!: ElementRef;

  // Estructura de la cava de almacenamiento
  cava: Row[] = [
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
    { id: 'F13', horizontals: this.generateHorizontals('F13') },
    { id: 'F14', horizontals: this.generateHorizontals('F14') },
    { id: 'F15', horizontals: this.generateHorizontals('F15') },
    { id: 'F16', horizontals: this.generateHorizontals('F16') },
    { id: 'F17', horizontals: this.generateHorizontals('F17') },
    { id: 'F18', horizontals: this.generateHorizontals('F18') },
    { id: 'F19', horizontals: this.generateHorizontals('F19') },
    { id: 'F20', horizontals: this.generateHorizontals('F20') },
    { id: 'F21', horizontals: this.generateHorizontals('F21') },
    { id: 'F22', horizontals: this.generateHorizontals('F22') },
    { id: 'F23', horizontals: this.generateHorizontals('F23') },
    { id: 'F24', horizontals: this.generateHorizontals('F24') },
    { id: 'F25', horizontals: this.generateHorizontals('F25') },
    { id: 'F26', horizontals: this.generateHorizontals('F26') },
    { id: 'F27', horizontals: this.generateHorizontals('F27') },
    { id: 'F28', horizontals: this.generateHorizontals('F28') }
  ];

  generateHorizontals(rowId: string): HorizontalPosition[] {
    return [
      { id: `${rowId}-H1`, verticals: this.generateVerticals(`${rowId}-H1`) },
      { id: `${rowId}-H2`, verticals: this.generateVerticals(`${rowId}-H2`) },
      { id: `${rowId}-H3`, verticals: this.generateVerticals(`${rowId}-H3`) },
      { id: `${rowId}-H4`, verticals: this.generateVerticals(`${rowId}-H4`) }
    ];
  }

  generateVerticals(horizontalId: string): VerticalPosition[] {
    return [
      { id: `${horizontalId}-V1`, status: 0 },
      { id: `${horizontalId}-V2`, status: 0 }
    ];
  }

  // Dividir posiciones entre izquierda y derecha y luego invertir el orden
  positionsLeft: Row[] = this.cava.filter(row => parseInt(row.id.slice(1)) >= 15).reverse();
  positionsRight: Row[] = this.cava.filter(row => parseInt(row.id.slice(1)) < 15).reverse();

  ngAfterViewInit() {
    if (this.cavaContainer) {
      console.log(this.cavaContainer.nativeElement); // Ejemplo de uso
      this.cavaContainer.nativeElement.scrollTop = this.cavaContainer.nativeElement.scrollHeight;
    }
    this.cargarEstadosPosiciones(); // Cargar estados de las posiciones al iniciar
    window.scrollTo(0, document.body.scrollHeight);
  }

  constructor(
    public dialog: MatDialog,
    private cavaPosicionesService: CavaPosicionesService // Inyecta el servicio
  ) {}

  openDialog(horizontal: HorizontalPosition, palette: string): void {
    // Lógica para abrir el diálogo
  }

  cargarEstadosPosiciones() {
    this.cava.forEach(row => {
      row.horizontals.forEach(horizontal => {
        horizontal.verticals.forEach(vertical => {
          const fila = parseInt(row.id.replace('F', ''));
          const nivel = vertical.id.includes('-V1') ? 1 : 2;
          const posicion = parseInt(horizontal.id.split('-H')[1]);
  
          // Llamada al servicio para obtener el estado de cada posición
          this.cavaPosicionesService.getEstadoPosicion(1, fila, nivel, posicion).subscribe(res => {
            res.forEach(posicionData => {
              // Solo actualiza el estado si cava_id, fila, nivel y posicion coinciden
              if (posicionData.cava_id === 1 && 
                  posicionData.fila === fila && 
                  posicionData.nivel === nivel && 
                  posicionData.posicion === posicion) {
                // Asignación de estado para cada botón correctamente
                vertical.status = posicionData.estado === 'ocupado' ? 1 : 0; // 1 para ocupado, 0 para disponible
              }
            });
          });
        });
      });
    });
  }
  
  
 // Dividir posiciones entre izquierda y derecha

// Invertir las posiciones horizontales solo para el panel derecho
ngOnInit(): void {
  // Invertimos las posiciones horizontales del panel derecho para que se vean de derecha a izquierda
  this.positionsRight = this.positionsRight.map(row => {
    return {
      ...row,
      horizontals: row.horizontals.slice().reverse()  // Invertir las posiciones horizontales
    };
  });

  this.cargarEstadosPosiciones(); // Cargar los estados de las posiciones al iniciar el componente
 // console.log(this.positionsLeft);
}



}
