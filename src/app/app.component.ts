import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuVisible: boolean = true;   // Controla la visibilidad del menú
  selectedForm: string = '';     // Variable que controla qué formulario mostrar
  title: string = '';      // Título que cambiará según el formulario

  // Función para mostrar el formulario según la opción seleccionada
  showForm(form: string) {
    this.menuVisible = false; // Oculta el menú cuando se selecciona una opción
    this.selectedForm = form; // Actualiza la opción seleccionada

    // Cambia el título según la opción seleccionada
    if (form === 'recepcion') {
      this.title = 'Modulo de Recepción';
    } else if (form === 'despacho') {
      this.title = 'Modulo de Despacho';
    } else if (form === 'cavas') {
      this.title = 'Formulario de Cavas';
    }
  }

  // Lógica para reiniciar el componente hijo y mostrar el menú nuevamente
  reiniciarComponente() {
    console.log('Formulario reiniciado');
    this.menuVisible = true;  // Muestra el menú
    this.selectedForm = '';    // Resetea el formulario seleccionado
    this.title = 'Coinca';     // Resetea el título
  }
}
