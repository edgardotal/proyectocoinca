import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BuscaprodComponent } from '../buscaprod/buscaprod.component'; // Ajusta la ruta según tu estructura
import { BuscaclienteComponent } from '../buscacliente/buscacliente.component'; // Ajusta la ruta según tu estructura
import { BuscaloteComponent } from '../buscalote/buscalote.component'; // Asegúrate de ajustar la ruta correctamente
import { Cava1Component } from '../cava1/cava1.component';
import { Cava2Component } from '../cava2/cava2.component'; // Asegúrate de que exista este componente
import { Cava3Component } from '../cava3/cava3.component'; // Asegúrate de que exista este componente
import { Cava4Component } from '../cava4/cava4.component'; // Asegúrate de que exista este componente
import { Cava5Component } from '../cava5/cava5.component'; // Asegúrate de que exista este componente
import { Cava6Component } from '../cava6/cava6.component'; // Asegúrate de que exista este componente
import { Cava7Component } from '../cava7/cava7.component'; // Asegúrate de que exista este componente
import { Cava8Component } from '../cava8/cava8.component'; // Asegúrate de que exista este componente
import { Cava9Component } from '../cava9/cava9.component'; // Asegúrate de que exista este componente
import { Cava10Component } from '../cava10/cava10.component'; // Asegúrate de que exista este componente

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}


  
  openModal(component: any, size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen' = 'md'): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: size });
    
    // Agregar estilos personalizados para fullscreen
    if (size === 'fullscreen') {
      modalRef.componentInstance.fullscreen = true; // O cualquier otro ajuste que necesites
      modalRef.result.then(
        () => {
          // Lógica para manejar el resultado al cerrar el modal
        },
        () => {
          // Lógica para manejar el cierre del modal sin resultado
        }
      );
    }

    return modalRef;
  }
  
  openSearchProductModal(size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): NgbModalRef {
    return this.openModal(BuscaprodComponent, size);
  }

  openSearchClientModal(size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): NgbModalRef {
    return this.openModal(BuscaclienteComponent, size);
  }

  openSearchLoteModal(size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): NgbModalRef {
    return this.openModal(BuscaloteComponent, size);
  }

  // Métodos para modales específicos de Cavas en pantalla completa
  openCava1Modal(): NgbModalRef {
    return this.openModal(Cava1Component, 'fullscreen');
  }

  openCava2Modal(): NgbModalRef {
    return this.openModal(Cava2Component, 'fullscreen');
  }

  openCava3Modal(): NgbModalRef {
    return this.openModal(Cava3Component, 'fullscreen');
  }

  openCava4Modal(): NgbModalRef {
    return this.openModal(Cava4Component, 'fullscreen');
  }

  openCava5Modal(): NgbModalRef {
    return this.openModal(Cava5Component, 'fullscreen');
  }

  openCava6Modal(): NgbModalRef {
    return this.openModal(Cava6Component, 'fullscreen');
  }

  openCava7Modal(): NgbModalRef {
    return this.openModal(Cava7Component, 'fullscreen');
  }

  openCava8Modal(): NgbModalRef {
    return this.openModal(Cava8Component, 'fullscreen');
  }

  openCava9Modal(): NgbModalRef {
    return this.openModal(Cava9Component, 'fullscreen');
  }

  openCava10Modal(): NgbModalRef {
    return this.openModal(Cava10Component, 'fullscreen');
  }

}
