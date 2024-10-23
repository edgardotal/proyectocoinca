import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataDespachoService } from '../services/data-despacho.service';
import { Despacho} from '../../../models/despacho.model';
import { Cliente } from '../services/cliente.service';
import { BuscaclienteComponent } from '../buscacliente/buscacliente.component';
import { BuscaloteComponent } from '../buscalote/buscalote.component';
import { NumeroControlService } from '../services/numero-control.service';
import { PdfGeneratorService2 } from '../services/pdf-generator2.service';
import { TotalXFilasProdService } from '../services/total-x-filas-prod.service'; // Asegúrate de importar el servicio
import { CavaPosicionesService } from '../services/cava-posiciones.service';
import { TotalesdespachoService } from '../services/totalesdespacho.service';




import { MatSnackBar } from '@angular/material/snack-bar';




import { 
  GridApi,                   // API for grid operations
  ColDef,                    // Column definitions
 
  GridOptions,               // Options for grid configuration
  CellEditingStoppedEvent,   // Event when cell editing is stopped
  CellEvent               

} from 'ag-grid-community';

import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-newdespacho',
  templateUrl: './newdespacho.component.html',
  styleUrls: ['./newdespacho.component.scss']
})
export class NewdespachoComponent {
 
  formulario!: FormGroup;
  isModalOpen: boolean = false;
  currentDate: string;
  numeroControl: string = '';




  idsAgregados: Set<number>;


  brutoTotal: number = 0; // Inicializar con un número
  tcg25: number = 0;
  tcg24: number = 0;
  tcg23: number = 0;
  tcg22: number = 0;
  tcm: number = 0;
  tcp: number = 0;
  tsacos: number = 0;
  testiba: number = 0;
  ttara: number = 0;
  tneto: number = 0;
  tcestas: number = 0;
  tbultos: number = 0;
  tunidad: number = 0;



 
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private despachoService: DataDespachoService,
    private numeroControlService: NumeroControlService,
    private snackBar: MatSnackBar,
    private totalXFilasProdService: TotalXFilasProdService,
    private cavaPosicionesService: CavaPosicionesService,
    private pdfGenerator : PdfGeneratorService2,
    private totalesdespachoService: TotalesdespachoService // Agrega el servicio aquí
  ) {
    
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    this.formulario = this.fb.group({
      cliente: ['', Validators.required],
      fecha: [this.currentDate],
      ncontrol: ['', Validators.required],
      search: [''],
    });
  
  
    this.idsAgregados = new Set<number>(); // Inicialización aquí
  
  }

  ngOnInit(): void {
    this.formulario.patchValue({
      fecha: new Date().toISOString().substring(0, 10)
    });


    this.numeroControlService.getNumeroControldesp().subscribe({
      next: (response: string) => {
        this.numeroControl = response;
        this.formulario.get('ncontrol')?.setValue(this.numeroControl);
      },
      error: (err) => {
        console.error('Error al obtener el número de control:', err);
        this.numeroControl = '';
      }
    });


    setTimeout(() => {
      this.openSearchClientModal();
    }, 0);



    this.brutoTotal = this.calculateBrutoTotal();
    this.tcg25 = this.calculateTcg25Total();
    this.tcg24 = this.calculateTcg24Total();
    this.tcg23 = this.calculateTcg23Total();
    this.tcg22 = this.calculateTcg22Total();
    this.tcm = this.calculateTcmTotal();
    this.tcp = this.calculateTcpTotal();
    this.tsacos = this.calculateTsacosTotal();
    this.testiba = this.calculateTestibaTotal();
    this.ttara = this.calculateTtaraTotal();
    this.tneto = this.calculateTnetoTotal();
    this.tcestas = this.calculateTcestasTotal();
    this.tbultos = this.calculateTbultosTotal();
    this.tunidad = this.calculateTunidadTotal();



    
  }




  openSearchClientModal(): void {
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;

    const modalRef = this.modalService.open(BuscaclienteComponent);
    modalRef.componentInstance?.clienteSelected.subscribe({
      next: (cliente: Cliente) => {
        this.handleClientSelected(cliente);
        modalRef.close();
        this.isModalOpen = false;
      },
      error: (err: any) => {
        console.error('Error al seleccionar cliente:', err);
        this.isModalOpen = false;
      }
    });

    modalRef.result.finally(() => {
      this.isModalOpen = false;
    });
  }


  handleClientSelected(cliente: Cliente): void {
    const clienteControl = this.formulario.get('cliente');
    if (clienteControl) {
      clienteControl.setValue(cliente.nombre);
    }
  }
 


  gridOptions: GridOptions = {
    pagination: false,
    onCellEditingStopped: this.onCellEditingStopped.bind(this),
    onCellKeyDown: this.onCellKeyDown.bind(this), 

    onGridReady: this.onGridReady.bind(this),
   
   
  };
  

  onGridReady(params: any): void {
    this.gridApi = params.api; 
       
  }
  


