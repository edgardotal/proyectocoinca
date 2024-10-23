// Angular Core imports
import { Component,ChangeDetectorRef ,OnInit,ViewChild, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ag-Grid imports for managing the grid
import { 
    GridApi,                   // API for grid operations
    ColDef,                    // Column definitions
    ValueGetterParams,         // Params for value getters
    FirstDataRenderedEvent,    // Event when the grid is first rendered
    GridOptions,               // Options for grid configuration
    CellEditingStoppedEvent,   // Event when cell editing is stopped
    ValueParserParams,         // Params for value parsers
    IRowNode,                  // Represents a row in the grid
    RowClassParams,            // Params for row class callbacks
    RowStyle,                  // Row style configuration
    RowNode,  
    CellEvent,                
    GridReadyEvent             // Event triggered when the grid is ready
} from 'ag-grid-community';

// SweetAlert2 for alert dialogs
//import Swal from 'sweetalert2';

// Angular Material imports for dialog management
//import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Application-specific components and services
import { BuscaprodComponent } from '../buscaprod/buscaprod.component'; // Product search component
import { Product } from '../services/product.service'; // Service for managing products
import { BuscaclienteComponent } from '../buscacliente/buscacliente.component'; // Product search component
import { Cliente } from '../services/cliente.service'; // Service for managing products
import { DataRecepcionService } from '../services/datarecepcion.service'; // Ajusta la ruta si es necesario
import { DataTotalesService } from '../services/datatotales.service';
import { NumeroControlService } from '../services/numero-control.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { TotalXFilasProdService } from '../services/total-x-filas-prod.service'; // Asegúrate de importar el servicio
import { CavaPosicionesService } from '../services/cava-posiciones.service';



// Angular Bootstrap for modal management (if using ng-bootstrap)
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

///////////////
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { EventEmitter, Output ,  ViewEncapsulation } from '@angular/core';


//////////////////////

@Component({
  selector: 'app-rformulariouno',
  templateUrl: './rformulariouno.component.html',
  styleUrls: ['./rformulariouno.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RformulariounoComponent implements OnInit {
  

  components = {
    'buscaprod': BuscaprodComponent,
    'buscacliente': BuscaclienteComponent
  };



  formulario!: FormGroup;
  rowData: any[] = [];
  fechaActual: string = '';
  numeroControl : string = ''; // Aserción de que esta propiedad se inicializa antes de su uso

  totalesPorProductoLote: any[] = []; // Donde se almacenarán los totales agrupados


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private dataRecepcionService: DataRecepcionService,
    private dataTotalesService: DataTotalesService,
    private numeroControlService: NumeroControlService,
    private cdr: ChangeDetectorRef,
    private pdfGenerator: PdfGeneratorService,
    private totalXFilasProdService: TotalXFilasProdService,
    private cavaPosicionesService: CavaPosicionesService,
    private router: Router
  ) {
    // Omitir la inicialización de `rowData` aquí
  }

  ngOnInit(): void {
    const today = new Date();
    this.fechaActual = today.toISOString().split('T')[0];
  
    this.formulario = this.fb.group({
      fecha: [this.fechaActual, Validators.required],
      cliente: ['', Validators.required],
      pe: [0],
      lote: [''],
      producto: [''],
      c: [''],
      f: [''],
      n: [''],
      pos: [''],
      bruto: [0],
      gde25: [0],
      gde24: [0],
      gde23: [0],
      gde22: [0],
      med: [0],
      peq: [0],
      sacos: [0],
      est: [1],
      tara: [0],
      neto: [0],
      totcesta: [0],
      tbultos: [0],
      tunidad: [0],
      codigo: [''],
      bultos: [0],
      unidad: [0],
      kgsxunidad: [0],
    });
  
    this.rowData = Array(1).fill(null).map((_, index) => ({
      pe: index + 1, // Inicia con 1
      lote: '',
      producto: '',
      c: '',
      f: '',
      n: '',
      pos: '',
      bruto: 0,
      gde25: 0,
      gde24: 0,
      gde23: 0,
      gde22: 0,
      med: 0,
      peq: 0,
      sacos: 0,
      est: 1,
      tara: 0,
      neto: 0,
      totcesta: 0,
      tbultos: 0,
      tunidad: 0,
      codigo:  '',
      bultos: 0,
      unidad: 0,
      kgsxunidad:0,
    }));
  
    // Inicializa los totales
    this.brutoTotal = this.calculateBrutoTotal();
    this.tcg25 = this.calculateTcg25Total();
    this.tcg24 = this.calculateTcg24Total();
    this.tcg23 = this.calculateTcg23Total();
    this.tcg22 = this.calculateTcg22Total();
    this.tcm = this.calculateTcmTotal();
    this.tcp = this.calculateTcpTotal();
    this.tsacos = this.caculateTsacos();
    this.testiba = this.calculateTestibaTotal();
    this.ttara = this.calculateTtaraTotal();
    this.tneto = this.calculateTnetoTotal();
    this.tcestas = this.calculateTcestasTotal();
    this.tbultos = this.calculateTbultosTotal();
    this.tunidad = this.calculateTunidadTotal();
  
    // Consultar el número de control
   
    this.numeroControlService.getNumeroControl().subscribe({
      next: (response: string) => {
        console.log('Respuesta del servicio:', response); // Verifica que recibes un string
        this.numeroControl = response; // Asigna directamente el string a this.numeroControl
        console.log('Número de control asignado:', this.numeroControl);
      },
      error: (err) => {
        console.error('Error al obtener el número de control:', err);
        this.numeroControl = ''; // Asignar un valor por defecto en caso de error
      }
    });
    

    // Abre el modal de prueba con un pequeño retraso
    setTimeout(() => {
      this.openSearchClientModal();
    }, 0);
}


  

  selectedProduct: Product | null = null; // Para almacenar el producto seleccionado
  selectedCliente: Cliente | null = null; // Para almacenar el cliente
  
  @ViewChild('gridContainer') gridContainer!: ElementRef; 
  

  ngAfterViewInit(): void {
    //console.log('Total estiba after view init:', this.calculateTestibaTotal());

    // Aquí puedes hacer ajustes adicionales al grid si es necesario
  }


//valores del peso las cestas
  cestag1 = 2.5;
  cestag2 = 2.4;
  cestag3 = 2.3;
  cestag4 = 2.2;
  cestam = 2.3;
  cestap = 1.4;

  
  getPeValue(params: ValueGetterParams): number | null {
    if (params && params.node && params.node.rowIndex != null) {
      return params.node.rowIndex + 1; // Índice de la fila + 1
    }
    return null; // O algún valor por defecto
  }
  


  getEstValue(params: ValueGetterParams): number {
    return 1; // Fija el valor de 'est' a 1
  }


  selectedParams: any;

  

  columnDefs: ColDef[] = [
    {
        headerName: 'PE',
        field: 'pe',
        width: 60,
        valueGetter: this.getPeValue.bind(this),
        editable: false
    },
    { 
        field: 'lote', 
        headerName: 'Lote', 
        width: 140, 
        editable: true,
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
        width: 100, 
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'T1', 'T2']
        },
        editable: true,
    },
    {
        field: 'f',
        headerName: 'Fila',
        width: 70,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: [
               'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10',
                'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19',
                'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 'F27', 'F28',  'FP'
            ]
        },
        editable: true,
    },
    {
        field: 'n',
        headerName: 'Nivel',
        width: 80,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: ['N1', 'N2', 'N3']
        },
        editable: true,
    },
    {
      field: 'pos',
      headerName: 'Pos.',
      width: 70,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
          values: ['P1', 'P2', 'P3', 'P4']
      },
      editable: true,
  },
   
  {
    field: 'tipocalculo',
    headerName: 'Calculo',
    width: 90,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
        values: ['X_Kilo','X_Bulto']
    },
    editable: true,
},
  
  {
        field: 'bruto',
        headerName: 'Bruto', 
        width: 100,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
        editable: (params) => !!params.data.n,
    },
    {
        field: 'gde25',
        headerName: 'G2,5',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: true,
    },
    {
        field: 'gde24',
        headerName: 'G2,4',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: true,
    },
    {
        field: 'gde23',
        headerName: 'G2,3',
        width: 70,
        cellEditor: 'agNumberCellEditor',
       valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: true,
    },
    {
        field: 'gde22',
        headerName: 'G2,2',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: true,
    },
    {
        field: 'med',
        headerName: 'Med.',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: true,
    },
    {
        field: 'peq',
        headerName: 'Peq.',
        width: 70,
        cellEditor: 'agNumberCellEditor',
        valueParser: (params: ValueParserParams) => params.newValue,
        valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
        editable: true,
    },
    {
      field: 'sacos',
      headerName: 'Sacos',
      width: 80,
      cellEditor: 'agNumberCellEditor',
      valueParser: (params: ValueParserParams) => params.newValue,
      valueFormatter: (params) => params.value ? params.value.toFixed(0) : '0',
      editable: true,
     },

    {
      field: 'est',
      headerName: 'Est.',
      width: 60,
      editable: false,
      cellStyle: { 
                backgroundColor: '#f6f493',    
              },
      valueGetter: this.getEstValue.bind(this),
  }
  ,
  {
    field: 'tara',
    headerName: 'Tara',
    width: 80,
    cellStyle: {backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
  },
  {
    field: 'neto',
    headerName: 'Neto',
    width: 100,
    cellStyle: {backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
  },
  {
    field: 'totcesta',
    headerName: 'T.Cesta',
    width: 90,
    cellStyle: {backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
  },
  
  {
    field: 'tbultos',
    headerName: 'TBultos',
    width: 100,
    cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
  },
  {
    field: 'tunidad',
    headerName: 'TUnidad',
    width: 100,
    cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
  },
  
  {
    field: 'codigo',
    headerName: 'Codigo',
    width: 100,
    cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
    hide : false,
  },
  {
    field: 'bultos',
    headerName: 'Bultos',
    width: 80,
    cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
    hide : false,
  },
  {
    field: 'unidad',
    headerName: 'Unidad',
    width: 90,
    cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
    hide: false,
  },

  {
    field: 'kgsxunidad',
    headerName: 'KIlosxUnidad',
    width: 100,
    cellStyle: { backgroundColor: '#a2b1ce' }, // Color #a2b1ce
    editable: false,
    valueParser: (params: ValueParserParams) => params.newValue,
    valueFormatter: (params) => params.value ? params.value.toFixed(2) : '0.00',
    pinned: 'right',
    headerClass: (params) => 'header-dark-gray',
    hide: false,
  }



];

  
  
private gridApi: any; 


onGridReady(params: any) {
   // Verifica que params tenga api y columnApi
  this.gridApi = params.api;
  
}




// Opciones de grid con eventos configurados
gridOptions: GridOptions = {
  pagination: false,
  onCellEditingStopped: this.onCellEditingStopped.bind(this),
  onFirstDataRendered: this.onFirstDataRendered.bind(this),
  onGridReady: this.onGridReady.bind(this),
  onCellFocused: this.onCellFocused.bind(this),
  onCellValueChanged: this.onCellValueChanged.bind(this),
  onCellKeyDown: this.onCellKeyDown.bind(this), 
  getRowStyle: (params: RowClassParams<any, any>): RowStyle | undefined => {
    if (params.node && params.node.rowIndex !== null) {
      return {
        background: params.node.rowIndex % 2 === 0 ? '#f2f2f2' : '#ffffff'
      };
    }
    return undefined;
  },
  getRowId: (params) => {
    const id = params.data.id; // Usa un campo único
    return id != null ? id.toString() : '';
  },
  //suppressAggFuncInHeader: true,    
};

// Variable para la fila actual
currentRowNode: IRowNode | null = null;

// valores iniciales para totalizar columnas 
  brutoTotal: number = 0; // Inicializar con un número
  tcg25: number = 0;
  tcg24: number = 0;
  tcg23: number = 0;
  tcg22: number = 0;
  tcm: number = 0;
  tcp: number = 0;
  tsacos: number =  0;
  testiba: number = 0;
  ttara: number = 0;
  tneto: number = 0;
  tcestas: number = 0;
  tbultos: number = 0;
  tunidad: number = 0;

  
//funciones para  calcula totales 
calculateBrutoTotal(): number {
  let totalBruto = 0;
  this.rowData.forEach(row => {
  totalBruto += (row.bruto || 0);
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

caculateTsacos(): number {
 
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



/////////////////////////////////

  private cavaIdMap: { [key: string]: number } = {
  'C1': 1,
  'C2': 2,
  'C3': 3,
  'C4': 4,
  'C5': 5,
  'C6': 6,
  'C7': 7,
  'C8': 8,
  'C9': 9,
  'C10': 10
};

private getCavaId(cavaValue: string): number | null {
  return this.cavaIdMap[cavaValue] ?? null;
}




onCellValueChanged(event: any) {
  if (this.gridApi) {
    try {
      // Obtener el nodo que ha cambiado
      const changedNode = event.node; // La fila afectada

      // Inicializar totales
      let totalBruto = 0;
      let totalTcg25 = 0;
      let totalTcg24 = 0;
      let totalTcg23 = 0;
      let totalTcg22 = 0;
      let totalTcm = 0;
      let totalTcp = 0;
      let totaltsacos = 0;
      let totalTbultos = 0;
      let totalTunidad = 0;

      // Recorrer todas las filas para calcular los totales
      this.gridApi.forEachNode((node: RowNode) => {
        totalBruto += (node.data.bruto || 0);
        totalTcg25 += (node.data.gde25 || 0);
        totalTcg24 += (node.data.gde24 || 0);
        totalTcg23 += (node.data.gde23 || 0);
        totalTcg22 += (node.data.gde22 || 0);
        totalTcm += (node.data.med || 0);
        totalTcp += (node.data.peq || 0);
        totaltsacos += (node.data.sacos || 0);
        totalTbultos += (node.data.bultos || 0);
        totalTunidad += (node.data.unidad || 0);
      });

      // Actualizar los totales de todas las columnas
      this.brutoTotal = totalBruto;
      this.tcg25 = totalTcg25;
      this.tcg24 = totalTcg24;
      this.tcg23 = totalTcg23;
      this.tcg22 = totalTcg22;
      this.tcm = totalTcm;
      this.tcp = totalTcp;
      this.tsacos = totaltsacos;
      this.tbultos = totalTbultos;
      this.tunidad = totalTunidad;

      // Verificar si la celda "c" (cava) ha cambiado
      if (event.colDef.field === 'c') {
        const cavaId = this.getCavaId(event.data.c); // Convierte el valor de la celda a ID numérico
      
      }

      // Verificar si la celda "f" (fila) ha cambiado
      if (event.colDef.field === 'f') {
        const cavaId = this.getCavaId(event.data.c); // Obtenemos el ID de la cava seleccionada
        const fila = event.data.f; // Obtenemos el valor de la fila (f) como 'F1', 'F2', etc.

        // Extraer el número de la fila (ej: 'F1' -> 1)
        const filaNumber = parseInt(fila.replace('F', ''), 10); // Elimina 'F' y convierte a número
     
      }

      // Verificar si la celda "n" (nivel) ha cambiado
      
       
      
      
    } catch (error) {
      console.error('Error while calculating totals:', error);
    }
  }
}



 
  onFirstDataRendered(params: FirstDataRenderedEvent): void {
    // Calcula los totales
    this.brutoTotal = this.calculateBrutoTotal();
    this.tcg25 = this.calculateTcg25Total();
    this.tcg24 = this.calculateTcg24Total();
    this.tcg23 = this.calculateTcg23Total();
    this.tcg22 = this.calculateTcg22Total();
    this.tcm = this.calculateTcmTotal();
    this.tcp = this.calculateTcpTotal();
    this.tsacos = this.caculateTsacos();
    this.testiba = this.calculateTestibaTotal();
    //console.log('Total estiba:', this.calculateTestibaTotal());

    this.ttara = this.calculateTtaraTotal();
    this.tneto = this.calculateTnetoTotal();
    this.tcestas = this.calculateTcestasTotal();
    this.tbultos = this.calculateTbultosTotal();
    this.tunidad = this.calculateTunidadTotal();
  
    //Inicia la edición en la celda especificada
    params.api.startEditingCell({
      rowIndex: 0,
      colKey: 'lote'
    });
  }
  


  


  private idCounter = 0;

  addNewRow(api: GridApi) {
    const focusedCell = api.getFocusedCell();

    if (focusedCell) {
        const currentRowIndex = focusedCell.rowIndex;

        const newRowId = ++this.idCounter;
        console.log("Enfocando la celda 'lote' en el índice:", currentRowIndex + 1); // Cambia el índice para enfocarse en la nueva fila

        // Obtén los valores de la fila anterior (si existe)
        let previousRowData = null;
        if (currentRowIndex !== null && currentRowIndex >= 0) {
            const previousNode = api.getDisplayedRowAtIndex(currentRowIndex);
            previousRowData = previousNode ? previousNode.data : null;
        }

        // Crea la nueva fila copiando los valores de lote y producto de la fila anterior
        const newRow = {
            id: newRowId, // Asigna el nuevo ID a la fila
            pe: api.getDisplayedRowCount() + 1, // Índice de la nueva fila
            lote: previousRowData ? previousRowData.lote : '', // Copia el valor del campo 'lote' de la fila anterior
            producto: previousRowData ? previousRowData.producto : '', // Copia el valor del campo 'producto' de la fila anterior
            c: '',
            f: '',
            n: '',
            pos: '',
            bruto: 0,
            gde25: 0,
            gde24: 0,
            gde23: 0,
            gde22: 0,
            med: 0,
            peq: 0,
            sacos: 0,
            est: 1,
            tara: 0,
            neto: 0,
            totcesta: 0,
            tbultos:0,
            tunidad:0,
            codigo: '',
            bultos: 0,
            unidad: 0,
            kgsxunidad:0,

        };

        api.applyTransaction({ add: [newRow] });
        this.updatePeValues(api);

        // Enfoca la celda 'lote' en la nueva fila
        api.startEditingCell({
            rowIndex: api.getDisplayedRowCount() - 1, // Enfoca la nueva fila
            colKey: 'lote' // Enfoca la celda 'lote'
        });
    } else {
        console.error("No hay una celda enfocada actualmente.");
    }
}

    
  @HostListener('document:keydown', ['$event'])
  
  handleKeyboardEvent(event: KeyboardEvent) {
    // if (event.ctrlKey && event.key === 'Enter') {
    //   this.addNewRow(this.gridApi);
    // }
  }
  
  updatePeValues(api: GridApi) {
    api.forEachNode((node) => {
      // Asegúrate de que rowIndex no sea null
      const rowIndex = node.rowIndex;
      if (rowIndex !== null) {
        const peValue = rowIndex + 1; // Índice de la fila + 1
        node.setDataValue('pe', peValue);
      } else {
        console.error('rowIndex es null para el nodo:', node);
      }
    });
  }


  onRowSelected(event: any): void {
    // Asegúrate de que el evento contenga los datos de la fila seleccionada
    if (event.api && event.node) {
     // console.log('Fila seleccionada:', event.node);
      this.currentRowNode = event.node; // Guarda la fila seleccionada en currentRowNode
    } else {
      console.warn('No se pudo obtener currentRowNode del evento de selección.');
    }
  }
    
    

 //getRowIdForFocusedCell(): 
 private isInitialLoad = true; // Variable de control para la carga inicial
 private isModalOpen = false; // Variable de control para evitar múltiples aperturas del modal
  
 onCellFocused(event: any): void {
  const { api } = event;

  // Obtén la celda enfocada
  const focusedCell = api.getFocusedCell();

  if (focusedCell) {
    const { rowIndex, column } = focusedCell;
    const columnId = column.getColId();

    // Obtener el RowNode actual
    const currentRowNode = api.getDisplayedRowAtIndex(rowIndex);

    if (currentRowNode) {
      const rowData = currentRowNode.data;

      // Solo verificar el campo 'lote' si no es una carga inicial
      if (!this.isInitialLoad) {
        if (!rowData.lote || rowData.lote.trim() === '') {
          // Enfocar la celda del campo 'lote' después de detectar que está vacío
          this.focusCell('lote', currentRowNode.rowIndex ?? rowIndex);
          return; // Evita abrir el modal si el campo 'lote' está vacío
        }
        
      } else {
        // Marcar que la carga inicial ha terminado
        this.isInitialLoad = false;
      }

      // Si la columna enfocada es 'producto', abre el modal
      if (columnId === 'producto' && !this.isModalOpen) {
        this.currentRowNode = currentRowNode;
        this.openSearchProductModal();
      }

      



    } else {
      console.warn('No se pudo obtener el RowNode correspondiente al índice de fila.');
    }
  }
}

private focusCell(colKey: string, rowIndex: number): void {
  if (this.gridApi) {
    this.gridApi.startEditingCell({
      rowIndex,
      colKey,
    });

    // Ajusta el tiempo según sea necesario para permitir que el DOM se actualice
    setTimeout(() => {
      const cellElement = this.gridApi.getCellRendererInstances({
        rowIndex,
        column: this.gridApi.getColumnDef(colKey),
      });

      if (cellElement.length > 0) {
        const cellGui = cellElement[0].getGui();
        const inputElement = cellGui.querySelector('input');

        if (inputElement) {
          inputElement.focus();
        }
      }
    }, 300); // Prueba con un tiempo mayor si es necesario
  }
}


  onProductSelected(product: Product): void {
    //console.log('Producto seleccionado:', product);
    // Actualiza la celda en la grilla u otras acciones necesarias aquí
  }


  private focusOnCellC(): void {
    setTimeout(() => {
      console.log('Intentando enfocar la celda "c" después del cierre del modal');
      const cellC = document.querySelector('.ag-root .ag-cell[col-id="c"]') as HTMLElement;
  
      if (cellC) {
        console.log('Celda "c" encontrada, enfocando...');
        cellC.focus();
      } else {
        console.warn('No se encontró la celda "c".');
      }
    }, 100); // 100 ms de retraso para asegurar que el modal se cierre
  }
  
  

  // Componente que abre el modal
  openSearchClientModal(): void {
    if (this.isModalOpen) {
      return; // Evita que el modal se abra si ya está abierto
    }
  
    this.isModalOpen = true; // Marca el modal como abierto
  
    const modalRef = this.modalService.open(BuscaclienteComponent);
  
    if (modalRef.componentInstance) {
      modalRef.componentInstance.clienteSelected.subscribe({
        next: (client: Cliente) => {
          this.handleClientSelected(client); // Llama a la función para manejar el cliente seleccionado
          modalRef.close(); // Cierra el modal después de seleccionar el cliente
          this.isModalOpen = false; // Marca el modal como cerrado
        },
        error: (err: any) => { // Especifica el tipo para `err`
          console.error('Error al seleccionar cliente:', err);
          this.isModalOpen = false; // Marca el modal como cerrado en caso de error
        }
      });
  
      modalRef.result.finally(() => {
        // Enfoca la celda "Lote" después de cerrar el modal
        setTimeout(() => {
          // Aquí estableces el foco en la celda que quieras
          if (this.gridApi) {
            const rowIndex = 0; // Define el índice de la fila que quieres enfocar
            const colKey = 'lote'; // La clave de la columna que representa "Lote"
            this.gridApi.setFocusedCell(rowIndex, colKey);
          }
        }, 0);
  
        this.isModalOpen = false; // Marca el modal como cerrado si el usuario lo cierra manualmente
      });
    } else {
      console.error('El modal no tiene un componente `clienteSelected` definido.');
      this.isModalOpen = false; // Marca el modal como cerrado si no se puede encontrar el componente `clienteSelected`
    }
  }
  
  
  handleClientSelected(cliente: Cliente): void {
    // Actualiza el campo de entrada 'cliente' en el formulario
    const clienteControl = this.formulario.get('cliente');
    if (clienteControl) {
      clienteControl.setValue(cliente.nombre);
    } else {
      console.warn('No se encontró el control de formulario "cliente".');
      return;
    }

  }
  


  openSearchProductModal(): void {
    if (this.isModalOpen) {
      return; // Evita que el modal se abra si ya está abierto
    }

    this.isModalOpen = true; // Marca el modal como abierto
    

    const modalRef = this.modalService.open(BuscaprodComponent); // Abre el modal usando NgbModal

    modalRef.componentInstance.productSelected.subscribe((product: Product) => {
      this.handleProductSelected(product); // Maneja el producto seleccionado
      modalRef.close(); // Cierra el modal después de seleccionar el producto
      this.isModalOpen = false; // Marca el modal como cerrado
      
    });

    modalRef.componentInstance.setModalRef(modalRef);

    // Asegura que el modal se cierre en caso de que el usuario cierre el modal manualmente
    modalRef.result.finally(() => {
      console.warn('Modal cerrado.');
      this.isModalOpen = false; // Marca el modal como cerrado si se cierra manualmente
   
    });
  }
 


handleProductSelected(product: Product): void {
  const codigop = product.codigo;     
  const productName = product.descripcion;
  const bultosValue = product.bultos;
  const unidadValue = product.unidad;
  const kilosxu     = product.kgsxunidad;
  if (this.currentRowNode) {
    // Actualiza los valores de las celdas
    this.currentRowNode.setDataValue('codigo', codigop);
    this.currentRowNode.setDataValue('producto', productName);
    this.currentRowNode.setDataValue('bultos', bultosValue);
    this.currentRowNode.setDataValue('unidad', unidadValue);
    this.currentRowNode.setDataValue('kgsxunidad', kilosxu );
    // Forzar la actualización visual si es necesario
    this.gridApi.redrawRows({ rowNodes: [this.currentRowNode] });

    // Mover el foco a la siguiente columna ('c') si se ha seleccionado un producto
    this.gridApi.startEditingCell({
      rowIndex: this.currentRowNode.rowIndex ?? 0,
      colKey: 'c'
    });
  } else {
    console.warn('No RowNode is currently selected.');
  }
}

///////////////////////////////

payloadFilasProdTotal: any;  // Declara payloadFilasProdTotal como propiedad de la clase


onCellEditingStopped(event: CellEditingStoppedEvent): void {
  const { api, node, rowIndex, colDef } = event;
  const currentRowIndex = rowIndex ?? 0;
  const estiba = 25;
  const rowNode = api.getRowNode(event.node.id ?? '');

  if (rowNode) {
    const data = rowNode.data;

    // Validar cuando se edite la columna 'n' antes de continuar con los cálculos
    if (colDef.field === 'n') {
      try {
        const cavaId = parseInt(data.c.replace('C', ''), 10);
        const nivelNumber = parseInt(data.n.replace('N', ''), 10);

        if ((cavaId === 1 || cavaId === 5 || cavaId === 6 || cavaId === 9 || cavaId === 10) && nivelNumber === 3) {
          this.mostrarMensajeError('Esta cava no posee nivel 3');
          setTimeout(() => {
            this.gridApi.setFocusedCell(rowIndex, 'n');
            this.gridApi.startEditingCell({ rowIndex, colKey: 'n' });
          }, 200);
          return;
        }

        if ((cavaId === 9 || cavaId === 10) && nivelNumber === 2) {
          this.mostrarMensajeError('Esta cava no posee nivel 2');
          setTimeout(() => {
            this.gridApi.setFocusedCell(rowIndex, 'n');
            this.gridApi.startEditingCell({ rowIndex, colKey: 'n' });
          }, 200);
          return;
        }
      } catch (error) {
        console.error('Error al ejecutar la validación:', error);
      }
    }

    if (colDef.field === 'f') {
      try {
        const cavaId = parseInt(data.c.replace('C', ''), 10);
        const filaNumber = parseInt(data.f.replace('F', ''), 10);

        if ((cavaId === 9 || cavaId === 10) && filaNumber > 13) {
          this.mostrarMensajeError('Esta cava solo posee 13 filas');
          setTimeout(() => {
            this.gridApi.setFocusedCell(rowIndex, 'f');
            this.gridApi.startEditingCell({ rowIndex, colKey: 'f' });
          }, 200);
          return;
        }
      } catch (error) {
        console.error('Error al validar la fila:', error);
      }
    }

    if (colDef.field === 'pos') {
      try {
        const filaValue = event.data.f;
        const cavaId = parseInt(event.data.c.replace('C', ''), 10);
        const filaNumber = parseInt(filaValue.replace('F', ''), 10);
        const nivelNumber = parseInt(event.data.n.replace('N', ''), 10);
        const posicion = parseInt(event.data.pos.replace('P', ''), 10);

        if (filaValue !== 'FP') {
          this.cavaPosicionesService.getEstadoPosicion(cavaId, filaNumber, nivelNumber, posicion).subscribe({
            next: (response) => {
              if (response && response.length > 0) {
                const estado = response[0]?.estado;
                if (estado === 'ocupado') {
                  this.mostrarMensajeExito('Posición Ocupada');
                  setTimeout(() => {
                    this.gridApi.setFocusedCell(rowIndex, 'n');
                    this.gridApi.startEditingCell({ rowIndex, colKey: 'n' });
                  }, 2000);
                }
              }
            },
            error: (error) => {
              console.error('Error al obtener el estado de la posición:', error);
            }
          });
        }
      } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
      }
    }

    // Lógica para 'bruto', solo si la validación anterior fue exitosa
    if (data.bruto !== 0) {

      // Verificar el valor de 'tipocalculo' y aplicar lógica según el caso
      if (data.tipocalculo === 'X_Kilo') {
        // Lógica para la opción X_Kilo
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

        this.rowData[currentRowIndex] = data;

        this.tsacos = this.caculateTsacos();
        this.testiba = this.calculateTestibaTotal();
        this.ttara = this.calculateTtaraTotal();
        this.tneto = this.calculateTnetoTotal();
        this.tcestas = this.calculateTcestasTotal();

        api.applyTransaction({ update: [data] });

        const payloadFilasProdTotal = this.totalXFilasProdService.totalGeneral(this.rowData);
        this.payloadFilasProdTotal = payloadFilasProdTotal;
        this.totalesPorProductoLote = payloadFilasProdTotal.total;
      } else if (data.tipocalculo === 'X_Bulto') {
        this.mostrarMensajeError('este metodo no esta terminado');
        setTimeout(() => {
          this.gridApi.setFocusedCell(rowIndex, 'tipocalculo');
          this.gridApi.startEditingCell({ rowIndex, colKey: 'tipocalculo' });
        }, 200);
        return; // Lógica para la opción X_Bulto
        // Coloca tu lógica aquí para manejar el caso de X_Bulto
        // Por ejemplo, podrías calcular con base en otro valor específico para esta opción.
      }
    }
  }
}




handleEnterKeyNavigation(event: CellEditingStoppedEvent): void {
  const { api, node, colDef } = event;
  
  // Obtiene las columnas visibles
  const allColumns = api.getColumns()!;
  const currentIndex = allColumns.findIndex(column => column.getColId() === colDef.field);
  const nextColumn = allColumns[currentIndex + 1];

  if (nextColumn) {
      api.startEditingCell({
          rowIndex: node.rowIndex!,
          colKey: nextColumn.getColId()
      });
  } else {
      // Si no hay una siguiente columna, mover a la columna 'Lote' de la siguiente fila
      const nextRowIndex = node.rowIndex! + 1;
      if (nextRowIndex < api.getDisplayedRowCount()) {
          api.startEditingCell({
              rowIndex: nextRowIndex,
              colKey: 'lote'
          });
      }
  }
}


private clavesPosicionesGeneradas: Set<string> = new Set(); // Almacena claves únicas

verificarFilas(node: RowNode, api: GridApi<any>): void {
  const valorCeldaF = node.data.f; // Valor de la celda 'F'

  
  // Generar la clave única a partir de c, f, n y pos
  const cavaId = node.data.c.replace('C', ''); // Extrae el ID del cava
  const nivelValue = node.data.n; // Valor del nivel
  const posicionValue = node.data.pos; // Valor de la posición

  // Crea la clave única
  const clavePosicionGenerada = `${cavaId}-${valorCeldaF}-${nivelValue}-${posicionValue}`;
  console.log(`Generando clave de posición: ${clavePosicionGenerada}`);

  // Verifica si la clave ya existe
  if (this.clavesPosicionesGeneradas.has(clavePosicionGenerada)) {
    this.mostrarMensajeExito('Usted ya ingresó esta posición en el Grid.');

    // // Limpiar valores de las columnas especificadas
  
    node.setDataValue('bruto', 0);
  
    // Mover el foco a la columna 'C'
    api.startEditingCell({
      rowIndex: node.rowIndex ?? 0,
      colKey: 'c' // Cambia a la columna 'c'
    });
  } else {
    // Si no existe, agregar la clave de posición
    this.clavesPosicionesGeneradas.add(clavePosicionGenerada);
    console.log(`Clave de posición agregada: ${clavePosicionGenerada}`);

  }
}






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
  if (keyEvent && keyEvent.ctrlKey && keyEvent.key === 'Enter' && colDef.field === 'est') {
    this.addNewRow(api); // Agregar una nueva fila directamente
    keyEvent.preventDefault(); // Previene cualquier otra acción del Ctrl + Enter
  }
}


// Método para reiniciar el componente
@Output() reiniciar = new EventEmitter<void>();  // Evento para emitir hacia el padre

// Método que emite el evento cuando se necesite reiniciar
emitirReinicio(): void {
 
  this.reiniciar.emit();  // Emitir el evento hacia el padre
}

// Método onSubmit
onSubmit(): void {
  if (this.formulario.valid) {
    const formData = this.formulario.value;
    const gridData = this.rowData;

    // Primer payload: Datos individuales (detalles)
    const payloadDetalles = {
      codcli: formData.cliente,
      fechar: formData.fecha,
      ncontrol: this.numeroControl,
      rows: gridData.map((row: any) => ({
        pe: row.pe || 0,
        lote: row.lote || '',
        codigo: row.codigo || '',
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
        bultos: row.tbultos || 0,
        unidad: row.tunidad || 0,
      }))
    };

    // Segundo payload: Totales
    const payloadTotales = {
      codcli: formData.cliente,
      fechar: formData.fecha,
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

    const actualizarEstado = () => {
      const promises = gridData.map((row: any) => {
        const cavaId = parseInt(row.c.replace(/\D/g, ''), 10);
        const filaId = parseInt(row.f.replace(/\D/g, ''), 10);
        const nivelId = parseInt(row.n.replace(/\D/g, ''), 10);
        const posicionId = parseInt(row.pos.replace(/\D/g, ''), 10);

        // Solo actualizar el estado si row.f no es "FP"
        if (row.f !== "FP") {
          const payloadPosiciones = {
            cava: cavaId,
            fila: filaId,
            nivel: nivelId,
            posicion: posicionId,
            estado: 'Ocupado',
            ncontrol: this.numeroControl
          };

          return this.cavaPosicionesService.updateEstadoPosicion(
            payloadPosiciones.cava,
            payloadPosiciones.fila,
            payloadPosiciones.nivel,
            payloadPosiciones.posicion,
            payloadPosiciones.estado,
            payloadPosiciones.ncontrol
          ).toPromise();
        }
        // Retornar una promesa resuelta para filas que no requieren actualización
        return Promise.resolve();
      });

      return Promise.all(promises);
    };

    // Obtener el número de control y continuar
    this.numeroControlService.getNumeroControl().subscribe({
      next: (controlData: string) => {
        this.numeroControl = String(controlData);

        // Primero, enviar los datos de detalles
        this.dataRecepcionService.guardarDatos(payloadDetalles).subscribe({
          next: (responseDetalles) => {
            console.log('Detalles enviados correctamente:', payloadDetalles);
            // Luego, enviar los totales
            this.dataTotalesService.guardarTotales(payloadTotales).subscribe({
              next: (responseTotales) => {
                console.log('Totales enviados correctamente:', responseTotales);

                // Actualizar el estado y esperar a que todos los estados se hayan actualizado
                actualizarEstado().then(() => {
                  // Calcular el payload para filas de productos total
                  // const payloadFilasProdTotal = this.totalXFilasProdService.totalGeneral(this.rowData);
                  
                  // Agregar un log para ver el payload antes de enviarlo
                  console.log('Payload que se enviará:', this.payloadFilasProdTotal);

                  // Insertar los totales utilizando el servicio
                  this.totalXFilasProdService.insertarTotales(this.payloadFilasProdTotal).subscribe({
                    next: (response) => {
                      console.log('Datos tpxlote guardados con éxito:', response);
                      
                      // Generar el PDF después de guardar los totales
                      const pdfPayloadDetalles = { ...payloadDetalles };
                      this.pdfGenerator.generatePdf(pdfPayloadDetalles, payloadTotales, payloadTlxp);

                      // Actualizar el número de control y reiniciar la vista
                      const nuevoControl = this.incrementarNumeroControl(this.numeroControl);
                      this.numeroControlService.actualizarNumeroControl(nuevoControl).subscribe(() => {
                        this.mostrarMensajeExito('Nota de Recepcion Generada');
                        this.emitirReinicio(); 
                      }, (error) => {
                        console.error('Error al actualizar el número de control:', error);
                      });
                    },
                    error: (error) => {
                      console.error('Error al guardar los datos:', error);
                    },
                    complete: () => {
                      console.log('Proceso completado');
                    }
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
    console.error('Formulario no válido');
    this.mostrarMensajeError('Formulario no válido');
  }
}

 

// Función para incrementar el número de control
incrementarNumeroControl(numeroControl: string): string {
  const numericPart = parseInt(numeroControl.substring(1), 10); // Extraer la parte numérica
  const incrementedPart = numericPart + 1; // Incrementar en 1
  const formattedPart = incrementedPart.toString().padStart(7, '0'); // Asegurar 6 dígitos
  return `R${formattedPart}`; // Retornar el nuevo número de control
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
   
    
  
  
  
  
