import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-contenedor-cavas',
  templateUrl: './contenedor-cavas.component.html',
  styleUrls: ['./contenedor-cavas.component.scss']
})
export class ContenedorCavasComponent {
  // Definir las cavas
  cavas: string[] = [
    'Cava1', 'Cava2', 'Cava3', 'Cava4', 'Cava5', 
    'Cava6', 'Cava7', 'Cava8', 'Cava9', 'Cava10'
  ];

  constructor(private modalService: ModalService) {}

  // Método para abrir el modal correspondiente a cada cava
  openCavaModal(index: number) {
    switch(index) {
      case 0:
        this.modalService.openCava1Modal();
        break;
      case 1:
        this.modalService.openCava2Modal();
        break;
      case 2:
        this.modalService.openCava3Modal();
        break;
      case 3:
        this.modalService.openCava4Modal();
        break;
      case 4:
        this.modalService.openCava5Modal();
        break;
      case 5:
        this.modalService.openCava6Modal();
        break;
      case 6:
        this.modalService.openCava7Modal();
        break;
      case 7:
        this.modalService.openCava8Modal();
        break;
      case 8:
        this.modalService.openCava9Modal();
        break;
      case 9:
        this.modalService.openCava10Modal();
            break;
      default:
        console.warn('No hay un modal correspondiente para este índice.');
    }
  }
}