// apertura de ventana para selecionar lote
openSearchLoteModal(cava: string): void {
  const modalRef = this.modalService.open(BuscaloteComponent);
  modalRef.componentInstance.cava = cava;

  modalRef.result.then((lote: Despacho) => {
      if (lote) {
          this.handleLoteSelected(lote);
      }
  }).catch((error) => {
      console.error('Modal dismissed:', error);
  }).finally(() => {
      // Enfocar la celda "bruto" después de cerrar el modal
      setTimeout(() => {
          if (this.gridApi) {
              const rowIndex = this.rowData.length - 1; // Asegúrate de que estás enfocando la fila correcta
              const colKey = 'bruto'; // La clave de la columna que representa "bruto"
              this.gridApi.setFocusedCell(rowIndex, colKey);
              this.gridApi.startEditingCell({
                  rowIndex: rowIndex,
                  colKey: colKey
              });
          }
      }, 0);
  });
}

addNewRow(api: GridApi, newRow: any): void {
  if (api) {
      api.applyTransaction({ add: [newRow] }); // Agregar la nueva fila a la cuadrícula
  } else {
      console.error('gridApi no está definido');
  }
}




handleLoteSelected(lote: Despacho): void {
  console.log('Lote recibido:', lote);

  // Verificar si el ID ya está agregado
  if (this.idsAgregados.has(lote.id)) {
    alert('Este lote ya ha sido agregado.');
    return;
  }

  // Agregar el ID al conjunto
  this.idsAgregados.add(lote.id);

  // Crear un nuevo objeto de fila
  const newRow = {
    pe: lote.pe || 0,
    lote: lote.lote,
    producto: lote.producto,
    c: lote.c || '',
    f: lote.f || '',
    n: lote.n || '',
    p: lote.p || '',
    pos: lote.pos || '',
    bruto: lote.bruto || 0,
    gde25: lote.gde25 || 0,
    gde24: lote.gde24 || 0,
    gde23: lote.gde23 || 0,
    gde22: lote.gde22 || 0,
    med: lote.med || 0,
    peq: lote.peq || 0,
    sacos: lote.sacos || 0,
    est: lote.est || 0,
    tara: lote.tara || 0,
    neto: lote.neto || 0,
    totcesta: lote.totcesta || 0,
    bultos: lote.bultos || 0,
    unidad: lote.unidad || 0,
    recepcion_id: lote.id || 0,
    recepcion_ncontrol: lote.ncontrol || '',
  };

  // Agregar la nueva fila a rowData
  this.rowData.push(newRow);
  console.log('Nueva fila a agregar:', newRow);
  
  // Verificar si gridApi está disponible
  if (this.gridApi) {
    this.addNewRow(this.gridApi, newRow);
  } else {
    console.error('gridApi no está definido');
  }

  // Imprimir el estado actual de rowData
  console.log('Estado actual de rowData:', this.rowData);
}


