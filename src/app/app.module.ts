import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// Importa los módulos de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Agregado

// Importa otros módulos necesarios
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppRoutesModule } from './app.routes';

// Importa componentes
import { RformulariounoComponent } from './rformulariouno/rformulariouno.component';
import { ListaprodComponent } from './listaprod/listaprod.component';
import { BuscaprodComponent } from './buscaprod/buscaprod.component';
import { BuscaclienteComponent } from './buscacliente/buscacliente.component';
import { BuscaloteComponent } from './buscalote/buscalote.component';
import { NewdespachoComponent } from './newdespacho/newdespacho.component';
import { BotonpanelComponent } from './botonpanel/botonpanel.component';
import { Cava1Component } from './cava1/cava1.component';
import { Cava2Component } from './cava2/cava2.component';
import { Cava3Component } from './cava3/cava3.component';
import { Cava4Component } from './cava4/cava4.component';
import { Cava5Component } from './cava5/cava5.component';
import { Cava6Component } from './cava6/cava6.component';
import { Cava7Component } from './cava7/cava7.component';
import { Cava8Component } from './cava8/cava8.component';
import { Cava9Component } from './cava9/cava9.component';
import { Cava10Component } from './cava10/cava10.component';
import { ContenedorCavasComponent } from './contenedor-cavas/contenedor-cavas.component';

// Importa servicios
import { ProductService } from './services/product.service';
import { ClienteService } from './services/cliente.service'; // Ruta correcta
import { ModalService } from './services/modal.service'; // Ajusta la ruta según tu estructura
import { DataRecepcionService } from './services/datarecepcion.service'; // Asegúrate de que esté correctamente importado
import { NumeroControlService } from './services/numero-control.service';
import { DataTotalesService } from './services/datatotales.service';
import { TotalesdespachoService } from './services/totalesdespacho.service';
import { PdfGeneratorService } from './services/pdf-generator.service';
import { PdfGeneratorService2 } from './services/pdf-generator2.service';
import { MermaService } from './services/merma.service';


@NgModule({
  declarations: [
    AppComponent,
    RformulariounoComponent,
    ListaprodComponent,
    BuscaprodComponent,
    BuscaclienteComponent,
    BuscaloteComponent,
    NewdespachoComponent,
    BotonpanelComponent,
    Cava1Component,
    Cava2Component,
    Cava3Component,
    Cava4Component,
    Cava5Component,
    Cava6Component,
    Cava7Component,
    Cava8Component,
    Cava9Component,
    Cava10Component,
    ContenedorCavasComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutesModule,
    AgGridModule,
    RouterModule,
   MatSnackBarModule
  ],
  providers: [provideHttpClient(), ProductService, ClienteService, ModalService,  DataRecepcionService, NumeroControlService, TotalesdespachoService, DataTotalesService, PdfGeneratorService, PdfGeneratorService2, MermaService], // Agregado ModalService
  bootstrap: [AppComponent]
})
export class AppModule { }