// Método para enfocar la celda
// focusCell(rowIndex: number, colKey: string): void {
//   this.gridApi.setFocusedCell(rowIndex, colKey);
//   // Si deseas habilitar la edición también puedes llamarlo aquí
//   this.gridApi.startEditingCell({ rowIndex: rowIndex, column: colKey });
// }

  // Definir los tipos de datos que estarán en cada fila
  
  private gridApi: any;
  
  
  public rowData: any[] = []; // Inicializa tu array de datos

  // Asegurar que las columnas estén correctamente tipadas usando ColDef
  columnDefs: ColDef[] = [
    {
        headerName: 'PE',
        field: 'pe',
        width: 60,
        editable: false
    },
    { 
        field: 'lote', 
        headerName: 'Lote', 
        width: 140, 
        editable: false,
    },
    {
        field: 'producto',
        headerName: 'Producto',
        headerClass: 'header-producto',
        minWidth: 300,
        editable: false,
    },
    { 
        field: 'c', 
        headerName: 'Cava', 
        width: 70,
        editable: false,
    },
    {
        field: 'f',
        headerName: 'Fila',
        width: 70,
        editable: false,
    },
    {
        field: 'n',
        headerName: 'Nivel',
        width: 80,
        editable: false,
    },
    {
      field: 'pos',
      headerName: 'Pos.',
      width: 80,
      editable: false,
    },
    {
        field: 'bruto',
        headerName: 'Bruto', 
        width: 100,
        editable: true,
    },
    {
        field: 'gde25',
        headerName: 'G2,5',
        width: 70,
        editable: true,
    },
    {
        field: 'gde24',
        headerName: 'G2,4',
        width: 70,
        editable: true,
    },
    {
        field: 'gde23',
        headerName: 'G2,3',
        width: 70,
        editable: true,
    },
    {
        field: 'gde22',
        headerName: 'G2,2',
        width: 70,
        editable: true,
    },
    {
        field: 'med',
        headerName: 'Med.',
        width: 70,
        editable: true,
    },
    {
        field: 'peq',
        headerName: 'Peq.',
        width: 70,
        editable: true,
    },
      {
        field: 'sacos',
        headerName: 'Sacos',
        width: 80,
        editable: true,
    },
    {
      field: 'est',
      headerName: 'Est.',
      width: 60,
      editable: true,
         },
    {
        field: 'tara',
        headerName: 'Tara',
        width: 80,
        cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        pinned: 'right',
    },
    {
        field: 'neto',
        headerName: 'Neto',
        width: 100,
        cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        pinned: 'right',
    },
    {
        field: 'totcesta',
        headerName: 'T.Cesta',
        width: 90,
        cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        pinned: 'right',
    },
    {
        field: 'bultos',
        headerName: 'Bultos',
        width: 80,
        cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        pinned: 'right',
    },
    {
        field: 'unidad',
        headerName: 'Unidad',
        width: 90,
        cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
        editable: false,
        pinned: 'right',
    },

    {
      field: 'recepcion_id',
      headerName: 'Recepcion_id',
      width: 80,
      cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
      editable: false,
      pinned: 'right',
      hide: true,
  },
  {
    field: 'recepcion_ncontrol',
    headerName: 'Recepcion_ncontrol',
    width: 80,
    cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    pinned: 'right',
    hide: true,
}
];


onCellKeyDown(event: CellEvent<any>): void {  
  const { api, node, colDef } = event;
  const keyEvent = event.event as KeyboardEvent;

  // Detectar la tecla "Enter"
  if (keyEvent && keyEvent.key === 'Enter') {
    const allColumns = api.getColumnDefs()?.filter((column): column is ColDef => 'field' in column) || []; // Filtrar solo las columnas con 'field'

    if (allColumns.length > 0) {
      const currentIndex = allColumns.findIndex(column => column.field === colDef.field);
      const nextColumn = allColumns[currentIndex + 1];

      // Si estamos en la columna 'C', 'F' o 'N', mantener el foco
      if (colDef.field === 'C' || colDef.field === 'F' || colDef.field === 'N') {
        console.log(`En la columna ${colDef.field}, manteniendo el foco aquí`);
        keyEvent.preventDefault(); // Evitar el movimiento
        return; // Salir de la función sin hacer nada
      }

      // Mover a la siguiente celda en la misma fila
      if (nextColumn && nextColumn.field) {
        api.startEditingCell({
          rowIndex: node.rowIndex ?? 0, // Asegúrate de que sea un número
          colKey: nextColumn.field // colKey ahora siempre es un string
        });
      } else {
        // Si no hay más columnas, mover a la primera columna de la siguiente fila
        const nextRowIndex = (node.rowIndex ?? 0) + 1; // Asegúrate de que sea un número
        if (nextRowIndex < api.getDisplayedRowCount()) {
          const firstColumn = allColumns[0];
          if (firstColumn.field) { // Asegúrate de que 'firstColumn.field' no es undefined
            api.startEditingCell({
              rowIndex: nextRowIndex,
              colKey: firstColumn.field // colKey ahora siempre es un string
            });
          }
        }
      }
    }

    // Previene la acción predeterminada del "Enter"
    keyEvent.preventDefault();
  }

  // Detectar Ctrl + Enter para agregar nueva fila solo si estamos en la columna 'est'

}






/////////////////////////////////////////////

calculateBrutoTotal(): number {
  let totalBruto = 0;
  this.rowData.forEach(row => {
    // Convertir bruto a número para evitar problemas con cadenas
    totalBruto += parseFloat(row.bruto) || 0;
  });
  return totalBruto;
}



calculateTcg25Total(): number {
  return this.rowData.reduce((total, row) => total + (row.gde25 || 0), 0);
}

calculateTcg24Total(): number {
  return this.rowData.reduce((total, row) => total + (row.gde24 || 0), 0);
}

calculateTcg23Total(): number {
  return this.rowData.reduce((total, row) => total + (row.gde23 || 0), 0);
}

calculateTcg22Total(): number {
  return this.rowData.reduce((total, row) => total + (row.gde22 || 0), 0);
}

calculateTcmTotal(): number {
  return this.rowData.reduce((total, row) => total + (row.med || 0), 0);
}

calculateTcpTotal(): number {
  return this.rowData.reduce((total, row) => total + (row.peq || 0), 0);
}

calculateTsacosTotal(): number {
  return this.rowData.reduce((total, row) => total + (row.sacos || 0), 0);
}


// calculo de estiba es diferente de los demas pilas 
calculateTestibaTotal(): number {
  //console.log('Contenido de rowData en calculateTestibaTotal:', this.rowData);
  return this.rowData.reduce((count, row) => count + (row.producto ? 1 : 0), 0);
}




//////////////////
calculateTtaraTotal(): number {
  let totalTara = 0;
  this.rowData.forEach(row => {
    const taraValue = row.tara || 0;
   // console.log(`Tara en fila: ${taraValue}`);
    totalTara += taraValue;
  });
  //console.log(`Total de Tara calculado: ${totalTara}`);
  return totalTara;
}



calculateTnetoTotal(): number {
  return this.rowData.reduce((total, row) => total + (row.neto || 0), 0);
}

calculateTcestasTotal(): number {
  return this.rowData.reduce((total, row) => total + (row.totcesta || 0), 0);
}

calculateTbultosTotal(): number {
  return this.rowData.reduce((total, row) => total + (row.bultos || 0), 0);
}

calculateTunidadTotal(): number {
  return this.rowData.reduce((total, row) => total + (row.unidad || 0), 0);
}



cestag1 = 2.5;
cestag2 = 2.4;
cestag3 = 2.3;
cestag4 = 2.2;
cestam = 2.3;
cestap = 1.4;


totalesPorProductoLote: any[] = []; // Donde se almacenarán los totales agrupados
payloadFilasProdTotal: any; 


onCellEditingStopped(event: CellEditingStoppedEvent): void {
  const { colDef, api, rowIndex } = event;
  const currentRowIndex = rowIndex ?? 0;

  const estiba = 25;
  const rowNode = api.getRowNode(event.node.id ?? '');

  if (rowNode) {
    const data = rowNode.data;

    if (data.bruto !== 0) {
      let taraValue = 0;
      taraValue += data.gde25 * this.cestag1;
      taraValue += data.gde24 * this.cestag2;
      taraValue += data.gde23 * this.cestag3;
      taraValue += data.gde22 * this.cestag4;
      taraValue += data.med * this.cestam;
      taraValue += data.peq * this.cestap;
      taraValue += estiba;

      data.tara = taraValue;
      data.neto = data.bruto - taraValue;
      data.totcesta = data.gde25 + data.gde24 + data.gde23 + data.gde22 + data.med + data.peq;

      // Actualiza la fila en rowData
      this.rowData[currentRowIndex] = data;

      // Llama a calcular totales por row.data para recalcular totales
      this.brutoTotal = this.calculateBrutoTotal(),
      this.tcg25 = this.calculateTcg25Total(),
      this.tcg24 = this.calculateTcg24Total(),
      this.tcg23 = this.calculateTcg23Total(),
      this.tcg22 = this.calculateTcg22Total(),
      this.tcm = this.calculateTcmTotal(),
      this.tcp = this.calculateTcpTotal(),
      this.tsacos = this.calculateTsacosTotal(),
      this.testiba = this.calculateTestibaTotal(),
      this.ttara = this.calculateTtaraTotal(),
      this.tneto = this.calculateTnetoTotal(),
      this.tcestas = this.calculateTcestasTotal(),

      api.applyTransaction({ update: [data] });

      const payloadFilasProdTotal = this.totalXFilasProdService.totalGeneral(this.rowData);
      this.payloadFilasProdTotal = payloadFilasProdTotal;
      this.totalesPorProductoLote = payloadFilasProdTotal.total;
    }
  } else {
    console.error('El ID de la fila es undefined.');
  }
}

@Output() reiniciar = new EventEmitter<void>();  // Evento para emitir hacia el padre

// Método que emite el evento cuando se necesite reiniciar
emitirReinicio(): void {
 
  this.reiniciar.emit();  // Emitir el evento hacia el padre
}






// Método onSubmit: Se encarga de manejar el envío del formulario y el procesamiento de la información


onSubmit(): void {
  // Verificamos si el formulario es válido
  if (this.formulario.valid) {
    // Extraemos los valores del formulario
    const formData = this.formulario.value;
    const gridData = this.rowData; // Datos de la tabla (grid)
    console.log('Fecha seleccionada:', formData.fecha);

    // Primer payload: Datos individuales (detalles) del formulario
    const payloadDetalles = {
      codcli: formData.cliente, // Código del cliente
      fechad: formData.fecha,    // Fecha seleccionada
      ncontrol: this.numeroControl, // Número de control único
      rows: gridData.map((row: any) => ({
        pe: row.pe || 0,
        lote: row.lote || '',
        producto: row.producto || '',
        c: row.c || '',
        f: row.f || '',
        n: row.n || '',
        pos: row.pos || '', 
        bruto: row.bruto || 0,
        gde25: row.gde25 || 0,
        gde24: row.gde24 || 0,
        gde23: row.gde23 || 0,
        gde22: row.gde22 || 0,
        med: row.med || 0,
        peq: row.peq || 0,
        sacos: row.sacos || 0,
        est: row.est || 0,
        tara: row.tara || 0,
        neto: row.neto || 0,
        totcesta: row.totcesta || 0,
        bultos: row.bultos || 0,
        unidad: row.unidad || 0,
        recepcion_id: row.recepcion_id,
        recepcion_ncontrol: row.recepcion_ncontrol,
      }))
    };

    // Segundo payload: Datos totales
    const payloadTotales = {
      codcli: formData.cliente,
      fechad: formData.fecha,
      ncontrol: this.numeroControl,
      totalBruto: this.brutoTotal,
      totalTara: this.ttara,
      totalNeto: this.tneto,
      tcg25: this.tcg25,
      tcg24: this.tcg24,
      tcg23: this.tcg23,
      tcg22: this.tcg22,
      tcm: this.tcm,
      tcp: this.tcp,
      tsacos: this.tsacos,
      testiba: this.testiba,
      tcestas: this.tcestas,
      tbultos: this.tbultos,
      tunidad: this.tunidad
    };

    // Tercer payload: Totales por producto
    const payloadTlxp = this.payloadFilasProdTotal;

    // Obtener el número de control antes de enviar los detalles
    this.numeroControlService.getNumeroControldesp().subscribe({
      next: (controlData: string) => {
        // Al obtener el número de control, lo guardamos
        this.numeroControl = String(controlData); // Convertimos a string por seguridad
        console.log('Número de control actual:', this.numeroControl);

        // Primero, enviamos los datos de detalles al servidor
        this.despachoService.guardarDatos(payloadDetalles).subscribe({
          next: (responseDetalles) => {
            // Luego, enviamos los datos de totales al servidor
            this.totalesdespachoService.guardarTotalesd(payloadTotales).subscribe({
              next: (responseTotales) => {
                console.log('Totales enviados correctamente:', responseTotales);

                // Actualizamos el estado de las posiciones
                const promises = gridData.map((row: any) => {
                  const cavaId = parseInt(row.c.replace(/\D/g, ''), 10);
                  const filaId = parseInt(row.f.replace(/\D/g, ''), 10);
                  const nivelId = parseInt(row.n.replace(/\D/g, ''), 10);
                  const posicionId = parseInt(row.pos.replace(/\D/g, ''), 10);

                  const payloadPosiciones = {
                    cava: cavaId,
                    fila: filaId,
                    nivel: nivelId,
                    posicion: posicionId,
                    estado: 'disponible',
                    ncontrol: this.numeroControl
                  };

                  return firstValueFrom(this.cavaPosicionesService.updateEstadoPosicion(
                    payloadPosiciones.cava,
                    payloadPosiciones.fila,
                    payloadPosiciones.nivel,
                    payloadPosiciones.posicion,
                    payloadPosiciones.estado,
                    payloadPosiciones.ncontrol
                  ));
                });

                Promise.all(promises).then(() => {
                  console.log('Estados actualizados correctamente');

                  // Generamos el PDF después de que todos los estados se hayan actualizado correctamente
                  const pdfPayloadDetalles = { ...payloadDetalles };
                  this.pdfGenerator.generatePdf(pdfPayloadDetalles, payloadTotales, payloadTlxp ); // Generación del PDF

                  // Incrementamos el número de control y lo actualizamos en el sistema
                  const nuevoControl = this.incrementarNumeroControl(this.numeroControl);
                  this.numeroControlService.actualizarNumeroControldesp(nuevoControl).subscribe(() => {
                    console.log('Número de control actualizado a:', nuevoControl);

                    // Mostramos un mensaje de éxito al usuario
                    this.mostrarMensajeExito('Nota de Despacho Generada');
                    
                    // Reiniciamos el componente o formulario
                    this.emitirReinicio();
                  }, (error) => {
                    console.error('Error al actualizar el número de control:', error);
                    this.mostrarMensajeError('Error al actualizar el número de control');
                  });
                }).catch((error) => {
                  console.error('Error al actualizar los estados:', error);
                  this.mostrarMensajeError('Error al actualizar los estados');
                });
              },
              error: (errorTotales) => {
                console.error('Error al guardar los totales', errorTotales);
                this.mostrarMensajeError('Error al guardar los totales');
              }
            });
          },
          error: (errorDetalles) => {
            console.error('Error al guardar los detalles', errorDetalles);
            this.mostrarMensajeError('Error al guardar los detalles');
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener el número de control:', error);
        this.mostrarMensajeError('Error al obtener el número de control');
      }
    });
  } else {
    // Si el formulario no es válido, mostramos un error
    console.error('Formulario no válido');
    this.mostrarMensajeError('Formulario no válido');
  }
}



// Función para incrementar el número de control
incrementarNumeroControl(numeroControl: string): string {
  const numericPart = parseInt(numeroControl.substring(1), 10); // Extraer la parte numérica
  const incrementedPart = numericPart + 1; // Incrementar en 1
  const formattedPart = incrementedPart.toString().padStart(7, '0'); // Asegurar 6 dígitos
  return `D${formattedPart}`; // Retornar el nuevo número de control
}

   // Método para mostrar el mensaje de éxito en el centro de la pantalla
   mostrarMensajeExito(mensaje: string): void {
    const mensajeExito = document.createElement('div');
    mensajeExito.textContent = mensaje;
    
    // Estilo del mensaje
    mensajeExito.style.position = 'fixed';
    mensajeExito.style.top = '50%';
    mensajeExito.style.left = '50%';
    mensajeExito.style.transform = 'translate(-50%, -50%)'; // Centra el mensaje
    mensajeExito.style.backgroundColor = '#6f7e9c'; 
    mensajeExito.style.color = 'white';
    mensajeExito.style.padding = '20px';
    mensajeExito.style.borderRadius = '10px';
    mensajeExito.style.zIndex = '1000';
    mensajeExito.style.textAlign = 'center';
    mensajeExito.style.fontSize = '18px';
    
    document.body.appendChild(mensajeExito);
  
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      mensajeExito.remove();
    }, 3000);
  }
  
  // Dentro de tu componente RformulariounoComponent
  mostrarMensajeError(mensaje: string): void {
    // Implementa la lógica para mostrar el mensaje de error, por ejemplo, con un alert o un servicio de notificaciones
    alert(mensaje); // O utiliza otro método de notificación
  }
  

  }
   
 




